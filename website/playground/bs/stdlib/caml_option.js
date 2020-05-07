'use strict';


var undefinedHeader = [];

function some(x) {
  if (x === undefined) {
    var block = /* tuple */[
      undefinedHeader,
      0
    ];
    block.tag = 256;
    return block;
  }
  if (!(x !== null && x[0] === undefinedHeader)) {
    return x;
  }
  var nid = x[1] + 1 | 0;
  var block$1 = /* tuple */[
    undefinedHeader,
    nid
  ];
  block$1.tag = 256;
  return block$1;
}

function nullable_to_opt(x) {
  if (x === null || x === undefined) {
    return ;
  } else {
    return some(x);
  }
}

function undefined_to_opt(x) {
  if (x === undefined) {
    return ;
  } else {
    return some(x);
  }
}

function null_to_opt(x) {
  if (x === null) {
    return ;
  } else {
    return some(x);
  }
}

function valFromOption(x) {
  if (!(x !== null && x[0] === undefinedHeader)) {
    return x;
  }
  var depth = x[1];
  if (depth === 0) {
    return ;
  } else {
    return /* tuple */[
            undefinedHeader,
            depth - 1 | 0
          ];
  }
}

function option_get(x) {
  if (x === undefined) {
    return ;
  } else {
    return valFromOption(x);
  }
}

function option_get_unwrap(x) {
  if (x === undefined) {
    return ;
  } else {
    return valFromOption(x)[1];
  }
}

exports.nullable_to_opt = nullable_to_opt;
exports.undefined_to_opt = undefined_to_opt;
exports.null_to_opt = null_to_opt;
exports.valFromOption = valFromOption;
exports.some = some;
exports.option_get = option_get;
exports.option_get_unwrap = option_get_unwrap;
/* No side effect */
