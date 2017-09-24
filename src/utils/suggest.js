import { caml_equal } from "bs-platform/lib/js/caml_obj";
import $$Array from "bs-platform/lib/js/array.js";
const db = require("./db.js");

const flatten = (arrayOfArrays) => {
  var result = [];
  for(var array of arrayOfArrays) {
    for(var item of array) {
      result.push(item);
    }
  }
  return result;
}

const typeKinds = {
  simple: "simple",
  list: "list",
  func: "func",
  generic: "generic"
};

const wrapInExports = code =>
  `(function(exports) {${code}})(window.exports = {})`;

function compileReason(reason) {
  const converted = window.refmt(reason, "RE", "implementation", "ML");
  const ocaml = converted[1];
  return JSON.parse(window.ocaml.compile(ocaml));
}

const guessType = reasonExpression => {
  const compilationResult = compileReason(
    `let exp = (${reasonExpression}) == 1;`
  );
  if (compilationResult.js_code) {
    return "int";
  } else {
    // error format : "This expression has type int but an expression was expected of type {expressionType}"
    const type = compilationResult.text.substring(69).trim();
    return type;
  }
};

const reasonExpToJs = reasonExp => {
  if (reasonExp.length === 0) {
    return {
      code: reasonExp,
      jsValue: null,
      type: null,
      error: null
    };
  }

  const reasonCode = `let exp = ${reasonExp};`;
  const compilationResult = compileReason(reasonCode);
  if (compilationResult.js_code) {
    window.eval(wrapInExports(compilationResult.js_code));
    return {
      code: reasonExp,
      jsValue: window.exports.exp,
      type: guessType(reasonExp),
      error: null
    };
  } else {
    return {
      code: reasonExp,
      jsValue: null,
      type: null,
      error: compilationResult.text
    };
  }
};

const simpleTypes = ["bool", "int", "float", "string", "char"];

const tokenKinds = {
  simple: "simple",
  list: "list",
  arrow: "arrow",
  generic: "generic",
  openParenthesis: "openParenthesis",
  closeParenthesis: "closeParenthesis"
};

function tokenStream(str) {
  const words = [];
  let lastEnd = 0;

  for (var i = 0; i < str.length; i++) {
    switch (str[i]) {
      case " ":
        words.push(str.substring(lastEnd, i));
        lastEnd = i + 1;
        break;
      case "(":
        words.push("(");
        lastEnd = i + 1;
        break;
      case ")":
        words.push(str.substring(lastEnd, i));
        words.push(str[i]);
        i++;
        lastEnd = i + 1;
        break;
      default:
        break;
    }
  }
  words.push(str.substring(lastEnd, str.length));

  let current = null;
  let pos = 0;

  function isSimpleType(word) {
    return simpleTypes.includes(word);
  }

  function readNext() {
    if (pos === words.length) {
      return null;
    }
    const word = words[pos++];
    if (isSimpleType(word)) {
      return { kind: tokenKinds.simple, value: word };
    } else if (word === "list") {
      return { kind: tokenKinds.list };
    } else if (word === "->") {
      return { kind: tokenKinds.arrow };
    } else if (word[0] === "'") {
      return { kind: tokenKinds.generic, value: word };
    } else if (word === "(") {
      return { kind: tokenKinds.openParenthesis };
    } else if (word === ")") {
      return { kind: tokenKinds.closeParenthesis };
    }

    throw new Error("Unkown word: '" + word + "' words: " + words);
  }

  function peek() {
    return current || (current = readNext());
  }

  return {
    peek: peek,
    next: () => {
      var tok = current;
      current = null;
      return tok || readNext();
    }
  };
}

