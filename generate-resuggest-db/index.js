const functions = [
  "(~-)",
  "(~+)",
  "succ",
  "pred",
  "abs",
  "lnot",

  "(~-.)",
  "(~+.)",
  "sqrt",
  "exp",
  "log",
  "log10",
  "expm1",
  "cos",
  "sin",
  "tan",
  "acos",
  "asin",
  "atan",
  "cosh",
  "sinh",
  "tanh",
  "ceil",
  "floor",
  "abs_float",

  "(+)",
  "(-)",
  "(*)",
  "(/)",
  "(mod)",
  "(land)",
  "(lor)",
  "(lxor)",
  "(lsl)",
  "(lsr)",
  "(asr)",

  "(+.)",
  "(-.)",
  "(*.)",
  "(/.)",
  "(**)",
  "atan2",
  "hypot",
  "copysign",
  "mod_float",

  "String.get",
  "String.make",
  "String.init",
  "String.sub",
  "String.mapi",
  "String.map",
  "String.trim",
  "String.escaped",
  "String.uppercase",
  "String.lowercase",
  "String.capitalize",
  "String.uncapitalize",
  "String.index",
  "String.rindex",
  "String.index_from",
  "String.rindex_from",
  "String.contains",
  "String.contains_from",
  "String.rcontains_from",
  "(^)",
  "string_of_bool",
  "bool_of_string",
  "string_of_int",
  "int_of_string",
  "String.length",
  "string_of_float",
  "float_of_string",

  "(==)",
  "(@)",
  "List.append",
  "List.rev_append",
  "List.length",
  "List.hd",
  "List.tl",
  "List.rev",
  "List.nth",
  "List.concat",
  "List.flatten",
  "List.map",
  "List.rev_map",
  "List.mapi",
  "List.fold_left",
  "List.fold_right",
  "List.map2",
  "List.rev_map2",
  "List.fold_left2",
  "List.fold_right2",
  "List.exists",
  "List.exists2",
  "List.mem",
  "List.memq",
  "List.find",
  "List.filter",
  "List.find_all",
  "List.sort",
  "List.stable_sort",
  "List.fast_sort",
  "List.sort_uniq",
  "List.merge"
];

require("../public/bs");
const refmt = require("../public/refmt").refmt;
var fs = require("fs");

function compileReason(reason) {
  const converted = refmt(reason, "RE", "implementation", "ML");
  const ocamlCode = converted[1];
  return JSON.parse(ocaml.compile(ocamlCode));
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

function makeReasonArrayOfFunctions(name, type, functions) {
  const fns = functions.map(fnName => `(${fnName},"${fnName}")`).join(",");
  return `let ${name} = ("${type}",[${fns}]);`;
}

const functionsByType = new Map();

for (var functionName of functions) {
  const type = guessType(functionName);
  if (!functionsByType.has(type)) {
    functionsByType.set(type, []);
  }
  functionsByType.get(type).push(functionName);
}

const tmpReasonFileContent = Array.from(functionsByType)
  .map(([type, fns], i) => makeReasonArrayOfFunctions("f" + i, type, fns))
  .join("\n");

fs.writeFileSync(
  "../src/utils/db.js",
  compileReason(tmpReasonFileContent).js_code.replace(
    /stdlib/g,
    "bs-platform/lib/js"
  )
);