function makeType(tokenStream, currentType) {
  const token = tokenStream.next();

  if (token === null) {
    return currentType;
  }
  if (token.kind === tokenKinds.simple) {
    return makeType(tokenStream, { kind: typeKinds.simple, type: token.value });
  }
  if (token.kind === tokenKinds.generic) {
    return makeType(tokenStream, {
      kind: typeKinds.generic,
      type: token.value
    });
  }
  if (token.kind === tokenKinds.list) {
    return makeType(tokenStream, {
      kind: typeKinds.list,
      itemType: currentType
    });
  }
  if (token.kind === tokenKinds.arrow) {
    return {
      kind: typeKinds.func,
      input: currentType,
      output: makeType(tokenStream, null)
    };
  }
  if (token.kind === tokenKinds.openParenthesis) {
    return makeType(tokenStream, makeType(tokenStream, null));
  }
  if (token.kind === tokenKinds.closeParenthesis) {
    return currentType;
  }

  throw new Error("Unknown token: " + JSON.stringify(token));
}

// Parse type extracted from compilation error
function parseType(str) {
  return makeType(tokenStream(str));
}

const permutator = inputArr => {
  let result = [];
  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };
  permute(inputArr);
  return result;
};

const astTypeToFunctionPairs = Object.values(db).map(([type, funcs]) => [
  parseType(type),
  $$Array.of_list(funcs)
]);

export const makeAstFunctionType = (inputs, output) => {
  if (inputs.length === 0) {
    return parseType(output.type);
  }
  return {
    kind: typeKinds.func,
    input: parseType(inputs[0].type),
    output: makeAstFunctionType(inputs.slice(1), output)
  };
};

export function isTypeAssignable(left, right, genericsMap = {}) {
  if (
    left.kind === typeKinds.generic &&
    right.kind === typeKinds.generic &&
    left.type === right.type
  ) {
    return true;
  }

  if (left.kind === typeKinds.generic) {
    if (genericsMap[left.type] === undefined) {
      genericsMap[left.type] = right;
      return true;
    } else {
      return isTypeAssignable(genericsMap[left.type], right, genericsMap);
    }
  }

  if (right.kind === typeKinds.generic) {
    if (genericsMap[right.type] === undefined) {
      genericsMap[right.type] = left;
      return true;
    } else {
      return isTypeAssignable(left.type, genericsMap[right.type], genericsMap);
    }
  }

  if (left.kind !== right.kind) {
    return false;
  }

  if (left.kind === typeKinds.simple) {
    return left.type === right.type;
  }

  if (left.kind === typeKinds.list) {
    return isTypeAssignable(left.itemType, right.itemType, genericsMap);
  }

  if (left.kind === typeKinds.func) {
    return (
      isTypeAssignable(left.input, right.input, genericsMap) &&
      isTypeAssignable(left.output, right.output, genericsMap)
    );
  }

  throw new Error("Unsupported type kind", left.kind);
}

export function orderedSuggest(inputs, output) {
  const expectedFunctionType = makeAstFunctionType(inputs, output);
  const reasonInputs = inputs.map(i => i.jsValue);
  const functionsWithMatchingSignature = flatten(
    astTypeToFunctionPairs
      .filter(([ast, funcs]) => {
        return isTypeAssignable(ast, expectedFunctionType);
      })
      .map(([ast, funcs]) => funcs)
  );

  return functionsWithMatchingSignature
    .filter(
      ([func, _name]) =>
        caml_equal(func.apply(null, reasonInputs), output.jsValue) === 1
    )
    .map(([_func, name]) => name)
    .map(functionName => ({
      functionName,
      inputs,
      output
    }));
}

export default function suggest(inputs, output) {
  const compiledInputs = inputs.map(reasonExpToJs);
  const compiledOutput = reasonExpToJs(output);

  if (
    compiledInputs.some(i => i.error !== null) ||
    compiledOutput.error !== null
  ) {
    return {
      inputs: compiledInputs,
      output: compiledOutput,
      suggestions: []
    };
  }

  var validInputs = compiledInputs.filter(i => i.code.length > 0);

  if (validInputs.length === 0 || compiledOutput.code.length === 0) {
    return {
      inputs: compiledInputs,
      output: compiledOutput,
      suggestions: []
    };
  }

  return {
    inputs: compiledInputs,
    output: compiledOutput,
    suggestions: flatten(
      permutator(validInputs).map(permutedInputs =>
        orderedSuggest(permutedInputs, compiledOutput)
      )
    )
  };
}
