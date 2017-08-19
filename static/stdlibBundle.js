require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],"stdlib/arg":[function(require,module,exports){
'use strict';

var Sys                     = require("./sys.js");
var List                    = require("./list.js");
var Block                   = require("./block.js");
var Bytes                   = require("./bytes.js");
var Curry                   = require("./curry.js");
var Buffer                  = require("./buffer.js");
var Js_exn                  = require("./js_exn.js");
var Printf                  = require("./printf.js");
var $$String                = require("./string.js");
var Caml_obj                = require("./caml_obj.js");
var Caml_array              = require("./caml_array.js");
var Pervasives              = require("./pervasives.js");
var Caml_format             = require("./caml_format.js");
var Caml_string             = require("./caml_string.js");
var Caml_exceptions         = require("./caml_exceptions.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

var Bad = Caml_exceptions.create("Arg.Bad");

var Help = Caml_exceptions.create("Arg.Help");

var Stop = Caml_exceptions.create("Arg.Stop");

function assoc3(x, _l) {
  while(true) {
    var l = _l;
    if (l) {
      var match = l[0];
      if (Caml_obj.caml_equal(match[0], x)) {
        return match[1];
      } else {
        _l = l[1];
        continue ;
        
      }
    } else {
      throw Caml_builtin_exceptions.not_found;
    }
  };
}

function make_symlist(prefix, sep, suffix, l) {
  if (l) {
    return List.fold_left((function (x, y) {
                  return x + (sep + y);
                }), prefix + l[0], l[1]) + suffix;
  } else {
    return "<none>";
  }
}

function help_action() {
  throw [
        Stop,
        /* Unknown */Block.__(0, ["-help"])
      ];
}

function add_help(speclist) {
  var add1;
  try {
    assoc3("-help", speclist);
    add1 = /* [] */0;
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      add1 = /* :: */[
        /* tuple */[
          "-help",
          /* Unit */Block.__(0, [help_action]),
          " Display this list of options"
        ],
        /* [] */0
      ];
    } else {
      throw exn;
    }
  }
  var add2;
  try {
    assoc3("--help", speclist);
    add2 = /* [] */0;
  }
  catch (exn$1){
    if (exn$1 === Caml_builtin_exceptions.not_found) {
      add2 = /* :: */[
        /* tuple */[
          "--help",
          /* Unit */Block.__(0, [help_action]),
          " Display this list of options"
        ],
        /* [] */0
      ];
    } else {
      throw exn$1;
    }
  }
  return Pervasives.$at(speclist, Pervasives.$at(add1, add2));
}

function usage_b(buf, speclist, errmsg) {
  Curry._1(Printf.bprintf(buf, /* Format */[
            /* String */Block.__(2, [
                /* No_padding */0,
                /* Char_literal */Block.__(12, [
                    /* "\n" */10,
                    /* End_of_format */0
                  ])
              ]),
            "%s\n"
          ]), errmsg);
  return List.iter((function (param) {
                var buf$1 = buf;
                var param$1 = param;
                var doc = param$1[2];
                if (doc.length) {
                  var spec = param$1[1];
                  var key = param$1[0];
                  if (spec.tag === 11) {
                    return Curry._3(Printf.bprintf(buf$1, /* Format */[
                                    /* String_literal */Block.__(11, [
                                        "  ",
                                        /* String */Block.__(2, [
                                            /* No_padding */0,
                                            /* Char_literal */Block.__(12, [
                                                /* " " */32,
                                                /* String */Block.__(2, [
                                                    /* No_padding */0,
                                                    /* String */Block.__(2, [
                                                        /* No_padding */0,
                                                        /* Char_literal */Block.__(12, [
                                                            /* "\n" */10,
                                                            /* End_of_format */0
                                                          ])
                                                      ])
                                                  ])
                                              ])
                                          ])
                                      ]),
                                    "  %s %s%s\n"
                                  ]), key, make_symlist("{", "|", "}", spec[0]), doc);
                  } else {
                    return Curry._2(Printf.bprintf(buf$1, /* Format */[
                                    /* String_literal */Block.__(11, [
                                        "  ",
                                        /* String */Block.__(2, [
                                            /* No_padding */0,
                                            /* Char_literal */Block.__(12, [
                                                /* " " */32,
                                                /* String */Block.__(2, [
                                                    /* No_padding */0,
                                                    /* Char_literal */Block.__(12, [
                                                        /* "\n" */10,
                                                        /* End_of_format */0
                                                      ])
                                                  ])
                                              ])
                                          ])
                                      ]),
                                    "  %s %s\n"
                                  ]), key, doc);
                  }
                } else {
                  return 0;
                }
              }), add_help(speclist));
}

function usage_string(speclist, errmsg) {
  var b = Buffer.create(200);
  usage_b(b, speclist, errmsg);
  return Buffer.contents(b);
}

function usage(speclist, errmsg) {
  return Curry._1(Printf.eprintf(/* Format */[
                  /* String */Block.__(2, [
                      /* No_padding */0,
                      /* End_of_format */0
                    ]),
                  "%s"
                ]), usage_string(speclist, errmsg));
}

var current = [0];

function parse_argv_dynamic($staropt$star, argv, speclist, anonfun, errmsg) {
  var current$1 = $staropt$star ? $staropt$star[0] : current;
  var l = argv.length;
  var b = Buffer.create(200);
  var initpos = current$1[0];
  var stop = function (error) {
    var progname = initpos < l ? Caml_array.caml_array_get(argv, initpos) : "(?)";
    switch (error.tag | 0) {
      case 0 : 
          var s = error[0];
          switch (s) {
            case "--help" : 
            case "-help" : 
                break;
            default:
              Curry._2(Printf.bprintf(b, /* Format */[
                        /* String */Block.__(2, [
                            /* No_padding */0,
                            /* String_literal */Block.__(11, [
                                ": unknown option '",
                                /* String */Block.__(2, [
                                    /* No_padding */0,
                                    /* String_literal */Block.__(11, [
                                        "'.\n",
                                        /* End_of_format */0
                                      ])
                                  ])
                              ])
                          ]),
                        "%s: unknown option '%s'.\n"
                      ]), progname, s);
          }
          break;
      case 1 : 
          Curry._4(Printf.bprintf(b, /* Format */[
                    /* String */Block.__(2, [
                        /* No_padding */0,
                        /* String_literal */Block.__(11, [
                            ": wrong argument '",
                            /* String */Block.__(2, [
                                /* No_padding */0,
                                /* String_literal */Block.__(11, [
                                    "'; option '",
                                    /* String */Block.__(2, [
                                        /* No_padding */0,
                                        /* String_literal */Block.__(11, [
                                            "' expects ",
                                            /* String */Block.__(2, [
                                                /* No_padding */0,
                                                /* String_literal */Block.__(11, [
                                                    ".\n",
                                                    /* End_of_format */0
                                                  ])
                                              ])
                                          ])
                                      ])
                                  ])
                              ])
                          ])
                      ]),
                    "%s: wrong argument '%s'; option '%s' expects %s.\n"
                  ]), progname, error[1], error[0], error[2]);
          break;
      case 2 : 
          Curry._2(Printf.bprintf(b, /* Format */[
                    /* String */Block.__(2, [
                        /* No_padding */0,
                        /* String_literal */Block.__(11, [
                            ": option '",
                            /* String */Block.__(2, [
                                /* No_padding */0,
                                /* String_literal */Block.__(11, [
                                    "' needs an argument.\n",
                                    /* End_of_format */0
                                  ])
                              ])
                          ])
                      ]),
                    "%s: option '%s' needs an argument.\n"
                  ]), progname, error[0]);
          break;
      case 3 : 
          Curry._2(Printf.bprintf(b, /* Format */[
                    /* String */Block.__(2, [
                        /* No_padding */0,
                        /* String_literal */Block.__(11, [
                            ": ",
                            /* String */Block.__(2, [
                                /* No_padding */0,
                                /* String_literal */Block.__(11, [
                                    ".\n",
                                    /* End_of_format */0
                                  ])
                              ])
                          ])
                      ]),
                    "%s: %s.\n"
                  ]), progname, error[0]);
          break;
      
    }
    usage_b(b, speclist[0], errmsg);
    if (Caml_obj.caml_equal(error, /* Unknown */Block.__(0, ["-help"])) || Caml_obj.caml_equal(error, /* Unknown */Block.__(0, ["--help"]))) {
      throw [
            Help,
            Buffer.contents(b)
          ];
    } else {
      throw [
            Bad,
            Buffer.contents(b)
          ];
    }
  };
  current$1[0] = current$1[0] + 1 | 0;
  while(current$1[0] < l) {
    var s = Caml_array.caml_array_get(argv, current$1[0]);
    if (s.length >= 1 && Caml_string.get(s, 0) === /* "-" */45) {
      var action;
      try {
        action = assoc3(s, speclist[0]);
      }
      catch (exn){
        if (exn === Caml_builtin_exceptions.not_found) {
          action = stop(/* Unknown */Block.__(0, [s]));
        } else {
          throw exn;
        }
      }
      try {
        var treat_action = (function(s){
        return function treat_action(param) {
          switch (param.tag | 0) {
            case 0 : 
                return Curry._1(param[0], /* () */0);
            case 1 : 
                if ((current$1[0] + 1 | 0) < l) {
                  var arg = Caml_array.caml_array_get(argv, current$1[0] + 1 | 0);
                  try {
                    Curry._1(param[0], Pervasives.bool_of_string(arg));
                  }
                  catch (raw_exn){
                    var exn = Js_exn.internalToOCamlException(raw_exn);
                    if (exn[0] === Caml_builtin_exceptions.invalid_argument) {
                      if (exn[1] === "bool_of_string") {
                        throw [
                              Stop,
                              /* Wrong */Block.__(1, [
                                  s,
                                  arg,
                                  "a boolean"
                                ])
                            ];
                      } else {
                        throw exn;
                      }
                    } else {
                      throw exn;
                    }
                  }
                  current$1[0] = current$1[0] + 1 | 0;
                  return /* () */0;
                } else {
                  throw [
                        Stop,
                        /* Missing */Block.__(2, [s])
                      ];
                }
                break;
            case 2 : 
                param[0][0] = /* true */1;
                return /* () */0;
            case 3 : 
                param[0][0] = /* false */0;
                return /* () */0;
            case 4 : 
                if ((current$1[0] + 1 | 0) < l) {
                  Curry._1(param[0], Caml_array.caml_array_get(argv, current$1[0] + 1 | 0));
                  current$1[0] = current$1[0] + 1 | 0;
                  return /* () */0;
                } else {
                  throw [
                        Stop,
                        /* Missing */Block.__(2, [s])
                      ];
                }
                break;
            case 5 : 
                if ((current$1[0] + 1 | 0) < l) {
                  param[0][0] = Caml_array.caml_array_get(argv, current$1[0] + 1 | 0);
                  current$1[0] = current$1[0] + 1 | 0;
                  return /* () */0;
                } else {
                  throw [
                        Stop,
                        /* Missing */Block.__(2, [s])
                      ];
                }
                break;
            case 6 : 
                if ((current$1[0] + 1 | 0) < l) {
                  var arg$1 = Caml_array.caml_array_get(argv, current$1[0] + 1 | 0);
                  try {
                    Curry._1(param[0], Caml_format.caml_int_of_string(arg$1));
                  }
                  catch (raw_exn$1){
                    var exn$1 = Js_exn.internalToOCamlException(raw_exn$1);
                    if (exn$1[0] === Caml_builtin_exceptions.failure) {
                      if (exn$1[1] === "int_of_string") {
                        throw [
                              Stop,
                              /* Wrong */Block.__(1, [
                                  s,
                                  arg$1,
                                  "an integer"
                                ])
                            ];
                      } else {
                        throw exn$1;
                      }
                    } else {
                      throw exn$1;
                    }
                  }
                  current$1[0] = current$1[0] + 1 | 0;
                  return /* () */0;
                } else {
                  throw [
                        Stop,
                        /* Missing */Block.__(2, [s])
                      ];
                }
                break;
            case 7 : 
                if ((current$1[0] + 1 | 0) < l) {
                  var arg$2 = Caml_array.caml_array_get(argv, current$1[0] + 1 | 0);
                  try {
                    param[0][0] = Caml_format.caml_int_of_string(arg$2);
                  }
                  catch (raw_exn$2){
                    var exn$2 = Js_exn.internalToOCamlException(raw_exn$2);
                    if (exn$2[0] === Caml_builtin_exceptions.failure) {
                      if (exn$2[1] === "int_of_string") {
                        throw [
                              Stop,
                              /* Wrong */Block.__(1, [
                                  s,
                                  arg$2,
                                  "an integer"
                                ])
                            ];
                      } else {
                        throw exn$2;
                      }
                    } else {
                      throw exn$2;
                    }
                  }
                  current$1[0] = current$1[0] + 1 | 0;
                  return /* () */0;
                } else {
                  throw [
                        Stop,
                        /* Missing */Block.__(2, [s])
                      ];
                }
                break;
            case 8 : 
                if ((current$1[0] + 1 | 0) < l) {
                  var arg$3 = Caml_array.caml_array_get(argv, current$1[0] + 1 | 0);
                  try {
                    Curry._1(param[0], Caml_format.caml_float_of_string(arg$3));
                  }
                  catch (raw_exn$3){
                    var exn$3 = Js_exn.internalToOCamlException(raw_exn$3);
                    if (exn$3[0] === Caml_builtin_exceptions.failure) {
                      if (exn$3[1] === "float_of_string") {
                        throw [
                              Stop,
                              /* Wrong */Block.__(1, [
                                  s,
                                  arg$3,
                                  "a float"
                                ])
                            ];
                      } else {
                        throw exn$3;
                      }
                    } else {
                      throw exn$3;
                    }
                  }
                  current$1[0] = current$1[0] + 1 | 0;
                  return /* () */0;
                } else {
                  throw [
                        Stop,
                        /* Missing */Block.__(2, [s])
                      ];
                }
                break;
            case 9 : 
                if ((current$1[0] + 1 | 0) < l) {
                  var arg$4 = Caml_array.caml_array_get(argv, current$1[0] + 1 | 0);
                  try {
                    param[0][0] = Caml_format.caml_float_of_string(arg$4);
                  }
                  catch (raw_exn$4){
                    var exn$4 = Js_exn.internalToOCamlException(raw_exn$4);
                    if (exn$4[0] === Caml_builtin_exceptions.failure) {
                      if (exn$4[1] === "float_of_string") {
                        throw [
                              Stop,
                              /* Wrong */Block.__(1, [
                                  s,
                                  arg$4,
                                  "a float"
                                ])
                            ];
                      } else {
                        throw exn$4;
                      }
                    } else {
                      throw exn$4;
                    }
                  }
                  current$1[0] = current$1[0] + 1 | 0;
                  return /* () */0;
                } else {
                  throw [
                        Stop,
                        /* Missing */Block.__(2, [s])
                      ];
                }
                break;
            case 10 : 
                return List.iter(treat_action, param[0]);
            case 11 : 
                if ((current$1[0] + 1 | 0) < l) {
                  var symb = param[0];
                  var arg$5 = Caml_array.caml_array_get(argv, current$1[0] + 1 | 0);
                  if (List.mem(arg$5, symb)) {
                    Curry._1(param[1], Caml_array.caml_array_get(argv, current$1[0] + 1 | 0));
                    current$1[0] = current$1[0] + 1 | 0;
                    return /* () */0;
                  } else {
                    throw [
                          Stop,
                          /* Wrong */Block.__(1, [
                              s,
                              arg$5,
                              "one of: " + make_symlist("", " ", "", symb)
                            ])
                        ];
                  }
                } else {
                  throw [
                        Stop,
                        /* Missing */Block.__(2, [s])
                      ];
                }
                break;
            case 12 : 
                var f = param[0];
                while(current$1[0] < (l - 1 | 0)) {
                  Curry._1(f, Caml_array.caml_array_get(argv, current$1[0] + 1 | 0));
                  current$1[0] = current$1[0] + 1 | 0;
                };
                return /* () */0;
            
          }
        }
        }(s));
        treat_action(action);
      }
      catch (raw_exn){
        var exn$1 = Js_exn.internalToOCamlException(raw_exn);
        if (exn$1[0] === Bad) {
          stop(/* Message */Block.__(3, [exn$1[1]]));
        } else if (exn$1[0] === Stop) {
          stop(exn$1[1]);
        } else {
          throw exn$1;
        }
      }
      current$1[0] = current$1[0] + 1 | 0;
    } else {
      try {
        Curry._1(anonfun, s);
      }
      catch (raw_exn$1){
        var exn$2 = Js_exn.internalToOCamlException(raw_exn$1);
        if (exn$2[0] === Bad) {
          stop(/* Message */Block.__(3, [exn$2[1]]));
        } else {
          throw exn$2;
        }
      }
      current$1[0] = current$1[0] + 1 | 0;
    }
  };
  return /* () */0;
}

function parse_argv($staropt$star, argv, speclist, anonfun, errmsg) {
  var current$1 = $staropt$star ? $staropt$star[0] : current;
  return parse_argv_dynamic(/* Some */[current$1], argv, [speclist], anonfun, errmsg);
}

function parse(l, f, msg) {
  try {
    return parse_argv(/* None */0, Sys.argv, l, f, msg);
  }
  catch (raw_exn){
    var exn = Js_exn.internalToOCamlException(raw_exn);
    if (exn[0] === Bad) {
      Curry._1(Printf.eprintf(/* Format */[
                /* String */Block.__(2, [
                    /* No_padding */0,
                    /* End_of_format */0
                  ]),
                "%s"
              ]), exn[1]);
      return Pervasives.exit(2);
    } else if (exn[0] === Help) {
      Curry._1(Printf.printf(/* Format */[
                /* String */Block.__(2, [
                    /* No_padding */0,
                    /* End_of_format */0
                  ]),
                "%s"
              ]), exn[1]);
      return Pervasives.exit(0);
    } else {
      throw exn;
    }
  }
}

function parse_dynamic(l, f, msg) {
  try {
    return parse_argv_dynamic(/* None */0, Sys.argv, l, f, msg);
  }
  catch (raw_exn){
    var exn = Js_exn.internalToOCamlException(raw_exn);
    if (exn[0] === Bad) {
      Curry._1(Printf.eprintf(/* Format */[
                /* String */Block.__(2, [
                    /* No_padding */0,
                    /* End_of_format */0
                  ]),
                "%s"
              ]), exn[1]);
      return Pervasives.exit(2);
    } else if (exn[0] === Help) {
      Curry._1(Printf.printf(/* Format */[
                /* String */Block.__(2, [
                    /* No_padding */0,
                    /* End_of_format */0
                  ]),
                "%s"
              ]), exn[1]);
      return Pervasives.exit(0);
    } else {
      throw exn;
    }
  }
}

function second_word(s) {
  var len = s.length;
  try {
    var _n = Bytes.index(Caml_string.bytes_of_string(s), /* " " */32);
    while(true) {
      var n = _n;
      if (n >= len) {
        return len;
      } else if (Caml_string.get(s, n) === /* " " */32) {
        _n = n + 1 | 0;
        continue ;
        
      } else {
        return n;
      }
    };
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      return len;
    } else {
      throw exn;
    }
  }
}

function max_arg_len(cur, param) {
  var kwd = param[0];
  if (param[1].tag === 11) {
    return Pervasives.max(cur, kwd.length);
  } else {
    return Pervasives.max(cur, kwd.length + second_word(param[2]) | 0);
  }
}

function align($staropt$star, speclist) {
  var limit = $staropt$star ? $staropt$star[0] : Pervasives.max_int;
  var completed = add_help(speclist);
  var len = List.fold_left(max_arg_len, 0, completed);
  var len$1 = Pervasives.min(len, limit);
  return List.map((function (param) {
                var len$2 = len$1;
                var ksd = param;
                var spec = ksd[1];
                var kwd = ksd[0];
                if (ksd[2] === "") {
                  return ksd;
                } else if (spec.tag === 11) {
                  var msg = ksd[2];
                  var cutcol = second_word(msg);
                  var n = Pervasives.max(0, len$2 - cutcol | 0) + 3 | 0;
                  var spaces = Caml_string.bytes_to_string(Bytes.make(n, /* " " */32));
                  return /* tuple */[
                          kwd,
                          spec,
                          "\n" + (spaces + msg)
                        ];
                } else {
                  var msg$1 = ksd[2];
                  var cutcol$1 = second_word(msg$1);
                  var kwd_len = kwd.length;
                  var diff = (len$2 - kwd_len | 0) - cutcol$1 | 0;
                  if (diff <= 0) {
                    return /* tuple */[
                            kwd,
                            spec,
                            msg$1
                          ];
                  } else {
                    var spaces$1 = Caml_string.bytes_to_string(Bytes.make(diff, /* " " */32));
                    var prefix = $$String.sub(msg$1, 0, cutcol$1);
                    var suffix = $$String.sub(msg$1, cutcol$1, msg$1.length - cutcol$1 | 0);
                    return /* tuple */[
                            kwd,
                            spec,
                            prefix + (spaces$1 + suffix)
                          ];
                  }
                }
              }), completed);
}

exports.parse              = parse;
exports.parse_dynamic      = parse_dynamic;
exports.parse_argv         = parse_argv;
exports.parse_argv_dynamic = parse_argv_dynamic;
exports.Help               = Help;
exports.Bad                = Bad;
exports.usage              = usage;
exports.usage_string       = usage_string;
exports.align              = align;
exports.current            = current;
/* No side effect */

},{"./block.js":"stdlib/block","./buffer.js":"stdlib/buffer","./bytes.js":"stdlib/bytes","./caml_array.js":"stdlib/caml_array","./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./caml_exceptions.js":"stdlib/caml_exceptions","./caml_format.js":"stdlib/caml_format","./caml_obj.js":"stdlib/caml_obj","./caml_string.js":"stdlib/caml_string","./curry.js":"stdlib/curry","./js_exn.js":"stdlib/js_exn","./list.js":"stdlib/list","./pervasives.js":"stdlib/pervasives","./printf.js":"stdlib/printf","./string.js":"stdlib/string","./sys.js":"stdlib/sys"}],"stdlib/arrayLabels":[function(require,module,exports){
'use strict';

var $$Array = require("./array.js");

var init = $$Array.init;

var make_matrix = $$Array.make_matrix;

var create_matrix = $$Array.create_matrix;

var append = $$Array.append;

var concat = $$Array.concat;

var sub = $$Array.sub;

var copy = $$Array.copy;

var fill = $$Array.fill;

var blit = $$Array.blit;

var to_list = $$Array.to_list;

var of_list = $$Array.of_list;

var iter = $$Array.iter;

var map = $$Array.map;

var iteri = $$Array.iteri;

var mapi = $$Array.mapi;

var fold_left = $$Array.fold_left;

var fold_right = $$Array.fold_right;

var sort = $$Array.sort;

var stable_sort = $$Array.stable_sort;

var fast_sort = $$Array.fast_sort;

exports.init          = init;
exports.make_matrix   = make_matrix;
exports.create_matrix = create_matrix;
exports.append        = append;
exports.concat        = concat;
exports.sub           = sub;
exports.copy          = copy;
exports.fill          = fill;
exports.blit          = blit;
exports.to_list       = to_list;
exports.of_list       = of_list;
exports.iter          = iter;
exports.map           = map;
exports.iteri         = iteri;
exports.mapi          = mapi;
exports.fold_left     = fold_left;
exports.fold_right    = fold_right;
exports.sort          = sort;
exports.stable_sort   = stable_sort;
exports.fast_sort     = fast_sort;
/* No side effect */

},{"./array.js":"stdlib/array"}],"stdlib/array":[function(require,module,exports){
'use strict';

var Curry                   = require("./curry.js");
var Js_exn                  = require("./js_exn.js");
var Caml_array              = require("./caml_array.js");
var Caml_exceptions         = require("./caml_exceptions.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function init(l, f) {
  if (l) {
    if (l < 0) {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "Array.init"
          ];
    } else {
      var res = Caml_array.caml_make_vect(l, Curry._1(f, 0));
      for(var i = 1 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
        res[i] = Curry._1(f, i);
      }
      return res;
    }
  } else {
    return /* array */[];
  }
}

function make_matrix(sx, sy, init) {
  var res = Caml_array.caml_make_vect(sx, /* array */[]);
  for(var x = 0 ,x_finish = sx - 1 | 0; x <= x_finish; ++x){
    res[x] = Caml_array.caml_make_vect(sy, init);
  }
  return res;
}

function copy(a) {
  var l = a.length;
  if (l) {
    return Caml_array.caml_array_sub(a, 0, l);
  } else {
    return /* array */[];
  }
}

function append(a1, a2) {
  var l1 = a1.length;
  if (l1) {
    if (a2.length) {
      return a1.concat(a2);
    } else {
      return Caml_array.caml_array_sub(a1, 0, l1);
    }
  } else {
    return copy(a2);
  }
}

function sub(a, ofs, len) {
  if (len < 0 || ofs > (a.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Array.sub"
        ];
  } else {
    return Caml_array.caml_array_sub(a, ofs, len);
  }
}

function fill(a, ofs, len, v) {
  if (ofs < 0 || len < 0 || ofs > (a.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Array.fill"
        ];
  } else {
    for(var i = ofs ,i_finish = (ofs + len | 0) - 1 | 0; i <= i_finish; ++i){
      a[i] = v;
    }
    return /* () */0;
  }
}

function blit(a1, ofs1, a2, ofs2, len) {
  if (len < 0 || ofs1 < 0 || ofs1 > (a1.length - len | 0) || ofs2 < 0 || ofs2 > (a2.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Array.blit"
        ];
  } else {
    return Caml_array.caml_array_blit(a1, ofs1, a2, ofs2, len);
  }
}

function iter(f, a) {
  for(var i = 0 ,i_finish = a.length - 1 | 0; i <= i_finish; ++i){
    Curry._1(f, a[i]);
  }
  return /* () */0;
}

function map(f, a) {
  var l = a.length;
  if (l) {
    var r = Caml_array.caml_make_vect(l, Curry._1(f, a[0]));
    for(var i = 1 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
      r[i] = Curry._1(f, a[i]);
    }
    return r;
  } else {
    return /* array */[];
  }
}

function iteri(f, a) {
  for(var i = 0 ,i_finish = a.length - 1 | 0; i <= i_finish; ++i){
    Curry._2(f, i, a[i]);
  }
  return /* () */0;
}

function mapi(f, a) {
  var l = a.length;
  if (l) {
    var r = Caml_array.caml_make_vect(l, Curry._2(f, 0, a[0]));
    for(var i = 1 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
      r[i] = Curry._2(f, i, a[i]);
    }
    return r;
  } else {
    return /* array */[];
  }
}

function to_list(a) {
  var _i = a.length - 1 | 0;
  var _res = /* [] */0;
  while(true) {
    var res = _res;
    var i = _i;
    if (i < 0) {
      return res;
    } else {
      _res = /* :: */[
        a[i],
        res
      ];
      _i = i - 1 | 0;
      continue ;
      
    }
  };
}

function list_length(_accu, _param) {
  while(true) {
    var param = _param;
    var accu = _accu;
    if (param) {
      _param = param[1];
      _accu = accu + 1 | 0;
      continue ;
      
    } else {
      return accu;
    }
  };
}

function of_list(l) {
  if (l) {
    var a = Caml_array.caml_make_vect(list_length(0, l), l[0]);
    var _i = 1;
    var _param = l[1];
    while(true) {
      var param = _param;
      var i = _i;
      if (param) {
        a[i] = param[0];
        _param = param[1];
        _i = i + 1 | 0;
        continue ;
        
      } else {
        return a;
      }
    };
  } else {
    return /* array */[];
  }
}

function fold_left(f, x, a) {
  var r = x;
  for(var i = 0 ,i_finish = a.length - 1 | 0; i <= i_finish; ++i){
    r = Curry._2(f, r, a[i]);
  }
  return r;
}

function fold_right(f, a, x) {
  var r = x;
  for(var i = a.length - 1 | 0; i >= 0; --i){
    r = Curry._2(f, a[i], r);
  }
  return r;
}

var Bottom = Caml_exceptions.create("Array.Bottom");

function sort(cmp, a) {
  var maxson = function (l, i) {
    var i31 = ((i + i | 0) + i | 0) + 1 | 0;
    var x = i31;
    if ((i31 + 2 | 0) < l) {
      if (Curry._2(cmp, Caml_array.caml_array_get(a, i31), Caml_array.caml_array_get(a, i31 + 1 | 0)) < 0) {
        x = i31 + 1 | 0;
      }
      if (Curry._2(cmp, Caml_array.caml_array_get(a, x), Caml_array.caml_array_get(a, i31 + 2 | 0)) < 0) {
        x = i31 + 2 | 0;
      }
      return x;
    } else if ((i31 + 1 | 0) < l && Curry._2(cmp, Caml_array.caml_array_get(a, i31), Caml_array.caml_array_get(a, i31 + 1 | 0)) < 0) {
      return i31 + 1 | 0;
    } else if (i31 < l) {
      return i31;
    } else {
      throw [
            Bottom,
            i
          ];
    }
  };
  var trickle = function (l, i, e) {
    try {
      var l$1 = l;
      var _i = i;
      var e$1 = e;
      while(true) {
        var i$1 = _i;
        var j = maxson(l$1, i$1);
        if (Curry._2(cmp, Caml_array.caml_array_get(a, j), e$1) > 0) {
          Caml_array.caml_array_set(a, i$1, Caml_array.caml_array_get(a, j));
          _i = j;
          continue ;
          
        } else {
          return Caml_array.caml_array_set(a, i$1, e$1);
        }
      };
    }
    catch (raw_exn){
      var exn = Js_exn.internalToOCamlException(raw_exn);
      if (exn[0] === Bottom) {
        return Caml_array.caml_array_set(a, exn[1], e);
      } else {
        throw exn;
      }
    }
  };
  var bubble = function (l, i) {
    try {
      var l$1 = l;
      var _i = i;
      while(true) {
        var i$1 = _i;
        var j = maxson(l$1, i$1);
        Caml_array.caml_array_set(a, i$1, Caml_array.caml_array_get(a, j));
        _i = j;
        continue ;
        
      };
    }
    catch (raw_exn){
      var exn = Js_exn.internalToOCamlException(raw_exn);
      if (exn[0] === Bottom) {
        return exn[1];
      } else {
        throw exn;
      }
    }
  };
  var trickleup = function (_i, e) {
    while(true) {
      var i = _i;
      var father = (i - 1 | 0) / 3 | 0;
      if (i === father) {
        throw [
              Caml_builtin_exceptions.assert_failure,
              [
                "array.ml",
                168,
                4
              ]
            ];
      }
      if (Curry._2(cmp, Caml_array.caml_array_get(a, father), e) < 0) {
        Caml_array.caml_array_set(a, i, Caml_array.caml_array_get(a, father));
        if (father > 0) {
          _i = father;
          continue ;
          
        } else {
          return Caml_array.caml_array_set(a, 0, e);
        }
      } else {
        return Caml_array.caml_array_set(a, i, e);
      }
    };
  };
  var l = a.length;
  for(var i = ((l + 1 | 0) / 3 | 0) - 1 | 0; i >= 0; --i){
    trickle(l, i, Caml_array.caml_array_get(a, i));
  }
  for(var i$1 = l - 1 | 0; i$1 >= 2; --i$1){
    var e = Caml_array.caml_array_get(a, i$1);
    Caml_array.caml_array_set(a, i$1, Caml_array.caml_array_get(a, 0));
    trickleup(bubble(i$1, 0), e);
  }
  if (l > 1) {
    var e$1 = Caml_array.caml_array_get(a, 1);
    Caml_array.caml_array_set(a, 1, Caml_array.caml_array_get(a, 0));
    return Caml_array.caml_array_set(a, 0, e$1);
  } else {
    return 0;
  }
}

function stable_sort(cmp, a) {
  var merge = function (src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs) {
    var src1r = src1ofs + src1len | 0;
    var src2r = src2ofs + src2len | 0;
    var _i1 = src1ofs;
    var _s1 = Caml_array.caml_array_get(a, src1ofs);
    var _i2 = src2ofs;
    var _s2 = Caml_array.caml_array_get(src2, src2ofs);
    var _d = dstofs;
    while(true) {
      var d = _d;
      var s2 = _s2;
      var i2 = _i2;
      var s1 = _s1;
      var i1 = _i1;
      if (Curry._2(cmp, s1, s2) <= 0) {
        Caml_array.caml_array_set(dst, d, s1);
        var i1$1 = i1 + 1 | 0;
        if (i1$1 < src1r) {
          _d = d + 1 | 0;
          _s1 = Caml_array.caml_array_get(a, i1$1);
          _i1 = i1$1;
          continue ;
          
        } else {
          return blit(src2, i2, dst, d + 1 | 0, src2r - i2 | 0);
        }
      } else {
        Caml_array.caml_array_set(dst, d, s2);
        var i2$1 = i2 + 1 | 0;
        if (i2$1 < src2r) {
          _d = d + 1 | 0;
          _s2 = Caml_array.caml_array_get(src2, i2$1);
          _i2 = i2$1;
          continue ;
          
        } else {
          return blit(a, i1, dst, d + 1 | 0, src1r - i1 | 0);
        }
      }
    };
  };
  var isortto = function (srcofs, dst, dstofs, len) {
    for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
      var e = Caml_array.caml_array_get(a, srcofs + i | 0);
      var j = (dstofs + i | 0) - 1 | 0;
      while(j >= dstofs && Curry._2(cmp, Caml_array.caml_array_get(dst, j), e) > 0) {
        Caml_array.caml_array_set(dst, j + 1 | 0, Caml_array.caml_array_get(dst, j));
        j = j - 1 | 0;
      };
      Caml_array.caml_array_set(dst, j + 1 | 0, e);
    }
    return /* () */0;
  };
  var sortto = function (srcofs, dst, dstofs, len) {
    if (len <= 5) {
      return isortto(srcofs, dst, dstofs, len);
    } else {
      var l1 = len / 2 | 0;
      var l2 = len - l1 | 0;
      sortto(srcofs + l1 | 0, dst, dstofs + l1 | 0, l2);
      sortto(srcofs, a, srcofs + l2 | 0, l1);
      return merge(srcofs + l2 | 0, l1, dst, dstofs + l1 | 0, l2, dst, dstofs);
    }
  };
  var l = a.length;
  if (l <= 5) {
    return isortto(0, a, 0, l);
  } else {
    var l1 = l / 2 | 0;
    var l2 = l - l1 | 0;
    var t = Caml_array.caml_make_vect(l2, Caml_array.caml_array_get(a, 0));
    sortto(l1, t, 0, l2);
    sortto(0, a, l2, l1);
    return merge(l2, l1, t, 0, l2, a, 0);
  }
}

var create_matrix = make_matrix;

var concat = Caml_array.caml_array_concat;

var fast_sort = stable_sort;

exports.init          = init;
exports.make_matrix   = make_matrix;
exports.create_matrix = create_matrix;
exports.append        = append;
exports.concat        = concat;
exports.sub           = sub;
exports.copy          = copy;
exports.fill          = fill;
exports.blit          = blit;
exports.to_list       = to_list;
exports.of_list       = of_list;
exports.iter          = iter;
exports.map           = map;
exports.iteri         = iteri;
exports.mapi          = mapi;
exports.fold_left     = fold_left;
exports.fold_right    = fold_right;
exports.sort          = sort;
exports.stable_sort   = stable_sort;
exports.fast_sort     = fast_sort;
/* No side effect */

},{"./caml_array.js":"stdlib/caml_array","./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./caml_exceptions.js":"stdlib/caml_exceptions","./curry.js":"stdlib/curry","./js_exn.js":"stdlib/js_exn"}],"stdlib/bigarray":[function(require,module,exports){
'use strict';

var Caml_array              = require("./caml_array.js");
var Caml_missing_polyfill   = require("./caml_missing_polyfill.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function dims() {
  var n = Caml_missing_polyfill.not_implemented("caml_ba_num_dims not implemented by bucklescript yet\n");
  var d = Caml_array.caml_make_vect(n, 0);
  for(var i = 0 ,i_finish = n - 1 | 0; i <= i_finish; ++i){
    Caml_array.caml_array_set(d, i, Caml_missing_polyfill.not_implemented("caml_ba_dim not implemented by bucklescript yet\n"));
  }
  return d;
}

function map_file(_, $staropt$star, _$1, _$2, _$3, _$4) {
  $staropt$star ? $staropt$star[0] : /* int64 */[
      /* hi */0,
      /* lo */0
    ];
  return Caml_missing_polyfill.not_implemented("caml_ba_map_file_bytecode not implemented by bucklescript yet\n");
}

var Genarray = /* module */[
  /* dims */dims,
  /* map_file */map_file
];

function create(_, _$1, _$2) {
  return Caml_missing_polyfill.not_implemented("caml_ba_create not implemented by bucklescript yet\n");
}

function of_array(kind, layout, data) {
  var ba = create(kind, layout, data.length);
  layout !== 0 ? 1 : 0;
  for(var i = 0 ,i_finish = data.length - 1 | 0; i <= i_finish; ++i){
    Caml_missing_polyfill.not_implemented("caml_ba_set_1 not implemented by bucklescript yet\n");
  }
  return ba;
}

function map_file$1(fd, pos, kind, layout, shared, dim) {
  return map_file(fd, pos, kind, layout, shared, /* int array */[dim]);
}

var Array1 = /* module */[
  /* create */create,
  /* of_array */of_array,
  /* map_file */map_file$1
];

function create$1(_, _$1, _$2, _$3) {
  return Caml_missing_polyfill.not_implemented("caml_ba_create not implemented by bucklescript yet\n");
}

function slice_left(_, _$1) {
  return Caml_missing_polyfill.not_implemented("caml_ba_slice not implemented by bucklescript yet\n");
}

function slice_right(_, _$1) {
  return Caml_missing_polyfill.not_implemented("caml_ba_slice not implemented by bucklescript yet\n");
}

function of_array$1(kind, layout, data) {
  var dim1 = data.length;
  var dim2 = dim1 ? Caml_array.caml_array_get(data, 0).length : 0;
  var ba = create$1(kind, layout, dim1, dim2);
  layout !== 0 ? 1 : 0;
  for(var i = 0 ,i_finish = dim1 - 1 | 0; i <= i_finish; ++i){
    var row = Caml_array.caml_array_get(data, i);
    if (row.length !== dim2) {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "Bigarray.Array2.of_array: non-rectangular data"
          ];
    }
    for(var j = 0 ,j_finish = dim2 - 1 | 0; j <= j_finish; ++j){
      Caml_missing_polyfill.not_implemented("caml_ba_set_2 not implemented by bucklescript yet\n");
    }
  }
  return ba;
}

function map_file$2(fd, pos, kind, layout, shared, dim1, dim2) {
  return map_file(fd, pos, kind, layout, shared, /* int array */[
              dim1,
              dim2
            ]);
}

var Array2 = /* module */[
  /* create */create$1,
  /* slice_left */slice_left,
  /* slice_right */slice_right,
  /* of_array */of_array$1,
  /* map_file */map_file$2
];

function create$2(_, _$1, _$2, _$3, _$4) {
  return Caml_missing_polyfill.not_implemented("caml_ba_create not implemented by bucklescript yet\n");
}

function slice_left_1(_, _$1, _$2) {
  return Caml_missing_polyfill.not_implemented("caml_ba_slice not implemented by bucklescript yet\n");
}

function slice_right_1(_, _$1, _$2) {
  return Caml_missing_polyfill.not_implemented("caml_ba_slice not implemented by bucklescript yet\n");
}

function slice_left_2(_, _$1) {
  return Caml_missing_polyfill.not_implemented("caml_ba_slice not implemented by bucklescript yet\n");
}

function slice_right_2(_, _$1) {
  return Caml_missing_polyfill.not_implemented("caml_ba_slice not implemented by bucklescript yet\n");
}

function of_array$2(kind, layout, data) {
  var dim1 = data.length;
  var dim2 = dim1 ? Caml_array.caml_array_get(data, 0).length : 0;
  var dim3 = dim2 ? Caml_array.caml_array_get(Caml_array.caml_array_get(data, 0), 0).length : 0;
  var ba = create$2(kind, layout, dim1, dim2, dim3);
  layout !== 0 ? 1 : 0;
  for(var i = 0 ,i_finish = dim1 - 1 | 0; i <= i_finish; ++i){
    var row = Caml_array.caml_array_get(data, i);
    if (row.length !== dim2) {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "Bigarray.Array3.of_array: non-cubic data"
          ];
    }
    for(var j = 0 ,j_finish = dim2 - 1 | 0; j <= j_finish; ++j){
      var col = Caml_array.caml_array_get(row, j);
      if (col.length !== dim3) {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "Bigarray.Array3.of_array: non-cubic data"
            ];
      }
      for(var k = 0 ,k_finish = dim3 - 1 | 0; k <= k_finish; ++k){
        Caml_missing_polyfill.not_implemented("caml_ba_set_3 not implemented by bucklescript yet\n");
      }
    }
  }
  return ba;
}

function map_file$3(fd, pos, kind, layout, shared, dim1, dim2, dim3) {
  return map_file(fd, pos, kind, layout, shared, /* int array */[
              dim1,
              dim2,
              dim3
            ]);
}

var Array3 = /* module */[
  /* create */create$2,
  /* slice_left_1 */slice_left_1,
  /* slice_right_1 */slice_right_1,
  /* slice_left_2 */slice_left_2,
  /* slice_right_2 */slice_right_2,
  /* of_array */of_array$2,
  /* map_file */map_file$3
];

function array1_of_genarray(a) {
  if (Caml_missing_polyfill.not_implemented("caml_ba_num_dims not implemented by bucklescript yet\n") === 1) {
    return a;
  } else {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Bigarray.array1_of_genarray"
        ];
  }
}

function array2_of_genarray(a) {
  if (Caml_missing_polyfill.not_implemented("caml_ba_num_dims not implemented by bucklescript yet\n") === 2) {
    return a;
  } else {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Bigarray.array2_of_genarray"
        ];
  }
}

function array3_of_genarray(a) {
  if (Caml_missing_polyfill.not_implemented("caml_ba_num_dims not implemented by bucklescript yet\n") === 3) {
    return a;
  } else {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Bigarray.array3_of_genarray"
        ];
  }
}

function reshape_1(_, _$1) {
  return Caml_missing_polyfill.not_implemented("caml_ba_reshape not implemented by bucklescript yet\n");
}

function reshape_2(_, _$1, _$2) {
  return Caml_missing_polyfill.not_implemented("caml_ba_reshape not implemented by bucklescript yet\n");
}

function reshape_3(_, _$1, _$2, _$3) {
  return Caml_missing_polyfill.not_implemented("caml_ba_reshape not implemented by bucklescript yet\n");
}

var float32 = /* Float32 */0;

var float64 = /* Float64 */1;

var complex32 = /* Complex32 */10;

var complex64 = /* Complex64 */11;

var int8_signed = /* Int8_signed */2;

var int8_unsigned = /* Int8_unsigned */3;

var int16_signed = /* Int16_signed */4;

var int16_unsigned = /* Int16_unsigned */5;

var $$int = /* Int */8;

var int32 = /* Int32 */6;

var int64 = /* Int64 */7;

var nativeint = /* Nativeint */9;

var $$char = /* Char */12;

var c_layout = /* C_layout */0;

var fortran_layout = /* Fortran_layout */1;

function reshape(_, _$1) {
  return Caml_missing_polyfill.not_implemented("caml_ba_reshape not implemented by bucklescript yet\n");
}

exports.float32            = float32;
exports.float64            = float64;
exports.complex32          = complex32;
exports.complex64          = complex64;
exports.int8_signed        = int8_signed;
exports.int8_unsigned      = int8_unsigned;
exports.int16_signed       = int16_signed;
exports.int16_unsigned     = int16_unsigned;
exports.$$int              = $$int;
exports.int32              = int32;
exports.int64              = int64;
exports.nativeint          = nativeint;
exports.$$char             = $$char;
exports.c_layout           = c_layout;
exports.fortran_layout     = fortran_layout;
exports.Genarray           = Genarray;
exports.Array1             = Array1;
exports.Array2             = Array2;
exports.Array3             = Array3;
exports.array1_of_genarray = array1_of_genarray;
exports.array2_of_genarray = array2_of_genarray;
exports.array3_of_genarray = array3_of_genarray;
exports.reshape            = reshape;
exports.reshape_1          = reshape_1;
exports.reshape_2          = reshape_2;
exports.reshape_3          = reshape_3;
/*  Not a pure module */

},{"./caml_array.js":"stdlib/caml_array","./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./caml_missing_polyfill.js":"stdlib/caml_missing_polyfill"}],"stdlib/block":[function(require,module,exports){
'use strict';


function __(tag, block) {
  block.tag = tag;
  return block;
}

exports.__ = __;
/* No side effect */

},{}],"stdlib/bs_dict":[function(require,module,exports){
'use strict';



/* No side effect */

},{}],"stdlib/bs_dyn_lib":[function(require,module,exports){
'use strict';

var Char        = require("./char.js");
var $$Array     = require("./array.js");
var Buffer      = require("./buffer.js");
var Caml_array  = require("./caml_array.js");
var Pervasives  = require("./pervasives.js");
var Caml_format = require("./caml_format.js");

function to_string(v) {
  var construct_string = function (b, _v, _tab_level) {
    while(true) {
      var tab_level = _tab_level;
      var v = _v;
      var add = function (tabs, str) {
        for(var i = 0; i <= tabs; ++i){
          Buffer.add_string(b, " ");
        }
        return Buffer.add_string(b, str);
      };
      if (typeof v === "number") {
        return add(tab_level, "None\n");
      } else {
        switch (v.tag | 0) {
          case 0 : 
              add(tab_level, Caml_format.caml_int32_format("%d", v[0]));
              return add(0, "l");
          case 1 : 
              add(tab_level, Caml_format.caml_int64_format("%d", v[0]));
              return add(0, "L");
          case 2 : 
              return add(tab_level, "" + v[0]);
          case 3 : 
              add(tab_level, Caml_format.caml_nativeint_format("%d", v[0]));
              return add(0, "n");
          case 4 : 
              return add(tab_level, v[0] ? "true" : "false");
          case 5 : 
              return add(tab_level, Pervasives.string_of_float(v[0]));
          case 6 : 
              add(tab_level, "'");
              add(0, Char.escaped(v[0]));
              return add(0, "'");
          case 7 : 
              add(tab_level, "\"");
              add(0, v[0]);
              return add(0, "\"");
          case 8 : 
              add(tab_level, "Some");
              _tab_level = 0;
              _v = v[0];
              continue ;
              case 9 : 
              var x = v[0];
              add(tab_level, "(\n");
              $$Array.iteri((function(tab_level,x){
                  return function (i, item) {
                    construct_string(b, item, tab_level + 2 | 0);
                    if (i !== (x.length - 1 | 0)) {
                      add(0, ", ");
                    }
                    return add(0, "\n");
                  }
                  }(tab_level,x)), x);
              return add(tab_level, ")");
          case 10 : 
              add(tab_level, "[|\n");
              $$Array.iter((function(tab_level){
                  return function (item) {
                    construct_string(b, item, tab_level + 2 | 0);
                    return add(0, ";\n");
                  }
                  }(tab_level)), v[0]);
              return add(tab_level, "|]");
          case 11 : 
              add(tab_level, "[");
              $$Array.iter((function(tab_level){
                  return function (item) {
                    return construct_string(b, item, tab_level + 2 | 0);
                  }
                  }(tab_level)), v[0]);
              return add(tab_level, "]\n");
          case 12 : 
              var values = v[1];
              add(tab_level, "{\n");
              $$Array.iteri((function(tab_level,values){
                  return function (i, item) {
                    add(tab_level + 2 | 0, item);
                    add(0, " =\n");
                    construct_string(b, Caml_array.caml_array_get(values, i), tab_level + 2 | 0);
                    return add(0, ";\n");
                  }
                  }(tab_level,values)), v[0]);
              return add(tab_level, "}");
          case 13 : 
              var values$1 = v[2];
              add(tab_level, Caml_array.caml_array_get(v[0][/* constructors */0], v[1]));
              if (values$1.length !== 0) {
                add(tab_level, "(\n");
                $$Array.iteri((function(tab_level,values$1){
                    return function (i, _) {
                      return construct_string(b, Caml_array.caml_array_get(values$1, i), tab_level + 2 | 0);
                    }
                    }(tab_level,values$1)), values$1);
                return add(tab_level, ")");
              } else {
                return 0;
              }
          
        }
      }
    };
  };
  var buffer = Buffer.create(1024);
  construct_string(buffer, v, 0);
  return Buffer.contents(buffer);
}

exports.to_string = to_string;
/* No side effect */

},{"./array.js":"stdlib/array","./buffer.js":"stdlib/buffer","./caml_array.js":"stdlib/caml_array","./caml_format.js":"stdlib/caml_format","./char.js":"stdlib/char","./pervasives.js":"stdlib/pervasives"}],"stdlib/bs_dyn":[function(require,module,exports){
'use strict';

var $$Array    = require("./array.js");
var Block      = require("./block.js");
var Caml_array = require("./caml_array.js");

function int32_to_value(x) {
  return /* Int32 */Block.__(0, [x]);
}

function int64_to_value(x) {
  return /* Int64 */Block.__(1, [x]);
}

function int_to_value(x) {
  return /* Int */Block.__(2, [x]);
}

function nativeint_to_value(x) {
  return /* Nativeint */Block.__(3, [x]);
}

function bool_to_value(x) {
  return /* Bool */Block.__(4, [x]);
}

function float_to_value(x) {
  return /* Float */Block.__(5, [x]);
}

function char_to_value(x) {
  return /* Char */Block.__(6, [x]);
}

function string_to_value(x) {
  return /* String */Block.__(7, [x]);
}

function array_map(f, a) {
  var l = a.length;
  if (l) {
    var r = Caml_array.caml_make_vect(l, f(a[0]));
    for(var i = 1 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
      r[i] = f(a[i]);
    }
    return r;
  } else {
    return /* array */[];
  }
}

function array_to_value(k) {
  return (function (x) {
      return /* Array */Block.__(10, [array_map(k, x)]);
    });
}

function list_to_value(k) {
  return (function (x) {
      return /* Array */Block.__(10, [array_map(k, $$Array.of_list(x))]);
    });
}

function record_to_value(labels, v) {
  return /* Record */Block.__(12, [
            labels,
            v
          ]);
}

function variant_to_value(labels, tag, vs) {
  return /* Variant */Block.__(13, [
            labels,
            tag,
            vs
          ]);
}

function tuple_2_to_value(k0, k1) {
  return (function (param) {
      return /* Tuple */Block.__(9, [/* array */[
                  k0(param[0]),
                  k1(param[1])
                ]]);
    });
}

function tuple_3_to_value(k0, k1, k2) {
  return (function (param) {
      return /* Tuple */Block.__(9, [/* array */[
                  k0(param[0]),
                  k1(param[1]),
                  k2(param[2])
                ]]);
    });
}

function tuple_4_to_value(k0, k1, k2, k3) {
  return (function (param) {
      return /* Tuple */Block.__(9, [/* array */[
                  k0(param[0]),
                  k1(param[1]),
                  k2(param[2]),
                  k3(param[3])
                ]]);
    });
}

function tuple_5_to_value(k0, k1, k2, k3, k4) {
  return (function (param) {
      return /* Tuple */Block.__(9, [/* array */[
                  k0(param[0]),
                  k1(param[1]),
                  k2(param[2]),
                  k3(param[3]),
                  k4(param[4])
                ]]);
    });
}

function tuple_6_to_value(k0, k1, k2, k3, k4, k5) {
  return (function (param) {
      return /* Tuple */Block.__(9, [/* array */[
                  k0(param[0]),
                  k1(param[1]),
                  k2(param[2]),
                  k3(param[3]),
                  k4(param[4]),
                  k5(param[5])
                ]]);
    });
}

function option_to_value(k) {
  return (function (x) {
      if (x) {
        return /* OptionSome */Block.__(8, [k(x[0])]);
      } else {
        return /* OptionNone */0;
      }
    });
}

function shape_of_record(labels) {
  return labels;
}

function shape_of_variant(constructors, arities) {
  return /* record */[
          /* constructors */constructors,
          /* arities */arities
        ];
}

exports.int32_to_value     = int32_to_value;
exports.int64_to_value     = int64_to_value;
exports.int_to_value       = int_to_value;
exports.nativeint_to_value = nativeint_to_value;
exports.bool_to_value      = bool_to_value;
exports.float_to_value     = float_to_value;
exports.char_to_value      = char_to_value;
exports.string_to_value    = string_to_value;
exports.array_to_value     = array_to_value;
exports.list_to_value      = list_to_value;
exports.option_to_value    = option_to_value;
exports.record_to_value    = record_to_value;
exports.variant_to_value   = variant_to_value;
exports.tuple_2_to_value   = tuple_2_to_value;
exports.tuple_3_to_value   = tuple_3_to_value;
exports.tuple_4_to_value   = tuple_4_to_value;
exports.tuple_5_to_value   = tuple_5_to_value;
exports.tuple_6_to_value   = tuple_6_to_value;
exports.shape_of_variant   = shape_of_variant;
exports.shape_of_record    = shape_of_record;
/* No side effect */

},{"./array.js":"stdlib/array","./block.js":"stdlib/block","./caml_array.js":"stdlib/caml_array"}],"stdlib/bs_node_buffer":[function(require,module,exports){
arguments[4]["stdlib/bs_dict"][0].apply(exports,arguments)
},{"dup":"stdlib/bs_dict"}],"stdlib/bs_node_fs":[function(require,module,exports){
'use strict';


var Watch = /* module */[];

exports.Watch = Watch;
/* No side effect */

},{}],"stdlib/bs_node_module":[function(require,module,exports){
arguments[4]["stdlib/bs_dict"][0].apply(exports,arguments)
},{"dup":"stdlib/bs_dict"}],"stdlib/bs_node_path":[function(require,module,exports){
arguments[4]["stdlib/bs_dict"][0].apply(exports,arguments)
},{"dup":"stdlib/bs_dict"}],"stdlib/bs_node_process":[function(require,module,exports){
arguments[4]["stdlib/bs_dict"][0].apply(exports,arguments)
},{"dup":"stdlib/bs_dict"}],"stdlib/bs_node":[function(require,module,exports){
'use strict';


function test(x) {
  if (typeof x === "string") {
    return /* tuple */[
            /* String */0,
            x
          ];
  }
  else {
    return /* tuple */[
            /* Buffer */1,
            x
          ];
  }
}

var Path = 0;

var Fs = 0;

var Process = 0;

var Module = 0;

var Buffer = 0;

exports.Path    = Path;
exports.Fs      = Fs;
exports.Process = Process;
exports.Module  = Module;
exports.Buffer  = Buffer;
exports.test    = test;
/* No side effect */

},{}],"stdlib/bs_obj":[function(require,module,exports){
arguments[4]["stdlib/bs_dict"][0].apply(exports,arguments)
},{"dup":"stdlib/bs_dict"}],"stdlib/bs_result":[function(require,module,exports){
arguments[4]["stdlib/bs_dict"][0].apply(exports,arguments)
},{"dup":"stdlib/bs_dict"}],"stdlib/bs_string":[function(require,module,exports){
arguments[4]["stdlib/bs_dict"][0].apply(exports,arguments)
},{"dup":"stdlib/bs_dict"}],"stdlib/bs":[function(require,module,exports){
'use strict';


var Dyn = 0;

var Dyn_lib = 0;

exports.Dyn     = Dyn;
exports.Dyn_lib = Dyn_lib;
/* No side effect */

},{}],"stdlib/buffer":[function(require,module,exports){
'use strict';

var Sys                     = require("./sys.js");
var Bytes                   = require("./bytes.js");
var Curry                   = require("./curry.js");
var $$String                = require("./string.js");
var Pervasives              = require("./pervasives.js");
var Caml_string             = require("./caml_string.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function create(n) {
  var n$1 = n < 1 ? 1 : n;
  var n$2 = n$1 > Sys.max_string_length ? Sys.max_string_length : n$1;
  var s = Caml_string.caml_create_string(n$2);
  return /* record */[
          /* buffer */s,
          /* position */0,
          /* length */n$2,
          /* initial_buffer */s
        ];
}

function contents(b) {
  return Bytes.sub_string(b[/* buffer */0], 0, b[/* position */1]);
}

function to_bytes(b) {
  return Bytes.sub(b[/* buffer */0], 0, b[/* position */1]);
}

function sub(b, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (b[/* position */1] - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Buffer.sub"
        ];
  } else {
    return Bytes.sub_string(b[/* buffer */0], ofs, len);
  }
}

function blit(src, srcoff, dst, dstoff, len) {
  if (len < 0 || srcoff < 0 || srcoff > (src[/* position */1] - len | 0) || dstoff < 0 || dstoff > (dst.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Buffer.blit"
        ];
  } else {
    return Bytes.blit(src[/* buffer */0], srcoff, dst, dstoff, len);
  }
}

function nth(b, ofs) {
  if (ofs < 0 || ofs >= b[/* position */1]) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Buffer.nth"
        ];
  } else {
    return b[/* buffer */0][ofs];
  }
}

function length(b) {
  return b[/* position */1];
}

function clear(b) {
  b[/* position */1] = 0;
  return /* () */0;
}

function reset(b) {
  b[/* position */1] = 0;
  b[/* buffer */0] = b[/* initial_buffer */3];
  b[/* length */2] = b[/* buffer */0].length;
  return /* () */0;
}

function resize(b, more) {
  var len = b[/* length */2];
  var new_len = len;
  while((b[/* position */1] + more | 0) > new_len) {
    new_len = (new_len << 1);
  };
  if (new_len > Sys.max_string_length) {
    if ((b[/* position */1] + more | 0) <= Sys.max_string_length) {
      new_len = Sys.max_string_length;
    } else {
      throw [
            Caml_builtin_exceptions.failure,
            "Buffer.add: cannot grow buffer"
          ];
    }
  }
  var new_buffer = Caml_string.caml_create_string(new_len);
  Bytes.blit(b[/* buffer */0], 0, new_buffer, 0, b[/* position */1]);
  b[/* buffer */0] = new_buffer;
  b[/* length */2] = new_len;
  return /* () */0;
}

function add_char(b, c) {
  var pos = b[/* position */1];
  if (pos >= b[/* length */2]) {
    resize(b, 1);
  }
  b[/* buffer */0][pos] = c;
  b[/* position */1] = pos + 1 | 0;
  return /* () */0;
}

function add_substring(b, s, offset, len) {
  if (offset < 0 || len < 0 || (offset + len | 0) > s.length) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Buffer.add_substring/add_subbytes"
        ];
  }
  var new_position = b[/* position */1] + len | 0;
  if (new_position > b[/* length */2]) {
    resize(b, len);
  }
  Bytes.blit_string(s, offset, b[/* buffer */0], b[/* position */1], len);
  b[/* position */1] = new_position;
  return /* () */0;
}

function add_subbytes(b, s, offset, len) {
  return add_substring(b, Caml_string.bytes_to_string(s), offset, len);
}

function add_string(b, s) {
  var len = s.length;
  var new_position = b[/* position */1] + len | 0;
  if (new_position > b[/* length */2]) {
    resize(b, len);
  }
  Bytes.blit_string(s, 0, b[/* buffer */0], b[/* position */1], len);
  b[/* position */1] = new_position;
  return /* () */0;
}

function add_bytes(b, s) {
  return add_string(b, Caml_string.bytes_to_string(s));
}

function add_buffer(b, bs) {
  return add_subbytes(b, bs[/* buffer */0], 0, bs[/* position */1]);
}

function add_channel(b, ic, len) {
  if (len < 0 || len > Sys.max_string_length) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Buffer.add_channel"
        ];
  }
  if ((b[/* position */1] + len | 0) > b[/* length */2]) {
    resize(b, len);
  }
  Pervasives.really_input(ic, b[/* buffer */0], b[/* position */1], len);
  b[/* position */1] = b[/* position */1] + len | 0;
  return /* () */0;
}

function output_buffer(oc, b) {
  return Pervasives.output(oc, b[/* buffer */0], 0, b[/* position */1]);
}

function closing(param) {
  if (param !== 40) {
    if (param !== 123) {
      throw [
            Caml_builtin_exceptions.assert_failure,
            [
              "buffer.ml",
              115,
              9
            ]
          ];
    } else {
      return /* "}" */125;
    }
  } else {
    return /* ")" */41;
  }
}

function advance_to_closing(opening, closing, k, s, start) {
  var _k = k;
  var _i = start;
  var lim = s.length;
  while(true) {
    var i = _i;
    var k$1 = _k;
    if (i >= lim) {
      throw Caml_builtin_exceptions.not_found;
    } else if (Caml_string.get(s, i) === opening) {
      _i = i + 1 | 0;
      _k = k$1 + 1 | 0;
      continue ;
      
    } else if (Caml_string.get(s, i) === closing) {
      if (k$1) {
        _i = i + 1 | 0;
        _k = k$1 - 1 | 0;
        continue ;
        
      } else {
        return i;
      }
    } else {
      _i = i + 1 | 0;
      continue ;
      
    }
  };
}

function advance_to_non_alpha(s, start) {
  var _i = start;
  var lim = s.length;
  while(true) {
    var i = _i;
    if (i >= lim) {
      return lim;
    } else {
      var match = Caml_string.get(s, i);
      var exit = 0;
      if (match >= 91) {
        if (match >= 97) {
          if (match >= 123) {
            return i;
          } else {
            exit = 1;
          }
        } else if (match !== 95) {
          return i;
        } else {
          exit = 1;
        }
      } else if (match >= 58) {
        if (match >= 65) {
          exit = 1;
        } else {
          return i;
        }
      } else if (match >= 48) {
        exit = 1;
      } else {
        return i;
      }
      if (exit === 1) {
        _i = i + 1 | 0;
        continue ;
        
      }
      
    }
  };
}

function find_ident(s, start, lim) {
  if (start >= lim) {
    throw Caml_builtin_exceptions.not_found;
  } else {
    var c = Caml_string.get(s, start);
    var exit = 0;
    if (c !== 40) {
      if (c !== 123) {
        var stop = advance_to_non_alpha(s, start + 1 | 0);
        return /* tuple */[
                $$String.sub(s, start, stop - start | 0),
                stop
              ];
      } else {
        exit = 1;
      }
    } else {
      exit = 1;
    }
    if (exit === 1) {
      var new_start = start + 1 | 0;
      var stop$1 = advance_to_closing(c, closing(c), 0, s, new_start);
      return /* tuple */[
              $$String.sub(s, new_start, (stop$1 - start | 0) - 1 | 0),
              stop$1 + 1 | 0
            ];
    }
    
  }
}

function add_substitute(b, f, s) {
  var lim = s.length;
  var _previous = /* " " */32;
  var _i = 0;
  while(true) {
    var i = _i;
    var previous = _previous;
    if (i < lim) {
      var current = Caml_string.get(s, i);
      if (current !== 36) {
        if (previous === /* "\\" */92) {
          add_char(b, /* "\\" */92);
          add_char(b, current);
          _i = i + 1 | 0;
          _previous = /* " " */32;
          continue ;
          
        } else if (current !== 92) {
          add_char(b, current);
          _i = i + 1 | 0;
          _previous = current;
          continue ;
          
        } else {
          _i = i + 1 | 0;
          _previous = current;
          continue ;
          
        }
      } else if (previous === /* "\\" */92) {
        add_char(b, current);
        _i = i + 1 | 0;
        _previous = /* " " */32;
        continue ;
        
      } else {
        var j = i + 1 | 0;
        var match = find_ident(s, j, lim);
        add_string(b, Curry._1(f, match[0]));
        _i = match[1];
        _previous = /* " " */32;
        continue ;
        
      }
    } else if (previous === /* "\\" */92) {
      return add_char(b, previous);
    } else {
      return 0;
    }
  };
}

exports.create         = create;
exports.contents       = contents;
exports.to_bytes       = to_bytes;
exports.sub            = sub;
exports.blit           = blit;
exports.nth            = nth;
exports.length         = length;
exports.clear          = clear;
exports.reset          = reset;
exports.add_char       = add_char;
exports.add_string     = add_string;
exports.add_bytes      = add_bytes;
exports.add_substring  = add_substring;
exports.add_subbytes   = add_subbytes;
exports.add_substitute = add_substitute;
exports.add_buffer     = add_buffer;
exports.add_channel    = add_channel;
exports.output_buffer  = output_buffer;
/* No side effect */

},{"./bytes.js":"stdlib/bytes","./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./caml_string.js":"stdlib/caml_string","./curry.js":"stdlib/curry","./pervasives.js":"stdlib/pervasives","./string.js":"stdlib/string","./sys.js":"stdlib/sys"}],"stdlib/bytesLabels":[function(require,module,exports){
'use strict';

var Bytes = require("./bytes.js");

var make = Bytes.make;

var init = Bytes.init;

var empty = Bytes.empty;

var copy = Bytes.copy;

var of_string = Bytes.of_string;

var to_string = Bytes.to_string;

var sub = Bytes.sub;

var sub_string = Bytes.sub_string;

var fill = Bytes.fill;

var blit = Bytes.blit;

var concat = Bytes.concat;

var iter = Bytes.iter;

var iteri = Bytes.iteri;

var map = Bytes.map;

var mapi = Bytes.mapi;

var trim = Bytes.trim;

var escaped = Bytes.escaped;

var index = Bytes.index;

var rindex = Bytes.rindex;

var index_from = Bytes.index_from;

var rindex_from = Bytes.rindex_from;

var contains = Bytes.contains;

var contains_from = Bytes.contains_from;

var rcontains_from = Bytes.rcontains_from;

var uppercase = Bytes.uppercase;

var lowercase = Bytes.lowercase;

var capitalize = Bytes.capitalize;

var uncapitalize = Bytes.uncapitalize;

var compare = Bytes.compare;

var unsafe_to_string = Bytes.unsafe_to_string;

var unsafe_of_string = Bytes.unsafe_of_string;

exports.make             = make;
exports.init             = init;
exports.empty            = empty;
exports.copy             = copy;
exports.of_string        = of_string;
exports.to_string        = to_string;
exports.sub              = sub;
exports.sub_string       = sub_string;
exports.fill             = fill;
exports.blit             = blit;
exports.concat           = concat;
exports.iter             = iter;
exports.iteri            = iteri;
exports.map              = map;
exports.mapi             = mapi;
exports.trim             = trim;
exports.escaped          = escaped;
exports.index            = index;
exports.rindex           = rindex;
exports.index_from       = index_from;
exports.rindex_from      = rindex_from;
exports.contains         = contains;
exports.contains_from    = contains_from;
exports.rcontains_from   = rcontains_from;
exports.uppercase        = uppercase;
exports.lowercase        = lowercase;
exports.capitalize       = capitalize;
exports.uncapitalize     = uncapitalize;
exports.compare          = compare;
exports.unsafe_to_string = unsafe_to_string;
exports.unsafe_of_string = unsafe_of_string;
/* No side effect */

},{"./bytes.js":"stdlib/bytes"}],"stdlib/bytes":[function(require,module,exports){
'use strict';

var Char                    = require("./char.js");
var List                    = require("./list.js");
var Curry                   = require("./curry.js");
var Caml_obj                = require("./caml_obj.js");
var Caml_int32              = require("./caml_int32.js");
var Pervasives              = require("./pervasives.js");
var Caml_string             = require("./caml_string.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function make(n, c) {
  var s = Caml_string.caml_create_string(n);
  Caml_string.caml_fill_string(s, 0, n, c);
  return s;
}

function init(n, f) {
  var s = Caml_string.caml_create_string(n);
  for(var i = 0 ,i_finish = n - 1 | 0; i <= i_finish; ++i){
    s[i] = Curry._1(f, i);
  }
  return s;
}

var empty = [];

function copy(s) {
  var len = s.length;
  var r = Caml_string.caml_create_string(len);
  Caml_string.caml_blit_bytes(s, 0, r, 0, len);
  return r;
}

function to_string(b) {
  return Caml_string.bytes_to_string(copy(b));
}

function of_string(s) {
  return copy(Caml_string.bytes_of_string(s));
}

function sub(s, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "String.sub / Bytes.sub"
        ];
  } else {
    var r = Caml_string.caml_create_string(len);
    Caml_string.caml_blit_bytes(s, ofs, r, 0, len);
    return r;
  }
}

function sub_string(b, ofs, len) {
  return Caml_string.bytes_to_string(sub(b, ofs, len));
}

function extend(s, left, right) {
  var len = (s.length + left | 0) + right | 0;
  var r = Caml_string.caml_create_string(len);
  var match = left < 0 ? /* tuple */[
      -left | 0,
      0
    ] : /* tuple */[
      0,
      left
    ];
  var dstoff = match[1];
  var srcoff = match[0];
  var cpylen = Pervasives.min(s.length - srcoff | 0, len - dstoff | 0);
  if (cpylen > 0) {
    Caml_string.caml_blit_bytes(s, srcoff, r, dstoff, cpylen);
  }
  return r;
}

function fill(s, ofs, len, c) {
  if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "String.fill / Bytes.fill"
        ];
  } else {
    return Caml_string.caml_fill_string(s, ofs, len, c);
  }
}

function blit(s1, ofs1, s2, ofs2, len) {
  if (len < 0 || ofs1 < 0 || ofs1 > (s1.length - len | 0) || ofs2 < 0 || ofs2 > (s2.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Bytes.blit"
        ];
  } else {
    return Caml_string.caml_blit_bytes(s1, ofs1, s2, ofs2, len);
  }
}

function blit_string(s1, ofs1, s2, ofs2, len) {
  if (len < 0 || ofs1 < 0 || ofs1 > (s1.length - len | 0) || ofs2 < 0 || ofs2 > (s2.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "String.blit / Bytes.blit_string"
        ];
  } else {
    return Caml_string.caml_blit_string(s1, ofs1, s2, ofs2, len);
  }
}

function iter(f, a) {
  for(var i = 0 ,i_finish = a.length - 1 | 0; i <= i_finish; ++i){
    Curry._1(f, a[i]);
  }
  return /* () */0;
}

function iteri(f, a) {
  for(var i = 0 ,i_finish = a.length - 1 | 0; i <= i_finish; ++i){
    Curry._2(f, i, a[i]);
  }
  return /* () */0;
}

function concat(sep, l) {
  if (l) {
    var hd = l[0];
    var num = [0];
    var len = [0];
    List.iter((function (s) {
            num[0] = num[0] + 1 | 0;
            len[0] = len[0] + s.length | 0;
            return /* () */0;
          }), l);
    var r = Caml_string.caml_create_string(len[0] + Caml_int32.imul(sep.length, num[0] - 1 | 0) | 0);
    Caml_string.caml_blit_bytes(hd, 0, r, 0, hd.length);
    var pos = [hd.length];
    List.iter((function (s) {
            Caml_string.caml_blit_bytes(sep, 0, r, pos[0], sep.length);
            pos[0] = pos[0] + sep.length | 0;
            Caml_string.caml_blit_bytes(s, 0, r, pos[0], s.length);
            pos[0] = pos[0] + s.length | 0;
            return /* () */0;
          }), l[1]);
    return r;
  } else {
    return empty;
  }
}

function cat(a, b) {
  return a.concat(b);
}

function is_space(param) {
  var switcher = param - 9 | 0;
  if (switcher > 4 || switcher < 0) {
    if (switcher !== 23) {
      return /* false */0;
    } else {
      return /* true */1;
    }
  } else if (switcher !== 2) {
    return /* true */1;
  } else {
    return /* false */0;
  }
}

function trim(s) {
  var len = s.length;
  var i = 0;
  while(i < len && is_space(s[i])) {
    i = i + 1 | 0;
  };
  var j = len - 1 | 0;
  while(j >= i && is_space(s[j])) {
    j = j - 1 | 0;
  };
  if (j >= i) {
    return sub(s, i, (j - i | 0) + 1 | 0);
  } else {
    return empty;
  }
}

function escaped(s) {
  var n = 0;
  for(var i = 0 ,i_finish = s.length - 1 | 0; i <= i_finish; ++i){
    var match = s[i];
    var tmp;
    if (match >= 32) {
      var switcher = match - 34 | 0;
      tmp = switcher > 58 || switcher < 0 ? (
          switcher >= 93 ? 4 : 1
        ) : (
          switcher > 57 || switcher < 1 ? 2 : 1
        );
    } else {
      tmp = match >= 11 ? (
          match !== 13 ? 4 : 2
        ) : (
          match >= 8 ? 2 : 4
        );
    }
    n = n + tmp | 0;
  }
  if (n === s.length) {
    return copy(s);
  } else {
    var s$prime = Caml_string.caml_create_string(n);
    n = 0;
    for(var i$1 = 0 ,i_finish$1 = s.length - 1 | 0; i$1 <= i_finish$1; ++i$1){
      var c = s[i$1];
      var exit = 0;
      if (c >= 35) {
        if (c !== 92) {
          if (c >= 127) {
            exit = 1;
          } else {
            s$prime[n] = c;
          }
        } else {
          exit = 2;
        }
      } else if (c >= 32) {
        if (c >= 34) {
          exit = 2;
        } else {
          s$prime[n] = c;
        }
      } else if (c >= 14) {
        exit = 1;
      } else {
        switch (c) {
          case 8 : 
              s$prime[n] = /* "\\" */92;
              n = n + 1 | 0;
              s$prime[n] = /* "b" */98;
              break;
          case 9 : 
              s$prime[n] = /* "\\" */92;
              n = n + 1 | 0;
              s$prime[n] = /* "t" */116;
              break;
          case 10 : 
              s$prime[n] = /* "\\" */92;
              n = n + 1 | 0;
              s$prime[n] = /* "n" */110;
              break;
          case 0 : 
          case 1 : 
          case 2 : 
          case 3 : 
          case 4 : 
          case 5 : 
          case 6 : 
          case 7 : 
          case 11 : 
          case 12 : 
              exit = 1;
              break;
          case 13 : 
              s$prime[n] = /* "\\" */92;
              n = n + 1 | 0;
              s$prime[n] = /* "r" */114;
              break;
          
        }
      }
      switch (exit) {
        case 1 : 
            s$prime[n] = /* "\\" */92;
            n = n + 1 | 0;
            s$prime[n] = 48 + (c / 100 | 0) | 0;
            n = n + 1 | 0;
            s$prime[n] = 48 + (c / 10 | 0) % 10 | 0;
            n = n + 1 | 0;
            s$prime[n] = 48 + c % 10 | 0;
            break;
        case 2 : 
            s$prime[n] = /* "\\" */92;
            n = n + 1 | 0;
            s$prime[n] = c;
            break;
        
      }
      n = n + 1 | 0;
    }
    return s$prime;
  }
}

function map(f, s) {
  var l = s.length;
  if (l) {
    var r = Caml_string.caml_create_string(l);
    for(var i = 0 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
      r[i] = Curry._1(f, s[i]);
    }
    return r;
  } else {
    return s;
  }
}

function mapi(f, s) {
  var l = s.length;
  if (l) {
    var r = Caml_string.caml_create_string(l);
    for(var i = 0 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
      r[i] = Curry._2(f, i, s[i]);
    }
    return r;
  } else {
    return s;
  }
}

function uppercase(s) {
  return map(Char.uppercase, s);
}

function lowercase(s) {
  return map(Char.lowercase, s);
}

function apply1(f, s) {
  if (s.length) {
    var r = copy(s);
    r[0] = Curry._1(f, s[0]);
    return r;
  } else {
    return s;
  }
}

function capitalize(s) {
  return apply1(Char.uppercase, s);
}

function uncapitalize(s) {
  return apply1(Char.lowercase, s);
}

function index_rec(s, lim, _i, c) {
  while(true) {
    var i = _i;
    if (i >= lim) {
      throw Caml_builtin_exceptions.not_found;
    } else if (s[i] === c) {
      return i;
    } else {
      _i = i + 1 | 0;
      continue ;
      
    }
  };
}

function index(s, c) {
  return index_rec(s, s.length, 0, c);
}

function index_from(s, i, c) {
  var l = s.length;
  if (i < 0 || i > l) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "String.index_from / Bytes.index_from"
        ];
  } else {
    return index_rec(s, l, i, c);
  }
}

function rindex_rec(s, _i, c) {
  while(true) {
    var i = _i;
    if (i < 0) {
      throw Caml_builtin_exceptions.not_found;
    } else if (s[i] === c) {
      return i;
    } else {
      _i = i - 1 | 0;
      continue ;
      
    }
  };
}

function rindex(s, c) {
  return rindex_rec(s, s.length - 1 | 0, c);
}

function rindex_from(s, i, c) {
  if (i < -1 || i >= s.length) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "String.rindex_from / Bytes.rindex_from"
        ];
  } else {
    return rindex_rec(s, i, c);
  }
}

function contains_from(s, i, c) {
  var l = s.length;
  if (i < 0 || i > l) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "String.contains_from / Bytes.contains_from"
        ];
  } else {
    try {
      index_rec(s, l, i, c);
      return /* true */1;
    }
    catch (exn){
      if (exn === Caml_builtin_exceptions.not_found) {
        return /* false */0;
      } else {
        throw exn;
      }
    }
  }
}

function contains(s, c) {
  return contains_from(s, 0, c);
}

function rcontains_from(s, i, c) {
  if (i < 0 || i >= s.length) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "String.rcontains_from / Bytes.rcontains_from"
        ];
  } else {
    try {
      rindex_rec(s, i, c);
      return /* true */1;
    }
    catch (exn){
      if (exn === Caml_builtin_exceptions.not_found) {
        return /* false */0;
      } else {
        throw exn;
      }
    }
  }
}

var compare = Caml_obj.caml_compare;

var unsafe_to_string = Caml_string.bytes_to_string;

var unsafe_of_string = Caml_string.bytes_of_string;

exports.make             = make;
exports.init             = init;
exports.empty            = empty;
exports.copy             = copy;
exports.of_string        = of_string;
exports.to_string        = to_string;
exports.sub              = sub;
exports.sub_string       = sub_string;
exports.extend           = extend;
exports.fill             = fill;
exports.blit             = blit;
exports.blit_string      = blit_string;
exports.concat           = concat;
exports.cat              = cat;
exports.iter             = iter;
exports.iteri            = iteri;
exports.map              = map;
exports.mapi             = mapi;
exports.trim             = trim;
exports.escaped          = escaped;
exports.index            = index;
exports.rindex           = rindex;
exports.index_from       = index_from;
exports.rindex_from      = rindex_from;
exports.contains         = contains;
exports.contains_from    = contains_from;
exports.rcontains_from   = rcontains_from;
exports.uppercase        = uppercase;
exports.lowercase        = lowercase;
exports.capitalize       = capitalize;
exports.uncapitalize     = uncapitalize;
exports.compare          = compare;
exports.unsafe_to_string = unsafe_to_string;
exports.unsafe_of_string = unsafe_of_string;
/* No side effect */

},{"./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./caml_int32.js":"stdlib/caml_int32","./caml_obj.js":"stdlib/caml_obj","./caml_string.js":"stdlib/caml_string","./char.js":"stdlib/char","./curry.js":"stdlib/curry","./list.js":"stdlib/list","./pervasives.js":"stdlib/pervasives"}],"stdlib/callback":[function(require,module,exports){
'use strict';

var Obj = require("./obj.js");

function register(_, _$1) {
  return /* () */0;
}

function register_exception(_, exn) {
  (exn.tag | 0) === Obj.object_tag ? exn : exn[0];
  return /* () */0;
}

exports.register           = register;
exports.register_exception = register_exception;
/* No side effect */

},{"./obj.js":"stdlib/obj"}],"stdlib/caml_array":[function(require,module,exports){
'use strict';

var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function caml_array_sub(x, offset, len) {
  var result = new Array(len);
  var j = 0;
  var i = offset;
  while(j < len) {
    result[j] = x[i];
    j = j + 1 | 0;
    i = i + 1 | 0;
  };
  return result;
}

function len(_acc, _l) {
  while(true) {
    var l = _l;
    var acc = _acc;
    if (l) {
      _l = l[1];
      _acc = l[0].length + acc | 0;
      continue ;
      
    } else {
      return acc;
    }
  };
}

function fill(arr, _i, _l) {
  while(true) {
    var l = _l;
    var i = _i;
    if (l) {
      var x = l[0];
      var l$1 = x.length;
      var k = i;
      var j = 0;
      while(j < l$1) {
        arr[k] = x[j];
        k = k + 1 | 0;
        j = j + 1 | 0;
      };
      _l = l[1];
      _i = k;
      continue ;
      
    } else {
      return /* () */0;
    }
  };
}

function caml_array_concat(l) {
  var v = len(0, l);
  var result = new Array(v);
  fill(result, 0, l);
  return result;
}

function caml_array_set(xs, index, newval) {
  if (index < 0 || index >= xs.length) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "index out of bounds"
        ];
  } else {
    xs[index] = newval;
    return /* () */0;
  }
}

function caml_array_get(xs, index) {
  if (index < 0 || index >= xs.length) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "index out of bounds"
        ];
  } else {
    return xs[index];
  }
}

function caml_make_vect(len, init) {
  var b = new Array(len);
  for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
    b[i] = init;
  }
  return b;
}

function caml_array_blit(a1, i1, a2, i2, len) {
  if (i2 <= i1) {
    for(var j = 0 ,j_finish = len - 1 | 0; j <= j_finish; ++j){
      a2[j + i2 | 0] = a1[j + i1 | 0];
    }
    return /* () */0;
  } else {
    for(var j$1 = len - 1 | 0; j$1 >= 0; --j$1){
      a2[j$1 + i2 | 0] = a1[j$1 + i1 | 0];
    }
    return /* () */0;
  }
}

exports.caml_array_sub    = caml_array_sub;
exports.caml_array_concat = caml_array_concat;
exports.caml_make_vect    = caml_make_vect;
exports.caml_array_blit   = caml_array_blit;
exports.caml_array_get    = caml_array_get;
exports.caml_array_set    = caml_array_set;
/* No side effect */

},{"./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions"}],"stdlib/caml_backtrace":[function(require,module,exports){
'use strict';

var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function caml_convert_raw_backtrace_slot() {
  throw [
        Caml_builtin_exceptions.failure,
        "caml_convert_raw_backtrace_slot unimplemented"
      ];
}

exports.caml_convert_raw_backtrace_slot = caml_convert_raw_backtrace_slot;
/* No side effect */

},{"./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions"}],"stdlib/caml_basic":[function(require,module,exports){
'use strict';


function some(x) {
  return /* Some */[x];
}

function is_none(x) {
  if (x) {
    return false;
  } else {
    return true;
  }
}

function to_def(x) {
  if (x) {
    return x[0];
  } else {
    return undefined;
  }
}

function cons(x, y) {
  return /* :: */[
          x,
          y
        ];
}

function is_list_empty(x) {
  if (x) {
    return false;
  } else {
    return true;
  }
}

var none = /* None */0;

exports.none          = none;
exports.some          = some;
exports.is_none       = is_none;
exports.to_def        = to_def;
exports.cons          = cons;
exports.is_list_empty = is_list_empty;
/* No side effect */

},{}],"stdlib/caml_builtin_exceptions":[function(require,module,exports){
'use strict';


var out_of_memory = /* tuple */[
  "Out_of_memory",
  0
];

var sys_error = /* tuple */[
  "Sys_error",
  -1
];

var failure = /* tuple */[
  "Failure",
  -2
];

var invalid_argument = /* tuple */[
  "Invalid_argument",
  -3
];

var end_of_file = /* tuple */[
  "End_of_file",
  -4
];

var division_by_zero = /* tuple */[
  "Division_by_zero",
  -5
];

var not_found = /* tuple */[
  "Not_found",
  -6
];

var match_failure = /* tuple */[
  "Match_failure",
  -7
];

var stack_overflow = /* tuple */[
  "Stack_overflow",
  -8
];

var sys_blocked_io = /* tuple */[
  "Sys_blocked_io",
  -9
];

var assert_failure = /* tuple */[
  "Assert_failure",
  -10
];

var undefined_recursive_module = /* tuple */[
  "Undefined_recursive_module",
  -11
];

out_of_memory.tag = 248;

sys_error.tag = 248;

failure.tag = 248;

invalid_argument.tag = 248;

end_of_file.tag = 248;

division_by_zero.tag = 248;

not_found.tag = 248;

match_failure.tag = 248;

stack_overflow.tag = 248;

sys_blocked_io.tag = 248;

assert_failure.tag = 248;

undefined_recursive_module.tag = 248;

exports.out_of_memory              = out_of_memory;
exports.sys_error                  = sys_error;
exports.failure                    = failure;
exports.invalid_argument           = invalid_argument;
exports.end_of_file                = end_of_file;
exports.division_by_zero           = division_by_zero;
exports.not_found                  = not_found;
exports.match_failure              = match_failure;
exports.stack_overflow             = stack_overflow;
exports.sys_blocked_io             = sys_blocked_io;
exports.assert_failure             = assert_failure;
exports.undefined_recursive_module = undefined_recursive_module;
/*  Not a pure module */

},{}],"stdlib/caml_bytes":[function(require,module,exports){
'use strict';

var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function get(s, i) {
  if (i < 0 || i >= s.length) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "index out of bounds"
        ];
  } else {
    return s[i];
  }
}

exports.get = get;
/* No side effect */

},{"./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions"}],"stdlib/caml_exceptions":[function(require,module,exports){
'use strict';


var id = [0];

function caml_set_oo_id(b) {
  b[1] = id[0];
  id[0] += 1;
  return b;
}

function get_id() {
  id[0] += 1;
  return id[0];
}

function create(str) {
  var v_001 = get_id(/* () */0);
  var v = /* tuple */[
    str,
    v_001
  ];
  v.tag = 248;
  return v;
}

function isCamlExceptionOrOpenVariant(e) {
  if (e === undefined) {
    return /* false */0;
  } else if (e.tag === 248) {
    return /* true */1;
  } else {
    var slot = e[0];
    if (slot !== undefined) {
      return +(slot.tag === 248);
    } else {
      return /* false */0;
    }
  }
}

exports.caml_set_oo_id               = caml_set_oo_id;
exports.get_id                       = get_id;
exports.create                       = create;
exports.isCamlExceptionOrOpenVariant = isCamlExceptionOrOpenVariant;
/* No side effect */

},{}],"stdlib/caml_float":[function(require,module,exports){
'use strict';


function caml_int32_float_of_bits(x) {
  var int32 = new Int32Array(/* array */[x]);
  var float32 = new Float32Array(int32.buffer);
  return float32[0];
}

function caml_int32_bits_of_float(x) {
  var float32 = new Float32Array(/* float array */[x]);
  return new Int32Array(float32.buffer)[0];
}

function caml_classify_float(x) {
  if (isFinite(x)) {
    if (Math.abs(x) >= 2.2250738585072014e-308) {
      return /* FP_normal */0;
    } else if (x !== 0) {
      return /* FP_subnormal */1;
    } else {
      return /* FP_zero */2;
    }
  } else if (isNaN(x)) {
    return /* FP_nan */4;
  } else {
    return /* FP_infinite */3;
  }
}

function caml_modf_float(x) {
  if (isFinite(x)) {
    var neg = +(1 / x < 0);
    var x$1 = Math.abs(x);
    var i = Math.floor(x$1);
    var f = x$1 - i;
    if (neg) {
      return /* tuple */[
              -f,
              -i
            ];
    } else {
      return /* tuple */[
              f,
              i
            ];
    }
  } else if (isNaN(x)) {
    return /* tuple */[
            NaN,
            NaN
          ];
  } else {
    return /* tuple */[
            1 / x,
            x
          ];
  }
}

function caml_ldexp_float(x, exp) {
  var match_000 = [x];
  var match_001 = [exp];
  var exp$prime = match_001;
  var x$prime = match_000;
  if (exp$prime[0] > 1023) {
    exp$prime[0] -= 1023;
    x$prime[0] = x$prime[0] * Math.pow(2, 1023);
    if (exp$prime[0] > 1023) {
      exp$prime[0] -= 1023;
      x$prime[0] = x$prime[0] * Math.pow(2, 1023);
    }
    
  } else if (exp$prime[0] < -1023) {
    exp$prime[0] += 1023;
    x$prime[0] = x$prime[0] * Math.pow(2, -1023);
  }
  return x$prime[0] * Math.pow(2, exp$prime[0]);
}

function caml_frexp_float(x) {
  if (x === 0 || !isFinite(x)) {
    return /* tuple */[
            x,
            0
          ];
  } else {
    var neg = +(x < 0);
    var x$prime = Math.abs(x);
    var exp = Math.floor(Math.LOG2E * Math.log(x$prime)) + 1;
    x$prime = x$prime * Math.pow(2, -exp);
    if (x$prime < 0.5) {
      x$prime = x$prime * 2;
      exp -= 1;
    }
    if (neg) {
      x$prime = -x$prime;
    }
    return /* tuple */[
            x$prime,
            exp | 0
          ];
  }
}

function caml_float_compare(x, y) {
  if (x === y) {
    return 0;
  } else if (x < y) {
    return -1;
  } else if (x > y || x === x) {
    return 1;
  } else if (y === y) {
    return -1;
  } else {
    return 0;
  }
}

function caml_copysign_float(x, y) {
  var x$1 = Math.abs(x);
  var y$1 = y === 0 ? 1 / y : y;
  if (y$1 < 0) {
    return -x$1;
  } else {
    return x$1;
  }
}

function caml_expm1_float(x) {
  var y = Math.exp(x);
  var z = y - 1;
  if (Math.abs(x) > 1) {
    return z;
  } else if (z === 0) {
    return x;
  } else {
    return x * z / Math.log(y);
  }
}

function caml_hypot_float(x, y) {
  var match_000 = Math.abs(x);
  var match_001 = Math.abs(y);
  var y0 = match_001;
  var x0 = match_000;
  var a = Math.max(x0, y0);
  var b = Math.min(x0, y0) / (
    a !== 0 ? a : 1
  );
  return a * Math.sqrt(1 + b * b);
}

function caml_log10_float(x) {
  return Math.LOG10E * Math.log(x);
}

exports.caml_int32_float_of_bits = caml_int32_float_of_bits;
exports.caml_int32_bits_of_float = caml_int32_bits_of_float;
exports.caml_classify_float      = caml_classify_float;
exports.caml_modf_float          = caml_modf_float;
exports.caml_ldexp_float         = caml_ldexp_float;
exports.caml_frexp_float         = caml_frexp_float;
exports.caml_float_compare       = caml_float_compare;
exports.caml_copysign_float      = caml_copysign_float;
exports.caml_expm1_float         = caml_expm1_float;
exports.caml_hypot_float         = caml_hypot_float;
exports.caml_log10_float         = caml_log10_float;
/* No side effect */

},{}],"stdlib/caml_format":[function(require,module,exports){
'use strict';

var Curry                   = require("./curry.js");
var Caml_int32              = require("./caml_int32.js");
var Caml_int64              = require("./caml_int64.js");
var Caml_utils              = require("./caml_utils.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function caml_failwith(s) {
  throw [
        Caml_builtin_exceptions.failure,
        s
      ];
}

function parse_digit(c) {
  if (c >= 65) {
    if (c >= 97) {
      if (c >= 123) {
        return -1;
      } else {
        return c - 87 | 0;
      }
    } else if (c >= 91) {
      return -1;
    } else {
      return c - 55 | 0;
    }
  } else if (c > 57 || c < 48) {
    return -1;
  } else {
    return c - /* "0" */48 | 0;
  }
}

function int_of_string_base(param) {
  switch (param) {
    case 0 : 
        return 8;
    case 1 : 
        return 16;
    case 2 : 
        return 10;
    case 3 : 
        return 2;
    
  }
}

function parse_sign_and_base(s) {
  var sign = 1;
  var base = /* Dec */2;
  var i = 0;
  if (s[i] === "-") {
    sign = -1;
    i = i + 1 | 0;
  }
  var match = s.charCodeAt(i);
  var match$1 = s.charCodeAt(i + 1 | 0);
  if (match === 48) {
    if (match$1 >= 89) {
      if (match$1 !== 98) {
        if (match$1 !== 111) {
          if (match$1 === 120) {
            base = /* Hex */1;
            i = i + 2 | 0;
          }
          
        } else {
          base = /* Oct */0;
          i = i + 2 | 0;
        }
      } else {
        base = /* Bin */3;
        i = i + 2 | 0;
      }
    } else if (match$1 !== 66) {
      if (match$1 !== 79) {
        if (match$1 >= 88) {
          base = /* Hex */1;
          i = i + 2 | 0;
        }
        
      } else {
        base = /* Oct */0;
        i = i + 2 | 0;
      }
    } else {
      base = /* Bin */3;
      i = i + 2 | 0;
    }
  }
  return /* tuple */[
          i,
          sign,
          base
        ];
}

function caml_int_of_string(s) {
  var match = parse_sign_and_base(s);
  var i = match[0];
  var base = int_of_string_base(match[2]);
  var threshold = 4294967295;
  var len = s.length;
  var c = i < len ? s.charCodeAt(i) : /* "\000" */0;
  var d = parse_digit(c);
  if (d < 0 || d >= base) {
    throw [
          Caml_builtin_exceptions.failure,
          "int_of_string"
        ];
  }
  var aux = function (_acc, _k) {
    while(true) {
      var k = _k;
      var acc = _acc;
      if (k === len) {
        return acc;
      } else {
        var a = s.charCodeAt(k);
        if (a === /* "_" */95) {
          _k = k + 1 | 0;
          continue ;
          
        } else {
          var v = parse_digit(a);
          if (v < 0 || v >= base) {
            throw [
                  Caml_builtin_exceptions.failure,
                  "int_of_string"
                ];
          } else {
            var acc$1 = base * acc + v;
            if (acc$1 > threshold) {
              throw [
                    Caml_builtin_exceptions.failure,
                    "int_of_string"
                  ];
            } else {
              _k = k + 1 | 0;
              _acc = acc$1;
              continue ;
              
            }
          }
        }
      }
    };
  };
  var res = match[1] * aux(d, i + 1 | 0);
  var or_res = res | 0;
  if (base === 10 && res !== or_res) {
    throw [
          Caml_builtin_exceptions.failure,
          "int_of_string"
        ];
  }
  return or_res;
}

function caml_int64_of_string(s) {
  var match = parse_sign_and_base(s);
  var hbase = match[2];
  var i = match[0];
  var base = Caml_int64.of_int32(int_of_string_base(hbase));
  var sign = Caml_int64.of_int32(match[1]);
  var threshold;
  switch (hbase) {
    case 0 : 
        threshold = /* int64 */[
          /* hi */536870911,
          /* lo */4294967295
        ];
        break;
    case 1 : 
        threshold = /* int64 */[
          /* hi */268435455,
          /* lo */4294967295
        ];
        break;
    case 2 : 
        threshold = /* int64 */[
          /* hi */429496729,
          /* lo */2576980377
        ];
        break;
    case 3 : 
        threshold = /* int64 */[
          /* hi */2147483647,
          /* lo */4294967295
        ];
        break;
    
  }
  var len = s.length;
  var c = i < len ? s.charCodeAt(i) : /* "\000" */0;
  var d = Caml_int64.of_int32(parse_digit(c));
  if (Caml_int64.lt(d, /* int64 */[
          /* hi */0,
          /* lo */0
        ]) || Caml_int64.ge(d, base)) {
    throw [
          Caml_builtin_exceptions.failure,
          "int64_of_string"
        ];
  }
  var aux = function (_acc, _k) {
    while(true) {
      var k = _k;
      var acc = _acc;
      if (k === len) {
        return acc;
      } else {
        var a = s.charCodeAt(k);
        if (a === /* "_" */95) {
          _k = k + 1 | 0;
          continue ;
          
        } else {
          var v = Caml_int64.of_int32(parse_digit(a));
          if (Caml_int64.lt(v, /* int64 */[
                  /* hi */0,
                  /* lo */0
                ]) || Caml_int64.ge(v, base) || Caml_int64.gt(acc, threshold)) {
            throw [
                  Caml_builtin_exceptions.failure,
                  "int64_of_string"
                ];
          } else {
            var acc$1 = Caml_int64.add(Caml_int64.mul(base, acc), v);
            _k = k + 1 | 0;
            _acc = acc$1;
            continue ;
            
          }
        }
      }
    };
  };
  var res = Caml_int64.mul(sign, aux(d, i + 1 | 0));
  var or_res = Caml_int64.or_(res, /* int64 */[
        /* hi */0,
        /* lo */0
      ]);
  if (Caml_int64.eq(base, /* int64 */[
          /* hi */0,
          /* lo */10
        ]) && Caml_int64.neq(res, or_res)) {
    throw [
          Caml_builtin_exceptions.failure,
          "int64_of_string"
        ];
  }
  return or_res;
}

function int_of_base(param) {
  switch (param) {
    case 0 : 
        return 8;
    case 1 : 
        return 16;
    case 2 : 
        return 10;
    
  }
}

function lowercase(c) {
  if (c >= /* "A" */65 && c <= /* "Z" */90 || c >= /* "\192" */192 && c <= /* "\214" */214 || c >= /* "\216" */216 && c <= /* "\222" */222) {
    return c + 32 | 0;
  } else {
    return c;
  }
}

function parse_format(fmt) {
  var len = fmt.length;
  if (len > 31) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "format_int: format too long"
        ];
  }
  var f = /* record */[
    /* justify */"+",
    /* signstyle */"-",
    /* filter */" ",
    /* alternate : false */0,
    /* base : Dec */2,
    /* signedconv : false */0,
    /* width */0,
    /* uppercase : false */0,
    /* sign */1,
    /* prec */-1,
    /* conv */"f"
  ];
  var _i = 0;
  while(true) {
    var i = _i;
    if (i >= len) {
      return f;
    } else {
      var c = fmt.charCodeAt(i);
      var exit = 0;
      if (c >= 69) {
        if (c >= 88) {
          if (c >= 121) {
            exit = 1;
          } else {
            switch (c - 88 | 0) {
              case 0 : 
                  f[/* base */4] = /* Hex */1;
                  f[/* uppercase */7] = /* true */1;
                  _i = i + 1 | 0;
                  continue ;
                  case 13 : 
              case 14 : 
              case 15 : 
                  exit = 5;
                  break;
              case 12 : 
              case 17 : 
                  exit = 4;
                  break;
              case 23 : 
                  f[/* base */4] = /* Oct */0;
                  _i = i + 1 | 0;
                  continue ;
                  case 29 : 
                  f[/* base */4] = /* Dec */2;
                  _i = i + 1 | 0;
                  continue ;
                  case 1 : 
              case 2 : 
              case 3 : 
              case 4 : 
              case 5 : 
              case 6 : 
              case 7 : 
              case 8 : 
              case 9 : 
              case 10 : 
              case 11 : 
              case 16 : 
              case 18 : 
              case 19 : 
              case 20 : 
              case 21 : 
              case 22 : 
              case 24 : 
              case 25 : 
              case 26 : 
              case 27 : 
              case 28 : 
              case 30 : 
              case 31 : 
                  exit = 1;
                  break;
              case 32 : 
                  f[/* base */4] = /* Hex */1;
                  _i = i + 1 | 0;
                  continue ;
                  
            }
          }
        } else if (c >= 72) {
          exit = 1;
        } else {
          f[/* signedconv */5] = /* true */1;
          f[/* uppercase */7] = /* true */1;
          f[/* conv */10] = String.fromCharCode(lowercase(c));
          _i = i + 1 | 0;
          continue ;
          
        }
      } else {
        var switcher = c - 32 | 0;
        if (switcher > 25 || switcher < 0) {
          exit = 1;
        } else {
          switch (switcher) {
            case 3 : 
                f[/* alternate */3] = /* true */1;
                _i = i + 1 | 0;
                continue ;
                case 0 : 
            case 11 : 
                exit = 2;
                break;
            case 13 : 
                f[/* justify */0] = "-";
                _i = i + 1 | 0;
                continue ;
                case 14 : 
                f[/* prec */9] = 0;
                var j = i + 1 | 0;
                while((function(j){
                    return function () {
                      var w = fmt.charCodeAt(j) - /* "0" */48 | 0;
                      return +(w >= 0 && w <= 9);
                    }
                    }(j))()) {
                  f[/* prec */9] = (Caml_int32.imul(f[/* prec */9], 10) + fmt.charCodeAt(j) | 0) - /* "0" */48 | 0;
                  j = j + 1 | 0;
                };
                _i = j;
                continue ;
                case 1 : 
            case 2 : 
            case 4 : 
            case 5 : 
            case 6 : 
            case 7 : 
            case 8 : 
            case 9 : 
            case 10 : 
            case 12 : 
            case 15 : 
                exit = 1;
                break;
            case 16 : 
                f[/* filter */2] = "0";
                _i = i + 1 | 0;
                continue ;
                case 17 : 
            case 18 : 
            case 19 : 
            case 20 : 
            case 21 : 
            case 22 : 
            case 23 : 
            case 24 : 
            case 25 : 
                exit = 3;
                break;
            
          }
        }
      }
      switch (exit) {
        case 1 : 
            _i = i + 1 | 0;
            continue ;
            case 2 : 
            f[/* signstyle */1] = String.fromCharCode(c);
            _i = i + 1 | 0;
            continue ;
            case 3 : 
            f[/* width */6] = 0;
            var j$1 = i;
            while((function(j$1){
                return function () {
                  var w = fmt.charCodeAt(j$1) - /* "0" */48 | 0;
                  return +(w >= 0 && w <= 9);
                }
                }(j$1))()) {
              f[/* width */6] = (Caml_int32.imul(f[/* width */6], 10) + fmt.charCodeAt(j$1) | 0) - /* "0" */48 | 0;
              j$1 = j$1 + 1 | 0;
            };
            _i = j$1;
            continue ;
            case 4 : 
            f[/* signedconv */5] = /* true */1;
            f[/* base */4] = /* Dec */2;
            _i = i + 1 | 0;
            continue ;
            case 5 : 
            f[/* signedconv */5] = /* true */1;
            f[/* conv */10] = String.fromCharCode(c);
            _i = i + 1 | 0;
            continue ;
            
      }
    }
  };
}

function finish_formatting(param, rawbuffer) {
  var justify = param[/* justify */0];
  var signstyle = param[/* signstyle */1];
  var filter = param[/* filter */2];
  var alternate = param[/* alternate */3];
  var base = param[/* base */4];
  var signedconv = param[/* signedconv */5];
  var width = param[/* width */6];
  var uppercase = param[/* uppercase */7];
  var sign = param[/* sign */8];
  var len = rawbuffer.length;
  if (signedconv && (sign < 0 || signstyle !== "-")) {
    len = len + 1 | 0;
  }
  if (alternate) {
    if (base) {
      if (base === /* Hex */1) {
        len = len + 2 | 0;
      }
      
    } else {
      len = len + 1 | 0;
    }
  }
  var buffer = "";
  if (justify === "+" && filter === " ") {
    for(var i = len ,i_finish = width - 1 | 0; i <= i_finish; ++i){
      buffer = buffer + filter;
    }
  }
  if (signedconv) {
    if (sign < 0) {
      buffer = buffer + "-";
    } else if (signstyle !== "-") {
      buffer = buffer + signstyle;
    }
    
  }
  if (alternate && base === /* Oct */0) {
    buffer = buffer + "0";
  }
  if (alternate && base === /* Hex */1) {
    buffer = buffer + "0x";
  }
  if (justify === "+" && filter === "0") {
    for(var i$1 = len ,i_finish$1 = width - 1 | 0; i$1 <= i_finish$1; ++i$1){
      buffer = buffer + filter;
    }
  }
  buffer = uppercase ? buffer + rawbuffer.toUpperCase() : buffer + rawbuffer;
  if (justify === "-") {
    for(var i$2 = len ,i_finish$2 = width - 1 | 0; i$2 <= i_finish$2; ++i$2){
      buffer = buffer + " ";
    }
  }
  return buffer;
}

function caml_format_int(fmt, i) {
  if (fmt === "%d") {
    return String(i);
  } else {
    var f = parse_format(fmt);
    var f$1 = f;
    var i$1 = i;
    var i$2 = i$1 < 0 ? (
        f$1[/* signedconv */5] ? (f$1[/* sign */8] = -1, -i$1) : (i$1 >>> 0)
      ) : i$1;
    var s = i$2.toString(int_of_base(f$1[/* base */4]));
    if (f$1[/* prec */9] >= 0) {
      f$1[/* filter */2] = " ";
      var n = f$1[/* prec */9] - s.length | 0;
      if (n > 0) {
        s = Caml_utils.repeat(n, "0") + s;
      }
      
    }
    return finish_formatting(f$1, s);
  }
}

function caml_int64_format(fmt, x) {
  var f = parse_format(fmt);
  var x$1 = f[/* signedconv */5] && Caml_int64.lt(x, /* int64 */[
        /* hi */0,
        /* lo */0
      ]) ? (f[/* sign */8] = -1, Caml_int64.neg(x)) : x;
  var s = "";
  var match = f[/* base */4];
  switch (match) {
    case 0 : 
        var wbase = /* int64 */[
          /* hi */0,
          /* lo */8
        ];
        var cvtbl = "01234567";
        if (Caml_int64.lt(x$1, /* int64 */[
                /* hi */0,
                /* lo */0
              ])) {
          var y = Caml_int64.discard_sign(x$1);
          var match$1 = Caml_int64.div_mod(y, wbase);
          var quotient = Caml_int64.add(/* int64 */[
                /* hi */268435456,
                /* lo */0
              ], match$1[0]);
          var modulus = match$1[1];
          s = String.fromCharCode(cvtbl.charCodeAt(modulus[1] | 0)) + s;
          while(Caml_int64.neq(quotient, /* int64 */[
                  /* hi */0,
                  /* lo */0
                ])) {
            var match$2 = Caml_int64.div_mod(quotient, wbase);
            quotient = match$2[0];
            modulus = match$2[1];
            s = String.fromCharCode(cvtbl.charCodeAt(modulus[1] | 0)) + s;
          };
        } else {
          var match$3 = Caml_int64.div_mod(x$1, wbase);
          var quotient$1 = match$3[0];
          var modulus$1 = match$3[1];
          s = String.fromCharCode(cvtbl.charCodeAt(modulus$1[1] | 0)) + s;
          while(Caml_int64.neq(quotient$1, /* int64 */[
                  /* hi */0,
                  /* lo */0
                ])) {
            var match$4 = Caml_int64.div_mod(quotient$1, wbase);
            quotient$1 = match$4[0];
            modulus$1 = match$4[1];
            s = String.fromCharCode(cvtbl.charCodeAt(modulus$1[1] | 0)) + s;
          };
        }
        break;
    case 1 : 
        s = Caml_int64.to_hex(x$1) + s;
        break;
    case 2 : 
        var wbase$1 = /* int64 */[
          /* hi */0,
          /* lo */10
        ];
        var cvtbl$1 = "0123456789";
        if (Caml_int64.lt(x$1, /* int64 */[
                /* hi */0,
                /* lo */0
              ])) {
          var y$1 = Caml_int64.discard_sign(x$1);
          var match$5 = Caml_int64.div_mod(y$1, wbase$1);
          var match$6 = Caml_int64.div_mod(Caml_int64.add(/* int64 */[
                    /* hi */0,
                    /* lo */8
                  ], match$5[1]), wbase$1);
          var quotient$2 = Caml_int64.add(Caml_int64.add(/* int64 */[
                    /* hi */214748364,
                    /* lo */3435973836
                  ], match$5[0]), match$6[0]);
          var modulus$2 = match$6[1];
          s = String.fromCharCode(cvtbl$1.charCodeAt(modulus$2[1] | 0)) + s;
          while(Caml_int64.neq(quotient$2, /* int64 */[
                  /* hi */0,
                  /* lo */0
                ])) {
            var match$7 = Caml_int64.div_mod(quotient$2, wbase$1);
            quotient$2 = match$7[0];
            modulus$2 = match$7[1];
            s = String.fromCharCode(cvtbl$1.charCodeAt(modulus$2[1] | 0)) + s;
          };
        } else {
          var match$8 = Caml_int64.div_mod(x$1, wbase$1);
          var quotient$3 = match$8[0];
          var modulus$3 = match$8[1];
          s = String.fromCharCode(cvtbl$1.charCodeAt(modulus$3[1] | 0)) + s;
          while(Caml_int64.neq(quotient$3, /* int64 */[
                  /* hi */0,
                  /* lo */0
                ])) {
            var match$9 = Caml_int64.div_mod(quotient$3, wbase$1);
            quotient$3 = match$9[0];
            modulus$3 = match$9[1];
            s = String.fromCharCode(cvtbl$1.charCodeAt(modulus$3[1] | 0)) + s;
          };
        }
        break;
    
  }
  if (f[/* prec */9] >= 0) {
    f[/* filter */2] = " ";
    var n = f[/* prec */9] - s.length | 0;
    if (n > 0) {
      s = Caml_utils.repeat(n, "0") + s;
    }
    
  }
  return finish_formatting(f, s);
}

function caml_format_float(fmt, x) {
  var f = parse_format(fmt);
  var prec = f[/* prec */9] < 0 ? 6 : f[/* prec */9];
  var x$1 = x < 0 ? (f[/* sign */8] = -1, -x) : x;
  var s = "";
  if (isNaN(x$1)) {
    s = "nan";
    f[/* filter */2] = " ";
  } else if (isFinite(x$1)) {
    var match = f[/* conv */10];
    switch (match) {
      case "e" : 
          s = x$1.toExponential(prec);
          var i = s.length;
          if (s[i - 3 | 0] === "e") {
            s = s.slice(0, i - 1 | 0) + ("0" + s.slice(i - 1 | 0));
          }
          break;
      case "f" : 
          s = x$1.toFixed(prec);
          break;
      case "g" : 
          var prec$1 = prec !== 0 ? prec : 1;
          s = x$1.toExponential(prec$1 - 1 | 0);
          var j = s.indexOf("e");
          var exp = Number(s.slice(j + 1 | 0)) | 0;
          if (exp < -4 || x$1 >= 1e21 || x$1.toFixed().length > prec$1) {
            var i$1 = j - 1 | 0;
            while(s[i$1] === "0") {
              i$1 = i$1 - 1 | 0;
            };
            if (s[i$1] === ".") {
              i$1 = i$1 - 1 | 0;
            }
            s = s.slice(0, i$1 + 1 | 0) + s.slice(j);
            var i$2 = s.length;
            if (s[i$2 - 3 | 0] === "e") {
              s = s.slice(0, i$2 - 1 | 0) + ("0" + s.slice(i$2 - 1 | 0));
            }
            
          } else {
            var p = prec$1;
            if (exp < 0) {
              p = p - (exp + 1 | 0) | 0;
              s = x$1.toFixed(p);
            } else {
              while((function () {
                      s = x$1.toFixed(p);
                      return +(s.length > (prec$1 + 1 | 0));
                    })()) {
                p = p - 1 | 0;
              };
            }
            if (p !== 0) {
              var k = s.length - 1 | 0;
              while(s[k] === "0") {
                k = k - 1 | 0;
              };
              if (s[k] === ".") {
                k = k - 1 | 0;
              }
              s = s.slice(0, k + 1 | 0);
            }
            
          }
          break;
      default:
        
    }
  } else {
    s = "inf";
    f[/* filter */2] = " ";
  }
  return finish_formatting(f, s);
}

var float_of_string = (
  function (s, caml_failwith) {
    var res = +s;
    if ((s.length > 0) && (res === res))
        return res;
    s = s.replace(/_/g, "");
    res = +s;
    if (((s.length > 0) && (res === res)) || /^[+-]?nan$/i.test(s)) {
        return res;
    }
    ;
    if (/^ *0x[0-9a-f_]+p[+-]?[0-9_]+/i.test(s)) {
        var pidx = s.indexOf('p');
        pidx = (pidx == -1) ? s.indexOf('P') : pidx;
        var exp = +s.substring(pidx + 1);
        res = +s.substring(0, pidx);
        return res * Math.pow(2, exp);
    }
    if (/^\+?inf(inity)?$/i.test(s))
        return Infinity;
    if (/^-inf(inity)?$/i.test(s))
        return -Infinity;
    caml_failwith("float_of_string");
}

);

function caml_float_of_string(s) {
  return Curry._2(float_of_string, s, caml_failwith);
}

var caml_nativeint_format = caml_format_int;

var caml_int32_format = caml_format_int;

var caml_int32_of_string = caml_int_of_string;

var caml_nativeint_of_string = caml_int_of_string;

exports.caml_format_float        = caml_format_float;
exports.caml_format_int          = caml_format_int;
exports.caml_nativeint_format    = caml_nativeint_format;
exports.caml_int32_format        = caml_int32_format;
exports.caml_float_of_string     = caml_float_of_string;
exports.caml_int64_format        = caml_int64_format;
exports.caml_int_of_string       = caml_int_of_string;
exports.caml_int32_of_string     = caml_int32_of_string;
exports.caml_int64_of_string     = caml_int64_of_string;
exports.caml_nativeint_of_string = caml_nativeint_of_string;
/* float_of_string Not a pure module */

},{"./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./caml_int32.js":"stdlib/caml_int32","./caml_int64.js":"stdlib/caml_int64","./caml_utils.js":"stdlib/caml_utils","./curry.js":"stdlib/curry"}],"stdlib/caml_gc":[function(require,module,exports){
'use strict';


var dummy_stat = /* record */[
  /* minor_words */0,
  /* promoted_words */0,
  /* major_words */0,
  /* minor_collections */0,
  /* major_collections */0,
  /* heap_words */0,
  /* heap_chunks */0,
  /* live_words */0,
  /* live_blocks */0,
  /* free_words */0,
  /* free_blocks */0,
  /* largest_free */0,
  /* fragments */0,
  /* compactions */0,
  /* top_heap_words */0,
  /* stack_size */0
];

function caml_gc_stat() {
  return dummy_stat;
}

function caml_gc_quick_stat() {
  return dummy_stat;
}

function caml_gc_counters() {
  return /* tuple */[
          0,
          0,
          0
        ];
}

function caml_gc_get() {
  return /* record */[
          /* minor_heap_size */0,
          /* major_heap_increment */0,
          /* space_overhead */0,
          /* verbose */0,
          /* max_overhead */0,
          /* stack_limit */0,
          /* allocation_policy */0
        ];
}

function caml_gc_set() {
  return /* () */0;
}

function caml_gc_minor() {
  return /* () */0;
}

function caml_gc_major_slice() {
  return 0;
}

function caml_gc_major() {
  return /* () */0;
}

function caml_gc_full_major() {
  return /* () */0;
}

function caml_gc_compaction() {
  return /* () */0;
}

function caml_final_register(_, _$1) {
  return /* () */0;
}

function caml_final_release() {
  return /* () */0;
}

exports.caml_gc_stat        = caml_gc_stat;
exports.caml_gc_quick_stat  = caml_gc_quick_stat;
exports.caml_gc_counters    = caml_gc_counters;
exports.caml_gc_get         = caml_gc_get;
exports.caml_gc_set         = caml_gc_set;
exports.caml_gc_minor       = caml_gc_minor;
exports.caml_gc_major_slice = caml_gc_major_slice;
exports.caml_gc_major       = caml_gc_major;
exports.caml_gc_full_major  = caml_gc_full_major;
exports.caml_gc_compaction  = caml_gc_compaction;
exports.caml_final_register = caml_final_register;
exports.caml_final_release  = caml_final_release;
/* No side effect */

},{}],"stdlib/caml_hash":[function(require,module,exports){
'use strict';

var Caml_int32              = require("./caml_int32.js");
var Caml_queue              = require("./caml_queue.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function rotl32(x, n) {
  return (x << n) | (x >>> (32 - n | 0));
}

function mix(h, d) {
  var d$1 = d;
  d$1 = Caml_int32.imul(d$1, 3432918353);
  d$1 = rotl32(d$1, 15);
  d$1 = Caml_int32.imul(d$1, 461845907);
  var h$1 = h ^ d$1;
  h$1 = rotl32(h$1, 13);
  return (h$1 + (h$1 << 2) | 0) + 3864292196 | 0;
}

function final_mix(h) {
  var h$1 = h ^ (h >>> 16);
  h$1 = Caml_int32.imul(h$1, 2246822507);
  h$1 = h$1 ^ (h$1 >>> 13);
  h$1 = Caml_int32.imul(h$1, 3266489909);
  return h$1 ^ (h$1 >>> 16);
}

function caml_hash_mix_string(h, s) {
  var len = s.length;
  var block = (len / 4 | 0) - 1 | 0;
  var hash = h;
  for(var i = 0; i <= block; ++i){
    var j = (i << 2);
    var w = s.charCodeAt(j) | (s.charCodeAt(j + 1 | 0) << 8) | (s.charCodeAt(j + 2 | 0) << 16) | (s.charCodeAt(j + 3 | 0) << 24);
    hash = mix(hash, w);
  }
  var modulo = len & 3;
  if (modulo !== 0) {
    var w$1 = modulo === 3 ? (s.charCodeAt(len - 1 | 0) << 16) | (s.charCodeAt(len - 2 | 0) << 8) | s.charCodeAt(len - 3 | 0) : (
        modulo === 2 ? (s.charCodeAt(len - 1 | 0) << 8) | s.charCodeAt(len - 2 | 0) : s.charCodeAt(len - 1 | 0)
      );
    hash = mix(hash, w$1);
  }
  hash = hash ^ len;
  return hash;
}

function caml_hash(count, _, seed, obj) {
  var hash = seed;
  if (typeof obj === "number") {
    var u = obj | 0;
    hash = mix(hash, (u + u | 0) + 1 | 0);
    return final_mix(hash);
  } else if (typeof obj === "string") {
    hash = caml_hash_mix_string(hash, obj);
    return final_mix(hash);
  } else {
    var queue = /* record */[
      /* length */0,
      /* tail : None */0
    ];
    var num = count;
    Caml_queue.push(obj, queue);
    num = num - 1 | 0;
    while(queue[/* length */0] !== 0 && num > 0) {
      var obj$1 = Caml_queue.unsafe_pop(queue);
      if (typeof obj$1 === "number") {
        var u$1 = obj$1 | 0;
        hash = mix(hash, (u$1 + u$1 | 0) + 1 | 0);
        num = num - 1 | 0;
      } else if (typeof obj$1 === "string") {
        hash = caml_hash_mix_string(hash, obj$1);
        num = num - 1 | 0;
      } else if (typeof obj$1 !== "boolean") {
        if (typeof obj$1 !== "undefined") {
          if (typeof obj$1 === "symbol") {
            throw [
                  Caml_builtin_exceptions.assert_failure,
                  [
                    "caml_hash.ml",
                    135,
                    8
                  ]
                ];
          } else if (typeof obj$1 !== "function") {
            var size = obj$1.length;
            if (size !== undefined) {
              var obj_tag = obj$1.tag | 0;
              var tag = (size << 10) | obj_tag;
              if (tag === 248) {
                hash = mix(hash, obj$1[1]);
              } else {
                hash = mix(hash, tag);
                var v = size - 1 | 0;
                var block = v < num ? v : num;
                for(var i = 0; i <= block; ++i){
                  Caml_queue.push(obj$1[i], queue);
                }
              }
            }
            
          }
          
        }
        
      }
      
    };
    return final_mix(hash);
  }
}

exports.caml_hash = caml_hash;
/* No side effect */

},{"./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./caml_int32.js":"stdlib/caml_int32","./caml_queue.js":"stdlib/caml_queue"}],"stdlib/caml_int32":[function(require,module,exports){
'use strict';

var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function div(x, y) {
  if (y === 0) {
    throw Caml_builtin_exceptions.division_by_zero;
  } else {
    return x / y | 0;
  }
}

function mod_(x, y) {
  if (y === 0) {
    throw Caml_builtin_exceptions.division_by_zero;
  } else {
    return x % y;
  }
}

function caml_bswap16(x) {
  return ((x & 255) << 8) | ((x & 65280) >>> 8);
}

function caml_int32_bswap(x) {
  return ((x & 255) << 24) | ((x & 65280) << 8) | ((x & 16711680) >>> 8) | ((x & 4278190080) >>> 24);
}

var imul = ( Math.imul || function (x,y) {
  y |= 0; return ((((x >> 16) * y) << 16) + (x & 0xffff) * y)|0; 
}
);

var caml_nativeint_bswap = caml_int32_bswap;

exports.div                  = div;
exports.mod_                 = mod_;
exports.caml_bswap16         = caml_bswap16;
exports.caml_int32_bswap     = caml_int32_bswap;
exports.caml_nativeint_bswap = caml_nativeint_bswap;
exports.imul                 = imul;
/* imul Not a pure module */

},{"./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions"}],"stdlib/caml_int64":[function(require,module,exports){
'use strict';

var Caml_obj                = require("./caml_obj.js");
var Caml_int32              = require("./caml_int32.js");
var Caml_utils              = require("./caml_utils.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

var min_int = /* record */[
  /* hi */-2147483648,
  /* lo */0
];

var max_int = /* record */[
  /* hi */134217727,
  /* lo */1
];

var one = /* record */[
  /* hi */0,
  /* lo */1
];

var zero = /* record */[
  /* hi */0,
  /* lo */0
];

var neg_one = /* record */[
  /* hi */-1,
  /* lo */4294967295
];

function neg_signed(x) {
  return +((x & 2147483648) !== 0);
}

function add(param, param$1) {
  var other_low_ = param$1[/* lo */1];
  var this_low_ = param[/* lo */1];
  var lo = this_low_ + other_low_ & 4294967295;
  var overflow = neg_signed(this_low_) && (neg_signed(other_low_) || !neg_signed(lo)) || neg_signed(other_low_) && !neg_signed(lo) ? 1 : 0;
  var hi = param[/* hi */0] + param$1[/* hi */0] + overflow & 4294967295;
  return /* record */[
          /* hi */hi,
          /* lo */(lo >>> 0)
        ];
}

function not(param) {
  var hi = param[/* hi */0] ^ -1;
  var lo = param[/* lo */1] ^ -1;
  return /* record */[
          /* hi */hi,
          /* lo */(lo >>> 0)
        ];
}

function eq(x, y) {
  if (x[/* hi */0] === y[/* hi */0]) {
    return +(x[/* lo */1] === y[/* lo */1]);
  } else {
    return /* false */0;
  }
}

function neg(x) {
  if (eq(x, min_int)) {
    return min_int;
  } else {
    return add(not(x), one);
  }
}

function sub(x, y) {
  return add(x, neg(y));
}

function lsl_(x, numBits) {
  if (numBits) {
    var lo = x[/* lo */1];
    if (numBits >= 32) {
      return /* record */[
              /* hi */(lo << (numBits - 32 | 0)),
              /* lo */0
            ];
    } else {
      var hi = (lo >>> (32 - numBits | 0)) | (x[/* hi */0] << numBits);
      return /* record */[
              /* hi */hi,
              /* lo */((lo << numBits) >>> 0)
            ];
    }
  } else {
    return x;
  }
}

function lsr_(x, numBits) {
  if (numBits) {
    var hi = x[/* hi */0];
    var offset = numBits - 32 | 0;
    if (offset) {
      if (offset > 0) {
        var lo = (hi >>> offset);
        return /* record */[
                /* hi */0,
                /* lo */(lo >>> 0)
              ];
      } else {
        var hi$1 = (hi >>> numBits);
        var lo$1 = (hi << (-offset | 0)) | (x[/* lo */1] >>> numBits);
        return /* record */[
                /* hi */hi$1,
                /* lo */(lo$1 >>> 0)
              ];
      }
    } else {
      return /* record */[
              /* hi */0,
              /* lo */(hi >>> 0)
            ];
    }
  } else {
    return x;
  }
}

function asr_(x, numBits) {
  if (numBits) {
    var hi = x[/* hi */0];
    if (numBits < 32) {
      var hi$1 = (hi >> numBits);
      var lo = (hi << (32 - numBits | 0)) | (x[/* lo */1] >>> numBits);
      return /* record */[
              /* hi */hi$1,
              /* lo */(lo >>> 0)
            ];
    } else {
      var lo$1 = (hi >> (numBits - 32 | 0));
      return /* record */[
              /* hi */hi >= 0 ? 0 : -1,
              /* lo */(lo$1 >>> 0)
            ];
    }
  } else {
    return x;
  }
}

function is_zero(param) {
  if (param[/* hi */0] !== 0 || param[/* lo */1] !== 0) {
    return /* false */0;
  } else {
    return /* true */1;
  }
}

function mul(_this, _other) {
  while(true) {
    var other = _other;
    var $$this = _this;
    var exit = 0;
    var lo;
    var this_hi = $$this[/* hi */0];
    var exit$1 = 0;
    var exit$2 = 0;
    var exit$3 = 0;
    if (this_hi !== 0) {
      exit$3 = 4;
    } else if ($$this[/* lo */1] !== 0) {
      exit$3 = 4;
    } else {
      return zero;
    }
    if (exit$3 === 4) {
      if (other[/* hi */0] !== 0) {
        exit$2 = 3;
      } else if (other[/* lo */1] !== 0) {
        exit$2 = 3;
      } else {
        return zero;
      }
    }
    if (exit$2 === 3) {
      if (this_hi !== -2147483648) {
        exit$1 = 2;
      } else if ($$this[/* lo */1] !== 0) {
        exit$1 = 2;
      } else {
        lo = other[/* lo */1];
        exit = 1;
      }
    }
    if (exit$1 === 2) {
      var other_hi = other[/* hi */0];
      var lo$1 = $$this[/* lo */1];
      var exit$4 = 0;
      if (other_hi !== -2147483648) {
        exit$4 = 3;
      } else if (other[/* lo */1] !== 0) {
        exit$4 = 3;
      } else {
        lo = lo$1;
        exit = 1;
      }
      if (exit$4 === 3) {
        var other_lo = other[/* lo */1];
        if (this_hi < 0) {
          if (other_hi < 0) {
            _other = neg(other);
            _this = neg($$this);
            continue ;
            
          } else {
            return neg(mul(neg($$this), other));
          }
        } else if (other_hi < 0) {
          return neg(mul($$this, neg(other)));
        } else {
          var a48 = (this_hi >>> 16);
          var a32 = this_hi & 65535;
          var a16 = (lo$1 >>> 16);
          var a00 = lo$1 & 65535;
          var b48 = (other_hi >>> 16);
          var b32 = other_hi & 65535;
          var b16 = (other_lo >>> 16);
          var b00 = other_lo & 65535;
          var c48 = 0;
          var c32 = 0;
          var c16 = 0;
          var c00 = a00 * b00;
          c16 = (c00 >>> 16) + a16 * b00;
          c32 = (c16 >>> 16);
          c16 = (c16 & 65535) + a00 * b16;
          c32 = c32 + (c16 >>> 16) + a32 * b00;
          c48 = (c32 >>> 16);
          c32 = (c32 & 65535) + a16 * b16;
          c48 += (c32 >>> 16);
          c32 = (c32 & 65535) + a00 * b32;
          c48 += (c32 >>> 16);
          c32 = c32 & 65535;
          c48 = c48 + (a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48) & 65535;
          var hi = c32 | (c48 << 16);
          var lo$2 = c00 & 65535 | ((c16 & 65535) << 16);
          return /* record */[
                  /* hi */hi,
                  /* lo */(lo$2 >>> 0)
                ];
        }
      }
      
    }
    if (exit === 1) {
      if ((lo & 1) === 0) {
        return zero;
      } else {
        return min_int;
      }
    }
    
  };
}

function swap(param) {
  var hi = Caml_int32.caml_int32_bswap(param[/* lo */1]);
  var lo = Caml_int32.caml_int32_bswap(param[/* hi */0]);
  return /* record */[
          /* hi */hi,
          /* lo */(lo >>> 0)
        ];
}

function xor(param, param$1) {
  return /* record */[
          /* hi */param[/* hi */0] ^ param$1[/* hi */0],
          /* lo */((param[/* lo */1] ^ param$1[/* lo */1]) >>> 0)
        ];
}

function or_(param, param$1) {
  return /* record */[
          /* hi */param[/* hi */0] | param$1[/* hi */0],
          /* lo */((param[/* lo */1] | param$1[/* lo */1]) >>> 0)
        ];
}

function and_(param, param$1) {
  return /* record */[
          /* hi */param[/* hi */0] & param$1[/* hi */0],
          /* lo */((param[/* lo */1] & param$1[/* lo */1]) >>> 0)
        ];
}

function ge(param, param$1) {
  var other_hi = param$1[/* hi */0];
  var hi = param[/* hi */0];
  if (hi > other_hi) {
    return /* true */1;
  } else if (hi < other_hi) {
    return /* false */0;
  } else {
    return +(param[/* lo */1] >= param$1[/* lo */1]);
  }
}

function neq(x, y) {
  return 1 - eq(x, y);
}

function lt(x, y) {
  return 1 - ge(x, y);
}

function gt(x, y) {
  if (x[/* hi */0] > y[/* hi */0]) {
    return /* true */1;
  } else if (x[/* hi */0] < y[/* hi */0]) {
    return /* false */0;
  } else {
    return +(x[/* lo */1] > y[/* lo */1]);
  }
}

function le(x, y) {
  return 1 - gt(x, y);
}

function to_float(param) {
  return param[/* hi */0] * (0x100000000) + param[/* lo */1];
}

var two_ptr_32_dbl = Math.pow(2, 32);

var two_ptr_63_dbl = Math.pow(2, 63);

var neg_two_ptr_63 = -Math.pow(2, 63);

function of_float(x) {
  if (isNaN(x) || !isFinite(x)) {
    return zero;
  } else if (x <= neg_two_ptr_63) {
    return min_int;
  } else if (x + 1 >= two_ptr_63_dbl) {
    return max_int;
  } else if (x < 0) {
    return neg(of_float(-x));
  } else {
    var hi = x / two_ptr_32_dbl | 0;
    var lo = x % two_ptr_32_dbl | 0;
    return /* record */[
            /* hi */hi,
            /* lo */(lo >>> 0)
          ];
  }
}

function div(_self, _other) {
  while(true) {
    var other = _other;
    var self = _self;
    var self_hi = self[/* hi */0];
    var exit = 0;
    var exit$1 = 0;
    if (other[/* hi */0] !== 0) {
      exit$1 = 2;
    } else if (other[/* lo */1] !== 0) {
      exit$1 = 2;
    } else {
      throw Caml_builtin_exceptions.division_by_zero;
    }
    if (exit$1 === 2) {
      if (self_hi !== -2147483648) {
        if (self_hi !== 0) {
          exit = 1;
        } else if (self[/* lo */1] !== 0) {
          exit = 1;
        } else {
          return zero;
        }
      } else if (self[/* lo */1] !== 0) {
        exit = 1;
      } else if (eq(other, one) || eq(other, neg_one)) {
        return self;
      } else if (eq(other, min_int)) {
        return one;
      } else {
        var other_hi = other[/* hi */0];
        var half_this = asr_(self, 1);
        var approx = lsl_(div(half_this, other), 1);
        var exit$2 = 0;
        if (approx[/* hi */0] !== 0) {
          exit$2 = 3;
        } else if (approx[/* lo */1] !== 0) {
          exit$2 = 3;
        } else if (other_hi < 0) {
          return one;
        } else {
          return neg(one);
        }
        if (exit$2 === 3) {
          var y = mul(other, approx);
          var rem = add(self, neg(y));
          return add(approx, div(rem, other));
        }
        
      }
    }
    if (exit === 1) {
      var other_hi$1 = other[/* hi */0];
      var exit$3 = 0;
      if (other_hi$1 !== -2147483648) {
        exit$3 = 2;
      } else if (other[/* lo */1] !== 0) {
        exit$3 = 2;
      } else {
        return zero;
      }
      if (exit$3 === 2) {
        if (self_hi < 0) {
          if (other_hi$1 < 0) {
            _other = neg(other);
            _self = neg(self);
            continue ;
            
          } else {
            return neg(div(neg(self), other));
          }
        } else if (other_hi$1 < 0) {
          return neg(div(self, neg(other)));
        } else {
          var res = zero;
          var rem$1 = self;
          while(ge(rem$1, other)) {
            var approx$1 = Math.max(1, Math.floor(to_float(rem$1) / to_float(other)));
            var log2 = Math.ceil(Math.log(approx$1) / Math.LN2);
            var delta = log2 <= 48 ? 1 : Math.pow(2, log2 - 48);
            var approxRes = of_float(approx$1);
            var approxRem = mul(approxRes, other);
            while(approxRem[/* hi */0] < 0 || gt(approxRem, rem$1)) {
              approx$1 -= delta;
              approxRes = of_float(approx$1);
              approxRem = mul(approxRes, other);
            };
            if (is_zero(approxRes)) {
              approxRes = one;
            }
            res = add(res, approxRes);
            rem$1 = add(rem$1, neg(approxRem));
          };
          return res;
        }
      }
      
    }
    
  };
}

function mod_(self, other) {
  var y = mul(div(self, other), other);
  return add(self, neg(y));
}

function div_mod(self, other) {
  var quotient = div(self, other);
  var y = mul(quotient, other);
  return /* tuple */[
          quotient,
          add(self, neg(y))
        ];
}

function compare(self, other) {
  var v = Caml_obj.caml_nativeint_compare(self[/* hi */0], other[/* hi */0]);
  if (v) {
    return v;
  } else {
    return Caml_obj.caml_nativeint_compare(self[/* lo */1], other[/* lo */1]);
  }
}

function of_int32(lo) {
  return /* record */[
          /* hi */lo < 0 ? -1 : 0,
          /* lo */(lo >>> 0)
        ];
}

function to_int32(x) {
  return x[/* lo */1] | 0;
}

function to_hex(x) {
  var aux = function (v) {
    return (v >>> 0).toString(16);
  };
  var match = x[/* hi */0];
  var match$1 = x[/* lo */1];
  var exit = 0;
  if (match !== 0) {
    exit = 1;
  } else if (match$1 !== 0) {
    exit = 1;
  } else {
    return "0";
  }
  if (exit === 1) {
    if (match$1 !== 0) {
      if (match !== 0) {
        var lo = aux(x[/* lo */1]);
        var pad = 8 - lo.length | 0;
        if (pad <= 0) {
          return aux(x[/* hi */0]) + lo;
        } else {
          return aux(x[/* hi */0]) + (Caml_utils.repeat(pad, "0") + lo);
        }
      } else {
        return aux(x[/* lo */1]);
      }
    } else {
      return aux(x[/* hi */0]) + "00000000";
    }
  }
  
}

function discard_sign(x) {
  return /* record */[
          /* hi */2147483647 & x[/* hi */0],
          /* lo */x[/* lo */1]
        ];
}

function float_of_bits(x) {
  var int32 = new Int32Array(/* array */[
        x[/* lo */1],
        x[/* hi */0]
      ]);
  return new Float64Array(int32.buffer)[0];
}

function bits_of_float(x) {
  var u = new Float64Array(/* float array */[x]);
  var int32 = new Int32Array(u.buffer);
  var x$1 = int32[1];
  var hi = x$1;
  var x$2 = int32[0];
  var lo = x$2;
  return /* record */[
          /* hi */hi,
          /* lo */(lo >>> 0)
        ];
}

function get64(s, i) {
  var hi = (s.charCodeAt(i + 4 | 0) << 32) | (s.charCodeAt(i + 5 | 0) << 40) | (s.charCodeAt(i + 6 | 0) << 48) | (s.charCodeAt(i + 7 | 0) << 56);
  var lo = s.charCodeAt(i) | (s.charCodeAt(i + 1 | 0) << 8) | (s.charCodeAt(i + 2 | 0) << 16) | (s.charCodeAt(i + 3 | 0) << 24);
  return /* record */[
          /* hi */hi,
          /* lo */(lo >>> 0)
        ];
}

exports.min_int       = min_int;
exports.max_int       = max_int;
exports.one           = one;
exports.zero          = zero;
exports.not           = not;
exports.of_int32      = of_int32;
exports.to_int32      = to_int32;
exports.add           = add;
exports.neg           = neg;
exports.sub           = sub;
exports.lsl_          = lsl_;
exports.lsr_          = lsr_;
exports.asr_          = asr_;
exports.is_zero       = is_zero;
exports.mul           = mul;
exports.xor           = xor;
exports.or_           = or_;
exports.and_          = and_;
exports.swap          = swap;
exports.ge            = ge;
exports.eq            = eq;
exports.neq           = neq;
exports.lt            = lt;
exports.gt            = gt;
exports.le            = le;
exports.to_float      = to_float;
exports.of_float      = of_float;
exports.div           = div;
exports.mod_          = mod_;
exports.div_mod       = div_mod;
exports.compare       = compare;
exports.to_hex        = to_hex;
exports.discard_sign  = discard_sign;
exports.float_of_bits = float_of_bits;
exports.bits_of_float = bits_of_float;
exports.get64         = get64;
/* two_ptr_32_dbl Not a pure module */

},{"./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./caml_int32.js":"stdlib/caml_int32","./caml_obj.js":"stdlib/caml_obj","./caml_utils.js":"stdlib/caml_utils"}],"stdlib/caml_io":[function(require,module,exports){
(function (process){
'use strict';

var Curry                   = require("./curry.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function $caret(prim, prim$1) {
  return prim + prim$1;
}

var stdin = undefined;

var stdout = /* record */[
  /* buffer */"",
  /* output */(function (_, s) {
      var v = s.length - 1 | 0;
      if (( (typeof process !== "undefined") && process.stdout && process.stdout.write)) {
        return ( process.stdout.write )(s);
      } else if (s[v] === "\n") {
        console.log(s.slice(0, v));
        return /* () */0;
      } else {
        console.log(s);
        return /* () */0;
      }
    })
];

var stderr = /* record */[
  /* buffer */"",
  /* output */(function (_, s) {
      var v = s.length - 1 | 0;
      if (s[v] === "\n") {
        console.log(s.slice(0, v));
        return /* () */0;
      } else {
        console.log(s);
        return /* () */0;
      }
    })
];

function caml_ml_open_descriptor_in() {
  throw [
        Caml_builtin_exceptions.failure,
        "caml_ml_open_descriptor_in not implemented"
      ];
}

function caml_ml_open_descriptor_out() {
  throw [
        Caml_builtin_exceptions.failure,
        "caml_ml_open_descriptor_out not implemented"
      ];
}

function caml_ml_flush(oc) {
  if (oc[/* buffer */0] !== "") {
    Curry._2(oc[/* output */1], oc, oc[/* buffer */0]);
    oc[/* buffer */0] = "";
    return /* () */0;
  } else {
    return 0;
  }
}

var node_std_output = (function (s){
   return (typeof process !== "undefined") && process.stdout && (process.stdout.write(s), true);
   }
);

function caml_ml_output(oc, str, offset, len) {
  var str$1 = offset === 0 && len === str.length ? str : str.slice(offset, len);
  if (( (typeof process !== "undefined") && process.stdout && process.stdout.write ) && oc === stdout) {
    return ( process.stdout.write )(str$1);
  } else {
    var id = str$1.lastIndexOf("\n");
    if (id < 0) {
      oc[/* buffer */0] = oc[/* buffer */0] + str$1;
      return /* () */0;
    } else {
      oc[/* buffer */0] = oc[/* buffer */0] + str$1.slice(0, id + 1 | 0);
      caml_ml_flush(oc);
      oc[/* buffer */0] = oc[/* buffer */0] + str$1.slice(id + 1 | 0);
      return /* () */0;
    }
  }
}

function caml_ml_output_char(oc, $$char) {
  return caml_ml_output(oc, String.fromCharCode($$char), 0, 1);
}

function caml_ml_input(_, _$1, _$2, _$3) {
  throw [
        Caml_builtin_exceptions.failure,
        "caml_ml_input ic not implemented"
      ];
}

function caml_ml_input_char() {
  throw [
        Caml_builtin_exceptions.failure,
        "caml_ml_input_char not implemnted"
      ];
}

function caml_ml_out_channels_list() {
  return /* :: */[
          stdout,
          /* :: */[
            stderr,
            /* [] */0
          ]
        ];
}

exports.$caret                      = $caret;
exports.stdin                       = stdin;
exports.stdout                      = stdout;
exports.stderr                      = stderr;
exports.caml_ml_open_descriptor_in  = caml_ml_open_descriptor_in;
exports.caml_ml_open_descriptor_out = caml_ml_open_descriptor_out;
exports.caml_ml_flush               = caml_ml_flush;
exports.node_std_output             = node_std_output;
exports.caml_ml_output              = caml_ml_output;
exports.caml_ml_output_char         = caml_ml_output_char;
exports.caml_ml_input               = caml_ml_input;
exports.caml_ml_input_char          = caml_ml_input_char;
exports.caml_ml_out_channels_list   = caml_ml_out_channels_list;
/* stdin Not a pure module */

}).call(this,require('_process'))
},{"./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./curry.js":"stdlib/curry","_process":1}],"stdlib/caml_lexer":[function(require,module,exports){
'use strict';

var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function fail() {
  throw [
        Caml_builtin_exceptions.failure,
        "lexing: empty token"
      ];
}

 

/***********************************************************************/
/*                                                                     */
/*                           Objective Caml                            */
/*                                                                     */
/*            Xavier Leroy, projet Cristal, INRIA Rocquencourt         */
/*                                                                     */
/*  Copyright 1996 Institut National de Recherche en Informatique et   */
/*  en Automatique.  All rights reserved.  This file is distributed    */
/*  under the terms of the GNU Library General Public License, with    */
/*  the special exception on linking described in file ../LICENSE.     */
/*                                                                     */
/***********************************************************************/

/* $Id: lexing.c 6045 2004-01-01 16:42:43Z doligez $ */

/* The table-driven automaton for lexers generated by camllex. */

function caml_lex_array(s) {
    var l = s.length / 2;
    var a = new Array(l);
    // when s.charCodeAt(2 * i + 1 ) > 128 (0x80)
    // a[i] < 0  
    // for(var i = 0 ; i <= 0xffff; ++i) { if (i << 16 >> 16 !==i){console.log(i<<16>>16, 'vs',i)}}
    // 
    for (var i = 0; i < l; i++)
        a[i] = (s.charCodeAt(2 * i) | (s.charCodeAt(2 * i + 1) << 8)) << 16 >> 16;
    return a;
}
/**
 * external c_engine  : lex_tables -> int -> lexbuf -> int
 * lexing.ml
 * type lex_tables = {
 *   lex_base : string;
 *   lex_backtrk : string;
 *   lex_default : string;
 *   lex_trans : string;
 *   lex_check : string;
 *   lex_base_code : string;
 *   lex_backtrk_code : string;
 *   lex_default_code : string;
 *   lex_trans_code : string;
 *   lex_check_code : string;
 *   lex_code : string;
 * }
 *
 * type lexbuf = {
 *   refill_buff : lexbuf -> unit ;
 *   mutable lex_buffer : bytes;
 *   mutable lex_buffer_len : int;
 *   mutable lex_abs_pos : int;
 *   mutable lex_start_pos : int;
 *   mutable lex_curr_pos : int;
 *   mutable lex_last_pos : int;
 *   mutable lex_last_action : int;
 *   mutable lex_eof_reached : bool;
 *   mutable lex_mem : int array;
 *   mutable lex_start_p : position;
 *   mutable lex_curr_p;
 * }
 * @param tbl
 * @param start_state
 * @param lexbuf
 * @returns {any}
 */
function $$caml_lex_engine(tbl, start_state, lexbuf) {
    // Lexing.lexbuf
    var lex_buffer = 1;
    var lex_buffer_len = 2;
    var lex_start_pos = 4;
    var lex_curr_pos = 5;
    var lex_last_pos = 6;
    var lex_last_action = 7;
    var lex_eof_reached = 8;
    // Lexing.lex_tables
    var lex_base = 0;
    var lex_backtrk = 1;
    var lex_default = 2;
    var lex_trans = 3;
    var lex_check = 4;
    if (!tbl.lex_default) {
        tbl.lex_base = caml_lex_array(tbl[lex_base]);
        tbl.lex_backtrk = caml_lex_array(tbl[lex_backtrk]);
        tbl.lex_check = caml_lex_array(tbl[lex_check]);
        tbl.lex_trans = caml_lex_array(tbl[lex_trans]);
        tbl.lex_default = caml_lex_array(tbl[lex_default]);
    }
    var c;
    var state = start_state;
    //var buffer = bytes_of_string(lexbuf[lex_buffer]);
    var buffer = lexbuf[lex_buffer];
    if (state >= 0) {
        /* First entry */
        lexbuf[lex_last_pos] = lexbuf[lex_start_pos] = lexbuf[lex_curr_pos];
        lexbuf[lex_last_action] = -1;
    }
    else {
        /* Reentry after refill */
        state = -state - 1;
    }
    for (;;) {
        /* Lookup base address or action number for current state */
        var base = tbl.lex_base[state];
        if (base < 0)
            return -base - 1;
        /* See if it's a backtrack point */
        var backtrk = tbl.lex_backtrk[state];
        if (backtrk >= 0) {
            lexbuf[lex_last_pos] = lexbuf[lex_curr_pos];
            lexbuf[lex_last_action] = backtrk;
        }
        /* See if we need a refill */
        if (lexbuf[lex_curr_pos] >= lexbuf[lex_buffer_len]) {
            if (lexbuf[lex_eof_reached] === 0)
                return -state - 1;
            else
                c = 256;
        }
        else {
            /* Read next input char */
            c = buffer[lexbuf[lex_curr_pos]];
            lexbuf[lex_curr_pos]++;
        }
        /* Determine next state */
        if (tbl.lex_check[base + c] === state) {
            state = tbl.lex_trans[base + c];
        }
        else {
            state = tbl.lex_default[state];
        }
        /* If no transition on this char, return to last backtrack point */
        if (state < 0) {
            lexbuf[lex_curr_pos] = lexbuf[lex_last_pos];
            if (lexbuf[lex_last_action] == -1)
                fail();
            else
                return lexbuf[lex_last_action];
        }
        else {
            /* Erase the EOF condition only if the EOF pseudo-character was
             consumed by the automaton (i.e. there was no backtrack above)
             */
            if (c == 256)
                lexbuf[lex_eof_reached] = 0;
        }
    }
}

/***********************************************/
/* New lexer engine, with memory of positions  */
/***********************************************/

/**
 * s -> Lexing.lex_tables.lex_code
 * mem -> Lexing.lexbuf.lex_mem (* int array *)
 */          
          
function caml_lex_run_mem(s, i, mem, curr_pos) {
    for (;;) {
        var dst = s.charCodeAt(i);
        i++;
        if (dst == 0xff)
            return;
        var src = s.charCodeAt(i);
        i++;
        if (src == 0xff)
            mem[dst] = curr_pos;
        else
            mem[dst] = mem[src];
    }
}


/**
 * s -> Lexing.lex_tables.lex_code
 * mem -> Lexing.lexbuf.lex_mem (* int array *)
 */
  
function caml_lex_run_tag(s, i, mem) {
    for (;;) {
        var dst = s.charCodeAt(i);
        i++;
        if (dst == 0xff)
            return;
        var src = s.charCodeAt(i);
        i++;
        if (src == 0xff)
            mem[dst] = -1;
        else
            mem[dst] = mem[src];
    }
}
/**
 * external c_new_engine : lex_tables -> int -> lexbuf -> int = "caml_new_lex_engine"
 * @param tbl
 * @param start_state
 * @param lexbuf
 * @returns {any}
 */
function $$caml_new_lex_engine(tbl, start_state, lexbuf) {
    // Lexing.lexbuf
    var lex_buffer = 1;
    var lex_buffer_len = 2;
    var lex_start_pos = 4;
    var lex_curr_pos = 5;
    var lex_last_pos = 6;
    var lex_last_action = 7;
    var lex_eof_reached = 8;
    var lex_mem = 9;
    // Lexing.lex_tables
    var lex_base = 0;
    var lex_backtrk = 1;
    var lex_default = 2;
    var lex_trans = 3;
    var lex_check = 4;
    var lex_base_code = 5;
    var lex_backtrk_code = 6;
    var lex_default_code = 7;
    var lex_trans_code = 8;
    var lex_check_code = 9;
    var lex_code = 10;
    if (!tbl.lex_default) {
        tbl.lex_base = caml_lex_array(tbl[lex_base]);
        tbl.lex_backtrk = caml_lex_array(tbl[lex_backtrk]);
        tbl.lex_check = caml_lex_array(tbl[lex_check]);
        tbl.lex_trans = caml_lex_array(tbl[lex_trans]);
        tbl.lex_default = caml_lex_array(tbl[lex_default]);
    }
    if (!tbl.lex_default_code) {
        tbl.lex_base_code = caml_lex_array(tbl[lex_base_code]);
        tbl.lex_backtrk_code = caml_lex_array(tbl[lex_backtrk_code]);
        tbl.lex_check_code = caml_lex_array(tbl[lex_check_code]);
        tbl.lex_trans_code = caml_lex_array(tbl[lex_trans_code]);
        tbl.lex_default_code = caml_lex_array(tbl[lex_default_code]);
    }
    if (tbl.lex_code == null) {
        //tbl.lex_code = caml_bytes_of_string(tbl[lex_code]);
        tbl.lex_code = (tbl[lex_code]);
    }
    var c, state = start_state;
    //var buffer = caml_bytes_of_string(lexbuf[lex_buffer]);
    var buffer = lexbuf[lex_buffer];
    if (state >= 0) {
        /* First entry */
        lexbuf[lex_last_pos] = lexbuf[lex_start_pos] = lexbuf[lex_curr_pos];
        lexbuf[lex_last_action] = -1;
    }
    else {
        /* Reentry after refill */
        state = -state - 1;
    }
    for (;;) {
        /* Lookup base address or action number for current state */
        var base = tbl.lex_base[state];
        if (base < 0) {
            var pc_off = tbl.lex_base_code[state];
            caml_lex_run_tag(tbl.lex_code, pc_off, lexbuf[lex_mem]);
            return -base - 1;
        }
        /* See if it's a backtrack point */
        var backtrk = tbl.lex_backtrk[state];
        if (backtrk >= 0) {
            var pc_off = tbl.lex_backtrk_code[state];
            caml_lex_run_tag(tbl.lex_code, pc_off, lexbuf[lex_mem]);
            lexbuf[lex_last_pos] = lexbuf[lex_curr_pos];
            lexbuf[lex_last_action] = backtrk;
        }
        /* See if we need a refill */
        if (lexbuf[lex_curr_pos] >= lexbuf[lex_buffer_len]) {
            if (lexbuf[lex_eof_reached] == 0)
                return -state - 1;
            else
                c = 256;
        }
        else {
            /* Read next input char */
            c = buffer[lexbuf[lex_curr_pos]];
            lexbuf[lex_curr_pos]++;
        }
        /* Determine next state */
        var pstate = state;
        if (tbl.lex_check[base + c] == state)
            state = tbl.lex_trans[base + c];
        else
            state = tbl.lex_default[state];
        /* If no transition on this char, return to last backtrack point */
        if (state < 0) {
            lexbuf[lex_curr_pos] = lexbuf[lex_last_pos];
            if (lexbuf[lex_last_action] == -1)
                fail();
            else
                return lexbuf[lex_last_action];
        }
        else {
            /* If some transition, get and perform memory moves */
            var base_code = tbl.lex_base_code[pstate], pc_off;
            if (tbl.lex_check_code[base_code + c] == pstate)
                pc_off = tbl.lex_trans_code[base_code + c];
            else
                pc_off = tbl.lex_default_code[pstate];
            if (pc_off > 0)
                caml_lex_run_mem(tbl.lex_code, pc_off, lexbuf[lex_mem], lexbuf[lex_curr_pos]);
            /* Erase the EOF condition only if the EOF pseudo-character was
             consumed by the automaton (i.e. there was no backtrack above)
             */
            if (c == 256)
                lexbuf[lex_eof_reached] = 0;
        }
    }
}

;

function caml_lex_engine(prim, prim$1, prim$2) {
  return $$caml_lex_engine(prim, prim$1, prim$2);
}

function caml_new_lex_engine(prim, prim$1, prim$2) {
  return $$caml_new_lex_engine(prim, prim$1, prim$2);
}

exports.fail                = fail;
exports.caml_lex_engine     = caml_lex_engine;
exports.caml_new_lex_engine = caml_new_lex_engine;
/*  Not a pure module */

},{"./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions"}],"stdlib/caml_md5":[function(require,module,exports){
'use strict';


function cmn(q, a, b, x, s, t) {
  var a$1 = ((a + q | 0) + x | 0) + t | 0;
  return ((a$1 << s) | (a$1 >>> (32 - s | 0)) | 0) + b | 0;
}

function f(a, b, c, d, x, s, t) {
  return cmn(b & c | (b ^ -1) & d, a, b, x, s, t);
}

function g(a, b, c, d, x, s, t) {
  return cmn(b & d | c & (d ^ -1), a, b, x, s, t);
}

function h(a, b, c, d, x, s, t) {
  return cmn(b ^ c ^ d, a, b, x, s, t);
}

function i(a, b, c, d, x, s, t) {
  return cmn(c ^ (b | d ^ -1), a, b, x, s, t);
}

function cycle(x, k) {
  var a = x[0];
  var b = x[1];
  var c = x[2];
  var d = x[3];
  a = f(a, b, c, d, k[0], 7, -680876936);
  d = f(d, a, b, c, k[1], 12, -389564586);
  c = f(c, d, a, b, k[2], 17, 606105819);
  b = f(b, c, d, a, k[3], 22, -1044525330);
  a = f(a, b, c, d, k[4], 7, -176418897);
  d = f(d, a, b, c, k[5], 12, 1200080426);
  c = f(c, d, a, b, k[6], 17, -1473231341);
  b = f(b, c, d, a, k[7], 22, -45705983);
  a = f(a, b, c, d, k[8], 7, 1770035416);
  d = f(d, a, b, c, k[9], 12, -1958414417);
  c = f(c, d, a, b, k[10], 17, -42063);
  b = f(b, c, d, a, k[11], 22, -1990404162);
  a = f(a, b, c, d, k[12], 7, 1804603682);
  d = f(d, a, b, c, k[13], 12, -40341101);
  c = f(c, d, a, b, k[14], 17, -1502002290);
  b = f(b, c, d, a, k[15], 22, 1236535329);
  a = g(a, b, c, d, k[1], 5, -165796510);
  d = g(d, a, b, c, k[6], 9, -1069501632);
  c = g(c, d, a, b, k[11], 14, 643717713);
  b = g(b, c, d, a, k[0], 20, -373897302);
  a = g(a, b, c, d, k[5], 5, -701558691);
  d = g(d, a, b, c, k[10], 9, 38016083);
  c = g(c, d, a, b, k[15], 14, -660478335);
  b = g(b, c, d, a, k[4], 20, -405537848);
  a = g(a, b, c, d, k[9], 5, 568446438);
  d = g(d, a, b, c, k[14], 9, -1019803690);
  c = g(c, d, a, b, k[3], 14, -187363961);
  b = g(b, c, d, a, k[8], 20, 1163531501);
  a = g(a, b, c, d, k[13], 5, -1444681467);
  d = g(d, a, b, c, k[2], 9, -51403784);
  c = g(c, d, a, b, k[7], 14, 1735328473);
  b = g(b, c, d, a, k[12], 20, -1926607734);
  a = h(a, b, c, d, k[5], 4, -378558);
  d = h(d, a, b, c, k[8], 11, -2022574463);
  c = h(c, d, a, b, k[11], 16, 1839030562);
  b = h(b, c, d, a, k[14], 23, -35309556);
  a = h(a, b, c, d, k[1], 4, -1530992060);
  d = h(d, a, b, c, k[4], 11, 1272893353);
  c = h(c, d, a, b, k[7], 16, -155497632);
  b = h(b, c, d, a, k[10], 23, -1094730640);
  a = h(a, b, c, d, k[13], 4, 681279174);
  d = h(d, a, b, c, k[0], 11, -358537222);
  c = h(c, d, a, b, k[3], 16, -722521979);
  b = h(b, c, d, a, k[6], 23, 76029189);
  a = h(a, b, c, d, k[9], 4, -640364487);
  d = h(d, a, b, c, k[12], 11, -421815835);
  c = h(c, d, a, b, k[15], 16, 530742520);
  b = h(b, c, d, a, k[2], 23, -995338651);
  a = i(a, b, c, d, k[0], 6, -198630844);
  d = i(d, a, b, c, k[7], 10, 1126891415);
  c = i(c, d, a, b, k[14], 15, -1416354905);
  b = i(b, c, d, a, k[5], 21, -57434055);
  a = i(a, b, c, d, k[12], 6, 1700485571);
  d = i(d, a, b, c, k[3], 10, -1894986606);
  c = i(c, d, a, b, k[10], 15, -1051523);
  b = i(b, c, d, a, k[1], 21, -2054922799);
  a = i(a, b, c, d, k[8], 6, 1873313359);
  d = i(d, a, b, c, k[15], 10, -30611744);
  c = i(c, d, a, b, k[6], 15, -1560198380);
  b = i(b, c, d, a, k[13], 21, 1309151649);
  a = i(a, b, c, d, k[4], 6, -145523070);
  d = i(d, a, b, c, k[11], 10, -1120210379);
  c = i(c, d, a, b, k[2], 15, 718787259);
  b = i(b, c, d, a, k[9], 21, -343485551);
  x[0] = a + x[0] | 0;
  x[1] = b + x[1] | 0;
  x[2] = c + x[2] | 0;
  x[3] = d + x[3] | 0;
  return /* () */0;
}

var state = /* array */[
  1732584193,
  -271733879,
  -1732584194,
  271733878
];

var md5blk = /* array */[
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
];

function caml_md5_string(s, start, len) {
  var s$1 = s.slice(start, len);
  var n = s$1.length;
  state[0] = 1732584193;
  state[1] = -271733879;
  state[2] = -1732584194;
  state[3] = 271733878;
  for(var i = 0; i <= 15; ++i){
    md5blk[i] = 0;
  }
  var i_end = n / 64 | 0;
  for(var i$1 = 1; i$1 <= i_end; ++i$1){
    for(var j = 0; j <= 15; ++j){
      var k = ((i$1 << 6) - 64 | 0) + (j << 2) | 0;
      md5blk[j] = ((s$1.charCodeAt(k) + (s$1.charCodeAt(k + 1 | 0) << 8) | 0) + (s$1.charCodeAt(k + 2 | 0) << 16) | 0) + (s$1.charCodeAt(k + 3 | 0) << 24) | 0;
    }
    cycle(state, md5blk);
  }
  var s_tail = s$1.slice((i_end << 6));
  for(var kk = 0; kk <= 15; ++kk){
    md5blk[kk] = 0;
  }
  var i_end$1 = s_tail.length - 1 | 0;
  for(var i$2 = 0; i$2 <= i_end$1; ++i$2){
    md5blk[i$2 / 4 | 0] = md5blk[i$2 / 4 | 0] | (s_tail.charCodeAt(i$2) << (i$2 % 4 << 3));
  }
  var i$3 = i_end$1 + 1 | 0;
  md5blk[i$3 / 4 | 0] = md5blk[i$3 / 4 | 0] | (128 << (i$3 % 4 << 3));
  if (i$3 > 55) {
    cycle(state, md5blk);
    for(var i$4 = 0; i$4 <= 15; ++i$4){
      md5blk[i$4] = 0;
    }
  }
  md5blk[14] = (n << 3);
  cycle(state, md5blk);
  return String.fromCharCode(state[0] & 255, (state[0] >> 8) & 255, (state[0] >> 16) & 255, (state[0] >> 24) & 255, state[1] & 255, (state[1] >> 8) & 255, (state[1] >> 16) & 255, (state[1] >> 24) & 255, state[2] & 255, (state[2] >> 8) & 255, (state[2] >> 16) & 255, (state[2] >> 24) & 255, state[3] & 255, (state[3] >> 8) & 255, (state[3] >> 16) & 255, (state[3] >> 24) & 255);
}

exports.caml_md5_string = caml_md5_string;
/* No side effect */

},{}],"stdlib/caml_missing_polyfill":[function(require,module,exports){
'use strict';


var not_implemented = (function (s){ throw new Error(s)});

exports.not_implemented = not_implemented;
/* not_implemented Not a pure module */

},{}],"stdlib/caml_module":[function(require,module,exports){
'use strict';

var Caml_obj                = require("./caml_obj.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function init_mod(loc, shape) {
  var undef_module = function () {
    throw [
          Caml_builtin_exceptions.undefined_recursive_module,
          loc
        ];
  };
  var loop = function (shape, struct_, idx) {
    if (typeof shape === "number") {
      switch (shape) {
        case 0 : 
        case 1 : 
            struct_[idx] = undef_module;
            return /* () */0;
        case 2 : 
            struct_[idx] = /* tuple */[
              undef_module,
              undef_module,
              undef_module,
              0
            ];
            return /* () */0;
        
      }
    } else if (shape.tag) {
      struct_[idx] = shape[0];
      return /* () */0;
    } else {
      var comps = shape[0];
      var v = /* array */[];
      struct_[idx] = v;
      var len = comps.length;
      for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
        loop(comps[i], v, i);
      }
      return /* () */0;
    }
  };
  var res = /* array */[];
  loop(shape, res, 0);
  return res[0];
}

function update_mod(shape, o, n) {
  var aux = function (shape, o, n, parent, i) {
    if (typeof shape === "number") {
      switch (shape) {
        case 0 : 
            parent[i] = n;
            return /* () */0;
        case 1 : 
        case 2 : 
            return Caml_obj.caml_update_dummy(o, n);
        
      }
    } else if (shape.tag) {
      return /* () */0;
    } else {
      var comps = shape[0];
      for(var i$1 = 0 ,i_finish = comps.length - 1 | 0; i$1 <= i_finish; ++i$1){
        aux(comps[i$1], o[i$1], n[i$1], o, i$1);
      }
      return /* () */0;
    }
  };
  if (typeof shape === "number") {
    throw [
          Caml_builtin_exceptions.assert_failure,
          [
            "caml_module.ml",
            82,
            10
          ]
        ];
  } else if (shape.tag) {
    throw [
          Caml_builtin_exceptions.assert_failure,
          [
            "caml_module.ml",
            82,
            10
          ]
        ];
  } else {
    var comps = shape[0];
    for(var i = 0 ,i_finish = comps.length - 1 | 0; i <= i_finish; ++i){
      aux(comps[i], o[i], n[i], o, i);
    }
    return /* () */0;
  }
}

exports.init_mod   = init_mod;
exports.update_mod = update_mod;
/* No side effect */

},{"./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./caml_obj.js":"stdlib/caml_obj"}],"stdlib/caml_obj":[function(require,module,exports){
'use strict';

var Block                   = require("./block.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function caml_obj_dup(x) {
  var len = x.length | 0;
  var v = new Array(len);
  for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
    v[i] = x[i];
  }
  v.tag = x.tag | 0;
  return v;
}

function caml_obj_truncate(x, new_size) {
  var len = x.length | 0;
  if (new_size <= 0 || new_size > len) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Obj.truncate"
        ];
  } else if (len !== new_size) {
    for(var i = new_size ,i_finish = len - 1 | 0; i <= i_finish; ++i){
      x[i] = 0;
    }
    x.length = new_size;
    return /* () */0;
  } else {
    return 0;
  }
}

function caml_lazy_make_forward(x) {
  return Block.__(250, [x]);
}

function caml_update_dummy(x, y) {
  var len = y.length | 0;
  for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
    x[i] = y[i];
  }
  var y_tag = y.tag | 0;
  if (y_tag !== 0) {
    x.tag = y_tag;
    return /* () */0;
  } else {
    return 0;
  }
}

function caml_int_compare(x, y) {
  if (x < y) {
    return -1;
  } else if (x === y) {
    return 0;
  } else {
    return 1;
  }
}

function caml_compare(_a, _b) {
  while(true) {
    var b = _b;
    var a = _a;
    var a_type = typeof a;
    var b_type = typeof b;
    if (a_type === "string") {
      var x = a;
      var y = b;
      if (x < y) {
        return -1;
      } else if (x === y) {
        return 0;
      } else {
        return 1;
      }
    } else {
      var is_a_number = +(a_type === "number");
      var is_b_number = +(b_type === "number");
      if (is_a_number !== 0) {
        if (is_b_number !== 0) {
          return caml_int_compare(a, b);
        } else {
          return -1;
        }
      } else if (is_b_number !== 0) {
        return 1;
      } else if (a_type === "boolean" || a_type === "undefined" || a === null) {
        var x$1 = a;
        var y$1 = b;
        if (x$1 === y$1) {
          return 0;
        } else if (x$1 < y$1) {
          return -1;
        } else {
          return 1;
        }
      } else if (a_type === "function" || b_type === "function") {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "compare: functional value"
            ];
      } else {
        var tag_a = a.tag | 0;
        var tag_b = b.tag | 0;
        if (tag_a === 250) {
          _a = a[0];
          continue ;
          
        } else if (tag_b === 250) {
          _b = b[0];
          continue ;
          
        } else if (tag_a === 248) {
          return caml_int_compare(a[1], b[1]);
        } else if (tag_a === 251) {
          throw [
                Caml_builtin_exceptions.invalid_argument,
                "equal: abstract value"
              ];
        } else if (tag_a !== tag_b) {
          if (tag_a < tag_b) {
            return -1;
          } else {
            return 1;
          }
        } else {
          var len_a = a.length | 0;
          var len_b = b.length | 0;
          if (len_a === len_b) {
            var a$1 = a;
            var b$1 = b;
            var _i = 0;
            var same_length = len_a;
            while(true) {
              var i = _i;
              if (i === same_length) {
                return 0;
              } else {
                var res = caml_compare(a$1[i], b$1[i]);
                if (res !== 0) {
                  return res;
                } else {
                  _i = i + 1 | 0;
                  continue ;
                  
                }
              }
            };
          } else if (len_a < len_b) {
            var a$2 = a;
            var b$2 = b;
            var _i$1 = 0;
            var short_length = len_a;
            while(true) {
              var i$1 = _i$1;
              if (i$1 === short_length) {
                return -1;
              } else {
                var res$1 = caml_compare(a$2[i$1], b$2[i$1]);
                if (res$1 !== 0) {
                  return res$1;
                } else {
                  _i$1 = i$1 + 1 | 0;
                  continue ;
                  
                }
              }
            };
          } else {
            var a$3 = a;
            var b$3 = b;
            var _i$2 = 0;
            var short_length$1 = len_b;
            while(true) {
              var i$2 = _i$2;
              if (i$2 === short_length$1) {
                return 1;
              } else {
                var res$2 = caml_compare(a$3[i$2], b$3[i$2]);
                if (res$2 !== 0) {
                  return res$2;
                } else {
                  _i$2 = i$2 + 1 | 0;
                  continue ;
                  
                }
              }
            };
          }
        }
      }
    }
  };
}

function caml_equal(_a, _b) {
  while(true) {
    var b = _b;
    var a = _a;
    if (a === b) {
      return /* true */1;
    } else {
      var a_type = typeof a;
      if (a_type === "string" || a_type === "number" || a_type === "boolean" || a_type === "undefined" || a === null) {
        return /* false */0;
      } else {
        var b_type = typeof b;
        if (a_type === "function" || b_type === "function") {
          throw [
                Caml_builtin_exceptions.invalid_argument,
                "equal: functional value"
              ];
        } else if (b_type === "number" || b_type === "undefined" || b === null) {
          return /* false */0;
        } else {
          var tag_a = a.tag | 0;
          var tag_b = b.tag | 0;
          if (tag_a === 250) {
            _a = a[0];
            continue ;
            
          } else if (tag_b === 250) {
            _b = b[0];
            continue ;
            
          } else if (tag_a === 248) {
            return +(a[1] === b[1]);
          } else if (tag_a === 251) {
            throw [
                  Caml_builtin_exceptions.invalid_argument,
                  "equal: abstract value"
                ];
          } else if (tag_a !== tag_b) {
            return /* false */0;
          } else {
            var len_a = a.length | 0;
            var len_b = b.length | 0;
            if (len_a === len_b) {
              var a$1 = a;
              var b$1 = b;
              var _i = 0;
              var same_length = len_a;
              while(true) {
                var i = _i;
                if (i === same_length) {
                  return /* true */1;
                } else if (caml_equal(a$1[i], b$1[i])) {
                  _i = i + 1 | 0;
                  continue ;
                  
                } else {
                  return /* false */0;
                }
              };
            } else {
              return /* false */0;
            }
          }
        }
      }
    }
  };
}

function caml_notequal(a, b) {
  return 1 - caml_equal(a, b);
}

function caml_greaterequal(a, b) {
  return +(caml_compare(a, b) >= 0);
}

function caml_greaterthan(a, b) {
  return +(caml_compare(a, b) > 0);
}

function caml_lessequal(a, b) {
  return +(caml_compare(a, b) <= 0);
}

function caml_lessthan(a, b) {
  return +(caml_compare(a, b) < 0);
}

var caml_int32_compare = caml_int_compare;

var caml_nativeint_compare = caml_int_compare;

exports.caml_obj_dup           = caml_obj_dup;
exports.caml_obj_truncate      = caml_obj_truncate;
exports.caml_lazy_make_forward = caml_lazy_make_forward;
exports.caml_update_dummy      = caml_update_dummy;
exports.caml_int_compare       = caml_int_compare;
exports.caml_int32_compare     = caml_int32_compare;
exports.caml_nativeint_compare = caml_nativeint_compare;
exports.caml_compare           = caml_compare;
exports.caml_equal             = caml_equal;
exports.caml_notequal          = caml_notequal;
exports.caml_greaterequal      = caml_greaterequal;
exports.caml_greaterthan       = caml_greaterthan;
exports.caml_lessthan          = caml_lessthan;
exports.caml_lessequal         = caml_lessequal;
/* No side effect */

},{"./block.js":"stdlib/block","./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions"}],"stdlib/caml_oo_curry":[function(require,module,exports){
'use strict';

var Curry   = require("./curry.js");
var Caml_oo = require("./caml_oo.js");

function js(label, cacheid, obj, args) {
  var meth = Caml_oo.caml_get_public_method(obj, label, cacheid);
  return Curry.app(meth, args);
}

function js1(label, cacheid, a0) {
  return Curry._1(Caml_oo.caml_get_public_method(a0, label, cacheid), a0);
}

function js2(label, cacheid, a0, a1) {
  return Curry._2(Caml_oo.caml_get_public_method(a0, label, cacheid), a0, a1);
}

function js3(label, cacheid, a0, a1, a2) {
  return Curry._3(Caml_oo.caml_get_public_method(a0, label, cacheid), a0, a1, a2);
}

function js4(label, cacheid, a0, a1, a2, a3) {
  return Curry._4(Caml_oo.caml_get_public_method(a0, label, cacheid), a0, a1, a2, a3);
}

function js5(label, cacheid, a0, a1, a2, a3, a4) {
  return Curry._5(Caml_oo.caml_get_public_method(a0, label, cacheid), a0, a1, a2, a3, a4);
}

function js6(label, cacheid, a0, a1, a2, a3, a4, a5) {
  return Curry._6(Caml_oo.caml_get_public_method(a0, label, cacheid), a0, a1, a2, a3, a4, a5);
}

function js7(label, cacheid, a0, a1, a2, a3, a4, a5, a6) {
  return Curry._7(Caml_oo.caml_get_public_method(a0, label, cacheid), a0, a1, a2, a3, a4, a5, a6);
}

function js8(label, cacheid, a0, a1, a2, a3, a4, a5, a6, a7) {
  return Curry._8(Caml_oo.caml_get_public_method(a0, label, cacheid), a0, a1, a2, a3, a4, a5, a6, a7);
}

exports.js  = js;
exports.js1 = js1;
exports.js2 = js2;
exports.js3 = js3;
exports.js4 = js4;
exports.js5 = js5;
exports.js6 = js6;
exports.js7 = js7;
exports.js8 = js8;
/* No side effect */

},{"./caml_oo.js":"stdlib/caml_oo","./curry.js":"stdlib/curry"}],"stdlib/caml_oo":[function(require,module,exports){
'use strict';

var Caml_array              = require("./caml_array.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

var caml_methods_cache = Caml_array.caml_make_vect(1000, 0);

function caml_get_public_method(obj, tag, cacheid) {
  var meths = obj[0];
  var offs = caml_methods_cache[cacheid];
  if (meths[offs] === tag) {
    return meths[offs - 1 | 0];
  } else {
    var aux = function (_i) {
      while(true) {
        var i = _i;
        if (i < 3) {
          throw [
                Caml_builtin_exceptions.assert_failure,
                [
                  "caml_oo.ml",
                  59,
                  20
                ]
              ];
        } else if (meths[i] === tag) {
          caml_methods_cache[cacheid] = i;
          return i;
        } else {
          _i = i - 2 | 0;
          continue ;
          
        }
      };
    };
    return meths[aux((meths[0] << 1) + 1 | 0) - 1 | 0];
  }
}

exports.caml_get_public_method = caml_get_public_method;
/* No side effect */

},{"./caml_array.js":"stdlib/caml_array","./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions"}],"stdlib/caml_parser":[function(require,module,exports){
'use strict';




/***********************************************************************/
/*                                                                     */
/*                           Objective Caml                            */
/*                                                                     */
/*            Xavier Leroy, projet Cristal, INRIA Rocquencourt         */
/*                                                                     */
/*  Copyright 1996 Institut National de Recherche en Informatique et   */
/*  en Automatique.  All rights reserved.  This file is distributed    */
/*  under the terms of the GNU Library General Public License, with    */
/*  the special exception on linking described in file ../LICENSE.     */
/*                                                                     */
/***********************************************************************/

/* $Id: parsing.c 8983 2008-08-06 09:38:25Z xleroy $ */

/* The PDA automaton for parsers generated by camlyacc */

/* The pushdown automata */

/**
 * caml_lex_array("abcd")
 * [25185, 25699]
 * @param s
 * @returns {any[]}
 * TODO: duplicated with module {!Caml_lex}
 */
function caml_lex_array(s) {
    var l = s.length / 2;
    var a = new Array(l);
    for (var i = 0; i < l; i++)
        a[i] = (s.charCodeAt(2 * i) | (s.charCodeAt(2 * i + 1) << 8)) << 16 >> 16;
    return a;
}
/**
 * Note that TS enum is not friendly to Closure compiler
 * @enum{number}
 */
var Automata = {
    START: 0,
    LOOP: 6,
    TOKEN_READ: 1,
    TEST_SHIFT: 7,
    ERROR_DETECTED: 5,
    SHIFT: 8,
    SHIFT_RECOVER: 9,
    STACK_GROWN_1: 2,
    REDUCE: 10,
    STACK_GROWN_2: 3,
    SEMANTIC_ACTION_COMPUTED: 4
};
/**
 * @enum{number}
 */
var Result = {
    READ_TOKEN: 0,
    RAISE_PARSE_ERROR: 1,
    GROW_STACKS_1: 2,
    GROW_STACKS_2: 3,
    COMPUTE_SEMANTIC_ACTION: 4,
    CALL_ERROR_FUNCTION: 5
};
var PARSER_TRACE = false;
/**
 * external parse_engine : parse_tables -> parser_env -> parser_input -> Obj.t -> parser_output
 * parsing.ml
 *
 * type parse_tables = {
 *   actions : (parser_env -> Obj.t) array
 *   transl_const : int array;
 *   transl_block : int array;
 *   lhs : string;
 *   len : string;
 *   defred : string;
 *   dgoto : string;
 *   sindex : string;
 *   rindex : string;
 *   gindex : string;
 *   tablesize : int;
 *   table : string;
 *   check : string;
 *   error_function : string -> unit;
 *   names_const : string;
 *   names_block : string
 * }
 *
 * type parser_env =
 * { mutable s_stack : int array;        (* States *)
 *  mutable v_stack : Obj.t array;      (* Semantic attributes *)
 *  mutable symb_start_stack : position array; (* Start positions *)
 *  mutable symb_end_stack : position array;   (* End positions *)
 *  mutable stacksize : int;            (* Size of the stacks *)
 *  mutable stackbase : int;            (* Base sp for current parse *)
 *  mutable curr_char : int;            (* Last token read *)
 *  mutable lval : Obj.t;               (* Its semantic attribute *)
 *  mutable symb_start : position;      (* Start pos. of the current symbol*)
 *  mutable symb_end : position;        (* End pos. of the current symbol *)
 *  mutable asp : int;                  (* The stack pointer for attributes *)
 *  mutable rule_len : int;             (* Number of rhs items in the rule *)
 *  mutable rule_number : int;          (* Rule number to reduce by *)
 *  mutable sp : int;                   (* Saved sp for parse_engine *)
 *  mutable state : int;                (* Saved state for parse_engine *)
 *  mutable errflag : int }             (* Saved error flag for parse_engine *)
 *
 *  type parser_input =
 *   | Start
 *   | Token_read
 *   | Stacks_grown_1
 *   | Stacks_grown_2
 *   | Semantic_action_computed
 *   | Error_detected

 * @param tables
 * @param env
 * @param cmd
 * @param arg
 * @returns {number}
 */
function $$caml_parse_engine(tables /* parser_table */, env /* parser_env */, cmd /* parser_input*/, arg /* Obj.t*/) {
    var ERRCODE = 256;
    //var START = 0;
    //var TOKEN_READ = 1;
    //var STACKS_GROWN_1 = 2;
    //var STACKS_GROWN_2 = 3;
    //var SEMANTIC_ACTION_COMPUTED = 4;
    //var ERROR_DETECTED = 5;
    //var loop = 6;
    //var testshift = 7;
    //var shift = 8;
    //var shift_recover = 9;
    //var reduce = 10;
    // Parsing.parser_env
    var env_s_stack = 0; // array
    var env_v_stack = 1; // array
    var env_symb_start_stack = 2; // array
    var env_symb_end_stack = 3; // array
    var env_stacksize = 4;
    var env_stackbase = 5;
    var env_curr_char = 6;
    var env_lval = 7; // Obj.t
    var env_symb_start = 8; // position
    var env_symb_end = 9; // position
    var env_asp = 10;
    var env_rule_len = 11;
    var env_rule_number = 12;
    var env_sp = 13;
    var env_state = 14;
    var env_errflag = 15;
    // Parsing.parse_tables
    // var _tbl_actions = 1;
    var tbl_transl_const = 1; // array
    var tbl_transl_block = 2; // array
    var tbl_lhs = 3;
    var tbl_len = 4;
    var tbl_defred = 5;
    var tbl_dgoto = 6;
    var tbl_sindex = 7;
    var tbl_rindex = 8;
    var tbl_gindex = 9;
    var tbl_tablesize = 10;
    var tbl_table = 11;
    var tbl_check = 12;
    // var _tbl_error_function = 14;
    // var _tbl_names_const = 15;
    // var _tbl_names_block = 16;
    if (!tables.dgoto) {
        tables.defred = caml_lex_array(tables[tbl_defred]);
        tables.sindex = caml_lex_array(tables[tbl_sindex]);
        tables.check = caml_lex_array(tables[tbl_check]);
        tables.rindex = caml_lex_array(tables[tbl_rindex]);
        tables.table = caml_lex_array(tables[tbl_table]);
        tables.len = caml_lex_array(tables[tbl_len]);
        tables.lhs = caml_lex_array(tables[tbl_lhs]);
        tables.gindex = caml_lex_array(tables[tbl_gindex]);
        tables.dgoto = caml_lex_array(tables[tbl_dgoto]);
    }
    var res;
    var n, n1, n2, state1;
    // RESTORE
    var sp = env[env_sp];
    var state = env[env_state];
    var errflag = env[env_errflag];
    exit: for (;;) {
        //console.error("State", Automata[cmd]);
        switch (cmd) {
            case Automata.START:
                state = 0;
                errflag = 0;
            // Fall through
            case Automata.LOOP:
                n = tables.defred[state];
                if (n != 0) {
                    cmd = Automata.REDUCE;
                    break;
                }
                if (env[env_curr_char] >= 0) {
                    cmd = Automata.TEST_SHIFT;
                    break;
                }
                res = Result.READ_TOKEN;
                break exit;
            /* The ML code calls the lexer and updates */
            /* symb_start and symb_end */
            case Automata.TOKEN_READ:
                if (typeof arg !== 'number') {
                    env[env_curr_char] = tables[tbl_transl_block][arg.tag | 0 /* + 1 */];
                    env[env_lval] = arg[0];
                }
                else {
                    env[env_curr_char] = tables[tbl_transl_const][arg /* + 1 */];
                    env[env_lval] = 0;
                }
                if (PARSER_TRACE) {
                    console.error("State %d, read token", state, arg);
                }
            // Fall through
            case Automata.TEST_SHIFT:
                n1 = tables.sindex[state];
                n2 = n1 + env[env_curr_char];
                if (n1 != 0 && n2 >= 0 && n2 <= tables[tbl_tablesize] &&
                    tables.check[n2] == env[env_curr_char]) {
                    cmd = Automata.SHIFT;
                    break;
                }
                n1 = tables.rindex[state];
                n2 = n1 + env[env_curr_char];
                if (n1 != 0 && n2 >= 0 && n2 <= tables[tbl_tablesize] &&
                    tables.check[n2] == env[env_curr_char]) {
                    n = tables.table[n2];
                    cmd = Automata.REDUCE;
                    break;
                }
                if (errflag <= 0) {
                    res = Result.CALL_ERROR_FUNCTION;
                    break exit;
                }
            // Fall through
            /* The ML code calls the error function */
            case Automata.ERROR_DETECTED:
                if (errflag < 3) {
                    errflag = 3;
                    for (;;) {
                        state1 = env[env_s_stack][sp /* + 1*/];
                        n1 = tables.sindex[state1];
                        n2 = n1 + ERRCODE;
                        if (n1 != 0 && n2 >= 0 && n2 <= tables[tbl_tablesize] &&
                            tables.check[n2] == ERRCODE) {
                            cmd = Automata.SHIFT_RECOVER;
                            break;
                        }
                        else {
                            if (sp <= env[env_stackbase])
                                return Result.RAISE_PARSE_ERROR;
                            /* The ML code raises Parse_error */
                            sp--;
                        }
                    }
                }
                else {
                    if (env[env_curr_char] == 0)
                        return Result.RAISE_PARSE_ERROR;
                    /* The ML code raises Parse_error */
                    env[env_curr_char] = -1;
                    cmd = Automata.LOOP;
                    break;
                }
            // Fall through
            case Automata.SHIFT:
                env[env_curr_char] = -1;
                if (errflag > 0)
                    errflag--;
            // Fall through
            case Automata.SHIFT_RECOVER:
                if (PARSER_TRACE) {
                    console.error("State %d: shift to state %d", state, tables.table[n2]);
                }
                state = tables.table[n2];
                sp++;
                if (sp >= env[env_stacksize]) {
                    res = Result.GROW_STACKS_1;
                    break exit;
                }
            // Fall through
            /* The ML code resizes the stacks */
            case Automata.STACK_GROWN_1:
                env[env_s_stack][sp /* + 1 */] = state;
                env[env_v_stack][sp /* + 1 */] = env[env_lval];
                env[env_symb_start_stack][sp /* + 1 */] = env[env_symb_start];
                env[env_symb_end_stack][sp /* + 1 */] = env[env_symb_end];
                cmd = Automata.LOOP;
                break;
            case Automata.REDUCE:
                if (PARSER_TRACE) {
                    console.error("State %d : reduce by rule %d", state, n);
                }
                var m = tables.len[n];
                env[env_asp] = sp;
                env[env_rule_number] = n;
                env[env_rule_len] = m;
                sp = sp - m + 1;
                m = tables.lhs[n];
                state1 = env[env_s_stack][sp - 1]; //
                n1 = tables.gindex[m];
                n2 = n1 + state1;
                if (n1 != 0 && n2 >= 0 && n2 <= tables[tbl_tablesize] &&
                    tables.check[n2] == state1)
                    state = tables.table[n2];
                else
                    state = tables.dgoto[m];
                if (sp >= env[env_stacksize]) {
                    res = Result.GROW_STACKS_2;
                    break exit;
                }
            // Fall through
            /* The ML code resizes the stacks */
            case Automata.STACK_GROWN_2:
                res = Result.COMPUTE_SEMANTIC_ACTION;
                break exit;
            /* The ML code calls the semantic action */
            case Automata.SEMANTIC_ACTION_COMPUTED:
                env[env_s_stack][sp /* + 1 */] = state;
                env[env_v_stack][sp /* + 1*/] = arg;
                var asp = env[env_asp];
                env[env_symb_end_stack][sp /* + 1*/] = env[env_symb_end_stack][asp /* + 1*/];
                if (sp > asp) {
                    /* This is an epsilon production. Take symb_start equal to symb_end. */
                    env[env_symb_start_stack][sp /* + 1*/] = env[env_symb_end_stack][asp /*+ 1*/];
                }
                cmd = Automata.LOOP;
                break;
            /* Should not happen */
            default:
                return Result.RAISE_PARSE_ERROR;
        }
    }
    // SAVE
    env[env_sp] = sp;
    env[env_state] = state;
    env[env_errflag] = errflag;
    return res;
}

/**
 * external set_trace: bool -> bool = "caml_set_parser_trace"
 * parsing.ml
 * @param {boolean}
 * @returns {boolean}
 */
function $$caml_set_parser_trace(v) {
    var old = PARSER_TRACE;
    PARSER_TRACE = v;
    return old;
}


;

function caml_parse_engine(prim, prim$1, prim$2, prim$3) {
  return $$caml_parse_engine(prim, prim$1, prim$2, prim$3);
}

function caml_set_parser_trace(prim) {
  return +$$caml_set_parser_trace(prim);
}

exports.caml_parse_engine     = caml_parse_engine;
exports.caml_set_parser_trace = caml_set_parser_trace;
/*  Not a pure module */

},{}],"stdlib/caml_primitive":[function(require,module,exports){
arguments[4]["stdlib/bs_dict"][0].apply(exports,arguments)
},{"dup":"stdlib/bs_dict"}],"stdlib/caml_queue":[function(require,module,exports){
'use strict';


function create() {
  return /* record */[
          /* length */0,
          /* tail : None */0
        ];
}

function push(x, q) {
  if (q[/* length */0]) {
    var tail = q[/* tail */1];
    var head = tail[/* next */1];
    var cell = /* record */[
      /* content */x,
      /* next */head
    ];
    q[/* length */0] = q[/* length */0] + 1 | 0;
    tail[/* next */1] = cell;
    q[/* tail */1] = cell;
    return /* () */0;
  } else {
    var cell$1 = [];
    cell$1[0] = x;
    cell$1[1] = cell$1;
    q[/* length */0] = 1;
    q[/* tail */1] = cell$1;
    return /* () */0;
  }
}

function unsafe_pop(q) {
  q[/* length */0] = q[/* length */0] - 1 | 0;
  var tail = q[/* tail */1];
  var head = tail[/* next */1];
  if (head === tail) {
    q[/* tail */1] = /* None */0;
  } else {
    tail[/* next */1] = head[/* next */1];
  }
  return head[/* content */0];
}

function is_empty(q) {
  return +(q[/* length */0] === 0);
}

exports.create     = create;
exports.push       = push;
exports.unsafe_pop = unsafe_pop;
exports.is_empty   = is_empty;
/* No side effect */

},{}],"stdlib/caml_string":[function(require,module,exports){
'use strict';

var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function string_of_char(prim) {
  return String.fromCharCode(prim);
}

function caml_string_get(s, i) {
  if (i >= s.length || i < 0) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "index out of bounds"
        ];
  } else {
    return s.charCodeAt(i);
  }
}

function caml_create_string(len) {
  if (len < 0) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "String.create"
        ];
  } else {
    return new Array(len);
  }
}

function caml_string_compare(s1, s2) {
  if (s1 === s2) {
    return 0;
  } else if (s1 < s2) {
    return -1;
  } else {
    return 1;
  }
}

function caml_fill_string(s, i, l, c) {
  if (l > 0) {
    for(var k = i ,k_finish = (l + i | 0) - 1 | 0; k <= k_finish; ++k){
      s[k] = c;
    }
    return /* () */0;
  } else {
    return 0;
  }
}

function caml_blit_string(s1, i1, s2, i2, len) {
  if (len > 0) {
    var off1 = s1.length - i1 | 0;
    if (len <= off1) {
      for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
        s2[i2 + i | 0] = s1.charCodeAt(i1 + i | 0);
      }
      return /* () */0;
    } else {
      for(var i$1 = 0 ,i_finish$1 = off1 - 1 | 0; i$1 <= i_finish$1; ++i$1){
        s2[i2 + i$1 | 0] = s1.charCodeAt(i1 + i$1 | 0);
      }
      for(var i$2 = off1 ,i_finish$2 = len - 1 | 0; i$2 <= i_finish$2; ++i$2){
        s2[i2 + i$2 | 0] = /* "\000" */0;
      }
      return /* () */0;
    }
  } else {
    return 0;
  }
}

function caml_blit_bytes(s1, i1, s2, i2, len) {
  if (len > 0) {
    if (s1 === s2) {
      var s1$1 = s1;
      var i1$1 = i1;
      var i2$1 = i2;
      var len$1 = len;
      if (i1$1 < i2$1) {
        var range_a = (s1$1.length - i2$1 | 0) - 1 | 0;
        var range_b = len$1 - 1 | 0;
        var range = range_a > range_b ? range_b : range_a;
        for(var j = range; j >= 0; --j){
          s1$1[i2$1 + j | 0] = s1$1[i1$1 + j | 0];
        }
        return /* () */0;
      } else if (i1$1 > i2$1) {
        var range_a$1 = (s1$1.length - i1$1 | 0) - 1 | 0;
        var range_b$1 = len$1 - 1 | 0;
        var range$1 = range_a$1 > range_b$1 ? range_b$1 : range_a$1;
        for(var k = 0; k <= range$1; ++k){
          s1$1[i2$1 + k | 0] = s1$1[i1$1 + k | 0];
        }
        return /* () */0;
      } else {
        return 0;
      }
    } else {
      var off1 = s1.length - i1 | 0;
      if (len <= off1) {
        for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
          s2[i2 + i | 0] = s1[i1 + i | 0];
        }
        return /* () */0;
      } else {
        for(var i$1 = 0 ,i_finish$1 = off1 - 1 | 0; i$1 <= i_finish$1; ++i$1){
          s2[i2 + i$1 | 0] = s1[i1 + i$1 | 0];
        }
        for(var i$2 = off1 ,i_finish$2 = len - 1 | 0; i$2 <= i_finish$2; ++i$2){
          s2[i2 + i$2 | 0] = /* "\000" */0;
        }
        return /* () */0;
      }
    }
  } else {
    return 0;
  }
}

function bytes_of_string(s) {
  var len = s.length;
  var res = new Array(len);
  for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
    res[i] = s.charCodeAt(i);
  }
  return res;
}

function bytes_to_string(a) {
  var bytes = a;
  var i = 0;
  var len = a.length;
  var s = "";
  var s_len = len;
  if (i === 0 && len <= 4096 && len === bytes.length) {
    return String.fromCharCode.apply(null,bytes);
  } else {
    var offset = 0;
    while(s_len > 0) {
      var next = s_len < 1024 ? s_len : 1024;
      var tmp_bytes = new Array(next);
      caml_blit_bytes(bytes, offset, tmp_bytes, 0, next);
      s = s + String.fromCharCode.apply(null,tmp_bytes);
      s_len = s_len - next | 0;
      offset = offset + next | 0;
    };
    return s;
  }
}

function caml_string_of_char_array(chars) {
  var len = chars.length;
  var bytes = new Array(len);
  for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
    bytes[i] = chars[i];
  }
  return bytes_to_string(bytes);
}

function caml_is_printable(c) {
  if (c > 31) {
    return +(c < 127);
  } else {
    return /* false */0;
  }
}

function caml_string_get16(s, i) {
  return s.charCodeAt(i) + (s.charCodeAt(i + 1 | 0) << 8) | 0;
}

function caml_string_get32(s, i) {
  return ((s.charCodeAt(i) + (s.charCodeAt(i + 1 | 0) << 8) | 0) + (s.charCodeAt(i + 2 | 0) << 16) | 0) + (s.charCodeAt(i + 3 | 0) << 24) | 0;
}

function get(s, i) {
  if (i < 0 || i >= s.length) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "index out of bounds"
        ];
  } else {
    return s.charCodeAt(i);
  }
}

exports.bytes_of_string           = bytes_of_string;
exports.bytes_to_string           = bytes_to_string;
exports.caml_is_printable         = caml_is_printable;
exports.caml_string_of_char_array = caml_string_of_char_array;
exports.caml_string_get           = caml_string_get;
exports.caml_string_compare       = caml_string_compare;
exports.caml_create_string        = caml_create_string;
exports.caml_fill_string          = caml_fill_string;
exports.caml_blit_string          = caml_blit_string;
exports.caml_blit_bytes           = caml_blit_bytes;
exports.caml_string_get16         = caml_string_get16;
exports.caml_string_get32         = caml_string_get32;
exports.string_of_char            = string_of_char;
exports.get                       = get;
/* No side effect */

},{"./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions"}],"stdlib/caml_sys":[function(require,module,exports){
(function (process){
'use strict';

var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function caml_sys_getenv(s) {
  var match = typeof (process) === "undefined" ? undefined : (process);
  if (match !== undefined) {
    var match$1 = match.env[s];
    if (match$1 !== undefined) {
      return match$1;
    } else {
      throw Caml_builtin_exceptions.not_found;
    }
  } else {
    throw Caml_builtin_exceptions.not_found;
  }
}

function caml_sys_time() {
  var match = typeof (process) === "undefined" ? undefined : (process);
  if (match !== undefined) {
    return match.uptime();
  } else {
    return -1;
  }
}

function caml_sys_random_seed() {
  return /* array */[((Date.now() | 0) ^ 4294967295) * Math.random() | 0];
}

function caml_sys_system_command() {
  return 127;
}

function caml_sys_getcwd() {
  var match = typeof (process) === "undefined" ? undefined : (process);
  if (match !== undefined) {
    return match.cwd();
  } else {
    return "/";
  }
}

function caml_sys_get_argv() {
  var match = typeof (process) === "undefined" ? undefined : (process);
  if (match !== undefined) {
    return /* tuple */[
            match.argv[0],
            match.argv
          ];
  } else {
    return /* tuple */[
            "",
            /* array */[""]
          ];
  }
}

function caml_sys_exit(exit_code) {
  var match = typeof (process) === "undefined" ? undefined : (process);
  if (match !== undefined) {
    return match.exit(exit_code);
  } else {
    return /* () */0;
  }
}

function caml_sys_is_directory() {
  throw [
        Caml_builtin_exceptions.failure,
        "caml_sys_is_directory not implemented"
      ];
}

function caml_sys_file_exists() {
  throw [
        Caml_builtin_exceptions.failure,
        "caml_sys_file_exists not implemented"
      ];
}

exports.caml_sys_getenv         = caml_sys_getenv;
exports.caml_sys_time           = caml_sys_time;
exports.caml_sys_random_seed    = caml_sys_random_seed;
exports.caml_sys_system_command = caml_sys_system_command;
exports.caml_sys_getcwd         = caml_sys_getcwd;
exports.caml_sys_get_argv       = caml_sys_get_argv;
exports.caml_sys_exit           = caml_sys_exit;
exports.caml_sys_is_directory   = caml_sys_is_directory;
exports.caml_sys_file_exists    = caml_sys_file_exists;
/* No side effect */

}).call(this,require('_process'))
},{"./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","_process":1}],"stdlib/caml_utils":[function(require,module,exports){
'use strict';


var repeat = ( (String.prototype.repeat && function (count,self){return self.repeat(count)}) ||
                                                  function(count , self) {
        if (self.length == 0 || count == 0) {
            return '';
        }
        // Ensuring count is a 31-bit integer allows us to heavily optimize the
        // main part. But anyway, most current (August 2014) browsers can't handle
        // strings 1 << 28 chars or longer, so:
        if (self.length * count >= 1 << 28) {
            throw new RangeError('repeat count must not overflow maximum string size');
        }
        var rpt = '';
        for (;;) {
            if ((count & 1) == 1) {
                rpt += self;
            }
            count >>>= 1;
            if (count == 0) {
                break;
            }
            self += self;
        }
        return rpt;
    }
);

exports.repeat = repeat;
/* repeat Not a pure module */

},{}],"stdlib/caml_weak":[function(require,module,exports){
'use strict';

var Caml_obj     = require("./caml_obj.js");
var Caml_array   = require("./caml_array.js");
var Js_primitive = require("./js_primitive.js");

function caml_weak_create(n) {
  return new Array(n);
}

function caml_weak_set(xs, i, v) {
  if (v) {
    xs[i] = v[0];
    return /* () */0;
  } else {
    return /* () */0;
  }
}

function caml_weak_get(xs, i) {
  return Js_primitive.undefined_to_opt(xs[i]);
}

function caml_weak_get_copy(xs, i) {
  var match = xs[i];
  if (match !== undefined) {
    return /* Some */[Caml_obj.caml_obj_dup(match)];
  } else {
    return /* None */0;
  }
}

function caml_weak_check(xs, i) {
  return +(xs[i] !== undefined);
}

var caml_weak_blit = Caml_array.caml_array_blit;

exports.caml_weak_create   = caml_weak_create;
exports.caml_weak_set      = caml_weak_set;
exports.caml_weak_get      = caml_weak_get;
exports.caml_weak_get_copy = caml_weak_get_copy;
exports.caml_weak_check    = caml_weak_check;
exports.caml_weak_blit     = caml_weak_blit;
/* No side effect */

},{"./caml_array.js":"stdlib/caml_array","./caml_obj.js":"stdlib/caml_obj","./js_primitive.js":"stdlib/js_primitive"}],"stdlib/camlinternalFormatBasics":[function(require,module,exports){
'use strict';

var Block = require("./block.js");

function erase_rel(param) {
  if (typeof param === "number") {
    return /* End_of_fmtty */0;
  } else {
    switch (param.tag | 0) {
      case 0 : 
          return /* Char_ty */Block.__(0, [erase_rel(param[0])]);
      case 1 : 
          return /* String_ty */Block.__(1, [erase_rel(param[0])]);
      case 2 : 
          return /* Int_ty */Block.__(2, [erase_rel(param[0])]);
      case 3 : 
          return /* Int32_ty */Block.__(3, [erase_rel(param[0])]);
      case 4 : 
          return /* Nativeint_ty */Block.__(4, [erase_rel(param[0])]);
      case 5 : 
          return /* Int64_ty */Block.__(5, [erase_rel(param[0])]);
      case 6 : 
          return /* Float_ty */Block.__(6, [erase_rel(param[0])]);
      case 7 : 
          return /* Bool_ty */Block.__(7, [erase_rel(param[0])]);
      case 8 : 
          return /* Format_arg_ty */Block.__(8, [
                    param[0],
                    erase_rel(param[1])
                  ]);
      case 9 : 
          var ty1 = param[0];
          return /* Format_subst_ty */Block.__(9, [
                    ty1,
                    ty1,
                    erase_rel(param[2])
                  ]);
      case 10 : 
          return /* Alpha_ty */Block.__(10, [erase_rel(param[0])]);
      case 11 : 
          return /* Theta_ty */Block.__(11, [erase_rel(param[0])]);
      case 12 : 
          return /* Any_ty */Block.__(12, [erase_rel(param[0])]);
      case 13 : 
          return /* Reader_ty */Block.__(13, [erase_rel(param[0])]);
      case 14 : 
          return /* Ignored_reader_ty */Block.__(14, [erase_rel(param[0])]);
      
    }
  }
}

function concat_fmtty(fmtty1, fmtty2) {
  if (typeof fmtty1 === "number") {
    return fmtty2;
  } else {
    switch (fmtty1.tag | 0) {
      case 0 : 
          return /* Char_ty */Block.__(0, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 1 : 
          return /* String_ty */Block.__(1, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 2 : 
          return /* Int_ty */Block.__(2, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 3 : 
          return /* Int32_ty */Block.__(3, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 4 : 
          return /* Nativeint_ty */Block.__(4, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 5 : 
          return /* Int64_ty */Block.__(5, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 6 : 
          return /* Float_ty */Block.__(6, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 7 : 
          return /* Bool_ty */Block.__(7, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 8 : 
          return /* Format_arg_ty */Block.__(8, [
                    fmtty1[0],
                    concat_fmtty(fmtty1[1], fmtty2)
                  ]);
      case 9 : 
          return /* Format_subst_ty */Block.__(9, [
                    fmtty1[0],
                    fmtty1[1],
                    concat_fmtty(fmtty1[2], fmtty2)
                  ]);
      case 10 : 
          return /* Alpha_ty */Block.__(10, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 11 : 
          return /* Theta_ty */Block.__(11, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 12 : 
          return /* Any_ty */Block.__(12, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 13 : 
          return /* Reader_ty */Block.__(13, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 14 : 
          return /* Ignored_reader_ty */Block.__(14, [concat_fmtty(fmtty1[0], fmtty2)]);
      
    }
  }
}

function concat_fmt(fmt1, fmt2) {
  if (typeof fmt1 === "number") {
    return fmt2;
  } else {
    switch (fmt1.tag | 0) {
      case 0 : 
          return /* Char */Block.__(0, [concat_fmt(fmt1[0], fmt2)]);
      case 1 : 
          return /* Caml_char */Block.__(1, [concat_fmt(fmt1[0], fmt2)]);
      case 2 : 
          return /* String */Block.__(2, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case 3 : 
          return /* Caml_string */Block.__(3, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case 4 : 
          return /* Int */Block.__(4, [
                    fmt1[0],
                    fmt1[1],
                    fmt1[2],
                    concat_fmt(fmt1[3], fmt2)
                  ]);
      case 5 : 
          return /* Int32 */Block.__(5, [
                    fmt1[0],
                    fmt1[1],
                    fmt1[2],
                    concat_fmt(fmt1[3], fmt2)
                  ]);
      case 6 : 
          return /* Nativeint */Block.__(6, [
                    fmt1[0],
                    fmt1[1],
                    fmt1[2],
                    concat_fmt(fmt1[3], fmt2)
                  ]);
      case 7 : 
          return /* Int64 */Block.__(7, [
                    fmt1[0],
                    fmt1[1],
                    fmt1[2],
                    concat_fmt(fmt1[3], fmt2)
                  ]);
      case 8 : 
          return /* Float */Block.__(8, [
                    fmt1[0],
                    fmt1[1],
                    fmt1[2],
                    concat_fmt(fmt1[3], fmt2)
                  ]);
      case 9 : 
          return /* Bool */Block.__(9, [concat_fmt(fmt1[0], fmt2)]);
      case 10 : 
          return /* Flush */Block.__(10, [concat_fmt(fmt1[0], fmt2)]);
      case 11 : 
          return /* String_literal */Block.__(11, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case 12 : 
          return /* Char_literal */Block.__(12, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case 13 : 
          return /* Format_arg */Block.__(13, [
                    fmt1[0],
                    fmt1[1],
                    concat_fmt(fmt1[2], fmt2)
                  ]);
      case 14 : 
          return /* Format_subst */Block.__(14, [
                    fmt1[0],
                    fmt1[1],
                    concat_fmt(fmt1[2], fmt2)
                  ]);
      case 15 : 
          return /* Alpha */Block.__(15, [concat_fmt(fmt1[0], fmt2)]);
      case 16 : 
          return /* Theta */Block.__(16, [concat_fmt(fmt1[0], fmt2)]);
      case 17 : 
          return /* Formatting_lit */Block.__(17, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case 18 : 
          return /* Formatting_gen */Block.__(18, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case 19 : 
          return /* Reader */Block.__(19, [concat_fmt(fmt1[0], fmt2)]);
      case 20 : 
          return /* Scan_char_set */Block.__(20, [
                    fmt1[0],
                    fmt1[1],
                    concat_fmt(fmt1[2], fmt2)
                  ]);
      case 21 : 
          return /* Scan_get_counter */Block.__(21, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case 22 : 
          return /* Scan_next_char */Block.__(22, [concat_fmt(fmt1[0], fmt2)]);
      case 23 : 
          return /* Ignored_param */Block.__(23, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case 24 : 
          return /* Custom */Block.__(24, [
                    fmt1[0],
                    fmt1[1],
                    concat_fmt(fmt1[2], fmt2)
                  ]);
      
    }
  }
}

exports.concat_fmtty = concat_fmtty;
exports.erase_rel    = erase_rel;
exports.concat_fmt   = concat_fmt;
/* No side effect */

},{"./block.js":"stdlib/block"}],"stdlib/camlinternalFormat":[function(require,module,exports){
'use strict';

var Sys                      = require("./sys.js");
var Char                     = require("./char.js");
var Block                    = require("./block.js");
var Bytes                    = require("./bytes.js");
var Curry                    = require("./curry.js");
var Buffer                   = require("./buffer.js");
var Js_exn                   = require("./js_exn.js");
var $$String                 = require("./string.js");
var Caml_io                  = require("./caml_io.js");
var Caml_obj                 = require("./caml_obj.js");
var Caml_bytes               = require("./caml_bytes.js");
var Caml_float               = require("./caml_float.js");
var Caml_int32               = require("./caml_int32.js");
var Pervasives               = require("./pervasives.js");
var Caml_format              = require("./caml_format.js");
var Caml_string              = require("./caml_string.js");
var Caml_exceptions          = require("./caml_exceptions.js");
var Caml_builtin_exceptions  = require("./caml_builtin_exceptions.js");
var CamlinternalFormatBasics = require("./camlinternalFormatBasics.js");

function create_char_set() {
  return Bytes.make(32, /* "\000" */0);
}

function add_in_char_set(char_set, c) {
  var str_ind = (c >>> 3);
  var mask = (1 << (c & 7));
  char_set[str_ind] = Pervasives.char_of_int(Caml_bytes.get(char_set, str_ind) | mask);
  return /* () */0;
}

var freeze_char_set = Bytes.to_string;

function rev_char_set(char_set) {
  var char_set$prime = Bytes.make(32, /* "\000" */0);
  for(var i = 0; i <= 31; ++i){
    char_set$prime[i] = Pervasives.char_of_int(Caml_string.get(char_set, i) ^ 255);
  }
  return Caml_string.bytes_to_string(char_set$prime);
}

function is_in_char_set(char_set, c) {
  var str_ind = (c >>> 3);
  var mask = (1 << (c & 7));
  return +((Caml_string.get(char_set, str_ind) & mask) !== 0);
}

function pad_of_pad_opt(pad_opt) {
  if (pad_opt) {
    return /* Lit_padding */Block.__(0, [
              /* Right */1,
              pad_opt[0]
            ]);
  } else {
    return /* No_padding */0;
  }
}

function prec_of_prec_opt(prec_opt) {
  if (prec_opt) {
    return /* Lit_precision */[prec_opt[0]];
  } else {
    return /* No_precision */0;
  }
}

function param_format_of_ignored_format(ign, fmt) {
  if (typeof ign === "number") {
    switch (ign) {
      case 0 : 
          return /* Param_format_EBB */[/* Char */Block.__(0, [fmt])];
      case 1 : 
          return /* Param_format_EBB */[/* Caml_char */Block.__(1, [fmt])];
      case 2 : 
          return /* Param_format_EBB */[/* Bool */Block.__(9, [fmt])];
      case 3 : 
          return /* Param_format_EBB */[/* Reader */Block.__(19, [fmt])];
      case 4 : 
          return /* Param_format_EBB */[/* Scan_next_char */Block.__(22, [fmt])];
      
    }
  } else {
    switch (ign.tag | 0) {
      case 0 : 
          return /* Param_format_EBB */[/* String */Block.__(2, [
                      pad_of_pad_opt(ign[0]),
                      fmt
                    ])];
      case 1 : 
          return /* Param_format_EBB */[/* Caml_string */Block.__(3, [
                      pad_of_pad_opt(ign[0]),
                      fmt
                    ])];
      case 2 : 
          return /* Param_format_EBB */[/* Int */Block.__(4, [
                      ign[0],
                      pad_of_pad_opt(ign[1]),
                      /* No_precision */0,
                      fmt
                    ])];
      case 3 : 
          return /* Param_format_EBB */[/* Int32 */Block.__(5, [
                      ign[0],
                      pad_of_pad_opt(ign[1]),
                      /* No_precision */0,
                      fmt
                    ])];
      case 4 : 
          return /* Param_format_EBB */[/* Nativeint */Block.__(6, [
                      ign[0],
                      pad_of_pad_opt(ign[1]),
                      /* No_precision */0,
                      fmt
                    ])];
      case 5 : 
          return /* Param_format_EBB */[/* Int64 */Block.__(7, [
                      ign[0],
                      pad_of_pad_opt(ign[1]),
                      /* No_precision */0,
                      fmt
                    ])];
      case 6 : 
          return /* Param_format_EBB */[/* Float */Block.__(8, [
                      /* Float_f */0,
                      pad_of_pad_opt(ign[0]),
                      prec_of_prec_opt(ign[1]),
                      fmt
                    ])];
      case 7 : 
          return /* Param_format_EBB */[/* Format_arg */Block.__(13, [
                      ign[0],
                      ign[1],
                      fmt
                    ])];
      case 8 : 
          return /* Param_format_EBB */[/* Format_subst */Block.__(14, [
                      ign[0],
                      ign[1],
                      fmt
                    ])];
      case 9 : 
          return /* Param_format_EBB */[/* Scan_char_set */Block.__(20, [
                      ign[0],
                      ign[1],
                      fmt
                    ])];
      case 10 : 
          return /* Param_format_EBB */[/* Scan_get_counter */Block.__(21, [
                      ign[0],
                      fmt
                    ])];
      
    }
  }
}

function buffer_check_size(buf, overhead) {
  var len = buf[/* bytes */1].length;
  var min_len = buf[/* ind */0] + overhead | 0;
  if (min_len > len) {
    var new_len = Pervasives.max((len << 1), min_len);
    var new_str = Caml_string.caml_create_string(new_len);
    Bytes.blit(buf[/* bytes */1], 0, new_str, 0, len);
    buf[/* bytes */1] = new_str;
    return /* () */0;
  } else {
    return 0;
  }
}

function buffer_add_char(buf, c) {
  buffer_check_size(buf, 1);
  buf[/* bytes */1][buf[/* ind */0]] = c;
  buf[/* ind */0] = buf[/* ind */0] + 1 | 0;
  return /* () */0;
}

function buffer_add_string(buf, s) {
  var str_len = s.length;
  buffer_check_size(buf, str_len);
  $$String.blit(s, 0, buf[/* bytes */1], buf[/* ind */0], str_len);
  buf[/* ind */0] = buf[/* ind */0] + str_len | 0;
  return /* () */0;
}

function buffer_contents(buf) {
  return Bytes.sub_string(buf[/* bytes */1], 0, buf[/* ind */0]);
}

function char_of_iconv(iconv) {
  switch (iconv) {
    case 0 : 
    case 1 : 
    case 2 : 
        return /* "d" */100;
    case 3 : 
    case 4 : 
    case 5 : 
        return /* "i" */105;
    case 6 : 
    case 7 : 
        return /* "x" */120;
    case 8 : 
    case 9 : 
        return /* "X" */88;
    case 10 : 
    case 11 : 
        return /* "o" */111;
    case 12 : 
        return /* "u" */117;
    
  }
}

function char_of_fconv(fconv) {
  switch (fconv) {
    case 0 : 
    case 1 : 
    case 2 : 
        return /* "f" */102;
    case 3 : 
    case 4 : 
    case 5 : 
        return /* "e" */101;
    case 6 : 
    case 7 : 
    case 8 : 
        return /* "E" */69;
    case 9 : 
    case 10 : 
    case 11 : 
        return /* "g" */103;
    case 12 : 
    case 13 : 
    case 14 : 
        return /* "G" */71;
    case 15 : 
        return /* "F" */70;
    
  }
}

function char_of_counter(counter) {
  switch (counter) {
    case 0 : 
        return /* "l" */108;
    case 1 : 
        return /* "n" */110;
    case 2 : 
        return /* "N" */78;
    
  }
}

function bprint_char_set(buf, char_set) {
  var print_char = function (buf, i) {
    var c = Pervasives.char_of_int(i);
    if (c !== 37) {
      if (c !== 64) {
        return buffer_add_char(buf, c);
      } else {
        buffer_add_char(buf, /* "%" */37);
        return buffer_add_char(buf, /* "@" */64);
      }
    } else {
      buffer_add_char(buf, /* "%" */37);
      return buffer_add_char(buf, /* "%" */37);
    }
  };
  var print_out = function (set, _i) {
    while(true) {
      var i = _i;
      if (i < 256) {
        if (is_in_char_set(set, Pervasives.char_of_int(i))) {
          var set$1 = set;
          var i$1 = i;
          var match = Pervasives.char_of_int(i$1);
          var switcher = match - 45 | 0;
          if (switcher > 48 || switcher < 0) {
            if (switcher >= 210) {
              return print_char(buf, 255);
            } else {
              return print_second(set$1, i$1 + 1 | 0);
            }
          } else if (switcher > 47 || switcher < 1) {
            return print_out(set$1, i$1 + 1 | 0);
          } else {
            return print_second(set$1, i$1 + 1 | 0);
          }
        } else {
          _i = i + 1 | 0;
          continue ;
          
        }
      } else {
        return 0;
      }
    };
  };
  var print_second = function (set, i) {
    if (is_in_char_set(set, Pervasives.char_of_int(i))) {
      var match = Pervasives.char_of_int(i);
      var exit = 0;
      var switcher = match - 45 | 0;
      if (switcher > 48 || switcher < 0) {
        if (switcher >= 210) {
          print_char(buf, 254);
          return print_char(buf, 255);
        } else {
          exit = 1;
        }
      } else if (switcher > 47 || switcher < 1) {
        if (is_in_char_set(set, Pervasives.char_of_int(i + 1 | 0))) {
          exit = 1;
        } else {
          print_char(buf, i - 1 | 0);
          return print_out(set, i + 1 | 0);
        }
      } else {
        exit = 1;
      }
      if (exit === 1) {
        if (is_in_char_set(set, Pervasives.char_of_int(i + 1 | 0))) {
          var set$1 = set;
          var i$1 = i - 1 | 0;
          var _j = i + 2 | 0;
          while(true) {
            var j = _j;
            if (j === 256 || !is_in_char_set(set$1, Pervasives.char_of_int(j))) {
              print_char(buf, i$1);
              print_char(buf, /* "-" */45);
              print_char(buf, j - 1 | 0);
              if (j < 256) {
                return print_out(set$1, j + 1 | 0);
              } else {
                return 0;
              }
            } else {
              _j = j + 1 | 0;
              continue ;
              
            }
          };
        } else {
          print_char(buf, i - 1 | 0);
          print_char(buf, i);
          return print_out(set, i + 2 | 0);
        }
      }
      
    } else {
      print_char(buf, i - 1 | 0);
      return print_out(set, i + 1 | 0);
    }
  };
  var print_start = function (set) {
    var is_alone = function (c) {
      var match_000 = Char.chr(c - 1 | 0);
      var match_001 = Char.chr(c + 1 | 0);
      if (is_in_char_set(set, c)) {
        return 1 - (is_in_char_set(set, match_000) && is_in_char_set(set, match_001));
      } else {
        return /* false */0;
      }
    };
    if (is_alone(/* "]" */93)) {
      buffer_add_char(buf, /* "]" */93);
    }
    print_out(set, 1);
    if (is_alone(/* "-" */45)) {
      return buffer_add_char(buf, /* "-" */45);
    } else {
      return 0;
    }
  };
  buffer_add_char(buf, /* "[" */91);
  print_start(is_in_char_set(char_set, /* "\000" */0) ? (buffer_add_char(buf, /* "^" */94), rev_char_set(char_set)) : char_set);
  return buffer_add_char(buf, /* "]" */93);
}

function bprint_padty(buf, padty) {
  switch (padty) {
    case 0 : 
        return buffer_add_char(buf, /* "-" */45);
    case 1 : 
        return /* () */0;
    case 2 : 
        return buffer_add_char(buf, /* "0" */48);
    
  }
}

function bprint_ignored_flag(buf, ign_flag) {
  if (ign_flag) {
    return buffer_add_char(buf, /* "_" */95);
  } else {
    return 0;
  }
}

function bprint_pad_opt(buf, pad_opt) {
  if (pad_opt) {
    return buffer_add_string(buf, "" + pad_opt[0]);
  } else {
    return /* () */0;
  }
}

function bprint_padding(buf, pad) {
  if (typeof pad === "number") {
    return /* () */0;
  } else {
    bprint_padty(buf, pad[0]);
    if (pad.tag) {
      return buffer_add_char(buf, /* "*" */42);
    } else {
      return buffer_add_string(buf, "" + pad[1]);
    }
  }
}

function bprint_precision(buf, prec) {
  if (typeof prec === "number") {
    if (prec !== 0) {
      return buffer_add_string(buf, ".*");
    } else {
      return /* () */0;
    }
  } else {
    buffer_add_char(buf, /* "." */46);
    return buffer_add_string(buf, "" + prec[0]);
  }
}

function bprint_iconv_flag(buf, iconv) {
  switch (iconv) {
    case 1 : 
    case 4 : 
        return buffer_add_char(buf, /* "+" */43);
    case 2 : 
    case 5 : 
        return buffer_add_char(buf, /* " " */32);
    case 7 : 
    case 9 : 
    case 11 : 
        return buffer_add_char(buf, /* "#" */35);
    case 0 : 
    case 3 : 
    case 6 : 
    case 8 : 
    case 10 : 
    case 12 : 
        return /* () */0;
    
  }
}

function bprint_int_fmt(buf, ign_flag, iconv, pad, prec) {
  buffer_add_char(buf, /* "%" */37);
  bprint_ignored_flag(buf, ign_flag);
  bprint_iconv_flag(buf, iconv);
  bprint_padding(buf, pad);
  bprint_precision(buf, prec);
  return buffer_add_char(buf, char_of_iconv(iconv));
}

function bprint_altint_fmt(buf, ign_flag, iconv, pad, prec, c) {
  buffer_add_char(buf, /* "%" */37);
  bprint_ignored_flag(buf, ign_flag);
  bprint_iconv_flag(buf, iconv);
  bprint_padding(buf, pad);
  bprint_precision(buf, prec);
  buffer_add_char(buf, c);
  return buffer_add_char(buf, char_of_iconv(iconv));
}

function bprint_fconv_flag(buf, fconv) {
  switch (fconv) {
    case 1 : 
    case 4 : 
    case 7 : 
    case 10 : 
    case 13 : 
        return buffer_add_char(buf, /* "+" */43);
    case 2 : 
    case 5 : 
    case 8 : 
    case 11 : 
    case 14 : 
        return buffer_add_char(buf, /* " " */32);
    case 0 : 
    case 3 : 
    case 6 : 
    case 9 : 
    case 12 : 
    case 15 : 
        return /* () */0;
    
  }
}

function bprint_float_fmt(buf, ign_flag, fconv, pad, prec) {
  buffer_add_char(buf, /* "%" */37);
  bprint_ignored_flag(buf, ign_flag);
  bprint_fconv_flag(buf, fconv);
  bprint_padding(buf, pad);
  bprint_precision(buf, prec);
  return buffer_add_char(buf, char_of_fconv(fconv));
}

function string_of_formatting_lit(formatting_lit) {
  if (typeof formatting_lit === "number") {
    switch (formatting_lit) {
      case 0 : 
          return "@]";
      case 1 : 
          return "@}";
      case 2 : 
          return "@?";
      case 3 : 
          return "@\n";
      case 4 : 
          return "@.";
      case 5 : 
          return "@@";
      case 6 : 
          return "@%";
      
    }
  } else {
    switch (formatting_lit.tag | 0) {
      case 0 : 
      case 1 : 
          return formatting_lit[0];
      case 2 : 
          return "@" + Caml_string.bytes_to_string(Bytes.make(1, formatting_lit[0]));
      
    }
  }
}

function string_of_formatting_gen(formatting_gen) {
  return formatting_gen[0][1];
}

function bprint_char_literal(buf, chr) {
  if (chr !== 37) {
    return buffer_add_char(buf, chr);
  } else {
    return buffer_add_string(buf, "%%");
  }
}

function bprint_string_literal(buf, str) {
  for(var i = 0 ,i_finish = str.length - 1 | 0; i <= i_finish; ++i){
    bprint_char_literal(buf, Caml_string.get(str, i));
  }
  return /* () */0;
}

function bprint_fmtty(buf, _fmtty) {
  while(true) {
    var fmtty = _fmtty;
    if (typeof fmtty === "number") {
      return /* () */0;
    } else {
      switch (fmtty.tag | 0) {
        case 0 : 
            buffer_add_string(buf, "%c");
            _fmtty = fmtty[0];
            continue ;
            case 1 : 
            buffer_add_string(buf, "%s");
            _fmtty = fmtty[0];
            continue ;
            case 2 : 
            buffer_add_string(buf, "%i");
            _fmtty = fmtty[0];
            continue ;
            case 3 : 
            buffer_add_string(buf, "%li");
            _fmtty = fmtty[0];
            continue ;
            case 4 : 
            buffer_add_string(buf, "%ni");
            _fmtty = fmtty[0];
            continue ;
            case 5 : 
            buffer_add_string(buf, "%Li");
            _fmtty = fmtty[0];
            continue ;
            case 6 : 
            buffer_add_string(buf, "%f");
            _fmtty = fmtty[0];
            continue ;
            case 7 : 
            buffer_add_string(buf, "%B");
            _fmtty = fmtty[0];
            continue ;
            case 8 : 
            buffer_add_string(buf, "%{");
            bprint_fmtty(buf, fmtty[0]);
            buffer_add_string(buf, "%}");
            _fmtty = fmtty[1];
            continue ;
            case 9 : 
            buffer_add_string(buf, "%(");
            bprint_fmtty(buf, fmtty[0]);
            buffer_add_string(buf, "%)");
            _fmtty = fmtty[2];
            continue ;
            case 10 : 
            buffer_add_string(buf, "%a");
            _fmtty = fmtty[0];
            continue ;
            case 11 : 
            buffer_add_string(buf, "%t");
            _fmtty = fmtty[0];
            continue ;
            case 12 : 
            buffer_add_string(buf, "%?");
            _fmtty = fmtty[0];
            continue ;
            case 13 : 
            buffer_add_string(buf, "%r");
            _fmtty = fmtty[0];
            continue ;
            case 14 : 
            buffer_add_string(buf, "%_r");
            _fmtty = fmtty[0];
            continue ;
            
      }
    }
  };
}

function int_of_custom_arity(param) {
  if (param) {
    return 1 + int_of_custom_arity(param[0]) | 0;
  } else {
    return 0;
  }
}

function bprint_fmt(buf, fmt) {
  var _fmt = fmt;
  var _ign_flag = /* false */0;
  while(true) {
    var ign_flag = _ign_flag;
    var fmt$1 = _fmt;
    if (typeof fmt$1 === "number") {
      return /* () */0;
    } else {
      switch (fmt$1.tag | 0) {
        case 0 : 
            buffer_add_char(buf, /* "%" */37);
            bprint_ignored_flag(buf, ign_flag);
            buffer_add_char(buf, /* "c" */99);
            _ign_flag = /* false */0;
            _fmt = fmt$1[0];
            continue ;
            case 1 : 
            buffer_add_char(buf, /* "%" */37);
            bprint_ignored_flag(buf, ign_flag);
            buffer_add_char(buf, /* "C" */67);
            _ign_flag = /* false */0;
            _fmt = fmt$1[0];
            continue ;
            case 2 : 
            buffer_add_char(buf, /* "%" */37);
            bprint_ignored_flag(buf, ign_flag);
            bprint_padding(buf, fmt$1[0]);
            buffer_add_char(buf, /* "s" */115);
            _ign_flag = /* false */0;
            _fmt = fmt$1[1];
            continue ;
            case 3 : 
            buffer_add_char(buf, /* "%" */37);
            bprint_ignored_flag(buf, ign_flag);
            bprint_padding(buf, fmt$1[0]);
            buffer_add_char(buf, /* "S" */83);
            _ign_flag = /* false */0;
            _fmt = fmt$1[1];
            continue ;
            case 4 : 
            bprint_int_fmt(buf, ign_flag, fmt$1[0], fmt$1[1], fmt$1[2]);
            _ign_flag = /* false */0;
            _fmt = fmt$1[3];
            continue ;
            case 5 : 
            bprint_altint_fmt(buf, ign_flag, fmt$1[0], fmt$1[1], fmt$1[2], /* "l" */108);
            _ign_flag = /* false */0;
            _fmt = fmt$1[3];
            continue ;
            case 6 : 
            bprint_altint_fmt(buf, ign_flag, fmt$1[0], fmt$1[1], fmt$1[2], /* "n" */110);
            _ign_flag = /* false */0;
            _fmt = fmt$1[3];
            continue ;
            case 7 : 
            bprint_altint_fmt(buf, ign_flag, fmt$1[0], fmt$1[1], fmt$1[2], /* "L" */76);
            _ign_flag = /* false */0;
            _fmt = fmt$1[3];
            continue ;
            case 8 : 
            bprint_float_fmt(buf, ign_flag, fmt$1[0], fmt$1[1], fmt$1[2]);
            _ign_flag = /* false */0;
            _fmt = fmt$1[3];
            continue ;
            case 9 : 
            buffer_add_char(buf, /* "%" */37);
            bprint_ignored_flag(buf, ign_flag);
            buffer_add_char(buf, /* "B" */66);
            _ign_flag = /* false */0;
            _fmt = fmt$1[0];
            continue ;
            case 10 : 
            buffer_add_string(buf, "%!");
            _fmt = fmt$1[0];
            continue ;
            case 11 : 
            bprint_string_literal(buf, fmt$1[0]);
            _fmt = fmt$1[1];
            continue ;
            case 12 : 
            bprint_char_literal(buf, fmt$1[0]);
            _fmt = fmt$1[1];
            continue ;
            case 13 : 
            buffer_add_char(buf, /* "%" */37);
            bprint_ignored_flag(buf, ign_flag);
            bprint_pad_opt(buf, fmt$1[0]);
            buffer_add_char(buf, /* "{" */123);
            bprint_fmtty(buf, fmt$1[1]);
            buffer_add_char(buf, /* "%" */37);
            buffer_add_char(buf, /* "}" */125);
            _ign_flag = /* false */0;
            _fmt = fmt$1[2];
            continue ;
            case 14 : 
            buffer_add_char(buf, /* "%" */37);
            bprint_ignored_flag(buf, ign_flag);
            bprint_pad_opt(buf, fmt$1[0]);
            buffer_add_char(buf, /* "(" */40);
            bprint_fmtty(buf, fmt$1[1]);
            buffer_add_char(buf, /* "%" */37);
            buffer_add_char(buf, /* ")" */41);
            _ign_flag = /* false */0;
            _fmt = fmt$1[2];
            continue ;
            case 15 : 
            buffer_add_char(buf, /* "%" */37);
            bprint_ignored_flag(buf, ign_flag);
            buffer_add_char(buf, /* "a" */97);
            _ign_flag = /* false */0;
            _fmt = fmt$1[0];
            continue ;
            case 16 : 
            buffer_add_char(buf, /* "%" */37);
            bprint_ignored_flag(buf, ign_flag);
            buffer_add_char(buf, /* "t" */116);
            _ign_flag = /* false */0;
            _fmt = fmt$1[0];
            continue ;
            case 17 : 
            bprint_string_literal(buf, string_of_formatting_lit(fmt$1[0]));
            _fmt = fmt$1[1];
            continue ;
            case 18 : 
            bprint_string_literal(buf, "@{");
            bprint_string_literal(buf, string_of_formatting_gen(fmt$1[0]));
            _fmt = fmt$1[1];
            continue ;
            case 19 : 
            buffer_add_char(buf, /* "%" */37);
            bprint_ignored_flag(buf, ign_flag);
            buffer_add_char(buf, /* "r" */114);
            _ign_flag = /* false */0;
            _fmt = fmt$1[0];
            continue ;
            case 20 : 
            buffer_add_char(buf, /* "%" */37);
            bprint_ignored_flag(buf, ign_flag);
            bprint_pad_opt(buf, fmt$1[0]);
            bprint_char_set(buf, fmt$1[1]);
            _ign_flag = /* false */0;
            _fmt = fmt$1[2];
            continue ;
            case 21 : 
            buffer_add_char(buf, /* "%" */37);
            bprint_ignored_flag(buf, ign_flag);
            buffer_add_char(buf, char_of_counter(fmt$1[0]));
            _ign_flag = /* false */0;
            _fmt = fmt$1[1];
            continue ;
            case 22 : 
            buffer_add_char(buf, /* "%" */37);
            bprint_ignored_flag(buf, ign_flag);
            bprint_string_literal(buf, "0c");
            _ign_flag = /* false */0;
            _fmt = fmt$1[0];
            continue ;
            case 23 : 
            var match = param_format_of_ignored_format(fmt$1[0], fmt$1[1]);
            _ign_flag = /* true */1;
            _fmt = match[0];
            continue ;
            case 24 : 
            for(var _i = 1 ,_i_finish = int_of_custom_arity(fmt$1[0]); _i <= _i_finish; ++_i){
              buffer_add_char(buf, /* "%" */37);
              bprint_ignored_flag(buf, ign_flag);
              buffer_add_char(buf, /* "?" */63);
            }
            _ign_flag = /* false */0;
            _fmt = fmt$1[2];
            continue ;
            
      }
    }
  };
}

function string_of_fmt(fmt) {
  var buf = /* record */[
    /* ind */0,
    /* bytes */new Array(16)
  ];
  bprint_fmt(buf, fmt);
  return buffer_contents(buf);
}

function symm(param) {
  if (typeof param === "number") {
    return /* End_of_fmtty */0;
  } else {
    switch (param.tag | 0) {
      case 0 : 
          return /* Char_ty */Block.__(0, [symm(param[0])]);
      case 1 : 
          return /* String_ty */Block.__(1, [symm(param[0])]);
      case 2 : 
          return /* Int_ty */Block.__(2, [symm(param[0])]);
      case 3 : 
          return /* Int32_ty */Block.__(3, [symm(param[0])]);
      case 4 : 
          return /* Nativeint_ty */Block.__(4, [symm(param[0])]);
      case 5 : 
          return /* Int64_ty */Block.__(5, [symm(param[0])]);
      case 6 : 
          return /* Float_ty */Block.__(6, [symm(param[0])]);
      case 7 : 
          return /* Bool_ty */Block.__(7, [symm(param[0])]);
      case 8 : 
          return /* Format_arg_ty */Block.__(8, [
                    param[0],
                    symm(param[1])
                  ]);
      case 9 : 
          return /* Format_subst_ty */Block.__(9, [
                    param[1],
                    param[0],
                    symm(param[2])
                  ]);
      case 10 : 
          return /* Alpha_ty */Block.__(10, [symm(param[0])]);
      case 11 : 
          return /* Theta_ty */Block.__(11, [symm(param[0])]);
      case 12 : 
          return /* Any_ty */Block.__(12, [symm(param[0])]);
      case 13 : 
          return /* Reader_ty */Block.__(13, [symm(param[0])]);
      case 14 : 
          return /* Ignored_reader_ty */Block.__(14, [symm(param[0])]);
      
    }
  }
}

function fmtty_rel_det(param) {
  if (typeof param === "number") {
    return /* tuple */[
            (function () {
                return /* Refl */0;
              }),
            (function () {
                return /* Refl */0;
              }),
            (function () {
                return /* Refl */0;
              }),
            (function () {
                return /* Refl */0;
              })
          ];
  } else {
    switch (param.tag | 0) {
      case 0 : 
          var match = fmtty_rel_det(param[0]);
          var af = match[1];
          var fa = match[0];
          return /* tuple */[
                  (function () {
                      Curry._1(fa, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      Curry._1(af, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match[2],
                  match[3]
                ];
      case 1 : 
          var match$1 = fmtty_rel_det(param[0]);
          var af$1 = match$1[1];
          var fa$1 = match$1[0];
          return /* tuple */[
                  (function () {
                      Curry._1(fa$1, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      Curry._1(af$1, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$1[2],
                  match$1[3]
                ];
      case 2 : 
          var match$2 = fmtty_rel_det(param[0]);
          var af$2 = match$2[1];
          var fa$2 = match$2[0];
          return /* tuple */[
                  (function () {
                      Curry._1(fa$2, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      Curry._1(af$2, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$2[2],
                  match$2[3]
                ];
      case 3 : 
          var match$3 = fmtty_rel_det(param[0]);
          var af$3 = match$3[1];
          var fa$3 = match$3[0];
          return /* tuple */[
                  (function () {
                      Curry._1(fa$3, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      Curry._1(af$3, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$3[2],
                  match$3[3]
                ];
      case 4 : 
          var match$4 = fmtty_rel_det(param[0]);
          var af$4 = match$4[1];
          var fa$4 = match$4[0];
          return /* tuple */[
                  (function () {
                      Curry._1(fa$4, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      Curry._1(af$4, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$4[2],
                  match$4[3]
                ];
      case 5 : 
          var match$5 = fmtty_rel_det(param[0]);
          var af$5 = match$5[1];
          var fa$5 = match$5[0];
          return /* tuple */[
                  (function () {
                      Curry._1(fa$5, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      Curry._1(af$5, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$5[2],
                  match$5[3]
                ];
      case 6 : 
          var match$6 = fmtty_rel_det(param[0]);
          var af$6 = match$6[1];
          var fa$6 = match$6[0];
          return /* tuple */[
                  (function () {
                      Curry._1(fa$6, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      Curry._1(af$6, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$6[2],
                  match$6[3]
                ];
      case 7 : 
          var match$7 = fmtty_rel_det(param[0]);
          var af$7 = match$7[1];
          var fa$7 = match$7[0];
          return /* tuple */[
                  (function () {
                      Curry._1(fa$7, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      Curry._1(af$7, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$7[2],
                  match$7[3]
                ];
      case 8 : 
          var match$8 = fmtty_rel_det(param[1]);
          var af$8 = match$8[1];
          var fa$8 = match$8[0];
          return /* tuple */[
                  (function () {
                      Curry._1(fa$8, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      Curry._1(af$8, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$8[2],
                  match$8[3]
                ];
      case 9 : 
          var match$9 = fmtty_rel_det(param[2]);
          var de = match$9[3];
          var ed = match$9[2];
          var af$9 = match$9[1];
          var fa$9 = match$9[0];
          var ty = trans(symm(param[0]), param[1]);
          var match$10 = fmtty_rel_det(ty);
          var jd = match$10[3];
          var dj = match$10[2];
          var ga = match$10[1];
          var ag = match$10[0];
          return /* tuple */[
                  (function () {
                      Curry._1(fa$9, /* Refl */0);
                      Curry._1(ag, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      Curry._1(ga, /* Refl */0);
                      Curry._1(af$9, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      Curry._1(ed, /* Refl */0);
                      Curry._1(dj, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      Curry._1(jd, /* Refl */0);
                      Curry._1(de, /* Refl */0);
                      return /* Refl */0;
                    })
                ];
      case 10 : 
          var match$11 = fmtty_rel_det(param[0]);
          var af$10 = match$11[1];
          var fa$10 = match$11[0];
          return /* tuple */[
                  (function () {
                      Curry._1(fa$10, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      Curry._1(af$10, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$11[2],
                  match$11[3]
                ];
      case 11 : 
          var match$12 = fmtty_rel_det(param[0]);
          var af$11 = match$12[1];
          var fa$11 = match$12[0];
          return /* tuple */[
                  (function () {
                      Curry._1(fa$11, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      Curry._1(af$11, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$12[2],
                  match$12[3]
                ];
      case 12 : 
          var match$13 = fmtty_rel_det(param[0]);
          var af$12 = match$13[1];
          var fa$12 = match$13[0];
          return /* tuple */[
                  (function () {
                      Curry._1(fa$12, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      Curry._1(af$12, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$13[2],
                  match$13[3]
                ];
      case 13 : 
          var match$14 = fmtty_rel_det(param[0]);
          var de$1 = match$14[3];
          var ed$1 = match$14[2];
          var af$13 = match$14[1];
          var fa$13 = match$14[0];
          return /* tuple */[
                  (function () {
                      Curry._1(fa$13, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      Curry._1(af$13, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      Curry._1(ed$1, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      Curry._1(de$1, /* Refl */0);
                      return /* Refl */0;
                    })
                ];
      case 14 : 
          var match$15 = fmtty_rel_det(param[0]);
          var de$2 = match$15[3];
          var ed$2 = match$15[2];
          var af$14 = match$15[1];
          var fa$14 = match$15[0];
          return /* tuple */[
                  (function () {
                      Curry._1(fa$14, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      Curry._1(af$14, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      Curry._1(ed$2, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      Curry._1(de$2, /* Refl */0);
                      return /* Refl */0;
                    })
                ];
      
    }
  }
}

function trans(ty1, ty2) {
  var exit = 0;
  if (typeof ty1 === "number") {
    if (typeof ty2 === "number") {
      if (ty2) {
        throw [
              Caml_builtin_exceptions.assert_failure,
              [
                "camlinternalFormat.ml",
                816,
                23
              ]
            ];
      } else {
        return /* End_of_fmtty */0;
      }
    } else {
      switch (ty2.tag | 0) {
        case 8 : 
            exit = 6;
            break;
        case 9 : 
            exit = 7;
            break;
        case 10 : 
            exit = 1;
            break;
        case 11 : 
            exit = 2;
            break;
        case 12 : 
            exit = 3;
            break;
        case 13 : 
            exit = 4;
            break;
        case 14 : 
            exit = 5;
            break;
        default:
          throw [
                Caml_builtin_exceptions.assert_failure,
                [
                  "camlinternalFormat.ml",
                  816,
                  23
                ]
              ];
      }
    }
  } else {
    switch (ty1.tag | 0) {
      case 0 : 
          if (typeof ty2 === "number") {
            exit = 8;
          } else {
            switch (ty2.tag | 0) {
              case 0 : 
                  return /* Char_ty */Block.__(0, [trans(ty1[0], ty2[0])]);
              case 8 : 
                  exit = 6;
                  break;
              case 9 : 
                  exit = 7;
                  break;
              case 10 : 
                  exit = 1;
                  break;
              case 11 : 
                  exit = 2;
                  break;
              case 12 : 
                  exit = 3;
                  break;
              case 13 : 
                  exit = 4;
                  break;
              case 14 : 
                  exit = 5;
                  break;
              
            }
          }
          break;
      case 1 : 
          if (typeof ty2 === "number") {
            exit = 8;
          } else {
            switch (ty2.tag | 0) {
              case 1 : 
                  return /* String_ty */Block.__(1, [trans(ty1[0], ty2[0])]);
              case 8 : 
                  exit = 6;
                  break;
              case 9 : 
                  exit = 7;
                  break;
              case 10 : 
                  exit = 1;
                  break;
              case 11 : 
                  exit = 2;
                  break;
              case 12 : 
                  exit = 3;
                  break;
              case 13 : 
                  exit = 4;
                  break;
              case 14 : 
                  exit = 5;
                  break;
              
            }
          }
          break;
      case 2 : 
          if (typeof ty2 === "number") {
            exit = 8;
          } else {
            switch (ty2.tag | 0) {
              case 2 : 
                  return /* Int_ty */Block.__(2, [trans(ty1[0], ty2[0])]);
              case 8 : 
                  exit = 6;
                  break;
              case 9 : 
                  exit = 7;
                  break;
              case 10 : 
                  exit = 1;
                  break;
              case 11 : 
                  exit = 2;
                  break;
              case 12 : 
                  exit = 3;
                  break;
              case 13 : 
                  exit = 4;
                  break;
              case 14 : 
                  exit = 5;
                  break;
              
            }
          }
          break;
      case 3 : 
          if (typeof ty2 === "number") {
            exit = 8;
          } else {
            switch (ty2.tag | 0) {
              case 3 : 
                  return /* Int32_ty */Block.__(3, [trans(ty1[0], ty2[0])]);
              case 8 : 
                  exit = 6;
                  break;
              case 9 : 
                  exit = 7;
                  break;
              case 10 : 
                  exit = 1;
                  break;
              case 11 : 
                  exit = 2;
                  break;
              case 12 : 
                  exit = 3;
                  break;
              case 13 : 
                  exit = 4;
                  break;
              case 14 : 
                  exit = 5;
                  break;
              
            }
          }
          break;
      case 4 : 
          if (typeof ty2 === "number") {
            exit = 8;
          } else {
            switch (ty2.tag | 0) {
              case 4 : 
                  return /* Nativeint_ty */Block.__(4, [trans(ty1[0], ty2[0])]);
              case 8 : 
                  exit = 6;
                  break;
              case 9 : 
                  exit = 7;
                  break;
              case 10 : 
                  exit = 1;
                  break;
              case 11 : 
                  exit = 2;
                  break;
              case 12 : 
                  exit = 3;
                  break;
              case 13 : 
                  exit = 4;
                  break;
              case 14 : 
                  exit = 5;
                  break;
              
            }
          }
          break;
      case 5 : 
          if (typeof ty2 === "number") {
            exit = 8;
          } else {
            switch (ty2.tag | 0) {
              case 5 : 
                  return /* Int64_ty */Block.__(5, [trans(ty1[0], ty2[0])]);
              case 8 : 
                  exit = 6;
                  break;
              case 9 : 
                  exit = 7;
                  break;
              case 10 : 
                  exit = 1;
                  break;
              case 11 : 
                  exit = 2;
                  break;
              case 12 : 
                  exit = 3;
                  break;
              case 13 : 
                  exit = 4;
                  break;
              case 14 : 
                  exit = 5;
                  break;
              
            }
          }
          break;
      case 6 : 
          if (typeof ty2 === "number") {
            exit = 8;
          } else {
            switch (ty2.tag | 0) {
              case 6 : 
                  return /* Float_ty */Block.__(6, [trans(ty1[0], ty2[0])]);
              case 8 : 
                  exit = 6;
                  break;
              case 9 : 
                  exit = 7;
                  break;
              case 10 : 
                  exit = 1;
                  break;
              case 11 : 
                  exit = 2;
                  break;
              case 12 : 
                  exit = 3;
                  break;
              case 13 : 
                  exit = 4;
                  break;
              case 14 : 
                  exit = 5;
                  break;
              
            }
          }
          break;
      case 7 : 
          if (typeof ty2 === "number") {
            exit = 8;
          } else {
            switch (ty2.tag | 0) {
              case 7 : 
                  return /* Bool_ty */Block.__(7, [trans(ty1[0], ty2[0])]);
              case 8 : 
                  exit = 6;
                  break;
              case 9 : 
                  exit = 7;
                  break;
              case 10 : 
                  exit = 1;
                  break;
              case 11 : 
                  exit = 2;
                  break;
              case 12 : 
                  exit = 3;
                  break;
              case 13 : 
                  exit = 4;
                  break;
              case 14 : 
                  exit = 5;
                  break;
              
            }
          }
          break;
      case 8 : 
          if (typeof ty2 === "number") {
            throw [
                  Caml_builtin_exceptions.assert_failure,
                  [
                    "camlinternalFormat.ml",
                    802,
                    26
                  ]
                ];
          } else {
            switch (ty2.tag | 0) {
              case 8 : 
                  return /* Format_arg_ty */Block.__(8, [
                            trans(ty1[0], ty2[0]),
                            trans(ty1[1], ty2[1])
                          ]);
              case 10 : 
                  exit = 1;
                  break;
              case 11 : 
                  exit = 2;
                  break;
              case 12 : 
                  exit = 3;
                  break;
              case 13 : 
                  exit = 4;
                  break;
              case 14 : 
                  exit = 5;
                  break;
              default:
                throw [
                      Caml_builtin_exceptions.assert_failure,
                      [
                        "camlinternalFormat.ml",
                        802,
                        26
                      ]
                    ];
            }
          }
          break;
      case 9 : 
          if (typeof ty2 === "number") {
            throw [
                  Caml_builtin_exceptions.assert_failure,
                  [
                    "camlinternalFormat.ml",
                    812,
                    28
                  ]
                ];
          } else {
            switch (ty2.tag | 0) {
              case 8 : 
                  exit = 6;
                  break;
              case 9 : 
                  var ty = trans(symm(ty1[1]), ty2[0]);
                  var match = fmtty_rel_det(ty);
                  Curry._1(match[1], /* Refl */0);
                  Curry._1(match[3], /* Refl */0);
                  return /* Format_subst_ty */Block.__(9, [
                            ty1[0],
                            ty2[1],
                            trans(ty1[2], ty2[2])
                          ]);
              case 10 : 
                  exit = 1;
                  break;
              case 11 : 
                  exit = 2;
                  break;
              case 12 : 
                  exit = 3;
                  break;
              case 13 : 
                  exit = 4;
                  break;
              case 14 : 
                  exit = 5;
                  break;
              default:
                throw [
                      Caml_builtin_exceptions.assert_failure,
                      [
                        "camlinternalFormat.ml",
                        812,
                        28
                      ]
                    ];
            }
          }
          break;
      case 10 : 
          if (typeof ty2 === "number") {
            throw [
                  Caml_builtin_exceptions.assert_failure,
                  [
                    "camlinternalFormat.ml",
                    780,
                    21
                  ]
                ];
          } else if (ty2.tag === 10) {
            return /* Alpha_ty */Block.__(10, [trans(ty1[0], ty2[0])]);
          } else {
            throw [
                  Caml_builtin_exceptions.assert_failure,
                  [
                    "camlinternalFormat.ml",
                    780,
                    21
                  ]
                ];
          }
          break;
      case 11 : 
          if (typeof ty2 === "number") {
            throw [
                  Caml_builtin_exceptions.assert_failure,
                  [
                    "camlinternalFormat.ml",
                    784,
                    21
                  ]
                ];
          } else {
            switch (ty2.tag | 0) {
              case 10 : 
                  exit = 1;
                  break;
              case 11 : 
                  return /* Theta_ty */Block.__(11, [trans(ty1[0], ty2[0])]);
              default:
                throw [
                      Caml_builtin_exceptions.assert_failure,
                      [
                        "camlinternalFormat.ml",
                        784,
                        21
                      ]
                    ];
            }
          }
          break;
      case 12 : 
          if (typeof ty2 === "number") {
            throw [
                  Caml_builtin_exceptions.assert_failure,
                  [
                    "camlinternalFormat.ml",
                    788,
                    19
                  ]
                ];
          } else {
            switch (ty2.tag | 0) {
              case 10 : 
                  exit = 1;
                  break;
              case 11 : 
                  exit = 2;
                  break;
              case 12 : 
                  return /* Any_ty */Block.__(12, [trans(ty1[0], ty2[0])]);
              default:
                throw [
                      Caml_builtin_exceptions.assert_failure,
                      [
                        "camlinternalFormat.ml",
                        788,
                        19
                      ]
                    ];
            }
          }
          break;
      case 13 : 
          if (typeof ty2 === "number") {
            throw [
                  Caml_builtin_exceptions.assert_failure,
                  [
                    "camlinternalFormat.ml",
                    792,
                    22
                  ]
                ];
          } else {
            switch (ty2.tag | 0) {
              case 10 : 
                  exit = 1;
                  break;
              case 11 : 
                  exit = 2;
                  break;
              case 12 : 
                  exit = 3;
                  break;
              case 13 : 
                  return /* Reader_ty */Block.__(13, [trans(ty1[0], ty2[0])]);
              default:
                throw [
                      Caml_builtin_exceptions.assert_failure,
                      [
                        "camlinternalFormat.ml",
                        792,
                        22
                      ]
                    ];
            }
          }
          break;
      case 14 : 
          if (typeof ty2 === "number") {
            throw [
                  Caml_builtin_exceptions.assert_failure,
                  [
                    "camlinternalFormat.ml",
                    797,
                    30
                  ]
                ];
          } else {
            switch (ty2.tag | 0) {
              case 10 : 
                  exit = 1;
                  break;
              case 11 : 
                  exit = 2;
                  break;
              case 12 : 
                  exit = 3;
                  break;
              case 13 : 
                  exit = 4;
                  break;
              case 14 : 
                  return /* Ignored_reader_ty */Block.__(14, [trans(ty1[0], ty2[0])]);
              default:
                throw [
                      Caml_builtin_exceptions.assert_failure,
                      [
                        "camlinternalFormat.ml",
                        797,
                        30
                      ]
                    ];
            }
          }
          break;
      
    }
  }
  switch (exit) {
    case 1 : 
        throw [
              Caml_builtin_exceptions.assert_failure,
              [
                "camlinternalFormat.ml",
                781,
                21
              ]
            ];
    case 2 : 
        throw [
              Caml_builtin_exceptions.assert_failure,
              [
                "camlinternalFormat.ml",
                785,
                21
              ]
            ];
    case 3 : 
        throw [
              Caml_builtin_exceptions.assert_failure,
              [
                "camlinternalFormat.ml",
                789,
                19
              ]
            ];
    case 4 : 
        throw [
              Caml_builtin_exceptions.assert_failure,
              [
                "camlinternalFormat.ml",
                793,
                22
              ]
            ];
    case 5 : 
        throw [
              Caml_builtin_exceptions.assert_failure,
              [
                "camlinternalFormat.ml",
                798,
                30
              ]
            ];
    case 6 : 
        throw [
              Caml_builtin_exceptions.assert_failure,
              [
                "camlinternalFormat.ml",
                803,
                26
              ]
            ];
    case 7 : 
        throw [
              Caml_builtin_exceptions.assert_failure,
              [
                "camlinternalFormat.ml",
                813,
                28
              ]
            ];
    case 8 : 
        throw [
              Caml_builtin_exceptions.assert_failure,
              [
                "camlinternalFormat.ml",
                817,
                23
              ]
            ];
    
  }
}

function fmtty_of_formatting_gen(formatting_gen) {
  return fmtty_of_fmt(formatting_gen[0][0]);
}

function fmtty_of_fmt(_fmtty) {
  while(true) {
    var fmtty = _fmtty;
    var exit = 0;
    if (typeof fmtty === "number") {
      if (fmtty) {
        return /* Char_ty */Block.__(0, [fmtty_of_fmt(fmtty[0])]);
      } else {
        return /* End_of_fmtty */0;
      }
    } else {
      switch (fmtty.tag | 0) {
        case 2 : 
        case 3 : 
            exit = 1;
            break;
        case 4 : 
            var ty_rest = fmtty_of_fmt(fmtty[3]);
            var prec_ty = fmtty_of_precision_fmtty(fmtty[2], /* Int_ty */Block.__(2, [ty_rest]));
            return fmtty_of_padding_fmtty(fmtty[1], prec_ty);
        case 5 : 
            var ty_rest$1 = fmtty_of_fmt(fmtty[3]);
            var prec_ty$1 = fmtty_of_precision_fmtty(fmtty[2], /* Int32_ty */Block.__(3, [ty_rest$1]));
            return fmtty_of_padding_fmtty(fmtty[1], prec_ty$1);
        case 6 : 
            var ty_rest$2 = fmtty_of_fmt(fmtty[3]);
            var prec_ty$2 = fmtty_of_precision_fmtty(fmtty[2], /* Nativeint_ty */Block.__(4, [ty_rest$2]));
            return fmtty_of_padding_fmtty(fmtty[1], prec_ty$2);
        case 7 : 
            var ty_rest$3 = fmtty_of_fmt(fmtty[3]);
            var prec_ty$3 = fmtty_of_precision_fmtty(fmtty[2], /* Int64_ty */Block.__(5, [ty_rest$3]));
            return fmtty_of_padding_fmtty(fmtty[1], prec_ty$3);
        case 8 : 
            var ty_rest$4 = fmtty_of_fmt(fmtty[3]);
            var prec_ty$4 = fmtty_of_precision_fmtty(fmtty[2], /* Float_ty */Block.__(6, [ty_rest$4]));
            return fmtty_of_padding_fmtty(fmtty[1], prec_ty$4);
        case 9 : 
            return /* Bool_ty */Block.__(7, [fmtty_of_fmt(fmtty[0])]);
        case 10 : 
            _fmtty = fmtty[0];
            continue ;
            case 13 : 
            return /* Format_arg_ty */Block.__(8, [
                      fmtty[1],
                      fmtty_of_fmt(fmtty[2])
                    ]);
        case 14 : 
            var ty = fmtty[1];
            return /* Format_subst_ty */Block.__(9, [
                      ty,
                      ty,
                      fmtty_of_fmt(fmtty[2])
                    ]);
        case 15 : 
            return /* Alpha_ty */Block.__(10, [fmtty_of_fmt(fmtty[0])]);
        case 16 : 
            return /* Theta_ty */Block.__(11, [fmtty_of_fmt(fmtty[0])]);
        case 11 : 
        case 12 : 
        case 17 : 
            _fmtty = fmtty[1];
            continue ;
            case 18 : 
            return CamlinternalFormatBasics.concat_fmtty(fmtty_of_formatting_gen(fmtty[0]), fmtty_of_fmt(fmtty[1]));
        case 19 : 
            return /* Reader_ty */Block.__(13, [fmtty_of_fmt(fmtty[0])]);
        case 20 : 
            return /* String_ty */Block.__(1, [fmtty_of_fmt(fmtty[2])]);
        case 21 : 
            return /* Int_ty */Block.__(2, [fmtty_of_fmt(fmtty[1])]);
        case 23 : 
            var ign = fmtty[0];
            var fmt = fmtty[1];
            if (typeof ign === "number") {
              if (ign === 3) {
                return /* Ignored_reader_ty */Block.__(14, [fmtty_of_fmt(fmt)]);
              } else {
                return fmtty_of_fmt(fmt);
              }
            } else if (ign.tag === 8) {
              return CamlinternalFormatBasics.concat_fmtty(ign[1], fmtty_of_fmt(fmt));
            } else {
              return fmtty_of_fmt(fmt);
            }
        case 24 : 
            return fmtty_of_custom(fmtty[0], fmtty_of_fmt(fmtty[2]));
        default:
          return /* Char_ty */Block.__(0, [fmtty_of_fmt(fmtty[0])]);
      }
    }
    if (exit === 1) {
      return fmtty_of_padding_fmtty(fmtty[0], /* String_ty */Block.__(1, [fmtty_of_fmt(fmtty[1])]));
    }
    
  };
}

function fmtty_of_custom(arity, fmtty) {
  if (arity) {
    return /* Any_ty */Block.__(12, [fmtty_of_custom(arity[0], fmtty)]);
  } else {
    return fmtty;
  }
}

function fmtty_of_padding_fmtty(pad, fmtty) {
  if (typeof pad === "number" || !pad.tag) {
    return fmtty;
  } else {
    return /* Int_ty */Block.__(2, [fmtty]);
  }
}

function fmtty_of_precision_fmtty(prec, fmtty) {
  if (typeof prec === "number" && prec !== 0) {
    return /* Int_ty */Block.__(2, [fmtty]);
  } else {
    return fmtty;
  }
}

var Type_mismatch = Caml_exceptions.create("CamlinternalFormat.Type_mismatch");

function type_padding(pad, fmtty) {
  if (typeof pad === "number") {
    return /* Padding_fmtty_EBB */[
            /* No_padding */0,
            fmtty
          ];
  } else if (pad.tag) {
    if (typeof fmtty === "number") {
      throw Type_mismatch;
    } else if (fmtty.tag === 2) {
      return /* Padding_fmtty_EBB */[
              /* Arg_padding */Block.__(1, [pad[0]]),
              fmtty[0]
            ];
    } else {
      throw Type_mismatch;
    }
  } else {
    return /* Padding_fmtty_EBB */[
            /* Lit_padding */Block.__(0, [
                pad[0],
                pad[1]
              ]),
            fmtty
          ];
  }
}

function type_padprec(pad, prec, fmtty) {
  var match = type_padding(pad, fmtty);
  if (typeof prec === "number") {
    if (prec !== 0) {
      var match$1 = match[1];
      if (typeof match$1 === "number") {
        throw Type_mismatch;
      } else if (match$1.tag === 2) {
        return /* Padprec_fmtty_EBB */[
                match[0],
                /* Arg_precision */1,
                match$1[0]
              ];
      } else {
        throw Type_mismatch;
      }
    } else {
      return /* Padprec_fmtty_EBB */[
              match[0],
              /* No_precision */0,
              match[1]
            ];
    }
  } else {
    return /* Padprec_fmtty_EBB */[
            match[0],
            /* Lit_precision */[prec[0]],
            match[1]
          ];
  }
}

function type_ignored_param_one(ign, fmt, fmtty) {
  var match = type_format_gen(fmt, fmtty);
  return /* Fmt_fmtty_EBB */[
          /* Ignored_param */Block.__(23, [
              ign,
              match[0]
            ]),
          match[1]
        ];
}

function type_format_gen(fmt, fmtty) {
  if (typeof fmt === "number") {
    return /* Fmt_fmtty_EBB */[
            /* End_of_format */0,
            fmtty
          ];
  } else {
    switch (fmt.tag | 0) {
      case 0 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag) {
            throw Type_mismatch;
          } else {
            var match = type_format_gen(fmt[0], fmtty[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Char */Block.__(0, [match[0]]),
                    match[1]
                  ];
          }
          break;
      case 1 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag) {
            throw Type_mismatch;
          } else {
            var match$1 = type_format_gen(fmt[0], fmtty[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Caml_char */Block.__(1, [match$1[0]]),
                    match$1[1]
                  ];
          }
          break;
      case 2 : 
          var match$2 = type_padding(fmt[0], fmtty);
          var match$3 = match$2[1];
          if (typeof match$3 === "number") {
            throw Type_mismatch;
          } else if (match$3.tag === 1) {
            var match$4 = type_format_gen(fmt[1], match$3[0]);
            return /* Fmt_fmtty_EBB */[
                    /* String */Block.__(2, [
                        match$2[0],
                        match$4[0]
                      ]),
                    match$4[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 3 : 
          var match$5 = type_padding(fmt[0], fmtty);
          var match$6 = match$5[1];
          if (typeof match$6 === "number") {
            throw Type_mismatch;
          } else if (match$6.tag === 1) {
            var match$7 = type_format_gen(fmt[1], match$6[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Caml_string */Block.__(3, [
                        match$5[0],
                        match$7[0]
                      ]),
                    match$7[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 4 : 
          var match$8 = type_padprec(fmt[1], fmt[2], fmtty);
          var match$9 = match$8[2];
          if (typeof match$9 === "number") {
            throw Type_mismatch;
          } else if (match$9.tag === 2) {
            var match$10 = type_format_gen(fmt[3], match$9[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Int */Block.__(4, [
                        fmt[0],
                        match$8[0],
                        match$8[1],
                        match$10[0]
                      ]),
                    match$10[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 5 : 
          var match$11 = type_padprec(fmt[1], fmt[2], fmtty);
          var match$12 = match$11[2];
          if (typeof match$12 === "number") {
            throw Type_mismatch;
          } else if (match$12.tag === 3) {
            var match$13 = type_format_gen(fmt[3], match$12[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Int32 */Block.__(5, [
                        fmt[0],
                        match$11[0],
                        match$11[1],
                        match$13[0]
                      ]),
                    match$13[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 6 : 
          var match$14 = type_padprec(fmt[1], fmt[2], fmtty);
          var match$15 = match$14[2];
          if (typeof match$15 === "number") {
            throw Type_mismatch;
          } else if (match$15.tag === 4) {
            var match$16 = type_format_gen(fmt[3], match$15[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Nativeint */Block.__(6, [
                        fmt[0],
                        match$14[0],
                        match$14[1],
                        match$16[0]
                      ]),
                    match$16[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 7 : 
          var match$17 = type_padprec(fmt[1], fmt[2], fmtty);
          var match$18 = match$17[2];
          if (typeof match$18 === "number") {
            throw Type_mismatch;
          } else if (match$18.tag === 5) {
            var match$19 = type_format_gen(fmt[3], match$18[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Int64 */Block.__(7, [
                        fmt[0],
                        match$17[0],
                        match$17[1],
                        match$19[0]
                      ]),
                    match$19[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 8 : 
          var match$20 = type_padprec(fmt[1], fmt[2], fmtty);
          var match$21 = match$20[2];
          if (typeof match$21 === "number") {
            throw Type_mismatch;
          } else if (match$21.tag === 6) {
            var match$22 = type_format_gen(fmt[3], match$21[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Float */Block.__(8, [
                        fmt[0],
                        match$20[0],
                        match$20[1],
                        match$22[0]
                      ]),
                    match$22[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 9 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 7) {
            var match$23 = type_format_gen(fmt[0], fmtty[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Bool */Block.__(9, [match$23[0]]),
                    match$23[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 10 : 
          var match$24 = type_format_gen(fmt[0], fmtty);
          return /* Fmt_fmtty_EBB */[
                  /* Flush */Block.__(10, [match$24[0]]),
                  match$24[1]
                ];
      case 11 : 
          var match$25 = type_format_gen(fmt[1], fmtty);
          return /* Fmt_fmtty_EBB */[
                  /* String_literal */Block.__(11, [
                      fmt[0],
                      match$25[0]
                    ]),
                  match$25[1]
                ];
      case 12 : 
          var match$26 = type_format_gen(fmt[1], fmtty);
          return /* Fmt_fmtty_EBB */[
                  /* Char_literal */Block.__(12, [
                      fmt[0],
                      match$26[0]
                    ]),
                  match$26[1]
                ];
      case 13 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 8) {
            var sub_fmtty$prime = fmtty[0];
            if (Caml_obj.caml_notequal(/* Fmtty_EBB */[fmt[1]], /* Fmtty_EBB */[sub_fmtty$prime])) {
              throw Type_mismatch;
            }
            var match$27 = type_format_gen(fmt[2], fmtty[1]);
            return /* Fmt_fmtty_EBB */[
                    /* Format_arg */Block.__(13, [
                        fmt[0],
                        sub_fmtty$prime,
                        match$27[0]
                      ]),
                    match$27[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 14 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 9) {
            var sub_fmtty1 = fmtty[0];
            if (Caml_obj.caml_notequal(/* Fmtty_EBB */[CamlinternalFormatBasics.erase_rel(fmt[1])], /* Fmtty_EBB */[CamlinternalFormatBasics.erase_rel(sub_fmtty1)])) {
              throw Type_mismatch;
            }
            var match$28 = type_format_gen(fmt[2], CamlinternalFormatBasics.erase_rel(fmtty[2]));
            return /* Fmt_fmtty_EBB */[
                    /* Format_subst */Block.__(14, [
                        fmt[0],
                        sub_fmtty1,
                        match$28[0]
                      ]),
                    match$28[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 15 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 10) {
            var match$29 = type_format_gen(fmt[0], fmtty[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Alpha */Block.__(15, [match$29[0]]),
                    match$29[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 16 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 11) {
            var match$30 = type_format_gen(fmt[0], fmtty[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Theta */Block.__(16, [match$30[0]]),
                    match$30[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 17 : 
          var match$31 = type_format_gen(fmt[1], fmtty);
          return /* Fmt_fmtty_EBB */[
                  /* Formatting_lit */Block.__(17, [
                      fmt[0],
                      match$31[0]
                    ]),
                  match$31[1]
                ];
      case 18 : 
          var formatting_gen = fmt[0];
          var fmt0 = fmt[1];
          var fmtty0 = fmtty;
          if (formatting_gen.tag) {
            var match$32 = formatting_gen[0];
            var match$33 = type_format_gen(match$32[0], fmtty0);
            var match$34 = type_format_gen(fmt0, match$33[1]);
            return /* Fmt_fmtty_EBB */[
                    /* Formatting_gen */Block.__(18, [
                        /* Open_box */Block.__(1, [/* Format */[
                              match$33[0],
                              match$32[1]
                            ]]),
                        match$34[0]
                      ]),
                    match$34[1]
                  ];
          } else {
            var match$35 = formatting_gen[0];
            var match$36 = type_format_gen(match$35[0], fmtty0);
            var match$37 = type_format_gen(fmt0, match$36[1]);
            return /* Fmt_fmtty_EBB */[
                    /* Formatting_gen */Block.__(18, [
                        /* Open_tag */Block.__(0, [/* Format */[
                              match$36[0],
                              match$35[1]
                            ]]),
                        match$37[0]
                      ]),
                    match$37[1]
                  ];
          }
      case 19 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 13) {
            var match$38 = type_format_gen(fmt[0], fmtty[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Reader */Block.__(19, [match$38[0]]),
                    match$38[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 20 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 1) {
            var match$39 = type_format_gen(fmt[2], fmtty[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Scan_char_set */Block.__(20, [
                        fmt[0],
                        fmt[1],
                        match$39[0]
                      ]),
                    match$39[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 21 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 2) {
            var match$40 = type_format_gen(fmt[1], fmtty[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Scan_get_counter */Block.__(21, [
                        fmt[0],
                        match$40[0]
                      ]),
                    match$40[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 23 : 
          var ign = fmt[0];
          var fmt$1 = fmt[1];
          var fmtty$1 = fmtty;
          if (typeof ign === "number") {
            if (ign === 3) {
              if (typeof fmtty$1 === "number") {
                throw Type_mismatch;
              } else if (fmtty$1.tag === 14) {
                var match$41 = type_format_gen(fmt$1, fmtty$1[0]);
                return /* Fmt_fmtty_EBB */[
                        /* Ignored_param */Block.__(23, [
                            /* Ignored_reader */3,
                            match$41[0]
                          ]),
                        match$41[1]
                      ];
              } else {
                throw Type_mismatch;
              }
            } else {
              return type_ignored_param_one(ign, fmt$1, fmtty$1);
            }
          } else {
            switch (ign.tag | 0) {
              case 7 : 
                  return type_ignored_param_one(/* Ignored_format_arg */Block.__(7, [
                                ign[0],
                                ign[1]
                              ]), fmt$1, fmtty$1);
              case 8 : 
                  var match$42 = type_ignored_format_substitution(ign[1], fmt$1, fmtty$1);
                  var match$43 = match$42[1];
                  return /* Fmt_fmtty_EBB */[
                          /* Ignored_param */Block.__(23, [
                              /* Ignored_format_subst */Block.__(8, [
                                  ign[0],
                                  match$42[0]
                                ]),
                              match$43[0]
                            ]),
                          match$43[1]
                        ];
              default:
                return type_ignored_param_one(ign, fmt$1, fmtty$1);
            }
          }
      case 22 : 
      case 24 : 
          throw Type_mismatch;
      
    }
  }
}

function type_ignored_format_substitution(sub_fmtty, fmt, fmtty) {
  if (typeof sub_fmtty === "number") {
    return /* Fmtty_fmt_EBB */[
            /* End_of_fmtty */0,
            type_format_gen(fmt, fmtty)
          ];
  } else {
    switch (sub_fmtty.tag | 0) {
      case 0 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag) {
            throw Type_mismatch;
          } else {
            var match = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Char_ty */Block.__(0, [match[0]]),
                    match[1]
                  ];
          }
          break;
      case 1 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 1) {
            var match$1 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* String_ty */Block.__(1, [match$1[0]]),
                    match$1[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 2 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 2) {
            var match$2 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Int_ty */Block.__(2, [match$2[0]]),
                    match$2[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 3 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 3) {
            var match$3 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Int32_ty */Block.__(3, [match$3[0]]),
                    match$3[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 4 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 4) {
            var match$4 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Nativeint_ty */Block.__(4, [match$4[0]]),
                    match$4[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 5 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 5) {
            var match$5 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Int64_ty */Block.__(5, [match$5[0]]),
                    match$5[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 6 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 6) {
            var match$6 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Float_ty */Block.__(6, [match$6[0]]),
                    match$6[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 7 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 7) {
            var match$7 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Bool_ty */Block.__(7, [match$7[0]]),
                    match$7[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 8 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 8) {
            var sub2_fmtty$prime = fmtty[0];
            if (Caml_obj.caml_notequal(/* Fmtty_EBB */[sub_fmtty[0]], /* Fmtty_EBB */[sub2_fmtty$prime])) {
              throw Type_mismatch;
            }
            var match$8 = type_ignored_format_substitution(sub_fmtty[1], fmt, fmtty[1]);
            return /* Fmtty_fmt_EBB */[
                    /* Format_arg_ty */Block.__(8, [
                        sub2_fmtty$prime,
                        match$8[0]
                      ]),
                    match$8[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 9 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 9) {
            var sub2_fmtty$prime$1 = fmtty[1];
            var sub1_fmtty$prime = fmtty[0];
            if (Caml_obj.caml_notequal(/* Fmtty_EBB */[CamlinternalFormatBasics.erase_rel(sub_fmtty[0])], /* Fmtty_EBB */[CamlinternalFormatBasics.erase_rel(sub1_fmtty$prime)])) {
              throw Type_mismatch;
            }
            if (Caml_obj.caml_notequal(/* Fmtty_EBB */[CamlinternalFormatBasics.erase_rel(sub_fmtty[1])], /* Fmtty_EBB */[CamlinternalFormatBasics.erase_rel(sub2_fmtty$prime$1)])) {
              throw Type_mismatch;
            }
            var sub_fmtty$prime = trans(symm(sub1_fmtty$prime), sub2_fmtty$prime$1);
            var match$9 = fmtty_rel_det(sub_fmtty$prime);
            Curry._1(match$9[1], /* Refl */0);
            Curry._1(match$9[3], /* Refl */0);
            var match$10 = type_ignored_format_substitution(CamlinternalFormatBasics.erase_rel(sub_fmtty[2]), fmt, fmtty[2]);
            return /* Fmtty_fmt_EBB */[
                    /* Format_subst_ty */Block.__(9, [
                        sub1_fmtty$prime,
                        sub2_fmtty$prime$1,
                        symm(match$10[0])
                      ]),
                    match$10[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 10 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 10) {
            var match$11 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Alpha_ty */Block.__(10, [match$11[0]]),
                    match$11[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 11 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 11) {
            var match$12 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Theta_ty */Block.__(11, [match$12[0]]),
                    match$12[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 12 : 
          throw Type_mismatch;
      case 13 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 13) {
            var match$13 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Reader_ty */Block.__(13, [match$13[0]]),
                    match$13[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 14 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 14) {
            var match$14 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Ignored_reader_ty */Block.__(14, [match$14[0]]),
                    match$14[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      
    }
  }
}

function type_format(fmt, fmtty) {
  var match = type_format_gen(fmt, fmtty);
  if (typeof match[1] === "number") {
    return match[0];
  } else {
    throw Type_mismatch;
  }
}

function recast(fmt, fmtty) {
  return type_format(fmt, CamlinternalFormatBasics.erase_rel(symm(fmtty)));
}

function fix_padding(padty, width, str) {
  var len = str.length;
  var match_000 = Pervasives.abs(width);
  var match_001 = width < 0 ? /* Left */0 : padty;
  var width$1 = match_000;
  if (width$1 <= len) {
    return str;
  } else {
    var padty$1 = match_001;
    var res = Bytes.make(width$1, padty$1 === /* Zeros */2 ? /* "0" */48 : /* " " */32);
    switch (padty$1) {
      case 0 : 
          $$String.blit(str, 0, res, 0, len);
          break;
      case 1 : 
          $$String.blit(str, 0, res, width$1 - len | 0, len);
          break;
      case 2 : 
          if (len > 0 && (Caml_string.get(str, 0) === /* "+" */43 || Caml_string.get(str, 0) === /* "-" */45 || Caml_string.get(str, 0) === /* " " */32)) {
            res[0] = Caml_string.get(str, 0);
            $$String.blit(str, 1, res, (width$1 - len | 0) + 1 | 0, len - 1 | 0);
          } else if (len > 1 && Caml_string.get(str, 0) === /* "0" */48 && (Caml_string.get(str, 1) === /* "x" */120 || Caml_string.get(str, 1) === /* "X" */88)) {
            res[1] = Caml_string.get(str, 1);
            $$String.blit(str, 2, res, (width$1 - len | 0) + 2 | 0, len - 2 | 0);
          } else {
            $$String.blit(str, 0, res, width$1 - len | 0, len);
          }
          break;
      
    }
    return Caml_string.bytes_to_string(res);
  }
}

function fix_int_precision(prec, str) {
  var prec$1 = Pervasives.abs(prec);
  var len = str.length;
  var c = Caml_string.get(str, 0);
  var exit = 0;
  if (c >= 58) {
    if (c >= 71) {
      if (c > 102 || c < 97) {
        return str;
      } else {
        exit = 2;
      }
    } else if (c >= 65) {
      exit = 2;
    } else {
      return str;
    }
  } else if (c !== 32) {
    if (c >= 43) {
      switch (c - 43 | 0) {
        case 0 : 
        case 2 : 
            exit = 1;
            break;
        case 1 : 
        case 3 : 
        case 4 : 
            return str;
        case 5 : 
            if ((prec$1 + 2 | 0) > len && len > 1 && (Caml_string.get(str, 1) === /* "x" */120 || Caml_string.get(str, 1) === /* "X" */88)) {
              var res = Bytes.make(prec$1 + 2 | 0, /* "0" */48);
              res[1] = Caml_string.get(str, 1);
              $$String.blit(str, 2, res, (prec$1 - len | 0) + 4 | 0, len - 2 | 0);
              return Caml_string.bytes_to_string(res);
            } else {
              exit = 2;
            }
            break;
        case 6 : 
        case 7 : 
        case 8 : 
        case 9 : 
        case 10 : 
        case 11 : 
        case 12 : 
        case 13 : 
        case 14 : 
            exit = 2;
            break;
        
      }
    } else {
      return str;
    }
  } else {
    exit = 1;
  }
  switch (exit) {
    case 1 : 
        if ((prec$1 + 1 | 0) > len) {
          var res$1 = Bytes.make(prec$1 + 1 | 0, /* "0" */48);
          res$1[0] = c;
          $$String.blit(str, 1, res$1, (prec$1 - len | 0) + 2 | 0, len - 1 | 0);
          return Caml_string.bytes_to_string(res$1);
        } else {
          return str;
        }
        break;
    case 2 : 
        if (prec$1 > len) {
          var res$2 = Bytes.make(prec$1, /* "0" */48);
          $$String.blit(str, 0, res$2, prec$1 - len | 0, len);
          return Caml_string.bytes_to_string(res$2);
        } else {
          return str;
        }
        break;
    
  }
}

function string_to_caml_string(str) {
  return $$String.concat($$String.escaped(str), /* :: */[
              "\"",
              /* :: */[
                "\"",
                /* [] */0
              ]
            ]);
}

function format_of_iconv(iconv) {
  switch (iconv) {
    case 0 : 
        return "%d";
    case 1 : 
        return "%+d";
    case 2 : 
        return "% d";
    case 3 : 
        return "%i";
    case 4 : 
        return "%+i";
    case 5 : 
        return "% i";
    case 6 : 
        return "%x";
    case 7 : 
        return "%#x";
    case 8 : 
        return "%X";
    case 9 : 
        return "%#X";
    case 10 : 
        return "%o";
    case 11 : 
        return "%#o";
    case 12 : 
        return "%u";
    
  }
}

function format_of_aconv(iconv, c) {
  var seps;
  switch (iconv) {
    case 0 : 
        seps = /* :: */[
          "%",
          /* :: */[
            "d",
            /* [] */0
          ]
        ];
        break;
    case 1 : 
        seps = /* :: */[
          "%+",
          /* :: */[
            "d",
            /* [] */0
          ]
        ];
        break;
    case 2 : 
        seps = /* :: */[
          "% ",
          /* :: */[
            "d",
            /* [] */0
          ]
        ];
        break;
    case 3 : 
        seps = /* :: */[
          "%",
          /* :: */[
            "i",
            /* [] */0
          ]
        ];
        break;
    case 4 : 
        seps = /* :: */[
          "%+",
          /* :: */[
            "i",
            /* [] */0
          ]
        ];
        break;
    case 5 : 
        seps = /* :: */[
          "% ",
          /* :: */[
            "i",
            /* [] */0
          ]
        ];
        break;
    case 6 : 
        seps = /* :: */[
          "%",
          /* :: */[
            "x",
            /* [] */0
          ]
        ];
        break;
    case 7 : 
        seps = /* :: */[
          "%#",
          /* :: */[
            "x",
            /* [] */0
          ]
        ];
        break;
    case 8 : 
        seps = /* :: */[
          "%",
          /* :: */[
            "X",
            /* [] */0
          ]
        ];
        break;
    case 9 : 
        seps = /* :: */[
          "%#",
          /* :: */[
            "X",
            /* [] */0
          ]
        ];
        break;
    case 10 : 
        seps = /* :: */[
          "%",
          /* :: */[
            "o",
            /* [] */0
          ]
        ];
        break;
    case 11 : 
        seps = /* :: */[
          "%#",
          /* :: */[
            "o",
            /* [] */0
          ]
        ];
        break;
    case 12 : 
        seps = /* :: */[
          "%",
          /* :: */[
            "u",
            /* [] */0
          ]
        ];
        break;
    
  }
  return $$String.concat(Caml_string.bytes_to_string(Bytes.make(1, c)), seps);
}

function format_of_fconv(fconv, prec) {
  if (fconv === /* Float_F */15) {
    return "%.12g";
  } else {
    var prec$1 = Pervasives.abs(prec);
    var symb = char_of_fconv(fconv);
    var buf = /* record */[
      /* ind */0,
      /* bytes */new Array(16)
    ];
    buffer_add_char(buf, /* "%" */37);
    bprint_fconv_flag(buf, fconv);
    buffer_add_char(buf, /* "." */46);
    buffer_add_string(buf, "" + prec$1);
    buffer_add_char(buf, symb);
    return buffer_contents(buf);
  }
}

function convert_int(iconv, n) {
  return Caml_format.caml_format_int(format_of_iconv(iconv), n);
}

function convert_int32(iconv, n) {
  return Caml_format.caml_int32_format(format_of_aconv(iconv, /* "l" */108), n);
}

function convert_nativeint(iconv, n) {
  return Caml_format.caml_nativeint_format(format_of_aconv(iconv, /* "n" */110), n);
}

function convert_int64(iconv, n) {
  return Caml_format.caml_int64_format(format_of_aconv(iconv, /* "L" */76), n);
}

function convert_float(fconv, prec, x) {
  var prec$1 = Pervasives.abs(prec);
  var str = Caml_format.caml_format_float(format_of_fconv(fconv, prec$1), x);
  if (fconv !== /* Float_F */15) {
    return str;
  } else {
    var len = str.length;
    var is_valid = function (_i) {
      while(true) {
        var i = _i;
        if (i === len) {
          return /* false */0;
        } else {
          var match = Caml_string.get(str, i);
          var switcher = match - 46 | 0;
          if (switcher > 23 || switcher < 0) {
            if (switcher !== 55) {
              _i = i + 1 | 0;
              continue ;
              
            } else {
              return /* true */1;
            }
          } else if (switcher > 22 || switcher < 1) {
            return /* true */1;
          } else {
            _i = i + 1 | 0;
            continue ;
            
          }
        }
      };
    };
    var match = Caml_float.caml_classify_float(x);
    if (match !== 3) {
      if (match >= 4) {
        return "nan";
      } else if (is_valid(0)) {
        return str;
      } else {
        return str + ".";
      }
    } else if (x < 0.0) {
      return "neg_infinity";
    } else {
      return "infinity";
    }
  }
}

function format_caml_char(c) {
  return $$String.concat(Char.escaped(c), /* :: */[
              "'",
              /* :: */[
                "'",
                /* [] */0
              ]
            ]);
}

function string_of_fmtty(fmtty) {
  var buf = /* record */[
    /* ind */0,
    /* bytes */new Array(16)
  ];
  bprint_fmtty(buf, fmtty);
  return buffer_contents(buf);
}

function make_printf(_k, o, _acc, _fmt) {
  while(true) {
    var fmt = _fmt;
    var acc = _acc;
    var k = _k;
    if (typeof fmt === "number") {
      return Curry._2(k, o, acc);
    } else {
      switch (fmt.tag | 0) {
        case 0 : 
            var rest = fmt[0];
            return (function(k,acc,rest){
            return function (c) {
              var new_acc = /* Acc_data_char */Block.__(5, [
                  acc,
                  c
                ]);
              return make_printf(k, o, new_acc, rest);
            }
            }(k,acc,rest));
        case 1 : 
            var rest$1 = fmt[0];
            return (function(k,acc,rest$1){
            return function (c) {
              var new_acc_001 = format_caml_char(c);
              var new_acc = /* Acc_data_string */Block.__(4, [
                  acc,
                  new_acc_001
                ]);
              return make_printf(k, o, new_acc, rest$1);
            }
            }(k,acc,rest$1));
        case 2 : 
            return make_string_padding(k, o, acc, fmt[1], fmt[0], (function (str) {
                          return str;
                        }));
        case 3 : 
            return make_string_padding(k, o, acc, fmt[1], fmt[0], string_to_caml_string);
        case 4 : 
            return make_int_padding_precision(k, o, acc, fmt[3], fmt[1], fmt[2], convert_int, fmt[0]);
        case 5 : 
            return make_int_padding_precision(k, o, acc, fmt[3], fmt[1], fmt[2], convert_int32, fmt[0]);
        case 6 : 
            return make_int_padding_precision(k, o, acc, fmt[3], fmt[1], fmt[2], convert_nativeint, fmt[0]);
        case 7 : 
            return make_int_padding_precision(k, o, acc, fmt[3], fmt[1], fmt[2], convert_int64, fmt[0]);
        case 8 : 
            var k$1 = k;
            var o$1 = o;
            var acc$1 = acc;
            var fmt$1 = fmt[3];
            var pad = fmt[1];
            var prec = fmt[2];
            var fconv = fmt[0];
            if (typeof pad === "number") {
              if (typeof prec === "number") {
                if (prec !== 0) {
                  return (function(k$1,o$1,acc$1,fmt$1,fconv){
                  return function (p, x) {
                    var str = convert_float(fconv, p, x);
                    return make_printf(k$1, o$1, /* Acc_data_string */Block.__(4, [
                                  acc$1,
                                  str
                                ]), fmt$1);
                  }
                  }(k$1,o$1,acc$1,fmt$1,fconv));
                } else {
                  return (function(k$1,o$1,acc$1,fmt$1,fconv){
                  return function (x) {
                    var str = convert_float(fconv, 6, x);
                    return make_printf(k$1, o$1, /* Acc_data_string */Block.__(4, [
                                  acc$1,
                                  str
                                ]), fmt$1);
                  }
                  }(k$1,o$1,acc$1,fmt$1,fconv));
                }
              } else {
                var p = prec[0];
                return (function(k$1,o$1,acc$1,fmt$1,fconv,p){
                return function (x) {
                  var str = convert_float(fconv, p, x);
                  return make_printf(k$1, o$1, /* Acc_data_string */Block.__(4, [
                                acc$1,
                                str
                              ]), fmt$1);
                }
                }(k$1,o$1,acc$1,fmt$1,fconv,p));
              }
            } else if (pad.tag) {
              var padty = pad[0];
              if (typeof prec === "number") {
                if (prec !== 0) {
                  return (function(k$1,o$1,acc$1,fmt$1,fconv,padty){
                  return function (w, p, x) {
                    var str = fix_padding(padty, w, convert_float(fconv, p, x));
                    return make_printf(k$1, o$1, /* Acc_data_string */Block.__(4, [
                                  acc$1,
                                  str
                                ]), fmt$1);
                  }
                  }(k$1,o$1,acc$1,fmt$1,fconv,padty));
                } else {
                  return (function(k$1,o$1,acc$1,fmt$1,fconv,padty){
                  return function (w, x) {
                    var str = convert_float(fconv, 6, x);
                    var str$prime = fix_padding(padty, w, str);
                    return make_printf(k$1, o$1, /* Acc_data_string */Block.__(4, [
                                  acc$1,
                                  str$prime
                                ]), fmt$1);
                  }
                  }(k$1,o$1,acc$1,fmt$1,fconv,padty));
                }
              } else {
                var p$1 = prec[0];
                return (function(k$1,o$1,acc$1,fmt$1,fconv,padty,p$1){
                return function (w, x) {
                  var str = fix_padding(padty, w, convert_float(fconv, p$1, x));
                  return make_printf(k$1, o$1, /* Acc_data_string */Block.__(4, [
                                acc$1,
                                str
                              ]), fmt$1);
                }
                }(k$1,o$1,acc$1,fmt$1,fconv,padty,p$1));
              }
            } else {
              var w = pad[1];
              var padty$1 = pad[0];
              if (typeof prec === "number") {
                if (prec !== 0) {
                  return (function(k$1,o$1,acc$1,fmt$1,fconv,padty$1,w){
                  return function (p, x) {
                    var str = fix_padding(padty$1, w, convert_float(fconv, p, x));
                    return make_printf(k$1, o$1, /* Acc_data_string */Block.__(4, [
                                  acc$1,
                                  str
                                ]), fmt$1);
                  }
                  }(k$1,o$1,acc$1,fmt$1,fconv,padty$1,w));
                } else {
                  return (function(k$1,o$1,acc$1,fmt$1,fconv,padty$1,w){
                  return function (x) {
                    var str = convert_float(fconv, 6, x);
                    var str$prime = fix_padding(padty$1, w, str);
                    return make_printf(k$1, o$1, /* Acc_data_string */Block.__(4, [
                                  acc$1,
                                  str$prime
                                ]), fmt$1);
                  }
                  }(k$1,o$1,acc$1,fmt$1,fconv,padty$1,w));
                }
              } else {
                var p$2 = prec[0];
                return (function(k$1,o$1,acc$1,fmt$1,fconv,padty$1,w,p$2){
                return function (x) {
                  var str = fix_padding(padty$1, w, convert_float(fconv, p$2, x));
                  return make_printf(k$1, o$1, /* Acc_data_string */Block.__(4, [
                                acc$1,
                                str
                              ]), fmt$1);
                }
                }(k$1,o$1,acc$1,fmt$1,fconv,padty$1,w,p$2));
              }
            }
        case 9 : 
            var rest$2 = fmt[0];
            return (function(k,acc,rest$2){
            return function (b) {
              return make_printf(k, o, /* Acc_data_string */Block.__(4, [
                            acc,
                            b ? "true" : "false"
                          ]), rest$2);
            }
            }(k,acc,rest$2));
        case 10 : 
            _fmt = fmt[0];
            _acc = /* Acc_flush */Block.__(7, [acc]);
            continue ;
            case 11 : 
            _fmt = fmt[1];
            _acc = /* Acc_string_literal */Block.__(2, [
                acc,
                fmt[0]
              ]);
            continue ;
            case 12 : 
            _fmt = fmt[1];
            _acc = /* Acc_char_literal */Block.__(3, [
                acc,
                fmt[0]
              ]);
            continue ;
            case 13 : 
            var rest$3 = fmt[2];
            var ty = string_of_fmtty(fmt[1]);
            return (function(k,acc,rest$3,ty){
            return function () {
              return make_printf(k, o, /* Acc_data_string */Block.__(4, [
                            acc,
                            ty
                          ]), rest$3);
            }
            }(k,acc,rest$3,ty));
        case 14 : 
            var rest$4 = fmt[2];
            var fmtty = fmt[1];
            return (function(k,acc,fmtty,rest$4){
            return function (param) {
              return make_printf(k, o, acc, CamlinternalFormatBasics.concat_fmt(recast(param[0], fmtty), rest$4));
            }
            }(k,acc,fmtty,rest$4));
        case 15 : 
            var rest$5 = fmt[0];
            return (function(k,acc,rest$5){
            return function (f, x) {
              return make_printf(k, o, /* Acc_delay */Block.__(6, [
                            acc,
                            (function (o) {
                                return Curry._2(f, o, x);
                              })
                          ]), rest$5);
            }
            }(k,acc,rest$5));
        case 16 : 
            var rest$6 = fmt[0];
            return (function(k,acc,rest$6){
            return function (f) {
              return make_printf(k, o, /* Acc_delay */Block.__(6, [
                            acc,
                            f
                          ]), rest$6);
            }
            }(k,acc,rest$6));
        case 17 : 
            _fmt = fmt[1];
            _acc = /* Acc_formatting_lit */Block.__(0, [
                acc,
                fmt[0]
              ]);
            continue ;
            case 18 : 
            var match = fmt[0];
            if (match.tag) {
              var rest$7 = fmt[1];
              var k$prime = (function(k,acc,rest$7){
              return function k$prime(koc, kacc) {
                return make_printf(k, koc, /* Acc_formatting_gen */Block.__(1, [
                              acc,
                              /* Acc_open_box */Block.__(1, [kacc])
                            ]), rest$7);
              }
              }(k,acc,rest$7));
              _fmt = match[0][0];
              _acc = /* End_of_acc */0;
              _k = k$prime;
              continue ;
              
            } else {
              var rest$8 = fmt[1];
              var k$prime$1 = (function(k,acc,rest$8){
              return function k$prime$1(koc, kacc) {
                return make_printf(k, koc, /* Acc_formatting_gen */Block.__(1, [
                              acc,
                              /* Acc_open_tag */Block.__(0, [kacc])
                            ]), rest$8);
              }
              }(k,acc,rest$8));
              _fmt = match[0][0];
              _acc = /* End_of_acc */0;
              _k = k$prime$1;
              continue ;
              
            }
            break;
        case 19 : 
            throw [
                  Caml_builtin_exceptions.assert_failure,
                  [
                    "camlinternalFormat.ml",
                    1449,
                    4
                  ]
                ];
        case 20 : 
            var rest$9 = fmt[2];
            var new_acc = /* Acc_invalid_arg */Block.__(8, [
                acc,
                "Printf: bad conversion %["
              ]);
            return (function(k,rest$9,new_acc){
            return function () {
              return make_printf(k, o, new_acc, rest$9);
            }
            }(k,rest$9,new_acc));
        case 21 : 
            var rest$10 = fmt[1];
            return (function(k,acc,rest$10){
            return function (n) {
              var new_acc_001 = Caml_format.caml_format_int("%u", n);
              var new_acc = /* Acc_data_string */Block.__(4, [
                  acc,
                  new_acc_001
                ]);
              return make_printf(k, o, new_acc, rest$10);
            }
            }(k,acc,rest$10));
        case 22 : 
            var rest$11 = fmt[0];
            return (function(k,acc,rest$11){
            return function (c) {
              var new_acc = /* Acc_data_char */Block.__(5, [
                  acc,
                  c
                ]);
              return make_printf(k, o, new_acc, rest$11);
            }
            }(k,acc,rest$11));
        case 23 : 
            var k$2 = k;
            var o$2 = o;
            var acc$2 = acc;
            var ign = fmt[0];
            var fmt$2 = fmt[1];
            if (typeof ign === "number") {
              if (ign === 3) {
                throw [
                      Caml_builtin_exceptions.assert_failure,
                      [
                        "camlinternalFormat.ml",
                        1517,
                        39
                      ]
                    ];
              } else {
                return make_invalid_arg(k$2, o$2, acc$2, fmt$2);
              }
            } else if (ign.tag === 8) {
              return make_from_fmtty(k$2, o$2, acc$2, ign[1], fmt$2);
            } else {
              return make_invalid_arg(k$2, o$2, acc$2, fmt$2);
            }
        case 24 : 
            return make_custom(k, o, acc, fmt[2], fmt[0], Curry._1(fmt[1], /* () */0));
        
      }
    }
  };
}

function make_from_fmtty(k, o, acc, fmtty, fmt) {
  if (typeof fmtty === "number") {
    return make_invalid_arg(k, o, acc, fmt);
  } else {
    switch (fmtty.tag | 0) {
      case 0 : 
          var rest = fmtty[0];
          return (function () {
              return make_from_fmtty(k, o, acc, rest, fmt);
            });
      case 1 : 
          var rest$1 = fmtty[0];
          return (function () {
              return make_from_fmtty(k, o, acc, rest$1, fmt);
            });
      case 2 : 
          var rest$2 = fmtty[0];
          return (function () {
              return make_from_fmtty(k, o, acc, rest$2, fmt);
            });
      case 3 : 
          var rest$3 = fmtty[0];
          return (function () {
              return make_from_fmtty(k, o, acc, rest$3, fmt);
            });
      case 4 : 
          var rest$4 = fmtty[0];
          return (function () {
              return make_from_fmtty(k, o, acc, rest$4, fmt);
            });
      case 5 : 
          var rest$5 = fmtty[0];
          return (function () {
              return make_from_fmtty(k, o, acc, rest$5, fmt);
            });
      case 6 : 
          var rest$6 = fmtty[0];
          return (function () {
              return make_from_fmtty(k, o, acc, rest$6, fmt);
            });
      case 7 : 
          var rest$7 = fmtty[0];
          return (function () {
              return make_from_fmtty(k, o, acc, rest$7, fmt);
            });
      case 8 : 
          var rest$8 = fmtty[1];
          return (function () {
              return make_from_fmtty(k, o, acc, rest$8, fmt);
            });
      case 9 : 
          var rest$9 = fmtty[2];
          var ty = trans(symm(fmtty[0]), fmtty[1]);
          return (function () {
              return make_from_fmtty(k, o, acc, CamlinternalFormatBasics.concat_fmtty(ty, rest$9), fmt);
            });
      case 10 : 
          var rest$10 = fmtty[0];
          return (function (_, _$1) {
              return make_from_fmtty(k, o, acc, rest$10, fmt);
            });
      case 11 : 
          var rest$11 = fmtty[0];
          return (function () {
              return make_from_fmtty(k, o, acc, rest$11, fmt);
            });
      case 12 : 
          var rest$12 = fmtty[0];
          return (function () {
              return make_from_fmtty(k, o, acc, rest$12, fmt);
            });
      case 13 : 
          throw [
                Caml_builtin_exceptions.assert_failure,
                [
                  "camlinternalFormat.ml",
                  1540,
                  31
                ]
              ];
      case 14 : 
          throw [
                Caml_builtin_exceptions.assert_failure,
                [
                  "camlinternalFormat.ml",
                  1541,
                  31
                ]
              ];
      
    }
  }
}

function make_invalid_arg(k, o, acc, fmt) {
  return make_printf(k, o, /* Acc_invalid_arg */Block.__(8, [
                acc,
                "Printf: bad conversion %_"
              ]), fmt);
}

function make_string_padding(k, o, acc, fmt, pad, trans) {
  if (typeof pad === "number") {
    return (function (x) {
        var new_acc_001 = Curry._1(trans, x);
        var new_acc = /* Acc_data_string */Block.__(4, [
            acc,
            new_acc_001
          ]);
        return make_printf(k, o, new_acc, fmt);
      });
  } else if (pad.tag) {
    var padty = pad[0];
    return (function (w, x) {
        var new_acc_001 = fix_padding(padty, w, Curry._1(trans, x));
        var new_acc = /* Acc_data_string */Block.__(4, [
            acc,
            new_acc_001
          ]);
        return make_printf(k, o, new_acc, fmt);
      });
  } else {
    var width = pad[1];
    var padty$1 = pad[0];
    return (function (x) {
        var new_acc_001 = fix_padding(padty$1, width, Curry._1(trans, x));
        var new_acc = /* Acc_data_string */Block.__(4, [
            acc,
            new_acc_001
          ]);
        return make_printf(k, o, new_acc, fmt);
      });
  }
}

function make_int_padding_precision(k, o, acc, fmt, pad, prec, trans, iconv) {
  if (typeof pad === "number") {
    if (typeof prec === "number") {
      if (prec !== 0) {
        return (function (p, x) {
            var str = fix_int_precision(p, Curry._2(trans, iconv, x));
            return make_printf(k, o, /* Acc_data_string */Block.__(4, [
                          acc,
                          str
                        ]), fmt);
          });
      } else {
        return (function (x) {
            var str = Curry._2(trans, iconv, x);
            return make_printf(k, o, /* Acc_data_string */Block.__(4, [
                          acc,
                          str
                        ]), fmt);
          });
      }
    } else {
      var p = prec[0];
      return (function (x) {
          var str = fix_int_precision(p, Curry._2(trans, iconv, x));
          return make_printf(k, o, /* Acc_data_string */Block.__(4, [
                        acc,
                        str
                      ]), fmt);
        });
    }
  } else if (pad.tag) {
    var padty = pad[0];
    if (typeof prec === "number") {
      if (prec !== 0) {
        return (function (w, p, x) {
            var str = fix_padding(padty, w, fix_int_precision(p, Curry._2(trans, iconv, x)));
            return make_printf(k, o, /* Acc_data_string */Block.__(4, [
                          acc,
                          str
                        ]), fmt);
          });
      } else {
        return (function (w, x) {
            var str = fix_padding(padty, w, Curry._2(trans, iconv, x));
            return make_printf(k, o, /* Acc_data_string */Block.__(4, [
                          acc,
                          str
                        ]), fmt);
          });
      }
    } else {
      var p$1 = prec[0];
      return (function (w, x) {
          var str = fix_padding(padty, w, fix_int_precision(p$1, Curry._2(trans, iconv, x)));
          return make_printf(k, o, /* Acc_data_string */Block.__(4, [
                        acc,
                        str
                      ]), fmt);
        });
    }
  } else {
    var w = pad[1];
    var padty$1 = pad[0];
    if (typeof prec === "number") {
      if (prec !== 0) {
        return (function (p, x) {
            var str = fix_padding(padty$1, w, fix_int_precision(p, Curry._2(trans, iconv, x)));
            return make_printf(k, o, /* Acc_data_string */Block.__(4, [
                          acc,
                          str
                        ]), fmt);
          });
      } else {
        return (function (x) {
            var str = fix_padding(padty$1, w, Curry._2(trans, iconv, x));
            return make_printf(k, o, /* Acc_data_string */Block.__(4, [
                          acc,
                          str
                        ]), fmt);
          });
      }
    } else {
      var p$2 = prec[0];
      return (function (x) {
          var str = fix_padding(padty$1, w, fix_int_precision(p$2, Curry._2(trans, iconv, x)));
          return make_printf(k, o, /* Acc_data_string */Block.__(4, [
                        acc,
                        str
                      ]), fmt);
        });
    }
  }
}

function make_custom(k, o, acc, rest, arity, f) {
  if (arity) {
    var arity$1 = arity[0];
    return (function (x) {
        return make_custom(k, o, acc, rest, arity$1, Curry._1(f, x));
      });
  } else {
    return make_printf(k, o, /* Acc_data_string */Block.__(4, [
                  acc,
                  f
                ]), rest);
  }
}

function output_acc(o, _acc) {
  while(true) {
    var acc = _acc;
    var exit = 0;
    if (typeof acc === "number") {
      return /* () */0;
    } else {
      switch (acc.tag | 0) {
        case 0 : 
            var s = string_of_formatting_lit(acc[1]);
            output_acc(o, acc[0]);
            return Pervasives.output_string(o, s);
        case 1 : 
            var match = acc[1];
            var p = acc[0];
            output_acc(o, p);
            if (match.tag) {
              Pervasives.output_string(o, "@[");
              _acc = match[0];
              continue ;
              
            } else {
              Pervasives.output_string(o, "@{");
              _acc = match[0];
              continue ;
              
            }
            break;
        case 2 : 
        case 4 : 
            exit = 1;
            break;
        case 3 : 
        case 5 : 
            exit = 2;
            break;
        case 6 : 
            output_acc(o, acc[0]);
            return Curry._1(acc[1], o);
        case 7 : 
            output_acc(o, acc[0]);
            return Caml_io.caml_ml_flush(o);
        case 8 : 
            output_acc(o, acc[0]);
            throw [
                  Caml_builtin_exceptions.invalid_argument,
                  acc[1]
                ];
        
      }
    }
    switch (exit) {
      case 1 : 
          output_acc(o, acc[0]);
          return Pervasives.output_string(o, acc[1]);
      case 2 : 
          output_acc(o, acc[0]);
          return Caml_io.caml_ml_output_char(o, acc[1]);
      
    }
  };
}

function bufput_acc(b, _acc) {
  while(true) {
    var acc = _acc;
    var exit = 0;
    if (typeof acc === "number") {
      return /* () */0;
    } else {
      switch (acc.tag | 0) {
        case 0 : 
            var s = string_of_formatting_lit(acc[1]);
            bufput_acc(b, acc[0]);
            return Buffer.add_string(b, s);
        case 1 : 
            var match = acc[1];
            var p = acc[0];
            bufput_acc(b, p);
            if (match.tag) {
              Buffer.add_string(b, "@[");
              _acc = match[0];
              continue ;
              
            } else {
              Buffer.add_string(b, "@{");
              _acc = match[0];
              continue ;
              
            }
            break;
        case 2 : 
        case 4 : 
            exit = 1;
            break;
        case 3 : 
        case 5 : 
            exit = 2;
            break;
        case 6 : 
            bufput_acc(b, acc[0]);
            return Curry._1(acc[1], b);
        case 7 : 
            _acc = acc[0];
            continue ;
            case 8 : 
            bufput_acc(b, acc[0]);
            throw [
                  Caml_builtin_exceptions.invalid_argument,
                  acc[1]
                ];
        
      }
    }
    switch (exit) {
      case 1 : 
          bufput_acc(b, acc[0]);
          return Buffer.add_string(b, acc[1]);
      case 2 : 
          bufput_acc(b, acc[0]);
          return Buffer.add_char(b, acc[1]);
      
    }
  };
}

function strput_acc(b, _acc) {
  while(true) {
    var acc = _acc;
    var exit = 0;
    if (typeof acc === "number") {
      return /* () */0;
    } else {
      switch (acc.tag | 0) {
        case 0 : 
            var s = string_of_formatting_lit(acc[1]);
            strput_acc(b, acc[0]);
            return Buffer.add_string(b, s);
        case 1 : 
            var match = acc[1];
            var p = acc[0];
            strput_acc(b, p);
            if (match.tag) {
              Buffer.add_string(b, "@[");
              _acc = match[0];
              continue ;
              
            } else {
              Buffer.add_string(b, "@{");
              _acc = match[0];
              continue ;
              
            }
            break;
        case 2 : 
        case 4 : 
            exit = 1;
            break;
        case 3 : 
        case 5 : 
            exit = 2;
            break;
        case 6 : 
            strput_acc(b, acc[0]);
            return Buffer.add_string(b, Curry._1(acc[1], /* () */0));
        case 7 : 
            _acc = acc[0];
            continue ;
            case 8 : 
            strput_acc(b, acc[0]);
            throw [
                  Caml_builtin_exceptions.invalid_argument,
                  acc[1]
                ];
        
      }
    }
    switch (exit) {
      case 1 : 
          strput_acc(b, acc[0]);
          return Buffer.add_string(b, acc[1]);
      case 2 : 
          strput_acc(b, acc[0]);
          return Buffer.add_char(b, acc[1]);
      
    }
  };
}

function failwith_message(param) {
  var buf = Buffer.create(256);
  var k = function (_, acc) {
    strput_acc(buf, acc);
    var s = Buffer.contents(buf);
    throw [
          Caml_builtin_exceptions.failure,
          s
        ];
  };
  return make_printf(k, /* () */0, /* End_of_acc */0, param[0]);
}

function open_box_of_string(str) {
  if (str === "") {
    return /* tuple */[
            0,
            /* Pp_box */4
          ];
  } else {
    var len = str.length;
    var invalid_box = function () {
      return Curry._1(failwith_message(/* Format */[
                      /* String_literal */Block.__(11, [
                          "invalid box description ",
                          /* Caml_string */Block.__(3, [
                              /* No_padding */0,
                              /* End_of_format */0
                            ])
                        ]),
                      "invalid box description %S"
                    ]), str);
    };
    var parse_spaces = function (_i) {
      while(true) {
        var i = _i;
        if (i === len) {
          return i;
        } else {
          var match = Caml_string.get(str, i);
          if (match !== 9) {
            if (match !== 32) {
              return i;
            } else {
              _i = i + 1 | 0;
              continue ;
              
            }
          } else {
            _i = i + 1 | 0;
            continue ;
            
          }
        }
      };
    };
    var parse_lword = function (_, _j) {
      while(true) {
        var j = _j;
        if (j === len) {
          return j;
        } else {
          var match = Caml_string.get(str, j);
          if (match > 122 || match < 97) {
            return j;
          } else {
            _j = j + 1 | 0;
            continue ;
            
          }
        }
      };
    };
    var parse_int = function (_, _j) {
      while(true) {
        var j = _j;
        if (j === len) {
          return j;
        } else {
          var match = Caml_string.get(str, j);
          if (match >= 48) {
            if (match >= 58) {
              return j;
            } else {
              _j = j + 1 | 0;
              continue ;
              
            }
          } else if (match !== 45) {
            return j;
          } else {
            _j = j + 1 | 0;
            continue ;
            
          }
        }
      };
    };
    var wstart = parse_spaces(0);
    var wend = parse_lword(wstart, wstart);
    var box_name = $$String.sub(str, wstart, wend - wstart | 0);
    var nstart = parse_spaces(wend);
    var nend = parse_int(nstart, nstart);
    var indent;
    if (nstart === nend) {
      indent = 0;
    } else {
      try {
        indent = Caml_format.caml_int_of_string($$String.sub(str, nstart, nend - nstart | 0));
      }
      catch (raw_exn){
        var exn = Js_exn.internalToOCamlException(raw_exn);
        if (exn[0] === Caml_builtin_exceptions.failure) {
          indent = invalid_box(/* () */0);
        } else {
          throw exn;
        }
      }
    }
    var exp_end = parse_spaces(nend);
    if (exp_end !== len) {
      invalid_box(/* () */0);
    }
    var box_type;
    switch (box_name) {
      case "" : 
      case "b" : 
          box_type = /* Pp_box */4;
          break;
      case "h" : 
          box_type = /* Pp_hbox */0;
          break;
      case "hov" : 
          box_type = /* Pp_hovbox */3;
          break;
      case "hv" : 
          box_type = /* Pp_hvbox */2;
          break;
      case "v" : 
          box_type = /* Pp_vbox */1;
          break;
      default:
        box_type = invalid_box(/* () */0);
    }
    return /* tuple */[
            indent,
            box_type
          ];
  }
}

function make_padding_fmt_ebb(pad, fmt) {
  if (typeof pad === "number") {
    return /* Padding_fmt_EBB */[
            /* No_padding */0,
            fmt
          ];
  } else if (pad.tag) {
    return /* Padding_fmt_EBB */[
            /* Arg_padding */Block.__(1, [pad[0]]),
            fmt
          ];
  } else {
    return /* Padding_fmt_EBB */[
            /* Lit_padding */Block.__(0, [
                pad[0],
                pad[1]
              ]),
            fmt
          ];
  }
}

function make_precision_fmt_ebb(prec, fmt) {
  if (typeof prec === "number") {
    if (prec !== 0) {
      return /* Precision_fmt_EBB */[
              /* Arg_precision */1,
              fmt
            ];
    } else {
      return /* Precision_fmt_EBB */[
              /* No_precision */0,
              fmt
            ];
    }
  } else {
    return /* Precision_fmt_EBB */[
            /* Lit_precision */[prec[0]],
            fmt
          ];
  }
}

function make_padprec_fmt_ebb(pad, prec, fmt) {
  var match = make_precision_fmt_ebb(prec, fmt);
  var fmt$prime = match[1];
  var prec$1 = match[0];
  if (typeof pad === "number") {
    return /* Padprec_fmt_EBB */[
            /* No_padding */0,
            prec$1,
            fmt$prime
          ];
  } else if (pad.tag) {
    return /* Padprec_fmt_EBB */[
            /* Arg_padding */Block.__(1, [pad[0]]),
            prec$1,
            fmt$prime
          ];
  } else {
    return /* Padprec_fmt_EBB */[
            /* Lit_padding */Block.__(0, [
                pad[0],
                pad[1]
              ]),
            prec$1,
            fmt$prime
          ];
  }
}

function fmt_ebb_of_string(legacy_behavior, str) {
  var legacy_behavior$1 = legacy_behavior ? legacy_behavior[0] : /* true */1;
  var invalid_format_message = function (str_ind, msg) {
    return Curry._3(failwith_message(/* Format */[
                    /* String_literal */Block.__(11, [
                        "invalid format ",
                        /* Caml_string */Block.__(3, [
                            /* No_padding */0,
                            /* String_literal */Block.__(11, [
                                ": at character number ",
                                /* Int */Block.__(4, [
                                    /* Int_d */0,
                                    /* No_padding */0,
                                    /* No_precision */0,
                                    /* String_literal */Block.__(11, [
                                        ", ",
                                        /* String */Block.__(2, [
                                            /* No_padding */0,
                                            /* End_of_format */0
                                          ])
                                      ])
                                  ])
                              ])
                          ])
                      ]),
                    "invalid format %S: at character number %d, %s"
                  ]), str, str_ind, msg);
  };
  var invalid_format_without = function (str_ind, c, s) {
    return Curry._4(failwith_message(/* Format */[
                    /* String_literal */Block.__(11, [
                        "invalid format ",
                        /* Caml_string */Block.__(3, [
                            /* No_padding */0,
                            /* String_literal */Block.__(11, [
                                ": at character number ",
                                /* Int */Block.__(4, [
                                    /* Int_d */0,
                                    /* No_padding */0,
                                    /* No_precision */0,
                                    /* String_literal */Block.__(11, [
                                        ", '",
                                        /* Char */Block.__(0, [/* String_literal */Block.__(11, [
                                                "' without ",
                                                /* String */Block.__(2, [
                                                    /* No_padding */0,
                                                    /* End_of_format */0
                                                  ])
                                              ])])
                                      ])
                                  ])
                              ])
                          ])
                      ]),
                    "invalid format %S: at character number %d, '%c' without %s"
                  ]), str, str_ind, c, s);
  };
  var expected_character = function (str_ind, expected, read) {
    return Curry._4(failwith_message(/* Format */[
                    /* String_literal */Block.__(11, [
                        "invalid format ",
                        /* Caml_string */Block.__(3, [
                            /* No_padding */0,
                            /* String_literal */Block.__(11, [
                                ": at character number ",
                                /* Int */Block.__(4, [
                                    /* Int_d */0,
                                    /* No_padding */0,
                                    /* No_precision */0,
                                    /* String_literal */Block.__(11, [
                                        ", ",
                                        /* String */Block.__(2, [
                                            /* No_padding */0,
                                            /* String_literal */Block.__(11, [
                                                " expected, read ",
                                                /* Caml_char */Block.__(1, [/* End_of_format */0])
                                              ])
                                          ])
                                      ])
                                  ])
                              ])
                          ])
                      ]),
                    "invalid format %S: at character number %d, %s expected, read %C"
                  ]), str, str_ind, expected, read);
  };
  var compute_int_conv = function (pct_ind, str_ind, _plus, _sharp, _space, symb) {
    while(true) {
      var space = _space;
      var sharp = _sharp;
      var plus = _plus;
      var exit = 0;
      var exit$1 = 0;
      if (plus !== 0) {
        if (sharp !== 0) {
          exit$1 = 2;
        } else if (space !== 0) {
          exit = 1;
        } else if (symb !== 100) {
          if (symb !== 105) {
            exit = 1;
          } else {
            return /* Int_pi */4;
          }
        } else {
          return /* Int_pd */1;
        }
      } else if (sharp !== 0) {
        if (space !== 0) {
          exit$1 = 2;
        } else if (symb !== 88) {
          if (symb !== 111) {
            if (symb !== 120) {
              exit$1 = 2;
            } else {
              return /* Int_Cx */7;
            }
          } else {
            return /* Int_Co */11;
          }
        } else {
          return /* Int_CX */9;
        }
      } else if (space !== 0) {
        if (symb !== 100) {
          if (symb !== 105) {
            exit = 1;
          } else {
            return /* Int_si */5;
          }
        } else {
          return /* Int_sd */2;
        }
      } else {
        var switcher = symb - 88 | 0;
        if (switcher > 32 || switcher < 0) {
          exit = 1;
        } else {
          switch (switcher) {
            case 0 : 
                return /* Int_X */8;
            case 12 : 
                return /* Int_d */0;
            case 17 : 
                return /* Int_i */3;
            case 23 : 
                return /* Int_o */10;
            case 29 : 
                return /* Int_u */12;
            case 1 : 
            case 2 : 
            case 3 : 
            case 4 : 
            case 5 : 
            case 6 : 
            case 7 : 
            case 8 : 
            case 9 : 
            case 10 : 
            case 11 : 
            case 13 : 
            case 14 : 
            case 15 : 
            case 16 : 
            case 18 : 
            case 19 : 
            case 20 : 
            case 21 : 
            case 22 : 
            case 24 : 
            case 25 : 
            case 26 : 
            case 27 : 
            case 28 : 
            case 30 : 
            case 31 : 
                exit = 1;
                break;
            case 32 : 
                return /* Int_x */6;
            
          }
        }
      }
      if (exit$1 === 2) {
        var exit$2 = 0;
        var switcher$1 = symb - 88 | 0;
        if (switcher$1 > 32 || switcher$1 < 0) {
          exit = 1;
        } else {
          switch (switcher$1) {
            case 0 : 
                if (legacy_behavior$1) {
                  return /* Int_CX */9;
                } else {
                  exit = 1;
                }
                break;
            case 23 : 
                if (legacy_behavior$1) {
                  return /* Int_Co */11;
                } else {
                  exit = 1;
                }
                break;
            case 12 : 
            case 17 : 
            case 29 : 
                exit$2 = 3;
                break;
            case 1 : 
            case 2 : 
            case 3 : 
            case 4 : 
            case 5 : 
            case 6 : 
            case 7 : 
            case 8 : 
            case 9 : 
            case 10 : 
            case 11 : 
            case 13 : 
            case 14 : 
            case 15 : 
            case 16 : 
            case 18 : 
            case 19 : 
            case 20 : 
            case 21 : 
            case 22 : 
            case 24 : 
            case 25 : 
            case 26 : 
            case 27 : 
            case 28 : 
            case 30 : 
            case 31 : 
                exit = 1;
                break;
            case 32 : 
                if (legacy_behavior$1) {
                  return /* Int_Cx */7;
                } else {
                  exit = 1;
                }
                break;
            
          }
        }
        if (exit$2 === 3) {
          if (legacy_behavior$1) {
            _sharp = /* false */0;
            continue ;
            
          } else {
            return incompatible_flag(pct_ind, str_ind, symb, "'#'");
          }
        }
        
      }
      if (exit === 1) {
        if (plus !== 0) {
          if (space !== 0) {
            if (legacy_behavior$1) {
              _space = /* false */0;
              continue ;
              
            } else {
              return incompatible_flag(pct_ind, str_ind, /* " " */32, "'+'");
            }
          } else if (legacy_behavior$1) {
            _plus = /* false */0;
            continue ;
            
          } else {
            return incompatible_flag(pct_ind, str_ind, symb, "'+'");
          }
        } else if (space !== 0) {
          if (legacy_behavior$1) {
            _space = /* false */0;
            continue ;
            
          } else {
            return incompatible_flag(pct_ind, str_ind, symb, "' '");
          }
        } else {
          throw [
                Caml_builtin_exceptions.assert_failure,
                [
                  "camlinternalFormat.ml",
                  2716,
                  28
                ]
              ];
        }
      }
      
    };
  };
  var incompatible_flag = function (pct_ind, str_ind, symb, option) {
    var subfmt = $$String.sub(str, pct_ind, str_ind - pct_ind | 0);
    return Curry._5(failwith_message(/* Format */[
                    /* String_literal */Block.__(11, [
                        "invalid format ",
                        /* Caml_string */Block.__(3, [
                            /* No_padding */0,
                            /* String_literal */Block.__(11, [
                                ": at character number ",
                                /* Int */Block.__(4, [
                                    /* Int_d */0,
                                    /* No_padding */0,
                                    /* No_precision */0,
                                    /* String_literal */Block.__(11, [
                                        ", ",
                                        /* String */Block.__(2, [
                                            /* No_padding */0,
                                            /* String_literal */Block.__(11, [
                                                " is incompatible with '",
                                                /* Char */Block.__(0, [/* String_literal */Block.__(11, [
                                                        "' in sub-format ",
                                                        /* Caml_string */Block.__(3, [
                                                            /* No_padding */0,
                                                            /* End_of_format */0
                                                          ])
                                                      ])])
                                              ])
                                          ])
                                      ])
                                  ])
                              ])
                          ])
                      ]),
                    "invalid format %S: at character number %d, %s is incompatible with '%c' in sub-format %S"
                  ]), str, pct_ind, option, symb, subfmt);
  };
  var parse_positive = function (_str_ind, end_ind, _acc) {
    while(true) {
      var acc = _acc;
      var str_ind = _str_ind;
      if (str_ind === end_ind) {
        invalid_format_message(end_ind, "unexpected end of format");
      }
      var c = Caml_string.get(str, str_ind);
      if (c > 57 || c < 48) {
        return /* tuple */[
                str_ind,
                acc
              ];
      } else {
        var new_acc = Caml_int32.imul(acc, 10) + (c - /* "0" */48 | 0) | 0;
        if (new_acc > Sys.max_string_length) {
          return Curry._3(failwith_message(/* Format */[
                          /* String_literal */Block.__(11, [
                              "invalid format ",
                              /* Caml_string */Block.__(3, [
                                  /* No_padding */0,
                                  /* String_literal */Block.__(11, [
                                      ": integer ",
                                      /* Int */Block.__(4, [
                                          /* Int_d */0,
                                          /* No_padding */0,
                                          /* No_precision */0,
                                          /* String_literal */Block.__(11, [
                                              " is greater than the limit ",
                                              /* Int */Block.__(4, [
                                                  /* Int_d */0,
                                                  /* No_padding */0,
                                                  /* No_precision */0,
                                                  /* End_of_format */0
                                                ])
                                            ])
                                        ])
                                    ])
                                ])
                            ]),
                          "invalid format %S: integer %d is greater than the limit %d"
                        ]), str, new_acc, Sys.max_string_length);
        } else {
          _acc = new_acc;
          _str_ind = str_ind + 1 | 0;
          continue ;
          
        }
      }
    };
  };
  var parse_after_precision = function (pct_ind, str_ind, end_ind, minus, plus, sharp, space, ign, pad, prec) {
    if (str_ind === end_ind) {
      invalid_format_message(end_ind, "unexpected end of format");
    }
    var parse_conv = function (padprec) {
      return parse_conversion(pct_ind, str_ind + 1 | 0, end_ind, plus, sharp, space, ign, pad, prec, padprec, Caml_string.get(str, str_ind));
    };
    if (typeof pad === "number") {
      var exit = 0;
      if (typeof prec === "number") {
        if (prec !== 0) {
          exit = 1;
        } else {
          return parse_conv(/* No_padding */0);
        }
      } else {
        exit = 1;
      }
      if (exit === 1) {
        if (minus !== 0) {
          if (typeof prec === "number") {
            return parse_conv(/* Arg_padding */Block.__(1, [/* Left */0]));
          } else {
            return parse_conv(/* Lit_padding */Block.__(0, [
                          /* Left */0,
                          prec[0]
                        ]));
          }
        } else if (typeof prec === "number") {
          return parse_conv(/* Arg_padding */Block.__(1, [/* Right */1]));
        } else {
          return parse_conv(/* Lit_padding */Block.__(0, [
                        /* Right */1,
                        prec[0]
                      ]));
        }
      }
      
    } else {
      return parse_conv(pad);
    }
  };
  var parse_after_padding = function (pct_ind, str_ind, end_ind, minus, plus, sharp, space, ign, pad) {
    if (str_ind === end_ind) {
      invalid_format_message(end_ind, "unexpected end of format");
    }
    var symb = Caml_string.get(str, str_ind);
    if (symb !== 46) {
      return parse_conversion(pct_ind, str_ind + 1 | 0, end_ind, plus, sharp, space, ign, pad, /* No_precision */0, pad, symb);
    } else {
      var pct_ind$1 = pct_ind;
      var str_ind$1 = str_ind + 1 | 0;
      var end_ind$1 = end_ind;
      var minus$1 = minus;
      var plus$1 = plus;
      var sharp$1 = sharp;
      var space$1 = space;
      var ign$1 = ign;
      var pad$1 = pad;
      if (str_ind$1 === end_ind$1) {
        invalid_format_message(end_ind$1, "unexpected end of format");
      }
      var parse_literal = function (minus, str_ind) {
        var match = parse_positive(str_ind, end_ind$1, 0);
        return parse_after_precision(pct_ind$1, match[0], end_ind$1, minus, plus$1, sharp$1, space$1, ign$1, pad$1, /* Lit_precision */[match[1]]);
      };
      var symb$1 = Caml_string.get(str, str_ind$1);
      var exit = 0;
      var exit$1 = 0;
      if (symb$1 >= 48) {
        if (symb$1 >= 58) {
          exit = 1;
        } else {
          return parse_literal(minus$1, str_ind$1);
        }
      } else if (symb$1 >= 42) {
        switch (symb$1 - 42 | 0) {
          case 0 : 
              return parse_after_precision(pct_ind$1, str_ind$1 + 1 | 0, end_ind$1, minus$1, plus$1, sharp$1, space$1, ign$1, pad$1, /* Arg_precision */1);
          case 1 : 
          case 3 : 
              exit$1 = 2;
              break;
          case 2 : 
          case 4 : 
          case 5 : 
              exit = 1;
              break;
          
        }
      } else {
        exit = 1;
      }
      if (exit$1 === 2) {
        if (legacy_behavior$1) {
          return parse_literal(minus$1 || +(symb$1 === /* "-" */45), str_ind$1 + 1 | 0);
        } else {
          exit = 1;
        }
      }
      if (exit === 1) {
        if (legacy_behavior$1) {
          return parse_after_precision(pct_ind$1, str_ind$1, end_ind$1, minus$1, plus$1, sharp$1, space$1, ign$1, pad$1, /* Lit_precision */[0]);
        } else {
          return invalid_format_without(str_ind$1 - 1 | 0, /* "." */46, "precision");
        }
      }
      
    }
  };
  var parse_literal = function (lit_start, _str_ind, end_ind) {
    while(true) {
      var str_ind = _str_ind;
      if (str_ind === end_ind) {
        return add_literal(lit_start, str_ind, /* End_of_format */0);
      } else {
        var match = Caml_string.get(str, str_ind);
        if (match !== 37) {
          if (match !== 64) {
            _str_ind = str_ind + 1 | 0;
            continue ;
            
          } else {
            var match$1 = parse_after_at(str_ind + 1 | 0, end_ind);
            return add_literal(lit_start, str_ind, match$1[0]);
          }
        } else {
          var match$2 = parse_format(str_ind, end_ind);
          return add_literal(lit_start, str_ind, match$2[0]);
        }
      }
    };
  };
  var parse_format = function (pct_ind, end_ind) {
    var pct_ind$1 = pct_ind;
    var str_ind = pct_ind + 1 | 0;
    var end_ind$1 = end_ind;
    if (str_ind === end_ind$1) {
      invalid_format_message(end_ind$1, "unexpected end of format");
    }
    var match = Caml_string.get(str, str_ind);
    if (match !== 95) {
      return parse_flags(pct_ind$1, str_ind, end_ind$1, /* false */0);
    } else {
      return parse_flags(pct_ind$1, str_ind + 1 | 0, end_ind$1, /* true */1);
    }
  };
  var parse_after_at = function (str_ind, end_ind) {
    if (str_ind === end_ind) {
      return /* Fmt_EBB */[/* Char_literal */Block.__(12, [
                  /* "@" */64,
                  /* End_of_format */0
                ])];
    } else {
      var c = Caml_string.get(str, str_ind);
      var exit = 0;
      if (c >= 65) {
        if (c >= 94) {
          var switcher = c - 123 | 0;
          if (switcher > 2 || switcher < 0) {
            exit = 1;
          } else {
            switch (switcher) {
              case 0 : 
                  return parse_tag(/* true */1, str_ind + 1 | 0, end_ind);
              case 1 : 
                  exit = 1;
                  break;
              case 2 : 
                  var beg_ind = str_ind + 1 | 0;
                  var match = parse_literal(beg_ind, beg_ind, end_ind);
                  return /* Fmt_EBB */[/* Formatting_lit */Block.__(17, [
                              /* Close_tag */1,
                              match[0]
                            ])];
              
            }
          }
        } else if (c >= 91) {
          switch (c - 91 | 0) {
            case 0 : 
                return parse_tag(/* false */0, str_ind + 1 | 0, end_ind);
            case 1 : 
                exit = 1;
                break;
            case 2 : 
                var beg_ind$1 = str_ind + 1 | 0;
                var match$1 = parse_literal(beg_ind$1, beg_ind$1, end_ind);
                return /* Fmt_EBB */[/* Formatting_lit */Block.__(17, [
                            /* Close_box */0,
                            match$1[0]
                          ])];
            
          }
        } else {
          exit = 1;
        }
      } else if (c !== 10) {
        if (c >= 32) {
          switch (c - 32 | 0) {
            case 0 : 
                var beg_ind$2 = str_ind + 1 | 0;
                var match$2 = parse_literal(beg_ind$2, beg_ind$2, end_ind);
                return /* Fmt_EBB */[/* Formatting_lit */Block.__(17, [
                            /* Break */Block.__(0, [
                                "@ ",
                                1,
                                0
                              ]),
                            match$2[0]
                          ])];
            case 5 : 
                if ((str_ind + 1 | 0) < end_ind && Caml_string.get(str, str_ind + 1 | 0) === /* "%" */37) {
                  var beg_ind$3 = str_ind + 2 | 0;
                  var match$3 = parse_literal(beg_ind$3, beg_ind$3, end_ind);
                  return /* Fmt_EBB */[/* Formatting_lit */Block.__(17, [
                              /* Escaped_percent */6,
                              match$3[0]
                            ])];
                } else {
                  var match$4 = parse_literal(str_ind, str_ind, end_ind);
                  return /* Fmt_EBB */[/* Char_literal */Block.__(12, [
                              /* "@" */64,
                              match$4[0]
                            ])];
                }
                break;
            case 12 : 
                var beg_ind$4 = str_ind + 1 | 0;
                var match$5 = parse_literal(beg_ind$4, beg_ind$4, end_ind);
                return /* Fmt_EBB */[/* Formatting_lit */Block.__(17, [
                            /* Break */Block.__(0, [
                                "@,",
                                0,
                                0
                              ]),
                            match$5[0]
                          ])];
            case 14 : 
                var beg_ind$5 = str_ind + 1 | 0;
                var match$6 = parse_literal(beg_ind$5, beg_ind$5, end_ind);
                return /* Fmt_EBB */[/* Formatting_lit */Block.__(17, [
                            /* Flush_newline */4,
                            match$6[0]
                          ])];
            case 27 : 
                var str_ind$1 = str_ind + 1 | 0;
                var end_ind$1 = end_ind;
                var match$7;
                try {
                  if (str_ind$1 === end_ind$1 || Caml_string.get(str, str_ind$1) !== /* "<" */60) {
                    throw Caml_builtin_exceptions.not_found;
                  }
                  var str_ind_1 = parse_spaces(str_ind$1 + 1 | 0, end_ind$1);
                  var match$8 = Caml_string.get(str, str_ind_1);
                  var exit$1 = 0;
                  if (match$8 >= 48) {
                    if (match$8 >= 58) {
                      throw Caml_builtin_exceptions.not_found;
                    } else {
                      exit$1 = 1;
                    }
                  } else if (match$8 !== 45) {
                    throw Caml_builtin_exceptions.not_found;
                  } else {
                    exit$1 = 1;
                  }
                  if (exit$1 === 1) {
                    var match$9 = parse_integer(str_ind_1, end_ind$1);
                    var width = match$9[1];
                    var str_ind_3 = parse_spaces(match$9[0], end_ind$1);
                    var match$10 = Caml_string.get(str, str_ind_3);
                    var switcher$1 = match$10 - 45 | 0;
                    if (switcher$1 > 12 || switcher$1 < 0) {
                      if (switcher$1 !== 17) {
                        throw Caml_builtin_exceptions.not_found;
                      } else {
                        var s = $$String.sub(str, str_ind$1 - 2 | 0, (str_ind_3 - str_ind$1 | 0) + 3 | 0);
                        match$7 = /* tuple */[
                          str_ind_3 + 1 | 0,
                          /* Break */Block.__(0, [
                              s,
                              width,
                              0
                            ])
                        ];
                      }
                    } else if (switcher$1 === 2 || switcher$1 === 1) {
                      throw Caml_builtin_exceptions.not_found;
                    } else {
                      var match$11 = parse_integer(str_ind_3, end_ind$1);
                      var str_ind_5 = parse_spaces(match$11[0], end_ind$1);
                      if (Caml_string.get(str, str_ind_5) !== /* ">" */62) {
                        throw Caml_builtin_exceptions.not_found;
                      }
                      var s$1 = $$String.sub(str, str_ind$1 - 2 | 0, (str_ind_5 - str_ind$1 | 0) + 3 | 0);
                      match$7 = /* tuple */[
                        str_ind_5 + 1 | 0,
                        /* Break */Block.__(0, [
                            s$1,
                            width,
                            match$11[1]
                          ])
                      ];
                    }
                  }
                  
                }
                catch (raw_exn){
                  var exn = Js_exn.internalToOCamlException(raw_exn);
                  if (exn === Caml_builtin_exceptions.not_found) {
                    match$7 = /* tuple */[
                      str_ind$1,
                      /* Break */Block.__(0, [
                          "@;",
                          1,
                          0
                        ])
                    ];
                  } else if (exn[0] === Caml_builtin_exceptions.failure) {
                    match$7 = /* tuple */[
                      str_ind$1,
                      /* Break */Block.__(0, [
                          "@;",
                          1,
                          0
                        ])
                    ];
                  } else {
                    throw exn;
                  }
                }
                var next_ind = match$7[0];
                var match$12 = parse_literal(next_ind, next_ind, end_ind$1);
                return /* Fmt_EBB */[/* Formatting_lit */Block.__(17, [
                            match$7[1],
                            match$12[0]
                          ])];
            case 28 : 
                var str_ind$2 = str_ind + 1 | 0;
                var end_ind$2 = end_ind;
                var match$13;
                try {
                  var str_ind_1$1 = parse_spaces(str_ind$2, end_ind$2);
                  var match$14 = Caml_string.get(str, str_ind_1$1);
                  var exit$2 = 0;
                  if (match$14 >= 48) {
                    if (match$14 >= 58) {
                      match$13 = /* None */0;
                    } else {
                      exit$2 = 1;
                    }
                  } else if (match$14 !== 45) {
                    match$13 = /* None */0;
                  } else {
                    exit$2 = 1;
                  }
                  if (exit$2 === 1) {
                    var match$15 = parse_integer(str_ind_1$1, end_ind$2);
                    var str_ind_3$1 = parse_spaces(match$15[0], end_ind$2);
                    if (Caml_string.get(str, str_ind_3$1) !== /* ">" */62) {
                      throw Caml_builtin_exceptions.not_found;
                    }
                    var s$2 = $$String.sub(str, str_ind$2 - 2 | 0, (str_ind_3$1 - str_ind$2 | 0) + 3 | 0);
                    match$13 = /* Some */[/* tuple */[
                        str_ind_3$1 + 1 | 0,
                        /* Magic_size */Block.__(1, [
                            s$2,
                            match$15[1]
                          ])
                      ]];
                  }
                  
                }
                catch (raw_exn$1){
                  var exn$1 = Js_exn.internalToOCamlException(raw_exn$1);
                  if (exn$1 === Caml_builtin_exceptions.not_found) {
                    match$13 = /* None */0;
                  } else if (exn$1[0] === Caml_builtin_exceptions.failure) {
                    match$13 = /* None */0;
                  } else {
                    throw exn$1;
                  }
                }
                if (match$13) {
                  var match$16 = match$13[0];
                  var next_ind$1 = match$16[0];
                  var match$17 = parse_literal(next_ind$1, next_ind$1, end_ind$2);
                  return /* Fmt_EBB */[/* Formatting_lit */Block.__(17, [
                              match$16[1],
                              match$17[0]
                            ])];
                } else {
                  var match$18 = parse_literal(str_ind$2, str_ind$2, end_ind$2);
                  return /* Fmt_EBB */[/* Formatting_lit */Block.__(17, [
                              /* Scan_indic */Block.__(2, [/* "<" */60]),
                              match$18[0]
                            ])];
                }
            case 1 : 
            case 2 : 
            case 3 : 
            case 4 : 
            case 6 : 
            case 7 : 
            case 8 : 
            case 9 : 
            case 10 : 
            case 11 : 
            case 13 : 
            case 15 : 
            case 16 : 
            case 17 : 
            case 18 : 
            case 19 : 
            case 20 : 
            case 21 : 
            case 22 : 
            case 23 : 
            case 24 : 
            case 25 : 
            case 26 : 
            case 29 : 
            case 30 : 
                exit = 1;
                break;
            case 31 : 
                var beg_ind$6 = str_ind + 1 | 0;
                var match$19 = parse_literal(beg_ind$6, beg_ind$6, end_ind);
                return /* Fmt_EBB */[/* Formatting_lit */Block.__(17, [
                            /* FFlush */2,
                            match$19[0]
                          ])];
            case 32 : 
                var beg_ind$7 = str_ind + 1 | 0;
                var match$20 = parse_literal(beg_ind$7, beg_ind$7, end_ind);
                return /* Fmt_EBB */[/* Formatting_lit */Block.__(17, [
                            /* Escaped_at */5,
                            match$20[0]
                          ])];
            
          }
        } else {
          exit = 1;
        }
      } else {
        var beg_ind$8 = str_ind + 1 | 0;
        var match$21 = parse_literal(beg_ind$8, beg_ind$8, end_ind);
        return /* Fmt_EBB */[/* Formatting_lit */Block.__(17, [
                    /* Force_newline */3,
                    match$21[0]
                  ])];
      }
      if (exit === 1) {
        var beg_ind$9 = str_ind + 1 | 0;
        var match$22 = parse_literal(beg_ind$9, beg_ind$9, end_ind);
        return /* Fmt_EBB */[/* Formatting_lit */Block.__(17, [
                    /* Scan_indic */Block.__(2, [c]),
                    match$22[0]
                  ])];
      }
      
    }
  };
  var add_literal = function (lit_start, str_ind, fmt) {
    var size = str_ind - lit_start | 0;
    if (size !== 0) {
      if (size !== 1) {
        return /* Fmt_EBB */[/* String_literal */Block.__(11, [
                    $$String.sub(str, lit_start, size),
                    fmt
                  ])];
      } else {
        return /* Fmt_EBB */[/* Char_literal */Block.__(12, [
                    Caml_string.get(str, lit_start),
                    fmt
                  ])];
      }
    } else {
      return /* Fmt_EBB */[fmt];
    }
  };
  var parse_spaces = function (_str_ind, end_ind) {
    while(true) {
      var str_ind = _str_ind;
      if (str_ind === end_ind) {
        invalid_format_message(end_ind, "unexpected end of format");
      }
      if (Caml_string.get(str, str_ind) === /* " " */32) {
        _str_ind = str_ind + 1 | 0;
        continue ;
        
      } else {
        return str_ind;
      }
    };
  };
  var parse_integer = function (str_ind, end_ind) {
    if (str_ind === end_ind) {
      invalid_format_message(end_ind, "unexpected end of format");
    }
    var match = Caml_string.get(str, str_ind);
    if (match >= 48) {
      if (match >= 58) {
        throw [
              Caml_builtin_exceptions.assert_failure,
              [
                "camlinternalFormat.ml",
                2621,
                11
              ]
            ];
      } else {
        return parse_positive(str_ind, end_ind, 0);
      }
    } else if (match !== 45) {
      throw [
            Caml_builtin_exceptions.assert_failure,
            [
              "camlinternalFormat.ml",
              2621,
              11
            ]
          ];
    } else {
      if ((str_ind + 1 | 0) === end_ind) {
        invalid_format_message(end_ind, "unexpected end of format");
      }
      var c = Caml_string.get(str, str_ind + 1 | 0);
      if (c > 57 || c < 48) {
        return expected_character(str_ind + 1 | 0, "digit", c);
      } else {
        var match$1 = parse_positive(str_ind + 1 | 0, end_ind, 0);
        return /* tuple */[
                match$1[0],
                -match$1[1] | 0
              ];
      }
    }
  };
  var compute_float_conv = function (pct_ind, str_ind, _plus, _space, symb) {
    while(true) {
      var space = _space;
      var plus = _plus;
      if (plus !== 0) {
        if (space !== 0) {
          if (legacy_behavior$1) {
            _space = /* false */0;
            continue ;
            
          } else {
            return incompatible_flag(pct_ind, str_ind, /* " " */32, "'+'");
          }
        } else {
          var exit = 0;
          if (symb >= 72) {
            var switcher = symb - 101 | 0;
            if (switcher > 2 || switcher < 0) {
              exit = 1;
            } else {
              switch (switcher) {
                case 0 : 
                    return /* Float_pe */4;
                case 1 : 
                    return /* Float_pf */1;
                case 2 : 
                    return /* Float_pg */10;
                
              }
            }
          } else if (symb >= 69) {
            switch (symb - 69 | 0) {
              case 0 : 
                  return /* Float_pE */7;
              case 1 : 
                  exit = 1;
                  break;
              case 2 : 
                  return /* Float_pG */13;
              
            }
          } else {
            exit = 1;
          }
          if (exit === 1) {
            if (legacy_behavior$1) {
              _plus = /* false */0;
              continue ;
              
            } else {
              return incompatible_flag(pct_ind, str_ind, symb, "'+'");
            }
          }
          
        }
      } else if (space !== 0) {
        var exit$1 = 0;
        if (symb >= 72) {
          var switcher$1 = symb - 101 | 0;
          if (switcher$1 > 2 || switcher$1 < 0) {
            exit$1 = 1;
          } else {
            switch (switcher$1) {
              case 0 : 
                  return /* Float_se */5;
              case 1 : 
                  return /* Float_sf */2;
              case 2 : 
                  return /* Float_sg */11;
              
            }
          }
        } else if (symb >= 69) {
          switch (symb - 69 | 0) {
            case 0 : 
                return /* Float_sE */8;
            case 1 : 
                exit$1 = 1;
                break;
            case 2 : 
                return /* Float_sG */14;
            
          }
        } else {
          exit$1 = 1;
        }
        if (exit$1 === 1) {
          if (legacy_behavior$1) {
            _space = /* false */0;
            continue ;
            
          } else {
            return incompatible_flag(pct_ind, str_ind, symb, "' '");
          }
        }
        
      } else if (symb >= 72) {
        var switcher$2 = symb - 101 | 0;
        if (switcher$2 > 2 || switcher$2 < 0) {
          throw [
                Caml_builtin_exceptions.assert_failure,
                [
                  "camlinternalFormat.ml",
                  2744,
                  25
                ]
              ];
        } else {
          switch (switcher$2) {
            case 0 : 
                return /* Float_e */3;
            case 1 : 
                return /* Float_f */0;
            case 2 : 
                return /* Float_g */9;
            
          }
        }
      } else if (symb >= 69) {
        switch (symb - 69 | 0) {
          case 0 : 
              return /* Float_E */6;
          case 1 : 
              return /* Float_F */15;
          case 2 : 
              return /* Float_G */12;
          
        }
      } else {
        throw [
              Caml_builtin_exceptions.assert_failure,
              [
                "camlinternalFormat.ml",
                2744,
                25
              ]
            ];
      }
    };
  };
  var search_subformat_end = function (_str_ind, end_ind, c) {
    while(true) {
      var str_ind = _str_ind;
      if (str_ind === end_ind) {
        Curry._3(failwith_message(/* Format */[
                  /* String_literal */Block.__(11, [
                      "invalid format ",
                      /* Caml_string */Block.__(3, [
                          /* No_padding */0,
                          /* String_literal */Block.__(11, [
                              ": unclosed sub-format, expected \"",
                              /* Char_literal */Block.__(12, [
                                  /* "%" */37,
                                  /* Char */Block.__(0, [/* String_literal */Block.__(11, [
                                          "\" at character number ",
                                          /* Int */Block.__(4, [
                                              /* Int_d */0,
                                              /* No_padding */0,
                                              /* No_precision */0,
                                              /* End_of_format */0
                                            ])
                                        ])])
                                ])
                            ])
                        ])
                    ]),
                  "invalid format %S: unclosed sub-format, expected \"%%%c\" at character number %d"
                ]), str, c, end_ind);
      }
      var match = Caml_string.get(str, str_ind);
      if (match !== 37) {
        _str_ind = str_ind + 1 | 0;
        continue ;
        
      } else {
        if ((str_ind + 1 | 0) === end_ind) {
          invalid_format_message(end_ind, "unexpected end of format");
        }
        if (Caml_string.get(str, str_ind + 1 | 0) === c) {
          return str_ind;
        } else {
          var match$1 = Caml_string.get(str, str_ind + 1 | 0);
          var exit = 0;
          if (match$1 >= 95) {
            if (match$1 >= 123) {
              if (match$1 >= 126) {
                exit = 1;
              } else {
                switch (match$1 - 123 | 0) {
                  case 0 : 
                      var sub_end = search_subformat_end(str_ind + 2 | 0, end_ind, /* "}" */125);
                      _str_ind = sub_end + 2 | 0;
                      continue ;
                      case 1 : 
                      exit = 1;
                      break;
                  case 2 : 
                      return expected_character(str_ind + 1 | 0, "character ')'", /* "}" */125);
                  
                }
              }
            } else if (match$1 >= 96) {
              exit = 1;
            } else {
              if ((str_ind + 2 | 0) === end_ind) {
                invalid_format_message(end_ind, "unexpected end of format");
              }
              var match$2 = Caml_string.get(str, str_ind + 2 | 0);
              if (match$2 !== 40) {
                if (match$2 !== 123) {
                  _str_ind = str_ind + 3 | 0;
                  continue ;
                  
                } else {
                  var sub_end$1 = search_subformat_end(str_ind + 3 | 0, end_ind, /* "}" */125);
                  _str_ind = sub_end$1 + 2 | 0;
                  continue ;
                  
                }
              } else {
                var sub_end$2 = search_subformat_end(str_ind + 3 | 0, end_ind, /* ")" */41);
                _str_ind = sub_end$2 + 2 | 0;
                continue ;
                
              }
            }
          } else if (match$1 !== 40) {
            if (match$1 !== 41) {
              exit = 1;
            } else {
              return expected_character(str_ind + 1 | 0, "character '}'", /* ")" */41);
            }
          } else {
            var sub_end$3 = search_subformat_end(str_ind + 2 | 0, end_ind, /* ")" */41);
            _str_ind = sub_end$3 + 2 | 0;
            continue ;
            
          }
          if (exit === 1) {
            _str_ind = str_ind + 2 | 0;
            continue ;
            
          }
          
        }
      }
    };
  };
  var parse_conversion = function (pct_ind, str_ind, end_ind, plus, sharp, space, ign, pad, prec, padprec, symb) {
    var plus_used = /* false */0;
    var sharp_used = /* false */0;
    var space_used = /* false */0;
    var ign_used = [/* false */0];
    var pad_used = /* false */0;
    var prec_used = [/* false */0];
    var check_no_0 = function (symb, pad) {
      if (typeof pad === "number") {
        return pad;
      } else if (pad.tag) {
        if (pad[0] >= 2) {
          if (legacy_behavior$1) {
            return /* Arg_padding */Block.__(1, [/* Right */1]);
          } else {
            return incompatible_flag(pct_ind, str_ind, symb, "0");
          }
        } else {
          return pad;
        }
      } else if (pad[0] >= 2) {
        if (legacy_behavior$1) {
          return /* Lit_padding */Block.__(0, [
                    /* Right */1,
                    pad[1]
                  ]);
        } else {
          return incompatible_flag(pct_ind, str_ind, symb, "0");
        }
      } else {
        return pad;
      }
    };
    var opt_of_pad = function (c, pad) {
      if (typeof pad === "number") {
        return /* None */0;
      } else if (pad.tag) {
        return incompatible_flag(pct_ind, str_ind, c, "'*'");
      } else {
        switch (pad[0]) {
          case 0 : 
              if (legacy_behavior$1) {
                return /* Some */[pad[1]];
              } else {
                return incompatible_flag(pct_ind, str_ind, c, "'-'");
              }
          case 1 : 
              return /* Some */[pad[1]];
          case 2 : 
              if (legacy_behavior$1) {
                return /* Some */[pad[1]];
              } else {
                return incompatible_flag(pct_ind, str_ind, c, "'0'");
              }
          
        }
      }
    };
    var get_prec_opt = function () {
      prec_used[0] = /* true */1;
      if (typeof prec === "number") {
        if (prec !== 0) {
          return incompatible_flag(pct_ind, str_ind, /* "_" */95, "'*'");
        } else {
          return /* None */0;
        }
      } else {
        return /* Some */[prec[0]];
      }
    };
    var fmt_result;
    var exit = 0;
    var exit$1 = 0;
    var exit$2 = 0;
    if (symb >= 124) {
      exit$1 = 6;
    } else {
      switch (symb) {
        case 33 : 
            var match = parse_literal(str_ind, str_ind, end_ind);
            fmt_result = /* Fmt_EBB */[/* Flush */Block.__(10, [match[0]])];
            break;
        case 40 : 
            var sub_end = search_subformat_end(str_ind, end_ind, /* ")" */41);
            var beg_ind = sub_end + 2 | 0;
            var match$1 = parse_literal(beg_ind, beg_ind, end_ind);
            var fmt_rest = match$1[0];
            var match$2 = parse_literal(str_ind, str_ind, sub_end);
            var sub_fmtty = fmtty_of_fmt(match$2[0]);
            if (ign_used[0] = /* true */1, ign) {
              pad_used = /* true */1;
              var ignored_000 = opt_of_pad(/* "_" */95, pad);
              var ignored = /* Ignored_format_subst */Block.__(8, [
                  ignored_000,
                  sub_fmtty
                ]);
              fmt_result = /* Fmt_EBB */[/* Ignored_param */Block.__(23, [
                    ignored,
                    fmt_rest
                  ])];
            } else {
              pad_used = /* true */1;
              fmt_result = /* Fmt_EBB */[/* Format_subst */Block.__(14, [
                    opt_of_pad(/* "(" */40, pad),
                    sub_fmtty,
                    fmt_rest
                  ])];
            }
            break;
        case 44 : 
            fmt_result = parse_literal(str_ind, str_ind, end_ind);
            break;
        case 37 : 
        case 64 : 
            exit$1 = 4;
            break;
        case 67 : 
            var match$3 = parse_literal(str_ind, str_ind, end_ind);
            var fmt_rest$1 = match$3[0];
            fmt_result = (ign_used[0] = /* true */1, ign) ? /* Fmt_EBB */[/* Ignored_param */Block.__(23, [
                    /* Ignored_caml_char */1,
                    fmt_rest$1
                  ])] : /* Fmt_EBB */[/* Caml_char */Block.__(1, [fmt_rest$1])];
            break;
        case 78 : 
            var match$4 = parse_literal(str_ind, str_ind, end_ind);
            var fmt_rest$2 = match$4[0];
            if (ign_used[0] = /* true */1, ign) {
              var ignored$1 = /* Ignored_scan_get_counter */Block.__(10, [/* Token_counter */2]);
              fmt_result = /* Fmt_EBB */[/* Ignored_param */Block.__(23, [
                    ignored$1,
                    fmt_rest$2
                  ])];
            } else {
              fmt_result = /* Fmt_EBB */[/* Scan_get_counter */Block.__(21, [
                    /* Token_counter */2,
                    fmt_rest$2
                  ])];
            }
            break;
        case 83 : 
            pad_used = /* true */1;
            var pad$1 = check_no_0(symb, padprec);
            var match$5 = parse_literal(str_ind, str_ind, end_ind);
            var fmt_rest$3 = match$5[0];
            if (ign_used[0] = /* true */1, ign) {
              pad_used = /* true */1;
              var ignored$2 = /* Ignored_caml_string */Block.__(1, [opt_of_pad(/* "_" */95, padprec)]);
              fmt_result = /* Fmt_EBB */[/* Ignored_param */Block.__(23, [
                    ignored$2,
                    fmt_rest$3
                  ])];
            } else {
              var match$6 = make_padding_fmt_ebb(pad$1, fmt_rest$3);
              fmt_result = /* Fmt_EBB */[/* Caml_string */Block.__(3, [
                    match$6[0],
                    match$6[1]
                  ])];
            }
            break;
        case 91 : 
            var match$7 = parse_char_set(str_ind, end_ind);
            var char_set = match$7[1];
            var next_ind = match$7[0];
            var match$8 = parse_literal(next_ind, next_ind, end_ind);
            var fmt_rest$4 = match$8[0];
            if (ign_used[0] = /* true */1, ign) {
              pad_used = /* true */1;
              var ignored_000$1 = opt_of_pad(/* "_" */95, pad);
              var ignored$3 = /* Ignored_scan_char_set */Block.__(9, [
                  ignored_000$1,
                  char_set
                ]);
              fmt_result = /* Fmt_EBB */[/* Ignored_param */Block.__(23, [
                    ignored$3,
                    fmt_rest$4
                  ])];
            } else {
              pad_used = /* true */1;
              fmt_result = /* Fmt_EBB */[/* Scan_char_set */Block.__(20, [
                    opt_of_pad(/* "[" */91, pad),
                    char_set,
                    fmt_rest$4
                  ])];
            }
            break;
        case 32 : 
        case 35 : 
        case 43 : 
        case 45 : 
        case 95 : 
            exit$1 = 5;
            break;
        case 97 : 
            var match$9 = parse_literal(str_ind, str_ind, end_ind);
            fmt_result = /* Fmt_EBB */[/* Alpha */Block.__(15, [match$9[0]])];
            break;
        case 66 : 
        case 98 : 
            exit$1 = 3;
            break;
        case 99 : 
            var char_format = function (fmt_rest) {
              if (ign_used[0] = /* true */1, ign) {
                return /* Fmt_EBB */[/* Ignored_param */Block.__(23, [
                            /* Ignored_char */0,
                            fmt_rest
                          ])];
              } else {
                return /* Fmt_EBB */[/* Char */Block.__(0, [fmt_rest])];
              }
            };
            var scan_format = function (fmt_rest) {
              if (ign_used[0] = /* true */1, ign) {
                return /* Fmt_EBB */[/* Ignored_param */Block.__(23, [
                            /* Ignored_scan_next_char */4,
                            fmt_rest
                          ])];
              } else {
                return /* Fmt_EBB */[/* Scan_next_char */Block.__(22, [fmt_rest])];
              }
            };
            var match$10 = parse_literal(str_ind, str_ind, end_ind);
            var fmt_rest$5 = match$10[0];
            pad_used = /* true */1;
            var match$11 = opt_of_pad(/* "c" */99, pad);
            fmt_result = match$11 ? (
                match$11[0] !== 0 ? (
                    legacy_behavior$1 ? char_format(fmt_rest$5) : invalid_format_message(str_ind, "non-zero widths are unsupported for %c conversions")
                  ) : scan_format(fmt_rest$5)
              ) : char_format(fmt_rest$5);
            break;
        case 69 : 
        case 70 : 
        case 71 : 
        case 101 : 
        case 102 : 
        case 103 : 
            exit$1 = 2;
            break;
        case 76 : 
        case 108 : 
        case 110 : 
            exit$2 = 8;
            break;
        case 114 : 
            var match$12 = parse_literal(str_ind, str_ind, end_ind);
            var fmt_rest$6 = match$12[0];
            fmt_result = (ign_used[0] = /* true */1, ign) ? /* Fmt_EBB */[/* Ignored_param */Block.__(23, [
                    /* Ignored_reader */3,
                    fmt_rest$6
                  ])] : /* Fmt_EBB */[/* Reader */Block.__(19, [fmt_rest$6])];
            break;
        case 115 : 
            pad_used = /* true */1;
            var pad$2 = check_no_0(symb, padprec);
            var match$13 = parse_literal(str_ind, str_ind, end_ind);
            var fmt_rest$7 = match$13[0];
            if (ign_used[0] = /* true */1, ign) {
              pad_used = /* true */1;
              var ignored$4 = /* Ignored_string */Block.__(0, [opt_of_pad(/* "_" */95, padprec)]);
              fmt_result = /* Fmt_EBB */[/* Ignored_param */Block.__(23, [
                    ignored$4,
                    fmt_rest$7
                  ])];
            } else {
              var match$14 = make_padding_fmt_ebb(pad$2, fmt_rest$7);
              fmt_result = /* Fmt_EBB */[/* String */Block.__(2, [
                    match$14[0],
                    match$14[1]
                  ])];
            }
            break;
        case 116 : 
            var match$15 = parse_literal(str_ind, str_ind, end_ind);
            fmt_result = /* Fmt_EBB */[/* Theta */Block.__(16, [match$15[0]])];
            break;
        case 88 : 
        case 100 : 
        case 105 : 
        case 111 : 
        case 117 : 
        case 120 : 
            exit$2 = 7;
            break;
        case 0 : 
        case 1 : 
        case 2 : 
        case 3 : 
        case 4 : 
        case 5 : 
        case 6 : 
        case 7 : 
        case 8 : 
        case 9 : 
        case 10 : 
        case 11 : 
        case 12 : 
        case 13 : 
        case 14 : 
        case 15 : 
        case 16 : 
        case 17 : 
        case 18 : 
        case 19 : 
        case 20 : 
        case 21 : 
        case 22 : 
        case 23 : 
        case 24 : 
        case 25 : 
        case 26 : 
        case 27 : 
        case 28 : 
        case 29 : 
        case 30 : 
        case 31 : 
        case 34 : 
        case 36 : 
        case 38 : 
        case 39 : 
        case 41 : 
        case 42 : 
        case 46 : 
        case 47 : 
        case 48 : 
        case 49 : 
        case 50 : 
        case 51 : 
        case 52 : 
        case 53 : 
        case 54 : 
        case 55 : 
        case 56 : 
        case 57 : 
        case 58 : 
        case 59 : 
        case 60 : 
        case 61 : 
        case 62 : 
        case 63 : 
        case 65 : 
        case 68 : 
        case 72 : 
        case 73 : 
        case 74 : 
        case 75 : 
        case 77 : 
        case 79 : 
        case 80 : 
        case 81 : 
        case 82 : 
        case 84 : 
        case 85 : 
        case 86 : 
        case 87 : 
        case 89 : 
        case 90 : 
        case 92 : 
        case 93 : 
        case 94 : 
        case 96 : 
        case 104 : 
        case 106 : 
        case 107 : 
        case 109 : 
        case 112 : 
        case 113 : 
        case 118 : 
        case 119 : 
        case 121 : 
        case 122 : 
            exit$1 = 6;
            break;
        case 123 : 
            var sub_end$1 = search_subformat_end(str_ind, end_ind, /* "}" */125);
            var match$16 = parse_literal(str_ind, str_ind, sub_end$1);
            var beg_ind$1 = sub_end$1 + 2 | 0;
            var match$17 = parse_literal(beg_ind$1, beg_ind$1, end_ind);
            var fmt_rest$8 = match$17[0];
            var sub_fmtty$1 = fmtty_of_fmt(match$16[0]);
            if (ign_used[0] = /* true */1, ign) {
              pad_used = /* true */1;
              var ignored_000$2 = opt_of_pad(/* "_" */95, pad);
              var ignored$5 = /* Ignored_format_arg */Block.__(7, [
                  ignored_000$2,
                  sub_fmtty$1
                ]);
              fmt_result = /* Fmt_EBB */[/* Ignored_param */Block.__(23, [
                    ignored$5,
                    fmt_rest$8
                  ])];
            } else {
              pad_used = /* true */1;
              fmt_result = /* Fmt_EBB */[/* Format_arg */Block.__(13, [
                    opt_of_pad(/* "{" */123, pad),
                    sub_fmtty$1,
                    fmt_rest$8
                  ])];
            }
            break;
        
      }
    }
    switch (exit$2) {
      case 7 : 
          plus_used = /* true */1;
          sharp_used = /* true */1;
          space_used = /* true */1;
          var iconv = compute_int_conv(pct_ind, str_ind, plus, sharp, space, symb);
          var match$18 = parse_literal(str_ind, str_ind, end_ind);
          var fmt_rest$9 = match$18[0];
          if (ign_used[0] = /* true */1, ign) {
            pad_used = /* true */1;
            var ignored_001 = opt_of_pad(/* "_" */95, pad);
            var ignored$6 = /* Ignored_int */Block.__(2, [
                iconv,
                ignored_001
              ]);
            fmt_result = /* Fmt_EBB */[/* Ignored_param */Block.__(23, [
                  ignored$6,
                  fmt_rest$9
                ])];
          } else {
            pad_used = /* true */1;
            prec_used[0] = /* true */1;
            var pad$3;
            var exit$3 = 0;
            if (typeof prec === "number" && prec === 0) {
              pad$3 = pad;
            } else {
              exit$3 = 9;
            }
            if (exit$3 === 9) {
              pad$3 = typeof pad === "number" ? /* No_padding */0 : (
                  pad.tag ? (
                      pad[0] >= 2 ? (
                          legacy_behavior$1 ? /* Arg_padding */Block.__(1, [/* Right */1]) : incompatible_flag(pct_ind, str_ind, /* "0" */48, "precision")
                        ) : pad
                    ) : (
                      pad[0] >= 2 ? (
                          legacy_behavior$1 ? /* Lit_padding */Block.__(0, [
                                /* Right */1,
                                pad[1]
                              ]) : incompatible_flag(pct_ind, str_ind, /* "0" */48, "precision")
                        ) : pad
                    )
                );
            }
            var match$19 = make_padprec_fmt_ebb(pad$3, (prec_used[0] = /* true */1, prec), fmt_rest$9);
            fmt_result = /* Fmt_EBB */[/* Int */Block.__(4, [
                  iconv,
                  match$19[0],
                  match$19[1],
                  match$19[2]
                ])];
          }
          break;
      case 8 : 
          if (str_ind === end_ind || !is_int_base(Caml_string.get(str, str_ind))) {
            var match$20 = parse_literal(str_ind, str_ind, end_ind);
            var fmt_rest$10 = match$20[0];
            var counter = counter_of_char(symb);
            if (ign_used[0] = /* true */1, ign) {
              var ignored$7 = /* Ignored_scan_get_counter */Block.__(10, [counter]);
              fmt_result = /* Fmt_EBB */[/* Ignored_param */Block.__(23, [
                    ignored$7,
                    fmt_rest$10
                  ])];
            } else {
              fmt_result = /* Fmt_EBB */[/* Scan_get_counter */Block.__(21, [
                    counter,
                    fmt_rest$10
                  ])];
            }
          } else {
            exit$1 = 6;
          }
          break;
      
    }
    switch (exit$1) {
      case 2 : 
          plus_used = /* true */1;
          space_used = /* true */1;
          var fconv = compute_float_conv(pct_ind, str_ind, plus, space, symb);
          var match$21 = parse_literal(str_ind, str_ind, end_ind);
          var fmt_rest$11 = match$21[0];
          if (ign_used[0] = /* true */1, ign) {
            pad_used = /* true */1;
            var ignored_000$3 = opt_of_pad(/* "_" */95, pad);
            var ignored_001$1 = get_prec_opt(/* () */0);
            var ignored$8 = /* Ignored_float */Block.__(6, [
                ignored_000$3,
                ignored_001$1
              ]);
            fmt_result = /* Fmt_EBB */[/* Ignored_param */Block.__(23, [
                  ignored$8,
                  fmt_rest$11
                ])];
          } else {
            pad_used = /* true */1;
            var match$22 = make_padprec_fmt_ebb(pad, (prec_used[0] = /* true */1, prec), fmt_rest$11);
            fmt_result = /* Fmt_EBB */[/* Float */Block.__(8, [
                  fconv,
                  match$22[0],
                  match$22[1],
                  match$22[2]
                ])];
          }
          break;
      case 3 : 
          var match$23 = parse_literal(str_ind, str_ind, end_ind);
          var fmt_rest$12 = match$23[0];
          fmt_result = (ign_used[0] = /* true */1, ign) ? /* Fmt_EBB */[/* Ignored_param */Block.__(23, [
                  /* Ignored_bool */2,
                  fmt_rest$12
                ])] : /* Fmt_EBB */[/* Bool */Block.__(9, [fmt_rest$12])];
          break;
      case 4 : 
          var match$24 = parse_literal(str_ind, str_ind, end_ind);
          fmt_result = /* Fmt_EBB */[/* Char_literal */Block.__(12, [
                symb,
                match$24[0]
              ])];
          break;
      case 5 : 
          fmt_result = Curry._3(failwith_message(/* Format */[
                    /* String_literal */Block.__(11, [
                        "invalid format ",
                        /* Caml_string */Block.__(3, [
                            /* No_padding */0,
                            /* String_literal */Block.__(11, [
                                ": at character number ",
                                /* Int */Block.__(4, [
                                    /* Int_d */0,
                                    /* No_padding */0,
                                    /* No_precision */0,
                                    /* String_literal */Block.__(11, [
                                        ", flag ",
                                        /* Caml_char */Block.__(1, [/* String_literal */Block.__(11, [
                                                " is only allowed after the '",
                                                /* Char_literal */Block.__(12, [
                                                    /* "%" */37,
                                                    /* String_literal */Block.__(11, [
                                                        "', before padding and precision",
                                                        /* End_of_format */0
                                                      ])
                                                  ])
                                              ])])
                                      ])
                                  ])
                              ])
                          ])
                      ]),
                    "invalid format %S: at character number %d, flag %C is only allowed after the '%%', before padding and precision"
                  ]), str, pct_ind, symb);
          break;
      case 6 : 
          if (symb >= 108) {
            if (symb >= 111) {
              exit = 1;
            } else {
              switch (symb - 108 | 0) {
                case 0 : 
                    plus_used = /* true */1;
                    sharp_used = /* true */1;
                    space_used = /* true */1;
                    var iconv$1 = compute_int_conv(pct_ind, str_ind + 1 | 0, plus, sharp, space, Caml_string.get(str, str_ind));
                    var beg_ind$2 = str_ind + 1 | 0;
                    var match$25 = parse_literal(beg_ind$2, beg_ind$2, end_ind);
                    var fmt_rest$13 = match$25[0];
                    if (ign_used[0] = /* true */1, ign) {
                      pad_used = /* true */1;
                      var ignored_001$2 = opt_of_pad(/* "_" */95, pad);
                      var ignored$9 = /* Ignored_int32 */Block.__(3, [
                          iconv$1,
                          ignored_001$2
                        ]);
                      fmt_result = /* Fmt_EBB */[/* Ignored_param */Block.__(23, [
                            ignored$9,
                            fmt_rest$13
                          ])];
                    } else {
                      pad_used = /* true */1;
                      var match$26 = make_padprec_fmt_ebb(pad, (prec_used[0] = /* true */1, prec), fmt_rest$13);
                      fmt_result = /* Fmt_EBB */[/* Int32 */Block.__(5, [
                            iconv$1,
                            match$26[0],
                            match$26[1],
                            match$26[2]
                          ])];
                    }
                    break;
                case 1 : 
                    exit = 1;
                    break;
                case 2 : 
                    plus_used = /* true */1;
                    sharp_used = /* true */1;
                    space_used = /* true */1;
                    var iconv$2 = compute_int_conv(pct_ind, str_ind + 1 | 0, plus, sharp, space, Caml_string.get(str, str_ind));
                    var beg_ind$3 = str_ind + 1 | 0;
                    var match$27 = parse_literal(beg_ind$3, beg_ind$3, end_ind);
                    var fmt_rest$14 = match$27[0];
                    if (ign_used[0] = /* true */1, ign) {
                      pad_used = /* true */1;
                      var ignored_001$3 = opt_of_pad(/* "_" */95, pad);
                      var ignored$10 = /* Ignored_nativeint */Block.__(4, [
                          iconv$2,
                          ignored_001$3
                        ]);
                      fmt_result = /* Fmt_EBB */[/* Ignored_param */Block.__(23, [
                            ignored$10,
                            fmt_rest$14
                          ])];
                    } else {
                      pad_used = /* true */1;
                      var match$28 = make_padprec_fmt_ebb(pad, (prec_used[0] = /* true */1, prec), fmt_rest$14);
                      fmt_result = /* Fmt_EBB */[/* Nativeint */Block.__(6, [
                            iconv$2,
                            match$28[0],
                            match$28[1],
                            match$28[2]
                          ])];
                    }
                    break;
                
              }
            }
          } else if (symb !== 76) {
            exit = 1;
          } else {
            plus_used = /* true */1;
            sharp_used = /* true */1;
            space_used = /* true */1;
            var iconv$3 = compute_int_conv(pct_ind, str_ind + 1 | 0, plus, sharp, space, Caml_string.get(str, str_ind));
            var beg_ind$4 = str_ind + 1 | 0;
            var match$29 = parse_literal(beg_ind$4, beg_ind$4, end_ind);
            var fmt_rest$15 = match$29[0];
            if (ign_used[0] = /* true */1, ign) {
              pad_used = /* true */1;
              var ignored_001$4 = opt_of_pad(/* "_" */95, pad);
              var ignored$11 = /* Ignored_int64 */Block.__(5, [
                  iconv$3,
                  ignored_001$4
                ]);
              fmt_result = /* Fmt_EBB */[/* Ignored_param */Block.__(23, [
                    ignored$11,
                    fmt_rest$15
                  ])];
            } else {
              pad_used = /* true */1;
              var match$30 = make_padprec_fmt_ebb(pad, (prec_used[0] = /* true */1, prec), fmt_rest$15);
              fmt_result = /* Fmt_EBB */[/* Int64 */Block.__(7, [
                    iconv$3,
                    match$30[0],
                    match$30[1],
                    match$30[2]
                  ])];
            }
          }
          break;
      
    }
    if (exit === 1) {
      fmt_result = Curry._3(failwith_message(/* Format */[
                /* String_literal */Block.__(11, [
                    "invalid format ",
                    /* Caml_string */Block.__(3, [
                        /* No_padding */0,
                        /* String_literal */Block.__(11, [
                            ": at character number ",
                            /* Int */Block.__(4, [
                                /* Int_d */0,
                                /* No_padding */0,
                                /* No_precision */0,
                                /* String_literal */Block.__(11, [
                                    ", invalid conversion \"",
                                    /* Char_literal */Block.__(12, [
                                        /* "%" */37,
                                        /* Char */Block.__(0, [/* Char_literal */Block.__(12, [
                                                /* "\"" */34,
                                                /* End_of_format */0
                                              ])])
                                      ])
                                  ])
                              ])
                          ])
                      ])
                  ]),
                "invalid format %S: at character number %d, invalid conversion \"%%%c\""
              ]), str, str_ind - 1 | 0, symb);
    }
    if (!legacy_behavior$1) {
      if (!plus_used && plus) {
        incompatible_flag(pct_ind, str_ind, symb, "'+'");
      }
      if (!sharp_used && sharp) {
        incompatible_flag(pct_ind, str_ind, symb, "'#'");
      }
      if (!space_used && space) {
        incompatible_flag(pct_ind, str_ind, symb, "' '");
      }
      if (!pad_used && Caml_obj.caml_notequal(/* Padding_EBB */[pad], /* Padding_EBB */[/* No_padding */0])) {
        incompatible_flag(pct_ind, str_ind, symb, "`padding'");
      }
      if (!prec_used[0] && Caml_obj.caml_notequal(/* Precision_EBB */[prec], /* Precision_EBB */[/* No_precision */0])) {
        incompatible_flag(pct_ind, str_ind, ign ? /* "_" */95 : symb, "`precision'");
      }
      if (ign && plus) {
        incompatible_flag(pct_ind, str_ind, /* "_" */95, "'+'");
      }
      
    }
    if (!ign_used[0] && ign) {
      var exit$4 = 0;
      if (symb >= 38) {
        if (symb !== 44) {
          if (symb !== 64) {
            exit$4 = 1;
          } else if (!legacy_behavior$1) {
            exit$4 = 1;
          }
          
        } else if (!legacy_behavior$1) {
          exit$4 = 1;
        }
        
      } else if (symb !== 33) {
        if (symb >= 37) {
          if (!legacy_behavior$1) {
            exit$4 = 1;
          }
          
        } else {
          exit$4 = 1;
        }
      } else if (!legacy_behavior$1) {
        exit$4 = 1;
      }
      if (exit$4 === 1) {
        incompatible_flag(pct_ind, str_ind, symb, "'_'");
      }
      
    }
    return fmt_result;
  };
  var parse_flags = function (pct_ind, str_ind, end_ind, ign) {
    var zero = [/* false */0];
    var minus = [/* false */0];
    var plus = [/* false */0];
    var space = [/* false */0];
    var sharp = [/* false */0];
    var set_flag = function (str_ind, flag) {
      if (flag[0] && !legacy_behavior$1) {
        Curry._3(failwith_message(/* Format */[
                  /* String_literal */Block.__(11, [
                      "invalid format ",
                      /* Caml_string */Block.__(3, [
                          /* No_padding */0,
                          /* String_literal */Block.__(11, [
                              ": at character number ",
                              /* Int */Block.__(4, [
                                  /* Int_d */0,
                                  /* No_padding */0,
                                  /* No_precision */0,
                                  /* String_literal */Block.__(11, [
                                      ", duplicate flag ",
                                      /* Caml_char */Block.__(1, [/* End_of_format */0])
                                    ])
                                ])
                            ])
                        ])
                    ]),
                  "invalid format %S: at character number %d, duplicate flag %C"
                ]), str, str_ind, Caml_string.get(str, str_ind));
      }
      flag[0] = /* true */1;
      return /* () */0;
    };
    var _str_ind = str_ind;
    while(true) {
      var str_ind$1 = _str_ind;
      if (str_ind$1 === end_ind) {
        invalid_format_message(end_ind, "unexpected end of format");
      }
      var match = Caml_string.get(str, str_ind$1);
      var exit = 0;
      var switcher = match - 32 | 0;
      if (switcher > 16 || switcher < 0) {
        exit = 1;
      } else {
        switch (switcher) {
          case 0 : 
              set_flag(str_ind$1, space);
              _str_ind = str_ind$1 + 1 | 0;
              continue ;
              case 3 : 
              set_flag(str_ind$1, sharp);
              _str_ind = str_ind$1 + 1 | 0;
              continue ;
              case 11 : 
              set_flag(str_ind$1, plus);
              _str_ind = str_ind$1 + 1 | 0;
              continue ;
              case 13 : 
              set_flag(str_ind$1, minus);
              _str_ind = str_ind$1 + 1 | 0;
              continue ;
              case 1 : 
          case 2 : 
          case 4 : 
          case 5 : 
          case 6 : 
          case 7 : 
          case 8 : 
          case 9 : 
          case 10 : 
          case 12 : 
          case 14 : 
          case 15 : 
              exit = 1;
              break;
          case 16 : 
              set_flag(str_ind$1, zero);
              _str_ind = str_ind$1 + 1 | 0;
              continue ;
              
        }
      }
      if (exit === 1) {
        var pct_ind$1 = pct_ind;
        var str_ind$2 = str_ind$1;
        var end_ind$1 = end_ind;
        var zero$1 = zero[0];
        var minus$1 = minus[0];
        var plus$1 = plus[0];
        var sharp$1 = sharp[0];
        var space$1 = space[0];
        var ign$1 = ign;
        if (str_ind$2 === end_ind$1) {
          invalid_format_message(end_ind$1, "unexpected end of format");
        }
        var padty = zero$1 !== 0 ? (
            minus$1 !== 0 ? (
                legacy_behavior$1 ? /* Left */0 : incompatible_flag(pct_ind$1, str_ind$2, /* "-" */45, "0")
              ) : /* Zeros */2
          ) : (
            minus$1 !== 0 ? /* Left */0 : /* Right */1
          );
        var match$1 = Caml_string.get(str, str_ind$2);
        var exit$1 = 0;
        if (match$1 >= 48) {
          if (match$1 >= 58) {
            exit$1 = 1;
          } else {
            var match$2 = parse_positive(str_ind$2, end_ind$1, 0);
            return parse_after_padding(pct_ind$1, match$2[0], end_ind$1, minus$1, plus$1, sharp$1, space$1, ign$1, /* Lit_padding */Block.__(0, [
                          padty,
                          match$2[1]
                        ]));
          }
        } else if (match$1 !== 42) {
          exit$1 = 1;
        } else {
          return parse_after_padding(pct_ind$1, str_ind$2 + 1 | 0, end_ind$1, minus$1, plus$1, sharp$1, space$1, ign$1, /* Arg_padding */Block.__(1, [padty]));
        }
        if (exit$1 === 1) {
          switch (padty) {
            case 0 : 
                if (!legacy_behavior$1) {
                  invalid_format_without(str_ind$2 - 1 | 0, /* "-" */45, "padding");
                }
                return parse_after_padding(pct_ind$1, str_ind$2, end_ind$1, minus$1, plus$1, sharp$1, space$1, ign$1, /* No_padding */0);
            case 1 : 
                return parse_after_padding(pct_ind$1, str_ind$2, end_ind$1, minus$1, plus$1, sharp$1, space$1, ign$1, /* No_padding */0);
            case 2 : 
                return parse_after_padding(pct_ind$1, str_ind$2, end_ind$1, minus$1, plus$1, sharp$1, space$1, ign$1, /* Lit_padding */Block.__(0, [
                              /* Right */1,
                              0
                            ]));
            
          }
        }
        
      }
      
    };
  };
  var is_int_base = function (symb) {
    var switcher = symb - 88 | 0;
    if (switcher > 32 || switcher < 0) {
      return /* false */0;
    } else {
      switch (switcher) {
        case 1 : 
        case 2 : 
        case 3 : 
        case 4 : 
        case 5 : 
        case 6 : 
        case 7 : 
        case 8 : 
        case 9 : 
        case 10 : 
        case 11 : 
        case 13 : 
        case 14 : 
        case 15 : 
        case 16 : 
        case 18 : 
        case 19 : 
        case 20 : 
        case 21 : 
        case 22 : 
        case 24 : 
        case 25 : 
        case 26 : 
        case 27 : 
        case 28 : 
        case 30 : 
        case 31 : 
            return /* false */0;
        case 0 : 
        case 12 : 
        case 17 : 
        case 23 : 
        case 29 : 
        case 32 : 
            return /* true */1;
        
      }
    }
  };
  var counter_of_char = function (symb) {
    var exit = 0;
    if (symb >= 108) {
      if (symb >= 111) {
        exit = 1;
      } else {
        switch (symb - 108 | 0) {
          case 0 : 
              return /* Line_counter */0;
          case 1 : 
              exit = 1;
              break;
          case 2 : 
              return /* Char_counter */1;
          
        }
      }
    } else if (symb !== 76) {
      exit = 1;
    } else {
      return /* Token_counter */2;
    }
    if (exit === 1) {
      throw [
            Caml_builtin_exceptions.assert_failure,
            [
              "camlinternalFormat.ml",
              2683,
              34
            ]
          ];
    }
    
  };
  var parse_char_set = function (str_ind, end_ind) {
    if (str_ind === end_ind) {
      invalid_format_message(end_ind, "unexpected end of format");
    }
    var char_set = Bytes.make(32, /* "\000" */0);
    var add_range = function (c, c$prime) {
      for(var i = c; i <= c$prime; ++i){
        add_in_char_set(char_set, Pervasives.char_of_int(i));
      }
      return /* () */0;
    };
    var fail_single_percent = function (str_ind) {
      return Curry._2(failwith_message(/* Format */[
                      /* String_literal */Block.__(11, [
                          "invalid format ",
                          /* Caml_string */Block.__(3, [
                              /* No_padding */0,
                              /* String_literal */Block.__(11, [
                                  ": '",
                                  /* Char_literal */Block.__(12, [
                                      /* "%" */37,
                                      /* String_literal */Block.__(11, [
                                          "' alone is not accepted in character sets, use ",
                                          /* Char_literal */Block.__(12, [
                                              /* "%" */37,
                                              /* Char_literal */Block.__(12, [
                                                  /* "%" */37,
                                                  /* String_literal */Block.__(11, [
                                                      " instead at position ",
                                                      /* Int */Block.__(4, [
                                                          /* Int_d */0,
                                                          /* No_padding */0,
                                                          /* No_precision */0,
                                                          /* Char_literal */Block.__(12, [
                                                              /* "." */46,
                                                              /* End_of_format */0
                                                            ])
                                                        ])
                                                    ])
                                                ])
                                            ])
                                        ])
                                    ])
                                ])
                            ])
                        ]),
                      "invalid format %S: '%%' alone is not accepted in character sets, use %%%% instead at position %d."
                    ]), str, str_ind);
    };
    var parse_char_set_after_char = function (_str_ind, end_ind, _c) {
      while(true) {
        var c = _c;
        var str_ind = _str_ind;
        if (str_ind === end_ind) {
          invalid_format_message(end_ind, "unexpected end of format");
        }
        var c$prime = Caml_string.get(str, str_ind);
        var exit = 0;
        var exit$1 = 0;
        if (c$prime >= 46) {
          if (c$prime !== 64) {
            if (c$prime !== 93) {
              exit = 1;
            } else {
              add_in_char_set(char_set, c);
              return str_ind + 1 | 0;
            }
          } else {
            exit$1 = 2;
          }
        } else if (c$prime !== 37) {
          if (c$prime >= 45) {
            var str_ind$1 = str_ind + 1 | 0;
            var end_ind$1 = end_ind;
            var c$1 = c;
            if (str_ind$1 === end_ind$1) {
              invalid_format_message(end_ind$1, "unexpected end of format");
            }
            var c$prime$1 = Caml_string.get(str, str_ind$1);
            if (c$prime$1 !== 37) {
              if (c$prime$1 !== 93) {
                add_range(c$1, c$prime$1);
                return parse_char_set_content(str_ind$1 + 1 | 0, end_ind$1);
              } else {
                add_in_char_set(char_set, c$1);
                add_in_char_set(char_set, /* "-" */45);
                return str_ind$1 + 1 | 0;
              }
            } else {
              if ((str_ind$1 + 1 | 0) === end_ind$1) {
                invalid_format_message(end_ind$1, "unexpected end of format");
              }
              var c$prime$2 = Caml_string.get(str, str_ind$1 + 1 | 0);
              var exit$2 = 0;
              if (c$prime$2 !== 37) {
                if (c$prime$2 !== 64) {
                  return fail_single_percent(str_ind$1);
                } else {
                  exit$2 = 1;
                }
              } else {
                exit$2 = 1;
              }
              if (exit$2 === 1) {
                add_range(c$1, c$prime$2);
                return parse_char_set_content(str_ind$1 + 2 | 0, end_ind$1);
              }
              
            }
          } else {
            exit = 1;
          }
        } else {
          exit$1 = 2;
        }
        if (exit$1 === 2) {
          if (c === /* "%" */37) {
            add_in_char_set(char_set, c$prime);
            return parse_char_set_content(str_ind + 1 | 0, end_ind);
          } else {
            exit = 1;
          }
        }
        if (exit === 1) {
          if (c === /* "%" */37) {
            fail_single_percent(str_ind);
          }
          add_in_char_set(char_set, c);
          _c = c$prime;
          _str_ind = str_ind + 1 | 0;
          continue ;
          
        }
        
      };
    };
    var parse_char_set_content = function (_str_ind, end_ind) {
      while(true) {
        var str_ind = _str_ind;
        if (str_ind === end_ind) {
          invalid_format_message(end_ind, "unexpected end of format");
        }
        var c = Caml_string.get(str, str_ind);
        if (c !== 45) {
          if (c !== 93) {
            return parse_char_set_after_char(str_ind + 1 | 0, end_ind, c);
          } else {
            return str_ind + 1 | 0;
          }
        } else {
          add_in_char_set(char_set, /* "-" */45);
          _str_ind = str_ind + 1 | 0;
          continue ;
          
        }
      };
    };
    var parse_char_set_start = function (str_ind, end_ind) {
      if (str_ind === end_ind) {
        invalid_format_message(end_ind, "unexpected end of format");
      }
      var c = Caml_string.get(str, str_ind);
      return parse_char_set_after_char(str_ind + 1 | 0, end_ind, c);
    };
    if (str_ind === end_ind) {
      invalid_format_message(end_ind, "unexpected end of format");
    }
    var match = Caml_string.get(str, str_ind);
    var match$1 = match !== 94 ? /* tuple */[
        str_ind,
        /* false */0
      ] : /* tuple */[
        str_ind + 1 | 0,
        /* true */1
      ];
    var next_ind = parse_char_set_start(match$1[0], end_ind);
    var char_set$1 = Bytes.to_string(char_set);
    return /* tuple */[
            next_ind,
            match$1[1] ? rev_char_set(char_set$1) : char_set$1
          ];
  };
  var check_open_box = function (fmt) {
    if (typeof fmt === "number") {
      return /* () */0;
    } else if (fmt.tag === 11) {
      if (typeof fmt[1] === "number") {
        try {
          open_box_of_string(fmt[0]);
          return /* () */0;
        }
        catch (raw_exn){
          var exn = Js_exn.internalToOCamlException(raw_exn);
          if (exn[0] === Caml_builtin_exceptions.failure) {
            return /* () */0;
          } else {
            throw exn;
          }
        }
      } else {
        return /* () */0;
      }
    } else {
      return /* () */0;
    }
  };
  var parse_tag = function (is_open_tag, str_ind, end_ind) {
    try {
      if (str_ind === end_ind) {
        throw Caml_builtin_exceptions.not_found;
      }
      var match = Caml_string.get(str, str_ind);
      if (match !== 60) {
        throw Caml_builtin_exceptions.not_found;
      } else {
        var ind = $$String.index_from(str, str_ind + 1 | 0, /* ">" */62);
        if (ind >= end_ind) {
          throw Caml_builtin_exceptions.not_found;
        }
        var sub_str = $$String.sub(str, str_ind, (ind - str_ind | 0) + 1 | 0);
        var beg_ind = ind + 1 | 0;
        var match$1 = parse_literal(beg_ind, beg_ind, end_ind);
        var match$2 = parse_literal(str_ind, str_ind, ind + 1 | 0);
        var sub_fmt = match$2[0];
        var sub_format = /* Format */[
          sub_fmt,
          sub_str
        ];
        var formatting = is_open_tag ? /* Open_tag */Block.__(0, [sub_format]) : (check_open_box(sub_fmt), /* Open_box */Block.__(1, [sub_format]));
        return /* Fmt_EBB */[/* Formatting_gen */Block.__(18, [
                    formatting,
                    match$1[0]
                  ])];
      }
    }
    catch (exn){
      if (exn === Caml_builtin_exceptions.not_found) {
        var match$3 = parse_literal(str_ind, str_ind, end_ind);
        var sub_format$1 = /* Format */[
          /* End_of_format */0,
          ""
        ];
        var formatting$1 = is_open_tag ? /* Open_tag */Block.__(0, [sub_format$1]) : /* Open_box */Block.__(1, [sub_format$1]);
        return /* Fmt_EBB */[/* Formatting_gen */Block.__(18, [
                    formatting$1,
                    match$3[0]
                  ])];
      } else {
        throw exn;
      }
    }
  };
  return parse_literal(0, 0, str.length);
}

function format_of_string_fmtty(str, fmtty) {
  var match = fmt_ebb_of_string(/* None */0, str);
  try {
    return /* Format */[
            type_format(match[0], fmtty),
            str
          ];
  }
  catch (exn){
    if (exn === Type_mismatch) {
      return Curry._2(failwith_message(/* Format */[
                      /* String_literal */Block.__(11, [
                          "bad input: format type mismatch between ",
                          /* Caml_string */Block.__(3, [
                              /* No_padding */0,
                              /* String_literal */Block.__(11, [
                                  " and ",
                                  /* Caml_string */Block.__(3, [
                                      /* No_padding */0,
                                      /* End_of_format */0
                                    ])
                                ])
                            ])
                        ]),
                      "bad input: format type mismatch between %S and %S"
                    ]), str, string_of_fmtty(fmtty));
    } else {
      throw exn;
    }
  }
}

function format_of_string_format(str, param) {
  var match = fmt_ebb_of_string(/* None */0, str);
  try {
    return /* Format */[
            type_format(match[0], fmtty_of_fmt(param[0])),
            str
          ];
  }
  catch (exn){
    if (exn === Type_mismatch) {
      return Curry._2(failwith_message(/* Format */[
                      /* String_literal */Block.__(11, [
                          "bad input: format type mismatch between ",
                          /* Caml_string */Block.__(3, [
                              /* No_padding */0,
                              /* String_literal */Block.__(11, [
                                  " and ",
                                  /* Caml_string */Block.__(3, [
                                      /* No_padding */0,
                                      /* End_of_format */0
                                    ])
                                ])
                            ])
                        ]),
                      "bad input: format type mismatch between %S and %S"
                    ]), str, param[1]);
    } else {
      throw exn;
    }
  }
}

exports.is_in_char_set                 = is_in_char_set;
exports.rev_char_set                   = rev_char_set;
exports.create_char_set                = create_char_set;
exports.add_in_char_set                = add_in_char_set;
exports.freeze_char_set                = freeze_char_set;
exports.param_format_of_ignored_format = param_format_of_ignored_format;
exports.make_printf                    = make_printf;
exports.output_acc                     = output_acc;
exports.bufput_acc                     = bufput_acc;
exports.strput_acc                     = strput_acc;
exports.type_format                    = type_format;
exports.fmt_ebb_of_string              = fmt_ebb_of_string;
exports.format_of_string_fmtty         = format_of_string_fmtty;
exports.format_of_string_format        = format_of_string_format;
exports.char_of_iconv                  = char_of_iconv;
exports.string_of_formatting_lit       = string_of_formatting_lit;
exports.string_of_formatting_gen       = string_of_formatting_gen;
exports.string_of_fmtty                = string_of_fmtty;
exports.string_of_fmt                  = string_of_fmt;
exports.open_box_of_string             = open_box_of_string;
exports.symm                           = symm;
exports.trans                          = trans;
exports.recast                         = recast;
/* No side effect */

},{"./block.js":"stdlib/block","./buffer.js":"stdlib/buffer","./bytes.js":"stdlib/bytes","./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./caml_bytes.js":"stdlib/caml_bytes","./caml_exceptions.js":"stdlib/caml_exceptions","./caml_float.js":"stdlib/caml_float","./caml_format.js":"stdlib/caml_format","./caml_int32.js":"stdlib/caml_int32","./caml_io.js":"stdlib/caml_io","./caml_obj.js":"stdlib/caml_obj","./caml_string.js":"stdlib/caml_string","./camlinternalFormatBasics.js":"stdlib/camlinternalFormatBasics","./char.js":"stdlib/char","./curry.js":"stdlib/curry","./js_exn.js":"stdlib/js_exn","./pervasives.js":"stdlib/pervasives","./string.js":"stdlib/string","./sys.js":"stdlib/sys"}],"stdlib/camlinternalLazy":[function(require,module,exports){
'use strict';

var Obj             = require("./obj.js");
var Curry           = require("./curry.js");
var Caml_exceptions = require("./caml_exceptions.js");

var Undefined = Caml_exceptions.create("CamlinternalLazy.Undefined");

function raise_undefined() {
  throw Undefined;
}

function force_lazy_block(blk) {
  var closure = blk[0];
  blk[0] = raise_undefined;
  try {
    var result = Curry._1(closure, /* () */0);
    blk[0] = result;
    blk.tag = Obj.forward_tag;
    return result;
  }
  catch (e){
    blk[0] = (function () {
        throw e;
      });
    throw e;
  }
}

function force_val_lazy_block(blk) {
  var closure = blk[0];
  blk[0] = raise_undefined;
  var result = Curry._1(closure, /* () */0);
  blk[0] = result;
  blk.tag = Obj.forward_tag;
  return result;
}

function force(lzv) {
  var t = lzv.tag | 0;
  if (t === Obj.forward_tag) {
    return lzv[0];
  } else if (t !== Obj.lazy_tag) {
    return lzv;
  } else {
    return force_lazy_block(lzv);
  }
}

function force_val(lzv) {
  var t = lzv.tag | 0;
  if (t === Obj.forward_tag) {
    return lzv[0];
  } else if (t !== Obj.lazy_tag) {
    return lzv;
  } else {
    return force_val_lazy_block(lzv);
  }
}

exports.Undefined            = Undefined;
exports.force_lazy_block     = force_lazy_block;
exports.force_val_lazy_block = force_val_lazy_block;
exports.force                = force;
exports.force_val            = force_val;
/* No side effect */

},{"./caml_exceptions.js":"stdlib/caml_exceptions","./curry.js":"stdlib/curry","./obj.js":"stdlib/obj"}],"stdlib/camlinternalMod":[function(require,module,exports){
'use strict';

var Caml_obj                = require("./caml_obj.js");
var Caml_array              = require("./caml_array.js");
var CamlinternalOO          = require("./camlinternalOO.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function init_mod(loc, shape) {
  var undef_module = function () {
    throw [
          Caml_builtin_exceptions.undefined_recursive_module,
          loc
        ];
  };
  var loop = function (shape, struct_, idx) {
    if (typeof shape === "number") {
      switch (shape) {
        case 0 : 
        case 1 : 
            return Caml_array.caml_array_set(struct_, idx, undef_module);
        case 2 : 
            return Caml_array.caml_array_set(struct_, idx, CamlinternalOO.dummy_class(loc));
        
      }
    } else if (shape.tag) {
      return Caml_array.caml_array_set(struct_, idx, shape[0]);
    } else {
      var comps = shape[0];
      var v = /* array */[];
      Caml_array.caml_array_set(struct_, idx, v);
      var len = comps.length;
      for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
        loop(Caml_array.caml_array_get(comps, i), v, i);
      }
      return /* () */0;
    }
  };
  var res = /* array */[];
  loop(shape, res, 0);
  return Caml_array.caml_array_get(res, 0);
}

function update_mod(shape, o, n) {
  var aux = function (shape, o, n, parent, i) {
    if (typeof shape === "number") {
      switch (shape) {
        case 0 : 
            parent[i] = n;
            return /* () */0;
        case 1 : 
        case 2 : 
            return Caml_obj.caml_update_dummy(o, n);
        
      }
    } else if (shape.tag) {
      return /* () */0;
    } else {
      var comps = shape[0];
      for(var i$1 = 0 ,i_finish = comps.length - 1 | 0; i$1 <= i_finish; ++i$1){
        aux(Caml_array.caml_array_get(comps, i$1), o[i$1], n[i$1], o, i$1);
      }
      return /* () */0;
    }
  };
  if (typeof shape === "number") {
    throw [
          Caml_builtin_exceptions.assert_failure,
          [
            "camlinternalMod.ml",
            122,
            10
          ]
        ];
  } else if (shape.tag) {
    throw [
          Caml_builtin_exceptions.assert_failure,
          [
            "camlinternalMod.ml",
            122,
            10
          ]
        ];
  } else {
    var comps = shape[0];
    for(var i = 0 ,i_finish = comps.length - 1 | 0; i <= i_finish; ++i){
      aux(Caml_array.caml_array_get(comps, i), o[i], n[i], o, i);
    }
    return /* () */0;
  }
}

exports.init_mod   = init_mod;
exports.update_mod = update_mod;
/* No side effect */

},{"./caml_array.js":"stdlib/caml_array","./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./caml_obj.js":"stdlib/caml_obj","./camlinternalOO.js":"stdlib/camlinternalOO"}],"stdlib/camlinternalOO":[function(require,module,exports){
'use strict';

var Obj                     = require("./obj.js");
var Sys                     = require("./sys.js");
var List                    = require("./list.js");
var $$Array                 = require("./array.js");
var Curry                   = require("./curry.js");
var Caml_oo                 = require("./caml_oo.js");
var Caml_obj                = require("./caml_obj.js");
var Caml_array              = require("./caml_array.js");
var Caml_int32              = require("./caml_int32.js");
var Caml_string             = require("./caml_string.js");
var Caml_exceptions         = require("./caml_exceptions.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function copy(o) {
  return Caml_exceptions.caml_set_oo_id(Caml_obj.caml_obj_dup(o));
}

var params = /* record */[
  /* compact_table : true */1,
  /* copy_parent : true */1,
  /* clean_when_copying : true */1,
  /* retry_count */3,
  /* bucket_small_size */16
];

function public_method_label(s) {
  var accu = 0;
  for(var i = 0 ,i_finish = s.length - 1 | 0; i <= i_finish; ++i){
    accu = Caml_int32.imul(223, accu) + Caml_string.get(s, i) | 0;
  }
  accu = accu & 2147483647;
  if (accu > 1073741823) {
    return accu - -2147483648 | 0;
  } else {
    return accu;
  }
}

function height(param) {
  if (param) {
    return param[4];
  } else {
    return 0;
  }
}

function create(l, x, d, r) {
  var hl = height(l);
  var hr = height(r);
  return /* Node */[
          l,
          x,
          d,
          r,
          hl >= hr ? hl + 1 | 0 : hr + 1 | 0
        ];
}

function bal(l, x, d, r) {
  var hl = l ? l[4] : 0;
  var hr = r ? r[4] : 0;
  if (hl > (hr + 2 | 0)) {
    if (l) {
      var lr = l[3];
      var ld = l[2];
      var lv = l[1];
      var ll = l[0];
      if (height(ll) >= height(lr)) {
        return create(ll, lv, ld, create(lr, x, d, r));
      } else if (lr) {
        return create(create(ll, lv, ld, lr[0]), lr[1], lr[2], create(lr[3], x, d, r));
      } else {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "Map.bal"
            ];
      }
    } else {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "Map.bal"
          ];
    }
  } else if (hr > (hl + 2 | 0)) {
    if (r) {
      var rr = r[3];
      var rd = r[2];
      var rv = r[1];
      var rl = r[0];
      if (height(rr) >= height(rl)) {
        return create(create(l, x, d, rl), rv, rd, rr);
      } else if (rl) {
        return create(create(l, x, d, rl[0]), rl[1], rl[2], create(rl[3], rv, rd, rr));
      } else {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "Map.bal"
            ];
      }
    } else {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "Map.bal"
          ];
    }
  } else {
    return /* Node */[
            l,
            x,
            d,
            r,
            hl >= hr ? hl + 1 | 0 : hr + 1 | 0
          ];
  }
}

function add(x, data, param) {
  if (param) {
    var r = param[3];
    var d = param[2];
    var v = param[1];
    var l = param[0];
    var c = Caml_string.caml_string_compare(x, v);
    if (c) {
      if (c < 0) {
        return bal(add(x, data, l), v, d, r);
      } else {
        return bal(l, v, d, add(x, data, r));
      }
    } else {
      return /* Node */[
              l,
              x,
              data,
              r,
              param[4]
            ];
    }
  } else {
    return /* Node */[
            /* Empty */0,
            x,
            data,
            /* Empty */0,
            1
          ];
  }
}

function find(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      var c = Caml_string.caml_string_compare(x, param[1]);
      if (c) {
        _param = c < 0 ? param[0] : param[3];
        continue ;
        
      } else {
        return param[2];
      }
    } else {
      throw Caml_builtin_exceptions.not_found;
    }
  };
}

function fold(f, _m, _accu) {
  while(true) {
    var accu = _accu;
    var m = _m;
    if (m) {
      _accu = Curry._3(f, m[1], m[2], fold(f, m[0], accu));
      _m = m[3];
      continue ;
      
    } else {
      return accu;
    }
  };
}

function height$1(param) {
  if (param) {
    return param[4];
  } else {
    return 0;
  }
}

function create$1(l, x, d, r) {
  var hl = height$1(l);
  var hr = height$1(r);
  return /* Node */[
          l,
          x,
          d,
          r,
          hl >= hr ? hl + 1 | 0 : hr + 1 | 0
        ];
}

function bal$1(l, x, d, r) {
  var hl = l ? l[4] : 0;
  var hr = r ? r[4] : 0;
  if (hl > (hr + 2 | 0)) {
    if (l) {
      var lr = l[3];
      var ld = l[2];
      var lv = l[1];
      var ll = l[0];
      if (height$1(ll) >= height$1(lr)) {
        return create$1(ll, lv, ld, create$1(lr, x, d, r));
      } else if (lr) {
        return create$1(create$1(ll, lv, ld, lr[0]), lr[1], lr[2], create$1(lr[3], x, d, r));
      } else {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "Map.bal"
            ];
      }
    } else {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "Map.bal"
          ];
    }
  } else if (hr > (hl + 2 | 0)) {
    if (r) {
      var rr = r[3];
      var rd = r[2];
      var rv = r[1];
      var rl = r[0];
      if (height$1(rr) >= height$1(rl)) {
        return create$1(create$1(l, x, d, rl), rv, rd, rr);
      } else if (rl) {
        return create$1(create$1(l, x, d, rl[0]), rl[1], rl[2], create$1(rl[3], rv, rd, rr));
      } else {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "Map.bal"
            ];
      }
    } else {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "Map.bal"
          ];
    }
  } else {
    return /* Node */[
            l,
            x,
            d,
            r,
            hl >= hr ? hl + 1 | 0 : hr + 1 | 0
          ];
  }
}

function add$1(x, data, param) {
  if (param) {
    var r = param[3];
    var d = param[2];
    var v = param[1];
    var l = param[0];
    var c = Caml_string.caml_string_compare(x, v);
    if (c) {
      if (c < 0) {
        return bal$1(add$1(x, data, l), v, d, r);
      } else {
        return bal$1(l, v, d, add$1(x, data, r));
      }
    } else {
      return /* Node */[
              l,
              x,
              data,
              r,
              param[4]
            ];
    }
  } else {
    return /* Node */[
            /* Empty */0,
            x,
            data,
            /* Empty */0,
            1
          ];
  }
}

function height$2(param) {
  if (param) {
    return param[4];
  } else {
    return 0;
  }
}

function create$2(l, x, d, r) {
  var hl = height$2(l);
  var hr = height$2(r);
  return /* Node */[
          l,
          x,
          d,
          r,
          hl >= hr ? hl + 1 | 0 : hr + 1 | 0
        ];
}

function bal$2(l, x, d, r) {
  var hl = l ? l[4] : 0;
  var hr = r ? r[4] : 0;
  if (hl > (hr + 2 | 0)) {
    if (l) {
      var lr = l[3];
      var ld = l[2];
      var lv = l[1];
      var ll = l[0];
      if (height$2(ll) >= height$2(lr)) {
        return create$2(ll, lv, ld, create$2(lr, x, d, r));
      } else if (lr) {
        return create$2(create$2(ll, lv, ld, lr[0]), lr[1], lr[2], create$2(lr[3], x, d, r));
      } else {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "Map.bal"
            ];
      }
    } else {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "Map.bal"
          ];
    }
  } else if (hr > (hl + 2 | 0)) {
    if (r) {
      var rr = r[3];
      var rd = r[2];
      var rv = r[1];
      var rl = r[0];
      if (height$2(rr) >= height$2(rl)) {
        return create$2(create$2(l, x, d, rl), rv, rd, rr);
      } else if (rl) {
        return create$2(create$2(l, x, d, rl[0]), rl[1], rl[2], create$2(rl[3], rv, rd, rr));
      } else {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "Map.bal"
            ];
      }
    } else {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "Map.bal"
          ];
    }
  } else {
    return /* Node */[
            l,
            x,
            d,
            r,
            hl >= hr ? hl + 1 | 0 : hr + 1 | 0
          ];
  }
}

function add$2(x, data, param) {
  if (param) {
    var r = param[3];
    var d = param[2];
    var v = param[1];
    var l = param[0];
    var c = Caml_obj.caml_int_compare(x, v);
    if (c) {
      if (c < 0) {
        return bal$2(add$2(x, data, l), v, d, r);
      } else {
        return bal$2(l, v, d, add$2(x, data, r));
      }
    } else {
      return /* Node */[
              l,
              x,
              data,
              r,
              param[4]
            ];
    }
  } else {
    return /* Node */[
            /* Empty */0,
            x,
            data,
            /* Empty */0,
            1
          ];
  }
}

function find$1(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      var c = Caml_obj.caml_int_compare(x, param[1]);
      if (c) {
        _param = c < 0 ? param[0] : param[3];
        continue ;
        
      } else {
        return param[2];
      }
    } else {
      throw Caml_builtin_exceptions.not_found;
    }
  };
}

var dummy_table = /* record */[
  /* size */0,
  /* methods : array */[/* () */0],
  /* methods_by_name : Empty */0,
  /* methods_by_label : Empty */0,
  /* previous_states : [] */0,
  /* hidden_meths : [] */0,
  /* vars : Empty */0,
  /* initializers : [] */0
];

var table_count = [0];

var dummy_met = [];

function fit_size(n) {
  if (n <= 2) {
    return n;
  } else {
    return (fit_size((n + 1 | 0) / 2 | 0) << 1);
  }
}

function new_table(pub_labels) {
  table_count[0] = table_count[0] + 1 | 0;
  var len = pub_labels.length;
  var methods = Caml_array.caml_make_vect((len << 1) + 2 | 0, dummy_met);
  Caml_array.caml_array_set(methods, 0, len);
  Caml_array.caml_array_set(methods, 1, (Caml_int32.imul(fit_size(len), Sys.word_size) / 8 | 0) - 1 | 0);
  for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
    Caml_array.caml_array_set(methods, (i << 1) + 3 | 0, Caml_array.caml_array_get(pub_labels, i));
  }
  return /* record */[
          /* size */2,
          /* methods */methods,
          /* methods_by_name : Empty */0,
          /* methods_by_label : Empty */0,
          /* previous_states : [] */0,
          /* hidden_meths : [] */0,
          /* vars : Empty */0,
          /* initializers : [] */0
        ];
}

function resize(array, new_size) {
  var old_size = array[/* methods */1].length;
  if (new_size > old_size) {
    var new_buck = Caml_array.caml_make_vect(new_size, dummy_met);
    $$Array.blit(array[/* methods */1], 0, new_buck, 0, old_size);
    array[/* methods */1] = new_buck;
    return /* () */0;
  } else {
    return 0;
  }
}

var method_count = [0];

var inst_var_count = [0];

function new_method(table) {
  var index = table[/* methods */1].length;
  resize(table, index + 1 | 0);
  return index;
}

function get_method_label(table, name) {
  try {
    var x = name;
    var _param = table[/* methods_by_name */2];
    while(true) {
      var param = _param;
      if (param) {
        var c = Caml_string.caml_string_compare(x, param[1]);
        if (c) {
          _param = c < 0 ? param[0] : param[3];
          continue ;
          
        } else {
          return param[2];
        }
      } else {
        throw Caml_builtin_exceptions.not_found;
      }
    };
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      var label = new_method(table);
      table[/* methods_by_name */2] = add$1(name, label, table[/* methods_by_name */2]);
      table[/* methods_by_label */3] = add$2(label, /* true */1, table[/* methods_by_label */3]);
      return label;
    } else {
      throw exn;
    }
  }
}

function get_method_labels(table, names) {
  return $$Array.map((function (param) {
                return get_method_label(table, param);
              }), names);
}

function set_method(table, label, element) {
  method_count[0] = method_count[0] + 1 | 0;
  if (find$1(label, table[/* methods_by_label */3])) {
    var array = table;
    var label$1 = label;
    var element$1 = element;
    resize(array, label$1 + 1 | 0);
    return Caml_array.caml_array_set(array[/* methods */1], label$1, element$1);
  } else {
    table[/* hidden_meths */5] = /* :: */[
      /* tuple */[
        label,
        element
      ],
      table[/* hidden_meths */5]
    ];
    return /* () */0;
  }
}

function get_method(table, label) {
  try {
    return List.assoc(label, table[/* hidden_meths */5]);
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      return Caml_array.caml_array_get(table[/* methods */1], label);
    } else {
      throw exn;
    }
  }
}

function to_list(arr) {
  if (arr) {
    return $$Array.to_list(arr);
  } else {
    return /* [] */0;
  }
}

function narrow(table, vars, virt_meths, concr_meths) {
  var vars$1 = to_list(vars);
  var virt_meths$1 = to_list(virt_meths);
  var concr_meths$1 = to_list(concr_meths);
  var virt_meth_labs = List.map((function (param) {
          return get_method_label(table, param);
        }), virt_meths$1);
  var concr_meth_labs = List.map((function (param) {
          return get_method_label(table, param);
        }), concr_meths$1);
  table[/* previous_states */4] = /* :: */[
    /* tuple */[
      table[/* methods_by_name */2],
      table[/* methods_by_label */3],
      table[/* hidden_meths */5],
      table[/* vars */6],
      virt_meth_labs,
      vars$1
    ],
    table[/* previous_states */4]
  ];
  table[/* vars */6] = fold((function (lab, info, tvars) {
          if (List.mem(lab, vars$1)) {
            return add(lab, info, tvars);
          } else {
            return tvars;
          }
        }), table[/* vars */6], /* Empty */0);
  var by_name = [/* Empty */0];
  var by_label = [/* Empty */0];
  List.iter2((function (met, label) {
          by_name[0] = add$1(met, label, by_name[0]);
          var tmp;
          try {
            tmp = find$1(label, table[/* methods_by_label */3]);
          }
          catch (exn){
            if (exn === Caml_builtin_exceptions.not_found) {
              tmp = /* true */1;
            } else {
              throw exn;
            }
          }
          by_label[0] = add$2(label, tmp, by_label[0]);
          return /* () */0;
        }), concr_meths$1, concr_meth_labs);
  List.iter2((function (met, label) {
          by_name[0] = add$1(met, label, by_name[0]);
          by_label[0] = add$2(label, /* false */0, by_label[0]);
          return /* () */0;
        }), virt_meths$1, virt_meth_labs);
  table[/* methods_by_name */2] = by_name[0];
  table[/* methods_by_label */3] = by_label[0];
  table[/* hidden_meths */5] = List.fold_right((function (met, hm) {
          if (List.mem(met[0], virt_meth_labs)) {
            return hm;
          } else {
            return /* :: */[
                    met,
                    hm
                  ];
          }
        }), table[/* hidden_meths */5], /* [] */0);
  return /* () */0;
}

function widen(table) {
  var match = List.hd(table[/* previous_states */4]);
  var virt_meths = match[4];
  table[/* previous_states */4] = List.tl(table[/* previous_states */4]);
  table[/* vars */6] = List.fold_left((function (s, v) {
          return add(v, find(v, table[/* vars */6]), s);
        }), match[3], match[5]);
  table[/* methods_by_name */2] = match[0];
  table[/* methods_by_label */3] = match[1];
  table[/* hidden_meths */5] = List.fold_right((function (met, hm) {
          if (List.mem(met[0], virt_meths)) {
            return hm;
          } else {
            return /* :: */[
                    met,
                    hm
                  ];
          }
        }), table[/* hidden_meths */5], match[2]);
  return /* () */0;
}

function new_slot(table) {
  var index = table[/* size */0];
  table[/* size */0] = index + 1 | 0;
  return index;
}

function new_variable(table, name) {
  try {
    return find(name, table[/* vars */6]);
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      var index = new_slot(table);
      if (name !== "") {
        table[/* vars */6] = add(name, index, table[/* vars */6]);
      }
      return index;
    } else {
      throw exn;
    }
  }
}

function to_array(arr) {
  if (Caml_obj.caml_equal(arr, 0)) {
    return /* array */[];
  } else {
    return arr;
  }
}

function new_methods_variables(table, meths, vals) {
  var meths$1 = to_array(meths);
  var nmeths = meths$1.length;
  var nvals = vals.length;
  var res = Caml_array.caml_make_vect(nmeths + nvals | 0, 0);
  for(var i = 0 ,i_finish = nmeths - 1 | 0; i <= i_finish; ++i){
    Caml_array.caml_array_set(res, i, get_method_label(table, Caml_array.caml_array_get(meths$1, i)));
  }
  for(var i$1 = 0 ,i_finish$1 = nvals - 1 | 0; i$1 <= i_finish$1; ++i$1){
    Caml_array.caml_array_set(res, i$1 + nmeths | 0, new_variable(table, Caml_array.caml_array_get(vals, i$1)));
  }
  return res;
}

function get_variable(table, name) {
  try {
    return find(name, table[/* vars */6]);
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      throw [
            Caml_builtin_exceptions.assert_failure,
            [
              "camlinternalOO.ml",
              280,
              50
            ]
          ];
    } else {
      throw exn;
    }
  }
}

function get_variables(table, names) {
  return $$Array.map((function (param) {
                return get_variable(table, param);
              }), names);
}

function add_initializer(table, f) {
  table[/* initializers */7] = /* :: */[
    f,
    table[/* initializers */7]
  ];
  return /* () */0;
}

function create_table(public_methods) {
  if (public_methods) {
    var tags = $$Array.map(public_method_label, public_methods);
    var table = new_table(tags);
    $$Array.iteri((function (i, met) {
            var lab = (i << 1) + 2 | 0;
            table[/* methods_by_name */2] = add$1(met, lab, table[/* methods_by_name */2]);
            table[/* methods_by_label */3] = add$2(lab, /* true */1, table[/* methods_by_label */3]);
            return /* () */0;
          }), public_methods);
    return table;
  } else {
    return new_table(/* array */[]);
  }
}

function init_class(table) {
  inst_var_count[0] = (inst_var_count[0] + table[/* size */0] | 0) - 1 | 0;
  table[/* initializers */7] = List.rev(table[/* initializers */7]);
  return resize(table, 3 + ((Caml_array.caml_array_get(table[/* methods */1], 1) << 4) / Sys.word_size | 0) | 0);
}

function inherits(cla, vals, virt_meths, concr_meths, param, top) {
  var $$super = param[1];
  narrow(cla, vals, virt_meths, concr_meths);
  var init = top ? Curry._2($$super, cla, param[3]) : Curry._1($$super, cla);
  widen(cla);
  return Caml_array.caml_array_concat(/* :: */[
              /* array */[init],
              /* :: */[
                $$Array.map((function (param) {
                        return get_variable(cla, param);
                      }), to_array(vals)),
                /* :: */[
                  $$Array.map((function (nm) {
                          return get_method(cla, get_method_label(cla, nm));
                        }), to_array(concr_meths)),
                  /* [] */0
                ]
              ]
            ]);
}

function make_class(pub_meths, class_init) {
  var table = create_table(pub_meths);
  var env_init = Curry._1(class_init, table);
  init_class(table);
  return /* tuple */[
          Curry._1(env_init, 0),
          class_init,
          env_init,
          0
        ];
}

function make_class_store(pub_meths, class_init, init_table) {
  var table = create_table(pub_meths);
  var env_init = Curry._1(class_init, table);
  init_class(table);
  init_table[/* class_init */1] = class_init;
  init_table[/* env_init */0] = env_init;
  return /* () */0;
}

function dummy_class(loc) {
  var undef = function () {
    throw [
          Caml_builtin_exceptions.undefined_recursive_module,
          loc
        ];
  };
  return /* tuple */[
          undef,
          undef,
          undef,
          0
        ];
}

function create_object(table) {
  var obj = {
    length: table[/* size */0],
    tag: Obj.object_tag
  };
  obj[0] = table[/* methods */1];
  return Caml_exceptions.caml_set_oo_id(obj);
}

function create_object_opt(obj_0, table) {
  if (obj_0) {
    return obj_0;
  } else {
    var obj = {
      length: table[/* size */0],
      tag: Obj.object_tag
    };
    obj[0] = table[/* methods */1];
    return Caml_exceptions.caml_set_oo_id(obj);
  }
}

function iter_f(obj, _param) {
  while(true) {
    var param = _param;
    if (param) {
      Curry._1(param[0], obj);
      _param = param[1];
      continue ;
      
    } else {
      return /* () */0;
    }
  };
}

function run_initializers(obj, table) {
  var inits = table[/* initializers */7];
  if (inits !== /* [] */0) {
    return iter_f(obj, inits);
  } else {
    return 0;
  }
}

function run_initializers_opt(obj_0, obj, table) {
  if (obj_0) {
    return obj;
  } else {
    var inits = table[/* initializers */7];
    if (inits !== /* [] */0) {
      iter_f(obj, inits);
    }
    return obj;
  }
}

function create_object_and_run_initializers(obj_0, table) {
  if (obj_0) {
    return obj_0;
  } else {
    var obj = create_object(table);
    run_initializers(obj, table);
    return obj;
  }
}

function build_path(n, keys, tables) {
  var res = /* record */[
    /* key */0,
    /* data : Empty */0,
    /* next : Empty */0
  ];
  var r = res;
  for(var i = 0; i <= n; ++i){
    r = /* Cons */[
      Caml_array.caml_array_get(keys, i),
      r,
      /* Empty */0
    ];
  }
  tables[/* data */1] = r;
  return res;
}

function lookup_keys(i, keys, tables) {
  if (i < 0) {
    return tables;
  } else {
    var key = Caml_array.caml_array_get(keys, i);
    var _tables = tables;
    while(true) {
      var tables$1 = _tables;
      if (tables$1[/* key */0] === key) {
        return lookup_keys(i - 1 | 0, keys, tables$1[/* data */1]);
      } else if (tables$1[/* next */2] !== /* Empty */0) {
        _tables = tables$1[/* next */2];
        continue ;
        
      } else {
        var next = /* Cons */[
          key,
          /* Empty */0,
          /* Empty */0
        ];
        tables$1[/* next */2] = next;
        return build_path(i - 1 | 0, keys, next);
      }
    };
  }
}

function lookup_tables(root, keys) {
  if (root[/* data */1] !== /* Empty */0) {
    return lookup_keys(keys.length - 1 | 0, keys, root[/* data */1]);
  } else {
    return build_path(keys.length - 1 | 0, keys, root);
  }
}

function new_cache(table) {
  var n = new_method(table);
  var n$1 = n % 2 === 0 || n > (2 + ((Caml_array.caml_array_get(table[/* methods */1], 1) << 4) / Sys.word_size | 0) | 0) ? n : new_method(table);
  Caml_array.caml_array_set(table[/* methods */1], n$1, 0);
  return n$1;
}

function method_impl(table, i, arr) {
  var next = function () {
    i[0] = i[0] + 1 | 0;
    return Caml_array.caml_array_get(arr, i[0]);
  };
  var clo = next(/* () */0);
  if (typeof clo === "number") {
    switch (clo) {
      case 0 : 
          var x = next(/* () */0);
          return (function () {
              return x;
            });
      case 1 : 
          var n = next(/* () */0);
          return (function (obj) {
              return obj[n];
            });
      case 2 : 
          var e = next(/* () */0);
          var n$1 = next(/* () */0);
          var e$1 = e;
          var n$2 = n$1;
          return (function (obj) {
              return obj[e$1][n$2];
            });
      case 3 : 
          var n$3 = next(/* () */0);
          return (function (obj) {
              return Curry._1(obj[0][n$3], obj);
            });
      case 4 : 
          var n$4 = next(/* () */0);
          return (function (obj, x) {
              obj[n$4] = x;
              return /* () */0;
            });
      case 5 : 
          var f = next(/* () */0);
          var x$1 = next(/* () */0);
          return (function () {
              return Curry._1(f, x$1);
            });
      case 6 : 
          var f$1 = next(/* () */0);
          var n$5 = next(/* () */0);
          return (function (obj) {
              return Curry._1(f$1, obj[n$5]);
            });
      case 7 : 
          var f$2 = next(/* () */0);
          var e$2 = next(/* () */0);
          var n$6 = next(/* () */0);
          var f$3 = f$2;
          var e$3 = e$2;
          var n$7 = n$6;
          return (function (obj) {
              return Curry._1(f$3, obj[e$3][n$7]);
            });
      case 8 : 
          var f$4 = next(/* () */0);
          var n$8 = next(/* () */0);
          var f$5 = f$4;
          var n$9 = n$8;
          return (function (obj) {
              return Curry._1(f$5, Curry._1(obj[0][n$9], obj));
            });
      case 9 : 
          var f$6 = next(/* () */0);
          var x$2 = next(/* () */0);
          var y = next(/* () */0);
          return (function () {
              return Curry._2(f$6, x$2, y);
            });
      case 10 : 
          var f$7 = next(/* () */0);
          var x$3 = next(/* () */0);
          var n$10 = next(/* () */0);
          var f$8 = f$7;
          var x$4 = x$3;
          var n$11 = n$10;
          return (function (obj) {
              return Curry._2(f$8, x$4, obj[n$11]);
            });
      case 11 : 
          var f$9 = next(/* () */0);
          var x$5 = next(/* () */0);
          var e$4 = next(/* () */0);
          var n$12 = next(/* () */0);
          var f$10 = f$9;
          var x$6 = x$5;
          var e$5 = e$4;
          var n$13 = n$12;
          return (function (obj) {
              return Curry._2(f$10, x$6, obj[e$5][n$13]);
            });
      case 12 : 
          var f$11 = next(/* () */0);
          var x$7 = next(/* () */0);
          var n$14 = next(/* () */0);
          var f$12 = f$11;
          var x$8 = x$7;
          var n$15 = n$14;
          return (function (obj) {
              return Curry._2(f$12, x$8, Curry._1(obj[0][n$15], obj));
            });
      case 13 : 
          var f$13 = next(/* () */0);
          var n$16 = next(/* () */0);
          var x$9 = next(/* () */0);
          var f$14 = f$13;
          var n$17 = n$16;
          var x$10 = x$9;
          return (function (obj) {
              return Curry._2(f$14, obj[n$17], x$10);
            });
      case 14 : 
          var f$15 = next(/* () */0);
          var e$6 = next(/* () */0);
          var n$18 = next(/* () */0);
          var x$11 = next(/* () */0);
          var f$16 = f$15;
          var e$7 = e$6;
          var n$19 = n$18;
          var x$12 = x$11;
          return (function (obj) {
              return Curry._2(f$16, obj[e$7][n$19], x$12);
            });
      case 15 : 
          var f$17 = next(/* () */0);
          var n$20 = next(/* () */0);
          var x$13 = next(/* () */0);
          var f$18 = f$17;
          var n$21 = n$20;
          var x$14 = x$13;
          return (function (obj) {
              return Curry._2(f$18, Curry._1(obj[0][n$21], obj), x$14);
            });
      case 16 : 
          var n$22 = next(/* () */0);
          var x$15 = next(/* () */0);
          var n$23 = n$22;
          var x$16 = x$15;
          return (function (obj) {
              return Curry._2(obj[0][n$23], obj, x$16);
            });
      case 17 : 
          var n$24 = next(/* () */0);
          var m = next(/* () */0);
          var n$25 = n$24;
          var m$1 = m;
          return (function (obj) {
              return Curry._2(obj[0][n$25], obj, obj[m$1]);
            });
      case 18 : 
          var n$26 = next(/* () */0);
          var e$8 = next(/* () */0);
          var m$2 = next(/* () */0);
          var n$27 = n$26;
          var e$9 = e$8;
          var m$3 = m$2;
          return (function (obj) {
              return Curry._2(obj[0][n$27], obj, obj[e$9][m$3]);
            });
      case 19 : 
          var n$28 = next(/* () */0);
          var m$4 = next(/* () */0);
          var n$29 = n$28;
          var m$5 = m$4;
          return (function (obj) {
              return Curry._2(obj[0][n$29], obj, Curry._1(obj[0][m$5], obj));
            });
      case 20 : 
          var m$6 = next(/* () */0);
          var x$17 = next(/* () */0);
          var m$7 = m$6;
          var x$18 = x$17;
          new_cache(table);
          return (function () {
              return Curry._1(Curry._3(Caml_oo.caml_get_public_method, x$18, m$7, 1), x$18);
            });
      case 21 : 
          var m$8 = next(/* () */0);
          var n$30 = next(/* () */0);
          var m$9 = m$8;
          var n$31 = n$30;
          new_cache(table);
          return (function (obj) {
              var tmp = obj[n$31];
              return Curry._1(Curry._3(Caml_oo.caml_get_public_method, tmp, m$9, 2), tmp);
            });
      case 22 : 
          var m$10 = next(/* () */0);
          var e$10 = next(/* () */0);
          var n$32 = next(/* () */0);
          var m$11 = m$10;
          var e$11 = e$10;
          var n$33 = n$32;
          new_cache(table);
          return (function (obj) {
              var tmp = obj[e$11][n$33];
              return Curry._1(Curry._3(Caml_oo.caml_get_public_method, tmp, m$11, 3), tmp);
            });
      case 23 : 
          var m$12 = next(/* () */0);
          var n$34 = next(/* () */0);
          var m$13 = m$12;
          var n$35 = n$34;
          new_cache(table);
          return (function (obj) {
              var tmp = Curry._1(obj[0][n$35], obj);
              return Curry._1(Curry._3(Caml_oo.caml_get_public_method, tmp, m$13, 4), tmp);
            });
      
    }
  } else {
    return clo;
  }
}

function set_methods(table, methods) {
  var len = methods.length;
  var i = [0];
  while(i[0] < len) {
    var label = Caml_array.caml_array_get(methods, i[0]);
    var clo = method_impl(table, i, methods);
    set_method(table, label, clo);
    i[0] = i[0] + 1 | 0;
  };
  return /* () */0;
}

function stats() {
  return /* record */[
          /* classes */table_count[0],
          /* methods */method_count[0],
          /* inst_vars */inst_var_count[0]
        ];
}

exports.public_method_label                = public_method_label;
exports.new_method                         = new_method;
exports.new_variable                       = new_variable;
exports.new_methods_variables              = new_methods_variables;
exports.get_variable                       = get_variable;
exports.get_variables                      = get_variables;
exports.get_method_label                   = get_method_label;
exports.get_method_labels                  = get_method_labels;
exports.get_method                         = get_method;
exports.set_method                         = set_method;
exports.set_methods                        = set_methods;
exports.narrow                             = narrow;
exports.widen                              = widen;
exports.add_initializer                    = add_initializer;
exports.dummy_table                        = dummy_table;
exports.create_table                       = create_table;
exports.init_class                         = init_class;
exports.inherits                           = inherits;
exports.make_class                         = make_class;
exports.make_class_store                   = make_class_store;
exports.dummy_class                        = dummy_class;
exports.copy                               = copy;
exports.create_object                      = create_object;
exports.create_object_opt                  = create_object_opt;
exports.run_initializers                   = run_initializers;
exports.run_initializers_opt               = run_initializers_opt;
exports.create_object_and_run_initializers = create_object_and_run_initializers;
exports.lookup_tables                      = lookup_tables;
exports.params                             = params;
exports.stats                              = stats;
/* No side effect */

},{"./array.js":"stdlib/array","./caml_array.js":"stdlib/caml_array","./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./caml_exceptions.js":"stdlib/caml_exceptions","./caml_int32.js":"stdlib/caml_int32","./caml_obj.js":"stdlib/caml_obj","./caml_oo.js":"stdlib/caml_oo","./caml_string.js":"stdlib/caml_string","./curry.js":"stdlib/curry","./list.js":"stdlib/list","./obj.js":"stdlib/obj","./sys.js":"stdlib/sys"}],"stdlib/char":[function(require,module,exports){
'use strict';

var Caml_string             = require("./caml_string.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function chr(n) {
  if (n < 0 || n > 255) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Char.chr"
        ];
  } else {
    return n;
  }
}

function escaped(c) {
  var exit = 0;
  if (c >= 40) {
    if (c !== 92) {
      exit = c >= 127 ? 1 : 2;
    } else {
      return "\\\\";
    }
  } else if (c >= 32) {
    if (c >= 39) {
      return "\\'";
    } else {
      exit = 2;
    }
  } else if (c >= 14) {
    exit = 1;
  } else {
    switch (c) {
      case 8 : 
          return "\\b";
      case 9 : 
          return "\\t";
      case 10 : 
          return "\\n";
      case 0 : 
      case 1 : 
      case 2 : 
      case 3 : 
      case 4 : 
      case 5 : 
      case 6 : 
      case 7 : 
      case 11 : 
      case 12 : 
          exit = 1;
          break;
      case 13 : 
          return "\\r";
      
    }
  }
  switch (exit) {
    case 1 : 
        var s = new Array(4);
        s[0] = /* "\\" */92;
        s[1] = 48 + (c / 100 | 0) | 0;
        s[2] = 48 + (c / 10 | 0) % 10 | 0;
        s[3] = 48 + c % 10 | 0;
        return Caml_string.bytes_to_string(s);
    case 2 : 
        var s$1 = new Array(1);
        s$1[0] = c;
        return Caml_string.bytes_to_string(s$1);
    
  }
}

function lowercase(c) {
  if (c >= /* "A" */65 && c <= /* "Z" */90 || c >= /* "\192" */192 && c <= /* "\214" */214 || c >= /* "\216" */216 && c <= /* "\222" */222) {
    return c + 32 | 0;
  } else {
    return c;
  }
}

function uppercase(c) {
  if (c >= /* "a" */97 && c <= /* "z" */122 || c >= /* "\224" */224 && c <= /* "\246" */246 || c >= /* "\248" */248 && c <= /* "\254" */254) {
    return c - 32 | 0;
  } else {
    return c;
  }
}

function compare(c1, c2) {
  return c1 - c2 | 0;
}

exports.chr       = chr;
exports.escaped   = escaped;
exports.lowercase = lowercase;
exports.uppercase = uppercase;
exports.compare   = compare;
/* No side effect */

},{"./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./caml_string.js":"stdlib/caml_string"}],"stdlib/complex":[function(require,module,exports){
'use strict';


var one = /* float array */[
  1.0,
  0.0
];

function add(x, y) {
  return /* float array */[
          x[/* re */0] + y[/* re */0],
          x[/* im */1] + y[/* im */1]
        ];
}

function sub(x, y) {
  return /* float array */[
          x[/* re */0] - y[/* re */0],
          x[/* im */1] - y[/* im */1]
        ];
}

function neg(x) {
  return /* float array */[
          -x[/* re */0],
          -x[/* im */1]
        ];
}

function conj(x) {
  return /* float array */[
          x[/* re */0],
          -x[/* im */1]
        ];
}

function mul(x, y) {
  return /* float array */[
          x[/* re */0] * y[/* re */0] - x[/* im */1] * y[/* im */1],
          x[/* re */0] * y[/* im */1] + x[/* im */1] * y[/* re */0]
        ];
}

function div(x, y) {
  if (Math.abs(y[/* re */0]) >= Math.abs(y[/* im */1])) {
    var r = y[/* im */1] / y[/* re */0];
    var d = y[/* re */0] + r * y[/* im */1];
    return /* float array */[
            (x[/* re */0] + r * x[/* im */1]) / d,
            (x[/* im */1] - r * x[/* re */0]) / d
          ];
  } else {
    var r$1 = y[/* re */0] / y[/* im */1];
    var d$1 = y[/* im */1] + r$1 * y[/* re */0];
    return /* float array */[
            (r$1 * x[/* re */0] + x[/* im */1]) / d$1,
            (r$1 * x[/* im */1] - x[/* re */0]) / d$1
          ];
  }
}

function inv(x) {
  return div(one, x);
}

function norm2(x) {
  return x[/* re */0] * x[/* re */0] + x[/* im */1] * x[/* im */1];
}

function norm(x) {
  var r = Math.abs(x[/* re */0]);
  var i = Math.abs(x[/* im */1]);
  if (r === 0.0) {
    return i;
  } else if (i === 0.0) {
    return r;
  } else if (r >= i) {
    var q = i / r;
    return r * Math.sqrt(1.0 + q * q);
  } else {
    var q$1 = r / i;
    return i * Math.sqrt(1.0 + q$1 * q$1);
  }
}

function arg(x) {
  return Math.atan2(x[/* im */1], x[/* re */0]);
}

function polar(n, a) {
  return /* float array */[
          Math.cos(a) * n,
          Math.sin(a) * n
        ];
}

function sqrt(x) {
  if (x[/* re */0] === 0.0 && x[/* im */1] === 0.0) {
    return /* float array */[
            0.0,
            0.0
          ];
  } else {
    var r = Math.abs(x[/* re */0]);
    var i = Math.abs(x[/* im */1]);
    var w;
    if (r >= i) {
      var q = i / r;
      w = Math.sqrt(r) * Math.sqrt(0.5 * (1.0 + Math.sqrt(1.0 + q * q)));
    } else {
      var q$1 = r / i;
      w = Math.sqrt(i) * Math.sqrt(0.5 * (q$1 + Math.sqrt(1.0 + q$1 * q$1)));
    }
    if (x[/* re */0] >= 0.0) {
      return /* float array */[
              w,
              0.5 * x[/* im */1] / w
            ];
    } else {
      return /* float array */[
              0.5 * i / w,
              x[/* im */1] >= 0.0 ? w : -w
            ];
    }
  }
}

function exp(x) {
  var e = Math.exp(x[/* re */0]);
  return /* float array */[
          e * Math.cos(x[/* im */1]),
          e * Math.sin(x[/* im */1])
        ];
}

function log(x) {
  return /* float array */[
          Math.log(norm(x)),
          Math.atan2(x[/* im */1], x[/* re */0])
        ];
}

function pow(x, y) {
  return exp(mul(y, log(x)));
}

var zero = /* float array */[
  0.0,
  0.0
];

var i = /* float array */[
  0.0,
  1.0
];

exports.zero  = zero;
exports.one   = one;
exports.i     = i;
exports.neg   = neg;
exports.conj  = conj;
exports.add   = add;
exports.sub   = sub;
exports.mul   = mul;
exports.inv   = inv;
exports.div   = div;
exports.sqrt  = sqrt;
exports.norm2 = norm2;
exports.norm  = norm;
exports.arg   = arg;
exports.polar = polar;
exports.exp   = exp;
exports.log   = log;
exports.pow   = pow;
/* No side effect */

},{}],"stdlib/curry":[function(require,module,exports){
'use strict';

var Caml_array = require("./caml_array.js");

function app(_f, _args) {
  while(true) {
    var args = _args;
    var f = _f;
    var arity = f.length;
    var arity$1 = arity ? arity : 1;
    var len = args.length;
    var d = arity$1 - len | 0;
    if (d) {
      if (d < 0) {
        _args = Caml_array.caml_array_sub(args, arity$1, -d | 0);
        _f = f.apply(null, Caml_array.caml_array_sub(args, 0, arity$1));
        continue ;
        
      } else {
        return (function(f,args){
        return function (x) {
          return app(f, args.concat(/* array */[x]));
        }
        }(f,args));
      }
    } else {
      return f.apply(null, args);
    }
  };
}

function curry_1(o, a0, arity) {
  if (arity > 7 || arity < 0) {
    return app(o, /* array */[a0]);
  } else {
    switch (arity) {
      case 0 : 
      case 1 : 
          return o(a0);
      case 2 : 
          return (function (param) {
              return o(a0, param);
            });
      case 3 : 
          return (function (param, param$1) {
              return o(a0, param, param$1);
            });
      case 4 : 
          return (function (param, param$1, param$2) {
              return o(a0, param, param$1, param$2);
            });
      case 5 : 
          return (function (param, param$1, param$2, param$3) {
              return o(a0, param, param$1, param$2, param$3);
            });
      case 6 : 
          return (function (param, param$1, param$2, param$3, param$4) {
              return o(a0, param, param$1, param$2, param$3, param$4);
            });
      case 7 : 
          return (function (param, param$1, param$2, param$3, param$4, param$5) {
              return o(a0, param, param$1, param$2, param$3, param$4, param$5);
            });
      
    }
  }
}

function _1(o, a0) {
  var arity = o.length;
  if (arity === 1) {
    return o(a0);
  } else {
    return curry_1(o, a0, arity);
  }
}

function __1(o) {
  var arity = o.length;
  if (arity === 1) {
    return o;
  } else {
    return (function (a0) {
        return _1(o, a0);
      });
  }
}

function curry_2(o, a0, a1, arity) {
  if (arity > 7 || arity < 0) {
    return app(o, /* array */[
                a0,
                a1
              ]);
  } else {
    switch (arity) {
      case 0 : 
      case 1 : 
          return app(o(a0), /* array */[a1]);
      case 2 : 
          return o(a0, a1);
      case 3 : 
          return (function (param) {
              return o(a0, a1, param);
            });
      case 4 : 
          return (function (param, param$1) {
              return o(a0, a1, param, param$1);
            });
      case 5 : 
          return (function (param, param$1, param$2) {
              return o(a0, a1, param, param$1, param$2);
            });
      case 6 : 
          return (function (param, param$1, param$2, param$3) {
              return o(a0, a1, param, param$1, param$2, param$3);
            });
      case 7 : 
          return (function (param, param$1, param$2, param$3, param$4) {
              return o(a0, a1, param, param$1, param$2, param$3, param$4);
            });
      
    }
  }
}

function _2(o, a0, a1) {
  var arity = o.length;
  if (arity === 2) {
    return o(a0, a1);
  } else {
    return curry_2(o, a0, a1, arity);
  }
}

function __2(o) {
  var arity = o.length;
  if (arity === 2) {
    return o;
  } else {
    return (function (a0, a1) {
        return _2(o, a0, a1);
      });
  }
}

function curry_3(o, a0, a1, a2, arity) {
  var exit = 0;
  if (arity > 7 || arity < 0) {
    return app(o, /* array */[
                a0,
                a1,
                a2
              ]);
  } else {
    switch (arity) {
      case 0 : 
      case 1 : 
          exit = 1;
          break;
      case 2 : 
          return app(o(a0, a1), /* array */[a2]);
      case 3 : 
          return o(a0, a1, a2);
      case 4 : 
          return (function (param) {
              return o(a0, a1, a2, param);
            });
      case 5 : 
          return (function (param, param$1) {
              return o(a0, a1, a2, param, param$1);
            });
      case 6 : 
          return (function (param, param$1, param$2) {
              return o(a0, a1, a2, param, param$1, param$2);
            });
      case 7 : 
          return (function (param, param$1, param$2, param$3) {
              return o(a0, a1, a2, param, param$1, param$2, param$3);
            });
      
    }
  }
  if (exit === 1) {
    return app(o(a0), /* array */[
                a1,
                a2
              ]);
  }
  
}

function _3(o, a0, a1, a2) {
  var arity = o.length;
  if (arity === 3) {
    return o(a0, a1, a2);
  } else {
    return curry_3(o, a0, a1, a2, arity);
  }
}

function __3(o) {
  var arity = o.length;
  if (arity === 3) {
    return o;
  } else {
    return (function (a0, a1, a2) {
        return _3(o, a0, a1, a2);
      });
  }
}

function curry_4(o, a0, a1, a2, a3, arity) {
  var exit = 0;
  if (arity > 7 || arity < 0) {
    return app(o, /* array */[
                a0,
                a1,
                a2,
                a3
              ]);
  } else {
    switch (arity) {
      case 0 : 
      case 1 : 
          exit = 1;
          break;
      case 2 : 
          return app(o(a0, a1), /* array */[
                      a2,
                      a3
                    ]);
      case 3 : 
          return app(o(a0, a1, a2), /* array */[a3]);
      case 4 : 
          return o(a0, a1, a2, a3);
      case 5 : 
          return (function (param) {
              return o(a0, a1, a2, a3, param);
            });
      case 6 : 
          return (function (param, param$1) {
              return o(a0, a1, a2, a3, param, param$1);
            });
      case 7 : 
          return (function (param, param$1, param$2) {
              return o(a0, a1, a2, a3, param, param$1, param$2);
            });
      
    }
  }
  if (exit === 1) {
    return app(o(a0), /* array */[
                a1,
                a2,
                a3
              ]);
  }
  
}

function _4(o, a0, a1, a2, a3) {
  var arity = o.length;
  if (arity === 4) {
    return o(a0, a1, a2, a3);
  } else {
    return curry_4(o, a0, a1, a2, a3, arity);
  }
}

function __4(o) {
  var arity = o.length;
  if (arity === 4) {
    return o;
  } else {
    return (function (a0, a1, a2, a3) {
        return _4(o, a0, a1, a2, a3);
      });
  }
}

function curry_5(o, a0, a1, a2, a3, a4, arity) {
  var exit = 0;
  if (arity > 7 || arity < 0) {
    return app(o, /* array */[
                a0,
                a1,
                a2,
                a3,
                a4
              ]);
  } else {
    switch (arity) {
      case 0 : 
      case 1 : 
          exit = 1;
          break;
      case 2 : 
          return app(o(a0, a1), /* array */[
                      a2,
                      a3,
                      a4
                    ]);
      case 3 : 
          return app(o(a0, a1, a2), /* array */[
                      a3,
                      a4
                    ]);
      case 4 : 
          return app(o(a0, a1, a2, a3), /* array */[a4]);
      case 5 : 
          return o(a0, a1, a2, a3, a4);
      case 6 : 
          return (function (param) {
              return o(a0, a1, a2, a3, a4, param);
            });
      case 7 : 
          return (function (param, param$1) {
              return o(a0, a1, a2, a3, a4, param, param$1);
            });
      
    }
  }
  if (exit === 1) {
    return app(o(a0), /* array */[
                a1,
                a2,
                a3,
                a4
              ]);
  }
  
}

function _5(o, a0, a1, a2, a3, a4) {
  var arity = o.length;
  if (arity === 5) {
    return o(a0, a1, a2, a3, a4);
  } else {
    return curry_5(o, a0, a1, a2, a3, a4, arity);
  }
}

function __5(o) {
  var arity = o.length;
  if (arity === 5) {
    return o;
  } else {
    return (function (a0, a1, a2, a3, a4) {
        return _5(o, a0, a1, a2, a3, a4);
      });
  }
}

function curry_6(o, a0, a1, a2, a3, a4, a5, arity) {
  var exit = 0;
  if (arity > 7 || arity < 0) {
    return app(o, /* array */[
                a0,
                a1,
                a2,
                a3,
                a4,
                a5
              ]);
  } else {
    switch (arity) {
      case 0 : 
      case 1 : 
          exit = 1;
          break;
      case 2 : 
          return app(o(a0, a1), /* array */[
                      a2,
                      a3,
                      a4,
                      a5
                    ]);
      case 3 : 
          return app(o(a0, a1, a2), /* array */[
                      a3,
                      a4,
                      a5
                    ]);
      case 4 : 
          return app(o(a0, a1, a2, a3), /* array */[
                      a4,
                      a5
                    ]);
      case 5 : 
          return app(o(a0, a1, a2, a3, a4), /* array */[a5]);
      case 6 : 
          return o(a0, a1, a2, a3, a4, a5);
      case 7 : 
          return (function (param) {
              return o(a0, a1, a2, a3, a4, a5, param);
            });
      
    }
  }
  if (exit === 1) {
    return app(o(a0), /* array */[
                a1,
                a2,
                a3,
                a4,
                a5
              ]);
  }
  
}

function _6(o, a0, a1, a2, a3, a4, a5) {
  var arity = o.length;
  if (arity === 6) {
    return o(a0, a1, a2, a3, a4, a5);
  } else {
    return curry_6(o, a0, a1, a2, a3, a4, a5, arity);
  }
}

function __6(o) {
  var arity = o.length;
  if (arity === 6) {
    return o;
  } else {
    return (function (a0, a1, a2, a3, a4, a5) {
        return _6(o, a0, a1, a2, a3, a4, a5);
      });
  }
}

function curry_7(o, a0, a1, a2, a3, a4, a5, a6, arity) {
  var exit = 0;
  if (arity > 7 || arity < 0) {
    return app(o, /* array */[
                a0,
                a1,
                a2,
                a3,
                a4,
                a5,
                a6
              ]);
  } else {
    switch (arity) {
      case 0 : 
      case 1 : 
          exit = 1;
          break;
      case 2 : 
          return app(o(a0, a1), /* array */[
                      a2,
                      a3,
                      a4,
                      a5,
                      a6
                    ]);
      case 3 : 
          return app(o(a0, a1, a2), /* array */[
                      a3,
                      a4,
                      a5,
                      a6
                    ]);
      case 4 : 
          return app(o(a0, a1, a2, a3), /* array */[
                      a4,
                      a5,
                      a6
                    ]);
      case 5 : 
          return app(o(a0, a1, a2, a3, a4), /* array */[
                      a5,
                      a6
                    ]);
      case 6 : 
          return app(o(a0, a1, a2, a3, a4, a5), /* array */[a6]);
      case 7 : 
          return o(a0, a1, a2, a3, a4, a5, a6);
      
    }
  }
  if (exit === 1) {
    return app(o(a0), /* array */[
                a1,
                a2,
                a3,
                a4,
                a5,
                a6
              ]);
  }
  
}

function _7(o, a0, a1, a2, a3, a4, a5, a6) {
  var arity = o.length;
  if (arity === 7) {
    return o(a0, a1, a2, a3, a4, a5, a6);
  } else {
    return curry_7(o, a0, a1, a2, a3, a4, a5, a6, arity);
  }
}

function __7(o) {
  var arity = o.length;
  if (arity === 7) {
    return o;
  } else {
    return (function (a0, a1, a2, a3, a4, a5, a6) {
        return _7(o, a0, a1, a2, a3, a4, a5, a6);
      });
  }
}

function curry_8(o, a0, a1, a2, a3, a4, a5, a6, a7, arity) {
  var exit = 0;
  if (arity > 7 || arity < 0) {
    return app(o, /* array */[
                a0,
                a1,
                a2,
                a3,
                a4,
                a5,
                a6,
                a7
              ]);
  } else {
    switch (arity) {
      case 0 : 
      case 1 : 
          exit = 1;
          break;
      case 2 : 
          return app(o(a0, a1), /* array */[
                      a2,
                      a3,
                      a4,
                      a5,
                      a6,
                      a7
                    ]);
      case 3 : 
          return app(o(a0, a1, a2), /* array */[
                      a3,
                      a4,
                      a5,
                      a6,
                      a7
                    ]);
      case 4 : 
          return app(o(a0, a1, a2, a3), /* array */[
                      a4,
                      a5,
                      a6,
                      a7
                    ]);
      case 5 : 
          return app(o(a0, a1, a2, a3, a4), /* array */[
                      a5,
                      a6,
                      a7
                    ]);
      case 6 : 
          return app(o(a0, a1, a2, a3, a4, a5), /* array */[
                      a6,
                      a7
                    ]);
      case 7 : 
          return app(o(a0, a1, a2, a3, a4, a5, a6), /* array */[a7]);
      
    }
  }
  if (exit === 1) {
    return app(o(a0), /* array */[
                a1,
                a2,
                a3,
                a4,
                a5,
                a6,
                a7
              ]);
  }
  
}

function _8(o, a0, a1, a2, a3, a4, a5, a6, a7) {
  var arity = o.length;
  if (arity === 8) {
    return o(a0, a1, a2, a3, a4, a5, a6, a7);
  } else {
    return curry_8(o, a0, a1, a2, a3, a4, a5, a6, a7, arity);
  }
}

function __8(o) {
  var arity = o.length;
  if (arity === 8) {
    return o;
  } else {
    return (function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return _8(o, a0, a1, a2, a3, a4, a5, a6, a7);
      });
  }
}

exports.app     = app;
exports.curry_1 = curry_1;
exports._1      = _1;
exports.__1     = __1;
exports.curry_2 = curry_2;
exports._2      = _2;
exports.__2     = __2;
exports.curry_3 = curry_3;
exports._3      = _3;
exports.__3     = __3;
exports.curry_4 = curry_4;
exports._4      = _4;
exports.__4     = __4;
exports.curry_5 = curry_5;
exports._5      = _5;
exports.__5     = __5;
exports.curry_6 = curry_6;
exports._6      = _6;
exports.__6     = __6;
exports.curry_7 = curry_7;
exports._7      = _7;
exports.__7     = __7;
exports.curry_8 = curry_8;
exports._8      = _8;
exports.__8     = __8;
/* No side effect */

},{"./caml_array.js":"stdlib/caml_array"}],"stdlib/digest":[function(require,module,exports){
'use strict';

var Char                    = require("./char.js");
var $$String                = require("./string.js");
var Caml_md5                = require("./caml_md5.js");
var Pervasives              = require("./pervasives.js");
var Caml_string             = require("./caml_string.js");
var Caml_missing_polyfill   = require("./caml_missing_polyfill.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function string(str) {
  return Caml_md5.caml_md5_string(str, 0, str.length);
}

function bytes(b) {
  return string(Caml_string.bytes_to_string(b));
}

function substring(str, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (str.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Digest.substring"
        ];
  } else {
    return Caml_md5.caml_md5_string(str, ofs, len);
  }
}

function subbytes(b, ofs, len) {
  return substring(Caml_string.bytes_to_string(b), ofs, len);
}

function file(filename) {
  Pervasives.open_in_bin(filename);
  var exit = 0;
  var d;
  try {
    d = Caml_missing_polyfill.not_implemented("caml_md5_chan not implemented by bucklescript yet\n");
    exit = 1;
  }
  catch (e){
    Caml_missing_polyfill.not_implemented("caml_ml_close_channel not implemented by bucklescript yet\n");
    throw e;
  }
  if (exit === 1) {
    Caml_missing_polyfill.not_implemented("caml_ml_close_channel not implemented by bucklescript yet\n");
    return d;
  }
  
}

var output = Pervasives.output_string;

function input(chan) {
  return Pervasives.really_input_string(chan, 16);
}

function char_hex(n) {
  return n + (
          n < 10 ? /* "0" */48 : 87
        ) | 0;
}

function to_hex(d) {
  var result = new Array(32);
  for(var i = 0; i <= 15; ++i){
    var x = Caml_string.get(d, i);
    result[(i << 1)] = char_hex((x >>> 4));
    result[(i << 1) + 1 | 0] = char_hex(x & 15);
  }
  return Caml_string.bytes_to_string(result);
}

function from_hex(s) {
  if (s.length !== 32) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Digest.from_hex"
        ];
  }
  var digit = function (c) {
    if (c >= 65) {
      if (c >= 97) {
        if (c >= 103) {
          throw [
                Caml_builtin_exceptions.invalid_argument,
                "Digest.from_hex"
              ];
        } else {
          return (c - /* "a" */97 | 0) + 10 | 0;
        }
      } else if (c >= 71) {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "Digest.from_hex"
            ];
      } else {
        return (c - /* "A" */65 | 0) + 10 | 0;
      }
    } else if (c > 57 || c < 48) {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "Digest.from_hex"
          ];
    } else {
      return c - /* "0" */48 | 0;
    }
  };
  var $$byte = function (i) {
    return (digit(Caml_string.get(s, i)) << 4) + digit(Caml_string.get(s, i + 1 | 0)) | 0;
  };
  var result = new Array(16);
  for(var i = 0; i <= 15; ++i){
    result[i] = Char.chr($$byte((i << 1)));
  }
  return Caml_string.bytes_to_string(result);
}

var compare = $$String.compare;

exports.compare   = compare;
exports.string    = string;
exports.bytes     = bytes;
exports.substring = substring;
exports.subbytes  = subbytes;
exports.file      = file;
exports.output    = output;
exports.input     = input;
exports.to_hex    = to_hex;
exports.from_hex  = from_hex;
/* No side effect */

},{"./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./caml_md5.js":"stdlib/caml_md5","./caml_missing_polyfill.js":"stdlib/caml_missing_polyfill","./caml_string.js":"stdlib/caml_string","./char.js":"stdlib/char","./pervasives.js":"stdlib/pervasives","./string.js":"stdlib/string"}],"stdlib/filename":[function(require,module,exports){
'use strict';

var Block                   = require("./block.js");
var Curry                   = require("./curry.js");
var Buffer                  = require("./buffer.js");
var Js_exn                  = require("./js_exn.js");
var Printf                  = require("./printf.js");
var Random                  = require("./random.js");
var $$String                = require("./string.js");
var Caml_sys                = require("./caml_sys.js");
var Pervasives              = require("./pervasives.js");
var Caml_string             = require("./caml_string.js");
var CamlinternalLazy        = require("./camlinternalLazy.js");
var Caml_missing_polyfill   = require("./caml_missing_polyfill.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function generic_basename(is_dir_sep, current_dir_name, name) {
  if (name === "") {
    return current_dir_name;
  } else {
    var _n = name.length - 1 | 0;
    while(true) {
      var n = _n;
      if (n < 0) {
        return $$String.sub(name, 0, 1);
      } else if (Curry._2(is_dir_sep, name, n)) {
        _n = n - 1 | 0;
        continue ;
        
      } else {
        var _n$1 = n;
        var p = n + 1 | 0;
        while(true) {
          var n$1 = _n$1;
          if (n$1 < 0) {
            return $$String.sub(name, 0, p);
          } else if (Curry._2(is_dir_sep, name, n$1)) {
            return $$String.sub(name, n$1 + 1 | 0, (p - n$1 | 0) - 1 | 0);
          } else {
            _n$1 = n$1 - 1 | 0;
            continue ;
            
          }
        };
      }
    };
  }
}

function generic_dirname(is_dir_sep, current_dir_name, name) {
  if (name === "") {
    return current_dir_name;
  } else {
    var _n = name.length - 1 | 0;
    while(true) {
      var n = _n;
      if (n < 0) {
        return $$String.sub(name, 0, 1);
      } else if (Curry._2(is_dir_sep, name, n)) {
        _n = n - 1 | 0;
        continue ;
        
      } else {
        var _n$1 = n;
        while(true) {
          var n$1 = _n$1;
          if (n$1 < 0) {
            return current_dir_name;
          } else if (Curry._2(is_dir_sep, name, n$1)) {
            var _n$2 = n$1;
            while(true) {
              var n$2 = _n$2;
              if (n$2 < 0) {
                return $$String.sub(name, 0, 1);
              } else if (Curry._2(is_dir_sep, name, n$2)) {
                _n$2 = n$2 - 1 | 0;
                continue ;
                
              } else {
                return $$String.sub(name, 0, n$2 + 1 | 0);
              }
            };
          } else {
            _n$1 = n$1 - 1 | 0;
            continue ;
            
          }
        };
      }
    };
  }
}

var current_dir_name = ".";

function is_dir_sep(s, i) {
  return +(Caml_string.get(s, i) === /* "/" */47);
}

function is_relative(n) {
  if (n.length < 1) {
    return /* true */1;
  } else {
    return +(Caml_string.get(n, 0) !== /* "/" */47);
  }
}

function is_implicit(n) {
  if (is_relative(n) && (n.length < 2 || $$String.sub(n, 0, 2) !== "./")) {
    if (n.length < 3) {
      return /* true */1;
    } else {
      return +($$String.sub(n, 0, 3) !== "../");
    }
  } else {
    return /* false */0;
  }
}

function check_suffix(name, suff) {
  if (name.length >= suff.length) {
    return +($$String.sub(name, name.length - suff.length | 0, suff.length) === suff);
  } else {
    return /* false */0;
  }
}

var temp_dir_name;

try {
  temp_dir_name = Caml_sys.caml_sys_getenv("TMPDIR");
}
catch (exn){
  temp_dir_name = "/tmp";
}

function quote(param) {
  var quotequote = "'\\''";
  var s = param;
  var l = s.length;
  var b = Buffer.create(l + 20 | 0);
  Buffer.add_char(b, /* "'" */39);
  for(var i = 0 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
    if (Caml_string.get(s, i) === /* "'" */39) {
      Buffer.add_string(b, quotequote);
    } else {
      Buffer.add_char(b, Caml_string.get(s, i));
    }
  }
  Buffer.add_char(b, /* "'" */39);
  return Buffer.contents(b);
}

function basename(param) {
  return generic_basename(is_dir_sep, current_dir_name, param);
}

function dirname(param) {
  return generic_dirname(is_dir_sep, current_dir_name, param);
}

var temp_dir_name$1;

try {
  temp_dir_name$1 = Caml_sys.caml_sys_getenv("TEMP");
}
catch (exn$1){
  temp_dir_name$1 = ".";
}

var temp_dir_name$2 = temp_dir_name;

var is_dir_sep$1 = is_dir_sep;

var dir_sep = "/";

function concat(dirname, filename) {
  var l = dirname.length;
  if (l === 0 || Curry._2(is_dir_sep$1, dirname, l - 1 | 0)) {
    return dirname + filename;
  } else {
    return dirname + (dir_sep + filename);
  }
}

function chop_suffix(name, suff) {
  var n = name.length - suff.length | 0;
  if (n < 0) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Filename.chop_suffix"
        ];
  } else {
    return $$String.sub(name, 0, n);
  }
}

function chop_extension(name) {
  var _i = name.length - 1 | 0;
  while(true) {
    var i = _i;
    if (i < 0 || Curry._2(is_dir_sep$1, name, i)) {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "Filename.chop_extension"
          ];
    } else if (Caml_string.get(name, i) === /* "." */46) {
      return $$String.sub(name, 0, i);
    } else {
      _i = i - 1 | 0;
      continue ;
      
    }
  };
}

var prng = Block.__(246, [(function () {
        return Random.State[/* make_self_init */1](/* () */0);
      })]);

function temp_file_name(temp_dir, prefix, suffix) {
  var tag = prng.tag | 0;
  var rnd = Random.State[/* bits */3](tag === 250 ? prng[0] : (
          tag === 246 ? CamlinternalLazy.force_lazy_block(prng) : prng
        )) & 16777215;
  return concat(temp_dir, Curry._3(Printf.sprintf(/* Format */[
                      /* String */Block.__(2, [
                          /* No_padding */0,
                          /* Int */Block.__(4, [
                              /* Int_x */6,
                              /* Lit_padding */Block.__(0, [
                                  /* Zeros */2,
                                  6
                                ]),
                              /* No_precision */0,
                              /* String */Block.__(2, [
                                  /* No_padding */0,
                                  /* End_of_format */0
                                ])
                            ])
                        ]),
                      "%s%06x%s"
                    ]), prefix, rnd, suffix));
}

var current_temp_dir_name = [temp_dir_name$2];

function set_temp_dir_name(s) {
  current_temp_dir_name[0] = s;
  return /* () */0;
}

function get_temp_dir_name() {
  return current_temp_dir_name[0];
}

function temp_file($staropt$star, prefix, suffix) {
  var temp_dir = $staropt$star ? $staropt$star[0] : current_temp_dir_name[0];
  var _counter = 0;
  while(true) {
    var counter = _counter;
    var name = temp_file_name(temp_dir, prefix, suffix);
    try {
      Caml_missing_polyfill.not_implemented("caml_sys_close not implemented by bucklescript yet\n");
      return name;
    }
    catch (raw_e){
      var e = Js_exn.internalToOCamlException(raw_e);
      if (e[0] === Caml_builtin_exceptions.sys_error) {
        if (counter >= 1000) {
          throw e;
        } else {
          _counter = counter + 1 | 0;
          continue ;
          
        }
      } else {
        throw e;
      }
    }
  };
}

function open_temp_file($staropt$star, $staropt$star$1, prefix, suffix) {
  var mode = $staropt$star ? $staropt$star[0] : /* :: */[
      /* Open_text */7,
      /* [] */0
    ];
  var temp_dir = $staropt$star$1 ? $staropt$star$1[0] : current_temp_dir_name[0];
  var _counter = 0;
  while(true) {
    var counter = _counter;
    var name = temp_file_name(temp_dir, prefix, suffix);
    try {
      return /* tuple */[
              name,
              Pervasives.open_out_gen(/* :: */[
                    /* Open_wronly */1,
                    /* :: */[
                      /* Open_creat */3,
                      /* :: */[
                        /* Open_excl */5,
                        mode
                      ]
                    ]
                  ], 384, name)
            ];
    }
    catch (raw_e){
      var e = Js_exn.internalToOCamlException(raw_e);
      if (e[0] === Caml_builtin_exceptions.sys_error) {
        if (counter >= 1000) {
          throw e;
        } else {
          _counter = counter + 1 | 0;
          continue ;
          
        }
      } else {
        throw e;
      }
    }
  };
}

var current_dir_name$1 = current_dir_name;

var parent_dir_name = "..";

var is_relative$1 = is_relative;

var is_implicit$1 = is_implicit;

var check_suffix$1 = check_suffix;

var basename$1 = basename;

var dirname$1 = dirname;

var quote$1 = quote;

exports.current_dir_name  = current_dir_name$1;
exports.parent_dir_name   = parent_dir_name;
exports.dir_sep           = dir_sep;
exports.concat            = concat;
exports.is_relative       = is_relative$1;
exports.is_implicit       = is_implicit$1;
exports.check_suffix      = check_suffix$1;
exports.chop_suffix       = chop_suffix;
exports.chop_extension    = chop_extension;
exports.basename          = basename$1;
exports.dirname           = dirname$1;
exports.temp_file         = temp_file;
exports.open_temp_file    = open_temp_file;
exports.get_temp_dir_name = get_temp_dir_name;
exports.set_temp_dir_name = set_temp_dir_name;
exports.temp_dir_name     = temp_dir_name$2;
exports.quote             = quote$1;
/* match Not a pure module */

},{"./block.js":"stdlib/block","./buffer.js":"stdlib/buffer","./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./caml_missing_polyfill.js":"stdlib/caml_missing_polyfill","./caml_string.js":"stdlib/caml_string","./caml_sys.js":"stdlib/caml_sys","./camlinternalLazy.js":"stdlib/camlinternalLazy","./curry.js":"stdlib/curry","./js_exn.js":"stdlib/js_exn","./pervasives.js":"stdlib/pervasives","./printf.js":"stdlib/printf","./random.js":"stdlib/random","./string.js":"stdlib/string"}],"stdlib/fn":[function(require,module,exports){
// GENERATED CODE BY BUCKLESCRIPT VERSION 0.4.2 , PLEASE EDIT WITH CARE
'use strict';



/* No side effect */

},{}],"stdlib/format":[function(require,module,exports){
'use strict';

var Block                   = require("./block.js");
var Bytes                   = require("./bytes.js");
var Curry                   = require("./curry.js");
var Buffer                  = require("./buffer.js");
var $$String                = require("./string.js");
var Caml_io                 = require("./caml_io.js");
var Caml_obj                = require("./caml_obj.js");
var Pervasives              = require("./pervasives.js");
var Caml_string             = require("./caml_string.js");
var Caml_exceptions         = require("./caml_exceptions.js");
var CamlinternalFormat      = require("./camlinternalFormat.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function add_queue(x, q) {
  var c = /* Cons */[/* record */[
      /* head */x,
      /* tail : Nil */0
    ]];
  var match = q[/* insert */0];
  if (match) {
    q[/* insert */0] = c;
    match[0][/* tail */1] = c;
    return /* () */0;
  } else {
    q[/* insert */0] = c;
    q[/* body */1] = c;
    return /* () */0;
  }
}

var Empty_queue = Caml_exceptions.create("Format.Empty_queue");

function peek_queue(param) {
  var match = param[/* body */1];
  if (match) {
    return match[0][/* head */0];
  } else {
    throw Empty_queue;
  }
}

function take_queue(q) {
  var match = q[/* body */1];
  if (match) {
    var match$1 = match[0];
    var x = match$1[/* head */0];
    var tl = match$1[/* tail */1];
    q[/* body */1] = tl;
    if (!tl) {
      q[/* insert */0] = /* Nil */0;
    }
    return x;
  } else {
    throw Empty_queue;
  }
}

function pp_enqueue(state, token) {
  state[/* pp_right_total */12] = state[/* pp_right_total */12] + token[/* length */2] | 0;
  return add_queue(token, state[/* pp_queue */26]);
}

function pp_clear_queue(state) {
  state[/* pp_left_total */11] = 1;
  state[/* pp_right_total */12] = 1;
  var q = state[/* pp_queue */26];
  q[/* insert */0] = /* Nil */0;
  q[/* body */1] = /* Nil */0;
  return /* () */0;
}

function pp_output_string(state, s) {
  return Curry._3(state[/* pp_out_string */16], s, 0, s.length);
}

function break_new_line(state, offset, width) {
  Curry._1(state[/* pp_out_newline */18], /* () */0);
  state[/* pp_is_new_line */10] = /* true */1;
  var indent = (state[/* pp_margin */5] - width | 0) + offset | 0;
  var real_indent = Pervasives.min(state[/* pp_max_indent */7], indent);
  state[/* pp_current_indent */9] = real_indent;
  state[/* pp_space_left */8] = state[/* pp_margin */5] - state[/* pp_current_indent */9] | 0;
  return Curry._1(state[/* pp_out_spaces */19], state[/* pp_current_indent */9]);
}

function break_same_line(state, width) {
  state[/* pp_space_left */8] = state[/* pp_space_left */8] - width | 0;
  return Curry._1(state[/* pp_out_spaces */19], width);
}

function pp_force_break_line(state) {
  var match = state[/* pp_format_stack */1];
  if (match) {
    var match$1 = match[0];
    var width = match$1[1];
    if (width > state[/* pp_space_left */8] && (match$1[0] - 1 >>> 0) <= 3) {
      return break_new_line(state, 0, width);
    } else {
      return 0;
    }
  } else {
    return Curry._1(state[/* pp_out_newline */18], /* () */0);
  }
}

function format_pp_token(state, size, param) {
  if (typeof param === "number") {
    switch (param) {
      case 0 : 
          var match = state[/* pp_tbox_stack */2];
          if (match) {
            var tabs = match[0][0];
            var add_tab = function (n, ls) {
              if (ls) {
                var x = ls[0];
                if (Caml_obj.caml_lessthan(n, x)) {
                  return /* :: */[
                          n,
                          ls
                        ];
                } else {
                  return /* :: */[
                          x,
                          add_tab(n, ls[1])
                        ];
                }
              } else {
                return /* :: */[
                        n,
                        /* [] */0
                      ];
              }
            };
            tabs[0] = add_tab(state[/* pp_margin */5] - state[/* pp_space_left */8] | 0, tabs[0]);
            return /* () */0;
          } else {
            return /* () */0;
          }
          break;
      case 1 : 
          var match$1 = state[/* pp_format_stack */1];
          if (match$1) {
            state[/* pp_format_stack */1] = match$1[1];
            return /* () */0;
          } else {
            return /* () */0;
          }
      case 2 : 
          var match$2 = state[/* pp_tbox_stack */2];
          if (match$2) {
            state[/* pp_tbox_stack */2] = match$2[1];
            return /* () */0;
          } else {
            return /* () */0;
          }
      case 3 : 
          var match$3 = state[/* pp_format_stack */1];
          if (match$3) {
            return break_new_line(state, 0, match$3[0][1]);
          } else {
            return Curry._1(state[/* pp_out_newline */18], /* () */0);
          }
      case 4 : 
          if (state[/* pp_current_indent */9] !== (state[/* pp_margin */5] - state[/* pp_space_left */8] | 0)) {
            var state$1 = state;
            var match$4 = take_queue(state$1[/* pp_queue */26]);
            var size$1 = match$4[/* elem_size */0];
            state$1[/* pp_left_total */11] = state$1[/* pp_left_total */11] - match$4[/* length */2] | 0;
            state$1[/* pp_space_left */8] = state$1[/* pp_space_left */8] + size$1 | 0;
            return /* () */0;
          } else {
            return 0;
          }
      case 5 : 
          var match$5 = state[/* pp_mark_stack */4];
          if (match$5) {
            var marker = Curry._1(state[/* pp_mark_close_tag */23], match$5[0]);
            pp_output_string(state, marker);
            state[/* pp_mark_stack */4] = match$5[1];
            return /* () */0;
          } else {
            return /* () */0;
          }
          break;
      
    }
  } else {
    switch (param.tag | 0) {
      case 0 : 
          state[/* pp_space_left */8] = state[/* pp_space_left */8] - size | 0;
          pp_output_string(state, param[0]);
          state[/* pp_is_new_line */10] = /* false */0;
          return /* () */0;
      case 1 : 
          var off = param[1];
          var n = param[0];
          var match$6 = state[/* pp_format_stack */1];
          if (match$6) {
            var match$7 = match$6[0];
            var width = match$7[1];
            switch (match$7[0]) {
              case 1 : 
              case 2 : 
                  return break_new_line(state, off, width);
              case 3 : 
                  if (size > state[/* pp_space_left */8]) {
                    return break_new_line(state, off, width);
                  } else {
                    return break_same_line(state, n);
                  }
              case 4 : 
                  if (state[/* pp_is_new_line */10] || !(size > state[/* pp_space_left */8] || state[/* pp_current_indent */9] > ((state[/* pp_margin */5] - width | 0) + off | 0))) {
                    return break_same_line(state, n);
                  } else {
                    return break_new_line(state, off, width);
                  }
              case 0 : 
              case 5 : 
                  return break_same_line(state, n);
              
            }
          } else {
            return /* () */0;
          }
          break;
      case 2 : 
          var insertion_point = state[/* pp_margin */5] - state[/* pp_space_left */8] | 0;
          var match$8 = state[/* pp_tbox_stack */2];
          if (match$8) {
            var tabs$1 = match$8[0][0];
            var find = function (n, _param) {
              while(true) {
                var param = _param;
                if (param) {
                  var x = param[0];
                  if (Caml_obj.caml_greaterequal(x, n)) {
                    return x;
                  } else {
                    _param = param[1];
                    continue ;
                    
                  }
                } else {
                  throw Caml_builtin_exceptions.not_found;
                }
              };
            };
            var match$9 = tabs$1[0];
            var tab;
            if (match$9) {
              try {
                tab = find(insertion_point, tabs$1[0]);
              }
              catch (exn){
                if (exn === Caml_builtin_exceptions.not_found) {
                  tab = match$9[0];
                } else {
                  throw exn;
                }
              }
            } else {
              tab = insertion_point;
            }
            var offset = tab - insertion_point | 0;
            if (offset >= 0) {
              return break_same_line(state, offset + param[0] | 0);
            } else {
              return break_new_line(state, tab + param[1] | 0, state[/* pp_margin */5]);
            }
          } else {
            return /* () */0;
          }
          break;
      case 3 : 
          var ty = param[1];
          var insertion_point$1 = state[/* pp_margin */5] - state[/* pp_space_left */8] | 0;
          if (insertion_point$1 > state[/* pp_max_indent */7]) {
            pp_force_break_line(state);
          }
          var offset$1 = state[/* pp_space_left */8] - param[0] | 0;
          var bl_type = ty !== 1 ? (
              size > state[/* pp_space_left */8] ? ty : /* Pp_fits */5
            ) : /* Pp_vbox */1;
          state[/* pp_format_stack */1] = /* :: */[
            /* Format_elem */[
              bl_type,
              offset$1
            ],
            state[/* pp_format_stack */1]
          ];
          return /* () */0;
      case 4 : 
          state[/* pp_tbox_stack */2] = /* :: */[
            param[0],
            state[/* pp_tbox_stack */2]
          ];
          return /* () */0;
      case 5 : 
          var tag_name = param[0];
          var marker$1 = Curry._1(state[/* pp_mark_open_tag */22], tag_name);
          pp_output_string(state, marker$1);
          state[/* pp_mark_stack */4] = /* :: */[
            tag_name,
            state[/* pp_mark_stack */4]
          ];
          return /* () */0;
      
    }
  }
}

function advance_left(state) {
  try {
    var state$1 = state;
    while(true) {
      var match = peek_queue(state$1[/* pp_queue */26]);
      var size = match[/* elem_size */0];
      if (size < 0 && (state$1[/* pp_right_total */12] - state$1[/* pp_left_total */11] | 0) < state$1[/* pp_space_left */8]) {
        return 0;
      } else {
        take_queue(state$1[/* pp_queue */26]);
        format_pp_token(state$1, size < 0 ? 1000000010 : size, match[/* token */1]);
        state$1[/* pp_left_total */11] = match[/* length */2] + state$1[/* pp_left_total */11] | 0;
        continue ;
        
      }
    };
  }
  catch (exn){
    if (exn === Empty_queue) {
      return /* () */0;
    } else {
      throw exn;
    }
  }
}

function enqueue_advance(state, tok) {
  pp_enqueue(state, tok);
  return advance_left(state);
}

function enqueue_string_as(state, size, s) {
  return enqueue_advance(state, /* record */[
              /* elem_size */size,
              /* token : Pp_text */Block.__(0, [s]),
              /* length */size
            ]);
}

var q_elem = /* record */[
  /* elem_size */-1,
  /* token : Pp_text */Block.__(0, [""]),
  /* length */0
];

var scan_stack_bottom_000 = /* Scan_elem */[
  -1,
  q_elem
];

var scan_stack_bottom = /* :: */[
  scan_stack_bottom_000,
  /* [] */0
];

function set_size(state, ty) {
  var match = state[/* pp_scan_stack */0];
  if (match) {
    var match$1 = match[0];
    var queue_elem = match$1[1];
    var size = queue_elem[/* elem_size */0];
    var t = match[1];
    if (match$1[0] < state[/* pp_left_total */11]) {
      state[/* pp_scan_stack */0] = scan_stack_bottom;
      return /* () */0;
    } else {
      var exit = 0;
      var tmp = queue_elem[/* token */1];
      if (typeof tmp === "number") {
        return /* () */0;
      } else {
        switch (tmp.tag | 0) {
          case 1 : 
          case 2 : 
              exit = 1;
              break;
          case 3 : 
              if (ty) {
                return 0;
              } else {
                queue_elem[/* elem_size */0] = state[/* pp_right_total */12] + size | 0;
                state[/* pp_scan_stack */0] = t;
                return /* () */0;
              }
          default:
            return /* () */0;
        }
      }
      if (exit === 1) {
        if (ty) {
          queue_elem[/* elem_size */0] = state[/* pp_right_total */12] + size | 0;
          state[/* pp_scan_stack */0] = t;
          return /* () */0;
        } else {
          return 0;
        }
      }
      
    }
  } else {
    return /* () */0;
  }
}

function scan_push(state, b, tok) {
  pp_enqueue(state, tok);
  if (b) {
    set_size(state, /* true */1);
  }
  state[/* pp_scan_stack */0] = /* :: */[
    /* Scan_elem */[
      state[/* pp_right_total */12],
      tok
    ],
    state[/* pp_scan_stack */0]
  ];
  return /* () */0;
}

function pp_open_box_gen(state, indent, br_ty) {
  state[/* pp_curr_depth */13] = state[/* pp_curr_depth */13] + 1 | 0;
  if (state[/* pp_curr_depth */13] < state[/* pp_max_boxes */14]) {
    var elem = /* record */[
      /* elem_size */-state[/* pp_right_total */12] | 0,
      /* token : Pp_begin */Block.__(3, [
          indent,
          br_ty
        ]),
      /* length */0
    ];
    return scan_push(state, /* false */0, elem);
  } else if (state[/* pp_curr_depth */13] === state[/* pp_max_boxes */14]) {
    var state$1 = state;
    var s = state[/* pp_ellipsis */15];
    var len = s.length;
    return enqueue_string_as(state$1, len, s);
  } else {
    return 0;
  }
}

function pp_close_box(state, _) {
  if (state[/* pp_curr_depth */13] > 1) {
    if (state[/* pp_curr_depth */13] < state[/* pp_max_boxes */14]) {
      pp_enqueue(state, /* record */[
            /* elem_size */0,
            /* token : Pp_end */1,
            /* length */0
          ]);
      set_size(state, /* true */1);
      set_size(state, /* false */0);
    }
    state[/* pp_curr_depth */13] = state[/* pp_curr_depth */13] - 1 | 0;
    return /* () */0;
  } else {
    return 0;
  }
}

function pp_open_tag(state, tag_name) {
  if (state[/* pp_print_tags */20]) {
    state[/* pp_tag_stack */3] = /* :: */[
      tag_name,
      state[/* pp_tag_stack */3]
    ];
    Curry._1(state[/* pp_print_open_tag */24], tag_name);
  }
  if (state[/* pp_mark_tags */21]) {
    return pp_enqueue(state, /* record */[
                /* elem_size */0,
                /* token : Pp_open_tag */Block.__(5, [tag_name]),
                /* length */0
              ]);
  } else {
    return 0;
  }
}

function pp_close_tag(state, _) {
  if (state[/* pp_mark_tags */21]) {
    pp_enqueue(state, /* record */[
          /* elem_size */0,
          /* token : Pp_close_tag */5,
          /* length */0
        ]);
  }
  if (state[/* pp_print_tags */20]) {
    var match = state[/* pp_tag_stack */3];
    if (match) {
      Curry._1(state[/* pp_print_close_tag */25], match[0]);
      state[/* pp_tag_stack */3] = match[1];
      return /* () */0;
    } else {
      return /* () */0;
    }
  } else {
    return 0;
  }
}

function pp_set_print_tags(state, b) {
  state[/* pp_print_tags */20] = b;
  return /* () */0;
}

function pp_set_mark_tags(state, b) {
  state[/* pp_mark_tags */21] = b;
  return /* () */0;
}

function pp_get_print_tags(state, _) {
  return state[/* pp_print_tags */20];
}

function pp_get_mark_tags(state, _) {
  return state[/* pp_mark_tags */21];
}

function pp_set_tags(state, b) {
  state[/* pp_print_tags */20] = b;
  state[/* pp_mark_tags */21] = b;
  return /* () */0;
}

function pp_get_formatter_tag_functions(state, _) {
  return /* record */[
          /* mark_open_tag */state[/* pp_mark_open_tag */22],
          /* mark_close_tag */state[/* pp_mark_close_tag */23],
          /* print_open_tag */state[/* pp_print_open_tag */24],
          /* print_close_tag */state[/* pp_print_close_tag */25]
        ];
}

function pp_set_formatter_tag_functions(state, param) {
  state[/* pp_mark_open_tag */22] = param[/* mark_open_tag */0];
  state[/* pp_mark_close_tag */23] = param[/* mark_close_tag */1];
  state[/* pp_print_open_tag */24] = param[/* print_open_tag */2];
  state[/* pp_print_close_tag */25] = param[/* print_close_tag */3];
  return /* () */0;
}

function pp_rinit(state) {
  pp_clear_queue(state);
  state[/* pp_scan_stack */0] = scan_stack_bottom;
  state[/* pp_format_stack */1] = /* [] */0;
  state[/* pp_tbox_stack */2] = /* [] */0;
  state[/* pp_tag_stack */3] = /* [] */0;
  state[/* pp_mark_stack */4] = /* [] */0;
  state[/* pp_current_indent */9] = 0;
  state[/* pp_curr_depth */13] = 0;
  state[/* pp_space_left */8] = state[/* pp_margin */5];
  return pp_open_box_gen(state, 0, /* Pp_hovbox */3);
}

function pp_flush_queue(state, b) {
  while(state[/* pp_curr_depth */13] > 1) {
    pp_close_box(state, /* () */0);
  };
  state[/* pp_right_total */12] = 1000000010;
  advance_left(state);
  if (b) {
    Curry._1(state[/* pp_out_newline */18], /* () */0);
  }
  return pp_rinit(state);
}

function pp_print_as_size(state, size, s) {
  if (state[/* pp_curr_depth */13] < state[/* pp_max_boxes */14]) {
    return enqueue_string_as(state, size, s);
  } else {
    return 0;
  }
}

var pp_print_as = pp_print_as_size;

function pp_print_string(state, s) {
  return pp_print_as(state, s.length, s);
}

function pp_print_int(state, i) {
  return pp_print_string(state, "" + i);
}

function pp_print_float(state, f) {
  return pp_print_string(state, Pervasives.string_of_float(f));
}

function pp_print_bool(state, b) {
  return pp_print_string(state, b ? "true" : "false");
}

function pp_print_char(state, c) {
  return pp_print_as(state, 1, Caml_string.bytes_to_string(Bytes.make(1, c)));
}

function pp_open_hbox(state, _) {
  return pp_open_box_gen(state, 0, /* Pp_hbox */0);
}

function pp_open_vbox(state, indent) {
  return pp_open_box_gen(state, indent, /* Pp_vbox */1);
}

function pp_open_hvbox(state, indent) {
  return pp_open_box_gen(state, indent, /* Pp_hvbox */2);
}

function pp_open_hovbox(state, indent) {
  return pp_open_box_gen(state, indent, /* Pp_hovbox */3);
}

function pp_open_box(state, indent) {
  return pp_open_box_gen(state, indent, /* Pp_box */4);
}

function pp_print_newline(state, _) {
  pp_flush_queue(state, /* true */1);
  return Curry._1(state[/* pp_out_flush */17], /* () */0);
}

function pp_print_flush(state, _) {
  pp_flush_queue(state, /* false */0);
  return Curry._1(state[/* pp_out_flush */17], /* () */0);
}

function pp_force_newline(state, _) {
  if (state[/* pp_curr_depth */13] < state[/* pp_max_boxes */14]) {
    return enqueue_advance(state, /* record */[
                /* elem_size */0,
                /* token : Pp_newline */3,
                /* length */0
              ]);
  } else {
    return 0;
  }
}

function pp_print_if_newline(state, _) {
  if (state[/* pp_curr_depth */13] < state[/* pp_max_boxes */14]) {
    return enqueue_advance(state, /* record */[
                /* elem_size */0,
                /* token : Pp_if_newline */4,
                /* length */0
              ]);
  } else {
    return 0;
  }
}

function pp_print_break(state, width, offset) {
  if (state[/* pp_curr_depth */13] < state[/* pp_max_boxes */14]) {
    var elem = /* record */[
      /* elem_size */-state[/* pp_right_total */12] | 0,
      /* token : Pp_break */Block.__(1, [
          width,
          offset
        ]),
      /* length */width
    ];
    return scan_push(state, /* true */1, elem);
  } else {
    return 0;
  }
}

function pp_print_space(state, _) {
  return pp_print_break(state, 1, 0);
}

function pp_print_cut(state, _) {
  return pp_print_break(state, 0, 0);
}

function pp_open_tbox(state, _) {
  state[/* pp_curr_depth */13] = state[/* pp_curr_depth */13] + 1 | 0;
  if (state[/* pp_curr_depth */13] < state[/* pp_max_boxes */14]) {
    var elem = /* record */[
      /* elem_size */0,
      /* token : Pp_tbegin */Block.__(4, [/* Pp_tbox */[[/* [] */0]]]),
      /* length */0
    ];
    return enqueue_advance(state, elem);
  } else {
    return 0;
  }
}

function pp_close_tbox(state, _) {
  if (state[/* pp_curr_depth */13] > 1) {
    if (state[/* pp_curr_depth */13] < state[/* pp_max_boxes */14]) {
      var elem = /* record */[
        /* elem_size */0,
        /* token : Pp_tend */2,
        /* length */0
      ];
      enqueue_advance(state, elem);
      state[/* pp_curr_depth */13] = state[/* pp_curr_depth */13] - 1 | 0;
      return /* () */0;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
}

function pp_print_tbreak(state, width, offset) {
  if (state[/* pp_curr_depth */13] < state[/* pp_max_boxes */14]) {
    var elem = /* record */[
      /* elem_size */-state[/* pp_right_total */12] | 0,
      /* token : Pp_tbreak */Block.__(2, [
          width,
          offset
        ]),
      /* length */width
    ];
    return scan_push(state, /* true */1, elem);
  } else {
    return 0;
  }
}

function pp_print_tab(state, _) {
  return pp_print_tbreak(state, 0, 0);
}

function pp_set_tab(state, _) {
  if (state[/* pp_curr_depth */13] < state[/* pp_max_boxes */14]) {
    var elem = /* record */[
      /* elem_size */0,
      /* token : Pp_stab */0,
      /* length */0
    ];
    return enqueue_advance(state, elem);
  } else {
    return 0;
  }
}

function pp_print_list(_$staropt$star, pp_v, ppf, _param) {
  while(true) {
    var param = _param;
    var $staropt$star = _$staropt$star;
    var pp_sep = $staropt$star ? $staropt$star[0] : pp_print_cut;
    if (param) {
      var vs = param[1];
      var v = param[0];
      if (vs) {
        Curry._2(pp_v, ppf, v);
        Curry._2(pp_sep, ppf, /* () */0);
        _param = vs;
        _$staropt$star = /* Some */[pp_sep];
        continue ;
        
      } else {
        return Curry._2(pp_v, ppf, v);
      }
    } else {
      return /* () */0;
    }
  };
}

function pp_print_text(ppf, s) {
  var len = s.length;
  var left = [0];
  var right = [0];
  var flush = function () {
    pp_print_string(ppf, $$String.sub(s, left[0], right[0] - left[0] | 0));
    right[0] = right[0] + 1 | 0;
    left[0] = right[0];
    return /* () */0;
  };
  while(right[0] !== len) {
    var match = Caml_string.get(s, right[0]);
    if (match !== 10) {
      if (match !== 32) {
        right[0] = right[0] + 1 | 0;
      } else {
        flush(/* () */0);
        pp_print_break(ppf, 1, 0);
      }
    } else {
      flush(/* () */0);
      pp_force_newline(ppf, /* () */0);
    }
  };
  if (left[0] !== len) {
    return flush(/* () */0);
  } else {
    return 0;
  }
}

function pp_set_max_boxes(state, n) {
  if (n > 1) {
    state[/* pp_max_boxes */14] = n;
    return /* () */0;
  } else {
    return 0;
  }
}

function pp_get_max_boxes(state, _) {
  return state[/* pp_max_boxes */14];
}

function pp_over_max_boxes(state, _) {
  return +(state[/* pp_curr_depth */13] === state[/* pp_max_boxes */14]);
}

function pp_set_ellipsis_text(state, s) {
  state[/* pp_ellipsis */15] = s;
  return /* () */0;
}

function pp_get_ellipsis_text(state, _) {
  return state[/* pp_ellipsis */15];
}

function pp_limit(n) {
  if (n < 1000000010) {
    return n;
  } else {
    return 1000000009;
  }
}

function pp_set_max_indent(state, n) {
  var state$1 = state;
  var n$1 = state[/* pp_margin */5] - n | 0;
  if (n$1 >= 1) {
    var n$2 = pp_limit(n$1);
    state$1[/* pp_min_space_left */6] = n$2;
    state$1[/* pp_max_indent */7] = state$1[/* pp_margin */5] - state$1[/* pp_min_space_left */6] | 0;
    return pp_rinit(state$1);
  } else {
    return 0;
  }
}

function pp_get_max_indent(state, _) {
  return state[/* pp_max_indent */7];
}

function pp_set_margin(state, n) {
  if (n >= 1) {
    var n$1 = pp_limit(n);
    state[/* pp_margin */5] = n$1;
    var new_max_indent = state[/* pp_max_indent */7] <= state[/* pp_margin */5] ? state[/* pp_max_indent */7] : Pervasives.max(Pervasives.max(state[/* pp_margin */5] - state[/* pp_min_space_left */6] | 0, state[/* pp_margin */5] / 2 | 0), 1);
    return pp_set_max_indent(state, new_max_indent);
  } else {
    return 0;
  }
}

function pp_get_margin(state, _) {
  return state[/* pp_margin */5];
}

function pp_set_formatter_out_functions(state, param) {
  state[/* pp_out_string */16] = param[/* out_string */0];
  state[/* pp_out_flush */17] = param[/* out_flush */1];
  state[/* pp_out_newline */18] = param[/* out_newline */2];
  state[/* pp_out_spaces */19] = param[/* out_spaces */3];
  return /* () */0;
}

function pp_get_formatter_out_functions(state, _) {
  return /* record */[
          /* out_string */state[/* pp_out_string */16],
          /* out_flush */state[/* pp_out_flush */17],
          /* out_newline */state[/* pp_out_newline */18],
          /* out_spaces */state[/* pp_out_spaces */19]
        ];
}

function pp_set_formatter_output_functions(state, f, g) {
  state[/* pp_out_string */16] = f;
  state[/* pp_out_flush */17] = g;
  return /* () */0;
}

function pp_get_formatter_output_functions(state, _) {
  return /* tuple */[
          state[/* pp_out_string */16],
          state[/* pp_out_flush */17]
        ];
}

function pp_set_all_formatter_output_functions(state, f, g, h, i) {
  pp_set_formatter_output_functions(state, f, g);
  state[/* pp_out_newline */18] = h;
  state[/* pp_out_spaces */19] = i;
  return /* () */0;
}

function pp_get_all_formatter_output_functions(state, _) {
  return /* tuple */[
          state[/* pp_out_string */16],
          state[/* pp_out_flush */17],
          state[/* pp_out_newline */18],
          state[/* pp_out_spaces */19]
        ];
}

function display_newline(state, _) {
  return Curry._3(state[/* pp_out_string */16], "\n", 0, 1);
}

var blank_line = Caml_string.bytes_to_string(Bytes.make(80, /* " " */32));

function display_blanks(state, _n) {
  while(true) {
    var n = _n;
    if (n > 0) {
      if (n <= 80) {
        return Curry._3(state[/* pp_out_string */16], blank_line, 0, n);
      } else {
        Curry._3(state[/* pp_out_string */16], blank_line, 0, 80);
        _n = n - 80 | 0;
        continue ;
        
      }
    } else {
      return 0;
    }
  };
}

function pp_set_formatter_out_channel(state, os) {
  state[/* pp_out_string */16] = (function (param, param$1, param$2) {
      return Pervasives.output_substring(os, param, param$1, param$2);
    });
  state[/* pp_out_flush */17] = (function () {
      return Caml_io.caml_ml_flush(os);
    });
  state[/* pp_out_newline */18] = (function (param) {
      return display_newline(state, param);
    });
  state[/* pp_out_spaces */19] = (function (param) {
      return display_blanks(state, param);
    });
  return /* () */0;
}

function default_pp_mark_open_tag(s) {
  return "<" + (s + ">");
}

function default_pp_mark_close_tag(s) {
  return "</" + (s + ">");
}

function default_pp_print_open_tag() {
  return /* () */0;
}

function default_pp_print_close_tag() {
  return /* () */0;
}

function pp_make_formatter(f, g, h, i) {
  var pp_q = /* record */[
    /* insert : Nil */0,
    /* body : Nil */0
  ];
  var sys_tok = /* record */[
    /* elem_size */-1,
    /* token : Pp_begin */Block.__(3, [
        0,
        /* Pp_hovbox */3
      ]),
    /* length */0
  ];
  add_queue(sys_tok, pp_q);
  var sys_scan_stack_000 = /* Scan_elem */[
    1,
    sys_tok
  ];
  var sys_scan_stack = /* :: */[
    sys_scan_stack_000,
    scan_stack_bottom
  ];
  return /* record */[
          /* pp_scan_stack */sys_scan_stack,
          /* pp_format_stack : [] */0,
          /* pp_tbox_stack : [] */0,
          /* pp_tag_stack : [] */0,
          /* pp_mark_stack : [] */0,
          /* pp_margin */78,
          /* pp_min_space_left */10,
          /* pp_max_indent */68,
          /* pp_space_left */78,
          /* pp_current_indent */0,
          /* pp_is_new_line : true */1,
          /* pp_left_total */1,
          /* pp_right_total */1,
          /* pp_curr_depth */1,
          /* pp_max_boxes */Pervasives.max_int,
          /* pp_ellipsis */".",
          /* pp_out_string */f,
          /* pp_out_flush */g,
          /* pp_out_newline */h,
          /* pp_out_spaces */i,
          /* pp_print_tags : false */0,
          /* pp_mark_tags : false */0,
          /* pp_mark_open_tag */default_pp_mark_open_tag,
          /* pp_mark_close_tag */default_pp_mark_close_tag,
          /* pp_print_open_tag */default_pp_print_open_tag,
          /* pp_print_close_tag */default_pp_print_close_tag,
          /* pp_queue */pp_q
        ];
}

function make_formatter(output, flush) {
  var ppf = pp_make_formatter(output, flush, (function () {
          return /* () */0;
        }), (function () {
          return /* () */0;
        }));
  ppf[/* pp_out_newline */18] = (function (param) {
      return display_newline(ppf, param);
    });
  ppf[/* pp_out_spaces */19] = (function (param) {
      return display_blanks(ppf, param);
    });
  return ppf;
}

function formatter_of_out_channel(oc) {
  return make_formatter((function (param, param$1, param$2) {
                return Pervasives.output_substring(oc, param, param$1, param$2);
              }), (function () {
                return Caml_io.caml_ml_flush(oc);
              }));
}

function formatter_of_buffer(b) {
  return make_formatter((function (param, param$1, param$2) {
                return Buffer.add_substring(b, param, param$1, param$2);
              }), (function () {
                return /* () */0;
              }));
}

var stdbuf = Buffer.create(512);

var std_formatter = formatter_of_out_channel(Pervasives.stdout);

var err_formatter = formatter_of_out_channel(Pervasives.stderr);

var str_formatter = formatter_of_buffer(stdbuf);

function flush_str_formatter() {
  pp_flush_queue(str_formatter, /* false */0);
  var s = Buffer.contents(stdbuf);
  Buffer.reset(stdbuf);
  return s;
}

function flush_buf_formatter(buf, ppf) {
  pp_flush_queue(ppf, /* false */0);
  var s = Buffer.contents(buf);
  Buffer.reset(buf);
  return s;
}

function open_hbox(param) {
  return pp_open_hbox(std_formatter, param);
}

function open_vbox(param) {
  return pp_open_vbox(std_formatter, param);
}

function open_hvbox(param) {
  return pp_open_hvbox(std_formatter, param);
}

function open_hovbox(param) {
  return pp_open_hovbox(std_formatter, param);
}

function open_box(param) {
  return pp_open_box(std_formatter, param);
}

function close_box(param) {
  return pp_close_box(std_formatter, param);
}

function open_tag(param) {
  return pp_open_tag(std_formatter, param);
}

function close_tag(param) {
  return pp_close_tag(std_formatter, param);
}

function print_as(param, param$1) {
  return pp_print_as(std_formatter, param, param$1);
}

function print_string(param) {
  return pp_print_string(std_formatter, param);
}

function print_int(param) {
  return pp_print_string(std_formatter, "" + param);
}

function print_float(param) {
  return pp_print_string(std_formatter, Pervasives.string_of_float(param));
}

function print_char(param) {
  return pp_print_char(std_formatter, param);
}

function print_bool(param) {
  return pp_print_string(std_formatter, param ? "true" : "false");
}

function print_break(param, param$1) {
  return pp_print_break(std_formatter, param, param$1);
}

function print_cut() {
  return pp_print_break(std_formatter, 0, 0);
}

function print_space() {
  return pp_print_break(std_formatter, 1, 0);
}

function force_newline(param) {
  return pp_force_newline(std_formatter, param);
}

function print_flush(param) {
  return pp_print_flush(std_formatter, param);
}

function print_newline(param) {
  return pp_print_newline(std_formatter, param);
}

function print_if_newline(param) {
  return pp_print_if_newline(std_formatter, param);
}

function open_tbox(param) {
  return pp_open_tbox(std_formatter, param);
}

function close_tbox(param) {
  return pp_close_tbox(std_formatter, param);
}

function print_tbreak(param, param$1) {
  return pp_print_tbreak(std_formatter, param, param$1);
}

function set_tab(param) {
  return pp_set_tab(std_formatter, param);
}

function print_tab() {
  return pp_print_tbreak(std_formatter, 0, 0);
}

function set_margin(param) {
  return pp_set_margin(std_formatter, param);
}

function get_margin() {
  return std_formatter[/* pp_margin */5];
}

function set_max_indent(param) {
  return pp_set_max_indent(std_formatter, param);
}

function get_max_indent() {
  return std_formatter[/* pp_max_indent */7];
}

function set_max_boxes(param) {
  return pp_set_max_boxes(std_formatter, param);
}

function get_max_boxes() {
  return std_formatter[/* pp_max_boxes */14];
}

function over_max_boxes(param) {
  return pp_over_max_boxes(std_formatter, param);
}

function set_ellipsis_text(param) {
  std_formatter[/* pp_ellipsis */15] = param;
  return /* () */0;
}

function get_ellipsis_text() {
  return std_formatter[/* pp_ellipsis */15];
}

function set_formatter_out_channel(param) {
  return pp_set_formatter_out_channel(std_formatter, param);
}

function set_formatter_out_functions(param) {
  return pp_set_formatter_out_functions(std_formatter, param);
}

function get_formatter_out_functions(param) {
  return pp_get_formatter_out_functions(std_formatter, param);
}

function set_formatter_output_functions(param, param$1) {
  return pp_set_formatter_output_functions(std_formatter, param, param$1);
}

function get_formatter_output_functions(param) {
  return pp_get_formatter_output_functions(std_formatter, param);
}

function set_all_formatter_output_functions(param, param$1, param$2, param$3) {
  return pp_set_all_formatter_output_functions(std_formatter, param, param$1, param$2, param$3);
}

function get_all_formatter_output_functions(param) {
  return pp_get_all_formatter_output_functions(std_formatter, param);
}

function set_formatter_tag_functions(param) {
  return pp_set_formatter_tag_functions(std_formatter, param);
}

function get_formatter_tag_functions(param) {
  return pp_get_formatter_tag_functions(std_formatter, param);
}

function set_print_tags(param) {
  std_formatter[/* pp_print_tags */20] = param;
  return /* () */0;
}

function get_print_tags() {
  return std_formatter[/* pp_print_tags */20];
}

function set_mark_tags(param) {
  std_formatter[/* pp_mark_tags */21] = param;
  return /* () */0;
}

function get_mark_tags() {
  return std_formatter[/* pp_mark_tags */21];
}

function set_tags(param) {
  return pp_set_tags(std_formatter, param);
}

function compute_tag(output, tag_acc) {
  var buf = Buffer.create(16);
  var ppf = formatter_of_buffer(buf);
  Curry._2(output, ppf, tag_acc);
  pp_print_flush(ppf, /* () */0);
  var len = buf[/* position */1];
  if (len < 2) {
    return Buffer.contents(buf);
  } else {
    return Buffer.sub(buf, 1, len - 2 | 0);
  }
}

function output_formatting_lit(ppf, fmting_lit) {
  if (typeof fmting_lit === "number") {
    switch (fmting_lit) {
      case 0 : 
          return pp_close_box(ppf, /* () */0);
      case 1 : 
          return pp_close_tag(ppf, /* () */0);
      case 2 : 
          return pp_print_flush(ppf, /* () */0);
      case 3 : 
          return pp_force_newline(ppf, /* () */0);
      case 4 : 
          return pp_print_newline(ppf, /* () */0);
      case 5 : 
          return pp_print_char(ppf, /* "@" */64);
      case 6 : 
          return pp_print_char(ppf, /* "%" */37);
      
    }
  } else {
    switch (fmting_lit.tag | 0) {
      case 0 : 
          return pp_print_break(ppf, fmting_lit[1], fmting_lit[2]);
      case 1 : 
          return /* () */0;
      case 2 : 
          pp_print_char(ppf, /* "@" */64);
          return pp_print_char(ppf, fmting_lit[0]);
      
    }
  }
}

function output_acc(ppf, acc) {
  var exit = 0;
  var p;
  var size;
  var s;
  var p$1;
  var size$1;
  var c;
  if (typeof acc === "number") {
    return /* () */0;
  } else {
    switch (acc.tag | 0) {
      case 0 : 
          output_acc(ppf, acc[0]);
          return output_formatting_lit(ppf, acc[1]);
      case 1 : 
          var match = acc[1];
          var p$2 = acc[0];
          output_acc(ppf, p$2);
          if (match.tag) {
            var match$1 = CamlinternalFormat.open_box_of_string(compute_tag(output_acc, match[0]));
            return pp_open_box_gen(ppf, match$1[0], match$1[1]);
          } else {
            return pp_open_tag(ppf, compute_tag(output_acc, match[0]));
          }
          break;
      case 2 : 
          var p$3 = acc[0];
          var exit$1 = 0;
          if (typeof p$3 === "number") {
            exit$1 = 3;
          } else if (p$3.tag) {
            exit$1 = 3;
          } else {
            var match$2 = p$3[1];
            if (typeof match$2 === "number") {
              exit$1 = 3;
            } else if (match$2.tag === 1) {
              p = p$3[0];
              size = match$2[1];
              s = acc[1];
              exit = 1;
            } else {
              exit$1 = 3;
            }
          }
          if (exit$1 === 3) {
            output_acc(ppf, p$3);
            return pp_print_string(ppf, acc[1]);
          }
          break;
      case 3 : 
          var p$4 = acc[0];
          var exit$2 = 0;
          if (typeof p$4 === "number") {
            exit$2 = 3;
          } else if (p$4.tag) {
            exit$2 = 3;
          } else {
            var match$3 = p$4[1];
            if (typeof match$3 === "number") {
              exit$2 = 3;
            } else if (match$3.tag === 1) {
              p$1 = p$4[0];
              size$1 = match$3[1];
              c = acc[1];
              exit = 2;
            } else {
              exit$2 = 3;
            }
          }
          if (exit$2 === 3) {
            output_acc(ppf, p$4);
            return pp_print_char(ppf, acc[1]);
          }
          break;
      case 4 : 
          var p$5 = acc[0];
          var exit$3 = 0;
          if (typeof p$5 === "number") {
            exit$3 = 3;
          } else if (p$5.tag) {
            exit$3 = 3;
          } else {
            var match$4 = p$5[1];
            if (typeof match$4 === "number") {
              exit$3 = 3;
            } else if (match$4.tag === 1) {
              p = p$5[0];
              size = match$4[1];
              s = acc[1];
              exit = 1;
            } else {
              exit$3 = 3;
            }
          }
          if (exit$3 === 3) {
            output_acc(ppf, p$5);
            return pp_print_string(ppf, acc[1]);
          }
          break;
      case 5 : 
          var p$6 = acc[0];
          var exit$4 = 0;
          if (typeof p$6 === "number") {
            exit$4 = 3;
          } else if (p$6.tag) {
            exit$4 = 3;
          } else {
            var match$5 = p$6[1];
            if (typeof match$5 === "number") {
              exit$4 = 3;
            } else if (match$5.tag === 1) {
              p$1 = p$6[0];
              size$1 = match$5[1];
              c = acc[1];
              exit = 2;
            } else {
              exit$4 = 3;
            }
          }
          if (exit$4 === 3) {
            output_acc(ppf, p$6);
            return pp_print_char(ppf, acc[1]);
          }
          break;
      case 6 : 
          output_acc(ppf, acc[0]);
          return Curry._1(acc[1], ppf);
      case 7 : 
          output_acc(ppf, acc[0]);
          return pp_print_flush(ppf, /* () */0);
      case 8 : 
          output_acc(ppf, acc[0]);
          throw [
                Caml_builtin_exceptions.invalid_argument,
                acc[1]
              ];
      
    }
  }
  switch (exit) {
    case 1 : 
        output_acc(ppf, p);
        return pp_print_as_size(ppf, size, s);
    case 2 : 
        output_acc(ppf, p$1);
        return pp_print_as_size(ppf, size$1, Caml_string.bytes_to_string(Bytes.make(1, c)));
    
  }
}

function strput_acc(ppf, acc) {
  var exit = 0;
  var p;
  var size;
  var s;
  var p$1;
  var size$1;
  var c;
  if (typeof acc === "number") {
    return /* () */0;
  } else {
    switch (acc.tag | 0) {
      case 0 : 
          strput_acc(ppf, acc[0]);
          return output_formatting_lit(ppf, acc[1]);
      case 1 : 
          var match = acc[1];
          var p$2 = acc[0];
          strput_acc(ppf, p$2);
          if (match.tag) {
            var match$1 = CamlinternalFormat.open_box_of_string(compute_tag(strput_acc, match[0]));
            return pp_open_box_gen(ppf, match$1[0], match$1[1]);
          } else {
            return pp_open_tag(ppf, compute_tag(strput_acc, match[0]));
          }
          break;
      case 2 : 
          var p$3 = acc[0];
          var exit$1 = 0;
          if (typeof p$3 === "number") {
            exit$1 = 3;
          } else if (p$3.tag) {
            exit$1 = 3;
          } else {
            var match$2 = p$3[1];
            if (typeof match$2 === "number") {
              exit$1 = 3;
            } else if (match$2.tag === 1) {
              p = p$3[0];
              size = match$2[1];
              s = acc[1];
              exit = 1;
            } else {
              exit$1 = 3;
            }
          }
          if (exit$1 === 3) {
            strput_acc(ppf, p$3);
            return pp_print_string(ppf, acc[1]);
          }
          break;
      case 3 : 
          var p$4 = acc[0];
          var exit$2 = 0;
          if (typeof p$4 === "number") {
            exit$2 = 3;
          } else if (p$4.tag) {
            exit$2 = 3;
          } else {
            var match$3 = p$4[1];
            if (typeof match$3 === "number") {
              exit$2 = 3;
            } else if (match$3.tag === 1) {
              p$1 = p$4[0];
              size$1 = match$3[1];
              c = acc[1];
              exit = 2;
            } else {
              exit$2 = 3;
            }
          }
          if (exit$2 === 3) {
            strput_acc(ppf, p$4);
            return pp_print_char(ppf, acc[1]);
          }
          break;
      case 4 : 
          var p$5 = acc[0];
          var exit$3 = 0;
          if (typeof p$5 === "number") {
            exit$3 = 3;
          } else if (p$5.tag) {
            exit$3 = 3;
          } else {
            var match$4 = p$5[1];
            if (typeof match$4 === "number") {
              exit$3 = 3;
            } else if (match$4.tag === 1) {
              p = p$5[0];
              size = match$4[1];
              s = acc[1];
              exit = 1;
            } else {
              exit$3 = 3;
            }
          }
          if (exit$3 === 3) {
            strput_acc(ppf, p$5);
            return pp_print_string(ppf, acc[1]);
          }
          break;
      case 5 : 
          var p$6 = acc[0];
          var exit$4 = 0;
          if (typeof p$6 === "number") {
            exit$4 = 3;
          } else if (p$6.tag) {
            exit$4 = 3;
          } else {
            var match$5 = p$6[1];
            if (typeof match$5 === "number") {
              exit$4 = 3;
            } else if (match$5.tag === 1) {
              p$1 = p$6[0];
              size$1 = match$5[1];
              c = acc[1];
              exit = 2;
            } else {
              exit$4 = 3;
            }
          }
          if (exit$4 === 3) {
            strput_acc(ppf, p$6);
            return pp_print_char(ppf, acc[1]);
          }
          break;
      case 6 : 
          var p$7 = acc[0];
          var exit$5 = 0;
          if (typeof p$7 === "number") {
            exit$5 = 3;
          } else if (p$7.tag) {
            exit$5 = 3;
          } else {
            var match$6 = p$7[1];
            if (typeof match$6 === "number") {
              exit$5 = 3;
            } else if (match$6.tag === 1) {
              strput_acc(ppf, p$7[0]);
              return pp_print_as_size(ppf, match$6[1], Curry._1(acc[1], /* () */0));
            } else {
              exit$5 = 3;
            }
          }
          if (exit$5 === 3) {
            strput_acc(ppf, p$7);
            return pp_print_string(ppf, Curry._1(acc[1], /* () */0));
          }
          break;
      case 7 : 
          strput_acc(ppf, acc[0]);
          return pp_print_flush(ppf, /* () */0);
      case 8 : 
          strput_acc(ppf, acc[0]);
          throw [
                Caml_builtin_exceptions.invalid_argument,
                acc[1]
              ];
      
    }
  }
  switch (exit) {
    case 1 : 
        strput_acc(ppf, p);
        return pp_print_as_size(ppf, size, s);
    case 2 : 
        strput_acc(ppf, p$1);
        return pp_print_as_size(ppf, size$1, Caml_string.bytes_to_string(Bytes.make(1, c)));
    
  }
}

function kfprintf(k, o, param) {
  return CamlinternalFormat.make_printf((function (o, acc) {
                output_acc(o, acc);
                return Curry._1(k, o);
              }), o, /* End_of_acc */0, param[0]);
}

function ikfprintf(k, x, param) {
  return CamlinternalFormat.make_printf((function (_, _$1) {
                return Curry._1(k, x);
              }), x, /* End_of_acc */0, param[0]);
}

function fprintf(ppf, fmt) {
  return kfprintf((function () {
                return /* () */0;
              }), ppf, fmt);
}

function ifprintf(ppf, fmt) {
  return ikfprintf((function () {
                return /* () */0;
              }), ppf, fmt);
}

function printf(fmt) {
  return fprintf(std_formatter, fmt);
}

function eprintf(fmt) {
  return fprintf(err_formatter, fmt);
}

function ksprintf(k, param) {
  var b = Buffer.create(512);
  var ppf = formatter_of_buffer(b);
  var k$prime = function (_, acc) {
    strput_acc(ppf, acc);
    return Curry._1(k, flush_buf_formatter(b, ppf));
  };
  return CamlinternalFormat.make_printf(k$prime, /* () */0, /* End_of_acc */0, param[0]);
}

function sprintf(fmt) {
  return ksprintf((function (s) {
                return s;
              }), fmt);
}

function asprintf(param) {
  var b = Buffer.create(512);
  var ppf = formatter_of_buffer(b);
  var k$prime = function (ppf, acc) {
    output_acc(ppf, acc);
    pp_flush_queue(ppf, /* false */0);
    return flush_buf_formatter(b, ppf);
  };
  return CamlinternalFormat.make_printf(k$prime, ppf, /* End_of_acc */0, param[0]);
}

function bprintf(b, param) {
  var k = function (ppf, acc) {
    output_acc(ppf, acc);
    return pp_flush_queue(ppf, /* false */0);
  };
  return CamlinternalFormat.make_printf(k, formatter_of_buffer(b), /* End_of_acc */0, param[0]);
}

Pervasives.at_exit(print_flush);

var kprintf = ksprintf;

exports.open_box                              = open_box;
exports.close_box                             = close_box;
exports.print_string                          = print_string;
exports.print_as                              = print_as;
exports.print_int                             = print_int;
exports.print_float                           = print_float;
exports.print_char                            = print_char;
exports.print_bool                            = print_bool;
exports.print_space                           = print_space;
exports.print_cut                             = print_cut;
exports.print_break                           = print_break;
exports.print_flush                           = print_flush;
exports.print_newline                         = print_newline;
exports.force_newline                         = force_newline;
exports.print_if_newline                      = print_if_newline;
exports.set_margin                            = set_margin;
exports.get_margin                            = get_margin;
exports.set_max_indent                        = set_max_indent;
exports.get_max_indent                        = get_max_indent;
exports.set_max_boxes                         = set_max_boxes;
exports.get_max_boxes                         = get_max_boxes;
exports.over_max_boxes                        = over_max_boxes;
exports.open_hbox                             = open_hbox;
exports.open_vbox                             = open_vbox;
exports.open_hvbox                            = open_hvbox;
exports.open_hovbox                           = open_hovbox;
exports.open_tbox                             = open_tbox;
exports.close_tbox                            = close_tbox;
exports.print_tbreak                          = print_tbreak;
exports.set_tab                               = set_tab;
exports.print_tab                             = print_tab;
exports.set_ellipsis_text                     = set_ellipsis_text;
exports.get_ellipsis_text                     = get_ellipsis_text;
exports.open_tag                              = open_tag;
exports.close_tag                             = close_tag;
exports.set_tags                              = set_tags;
exports.set_print_tags                        = set_print_tags;
exports.set_mark_tags                         = set_mark_tags;
exports.get_print_tags                        = get_print_tags;
exports.get_mark_tags                         = get_mark_tags;
exports.set_formatter_out_channel             = set_formatter_out_channel;
exports.set_formatter_output_functions        = set_formatter_output_functions;
exports.get_formatter_output_functions        = get_formatter_output_functions;
exports.set_formatter_out_functions           = set_formatter_out_functions;
exports.get_formatter_out_functions           = get_formatter_out_functions;
exports.set_formatter_tag_functions           = set_formatter_tag_functions;
exports.get_formatter_tag_functions           = get_formatter_tag_functions;
exports.formatter_of_out_channel              = formatter_of_out_channel;
exports.std_formatter                         = std_formatter;
exports.err_formatter                         = err_formatter;
exports.formatter_of_buffer                   = formatter_of_buffer;
exports.stdbuf                                = stdbuf;
exports.str_formatter                         = str_formatter;
exports.flush_str_formatter                   = flush_str_formatter;
exports.make_formatter                        = make_formatter;
exports.pp_open_hbox                          = pp_open_hbox;
exports.pp_open_vbox                          = pp_open_vbox;
exports.pp_open_hvbox                         = pp_open_hvbox;
exports.pp_open_hovbox                        = pp_open_hovbox;
exports.pp_open_box                           = pp_open_box;
exports.pp_close_box                          = pp_close_box;
exports.pp_open_tag                           = pp_open_tag;
exports.pp_close_tag                          = pp_close_tag;
exports.pp_print_string                       = pp_print_string;
exports.pp_print_as                           = pp_print_as;
exports.pp_print_int                          = pp_print_int;
exports.pp_print_float                        = pp_print_float;
exports.pp_print_char                         = pp_print_char;
exports.pp_print_bool                         = pp_print_bool;
exports.pp_print_break                        = pp_print_break;
exports.pp_print_cut                          = pp_print_cut;
exports.pp_print_space                        = pp_print_space;
exports.pp_force_newline                      = pp_force_newline;
exports.pp_print_flush                        = pp_print_flush;
exports.pp_print_newline                      = pp_print_newline;
exports.pp_print_if_newline                   = pp_print_if_newline;
exports.pp_open_tbox                          = pp_open_tbox;
exports.pp_close_tbox                         = pp_close_tbox;
exports.pp_print_tbreak                       = pp_print_tbreak;
exports.pp_set_tab                            = pp_set_tab;
exports.pp_print_tab                          = pp_print_tab;
exports.pp_set_tags                           = pp_set_tags;
exports.pp_set_print_tags                     = pp_set_print_tags;
exports.pp_set_mark_tags                      = pp_set_mark_tags;
exports.pp_get_print_tags                     = pp_get_print_tags;
exports.pp_get_mark_tags                      = pp_get_mark_tags;
exports.pp_set_margin                         = pp_set_margin;
exports.pp_get_margin                         = pp_get_margin;
exports.pp_set_max_indent                     = pp_set_max_indent;
exports.pp_get_max_indent                     = pp_get_max_indent;
exports.pp_set_max_boxes                      = pp_set_max_boxes;
exports.pp_get_max_boxes                      = pp_get_max_boxes;
exports.pp_over_max_boxes                     = pp_over_max_boxes;
exports.pp_set_ellipsis_text                  = pp_set_ellipsis_text;
exports.pp_get_ellipsis_text                  = pp_get_ellipsis_text;
exports.pp_set_formatter_out_channel          = pp_set_formatter_out_channel;
exports.pp_set_formatter_output_functions     = pp_set_formatter_output_functions;
exports.pp_get_formatter_output_functions     = pp_get_formatter_output_functions;
exports.pp_set_formatter_tag_functions        = pp_set_formatter_tag_functions;
exports.pp_get_formatter_tag_functions        = pp_get_formatter_tag_functions;
exports.pp_set_formatter_out_functions        = pp_set_formatter_out_functions;
exports.pp_get_formatter_out_functions        = pp_get_formatter_out_functions;
exports.pp_print_list                         = pp_print_list;
exports.pp_print_text                         = pp_print_text;
exports.fprintf                               = fprintf;
exports.printf                                = printf;
exports.eprintf                               = eprintf;
exports.sprintf                               = sprintf;
exports.asprintf                              = asprintf;
exports.ifprintf                              = ifprintf;
exports.kfprintf                              = kfprintf;
exports.ikfprintf                             = ikfprintf;
exports.ksprintf                              = ksprintf;
exports.bprintf                               = bprintf;
exports.kprintf                               = kprintf;
exports.set_all_formatter_output_functions    = set_all_formatter_output_functions;
exports.get_all_formatter_output_functions    = get_all_formatter_output_functions;
exports.pp_set_all_formatter_output_functions = pp_set_all_formatter_output_functions;
exports.pp_get_all_formatter_output_functions = pp_get_all_formatter_output_functions;
/* blank_line Not a pure module */

},{"./block.js":"stdlib/block","./buffer.js":"stdlib/buffer","./bytes.js":"stdlib/bytes","./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./caml_exceptions.js":"stdlib/caml_exceptions","./caml_io.js":"stdlib/caml_io","./caml_obj.js":"stdlib/caml_obj","./caml_string.js":"stdlib/caml_string","./camlinternalFormat.js":"stdlib/camlinternalFormat","./curry.js":"stdlib/curry","./pervasives.js":"stdlib/pervasives","./string.js":"stdlib/string"}],"stdlib/gc":[function(require,module,exports){
'use strict';

var Sys     = require("./sys.js");
var Block   = require("./block.js");
var Curry   = require("./curry.js");
var Printf  = require("./printf.js");
var Caml_gc = require("./caml_gc.js");

function print_stat(c) {
  var st = Caml_gc.caml_gc_stat(/* () */0);
  Curry._1(Printf.fprintf(c, /* Format */[
            /* String_literal */Block.__(11, [
                "minor_words: ",
                /* Float */Block.__(8, [
                    /* Float_f */0,
                    /* No_padding */0,
                    /* Lit_precision */[0],
                    /* Char_literal */Block.__(12, [
                        /* "\n" */10,
                        /* End_of_format */0
                      ])
                  ])
              ]),
            "minor_words: %.0f\n"
          ]), st[/* minor_words */0]);
  Curry._1(Printf.fprintf(c, /* Format */[
            /* String_literal */Block.__(11, [
                "promoted_words: ",
                /* Float */Block.__(8, [
                    /* Float_f */0,
                    /* No_padding */0,
                    /* Lit_precision */[0],
                    /* Char_literal */Block.__(12, [
                        /* "\n" */10,
                        /* End_of_format */0
                      ])
                  ])
              ]),
            "promoted_words: %.0f\n"
          ]), st[/* promoted_words */1]);
  Curry._1(Printf.fprintf(c, /* Format */[
            /* String_literal */Block.__(11, [
                "major_words: ",
                /* Float */Block.__(8, [
                    /* Float_f */0,
                    /* No_padding */0,
                    /* Lit_precision */[0],
                    /* Char_literal */Block.__(12, [
                        /* "\n" */10,
                        /* End_of_format */0
                      ])
                  ])
              ]),
            "major_words: %.0f\n"
          ]), st[/* major_words */2]);
  Curry._1(Printf.fprintf(c, /* Format */[
            /* String_literal */Block.__(11, [
                "minor_collections: ",
                /* Int */Block.__(4, [
                    /* Int_d */0,
                    /* No_padding */0,
                    /* No_precision */0,
                    /* Char_literal */Block.__(12, [
                        /* "\n" */10,
                        /* End_of_format */0
                      ])
                  ])
              ]),
            "minor_collections: %d\n"
          ]), st[/* minor_collections */3]);
  Curry._1(Printf.fprintf(c, /* Format */[
            /* String_literal */Block.__(11, [
                "major_collections: ",
                /* Int */Block.__(4, [
                    /* Int_d */0,
                    /* No_padding */0,
                    /* No_precision */0,
                    /* Char_literal */Block.__(12, [
                        /* "\n" */10,
                        /* End_of_format */0
                      ])
                  ])
              ]),
            "major_collections: %d\n"
          ]), st[/* major_collections */4]);
  Curry._1(Printf.fprintf(c, /* Format */[
            /* String_literal */Block.__(11, [
                "heap_words: ",
                /* Int */Block.__(4, [
                    /* Int_d */0,
                    /* No_padding */0,
                    /* No_precision */0,
                    /* Char_literal */Block.__(12, [
                        /* "\n" */10,
                        /* End_of_format */0
                      ])
                  ])
              ]),
            "heap_words: %d\n"
          ]), st[/* heap_words */5]);
  Curry._1(Printf.fprintf(c, /* Format */[
            /* String_literal */Block.__(11, [
                "heap_chunks: ",
                /* Int */Block.__(4, [
                    /* Int_d */0,
                    /* No_padding */0,
                    /* No_precision */0,
                    /* Char_literal */Block.__(12, [
                        /* "\n" */10,
                        /* End_of_format */0
                      ])
                  ])
              ]),
            "heap_chunks: %d\n"
          ]), st[/* heap_chunks */6]);
  Curry._1(Printf.fprintf(c, /* Format */[
            /* String_literal */Block.__(11, [
                "top_heap_words: ",
                /* Int */Block.__(4, [
                    /* Int_d */0,
                    /* No_padding */0,
                    /* No_precision */0,
                    /* Char_literal */Block.__(12, [
                        /* "\n" */10,
                        /* End_of_format */0
                      ])
                  ])
              ]),
            "top_heap_words: %d\n"
          ]), st[/* top_heap_words */14]);
  Curry._1(Printf.fprintf(c, /* Format */[
            /* String_literal */Block.__(11, [
                "live_words: ",
                /* Int */Block.__(4, [
                    /* Int_d */0,
                    /* No_padding */0,
                    /* No_precision */0,
                    /* Char_literal */Block.__(12, [
                        /* "\n" */10,
                        /* End_of_format */0
                      ])
                  ])
              ]),
            "live_words: %d\n"
          ]), st[/* live_words */7]);
  Curry._1(Printf.fprintf(c, /* Format */[
            /* String_literal */Block.__(11, [
                "live_blocks: ",
                /* Int */Block.__(4, [
                    /* Int_d */0,
                    /* No_padding */0,
                    /* No_precision */0,
                    /* Char_literal */Block.__(12, [
                        /* "\n" */10,
                        /* End_of_format */0
                      ])
                  ])
              ]),
            "live_blocks: %d\n"
          ]), st[/* live_blocks */8]);
  Curry._1(Printf.fprintf(c, /* Format */[
            /* String_literal */Block.__(11, [
                "free_words: ",
                /* Int */Block.__(4, [
                    /* Int_d */0,
                    /* No_padding */0,
                    /* No_precision */0,
                    /* Char_literal */Block.__(12, [
                        /* "\n" */10,
                        /* End_of_format */0
                      ])
                  ])
              ]),
            "free_words: %d\n"
          ]), st[/* free_words */9]);
  Curry._1(Printf.fprintf(c, /* Format */[
            /* String_literal */Block.__(11, [
                "free_blocks: ",
                /* Int */Block.__(4, [
                    /* Int_d */0,
                    /* No_padding */0,
                    /* No_precision */0,
                    /* Char_literal */Block.__(12, [
                        /* "\n" */10,
                        /* End_of_format */0
                      ])
                  ])
              ]),
            "free_blocks: %d\n"
          ]), st[/* free_blocks */10]);
  Curry._1(Printf.fprintf(c, /* Format */[
            /* String_literal */Block.__(11, [
                "largest_free: ",
                /* Int */Block.__(4, [
                    /* Int_d */0,
                    /* No_padding */0,
                    /* No_precision */0,
                    /* Char_literal */Block.__(12, [
                        /* "\n" */10,
                        /* End_of_format */0
                      ])
                  ])
              ]),
            "largest_free: %d\n"
          ]), st[/* largest_free */11]);
  Curry._1(Printf.fprintf(c, /* Format */[
            /* String_literal */Block.__(11, [
                "fragments: ",
                /* Int */Block.__(4, [
                    /* Int_d */0,
                    /* No_padding */0,
                    /* No_precision */0,
                    /* Char_literal */Block.__(12, [
                        /* "\n" */10,
                        /* End_of_format */0
                      ])
                  ])
              ]),
            "fragments: %d\n"
          ]), st[/* fragments */12]);
  return Curry._1(Printf.fprintf(c, /* Format */[
                  /* String_literal */Block.__(11, [
                      "compactions: ",
                      /* Int */Block.__(4, [
                          /* Int_d */0,
                          /* No_padding */0,
                          /* No_precision */0,
                          /* Char_literal */Block.__(12, [
                              /* "\n" */10,
                              /* End_of_format */0
                            ])
                        ])
                    ]),
                  "compactions: %d\n"
                ]), st[/* compactions */13]);
}

function allocated_bytes() {
  var match = Caml_gc.caml_gc_counters(/* () */0);
  return (match[0] + match[2] - match[1]) * (Sys.word_size / 8 | 0);
}

function call_alarm(arec) {
  if (arec[/* active */0][0]) {
    Caml_gc.caml_final_register(call_alarm, arec);
    return Curry._1(arec[/* f */1], /* () */0);
  } else {
    return 0;
  }
}

function create_alarm(f) {
  var arec_000 = /* active */[/* true */1];
  var arec = /* record */[
    arec_000,
    /* f */f
  ];
  Caml_gc.caml_final_register(call_alarm, arec);
  return arec_000;
}

function delete_alarm(a) {
  a[0] = /* false */0;
  return /* () */0;
}

var finalise = Caml_gc.caml_final_register;

var finalise_release = Caml_gc.caml_final_release;

exports.print_stat       = print_stat;
exports.allocated_bytes  = allocated_bytes;
exports.finalise         = finalise;
exports.finalise_release = finalise_release;
exports.create_alarm     = create_alarm;
exports.delete_alarm     = delete_alarm;
/* No side effect */

},{"./block.js":"stdlib/block","./caml_gc.js":"stdlib/caml_gc","./curry.js":"stdlib/curry","./printf.js":"stdlib/printf","./sys.js":"stdlib/sys"}],"stdlib/genlex":[function(require,module,exports){
'use strict';

var Char                    = require("./char.js");
var List                    = require("./list.js");
var Block                   = require("./block.js");
var Bytes                   = require("./bytes.js");
var Stream                  = require("./stream.js");
var Hashtbl                 = require("./hashtbl.js");
var Caml_int32              = require("./caml_int32.js");
var Caml_format             = require("./caml_format.js");
var Caml_string             = require("./caml_string.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

var initial_buffer = new Array(32);

var buffer = [initial_buffer];

var bufpos = [0];

function reset_buffer() {
  buffer[0] = initial_buffer;
  bufpos[0] = 0;
  return /* () */0;
}

function store(c) {
  if (bufpos[0] >= buffer[0].length) {
    var newbuffer = Caml_string.caml_create_string((bufpos[0] << 1));
    Bytes.blit(buffer[0], 0, newbuffer, 0, bufpos[0]);
    buffer[0] = newbuffer;
  }
  buffer[0][bufpos[0]] = c;
  bufpos[0] = bufpos[0] + 1 | 0;
  return /* () */0;
}

function get_string() {
  var s = Bytes.sub_string(buffer[0], 0, bufpos[0]);
  buffer[0] = initial_buffer;
  return s;
}

function make_lexer(keywords) {
  var kwd_table = Hashtbl.create(/* None */0, 17);
  List.iter((function (s) {
          return Hashtbl.add(kwd_table, s, /* Kwd */Block.__(0, [s]));
        }), keywords);
  var ident_or_keyword = function (id) {
    try {
      return Hashtbl.find(kwd_table, id);
    }
    catch (exn){
      if (exn === Caml_builtin_exceptions.not_found) {
        return /* Ident */Block.__(1, [id]);
      } else {
        throw exn;
      }
    }
  };
  var keyword_or_error = function (c) {
    var s = Caml_string.bytes_to_string(Bytes.make(1, c));
    try {
      return Hashtbl.find(kwd_table, s);
    }
    catch (exn){
      if (exn === Caml_builtin_exceptions.not_found) {
        throw [
              Stream.$$Error,
              "Illegal character " + s
            ];
      } else {
        throw exn;
      }
    }
  };
  var next_token = function (strm__) {
    while(true) {
      var match = Stream.peek(strm__);
      if (match) {
        var c = match[0];
        var exit = 0;
        if (c < 124) {
          var switcher = c - 65 | 0;
          if (switcher > 57 || switcher < 0) {
            if (switcher >= 58) {
              exit = 1;
            } else {
              switch (switcher + 65 | 0) {
                case 9 : 
                case 10 : 
                case 12 : 
                case 13 : 
                case 26 : 
                case 32 : 
                    Stream.junk(strm__);
                    continue ;
                    case 34 : 
                    Stream.junk(strm__);
                    reset_buffer(/* () */0);
                    return /* Some */[/* String */Block.__(4, [string(strm__)])];
                case 39 : 
                    Stream.junk(strm__);
                    var c$1;
                    try {
                      c$1 = $$char(strm__);
                    }
                    catch (exn){
                      if (exn === Stream.Failure) {
                        throw [
                              Stream.$$Error,
                              ""
                            ];
                      } else {
                        throw exn;
                      }
                    }
                    var match$1 = Stream.peek(strm__);
                    if (match$1) {
                      if (match$1[0] !== 39) {
                        throw [
                              Stream.$$Error,
                              ""
                            ];
                      } else {
                        Stream.junk(strm__);
                        return /* Some */[/* Char */Block.__(5, [c$1])];
                      }
                    } else {
                      throw [
                            Stream.$$Error,
                            ""
                          ];
                    }
                    break;
                case 40 : 
                    Stream.junk(strm__);
                    var strm__$1 = strm__;
                    var match$2 = Stream.peek(strm__$1);
                    if (match$2) {
                      if (match$2[0] !== 42) {
                        return /* Some */[keyword_or_error(/* "(" */40)];
                      } else {
                        Stream.junk(strm__$1);
                        comment(strm__$1);
                        return next_token(strm__$1);
                      }
                    } else {
                      return /* Some */[keyword_or_error(/* "(" */40)];
                    }
                case 45 : 
                    Stream.junk(strm__);
                    var strm__$2 = strm__;
                    var match$3 = Stream.peek(strm__$2);
                    if (match$3) {
                      var c$2 = match$3[0];
                      if (c$2 > 57 || c$2 < 48) {
                        reset_buffer(/* () */0);
                        store(/* "-" */45);
                        return ident2(strm__$2);
                      } else {
                        Stream.junk(strm__$2);
                        reset_buffer(/* () */0);
                        store(/* "-" */45);
                        store(c$2);
                        return number(strm__$2);
                      }
                    } else {
                      reset_buffer(/* () */0);
                      store(/* "-" */45);
                      return ident2(strm__$2);
                    }
                case 48 : 
                case 49 : 
                case 50 : 
                case 51 : 
                case 52 : 
                case 53 : 
                case 54 : 
                case 55 : 
                case 56 : 
                case 57 : 
                    exit = 4;
                    break;
                case 0 : 
                case 1 : 
                case 2 : 
                case 3 : 
                case 4 : 
                case 5 : 
                case 6 : 
                case 7 : 
                case 8 : 
                case 11 : 
                case 14 : 
                case 15 : 
                case 16 : 
                case 17 : 
                case 18 : 
                case 19 : 
                case 20 : 
                case 21 : 
                case 22 : 
                case 23 : 
                case 24 : 
                case 25 : 
                case 27 : 
                case 28 : 
                case 29 : 
                case 30 : 
                case 31 : 
                case 41 : 
                case 44 : 
                case 46 : 
                case 59 : 
                    exit = 1;
                    break;
                case 33 : 
                case 35 : 
                case 36 : 
                case 37 : 
                case 38 : 
                case 42 : 
                case 43 : 
                case 47 : 
                case 58 : 
                case 60 : 
                case 61 : 
                case 62 : 
                case 63 : 
                case 64 : 
                    exit = 3;
                    break;
                
              }
            }
          } else {
            var switcher$1 = switcher - 26 | 0;
            if (switcher$1 > 5 || switcher$1 < 0) {
              exit = 2;
            } else {
              switch (switcher$1) {
                case 1 : 
                case 3 : 
                    exit = 3;
                    break;
                case 4 : 
                    exit = 2;
                    break;
                case 0 : 
                case 2 : 
                case 5 : 
                    exit = 1;
                    break;
                
              }
            }
          }
        } else {
          exit = c >= 127 ? (
              c >= 192 ? 2 : 1
            ) : (
              c !== 125 ? 3 : 1
            );
        }
        switch (exit) {
          case 1 : 
              Stream.junk(strm__);
              return /* Some */[keyword_or_error(c)];
          case 2 : 
              Stream.junk(strm__);
              reset_buffer(/* () */0);
              store(c);
              var strm__$3 = strm__;
              while(true) {
                var match$4 = Stream.peek(strm__$3);
                if (match$4) {
                  var c$3 = match$4[0];
                  var exit$1 = 0;
                  if (c$3 >= 91) {
                    var switcher$2 = c$3 - 95 | 0;
                    if (switcher$2 > 27 || switcher$2 < 0) {
                      if (switcher$2 >= 97) {
                        exit$1 = 1;
                      } else {
                        return /* Some */[ident_or_keyword(get_string(/* () */0))];
                      }
                    } else if (switcher$2 !== 1) {
                      exit$1 = 1;
                    } else {
                      return /* Some */[ident_or_keyword(get_string(/* () */0))];
                    }
                  } else if (c$3 >= 48) {
                    if (c$3 > 64 || c$3 < 58) {
                      exit$1 = 1;
                    } else {
                      return /* Some */[ident_or_keyword(get_string(/* () */0))];
                    }
                  } else if (c$3 !== 39) {
                    return /* Some */[ident_or_keyword(get_string(/* () */0))];
                  } else {
                    exit$1 = 1;
                  }
                  if (exit$1 === 1) {
                    Stream.junk(strm__$3);
                    store(c$3);
                    continue ;
                    
                  }
                  
                } else {
                  return /* Some */[ident_or_keyword(get_string(/* () */0))];
                }
              };
          case 3 : 
              Stream.junk(strm__);
              reset_buffer(/* () */0);
              store(c);
              return ident2(strm__);
          case 4 : 
              Stream.junk(strm__);
              reset_buffer(/* () */0);
              store(c);
              return number(strm__);
          
        }
      } else {
        return /* None */0;
      }
    };
  };
  var ident2 = function (strm__) {
    while(true) {
      var match = Stream.peek(strm__);
      if (match) {
        var c = match[0];
        var exit = 0;
        if (c >= 94) {
          var switcher = c - 95 | 0;
          if (switcher > 30 || switcher < 0) {
            if (switcher >= 32) {
              return /* Some */[ident_or_keyword(get_string(/* () */0))];
            } else {
              exit = 1;
            }
          } else if (switcher !== 29) {
            return /* Some */[ident_or_keyword(get_string(/* () */0))];
          } else {
            exit = 1;
          }
        } else if (c >= 65) {
          if (c !== 92) {
            return /* Some */[ident_or_keyword(get_string(/* () */0))];
          } else {
            exit = 1;
          }
        } else if (c >= 33) {
          switch (c - 33 | 0) {
            case 1 : 
            case 6 : 
            case 7 : 
            case 8 : 
            case 11 : 
            case 13 : 
            case 15 : 
            case 16 : 
            case 17 : 
            case 18 : 
            case 19 : 
            case 20 : 
            case 21 : 
            case 22 : 
            case 23 : 
            case 24 : 
            case 26 : 
                return /* Some */[ident_or_keyword(get_string(/* () */0))];
            case 0 : 
            case 2 : 
            case 3 : 
            case 4 : 
            case 5 : 
            case 9 : 
            case 10 : 
            case 12 : 
            case 14 : 
            case 25 : 
            case 27 : 
            case 28 : 
            case 29 : 
            case 30 : 
            case 31 : 
                exit = 1;
                break;
            
          }
        } else {
          return /* Some */[ident_or_keyword(get_string(/* () */0))];
        }
        if (exit === 1) {
          Stream.junk(strm__);
          store(c);
          continue ;
          
        }
        
      } else {
        return /* Some */[ident_or_keyword(get_string(/* () */0))];
      }
    };
  };
  var number = function (strm__) {
    while(true) {
      var match = Stream.peek(strm__);
      var exit = 0;
      if (match) {
        var c = match[0];
        if (c >= 58) {
          if (c !== 69) {
            if (c !== 101) {
              exit = 1;
            } else {
              Stream.junk(strm__);
              store(/* "E" */69);
              return exponent_part(strm__);
            }
          } else {
            Stream.junk(strm__);
            store(/* "E" */69);
            return exponent_part(strm__);
          }
        } else if (c !== 46) {
          if (c >= 48) {
            Stream.junk(strm__);
            store(c);
            continue ;
            
          } else {
            exit = 1;
          }
        } else {
          Stream.junk(strm__);
          store(/* "." */46);
          var strm__$1 = strm__;
          while(true) {
            var match$1 = Stream.peek(strm__$1);
            var exit$1 = 0;
            if (match$1) {
              var c$1 = match$1[0];
              var switcher = c$1 - 69 | 0;
              if (switcher > 32 || switcher < 0) {
                if ((switcher + 21 >>> 0) > 9) {
                  exit$1 = 1;
                } else {
                  Stream.junk(strm__$1);
                  store(c$1);
                  continue ;
                  
                }
              } else if (switcher > 31 || switcher < 1) {
                Stream.junk(strm__$1);
                store(/* "E" */69);
                return exponent_part(strm__$1);
              } else {
                exit$1 = 1;
              }
            } else {
              exit$1 = 1;
            }
            if (exit$1 === 1) {
              return /* Some */[/* Float */Block.__(3, [Caml_format.caml_float_of_string(get_string(/* () */0))])];
            }
            
          };
        }
      } else {
        exit = 1;
      }
      if (exit === 1) {
        return /* Some */[/* Int */Block.__(2, [Caml_format.caml_int_of_string(get_string(/* () */0))])];
      }
      
    };
  };
  var exponent_part = function (strm__) {
    var match = Stream.peek(strm__);
    if (match) {
      var c = match[0];
      if (c !== 43) {
        if (c !== 45) {
          return end_exponent_part(strm__);
        } else {
          Stream.junk(strm__);
          store(c);
          return end_exponent_part(strm__);
        }
      } else {
        Stream.junk(strm__);
        store(c);
        return end_exponent_part(strm__);
      }
    } else {
      return end_exponent_part(strm__);
    }
  };
  var end_exponent_part = function (strm__) {
    while(true) {
      var match = Stream.peek(strm__);
      if (match) {
        var c = match[0];
        if (c > 57 || c < 48) {
          return /* Some */[/* Float */Block.__(3, [Caml_format.caml_float_of_string(get_string(/* () */0))])];
        } else {
          Stream.junk(strm__);
          store(c);
          continue ;
          
        }
      } else {
        return /* Some */[/* Float */Block.__(3, [Caml_format.caml_float_of_string(get_string(/* () */0))])];
      }
    };
  };
  var string = function (strm__) {
    while(true) {
      var match = Stream.peek(strm__);
      if (match) {
        var c = match[0];
        if (c !== 34) {
          if (c !== 92) {
            Stream.junk(strm__);
            store(c);
            continue ;
            
          } else {
            Stream.junk(strm__);
            var c$1;
            try {
              c$1 = $$escape(strm__);
            }
            catch (exn){
              if (exn === Stream.Failure) {
                throw [
                      Stream.$$Error,
                      ""
                    ];
              } else {
                throw exn;
              }
            }
            store(c$1);
            continue ;
            
          }
        } else {
          Stream.junk(strm__);
          return get_string(/* () */0);
        }
      } else {
        throw Stream.Failure;
      }
    };
  };
  var $$char = function (strm__) {
    var match = Stream.peek(strm__);
    if (match) {
      var c = match[0];
      if (c !== 92) {
        Stream.junk(strm__);
        return c;
      } else {
        Stream.junk(strm__);
        try {
          return $$escape(strm__);
        }
        catch (exn){
          if (exn === Stream.Failure) {
            throw [
                  Stream.$$Error,
                  ""
                ];
          } else {
            throw exn;
          }
        }
      }
    } else {
      throw Stream.Failure;
    }
  };
  var $$escape = function (strm__) {
    var match = Stream.peek(strm__);
    if (match) {
      var c1 = match[0];
      if (c1 >= 58) {
        var switcher = c1 - 110 | 0;
        if (switcher > 6 || switcher < 0) {
          Stream.junk(strm__);
          return c1;
        } else {
          switch (switcher) {
            case 0 : 
                Stream.junk(strm__);
                return /* "\n" */10;
            case 4 : 
                Stream.junk(strm__);
                return /* "\r" */13;
            case 1 : 
            case 2 : 
            case 3 : 
            case 5 : 
                Stream.junk(strm__);
                return c1;
            case 6 : 
                Stream.junk(strm__);
                return /* "\t" */9;
            
          }
        }
      } else if (c1 >= 48) {
        Stream.junk(strm__);
        var match$1 = Stream.peek(strm__);
        if (match$1) {
          var c2 = match$1[0];
          if (c2 > 57 || c2 < 48) {
            throw [
                  Stream.$$Error,
                  ""
                ];
          } else {
            Stream.junk(strm__);
            var match$2 = Stream.peek(strm__);
            if (match$2) {
              var c3 = match$2[0];
              if (c3 > 57 || c3 < 48) {
                throw [
                      Stream.$$Error,
                      ""
                    ];
              } else {
                Stream.junk(strm__);
                return Char.chr((Caml_int32.imul(c1 - 48 | 0, 100) + Caml_int32.imul(c2 - 48 | 0, 10) | 0) + (c3 - 48 | 0) | 0);
              }
            } else {
              throw [
                    Stream.$$Error,
                    ""
                  ];
            }
          }
        } else {
          throw [
                Stream.$$Error,
                ""
              ];
        }
      } else {
        Stream.junk(strm__);
        return c1;
      }
    } else {
      throw Stream.Failure;
    }
  };
  var comment = function (strm__) {
    while(true) {
      var match = Stream.peek(strm__);
      if (match) {
        var switcher = match[0] - 40 | 0;
        if (switcher > 2 || switcher < 0) {
          Stream.junk(strm__);
          continue ;
          
        } else {
          switch (switcher) {
            case 0 : 
                Stream.junk(strm__);
                var strm__$1 = strm__;
                var match$1 = Stream.peek(strm__$1);
                if (match$1) {
                  if (match$1[0] !== 42) {
                    Stream.junk(strm__$1);
                    return comment(strm__$1);
                  } else {
                    Stream.junk(strm__$1);
                    comment(strm__$1);
                    return comment(strm__$1);
                  }
                } else {
                  throw Stream.Failure;
                }
            case 1 : 
                Stream.junk(strm__);
                continue ;
                case 2 : 
                Stream.junk(strm__);
                var strm__$2 = strm__;
                while(true) {
                  var match$2 = Stream.peek(strm__$2);
                  if (match$2) {
                    var c = match$2[0];
                    if (c !== 41) {
                      if (c !== 42) {
                        Stream.junk(strm__$2);
                        return comment(strm__$2);
                      } else {
                        Stream.junk(strm__$2);
                        continue ;
                        
                      }
                    } else {
                      Stream.junk(strm__$2);
                      return /* () */0;
                    }
                  } else {
                    throw Stream.Failure;
                  }
                };
            
          }
        }
      } else {
        throw Stream.Failure;
      }
    };
  };
  return (function (input) {
      return Stream.from((function () {
                    return next_token(input);
                  }));
    });
}

exports.make_lexer = make_lexer;
/* Hashtbl Not a pure module */

},{"./block.js":"stdlib/block","./bytes.js":"stdlib/bytes","./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./caml_format.js":"stdlib/caml_format","./caml_int32.js":"stdlib/caml_int32","./caml_string.js":"stdlib/caml_string","./char.js":"stdlib/char","./hashtbl.js":"stdlib/hashtbl","./list.js":"stdlib/list","./stream.js":"stdlib/stream"}],"stdlib/hashtbl":[function(require,module,exports){
'use strict';

var Sys                     = require("./sys.js");
var $$Array                 = require("./array.js");
var Block                   = require("./block.js");
var Bytes                   = require("./bytes.js");
var Curry                   = require("./curry.js");
var Random                  = require("./random.js");
var Caml_obj                = require("./caml_obj.js");
var Caml_sys                = require("./caml_sys.js");
var Caml_hash               = require("./caml_hash.js");
var Caml_array              = require("./caml_array.js");
var Pervasives              = require("./pervasives.js");
var Caml_string             = require("./caml_string.js");
var CamlinternalLazy        = require("./camlinternalLazy.js");
var Caml_missing_polyfill   = require("./caml_missing_polyfill.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function hash(x) {
  return Caml_hash.caml_hash(10, 100, 0, x);
}

function hash_param(n1, n2, x) {
  return Caml_hash.caml_hash(n1, n2, 0, x);
}

function seeded_hash(seed, x) {
  return Caml_hash.caml_hash(10, 100, seed, x);
}

var params;

try {
  params = Caml_sys.caml_sys_getenv("OCAMLRUNPARAM");
}
catch (exn){
  try {
    params = Caml_sys.caml_sys_getenv("CAMLRUNPARAM");
  }
  catch (exn$1){
    params = "";
  }
}

var randomized_default = Bytes.contains(Caml_string.bytes_of_string(params), /* "R" */82);

var randomized = [randomized_default];

function randomize() {
  randomized[0] = /* true */1;
  return /* () */0;
}

var prng = Block.__(246, [(function () {
        return Random.State[/* make_self_init */1](/* () */0);
      })]);

function power_2_above(_x, n) {
  while(true) {
    var x = _x;
    if (x >= n) {
      return x;
    } else if ((x << 1) > Sys.max_array_length) {
      return x;
    } else {
      _x = (x << 1);
      continue ;
      
    }
  };
}

function create($staropt$star, initial_size) {
  var random = $staropt$star ? $staropt$star[0] : randomized[0];
  var s = power_2_above(16, initial_size);
  var seed;
  if (random) {
    var tag = prng.tag | 0;
    seed = Random.State[/* bits */3](tag === 250 ? prng[0] : (
            tag === 246 ? CamlinternalLazy.force_lazy_block(prng) : prng
          ));
  } else {
    seed = 0;
  }
  return /* record */[
          /* size */0,
          /* data */Caml_array.caml_make_vect(s, /* Empty */0),
          /* seed */seed,
          /* initial_size */s
        ];
}

function clear(h) {
  h[/* size */0] = 0;
  var len = h[/* data */1].length;
  for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
    Caml_array.caml_array_set(h[/* data */1], i, /* Empty */0);
  }
  return /* () */0;
}

function reset(h) {
  var len = h[/* data */1].length;
  if (h.length < 4 || len === h[/* initial_size */3]) {
    return clear(h);
  } else {
    h[/* size */0] = 0;
    h[/* data */1] = Caml_array.caml_make_vect(h[/* initial_size */3], /* Empty */0);
    return /* () */0;
  }
}

function copy(h) {
  return /* record */[
          /* size */h[/* size */0],
          /* data */$$Array.copy(h[/* data */1]),
          /* seed */h[/* seed */2],
          /* initial_size */h[/* initial_size */3]
        ];
}

function length(h) {
  return h[/* size */0];
}

function resize(indexfun, h) {
  var odata = h[/* data */1];
  var osize = odata.length;
  var nsize = (osize << 1);
  if (nsize < Sys.max_array_length) {
    var ndata = Caml_array.caml_make_vect(nsize, /* Empty */0);
    h[/* data */1] = ndata;
    var insert_bucket = function (param) {
      if (param) {
        var key = param[0];
        insert_bucket(param[2]);
        var nidx = Curry._2(indexfun, h, key);
        return Caml_array.caml_array_set(ndata, nidx, /* Cons */[
                    key,
                    param[1],
                    Caml_array.caml_array_get(ndata, nidx)
                  ]);
      } else {
        return /* () */0;
      }
    };
    for(var i = 0 ,i_finish = osize - 1 | 0; i <= i_finish; ++i){
      insert_bucket(Caml_array.caml_array_get(odata, i));
    }
    return /* () */0;
  } else {
    return 0;
  }
}

function key_index(h, key) {
  if (h.length >= 3) {
    return Caml_hash.caml_hash(10, 100, h[/* seed */2], key) & (h[/* data */1].length - 1 | 0);
  } else {
    return Caml_missing_polyfill.not_implemented("caml_hash_univ_param not implemented by bucklescript yet\n") % h[/* data */1].length;
  }
}

function add(h, key, info) {
  var i = key_index(h, key);
  var bucket_002 = Caml_array.caml_array_get(h[/* data */1], i);
  var bucket = /* Cons */[
    key,
    info,
    bucket_002
  ];
  Caml_array.caml_array_set(h[/* data */1], i, bucket);
  h[/* size */0] = h[/* size */0] + 1 | 0;
  if (h[/* size */0] > (h[/* data */1].length << 1)) {
    return resize(key_index, h);
  } else {
    return 0;
  }
}

function remove(h, key) {
  var remove_bucket = function (param) {
    if (param) {
      var next = param[2];
      var k = param[0];
      if (Caml_obj.caml_compare(k, key)) {
        return /* Cons */[
                k,
                param[1],
                remove_bucket(next)
              ];
      } else {
        h[/* size */0] = h[/* size */0] - 1 | 0;
        return next;
      }
    } else {
      return /* Empty */0;
    }
  };
  var i = key_index(h, key);
  return Caml_array.caml_array_set(h[/* data */1], i, remove_bucket(Caml_array.caml_array_get(h[/* data */1], i)));
}

function find(h, key) {
  var match = Caml_array.caml_array_get(h[/* data */1], key_index(h, key));
  if (match) {
    if (Caml_obj.caml_compare(key, match[0])) {
      var rest1 = match[2];
      if (rest1) {
        if (Caml_obj.caml_compare(key, rest1[0])) {
          var rest2 = rest1[2];
          if (rest2) {
            if (Caml_obj.caml_compare(key, rest2[0])) {
              var key$1 = key;
              var _param = rest2[2];
              while(true) {
                var param = _param;
                if (param) {
                  if (Caml_obj.caml_compare(key$1, param[0])) {
                    _param = param[2];
                    continue ;
                    
                  } else {
                    return param[1];
                  }
                } else {
                  throw Caml_builtin_exceptions.not_found;
                }
              };
            } else {
              return rest2[1];
            }
          } else {
            throw Caml_builtin_exceptions.not_found;
          }
        } else {
          return rest1[1];
        }
      } else {
        throw Caml_builtin_exceptions.not_found;
      }
    } else {
      return match[1];
    }
  } else {
    throw Caml_builtin_exceptions.not_found;
  }
}

function find_all(h, key) {
  var find_in_bucket = function (_param) {
    while(true) {
      var param = _param;
      if (param) {
        var rest = param[2];
        if (Caml_obj.caml_compare(param[0], key)) {
          _param = rest;
          continue ;
          
        } else {
          return /* :: */[
                  param[1],
                  find_in_bucket(rest)
                ];
        }
      } else {
        return /* [] */0;
      }
    };
  };
  return find_in_bucket(Caml_array.caml_array_get(h[/* data */1], key_index(h, key)));
}

function replace(h, key, info) {
  var replace_bucket = function (param) {
    if (param) {
      var next = param[2];
      var k = param[0];
      if (Caml_obj.caml_compare(k, key)) {
        return /* Cons */[
                k,
                param[1],
                replace_bucket(next)
              ];
      } else {
        return /* Cons */[
                key,
                info,
                next
              ];
      }
    } else {
      throw Caml_builtin_exceptions.not_found;
    }
  };
  var i = key_index(h, key);
  var l = Caml_array.caml_array_get(h[/* data */1], i);
  try {
    return Caml_array.caml_array_set(h[/* data */1], i, replace_bucket(l));
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      Caml_array.caml_array_set(h[/* data */1], i, /* Cons */[
            key,
            info,
            l
          ]);
      h[/* size */0] = h[/* size */0] + 1 | 0;
      if (h[/* size */0] > (h[/* data */1].length << 1)) {
        return resize(key_index, h);
      } else {
        return 0;
      }
    } else {
      throw exn;
    }
  }
}

function mem(h, key) {
  var _param = Caml_array.caml_array_get(h[/* data */1], key_index(h, key));
  while(true) {
    var param = _param;
    if (param) {
      if (Caml_obj.caml_compare(param[0], key)) {
        _param = param[2];
        continue ;
        
      } else {
        return /* true */1;
      }
    } else {
      return /* false */0;
    }
  };
}

function iter(f, h) {
  var do_bucket = function (_param) {
    while(true) {
      var param = _param;
      if (param) {
        Curry._2(f, param[0], param[1]);
        _param = param[2];
        continue ;
        
      } else {
        return /* () */0;
      }
    };
  };
  var d = h[/* data */1];
  for(var i = 0 ,i_finish = d.length - 1 | 0; i <= i_finish; ++i){
    do_bucket(Caml_array.caml_array_get(d, i));
  }
  return /* () */0;
}

function fold(f, h, init) {
  var do_bucket = function (_b, _accu) {
    while(true) {
      var accu = _accu;
      var b = _b;
      if (b) {
        _accu = Curry._3(f, b[0], b[1], accu);
        _b = b[2];
        continue ;
        
      } else {
        return accu;
      }
    };
  };
  var d = h[/* data */1];
  var accu = init;
  for(var i = 0 ,i_finish = d.length - 1 | 0; i <= i_finish; ++i){
    accu = do_bucket(Caml_array.caml_array_get(d, i), accu);
  }
  return accu;
}

function bucket_length(_accu, _param) {
  while(true) {
    var param = _param;
    var accu = _accu;
    if (param) {
      _param = param[2];
      _accu = accu + 1 | 0;
      continue ;
      
    } else {
      return accu;
    }
  };
}

function stats(h) {
  var mbl = $$Array.fold_left((function (m, b) {
          return Pervasives.max(m, bucket_length(0, b));
        }), 0, h[/* data */1]);
  var histo = Caml_array.caml_make_vect(mbl + 1 | 0, 0);
  $$Array.iter((function (b) {
          var l = bucket_length(0, b);
          return Caml_array.caml_array_set(histo, l, Caml_array.caml_array_get(histo, l) + 1 | 0);
        }), h[/* data */1]);
  return /* record */[
          /* num_bindings */h[/* size */0],
          /* num_buckets */h[/* data */1].length,
          /* max_bucket_length */mbl,
          /* bucket_histogram */histo
        ];
}

function MakeSeeded(H) {
  var key_index = function (h, key) {
    return Curry._2(H[/* hash */1], h[/* seed */2], key) & (h[/* data */1].length - 1 | 0);
  };
  var add = function (h, key, info) {
    var i = key_index(h, key);
    var bucket_002 = Caml_array.caml_array_get(h[/* data */1], i);
    var bucket = /* Cons */[
      key,
      info,
      bucket_002
    ];
    Caml_array.caml_array_set(h[/* data */1], i, bucket);
    h[/* size */0] = h[/* size */0] + 1 | 0;
    if (h[/* size */0] > (h[/* data */1].length << 1)) {
      return resize(key_index, h);
    } else {
      return 0;
    }
  };
  var remove = function (h, key) {
    var remove_bucket = function (param) {
      if (param) {
        var next = param[2];
        var k = param[0];
        if (Curry._2(H[/* equal */0], k, key)) {
          h[/* size */0] = h[/* size */0] - 1 | 0;
          return next;
        } else {
          return /* Cons */[
                  k,
                  param[1],
                  remove_bucket(next)
                ];
        }
      } else {
        return /* Empty */0;
      }
    };
    var i = key_index(h, key);
    return Caml_array.caml_array_set(h[/* data */1], i, remove_bucket(Caml_array.caml_array_get(h[/* data */1], i)));
  };
  var find = function (h, key) {
    var match = Caml_array.caml_array_get(h[/* data */1], key_index(h, key));
    if (match) {
      var rest1 = match[2];
      if (Curry._2(H[/* equal */0], key, match[0])) {
        return match[1];
      } else if (rest1) {
        var rest2 = rest1[2];
        if (Curry._2(H[/* equal */0], key, rest1[0])) {
          return rest1[1];
        } else if (rest2) {
          if (Curry._2(H[/* equal */0], key, rest2[0])) {
            return rest2[1];
          } else {
            var key$1 = key;
            var _param = rest2[2];
            while(true) {
              var param = _param;
              if (param) {
                if (Curry._2(H[/* equal */0], key$1, param[0])) {
                  return param[1];
                } else {
                  _param = param[2];
                  continue ;
                  
                }
              } else {
                throw Caml_builtin_exceptions.not_found;
              }
            };
          }
        } else {
          throw Caml_builtin_exceptions.not_found;
        }
      } else {
        throw Caml_builtin_exceptions.not_found;
      }
    } else {
      throw Caml_builtin_exceptions.not_found;
    }
  };
  var find_all = function (h, key) {
    var find_in_bucket = function (_param) {
      while(true) {
        var param = _param;
        if (param) {
          var rest = param[2];
          if (Curry._2(H[/* equal */0], param[0], key)) {
            return /* :: */[
                    param[1],
                    find_in_bucket(rest)
                  ];
          } else {
            _param = rest;
            continue ;
            
          }
        } else {
          return /* [] */0;
        }
      };
    };
    return find_in_bucket(Caml_array.caml_array_get(h[/* data */1], key_index(h, key)));
  };
  var replace = function (h, key, info) {
    var replace_bucket = function (param) {
      if (param) {
        var next = param[2];
        var k = param[0];
        if (Curry._2(H[/* equal */0], k, key)) {
          return /* Cons */[
                  key,
                  info,
                  next
                ];
        } else {
          return /* Cons */[
                  k,
                  param[1],
                  replace_bucket(next)
                ];
        }
      } else {
        throw Caml_builtin_exceptions.not_found;
      }
    };
    var i = key_index(h, key);
    var l = Caml_array.caml_array_get(h[/* data */1], i);
    try {
      return Caml_array.caml_array_set(h[/* data */1], i, replace_bucket(l));
    }
    catch (exn){
      if (exn === Caml_builtin_exceptions.not_found) {
        Caml_array.caml_array_set(h[/* data */1], i, /* Cons */[
              key,
              info,
              l
            ]);
        h[/* size */0] = h[/* size */0] + 1 | 0;
        if (h[/* size */0] > (h[/* data */1].length << 1)) {
          return resize(key_index, h);
        } else {
          return 0;
        }
      } else {
        throw exn;
      }
    }
  };
  var mem = function (h, key) {
    var _param = Caml_array.caml_array_get(h[/* data */1], key_index(h, key));
    while(true) {
      var param = _param;
      if (param) {
        if (Curry._2(H[/* equal */0], param[0], key)) {
          return /* true */1;
        } else {
          _param = param[2];
          continue ;
          
        }
      } else {
        return /* false */0;
      }
    };
  };
  return /* module */[
          /* create */create,
          /* clear */clear,
          /* reset */reset,
          /* copy */copy,
          /* add */add,
          /* remove */remove,
          /* find */find,
          /* find_all */find_all,
          /* replace */replace,
          /* mem */mem,
          /* iter */iter,
          /* fold */fold,
          /* length */length,
          /* stats */stats
        ];
}

function Make(H) {
  var equal = H[/* equal */0];
  var key_index = function (h, key) {
    return Curry._1(H[/* hash */1], key) & (h[/* data */1].length - 1 | 0);
  };
  var add = function (h, key, info) {
    var i = key_index(h, key);
    var bucket_002 = Caml_array.caml_array_get(h[/* data */1], i);
    var bucket = /* Cons */[
      key,
      info,
      bucket_002
    ];
    Caml_array.caml_array_set(h[/* data */1], i, bucket);
    h[/* size */0] = h[/* size */0] + 1 | 0;
    if (h[/* size */0] > (h[/* data */1].length << 1)) {
      return resize(key_index, h);
    } else {
      return 0;
    }
  };
  var remove = function (h, key) {
    var remove_bucket = function (param) {
      if (param) {
        var next = param[2];
        var k = param[0];
        if (Curry._2(equal, k, key)) {
          h[/* size */0] = h[/* size */0] - 1 | 0;
          return next;
        } else {
          return /* Cons */[
                  k,
                  param[1],
                  remove_bucket(next)
                ];
        }
      } else {
        return /* Empty */0;
      }
    };
    var i = key_index(h, key);
    return Caml_array.caml_array_set(h[/* data */1], i, remove_bucket(Caml_array.caml_array_get(h[/* data */1], i)));
  };
  var find = function (h, key) {
    var match = Caml_array.caml_array_get(h[/* data */1], key_index(h, key));
    if (match) {
      var rest1 = match[2];
      if (Curry._2(equal, key, match[0])) {
        return match[1];
      } else if (rest1) {
        var rest2 = rest1[2];
        if (Curry._2(equal, key, rest1[0])) {
          return rest1[1];
        } else if (rest2) {
          if (Curry._2(equal, key, rest2[0])) {
            return rest2[1];
          } else {
            var key$1 = key;
            var _param = rest2[2];
            while(true) {
              var param = _param;
              if (param) {
                if (Curry._2(equal, key$1, param[0])) {
                  return param[1];
                } else {
                  _param = param[2];
                  continue ;
                  
                }
              } else {
                throw Caml_builtin_exceptions.not_found;
              }
            };
          }
        } else {
          throw Caml_builtin_exceptions.not_found;
        }
      } else {
        throw Caml_builtin_exceptions.not_found;
      }
    } else {
      throw Caml_builtin_exceptions.not_found;
    }
  };
  var find_all = function (h, key) {
    var find_in_bucket = function (_param) {
      while(true) {
        var param = _param;
        if (param) {
          var rest = param[2];
          if (Curry._2(equal, param[0], key)) {
            return /* :: */[
                    param[1],
                    find_in_bucket(rest)
                  ];
          } else {
            _param = rest;
            continue ;
            
          }
        } else {
          return /* [] */0;
        }
      };
    };
    return find_in_bucket(Caml_array.caml_array_get(h[/* data */1], key_index(h, key)));
  };
  var replace = function (h, key, info) {
    var replace_bucket = function (param) {
      if (param) {
        var next = param[2];
        var k = param[0];
        if (Curry._2(equal, k, key)) {
          return /* Cons */[
                  key,
                  info,
                  next
                ];
        } else {
          return /* Cons */[
                  k,
                  param[1],
                  replace_bucket(next)
                ];
        }
      } else {
        throw Caml_builtin_exceptions.not_found;
      }
    };
    var i = key_index(h, key);
    var l = Caml_array.caml_array_get(h[/* data */1], i);
    try {
      return Caml_array.caml_array_set(h[/* data */1], i, replace_bucket(l));
    }
    catch (exn){
      if (exn === Caml_builtin_exceptions.not_found) {
        Caml_array.caml_array_set(h[/* data */1], i, /* Cons */[
              key,
              info,
              l
            ]);
        h[/* size */0] = h[/* size */0] + 1 | 0;
        if (h[/* size */0] > (h[/* data */1].length << 1)) {
          return resize(key_index, h);
        } else {
          return 0;
        }
      } else {
        throw exn;
      }
    }
  };
  var mem = function (h, key) {
    var _param = Caml_array.caml_array_get(h[/* data */1], key_index(h, key));
    while(true) {
      var param = _param;
      if (param) {
        if (Curry._2(equal, param[0], key)) {
          return /* true */1;
        } else {
          _param = param[2];
          continue ;
          
        }
      } else {
        return /* false */0;
      }
    };
  };
  var create$1 = function (sz) {
    return create(/* Some */[/* false */0], sz);
  };
  return /* module */[
          /* create */create$1,
          /* clear */clear,
          /* reset */reset,
          /* copy */copy,
          /* add */add,
          /* remove */remove,
          /* find */find,
          /* find_all */find_all,
          /* replace */replace,
          /* mem */mem,
          /* iter */iter,
          /* fold */fold,
          /* length */length,
          /* stats */stats
        ];
}

var seeded_hash_param = Caml_hash.caml_hash;

exports.create            = create;
exports.clear             = clear;
exports.reset             = reset;
exports.copy              = copy;
exports.add               = add;
exports.find              = find;
exports.find_all          = find_all;
exports.mem               = mem;
exports.remove            = remove;
exports.replace           = replace;
exports.iter              = iter;
exports.fold              = fold;
exports.length            = length;
exports.randomize         = randomize;
exports.stats             = stats;
exports.Make              = Make;
exports.MakeSeeded        = MakeSeeded;
exports.hash              = hash;
exports.seeded_hash       = seeded_hash;
exports.hash_param        = hash_param;
exports.seeded_hash_param = seeded_hash_param;
/* randomized_default Not a pure module */

},{"./array.js":"stdlib/array","./block.js":"stdlib/block","./bytes.js":"stdlib/bytes","./caml_array.js":"stdlib/caml_array","./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./caml_hash.js":"stdlib/caml_hash","./caml_missing_polyfill.js":"stdlib/caml_missing_polyfill","./caml_obj.js":"stdlib/caml_obj","./caml_string.js":"stdlib/caml_string","./caml_sys.js":"stdlib/caml_sys","./camlinternalLazy.js":"stdlib/camlinternalLazy","./curry.js":"stdlib/curry","./pervasives.js":"stdlib/pervasives","./random.js":"stdlib/random","./sys.js":"stdlib/sys"}],"stdlib/int32":[function(require,module,exports){
'use strict';

var Caml_obj    = require("./caml_obj.js");
var Caml_format = require("./caml_format.js");

function succ(n) {
  return n + 1 | 0;
}

function pred(n) {
  return n - 1 | 0;
}

function abs(n) {
  if (n >= 0) {
    return n;
  } else {
    return -n | 0;
  }
}

function lognot(n) {
  return n ^ -1;
}

function to_string(n) {
  return Caml_format.caml_int32_format("%d", n);
}

var compare = Caml_obj.caml_int32_compare;

var zero = 0;

var one = 1;

var minus_one = -1;

var max_int = 2147483647;

var min_int = -2147483648;

exports.zero      = zero;
exports.one       = one;
exports.minus_one = minus_one;
exports.succ      = succ;
exports.pred      = pred;
exports.abs       = abs;
exports.max_int   = max_int;
exports.min_int   = min_int;
exports.lognot    = lognot;
exports.to_string = to_string;
exports.compare   = compare;
/* No side effect */

},{"./caml_format.js":"stdlib/caml_format","./caml_obj.js":"stdlib/caml_obj"}],"stdlib/int64":[function(require,module,exports){
'use strict';

var Caml_int64  = require("./caml_int64.js");
var Caml_format = require("./caml_format.js");

function succ(n) {
  return Caml_int64.add(n, /* int64 */[
              /* hi */0,
              /* lo */1
            ]);
}

function pred(n) {
  return Caml_int64.sub(n, /* int64 */[
              /* hi */0,
              /* lo */1
            ]);
}

function abs(n) {
  if (Caml_int64.ge(n, /* int64 */[
          /* hi */0,
          /* lo */0
        ])) {
    return n;
  } else {
    return Caml_int64.neg(n);
  }
}

function lognot(n) {
  return Caml_int64.xor(n, /* int64 */[
              /* hi */-1,
              /* lo */4294967295
            ]);
}

function to_string(n) {
  return Caml_format.caml_int64_format("%d", n);
}

var compare = Caml_int64.compare;

var zero = /* int64 */[
  /* hi */0,
  /* lo */0
];

var one = /* int64 */[
  /* hi */0,
  /* lo */1
];

var minus_one = /* int64 */[
  /* hi */-1,
  /* lo */4294967295
];

var max_int = /* int64 */[
  /* hi */2147483647,
  /* lo */4294967295
];

var min_int = /* int64 */[
  /* hi */-2147483648,
  /* lo */0
];

exports.zero      = zero;
exports.one       = one;
exports.minus_one = minus_one;
exports.succ      = succ;
exports.pred      = pred;
exports.abs       = abs;
exports.max_int   = max_int;
exports.min_int   = min_int;
exports.lognot    = lognot;
exports.to_string = to_string;
exports.compare   = compare;
/* No side effect */

},{"./caml_format.js":"stdlib/caml_format","./caml_int64.js":"stdlib/caml_int64"}],"stdlib/js_array":[function(require,module,exports){
arguments[4]["stdlib/bs_dict"][0].apply(exports,arguments)
},{"dup":"stdlib/bs_dict"}],"stdlib/js_boolean":[function(require,module,exports){
'use strict';


function to_js_boolean(b) {
  if (b) {
    return true;
  } else {
    return false;
  }
}

exports.to_js_boolean = to_js_boolean;
/* No side effect */

},{}],"stdlib/js_cast":[function(require,module,exports){
arguments[4]["stdlib/bs_dict"][0].apply(exports,arguments)
},{"dup":"stdlib/bs_dict"}],"stdlib/js_date":[function(require,module,exports){
arguments[4]["stdlib/bs_dict"][0].apply(exports,arguments)
},{"dup":"stdlib/bs_dict"}],"stdlib/js_dict":[function(require,module,exports){
'use strict';


var unsafeDeleteKey = (
  function(dict,key){
     delete dict[key];
     return 0
   }
);

function entries(dict) {
  var keys = Object.keys(dict);
  var l = keys.length;
  var values = new Array(l);
  for(var i = 0 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
    var key = keys[i];
    values[i] = /* tuple */[
      key,
      dict[key]
    ];
  }
  return values;
}

function values(dict) {
  var keys = Object.keys(dict);
  var l = keys.length;
  var values$1 = new Array(l);
  for(var i = 0 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
    values$1[i] = dict[keys[i]];
  }
  return values$1;
}

function fromList(entries) {
  var dict = { };
  var _param = entries;
  while(true) {
    var param = _param;
    if (param) {
      var match = param[0];
      dict[match[0]] = match[1];
      _param = param[1];
      continue ;
      
    } else {
      return dict;
    }
  };
}

function fromArray(entries) {
  var dict = { };
  var l = entries.length;
  for(var i = 0 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
    var match = entries[i];
    dict[match[0]] = match[1];
  }
  return dict;
}

function map(f, source) {
  var target = { };
  var keys = Object.keys(source);
  var l = keys.length;
  for(var i = 0 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
    var key = keys[i];
    target[key] = f(source[key]);
  }
  return target;
}

exports.unsafeDeleteKey = unsafeDeleteKey;
exports.entries         = entries;
exports.values          = values;
exports.fromList        = fromList;
exports.fromArray       = fromArray;
exports.map             = map;
/* unsafeDeleteKey Not a pure module */

},{}],"stdlib/js_exn":[function(require,module,exports){
'use strict';

var Caml_exceptions = require("./caml_exceptions.js");

var $$Error = Caml_exceptions.create("Js_exn.Error");

function internalToOCamlException(e) {
  if (Caml_exceptions.isCamlExceptionOrOpenVariant(e)) {
    return e;
  } else {
    return [
            $$Error,
            e
          ];
  }
}

function raiseError(str) {
  throw new Error(str);
}

function raiseEvalError(str) {
  throw new EvalError(str);
}

function raiseRangeError(str) {
  throw new RangeError(str);
}

function raiseReferenceError(str) {
  throw new ReferenceError(str);
}

function raiseSyntaxError(str) {
  throw new SyntaxError(str);
}

function raiseTypeError(str) {
  throw new TypeError(str);
}

function raiseUriError(str) {
  throw new URIError(str);
}

exports.$$Error                  = $$Error;
exports.internalToOCamlException = internalToOCamlException;
exports.raiseError               = raiseError;
exports.raiseEvalError           = raiseEvalError;
exports.raiseRangeError          = raiseRangeError;
exports.raiseReferenceError      = raiseReferenceError;
exports.raiseSyntaxError         = raiseSyntaxError;
exports.raiseTypeError           = raiseTypeError;
exports.raiseUriError            = raiseUriError;
/* No side effect */

},{"./caml_exceptions.js":"stdlib/caml_exceptions"}],"stdlib/js_float":[function(require,module,exports){
arguments[4]["stdlib/bs_dict"][0].apply(exports,arguments)
},{"dup":"stdlib/bs_dict"}],"stdlib/js_global":[function(require,module,exports){
arguments[4]["stdlib/bs_dict"][0].apply(exports,arguments)
},{"dup":"stdlib/bs_dict"}],"stdlib/js_int64":[function(require,module,exports){
arguments[4]["stdlib/bs_dict"][0].apply(exports,arguments)
},{"dup":"stdlib/bs_dict"}],"stdlib/js_internal":[function(require,module,exports){
arguments[4]["stdlib/bs_dict"][0].apply(exports,arguments)
},{"dup":"stdlib/bs_dict"}],"stdlib/js_int":[function(require,module,exports){
'use strict';


function equal(x, y) {
  return +(x === y);
}

exports.equal = equal;
/* No side effect */

},{}],"stdlib/js_json":[function(require,module,exports){
'use strict';

var Block = require("./block.js");

function reifyType(x) {
  return /* tuple */[
          typeof x === "string" ? /* String */0 : (
              typeof x === "number" ? /* Number */1 : (
                  typeof x === "boolean" ? /* Boolean */4 : (
                      x === null ? /* Null */5 : (
                          Array.isArray(x) ? /* Array */3 : /* Object */2
                        )
                    )
                )
            ),
          x
        ];
}

function classify(x) {
  var ty = typeof x;
  if (ty === "string") {
    return /* JSONString */Block.__(0, [x]);
  } else if (ty === "number") {
    return /* JSONNumber */Block.__(1, [x]);
  } else if (ty === "boolean") {
    if (x === true) {
      return /* JSONTrue */1;
    } else {
      return /* JSONFalse */0;
    }
  } else if (x === null) {
    return /* JSONNull */2;
  } else if (Array.isArray(x)) {
    return /* JSONArray */Block.__(3, [x]);
  } else {
    return /* JSONObject */Block.__(2, [x]);
  }
}

function test(x, v) {
  switch (v) {
    case 0 : 
        return +(typeof x === "string");
    case 1 : 
        return +(typeof x === "number");
    case 2 : 
        if (x !== null && typeof x === "object") {
          return 1 - +Array.isArray(x);
        } else {
          return /* false */0;
        }
    case 3 : 
        return +Array.isArray(x);
    case 4 : 
        return +(typeof x === "boolean");
    case 5 : 
        return +(x === null);
    
  }
}

function decodeString(json) {
  if (typeof json === "string") {
    return /* Some */[json];
  } else {
    return /* None */0;
  }
}

function decodeNumber(json) {
  if (typeof json === "number") {
    return /* Some */[json];
  } else {
    return /* None */0;
  }
}

function decodeObject(json) {
  if (typeof json === "object" && !Array.isArray(json) && json !== null) {
    return /* Some */[json];
  } else {
    return /* None */0;
  }
}

function decodeArray(json) {
  if (Array.isArray(json)) {
    return /* Some */[json];
  } else {
    return /* None */0;
  }
}

function decodeBoolean(json) {
  if (typeof json === "boolean") {
    return /* Some */[json];
  } else {
    return /* None */0;
  }
}

function decodeNull(json) {
  if (json === null) {
    return /* Some */[null];
  } else {
    return /* None */0;
  }
}

exports.classify      = classify;
exports.reifyType     = reifyType;
exports.test          = test;
exports.decodeString  = decodeString;
exports.decodeNumber  = decodeNumber;
exports.decodeObject  = decodeObject;
exports.decodeArray   = decodeArray;
exports.decodeBoolean = decodeBoolean;
exports.decodeNull    = decodeNull;
/* No side effect */

},{"./block.js":"stdlib/block"}],"stdlib/js_list":[function(require,module,exports){
'use strict';

var Js_vector = require("./js_vector.js");

function length(l) {
  var _len = 0;
  var _param = l;
  while(true) {
    var param = _param;
    var len = _len;
    if (param) {
      _param = param[1];
      _len = len + 1 | 0;
      continue ;
      
    } else {
      return len;
    }
  };
}

function cons(x, xs) {
  return /* :: */[
          x,
          xs
        ];
}

function isEmpty(x) {
  return +(x === /* [] */0);
}

function hd(param) {
  if (param) {
    return /* Some */[param[0]];
  } else {
    return /* None */0;
  }
}

function tl(param) {
  if (param) {
    return /* Some */[param[1]];
  } else {
    return /* None */0;
  }
}

function nth(l, n) {
  if (n < 0) {
    return /* None */0;
  } else {
    var _l = l;
    var _n = n;
    while(true) {
      var n$1 = _n;
      var l$1 = _l;
      if (l$1) {
        if (n$1) {
          _n = n$1 - 1 | 0;
          _l = l$1[1];
          continue ;
          
        } else {
          return /* Some */[l$1[0]];
        }
      } else {
        return /* None */0;
      }
    };
  }
}

function revAppend(_l1, _l2) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    if (l1) {
      _l2 = /* :: */[
        l1[0],
        l2
      ];
      _l1 = l1[1];
      continue ;
      
    } else {
      return l2;
    }
  };
}

function rev(l) {
  return revAppend(l, /* [] */0);
}

function mapRevAux(f, _acc, _ls) {
  while(true) {
    var ls = _ls;
    var acc = _acc;
    if (ls) {
      _ls = ls[1];
      _acc = /* :: */[
        f(ls[0]),
        acc
      ];
      continue ;
      
    } else {
      return acc;
    }
  };
}

function mapRev(f, ls) {
  return mapRevAux(f, /* [] */0, ls);
}

function map(f, ls) {
  return revAppend(mapRevAux(f, /* [] */0, ls), /* [] */0);
}

function iter(f, _param) {
  while(true) {
    var param = _param;
    if (param) {
      f(param[0]);
      _param = param[1];
      continue ;
      
    } else {
      return /* () */0;
    }
  };
}

function iteri(f, l) {
  var _i = 0;
  var f$1 = f;
  var _param = l;
  while(true) {
    var param = _param;
    var i = _i;
    if (param) {
      f$1(i, param[0]);
      _param = param[1];
      _i = i + 1 | 0;
      continue ;
      
    } else {
      return /* () */0;
    }
  };
}

function foldLeft(f, _accu, _l) {
  while(true) {
    var l = _l;
    var accu = _accu;
    if (l) {
      _l = l[1];
      _accu = f(accu, l[0]);
      continue ;
      
    } else {
      return accu;
    }
  };
}

function tailLoop(f, _acc, _param) {
  while(true) {
    var param = _param;
    var acc = _acc;
    if (param) {
      _param = param[1];
      _acc = f(param[0], acc);
      continue ;
      
    } else {
      return acc;
    }
  };
}

function foldRight(f, l, init) {
  var loop = function (n, param) {
    if (param) {
      var t = param[1];
      var h = param[0];
      if (n < 1000) {
        return f(h, loop(n + 1 | 0, t));
      } else {
        return f(h, tailLoop(f, init, revAppend(t, /* [] */0)));
      }
    } else {
      return init;
    }
  };
  return loop(0, l);
}

function flatten(lx) {
  var _acc = /* [] */0;
  var _lx = lx;
  while(true) {
    var lx$1 = _lx;
    var acc = _acc;
    if (lx$1) {
      _lx = lx$1[1];
      _acc = revAppend(lx$1[0], acc);
      continue ;
      
    } else {
      return revAppend(acc, /* [] */0);
    }
  };
}

function filterRevAux(f, _acc, _xs) {
  while(true) {
    var xs = _xs;
    var acc = _acc;
    if (xs) {
      var ys = xs[1];
      var y = xs[0];
      var match = f(y);
      _xs = ys;
      if (match !== 0) {
        _acc = /* :: */[
          y,
          acc
        ];
        continue ;
        
      } else {
        continue ;
        
      }
    } else {
      return acc;
    }
  };
}

function filter(f, xs) {
  return revAppend(filterRevAux(f, /* [] */0, xs), /* [] */0);
}

function filterMapRevAux(f, _acc, _xs) {
  while(true) {
    var xs = _xs;
    var acc = _acc;
    if (xs) {
      var ys = xs[1];
      var match = f(xs[0]);
      _xs = ys;
      if (match) {
        _acc = /* :: */[
          match[0],
          acc
        ];
        continue ;
        
      } else {
        continue ;
        
      }
    } else {
      return acc;
    }
  };
}

function filterMap(f, xs) {
  return revAppend(filterMapRevAux(f, /* [] */0, xs), /* [] */0);
}

function countBy(f, xs) {
  var f$1 = f;
  var _acc = 0;
  var _xs = xs;
  while(true) {
    var xs$1 = _xs;
    var acc = _acc;
    if (xs$1) {
      _xs = xs$1[1];
      _acc = f$1(xs$1[0]) ? acc + 1 | 0 : acc;
      continue ;
      
    } else {
      return acc;
    }
  };
}

function init(n, f) {
  return Js_vector.toList(Js_vector.init(n, f));
}

function equal(cmp, _xs, _ys) {
  while(true) {
    var ys = _ys;
    var xs = _xs;
    if (xs) {
      if (ys) {
        if (cmp(xs[0], ys[0])) {
          _ys = ys[1];
          _xs = xs[1];
          continue ;
          
        } else {
          return /* false */0;
        }
      } else {
        return /* false */0;
      }
    } else if (ys) {
      return /* false */0;
    } else {
      return /* true */1;
    }
  };
}

exports.length    = length;
exports.cons      = cons;
exports.isEmpty   = isEmpty;
exports.hd        = hd;
exports.tl        = tl;
exports.nth       = nth;
exports.revAppend = revAppend;
exports.rev       = rev;
exports.mapRev    = mapRev;
exports.map       = map;
exports.iter      = iter;
exports.iteri     = iteri;
exports.foldLeft  = foldLeft;
exports.foldRight = foldRight;
exports.flatten   = flatten;
exports.filter    = filter;
exports.filterMap = filterMap;
exports.countBy   = countBy;
exports.init      = init;
exports.equal     = equal;
/* No side effect */

},{"./js_vector.js":"stdlib/js_vector"}],"stdlib/js_math":[function(require,module,exports){
'use strict';

var Pervasives = require("./pervasives.js");

function unsafe_ceil(prim) {
  return Math.ceil(prim);
}

function ceil_int(f) {
  if (f > Pervasives.max_int) {
    return Pervasives.max_int;
  } else if (f < Pervasives.min_int) {
    return Pervasives.min_int;
  } else {
    return Math.ceil(f);
  }
}

function unsafe_floor(prim) {
  return Math.floor(prim);
}

function floor_int(f) {
  if (f > Pervasives.max_int) {
    return Pervasives.max_int;
  } else if (f < Pervasives.min_int) {
    return Pervasives.min_int;
  } else {
    return Math.floor(f);
  }
}

function random_int(min, max) {
  return floor_int(Math.random() * (max - min | 0)) + min | 0;
}

var ceil = ceil_int;

var floor = floor_int;

exports.unsafe_ceil  = unsafe_ceil;
exports.ceil_int     = ceil_int;
exports.ceil         = ceil;
exports.unsafe_floor = unsafe_floor;
exports.floor_int    = floor_int;
exports.floor        = floor;
exports.random_int   = random_int;
/* No side effect */

},{"./pervasives.js":"stdlib/pervasives"}],"stdlib/js_nativeint":[function(require,module,exports){
arguments[4]["stdlib/bs_dict"][0].apply(exports,arguments)
},{"dup":"stdlib/bs_dict"}],"stdlib/js_null_undefined":[function(require,module,exports){
'use strict';

var Js_primitive = require("./js_primitive.js");

function bind(x, f) {
  if (Js_primitive.is_nil_undef(x)) {
    return x;
  } else {
    return f(x);
  }
}

function iter(x, f) {
  if (Js_primitive.is_nil_undef(x)) {
    return /* () */0;
  } else {
    return f(x);
  }
}

function from_opt(x) {
  if (x) {
    return x[0];
  } else {
    return undefined;
  }
}

exports.bind     = bind;
exports.iter     = iter;
exports.from_opt = from_opt;
/* No side effect */

},{"./js_primitive.js":"stdlib/js_primitive"}],"stdlib/js_null":[function(require,module,exports){
'use strict';


function bind(x, f) {
  if (x !== null) {
    return f(x);
  } else {
    return null;
  }
}

function iter(x, f) {
  if (x !== null) {
    return f(x);
  } else {
    return /* () */0;
  }
}

function from_opt(x) {
  if (x) {
    return x[0];
  } else {
    return null;
  }
}

exports.bind     = bind;
exports.iter     = iter;
exports.from_opt = from_opt;
/* No side effect */

},{}],"stdlib/js_obj":[function(require,module,exports){
arguments[4]["stdlib/bs_dict"][0].apply(exports,arguments)
},{"dup":"stdlib/bs_dict"}],"stdlib/js_option":[function(require,module,exports){
'use strict';


function some(x) {
  return /* Some */[x];
}

function isSome(param) {
  if (param) {
    return /* true */1;
  } else {
    return /* false */0;
  }
}

function isSomeValue(eq, v, x) {
  if (x) {
    return eq(v, x[0]);
  } else {
    return /* false */0;
  }
}

function isNone(param) {
  if (param) {
    return /* false */0;
  } else {
    return /* true */1;
  }
}

function getExn(x) {
  if (x) {
    return x[0];
  } else {
    throw new Error("Bs_option.getExn");
  }
}

function equal(eq, a, b) {
  if (a) {
    if (b) {
      return eq(a[0], b[0]);
    } else {
      return /* false */0;
    }
  } else {
    return +(b === /* None */0);
  }
}

function andThen(f, x) {
  if (x) {
    return f(x[0]);
  } else {
    return /* None */0;
  }
}

function map(f, x) {
  if (x) {
    return /* Some */[f(x[0])];
  } else {
    return /* None */0;
  }
}

function $$default(a, x) {
  if (x) {
    return x[0];
  } else {
    return a;
  }
}

function filter(f, x) {
  if (x) {
    var x$1 = x[0];
    if (f(x$1)) {
      return /* Some */[x$1];
    } else {
      return /* None */0;
    }
  } else {
    return /* None */0;
  }
}

function firstSome(a, b) {
  if (a) {
    return a;
  } else if (b) {
    return b;
  } else {
    return /* None */0;
  }
}

exports.some        = some;
exports.isSome      = isSome;
exports.isSomeValue = isSomeValue;
exports.isNone      = isNone;
exports.getExn      = getExn;
exports.equal       = equal;
exports.andThen     = andThen;
exports.map         = map;
exports.$$default   = $$default;
exports.default     = $$default;
exports.filter      = filter;
exports.firstSome   = firstSome;
/* No side effect */

},{}],"stdlib/js_primitive":[function(require,module,exports){
'use strict';


function is_nil_undef(x) {
  if (x === null) {
    return /* true */1;
  } else {
    return +(x === undefined);
  }
}

function null_undefined_to_opt(x) {
  if (x === null || x === undefined) {
    return /* None */0;
  } else {
    return /* Some */[x];
  }
}

function undefined_to_opt(x) {
  if (x === undefined) {
    return /* None */0;
  } else {
    return /* Some */[x];
  }
}

function null_to_opt(x) {
  if (x === null) {
    return /* None */0;
  } else {
    return /* Some */[x];
  }
}

function option_get(x) {
  if (x) {
    return x[0];
  } else {
    return undefined;
  }
}

function option_get_unwrap(x) {
  if (x) {
    return x[0][1];
  } else {
    return undefined;
  }
}

exports.is_nil_undef          = is_nil_undef;
exports.null_undefined_to_opt = null_undefined_to_opt;
exports.undefined_to_opt      = undefined_to_opt;
exports.null_to_opt           = null_to_opt;
exports.option_get            = option_get;
exports.option_get_unwrap     = option_get_unwrap;
/* No side effect */

},{}],"stdlib/js_promise":[function(require,module,exports){
arguments[4]["stdlib/bs_dict"][0].apply(exports,arguments)
},{"dup":"stdlib/bs_dict"}],"stdlib/js_result":[function(require,module,exports){
arguments[4]["stdlib/bs_dict"][0].apply(exports,arguments)
},{"dup":"stdlib/bs_dict"}],"stdlib/js_re":[function(require,module,exports){
arguments[4]["stdlib/bs_dict"][0].apply(exports,arguments)
},{"dup":"stdlib/bs_dict"}],"stdlib/js_string":[function(require,module,exports){
arguments[4]["stdlib/bs_dict"][0].apply(exports,arguments)
},{"dup":"stdlib/bs_dict"}],"stdlib/js_typed_array":[function(require,module,exports){
'use strict';


var ArrayBuffer = /* module */[];

function TypedArray() {
  return /* module */[];
}

var Int8Array = /* module */[];

var Uint8Array = /* module */[];

var Uint8ClampedArray = /* module */[];

var Int16Array = /* module */[];

var Uint16Array = /* module */[];

var Int32Array = /* module */[];

var Uint32Array = /* module */[];

var Float32Array = /* module */[];

var Float64Array = /* module */[];

var DataView = /* module */[];

var Int32_array = 0;

var Float32_array = 0;

var Float64_array = 0;

exports.ArrayBuffer       = ArrayBuffer;
exports.TypedArray        = TypedArray;
exports.Int8Array         = Int8Array;
exports.Uint8Array        = Uint8Array;
exports.Uint8ClampedArray = Uint8ClampedArray;
exports.Int16Array        = Int16Array;
exports.Uint16Array       = Uint16Array;
exports.Int32Array        = Int32Array;
exports.Int32_array       = Int32_array;
exports.Uint32Array       = Uint32Array;
exports.Float32Array      = Float32Array;
exports.Float32_array     = Float32_array;
exports.Float64Array      = Float64Array;
exports.Float64_array     = Float64_array;
exports.DataView          = DataView;
/* No side effect */

},{}],"stdlib/js_types":[function(require,module,exports){
'use strict';

var Block = require("./block.js");

function reify_type(x) {
  if (typeof x === "undefined") {
    return /* tuple */[
            /* Undefined */0,
            x
          ];
  } else if (x === null) {
    return /* tuple */[
            /* Null */1,
            x
          ];
  } else if (typeof x === "number") {
    return /* tuple */[
            /* Number */3,
            x
          ];
  } else if (typeof x === "string") {
    return /* tuple */[
            /* String */4,
            x
          ];
  } else if (typeof x === "boolean") {
    return /* tuple */[
            /* Boolean */2,
            x
          ];
  } else if (typeof x === "function") {
    return /* tuple */[
            /* Function */5,
            x
          ];
  } else if (typeof x === "object") {
    return /* tuple */[
            /* Object */6,
            x
          ];
  } else {
    return /* tuple */[
            /* Symbol */7,
            x
          ];
  }
}

function classify(x) {
  var ty = typeof x;
  if (ty === "undefined") {
    return /* JSUndefined */3;
  } else if (x === null) {
    return /* JSNull */2;
  } else if (ty === "number") {
    return /* JSNumber */Block.__(0, [x]);
  } else if (ty === "string") {
    return /* JSString */Block.__(1, [x]);
  } else if (ty === "boolean") {
    if (x === true) {
      return /* JSTrue */1;
    } else {
      return /* JSFalse */0;
    }
  } else if (ty === "function") {
    return /* JSFunction */Block.__(2, [x]);
  } else if (ty === "object") {
    return /* JSObject */Block.__(3, [x]);
  } else {
    return /* JSSymbol */Block.__(4, [x]);
  }
}

function test(x, v) {
  switch (v) {
    case 0 : 
        return +(typeof x === "undefined");
    case 1 : 
        return +(x === null);
    case 2 : 
        return +(typeof x === "boolean");
    case 3 : 
        return +(typeof x === "number");
    case 4 : 
        return +(typeof x === "string");
    case 5 : 
        return +(typeof x === "function");
    case 6 : 
        return +(typeof x === "object");
    case 7 : 
        return +(typeof x === "symbol");
    
  }
}

exports.reify_type = reify_type;
exports.test       = test;
exports.classify   = classify;
/* No side effect */

},{"./block.js":"stdlib/block"}],"stdlib/js_undefined":[function(require,module,exports){
'use strict';


function bind(x, f) {
  if (x !== undefined) {
    return f(x);
  } else {
    return undefined;
  }
}

function iter(x, f) {
  if (x !== undefined) {
    return f(x);
  } else {
    return /* () */0;
  }
}

function from_opt(x) {
  if (x) {
    return x[0];
  } else {
    return undefined;
  }
}

exports.bind     = bind;
exports.iter     = iter;
exports.from_opt = from_opt;
/* No side effect */

},{}],"stdlib/js_unsafe":[function(require,module,exports){
arguments[4]["stdlib/bs_dict"][0].apply(exports,arguments)
},{"dup":"stdlib/bs_dict"}],"stdlib/js_vector":[function(require,module,exports){
'use strict';

var List = require("./list.js");

function filterInPlace(p, a) {
  var i = 0;
  var j = 0;
  while(i < a.length) {
    var v = a[i];
    if (p(v)) {
      a[j] = v;
      j = j + 1 | 0;
    }
    i = i + 1 | 0;
  };
  a.splice(j);
  return /* () */0;
}

function empty(a) {
  a.splice(0);
  return /* () */0;
}

function pushBack(x, xs) {
  xs.push(x);
  return /* () */0;
}

function memByRef(x, xs) {
  return +(xs.indexOf(x) >= 0);
}

function iter(f, xs) {
  for(var i = 0 ,i_finish = xs.length - 1 | 0; i <= i_finish; ++i){
    f(xs[i]);
  }
  return /* () */0;
}

function iteri(f, a) {
  for(var i = 0 ,i_finish = a.length - 1 | 0; i <= i_finish; ++i){
    f(i, a[i]);
  }
  return /* () */0;
}

function ofList(xs) {
  if (xs) {
    var a = new Array(List.length(xs));
    var _i = 0;
    var _param = xs;
    while(true) {
      var param = _param;
      var i = _i;
      if (param) {
        a[i] = param[0];
        _param = param[1];
        _i = i + 1 | 0;
        continue ;
        
      } else {
        return a;
      }
    };
  } else {
    return /* array */[];
  }
}

function toList(a) {
  var _i = a.length - 1 | 0;
  var _res = /* [] */0;
  while(true) {
    var res = _res;
    var i = _i;
    if (i < 0) {
      return res;
    } else {
      _res = /* :: */[
        a[i],
        res
      ];
      _i = i - 1 | 0;
      continue ;
      
    }
  };
}

function init(n, f) {
  var v = new Array(n);
  for(var i = 0 ,i_finish = n - 1 | 0; i <= i_finish; ++i){
    v[i] = f(i);
  }
  return v;
}

function copy(x) {
  var len = x.length;
  var b = new Array(len);
  for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
    b[i] = x[i];
  }
  return b;
}

function map(f, a) {
  var l = a.length;
  var r = new Array(l);
  for(var i = 0 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
    r[i] = f(a[i]);
  }
  return r;
}

function foldLeft(f, x, a) {
  var r = x;
  for(var i = 0 ,i_finish = a.length - 1 | 0; i <= i_finish; ++i){
    r = f(r, a[i]);
  }
  return r;
}

function foldRight(f, a, x) {
  var r = x;
  for(var i = a.length - 1 | 0; i >= 0; --i){
    r = f(a[i], r);
  }
  return r;
}

function mapi(f, a) {
  var l = a.length;
  if (l) {
    var r = new Array(l);
    for(var i = 0 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
      r[i] = f(i, a[i]);
    }
    return r;
  } else {
    return /* array */[];
  }
}

function append(x, a) {
  return a.concat(/* array */[x]);
}

exports.filterInPlace = filterInPlace;
exports.empty         = empty;
exports.pushBack      = pushBack;
exports.copy          = copy;
exports.memByRef      = memByRef;
exports.iter          = iter;
exports.iteri         = iteri;
exports.ofList        = ofList;
exports.toList        = toList;
exports.map           = map;
exports.mapi          = mapi;
exports.foldLeft      = foldLeft;
exports.foldRight     = foldRight;
exports.init          = init;
exports.append        = append;
/* No side effect */

},{"./list.js":"stdlib/list"}],"stdlib/js":[function(require,module,exports){
'use strict';


var Internal = 0;

var Null = 0;

var Undefined = 0;

var Null_undefined = 0;

var Exn = 0;

var $$Array = 0;

var $$String = 0;

var $$Boolean = 0;

var Re = 0;

var Promise = 0;

var $$Date = 0;

var Dict = 0;

var Global = 0;

var Json = 0;

var $$Math = 0;

var Obj = 0;

var Typed_array = 0;

var Types = 0;

var Float = 0;

var Int = 0;

var Option = 0;

var Result = 0;

var List = 0;

var Vector = 0;

exports.Internal       = Internal;
exports.Null           = Null;
exports.Undefined      = Undefined;
exports.Null_undefined = Null_undefined;
exports.Exn            = Exn;
exports.$$Array        = $$Array;
exports.$$String       = $$String;
exports.$$Boolean      = $$Boolean;
exports.Re             = Re;
exports.Promise        = Promise;
exports.$$Date         = $$Date;
exports.Dict           = Dict;
exports.Global         = Global;
exports.Json           = Json;
exports.$$Math         = $$Math;
exports.Obj            = Obj;
exports.Typed_array    = Typed_array;
exports.Types          = Types;
exports.Float          = Float;
exports.Int            = Int;
exports.Option         = Option;
exports.Result         = Result;
exports.List           = List;
exports.Vector         = Vector;
/* No side effect */

},{}],"stdlib/lazy":[function(require,module,exports){
'use strict';

var Obj              = require("./obj.js");
var Block            = require("./block.js");
var Caml_obj         = require("./caml_obj.js");
var CamlinternalLazy = require("./camlinternalLazy.js");

function from_fun(f) {
  var x = Block.__(Obj.lazy_tag, [0]);
  x[0] = f;
  return x;
}

function from_val(v) {
  var t = v.tag | 0;
  if (t === Obj.forward_tag || t === Obj.lazy_tag || t === Obj.double_tag) {
    return Caml_obj.caml_lazy_make_forward(v);
  } else {
    return v;
  }
}

function is_val(l) {
  return +((l.tag | 0) !== Obj.lazy_tag);
}

var Undefined = CamlinternalLazy.Undefined;

var force_val = CamlinternalLazy.force_val;

var lazy_from_fun = from_fun;

var lazy_from_val = from_val;

var lazy_is_val = is_val;

exports.Undefined     = Undefined;
exports.force_val     = force_val;
exports.from_fun      = from_fun;
exports.from_val      = from_val;
exports.is_val        = is_val;
exports.lazy_from_fun = lazy_from_fun;
exports.lazy_from_val = lazy_from_val;
exports.lazy_is_val   = lazy_is_val;
/* No side effect */

},{"./block.js":"stdlib/block","./caml_obj.js":"stdlib/caml_obj","./camlinternalLazy.js":"stdlib/camlinternalLazy","./obj.js":"stdlib/obj"}],"stdlib/lexing":[function(require,module,exports){
'use strict';

var Sys                     = require("./sys.js");
var Bytes                   = require("./bytes.js");
var Curry                   = require("./curry.js");
var Caml_array              = require("./caml_array.js");
var Caml_bytes              = require("./caml_bytes.js");
var Caml_lexer              = require("./caml_lexer.js");
var Pervasives              = require("./pervasives.js");
var Caml_string             = require("./caml_string.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function engine(tbl, state, buf) {
  var result = Caml_lexer.caml_lex_engine(tbl, state, buf);
  if (result >= 0) {
    buf[/* lex_start_p */10] = buf[/* lex_curr_p */11];
    var init = buf[/* lex_curr_p */11];
    buf[/* lex_curr_p */11] = /* record */[
      /* pos_fname */init[/* pos_fname */0],
      /* pos_lnum */init[/* pos_lnum */1],
      /* pos_bol */init[/* pos_bol */2],
      /* pos_cnum */buf[/* lex_abs_pos */3] + buf[/* lex_curr_pos */5] | 0
    ];
  }
  return result;
}

function new_engine(tbl, state, buf) {
  var result = Caml_lexer.caml_new_lex_engine(tbl, state, buf);
  if (result >= 0) {
    buf[/* lex_start_p */10] = buf[/* lex_curr_p */11];
    var init = buf[/* lex_curr_p */11];
    buf[/* lex_curr_p */11] = /* record */[
      /* pos_fname */init[/* pos_fname */0],
      /* pos_lnum */init[/* pos_lnum */1],
      /* pos_bol */init[/* pos_bol */2],
      /* pos_cnum */buf[/* lex_abs_pos */3] + buf[/* lex_curr_pos */5] | 0
    ];
  }
  return result;
}

var zero_pos = /* record */[
  /* pos_fname */"",
  /* pos_lnum */1,
  /* pos_bol */0,
  /* pos_cnum */0
];

function from_function(f) {
  var partial_arg = new Array(512);
  return /* record */[
          /* refill_buff */(function (param) {
              var read_fun = f;
              var aux_buffer = partial_arg;
              var lexbuf = param;
              var read = Curry._2(read_fun, aux_buffer, aux_buffer.length);
              var n = read > 0 ? read : (lexbuf[/* lex_eof_reached */8] = /* true */1, 0);
              if ((lexbuf[/* lex_buffer_len */2] + n | 0) > lexbuf[/* lex_buffer */1].length) {
                if (((lexbuf[/* lex_buffer_len */2] - lexbuf[/* lex_start_pos */4] | 0) + n | 0) <= lexbuf[/* lex_buffer */1].length) {
                  Bytes.blit(lexbuf[/* lex_buffer */1], lexbuf[/* lex_start_pos */4], lexbuf[/* lex_buffer */1], 0, lexbuf[/* lex_buffer_len */2] - lexbuf[/* lex_start_pos */4] | 0);
                } else {
                  var newlen = Pervasives.min((lexbuf[/* lex_buffer */1].length << 1), Sys.max_string_length);
                  if (((lexbuf[/* lex_buffer_len */2] - lexbuf[/* lex_start_pos */4] | 0) + n | 0) > newlen) {
                    throw [
                          Caml_builtin_exceptions.failure,
                          "Lexing.lex_refill: cannot grow buffer"
                        ];
                  }
                  var newbuf = Caml_string.caml_create_string(newlen);
                  Bytes.blit(lexbuf[/* lex_buffer */1], lexbuf[/* lex_start_pos */4], newbuf, 0, lexbuf[/* lex_buffer_len */2] - lexbuf[/* lex_start_pos */4] | 0);
                  lexbuf[/* lex_buffer */1] = newbuf;
                }
                var s = lexbuf[/* lex_start_pos */4];
                lexbuf[/* lex_abs_pos */3] = lexbuf[/* lex_abs_pos */3] + s | 0;
                lexbuf[/* lex_curr_pos */5] = lexbuf[/* lex_curr_pos */5] - s | 0;
                lexbuf[/* lex_start_pos */4] = 0;
                lexbuf[/* lex_last_pos */6] = lexbuf[/* lex_last_pos */6] - s | 0;
                lexbuf[/* lex_buffer_len */2] = lexbuf[/* lex_buffer_len */2] - s | 0;
                var t = lexbuf[/* lex_mem */9];
                for(var i = 0 ,i_finish = t.length - 1 | 0; i <= i_finish; ++i){
                  var v = Caml_array.caml_array_get(t, i);
                  if (v >= 0) {
                    Caml_array.caml_array_set(t, i, v - s | 0);
                  }
                  
                }
              }
              Bytes.blit(aux_buffer, 0, lexbuf[/* lex_buffer */1], lexbuf[/* lex_buffer_len */2], n);
              lexbuf[/* lex_buffer_len */2] = lexbuf[/* lex_buffer_len */2] + n | 0;
              return /* () */0;
            }),
          /* lex_buffer */new Array(1024),
          /* lex_buffer_len */0,
          /* lex_abs_pos */0,
          /* lex_start_pos */0,
          /* lex_curr_pos */0,
          /* lex_last_pos */0,
          /* lex_last_action */0,
          /* lex_eof_reached : false */0,
          /* lex_mem : int array */[],
          /* lex_start_p */zero_pos,
          /* lex_curr_p */zero_pos
        ];
}

function from_channel(ic) {
  return from_function((function (buf, n) {
                return Pervasives.input(ic, buf, 0, n);
              }));
}

function from_string(s) {
  return /* record */[
          /* refill_buff */(function (lexbuf) {
              lexbuf[/* lex_eof_reached */8] = /* true */1;
              return /* () */0;
            }),
          /* lex_buffer */Bytes.of_string(s),
          /* lex_buffer_len */s.length,
          /* lex_abs_pos */0,
          /* lex_start_pos */0,
          /* lex_curr_pos */0,
          /* lex_last_pos */0,
          /* lex_last_action */0,
          /* lex_eof_reached : true */1,
          /* lex_mem : int array */[],
          /* lex_start_p */zero_pos,
          /* lex_curr_p */zero_pos
        ];
}

function lexeme(lexbuf) {
  var len = lexbuf[/* lex_curr_pos */5] - lexbuf[/* lex_start_pos */4] | 0;
  return Bytes.sub_string(lexbuf[/* lex_buffer */1], lexbuf[/* lex_start_pos */4], len);
}

function sub_lexeme(lexbuf, i1, i2) {
  var len = i2 - i1 | 0;
  return Bytes.sub_string(lexbuf[/* lex_buffer */1], i1, len);
}

function sub_lexeme_opt(lexbuf, i1, i2) {
  if (i1 >= 0) {
    var len = i2 - i1 | 0;
    return /* Some */[Bytes.sub_string(lexbuf[/* lex_buffer */1], i1, len)];
  } else {
    return /* None */0;
  }
}

function sub_lexeme_char(lexbuf, i) {
  return Caml_bytes.get(lexbuf[/* lex_buffer */1], i);
}

function sub_lexeme_char_opt(lexbuf, i) {
  if (i >= 0) {
    return /* Some */[Caml_bytes.get(lexbuf[/* lex_buffer */1], i)];
  } else {
    return /* None */0;
  }
}

function lexeme_char(lexbuf, i) {
  return Caml_bytes.get(lexbuf[/* lex_buffer */1], lexbuf[/* lex_start_pos */4] + i | 0);
}

function lexeme_start(lexbuf) {
  return lexbuf[/* lex_start_p */10][/* pos_cnum */3];
}

function lexeme_end(lexbuf) {
  return lexbuf[/* lex_curr_p */11][/* pos_cnum */3];
}

function lexeme_start_p(lexbuf) {
  return lexbuf[/* lex_start_p */10];
}

function lexeme_end_p(lexbuf) {
  return lexbuf[/* lex_curr_p */11];
}

function new_line(lexbuf) {
  var lcp = lexbuf[/* lex_curr_p */11];
  lexbuf[/* lex_curr_p */11] = /* record */[
    /* pos_fname */lcp[/* pos_fname */0],
    /* pos_lnum */lcp[/* pos_lnum */1] + 1 | 0,
    /* pos_bol */lcp[/* pos_cnum */3],
    /* pos_cnum */lcp[/* pos_cnum */3]
  ];
  return /* () */0;
}

function flush_input(lb) {
  lb[/* lex_curr_pos */5] = 0;
  lb[/* lex_abs_pos */3] = 0;
  var init = lb[/* lex_curr_p */11];
  lb[/* lex_curr_p */11] = /* record */[
    /* pos_fname */init[/* pos_fname */0],
    /* pos_lnum */init[/* pos_lnum */1],
    /* pos_bol */init[/* pos_bol */2],
    /* pos_cnum */0
  ];
  lb[/* lex_buffer_len */2] = 0;
  return /* () */0;
}

var dummy_pos = /* record */[
  /* pos_fname */"",
  /* pos_lnum */0,
  /* pos_bol */0,
  /* pos_cnum */-1
];

exports.dummy_pos           = dummy_pos;
exports.from_channel        = from_channel;
exports.from_string         = from_string;
exports.from_function       = from_function;
exports.lexeme              = lexeme;
exports.lexeme_char         = lexeme_char;
exports.lexeme_start        = lexeme_start;
exports.lexeme_end          = lexeme_end;
exports.lexeme_start_p      = lexeme_start_p;
exports.lexeme_end_p        = lexeme_end_p;
exports.new_line            = new_line;
exports.flush_input         = flush_input;
exports.sub_lexeme          = sub_lexeme;
exports.sub_lexeme_opt      = sub_lexeme_opt;
exports.sub_lexeme_char     = sub_lexeme_char;
exports.sub_lexeme_char_opt = sub_lexeme_char_opt;
exports.engine              = engine;
exports.new_engine          = new_engine;
/* No side effect */

},{"./bytes.js":"stdlib/bytes","./caml_array.js":"stdlib/caml_array","./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./caml_bytes.js":"stdlib/caml_bytes","./caml_lexer.js":"stdlib/caml_lexer","./caml_string.js":"stdlib/caml_string","./curry.js":"stdlib/curry","./pervasives.js":"stdlib/pervasives","./sys.js":"stdlib/sys"}],"stdlib/listLabels":[function(require,module,exports){
'use strict';

var List = require("./list.js");

var length = List.length;

var hd = List.hd;

var tl = List.tl;

var nth = List.nth;

var rev = List.rev;

var append = List.append;

var rev_append = List.rev_append;

var concat = List.concat;

var flatten = List.flatten;

var iter = List.iter;

var iteri = List.iteri;

var map = List.map;

var mapi = List.mapi;

var rev_map = List.rev_map;

var fold_left = List.fold_left;

var fold_right = List.fold_right;

var iter2 = List.iter2;

var map2 = List.map2;

var rev_map2 = List.rev_map2;

var fold_left2 = List.fold_left2;

var fold_right2 = List.fold_right2;

var for_all = List.for_all;

var exists = List.exists;

var for_all2 = List.for_all2;

var exists2 = List.exists2;

var mem = List.mem;

var memq = List.memq;

var find = List.find;

var filter = List.filter;

var find_all = List.find_all;

var partition = List.partition;

var assoc = List.assoc;

var assq = List.assq;

var mem_assoc = List.mem_assoc;

var mem_assq = List.mem_assq;

var remove_assoc = List.remove_assoc;

var remove_assq = List.remove_assq;

var split = List.split;

var combine = List.combine;

var sort = List.sort;

var stable_sort = List.stable_sort;

var fast_sort = List.fast_sort;

var merge = List.merge;

exports.length       = length;
exports.hd           = hd;
exports.tl           = tl;
exports.nth          = nth;
exports.rev          = rev;
exports.append       = append;
exports.rev_append   = rev_append;
exports.concat       = concat;
exports.flatten      = flatten;
exports.iter         = iter;
exports.iteri        = iteri;
exports.map          = map;
exports.mapi         = mapi;
exports.rev_map      = rev_map;
exports.fold_left    = fold_left;
exports.fold_right   = fold_right;
exports.iter2        = iter2;
exports.map2         = map2;
exports.rev_map2     = rev_map2;
exports.fold_left2   = fold_left2;
exports.fold_right2  = fold_right2;
exports.for_all      = for_all;
exports.exists       = exists;
exports.for_all2     = for_all2;
exports.exists2      = exists2;
exports.mem          = mem;
exports.memq         = memq;
exports.find         = find;
exports.filter       = filter;
exports.find_all     = find_all;
exports.partition    = partition;
exports.assoc        = assoc;
exports.assq         = assq;
exports.mem_assoc    = mem_assoc;
exports.mem_assq     = mem_assq;
exports.remove_assoc = remove_assoc;
exports.remove_assq  = remove_assq;
exports.split        = split;
exports.combine      = combine;
exports.sort         = sort;
exports.stable_sort  = stable_sort;
exports.fast_sort    = fast_sort;
exports.merge        = merge;
/* No side effect */

},{"./list.js":"stdlib/list"}],"stdlib/list":[function(require,module,exports){
'use strict';

var Curry                   = require("./curry.js");
var Caml_obj                = require("./caml_obj.js");
var Pervasives              = require("./pervasives.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function length(l) {
  var _len = 0;
  var _param = l;
  while(true) {
    var param = _param;
    var len = _len;
    if (param) {
      _param = param[1];
      _len = len + 1 | 0;
      continue ;
      
    } else {
      return len;
    }
  };
}

function hd(param) {
  if (param) {
    return param[0];
  } else {
    throw [
          Caml_builtin_exceptions.failure,
          "hd"
        ];
  }
}

function tl(param) {
  if (param) {
    return param[1];
  } else {
    throw [
          Caml_builtin_exceptions.failure,
          "tl"
        ];
  }
}

function nth(l, n) {
  if (n < 0) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "List.nth"
        ];
  } else {
    var _l = l;
    var _n = n;
    while(true) {
      var n$1 = _n;
      var l$1 = _l;
      if (l$1) {
        if (n$1) {
          _n = n$1 - 1 | 0;
          _l = l$1[1];
          continue ;
          
        } else {
          return l$1[0];
        }
      } else {
        throw [
              Caml_builtin_exceptions.failure,
              "nth"
            ];
      }
    };
  }
}

function rev_append(_l1, _l2) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    if (l1) {
      _l2 = /* :: */[
        l1[0],
        l2
      ];
      _l1 = l1[1];
      continue ;
      
    } else {
      return l2;
    }
  };
}

function rev(l) {
  return rev_append(l, /* [] */0);
}

function flatten(param) {
  if (param) {
    return Pervasives.$at(param[0], flatten(param[1]));
  } else {
    return /* [] */0;
  }
}

function map(f, param) {
  if (param) {
    var r = Curry._1(f, param[0]);
    return /* :: */[
            r,
            map(f, param[1])
          ];
  } else {
    return /* [] */0;
  }
}

function mapi(i, f, param) {
  if (param) {
    var r = Curry._2(f, i, param[0]);
    return /* :: */[
            r,
            mapi(i + 1 | 0, f, param[1])
          ];
  } else {
    return /* [] */0;
  }
}

function mapi$1(f, l) {
  return mapi(0, f, l);
}

function rev_map(f, l) {
  var _accu = /* [] */0;
  var _param = l;
  while(true) {
    var param = _param;
    var accu = _accu;
    if (param) {
      _param = param[1];
      _accu = /* :: */[
        Curry._1(f, param[0]),
        accu
      ];
      continue ;
      
    } else {
      return accu;
    }
  };
}

function iter(f, _param) {
  while(true) {
    var param = _param;
    if (param) {
      Curry._1(f, param[0]);
      _param = param[1];
      continue ;
      
    } else {
      return /* () */0;
    }
  };
}

function iteri(f, l) {
  var _i = 0;
  var f$1 = f;
  var _param = l;
  while(true) {
    var param = _param;
    var i = _i;
    if (param) {
      Curry._2(f$1, i, param[0]);
      _param = param[1];
      _i = i + 1 | 0;
      continue ;
      
    } else {
      return /* () */0;
    }
  };
}

function fold_left(f, _accu, _l) {
  while(true) {
    var l = _l;
    var accu = _accu;
    if (l) {
      _l = l[1];
      _accu = Curry._2(f, accu, l[0]);
      continue ;
      
    } else {
      return accu;
    }
  };
}

function fold_right(f, l, accu) {
  if (l) {
    return Curry._2(f, l[0], fold_right(f, l[1], accu));
  } else {
    return accu;
  }
}

function map2(f, l1, l2) {
  if (l1) {
    if (l2) {
      var r = Curry._2(f, l1[0], l2[0]);
      return /* :: */[
              r,
              map2(f, l1[1], l2[1])
            ];
    } else {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "List.map2"
          ];
    }
  } else if (l2) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "List.map2"
        ];
  } else {
    return /* [] */0;
  }
}

function rev_map2(f, l1, l2) {
  var _accu = /* [] */0;
  var _l1 = l1;
  var _l2 = l2;
  while(true) {
    var l2$1 = _l2;
    var l1$1 = _l1;
    var accu = _accu;
    if (l1$1) {
      if (l2$1) {
        _l2 = l2$1[1];
        _l1 = l1$1[1];
        _accu = /* :: */[
          Curry._2(f, l1$1[0], l2$1[0]),
          accu
        ];
        continue ;
        
      } else {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "List.rev_map2"
            ];
      }
    } else if (l2$1) {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "List.rev_map2"
          ];
    } else {
      return accu;
    }
  };
}

function iter2(f, _l1, _l2) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    if (l1) {
      if (l2) {
        Curry._2(f, l1[0], l2[0]);
        _l2 = l2[1];
        _l1 = l1[1];
        continue ;
        
      } else {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "List.iter2"
            ];
      }
    } else if (l2) {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "List.iter2"
          ];
    } else {
      return /* () */0;
    }
  };
}

function fold_left2(f, _accu, _l1, _l2) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    var accu = _accu;
    if (l1) {
      if (l2) {
        _l2 = l2[1];
        _l1 = l1[1];
        _accu = Curry._3(f, accu, l1[0], l2[0]);
        continue ;
        
      } else {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "List.fold_left2"
            ];
      }
    } else if (l2) {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "List.fold_left2"
          ];
    } else {
      return accu;
    }
  };
}

function fold_right2(f, l1, l2, accu) {
  if (l1) {
    if (l2) {
      return Curry._3(f, l1[0], l2[0], fold_right2(f, l1[1], l2[1], accu));
    } else {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "List.fold_right2"
          ];
    }
  } else if (l2) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "List.fold_right2"
        ];
  } else {
    return accu;
  }
}

function for_all(p, _param) {
  while(true) {
    var param = _param;
    if (param) {
      if (Curry._1(p, param[0])) {
        _param = param[1];
        continue ;
        
      } else {
        return /* false */0;
      }
    } else {
      return /* true */1;
    }
  };
}

function exists(p, _param) {
  while(true) {
    var param = _param;
    if (param) {
      if (Curry._1(p, param[0])) {
        return /* true */1;
      } else {
        _param = param[1];
        continue ;
        
      }
    } else {
      return /* false */0;
    }
  };
}

function for_all2(p, _l1, _l2) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    if (l1) {
      if (l2) {
        if (Curry._2(p, l1[0], l2[0])) {
          _l2 = l2[1];
          _l1 = l1[1];
          continue ;
          
        } else {
          return /* false */0;
        }
      } else {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "List.for_all2"
            ];
      }
    } else if (l2) {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "List.for_all2"
          ];
    } else {
      return /* true */1;
    }
  };
}

function exists2(p, _l1, _l2) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    if (l1) {
      if (l2) {
        if (Curry._2(p, l1[0], l2[0])) {
          return /* true */1;
        } else {
          _l2 = l2[1];
          _l1 = l1[1];
          continue ;
          
        }
      } else {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "List.exists2"
            ];
      }
    } else if (l2) {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "List.exists2"
          ];
    } else {
      return /* false */0;
    }
  };
}

function mem(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      if (Caml_obj.caml_compare(param[0], x)) {
        _param = param[1];
        continue ;
        
      } else {
        return /* true */1;
      }
    } else {
      return /* false */0;
    }
  };
}

function memq(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      if (param[0] === x) {
        return /* true */1;
      } else {
        _param = param[1];
        continue ;
        
      }
    } else {
      return /* false */0;
    }
  };
}

function assoc(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      var match = param[0];
      if (Caml_obj.caml_compare(match[0], x)) {
        _param = param[1];
        continue ;
        
      } else {
        return match[1];
      }
    } else {
      throw Caml_builtin_exceptions.not_found;
    }
  };
}

function assq(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      var match = param[0];
      if (match[0] === x) {
        return match[1];
      } else {
        _param = param[1];
        continue ;
        
      }
    } else {
      throw Caml_builtin_exceptions.not_found;
    }
  };
}

function mem_assoc(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      if (Caml_obj.caml_compare(param[0][0], x)) {
        _param = param[1];
        continue ;
        
      } else {
        return /* true */1;
      }
    } else {
      return /* false */0;
    }
  };
}

function mem_assq(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      if (param[0][0] === x) {
        return /* true */1;
      } else {
        _param = param[1];
        continue ;
        
      }
    } else {
      return /* false */0;
    }
  };
}

function remove_assoc(x, param) {
  if (param) {
    var l = param[1];
    var pair = param[0];
    if (Caml_obj.caml_compare(pair[0], x)) {
      return /* :: */[
              pair,
              remove_assoc(x, l)
            ];
    } else {
      return l;
    }
  } else {
    return /* [] */0;
  }
}

function remove_assq(x, param) {
  if (param) {
    var l = param[1];
    var pair = param[0];
    if (pair[0] === x) {
      return l;
    } else {
      return /* :: */[
              pair,
              remove_assq(x, l)
            ];
    }
  } else {
    return /* [] */0;
  }
}

function find(p, _param) {
  while(true) {
    var param = _param;
    if (param) {
      var x = param[0];
      if (Curry._1(p, x)) {
        return x;
      } else {
        _param = param[1];
        continue ;
        
      }
    } else {
      throw Caml_builtin_exceptions.not_found;
    }
  };
}

function find_all(p) {
  return (function (param) {
      var _accu = /* [] */0;
      var _param = param;
      while(true) {
        var param$1 = _param;
        var accu = _accu;
        if (param$1) {
          var l = param$1[1];
          var x = param$1[0];
          if (Curry._1(p, x)) {
            _param = l;
            _accu = /* :: */[
              x,
              accu
            ];
            continue ;
            
          } else {
            _param = l;
            continue ;
            
          }
        } else {
          return rev_append(accu, /* [] */0);
        }
      };
    });
}

function partition(p, l) {
  var _yes = /* [] */0;
  var _no = /* [] */0;
  var _param = l;
  while(true) {
    var param = _param;
    var no = _no;
    var yes = _yes;
    if (param) {
      var l$1 = param[1];
      var x = param[0];
      if (Curry._1(p, x)) {
        _param = l$1;
        _yes = /* :: */[
          x,
          yes
        ];
        continue ;
        
      } else {
        _param = l$1;
        _no = /* :: */[
          x,
          no
        ];
        continue ;
        
      }
    } else {
      return /* tuple */[
              rev_append(yes, /* [] */0),
              rev_append(no, /* [] */0)
            ];
    }
  };
}

function split(param) {
  if (param) {
    var match = param[0];
    var match$1 = split(param[1]);
    return /* tuple */[
            /* :: */[
              match[0],
              match$1[0]
            ],
            /* :: */[
              match[1],
              match$1[1]
            ]
          ];
  } else {
    return /* tuple */[
            /* [] */0,
            /* [] */0
          ];
  }
}

function combine(l1, l2) {
  if (l1) {
    if (l2) {
      return /* :: */[
              /* tuple */[
                l1[0],
                l2[0]
              ],
              combine(l1[1], l2[1])
            ];
    } else {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "List.combine"
          ];
    }
  } else if (l2) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "List.combine"
        ];
  } else {
    return /* [] */0;
  }
}

function merge(cmp, l1, l2) {
  if (l1) {
    if (l2) {
      var h2 = l2[0];
      var h1 = l1[0];
      if (Curry._2(cmp, h1, h2) <= 0) {
        return /* :: */[
                h1,
                merge(cmp, l1[1], l2)
              ];
      } else {
        return /* :: */[
                h2,
                merge(cmp, l1, l2[1])
              ];
      }
    } else {
      return l1;
    }
  } else {
    return l2;
  }
}

function chop(_k, _l) {
  while(true) {
    var l = _l;
    var k = _k;
    if (k) {
      if (l) {
        _l = l[1];
        _k = k - 1 | 0;
        continue ;
        
      } else {
        throw [
              Caml_builtin_exceptions.assert_failure,
              [
                "list.ml",
                223,
                11
              ]
            ];
      }
    } else {
      return l;
    }
  };
}

function stable_sort(cmp, l) {
  var sort = function (n, l) {
    var exit = 0;
    if (n !== 2) {
      if (n !== 3) {
        exit = 1;
      } else if (l) {
        var match = l[1];
        if (match) {
          var match$1 = match[1];
          if (match$1) {
            var x3 = match$1[0];
            var x2 = match[0];
            var x1 = l[0];
            if (Curry._2(cmp, x1, x2) <= 0) {
              if (Curry._2(cmp, x2, x3) <= 0) {
                return /* :: */[
                        x1,
                        /* :: */[
                          x2,
                          /* :: */[
                            x3,
                            /* [] */0
                          ]
                        ]
                      ];
              } else if (Curry._2(cmp, x1, x3) <= 0) {
                return /* :: */[
                        x1,
                        /* :: */[
                          x3,
                          /* :: */[
                            x2,
                            /* [] */0
                          ]
                        ]
                      ];
              } else {
                return /* :: */[
                        x3,
                        /* :: */[
                          x1,
                          /* :: */[
                            x2,
                            /* [] */0
                          ]
                        ]
                      ];
              }
            } else if (Curry._2(cmp, x1, x3) <= 0) {
              return /* :: */[
                      x2,
                      /* :: */[
                        x1,
                        /* :: */[
                          x3,
                          /* [] */0
                        ]
                      ]
                    ];
            } else if (Curry._2(cmp, x2, x3) <= 0) {
              return /* :: */[
                      x2,
                      /* :: */[
                        x3,
                        /* :: */[
                          x1,
                          /* [] */0
                        ]
                      ]
                    ];
            } else {
              return /* :: */[
                      x3,
                      /* :: */[
                        x2,
                        /* :: */[
                          x1,
                          /* [] */0
                        ]
                      ]
                    ];
            }
          } else {
            exit = 1;
          }
        } else {
          exit = 1;
        }
      } else {
        exit = 1;
      }
    } else if (l) {
      var match$2 = l[1];
      if (match$2) {
        var x2$1 = match$2[0];
        var x1$1 = l[0];
        if (Curry._2(cmp, x1$1, x2$1) <= 0) {
          return /* :: */[
                  x1$1,
                  /* :: */[
                    x2$1,
                    /* [] */0
                  ]
                ];
        } else {
          return /* :: */[
                  x2$1,
                  /* :: */[
                    x1$1,
                    /* [] */0
                  ]
                ];
        }
      } else {
        exit = 1;
      }
    } else {
      exit = 1;
    }
    if (exit === 1) {
      var n1 = (n >> 1);
      var n2 = n - n1 | 0;
      var l2 = chop(n1, l);
      var s1 = rev_sort(n1, l);
      var s2 = rev_sort(n2, l2);
      var _l1 = s1;
      var _l2 = s2;
      var _accu = /* [] */0;
      while(true) {
        var accu = _accu;
        var l2$1 = _l2;
        var l1 = _l1;
        if (l1) {
          if (l2$1) {
            var h2 = l2$1[0];
            var h1 = l1[0];
            if (Curry._2(cmp, h1, h2) > 0) {
              _accu = /* :: */[
                h1,
                accu
              ];
              _l1 = l1[1];
              continue ;
              
            } else {
              _accu = /* :: */[
                h2,
                accu
              ];
              _l2 = l2$1[1];
              continue ;
              
            }
          } else {
            return rev_append(l1, accu);
          }
        } else {
          return rev_append(l2$1, accu);
        }
      };
    }
    
  };
  var rev_sort = function (n, l) {
    var exit = 0;
    if (n !== 2) {
      if (n !== 3) {
        exit = 1;
      } else if (l) {
        var match = l[1];
        if (match) {
          var match$1 = match[1];
          if (match$1) {
            var x3 = match$1[0];
            var x2 = match[0];
            var x1 = l[0];
            if (Curry._2(cmp, x1, x2) > 0) {
              if (Curry._2(cmp, x2, x3) > 0) {
                return /* :: */[
                        x1,
                        /* :: */[
                          x2,
                          /* :: */[
                            x3,
                            /* [] */0
                          ]
                        ]
                      ];
              } else if (Curry._2(cmp, x1, x3) > 0) {
                return /* :: */[
                        x1,
                        /* :: */[
                          x3,
                          /* :: */[
                            x2,
                            /* [] */0
                          ]
                        ]
                      ];
              } else {
                return /* :: */[
                        x3,
                        /* :: */[
                          x1,
                          /* :: */[
                            x2,
                            /* [] */0
                          ]
                        ]
                      ];
              }
            } else if (Curry._2(cmp, x1, x3) > 0) {
              return /* :: */[
                      x2,
                      /* :: */[
                        x1,
                        /* :: */[
                          x3,
                          /* [] */0
                        ]
                      ]
                    ];
            } else if (Curry._2(cmp, x2, x3) > 0) {
              return /* :: */[
                      x2,
                      /* :: */[
                        x3,
                        /* :: */[
                          x1,
                          /* [] */0
                        ]
                      ]
                    ];
            } else {
              return /* :: */[
                      x3,
                      /* :: */[
                        x2,
                        /* :: */[
                          x1,
                          /* [] */0
                        ]
                      ]
                    ];
            }
          } else {
            exit = 1;
          }
        } else {
          exit = 1;
        }
      } else {
        exit = 1;
      }
    } else if (l) {
      var match$2 = l[1];
      if (match$2) {
        var x2$1 = match$2[0];
        var x1$1 = l[0];
        if (Curry._2(cmp, x1$1, x2$1) > 0) {
          return /* :: */[
                  x1$1,
                  /* :: */[
                    x2$1,
                    /* [] */0
                  ]
                ];
        } else {
          return /* :: */[
                  x2$1,
                  /* :: */[
                    x1$1,
                    /* [] */0
                  ]
                ];
        }
      } else {
        exit = 1;
      }
    } else {
      exit = 1;
    }
    if (exit === 1) {
      var n1 = (n >> 1);
      var n2 = n - n1 | 0;
      var l2 = chop(n1, l);
      var s1 = sort(n1, l);
      var s2 = sort(n2, l2);
      var _l1 = s1;
      var _l2 = s2;
      var _accu = /* [] */0;
      while(true) {
        var accu = _accu;
        var l2$1 = _l2;
        var l1 = _l1;
        if (l1) {
          if (l2$1) {
            var h2 = l2$1[0];
            var h1 = l1[0];
            if (Curry._2(cmp, h1, h2) <= 0) {
              _accu = /* :: */[
                h1,
                accu
              ];
              _l1 = l1[1];
              continue ;
              
            } else {
              _accu = /* :: */[
                h2,
                accu
              ];
              _l2 = l2$1[1];
              continue ;
              
            }
          } else {
            return rev_append(l1, accu);
          }
        } else {
          return rev_append(l2$1, accu);
        }
      };
    }
    
  };
  var len = length(l);
  if (len < 2) {
    return l;
  } else {
    return sort(len, l);
  }
}

function sort_uniq(cmp, l) {
  var sort = function (n, l) {
    var exit = 0;
    if (n !== 2) {
      if (n !== 3) {
        exit = 1;
      } else if (l) {
        var match = l[1];
        if (match) {
          var match$1 = match[1];
          if (match$1) {
            var x3 = match$1[0];
            var x2 = match[0];
            var x1 = l[0];
            var c = Curry._2(cmp, x1, x2);
            if (c) {
              if (c < 0) {
                var c$1 = Curry._2(cmp, x2, x3);
                if (c$1) {
                  if (c$1 < 0) {
                    return /* :: */[
                            x1,
                            /* :: */[
                              x2,
                              /* :: */[
                                x3,
                                /* [] */0
                              ]
                            ]
                          ];
                  } else {
                    var c$2 = Curry._2(cmp, x1, x3);
                    if (c$2) {
                      if (c$2 < 0) {
                        return /* :: */[
                                x1,
                                /* :: */[
                                  x3,
                                  /* :: */[
                                    x2,
                                    /* [] */0
                                  ]
                                ]
                              ];
                      } else {
                        return /* :: */[
                                x3,
                                /* :: */[
                                  x1,
                                  /* :: */[
                                    x2,
                                    /* [] */0
                                  ]
                                ]
                              ];
                      }
                    } else {
                      return /* :: */[
                              x1,
                              /* :: */[
                                x2,
                                /* [] */0
                              ]
                            ];
                    }
                  }
                } else {
                  return /* :: */[
                          x1,
                          /* :: */[
                            x2,
                            /* [] */0
                          ]
                        ];
                }
              } else {
                var c$3 = Curry._2(cmp, x1, x3);
                if (c$3) {
                  if (c$3 < 0) {
                    return /* :: */[
                            x2,
                            /* :: */[
                              x1,
                              /* :: */[
                                x3,
                                /* [] */0
                              ]
                            ]
                          ];
                  } else {
                    var c$4 = Curry._2(cmp, x2, x3);
                    if (c$4) {
                      if (c$4 < 0) {
                        return /* :: */[
                                x2,
                                /* :: */[
                                  x3,
                                  /* :: */[
                                    x1,
                                    /* [] */0
                                  ]
                                ]
                              ];
                      } else {
                        return /* :: */[
                                x3,
                                /* :: */[
                                  x2,
                                  /* :: */[
                                    x1,
                                    /* [] */0
                                  ]
                                ]
                              ];
                      }
                    } else {
                      return /* :: */[
                              x2,
                              /* :: */[
                                x1,
                                /* [] */0
                              ]
                            ];
                    }
                  }
                } else {
                  return /* :: */[
                          x2,
                          /* :: */[
                            x1,
                            /* [] */0
                          ]
                        ];
                }
              }
            } else {
              var c$5 = Curry._2(cmp, x2, x3);
              if (c$5) {
                if (c$5 < 0) {
                  return /* :: */[
                          x2,
                          /* :: */[
                            x3,
                            /* [] */0
                          ]
                        ];
                } else {
                  return /* :: */[
                          x3,
                          /* :: */[
                            x2,
                            /* [] */0
                          ]
                        ];
                }
              } else {
                return /* :: */[
                        x2,
                        /* [] */0
                      ];
              }
            }
          } else {
            exit = 1;
          }
        } else {
          exit = 1;
        }
      } else {
        exit = 1;
      }
    } else if (l) {
      var match$2 = l[1];
      if (match$2) {
        var x2$1 = match$2[0];
        var x1$1 = l[0];
        var c$6 = Curry._2(cmp, x1$1, x2$1);
        if (c$6) {
          if (c$6 < 0) {
            return /* :: */[
                    x1$1,
                    /* :: */[
                      x2$1,
                      /* [] */0
                    ]
                  ];
          } else {
            return /* :: */[
                    x2$1,
                    /* :: */[
                      x1$1,
                      /* [] */0
                    ]
                  ];
          }
        } else {
          return /* :: */[
                  x1$1,
                  /* [] */0
                ];
        }
      } else {
        exit = 1;
      }
    } else {
      exit = 1;
    }
    if (exit === 1) {
      var n1 = (n >> 1);
      var n2 = n - n1 | 0;
      var l2 = chop(n1, l);
      var s1 = rev_sort(n1, l);
      var s2 = rev_sort(n2, l2);
      var _l1 = s1;
      var _l2 = s2;
      var _accu = /* [] */0;
      while(true) {
        var accu = _accu;
        var l2$1 = _l2;
        var l1 = _l1;
        if (l1) {
          if (l2$1) {
            var t2 = l2$1[1];
            var h2 = l2$1[0];
            var t1 = l1[1];
            var h1 = l1[0];
            var c$7 = Curry._2(cmp, h1, h2);
            if (c$7) {
              if (c$7 > 0) {
                _accu = /* :: */[
                  h1,
                  accu
                ];
                _l1 = t1;
                continue ;
                
              } else {
                _accu = /* :: */[
                  h2,
                  accu
                ];
                _l2 = t2;
                continue ;
                
              }
            } else {
              _accu = /* :: */[
                h1,
                accu
              ];
              _l2 = t2;
              _l1 = t1;
              continue ;
              
            }
          } else {
            return rev_append(l1, accu);
          }
        } else {
          return rev_append(l2$1, accu);
        }
      };
    }
    
  };
  var rev_sort = function (n, l) {
    var exit = 0;
    if (n !== 2) {
      if (n !== 3) {
        exit = 1;
      } else if (l) {
        var match = l[1];
        if (match) {
          var match$1 = match[1];
          if (match$1) {
            var x3 = match$1[0];
            var x2 = match[0];
            var x1 = l[0];
            var c = Curry._2(cmp, x1, x2);
            if (c) {
              if (c > 0) {
                var c$1 = Curry._2(cmp, x2, x3);
                if (c$1) {
                  if (c$1 > 0) {
                    return /* :: */[
                            x1,
                            /* :: */[
                              x2,
                              /* :: */[
                                x3,
                                /* [] */0
                              ]
                            ]
                          ];
                  } else {
                    var c$2 = Curry._2(cmp, x1, x3);
                    if (c$2) {
                      if (c$2 > 0) {
                        return /* :: */[
                                x1,
                                /* :: */[
                                  x3,
                                  /* :: */[
                                    x2,
                                    /* [] */0
                                  ]
                                ]
                              ];
                      } else {
                        return /* :: */[
                                x3,
                                /* :: */[
                                  x1,
                                  /* :: */[
                                    x2,
                                    /* [] */0
                                  ]
                                ]
                              ];
                      }
                    } else {
                      return /* :: */[
                              x1,
                              /* :: */[
                                x2,
                                /* [] */0
                              ]
                            ];
                    }
                  }
                } else {
                  return /* :: */[
                          x1,
                          /* :: */[
                            x2,
                            /* [] */0
                          ]
                        ];
                }
              } else {
                var c$3 = Curry._2(cmp, x1, x3);
                if (c$3) {
                  if (c$3 > 0) {
                    return /* :: */[
                            x2,
                            /* :: */[
                              x1,
                              /* :: */[
                                x3,
                                /* [] */0
                              ]
                            ]
                          ];
                  } else {
                    var c$4 = Curry._2(cmp, x2, x3);
                    if (c$4) {
                      if (c$4 > 0) {
                        return /* :: */[
                                x2,
                                /* :: */[
                                  x3,
                                  /* :: */[
                                    x1,
                                    /* [] */0
                                  ]
                                ]
                              ];
                      } else {
                        return /* :: */[
                                x3,
                                /* :: */[
                                  x2,
                                  /* :: */[
                                    x1,
                                    /* [] */0
                                  ]
                                ]
                              ];
                      }
                    } else {
                      return /* :: */[
                              x2,
                              /* :: */[
                                x1,
                                /* [] */0
                              ]
                            ];
                    }
                  }
                } else {
                  return /* :: */[
                          x2,
                          /* :: */[
                            x1,
                            /* [] */0
                          ]
                        ];
                }
              }
            } else {
              var c$5 = Curry._2(cmp, x2, x3);
              if (c$5) {
                if (c$5 > 0) {
                  return /* :: */[
                          x2,
                          /* :: */[
                            x3,
                            /* [] */0
                          ]
                        ];
                } else {
                  return /* :: */[
                          x3,
                          /* :: */[
                            x2,
                            /* [] */0
                          ]
                        ];
                }
              } else {
                return /* :: */[
                        x2,
                        /* [] */0
                      ];
              }
            }
          } else {
            exit = 1;
          }
        } else {
          exit = 1;
        }
      } else {
        exit = 1;
      }
    } else if (l) {
      var match$2 = l[1];
      if (match$2) {
        var x2$1 = match$2[0];
        var x1$1 = l[0];
        var c$6 = Curry._2(cmp, x1$1, x2$1);
        if (c$6) {
          if (c$6 > 0) {
            return /* :: */[
                    x1$1,
                    /* :: */[
                      x2$1,
                      /* [] */0
                    ]
                  ];
          } else {
            return /* :: */[
                    x2$1,
                    /* :: */[
                      x1$1,
                      /* [] */0
                    ]
                  ];
          }
        } else {
          return /* :: */[
                  x1$1,
                  /* [] */0
                ];
        }
      } else {
        exit = 1;
      }
    } else {
      exit = 1;
    }
    if (exit === 1) {
      var n1 = (n >> 1);
      var n2 = n - n1 | 0;
      var l2 = chop(n1, l);
      var s1 = sort(n1, l);
      var s2 = sort(n2, l2);
      var _l1 = s1;
      var _l2 = s2;
      var _accu = /* [] */0;
      while(true) {
        var accu = _accu;
        var l2$1 = _l2;
        var l1 = _l1;
        if (l1) {
          if (l2$1) {
            var t2 = l2$1[1];
            var h2 = l2$1[0];
            var t1 = l1[1];
            var h1 = l1[0];
            var c$7 = Curry._2(cmp, h1, h2);
            if (c$7) {
              if (c$7 < 0) {
                _accu = /* :: */[
                  h1,
                  accu
                ];
                _l1 = t1;
                continue ;
                
              } else {
                _accu = /* :: */[
                  h2,
                  accu
                ];
                _l2 = t2;
                continue ;
                
              }
            } else {
              _accu = /* :: */[
                h1,
                accu
              ];
              _l2 = t2;
              _l1 = t1;
              continue ;
              
            }
          } else {
            return rev_append(l1, accu);
          }
        } else {
          return rev_append(l2$1, accu);
        }
      };
    }
    
  };
  var len = length(l);
  if (len < 2) {
    return l;
  } else {
    return sort(len, l);
  }
}

var append = Pervasives.$at;

var concat = flatten;

var filter = find_all;

var sort = stable_sort;

var fast_sort = stable_sort;

exports.length       = length;
exports.hd           = hd;
exports.tl           = tl;
exports.nth          = nth;
exports.rev          = rev;
exports.append       = append;
exports.rev_append   = rev_append;
exports.concat       = concat;
exports.flatten      = flatten;
exports.iter         = iter;
exports.iteri        = iteri;
exports.map          = map;
exports.mapi         = mapi$1;
exports.rev_map      = rev_map;
exports.fold_left    = fold_left;
exports.fold_right   = fold_right;
exports.iter2        = iter2;
exports.map2         = map2;
exports.rev_map2     = rev_map2;
exports.fold_left2   = fold_left2;
exports.fold_right2  = fold_right2;
exports.for_all      = for_all;
exports.exists       = exists;
exports.for_all2     = for_all2;
exports.exists2      = exists2;
exports.mem          = mem;
exports.memq         = memq;
exports.find         = find;
exports.filter       = filter;
exports.find_all     = find_all;
exports.partition    = partition;
exports.assoc        = assoc;
exports.assq         = assq;
exports.mem_assoc    = mem_assoc;
exports.mem_assq     = mem_assq;
exports.remove_assoc = remove_assoc;
exports.remove_assq  = remove_assq;
exports.split        = split;
exports.combine      = combine;
exports.sort         = sort;
exports.stable_sort  = stable_sort;
exports.fast_sort    = fast_sort;
exports.sort_uniq    = sort_uniq;
exports.merge        = merge;
/* No side effect */

},{"./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./caml_obj.js":"stdlib/caml_obj","./curry.js":"stdlib/curry","./pervasives.js":"stdlib/pervasives"}],"stdlib/map":[function(require,module,exports){
'use strict';

var Curry                   = require("./curry.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function Make(funarg) {
  var height = function (param) {
    if (param) {
      return param[4];
    } else {
      return 0;
    }
  };
  var create = function (l, x, d, r) {
    var hl = height(l);
    var hr = height(r);
    return /* Node */[
            l,
            x,
            d,
            r,
            hl >= hr ? hl + 1 | 0 : hr + 1 | 0
          ];
  };
  var singleton = function (x, d) {
    return /* Node */[
            /* Empty */0,
            x,
            d,
            /* Empty */0,
            1
          ];
  };
  var bal = function (l, x, d, r) {
    var hl = l ? l[4] : 0;
    var hr = r ? r[4] : 0;
    if (hl > (hr + 2 | 0)) {
      if (l) {
        var lr = l[3];
        var ld = l[2];
        var lv = l[1];
        var ll = l[0];
        if (height(ll) >= height(lr)) {
          return create(ll, lv, ld, create(lr, x, d, r));
        } else if (lr) {
          return create(create(ll, lv, ld, lr[0]), lr[1], lr[2], create(lr[3], x, d, r));
        } else {
          throw [
                Caml_builtin_exceptions.invalid_argument,
                "Map.bal"
              ];
        }
      } else {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "Map.bal"
            ];
      }
    } else if (hr > (hl + 2 | 0)) {
      if (r) {
        var rr = r[3];
        var rd = r[2];
        var rv = r[1];
        var rl = r[0];
        if (height(rr) >= height(rl)) {
          return create(create(l, x, d, rl), rv, rd, rr);
        } else if (rl) {
          return create(create(l, x, d, rl[0]), rl[1], rl[2], create(rl[3], rv, rd, rr));
        } else {
          throw [
                Caml_builtin_exceptions.invalid_argument,
                "Map.bal"
              ];
        }
      } else {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "Map.bal"
            ];
      }
    } else {
      return /* Node */[
              l,
              x,
              d,
              r,
              hl >= hr ? hl + 1 | 0 : hr + 1 | 0
            ];
    }
  };
  var is_empty = function (param) {
    if (param) {
      return /* false */0;
    } else {
      return /* true */1;
    }
  };
  var add = function (x, data, param) {
    if (param) {
      var r = param[3];
      var d = param[2];
      var v = param[1];
      var l = param[0];
      var c = Curry._2(funarg[/* compare */0], x, v);
      if (c) {
        if (c < 0) {
          return bal(add(x, data, l), v, d, r);
        } else {
          return bal(l, v, d, add(x, data, r));
        }
      } else {
        return /* Node */[
                l,
                x,
                data,
                r,
                param[4]
              ];
      }
    } else {
      return /* Node */[
              /* Empty */0,
              x,
              data,
              /* Empty */0,
              1
            ];
    }
  };
  var find = function (x, _param) {
    while(true) {
      var param = _param;
      if (param) {
        var c = Curry._2(funarg[/* compare */0], x, param[1]);
        if (c) {
          _param = c < 0 ? param[0] : param[3];
          continue ;
          
        } else {
          return param[2];
        }
      } else {
        throw Caml_builtin_exceptions.not_found;
      }
    };
  };
  var mem = function (x, _param) {
    while(true) {
      var param = _param;
      if (param) {
        var c = Curry._2(funarg[/* compare */0], x, param[1]);
        if (c) {
          _param = c < 0 ? param[0] : param[3];
          continue ;
          
        } else {
          return /* true */1;
        }
      } else {
        return /* false */0;
      }
    };
  };
  var min_binding = function (_param) {
    while(true) {
      var param = _param;
      if (param) {
        var l = param[0];
        if (l) {
          _param = l;
          continue ;
          
        } else {
          return /* tuple */[
                  param[1],
                  param[2]
                ];
        }
      } else {
        throw Caml_builtin_exceptions.not_found;
      }
    };
  };
  var max_binding = function (_param) {
    while(true) {
      var param = _param;
      if (param) {
        var r = param[3];
        if (r) {
          _param = r;
          continue ;
          
        } else {
          return /* tuple */[
                  param[1],
                  param[2]
                ];
        }
      } else {
        throw Caml_builtin_exceptions.not_found;
      }
    };
  };
  var remove_min_binding = function (param) {
    if (param) {
      var l = param[0];
      if (l) {
        return bal(remove_min_binding(l), param[1], param[2], param[3]);
      } else {
        return param[3];
      }
    } else {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "Map.remove_min_elt"
          ];
    }
  };
  var remove = function (x, param) {
    if (param) {
      var r = param[3];
      var d = param[2];
      var v = param[1];
      var l = param[0];
      var c = Curry._2(funarg[/* compare */0], x, v);
      if (c) {
        if (c < 0) {
          return bal(remove(x, l), v, d, r);
        } else {
          return bal(l, v, d, remove(x, r));
        }
      } else {
        var t1 = l;
        var t2 = r;
        if (t1) {
          if (t2) {
            var match = min_binding(t2);
            return bal(t1, match[0], match[1], remove_min_binding(t2));
          } else {
            return t1;
          }
        } else {
          return t2;
        }
      }
    } else {
      return /* Empty */0;
    }
  };
  var iter = function (f, _param) {
    while(true) {
      var param = _param;
      if (param) {
        iter(f, param[0]);
        Curry._2(f, param[1], param[2]);
        _param = param[3];
        continue ;
        
      } else {
        return /* () */0;
      }
    };
  };
  var map = function (f, param) {
    if (param) {
      var l$prime = map(f, param[0]);
      var d$prime = Curry._1(f, param[2]);
      var r$prime = map(f, param[3]);
      return /* Node */[
              l$prime,
              param[1],
              d$prime,
              r$prime,
              param[4]
            ];
    } else {
      return /* Empty */0;
    }
  };
  var mapi = function (f, param) {
    if (param) {
      var v = param[1];
      var l$prime = mapi(f, param[0]);
      var d$prime = Curry._2(f, v, param[2]);
      var r$prime = mapi(f, param[3]);
      return /* Node */[
              l$prime,
              v,
              d$prime,
              r$prime,
              param[4]
            ];
    } else {
      return /* Empty */0;
    }
  };
  var fold = function (f, _m, _accu) {
    while(true) {
      var accu = _accu;
      var m = _m;
      if (m) {
        _accu = Curry._3(f, m[1], m[2], fold(f, m[0], accu));
        _m = m[3];
        continue ;
        
      } else {
        return accu;
      }
    };
  };
  var for_all = function (p, _param) {
    while(true) {
      var param = _param;
      if (param) {
        if (Curry._2(p, param[1], param[2])) {
          if (for_all(p, param[0])) {
            _param = param[3];
            continue ;
            
          } else {
            return /* false */0;
          }
        } else {
          return /* false */0;
        }
      } else {
        return /* true */1;
      }
    };
  };
  var exists = function (p, _param) {
    while(true) {
      var param = _param;
      if (param) {
        if (Curry._2(p, param[1], param[2])) {
          return /* true */1;
        } else if (exists(p, param[0])) {
          return /* true */1;
        } else {
          _param = param[3];
          continue ;
          
        }
      } else {
        return /* false */0;
      }
    };
  };
  var add_min_binding = function (k, v, param) {
    if (param) {
      return bal(add_min_binding(k, v, param[0]), param[1], param[2], param[3]);
    } else {
      return singleton(k, v);
    }
  };
  var add_max_binding = function (k, v, param) {
    if (param) {
      return bal(param[0], param[1], param[2], add_max_binding(k, v, param[3]));
    } else {
      return singleton(k, v);
    }
  };
  var join = function (l, v, d, r) {
    if (l) {
      if (r) {
        var rh = r[4];
        var lh = l[4];
        if (lh > (rh + 2 | 0)) {
          return bal(l[0], l[1], l[2], join(l[3], v, d, r));
        } else if (rh > (lh + 2 | 0)) {
          return bal(join(l, v, d, r[0]), r[1], r[2], r[3]);
        } else {
          return create(l, v, d, r);
        }
      } else {
        return add_max_binding(v, d, l);
      }
    } else {
      return add_min_binding(v, d, r);
    }
  };
  var concat = function (t1, t2) {
    if (t1) {
      if (t2) {
        var match = min_binding(t2);
        return join(t1, match[0], match[1], remove_min_binding(t2));
      } else {
        return t1;
      }
    } else {
      return t2;
    }
  };
  var concat_or_join = function (t1, v, d, t2) {
    if (d) {
      return join(t1, v, d[0], t2);
    } else {
      return concat(t1, t2);
    }
  };
  var split = function (x, param) {
    if (param) {
      var r = param[3];
      var d = param[2];
      var v = param[1];
      var l = param[0];
      var c = Curry._2(funarg[/* compare */0], x, v);
      if (c) {
        if (c < 0) {
          var match = split(x, l);
          return /* tuple */[
                  match[0],
                  match[1],
                  join(match[2], v, d, r)
                ];
        } else {
          var match$1 = split(x, r);
          return /* tuple */[
                  join(l, v, d, match$1[0]),
                  match$1[1],
                  match$1[2]
                ];
        }
      } else {
        return /* tuple */[
                l,
                /* Some */[d],
                r
              ];
      }
    } else {
      return /* tuple */[
              /* Empty */0,
              /* None */0,
              /* Empty */0
            ];
    }
  };
  var merge = function (f, s1, s2) {
    var exit = 0;
    if (s1) {
      var v1 = s1[1];
      if (s1[4] >= height(s2)) {
        var match = split(v1, s2);
        return concat_or_join(merge(f, s1[0], match[0]), v1, Curry._3(f, v1, /* Some */[s1[2]], match[1]), merge(f, s1[3], match[2]));
      } else {
        exit = 1;
      }
    } else if (s2) {
      exit = 1;
    } else {
      return /* Empty */0;
    }
    if (exit === 1) {
      if (s2) {
        var v2 = s2[1];
        var match$1 = split(v2, s1);
        return concat_or_join(merge(f, match$1[0], s2[0]), v2, Curry._3(f, v2, match$1[1], /* Some */[s2[2]]), merge(f, match$1[2], s2[3]));
      } else {
        throw [
              Caml_builtin_exceptions.assert_failure,
              [
                "map.ml",
                270,
                10
              ]
            ];
      }
    }
    
  };
  var filter = function (p, param) {
    if (param) {
      var d = param[2];
      var v = param[1];
      var l$prime = filter(p, param[0]);
      var pvd = Curry._2(p, v, d);
      var r$prime = filter(p, param[3]);
      if (pvd) {
        return join(l$prime, v, d, r$prime);
      } else {
        return concat(l$prime, r$prime);
      }
    } else {
      return /* Empty */0;
    }
  };
  var partition = function (p, param) {
    if (param) {
      var d = param[2];
      var v = param[1];
      var match = partition(p, param[0]);
      var lf = match[1];
      var lt = match[0];
      var pvd = Curry._2(p, v, d);
      var match$1 = partition(p, param[3]);
      var rf = match$1[1];
      var rt = match$1[0];
      if (pvd) {
        return /* tuple */[
                join(lt, v, d, rt),
                concat(lf, rf)
              ];
      } else {
        return /* tuple */[
                concat(lt, rt),
                join(lf, v, d, rf)
              ];
      }
    } else {
      return /* tuple */[
              /* Empty */0,
              /* Empty */0
            ];
    }
  };
  var cons_enum = function (_m, _e) {
    while(true) {
      var e = _e;
      var m = _m;
      if (m) {
        _e = /* More */[
          m[1],
          m[2],
          m[3],
          e
        ];
        _m = m[0];
        continue ;
        
      } else {
        return e;
      }
    };
  };
  var compare = function (cmp, m1, m2) {
    var _e1 = cons_enum(m1, /* End */0);
    var _e2 = cons_enum(m2, /* End */0);
    while(true) {
      var e2 = _e2;
      var e1 = _e1;
      if (e1) {
        if (e2) {
          var c = Curry._2(funarg[/* compare */0], e1[0], e2[0]);
          if (c !== 0) {
            return c;
          } else {
            var c$1 = Curry._2(cmp, e1[1], e2[1]);
            if (c$1 !== 0) {
              return c$1;
            } else {
              _e2 = cons_enum(e2[2], e2[3]);
              _e1 = cons_enum(e1[2], e1[3]);
              continue ;
              
            }
          }
        } else {
          return 1;
        }
      } else if (e2) {
        return -1;
      } else {
        return 0;
      }
    };
  };
  var equal = function (cmp, m1, m2) {
    var _e1 = cons_enum(m1, /* End */0);
    var _e2 = cons_enum(m2, /* End */0);
    while(true) {
      var e2 = _e2;
      var e1 = _e1;
      if (e1) {
        if (e2) {
          if (Curry._2(funarg[/* compare */0], e1[0], e2[0])) {
            return /* false */0;
          } else if (Curry._2(cmp, e1[1], e2[1])) {
            _e2 = cons_enum(e2[2], e2[3]);
            _e1 = cons_enum(e1[2], e1[3]);
            continue ;
            
          } else {
            return /* false */0;
          }
        } else {
          return /* false */0;
        }
      } else if (e2) {
        return /* false */0;
      } else {
        return /* true */1;
      }
    };
  };
  var cardinal = function (param) {
    if (param) {
      return (cardinal(param[0]) + 1 | 0) + cardinal(param[3]) | 0;
    } else {
      return 0;
    }
  };
  var bindings_aux = function (_accu, _param) {
    while(true) {
      var param = _param;
      var accu = _accu;
      if (param) {
        _param = param[0];
        _accu = /* :: */[
          /* tuple */[
            param[1],
            param[2]
          ],
          bindings_aux(accu, param[3])
        ];
        continue ;
        
      } else {
        return accu;
      }
    };
  };
  var bindings = function (s) {
    return bindings_aux(/* [] */0, s);
  };
  return [
          /* Empty */0,
          is_empty,
          mem,
          add,
          singleton,
          remove,
          merge,
          compare,
          equal,
          iter,
          fold,
          for_all,
          exists,
          filter,
          partition,
          cardinal,
          bindings,
          min_binding,
          max_binding,
          min_binding,
          split,
          find,
          map,
          mapi
        ];
}

exports.Make = Make;
/* No side effect */

},{"./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./curry.js":"stdlib/curry"}],"stdlib/marshal":[function(require,module,exports){
'use strict';

var Caml_string             = require("./caml_string.js");
var Caml_missing_polyfill   = require("./caml_missing_polyfill.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function to_buffer(buff, ofs, len, _, _$1) {
  if (ofs < 0 || len < 0 || ofs > (buff.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Marshal.to_buffer: substring out of bounds"
        ];
  } else {
    return Caml_missing_polyfill.not_implemented("caml_output_value_to_buffer not implemented by bucklescript yet\n");
  }
}

function data_size(buff, ofs) {
  if (ofs < 0 || ofs > (buff.length - 20 | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Marshal.data_size"
        ];
  } else {
    return Caml_missing_polyfill.not_implemented("caml_marshal_data_size not implemented by bucklescript yet\n");
  }
}

function total_size(buff, ofs) {
  return 20 + data_size(buff, ofs) | 0;
}

function from_bytes(buff, ofs) {
  if (ofs < 0 || ofs > (buff.length - 20 | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Marshal.from_bytes"
        ];
  } else {
    var len = Caml_missing_polyfill.not_implemented("caml_marshal_data_size not implemented by bucklescript yet\n");
    if (ofs > (buff.length - (20 + len | 0) | 0)) {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "Marshal.from_bytes"
          ];
    } else {
      return Caml_missing_polyfill.not_implemented("caml_input_value_from_string not implemented by bucklescript yet\n");
    }
  }
}

function from_string(buff, ofs) {
  return from_bytes(Caml_string.bytes_of_string(buff), ofs);
}

function to_channel(_, _$1, _$2) {
  return Caml_missing_polyfill.not_implemented("caml_output_value not implemented by bucklescript yet\n");
}

function from_channel() {
  return Caml_missing_polyfill.not_implemented("caml_input_value not implemented by bucklescript yet\n");
}

var header_size = 20;

exports.to_channel   = to_channel;
exports.to_buffer    = to_buffer;
exports.from_channel = from_channel;
exports.from_bytes   = from_bytes;
exports.from_string  = from_string;
exports.header_size  = header_size;
exports.data_size    = data_size;
exports.total_size   = total_size;
/* No side effect */

},{"./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./caml_missing_polyfill.js":"stdlib/caml_missing_polyfill","./caml_string.js":"stdlib/caml_string"}],"stdlib/moreLabels":[function(require,module,exports){
'use strict';

var $$Map   = require("./map.js");
var $$Set   = require("./set.js");
var Hashtbl = require("./hashtbl.js");

var Hashtbl$1 = /* Hashtbl */[
  Hashtbl.create,
  Hashtbl.clear,
  Hashtbl.reset,
  Hashtbl.copy,
  Hashtbl.add,
  Hashtbl.find,
  Hashtbl.find_all,
  Hashtbl.mem,
  Hashtbl.remove,
  Hashtbl.replace,
  Hashtbl.iter,
  Hashtbl.fold,
  Hashtbl.length,
  Hashtbl.randomize,
  Hashtbl.stats,
  Hashtbl.Make,
  Hashtbl.MakeSeeded,
  Hashtbl.hash,
  Hashtbl.seeded_hash,
  Hashtbl.hash_param,
  Hashtbl.seeded_hash_param
];

var $$Map$1 = /* Map */[$$Map.Make];

var $$Set$1 = /* Set */[$$Set.Make];

exports.Hashtbl = Hashtbl$1;
exports.$$Map   = $$Map$1;
exports.$$Set   = $$Set$1;
/* Hashtbl Not a pure module */

},{"./hashtbl.js":"stdlib/hashtbl","./map.js":"stdlib/map","./set.js":"stdlib/set"}],"stdlib/nativeint":[function(require,module,exports){
'use strict';

var Sys         = require("./sys.js");
var Caml_obj    = require("./caml_obj.js");
var Caml_format = require("./caml_format.js");

function succ(n) {
  return n + 1;
}

function pred(n) {
  return n - 1;
}

function abs(n) {
  if (n >= 0) {
    return n;
  } else {
    return -n;
  }
}

var min_int = -9007199254740991;

var max_int = 9007199254740991;

function lognot(n) {
  return n ^ -1;
}

function to_string(n) {
  return Caml_format.caml_nativeint_format("%d", n);
}

var compare = Caml_obj.caml_nativeint_compare;

var zero = 0;

var one = 1;

var minus_one = -1;

var size = Sys.word_size;

exports.zero      = zero;
exports.one       = one;
exports.minus_one = minus_one;
exports.succ      = succ;
exports.pred      = pred;
exports.abs       = abs;
exports.size      = size;
exports.max_int   = max_int;
exports.min_int   = min_int;
exports.lognot    = lognot;
exports.to_string = to_string;
exports.compare   = compare;
/* No side effect */

},{"./caml_format.js":"stdlib/caml_format","./caml_obj.js":"stdlib/caml_obj","./sys.js":"stdlib/sys"}],"stdlib/node_buffer":[function(require,module,exports){
arguments[4]["stdlib/bs_dict"][0].apply(exports,arguments)
},{"dup":"stdlib/bs_dict"}],"stdlib/node_child_process":[function(require,module,exports){
arguments[4]["stdlib/bs_dict"][0].apply(exports,arguments)
},{"dup":"stdlib/bs_dict"}],"stdlib/node_fs":[function(require,module,exports){
arguments[4]["stdlib/bs_node_fs"][0].apply(exports,arguments)
},{"dup":"stdlib/bs_node_fs"}],"stdlib/node_module":[function(require,module,exports){
arguments[4]["stdlib/bs_dict"][0].apply(exports,arguments)
},{"dup":"stdlib/bs_dict"}],"stdlib/node_path":[function(require,module,exports){
arguments[4]["stdlib/bs_dict"][0].apply(exports,arguments)
},{"dup":"stdlib/bs_dict"}],"stdlib/node_process":[function(require,module,exports){
'use strict';

var Js_dict = require("./js_dict.js");
var Process = require("process");

function putEnvVar(key, $$var) {
  Process.env[key] = $$var;
  return /* () */0;
}

function deleteEnvVar(s) {
  return Js_dict.unsafeDeleteKey(Process.env, s);
}

exports.putEnvVar    = putEnvVar;
exports.deleteEnvVar = deleteEnvVar;
/* Js_dict Not a pure module */

},{"./js_dict.js":"stdlib/js_dict","process":1}],"stdlib/node":[function(require,module,exports){
'use strict';


function test(x) {
  if (typeof x === "string") {
    return /* tuple */[
            /* String */0,
            x
          ];
  } else {
    return /* tuple */[
            /* Buffer */1,
            x
          ];
  }
}

var Path = 0;

var Fs = 0;

var Process = 0;

var Module = 0;

var Buffer = 0;

var Child_process = 0;

exports.Path          = Path;
exports.Fs            = Fs;
exports.Process       = Process;
exports.Module        = Module;
exports.Buffer        = Buffer;
exports.Child_process = Child_process;
exports.test          = test;
/* No side effect */

},{}],"stdlib/obj":[function(require,module,exports){
'use strict';

var Marshal                 = require("./marshal.js");
var Caml_array              = require("./caml_array.js");
var Caml_missing_polyfill   = require("./caml_missing_polyfill.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

var double_field = Caml_array.caml_array_get;

var set_double_field = Caml_array.caml_array_set;

function marshal() {
  return Caml_missing_polyfill.not_implemented("caml_output_value_to_string not implemented by bucklescript yet\n");
}

function unmarshal(str, pos) {
  return /* tuple */[
          Marshal.from_bytes(str, pos),
          pos + Marshal.total_size(str, pos) | 0
        ];
}

function extension_slot(x) {
  var slot = x.length !== undefined && (x.tag | 0) !== 248 && x.length >= 1 ? x[0] : x;
  var name;
  if (slot.length !== undefined && slot.tag === 248) {
    name = slot[0];
  } else {
    throw Caml_builtin_exceptions.not_found;
  }
  if (name.tag === 252) {
    return slot;
  } else {
    throw Caml_builtin_exceptions.not_found;
  }
}

function extension_name(x) {
  try {
    var slot = extension_slot(x);
    return slot[0];
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "Obj.extension_name"
          ];
    } else {
      throw exn;
    }
  }
}

function extension_id(x) {
  try {
    var slot = extension_slot(x);
    return slot[1];
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "Obj.extension_id"
          ];
    } else {
      throw exn;
    }
  }
}

function extension_slot$1(x) {
  try {
    return extension_slot(x);
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "Obj.extension_slot"
          ];
    } else {
      throw exn;
    }
  }
}

var first_non_constant_constructor_tag = 0;

var last_non_constant_constructor_tag = 245;

var lazy_tag = 246;

var closure_tag = 247;

var object_tag = 248;

var infix_tag = 249;

var forward_tag = 250;

var no_scan_tag = 251;

var abstract_tag = 251;

var string_tag = 252;

var double_tag = 253;

var double_array_tag = 254;

var custom_tag = 255;

var final_tag = 255;

var int_tag = 1000;

var out_of_heap_tag = 1001;

var unaligned_tag = 1002;

exports.double_field                       = double_field;
exports.set_double_field                   = set_double_field;
exports.first_non_constant_constructor_tag = first_non_constant_constructor_tag;
exports.last_non_constant_constructor_tag  = last_non_constant_constructor_tag;
exports.lazy_tag                           = lazy_tag;
exports.closure_tag                        = closure_tag;
exports.object_tag                         = object_tag;
exports.infix_tag                          = infix_tag;
exports.forward_tag                        = forward_tag;
exports.no_scan_tag                        = no_scan_tag;
exports.abstract_tag                       = abstract_tag;
exports.string_tag                         = string_tag;
exports.double_tag                         = double_tag;
exports.double_array_tag                   = double_array_tag;
exports.custom_tag                         = custom_tag;
exports.final_tag                          = final_tag;
exports.int_tag                            = int_tag;
exports.out_of_heap_tag                    = out_of_heap_tag;
exports.unaligned_tag                      = unaligned_tag;
exports.extension_name                     = extension_name;
exports.extension_id                       = extension_id;
exports.extension_slot                     = extension_slot$1;
exports.marshal                            = marshal;
exports.unmarshal                          = unmarshal;
/* No side effect */

},{"./caml_array.js":"stdlib/caml_array","./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./caml_missing_polyfill.js":"stdlib/caml_missing_polyfill","./marshal.js":"stdlib/marshal"}],"stdlib/oo":[function(require,module,exports){
'use strict';

var CamlinternalOO = require("./camlinternalOO.js");

var copy = CamlinternalOO.copy;

var new_method = CamlinternalOO.public_method_label;

var public_method_label = CamlinternalOO.public_method_label;

exports.copy                = copy;
exports.new_method          = new_method;
exports.public_method_label = public_method_label;
/* No side effect */

},{"./camlinternalOO.js":"stdlib/camlinternalOO"}],"stdlib/parsing":[function(require,module,exports){
'use strict';

var $$Array         = require("./array.js");
var Curry           = require("./curry.js");
var Js_exn          = require("./js_exn.js");
var Lexing          = require("./lexing.js");
var Caml_obj        = require("./caml_obj.js");
var Caml_array      = require("./caml_array.js");
var Caml_parser     = require("./caml_parser.js");
var Caml_exceptions = require("./caml_exceptions.js");

var YYexit = Caml_exceptions.create("Parsing.YYexit");

var Parse_error = Caml_exceptions.create("Parsing.Parse_error");

var env = /* record */[
  /* s_stack */Caml_array.caml_make_vect(100, 0),
  /* v_stack */Caml_array.caml_make_vect(100, /* () */0),
  /* symb_start_stack */Caml_array.caml_make_vect(100, Lexing.dummy_pos),
  /* symb_end_stack */Caml_array.caml_make_vect(100, Lexing.dummy_pos),
  /* stacksize */100,
  /* stackbase */0,
  /* curr_char */0,
  /* lval : () */0,
  /* symb_start */Lexing.dummy_pos,
  /* symb_end */Lexing.dummy_pos,
  /* asp */0,
  /* rule_len */0,
  /* rule_number */0,
  /* sp */0,
  /* state */0,
  /* errflag */0
];

function grow_stacks() {
  var oldsize = env[/* stacksize */4];
  var newsize = (oldsize << 1);
  var new_s = Caml_array.caml_make_vect(newsize, 0);
  var new_v = Caml_array.caml_make_vect(newsize, /* () */0);
  var new_start = Caml_array.caml_make_vect(newsize, Lexing.dummy_pos);
  var new_end = Caml_array.caml_make_vect(newsize, Lexing.dummy_pos);
  $$Array.blit(env[/* s_stack */0], 0, new_s, 0, oldsize);
  env[/* s_stack */0] = new_s;
  $$Array.blit(env[/* v_stack */1], 0, new_v, 0, oldsize);
  env[/* v_stack */1] = new_v;
  $$Array.blit(env[/* symb_start_stack */2], 0, new_start, 0, oldsize);
  env[/* symb_start_stack */2] = new_start;
  $$Array.blit(env[/* symb_end_stack */3], 0, new_end, 0, oldsize);
  env[/* symb_end_stack */3] = new_end;
  env[/* stacksize */4] = newsize;
  return /* () */0;
}

function clear_parser() {
  $$Array.fill(env[/* v_stack */1], 0, env[/* stacksize */4], /* () */0);
  env[/* lval */7] = /* () */0;
  return /* () */0;
}

var current_lookahead_fun = [(function () {
      return /* false */0;
    })];

function yyparse(tables, start, lexer, lexbuf) {
  var init_asp = env[/* asp */10];
  var init_sp = env[/* sp */13];
  var init_stackbase = env[/* stackbase */5];
  var init_state = env[/* state */14];
  var init_curr_char = env[/* curr_char */6];
  var init_lval = env[/* lval */7];
  var init_errflag = env[/* errflag */15];
  env[/* stackbase */5] = env[/* sp */13] + 1 | 0;
  env[/* curr_char */6] = start;
  env[/* symb_end */9] = lexbuf[/* lex_curr_p */11];
  try {
    var _cmd = /* Start */0;
    var _arg = /* () */0;
    while(true) {
      var arg = _arg;
      var cmd = _cmd;
      var match = Caml_parser.caml_parse_engine(tables, env, cmd, arg);
      switch (match) {
        case 0 : 
            var t = Curry._1(lexer, lexbuf);
            env[/* symb_start */8] = lexbuf[/* lex_start_p */10];
            env[/* symb_end */9] = lexbuf[/* lex_curr_p */11];
            _arg = t;
            _cmd = /* Token_read */1;
            continue ;
            case 1 : 
            throw Parse_error;
        case 2 : 
            grow_stacks(/* () */0);
            _arg = /* () */0;
            _cmd = /* Stacks_grown_1 */2;
            continue ;
            case 3 : 
            grow_stacks(/* () */0);
            _arg = /* () */0;
            _cmd = /* Stacks_grown_2 */3;
            continue ;
            case 4 : 
            var match$1;
            try {
              match$1 = /* tuple */[
                /* Semantic_action_computed */4,
                Curry._1(Caml_array.caml_array_get(tables[/* actions */0], env[/* rule_number */12]), env)
              ];
            }
            catch (exn){
              if (exn === Parse_error) {
                match$1 = /* tuple */[
                  /* Error_detected */5,
                  /* () */0
                ];
              } else {
                throw exn;
              }
            }
            _arg = match$1[1];
            _cmd = match$1[0];
            continue ;
            case 5 : 
            Curry._1(tables[/* error_function */13], "syntax error");
            _arg = /* () */0;
            _cmd = /* Error_detected */5;
            continue ;
            
      }
    };
  }
  catch (raw_exn){
    var exn$1 = Js_exn.internalToOCamlException(raw_exn);
    var curr_char = env[/* curr_char */6];
    env[/* asp */10] = init_asp;
    env[/* sp */13] = init_sp;
    env[/* stackbase */5] = init_stackbase;
    env[/* state */14] = init_state;
    env[/* curr_char */6] = init_curr_char;
    env[/* lval */7] = init_lval;
    env[/* errflag */15] = init_errflag;
    if (exn$1[0] === YYexit) {
      return exn$1[1];
    } else {
      current_lookahead_fun[0] = (function (tok) {
          if (tok.length !== undefined) {
            return +(Caml_array.caml_array_get(tables[/* transl_block */2], tok.tag | 0) === curr_char);
          } else {
            return +(Caml_array.caml_array_get(tables[/* transl_const */1], tok) === curr_char);
          }
        });
      throw exn$1;
    }
  }
}

function peek_val(env, n) {
  return Caml_array.caml_array_get(env[/* v_stack */1], env[/* asp */10] - n | 0);
}

function symbol_start_pos() {
  var _i = env[/* rule_len */11];
  while(true) {
    var i = _i;
    if (i <= 0) {
      return Caml_array.caml_array_get(env[/* symb_end_stack */3], env[/* asp */10]);
    } else {
      var st = Caml_array.caml_array_get(env[/* symb_start_stack */2], (env[/* asp */10] - i | 0) + 1 | 0);
      var en = Caml_array.caml_array_get(env[/* symb_end_stack */3], (env[/* asp */10] - i | 0) + 1 | 0);
      if (Caml_obj.caml_notequal(st, en)) {
        return st;
      } else {
        _i = i - 1 | 0;
        continue ;
        
      }
    }
  };
}

function symbol_end_pos() {
  return Caml_array.caml_array_get(env[/* symb_end_stack */3], env[/* asp */10]);
}

function rhs_start_pos(n) {
  return Caml_array.caml_array_get(env[/* symb_start_stack */2], env[/* asp */10] - (env[/* rule_len */11] - n | 0) | 0);
}

function rhs_end_pos(n) {
  return Caml_array.caml_array_get(env[/* symb_end_stack */3], env[/* asp */10] - (env[/* rule_len */11] - n | 0) | 0);
}

function symbol_start() {
  return symbol_start_pos(/* () */0)[/* pos_cnum */3];
}

function symbol_end() {
  return symbol_end_pos(/* () */0)[/* pos_cnum */3];
}

function rhs_start(n) {
  return rhs_start_pos(n)[/* pos_cnum */3];
}

function rhs_end(n) {
  return rhs_end_pos(n)[/* pos_cnum */3];
}

function is_current_lookahead(tok) {
  return Curry._1(current_lookahead_fun[0], tok);
}

function parse_error() {
  return /* () */0;
}

var set_trace = Caml_parser.caml_set_parser_trace;

exports.symbol_start         = symbol_start;
exports.symbol_end           = symbol_end;
exports.rhs_start            = rhs_start;
exports.rhs_end              = rhs_end;
exports.symbol_start_pos     = symbol_start_pos;
exports.symbol_end_pos       = symbol_end_pos;
exports.rhs_start_pos        = rhs_start_pos;
exports.rhs_end_pos          = rhs_end_pos;
exports.clear_parser         = clear_parser;
exports.Parse_error          = Parse_error;
exports.set_trace            = set_trace;
exports.YYexit               = YYexit;
exports.yyparse              = yyparse;
exports.peek_val             = peek_val;
exports.is_current_lookahead = is_current_lookahead;
exports.parse_error          = parse_error;
/* No side effect */

},{"./array.js":"stdlib/array","./caml_array.js":"stdlib/caml_array","./caml_exceptions.js":"stdlib/caml_exceptions","./caml_obj.js":"stdlib/caml_obj","./caml_parser.js":"stdlib/caml_parser","./curry.js":"stdlib/curry","./js_exn.js":"stdlib/js_exn","./lexing.js":"stdlib/lexing"}],"stdlib/pervasives":[function(require,module,exports){
'use strict';

var Curry                    = require("./curry.js");
var Caml_io                  = require("./caml_io.js");
var Caml_obj                 = require("./caml_obj.js");
var Caml_sys                 = require("./caml_sys.js");
var Caml_format              = require("./caml_format.js");
var Caml_string              = require("./caml_string.js");
var Caml_exceptions          = require("./caml_exceptions.js");
var Caml_missing_polyfill    = require("./caml_missing_polyfill.js");
var Caml_builtin_exceptions  = require("./caml_builtin_exceptions.js");
var CamlinternalFormatBasics = require("./camlinternalFormatBasics.js");

function failwith(s) {
  throw [
        Caml_builtin_exceptions.failure,
        s
      ];
}

function invalid_arg(s) {
  throw [
        Caml_builtin_exceptions.invalid_argument,
        s
      ];
}

var Exit = Caml_exceptions.create("Pervasives.Exit");

function min(x, y) {
  if (Caml_obj.caml_lessequal(x, y)) {
    return x;
  } else {
    return y;
  }
}

function max(x, y) {
  if (Caml_obj.caml_greaterequal(x, y)) {
    return x;
  } else {
    return y;
  }
}

function abs(x) {
  if (x >= 0) {
    return x;
  } else {
    return -x | 0;
  }
}

function lnot(x) {
  return x ^ -1;
}

var min_int = -2147483648;

function $caret(a, b) {
  return a + b;
}

function char_of_int(n) {
  if (n < 0 || n > 255) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "char_of_int"
        ];
  } else {
    return n;
  }
}

function string_of_bool(b) {
  if (b) {
    return "true";
  } else {
    return "false";
  }
}

function bool_of_string(param) {
  switch (param) {
    case "false" : 
        return /* false */0;
    case "true" : 
        return /* true */1;
    default:
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "bool_of_string"
          ];
  }
}

function string_of_int(param) {
  return "" + param;
}

function valid_float_lexem(s) {
  var l = s.length;
  var _i = 0;
  while(true) {
    var i = _i;
    if (i >= l) {
      return $caret(s, ".");
    } else {
      var match = Caml_string.get(s, i);
      if (match >= 48) {
        if (match >= 58) {
          return s;
        } else {
          _i = i + 1 | 0;
          continue ;
          
        }
      } else if (match !== 45) {
        return s;
      } else {
        _i = i + 1 | 0;
        continue ;
        
      }
    }
  };
}

function string_of_float(f) {
  return valid_float_lexem(Caml_format.caml_format_float("%.12g", f));
}

function $at(l1, l2) {
  if (l1) {
    return /* :: */[
            l1[0],
            $at(l1[1], l2)
          ];
  } else {
    return l2;
  }
}

var stdin = Caml_io.stdin;

var stdout = Caml_io.stdout;

var stderr = Caml_io.stderr;

function open_out_gen(_, _$1, _$2) {
  return Caml_io.caml_ml_open_descriptor_out(Caml_missing_polyfill.not_implemented("caml_sys_open not implemented by bucklescript yet\n"));
}

function open_out(name) {
  return open_out_gen(/* :: */[
              /* Open_wronly */1,
              /* :: */[
                /* Open_creat */3,
                /* :: */[
                  /* Open_trunc */4,
                  /* :: */[
                    /* Open_text */7,
                    /* [] */0
                  ]
                ]
              ]
            ], 438, name);
}

function open_out_bin(name) {
  return open_out_gen(/* :: */[
              /* Open_wronly */1,
              /* :: */[
                /* Open_creat */3,
                /* :: */[
                  /* Open_trunc */4,
                  /* :: */[
                    /* Open_binary */6,
                    /* [] */0
                  ]
                ]
              ]
            ], 438, name);
}

function flush_all() {
  var _param = Caml_io.caml_ml_out_channels_list(/* () */0);
  while(true) {
    var param = _param;
    if (param) {
      try {
        Caml_io.caml_ml_flush(param[0]);
      }
      catch (exn){
        
      }
      _param = param[1];
      continue ;
      
    } else {
      return /* () */0;
    }
  };
}

function output_bytes(oc, s) {
  return Caml_io.caml_ml_output(oc, s, 0, s.length);
}

function output_string(oc, s) {
  return Caml_io.caml_ml_output(oc, s, 0, s.length);
}

function output(oc, s, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "output"
        ];
  } else {
    return Caml_io.caml_ml_output(oc, s, ofs, len);
  }
}

function output_substring(oc, s, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "output_substring"
        ];
  } else {
    return Caml_io.caml_ml_output(oc, s, ofs, len);
  }
}

function output_value(_, _$1) {
  return Caml_missing_polyfill.not_implemented("caml_output_value not implemented by bucklescript yet\n");
}

function close_out(oc) {
  Caml_io.caml_ml_flush(oc);
  return Caml_missing_polyfill.not_implemented("caml_ml_close_channel not implemented by bucklescript yet\n");
}

function close_out_noerr(oc) {
  try {
    Caml_io.caml_ml_flush(oc);
  }
  catch (exn){
    
  }
  try {
    return Caml_missing_polyfill.not_implemented("caml_ml_close_channel not implemented by bucklescript yet\n");
  }
  catch (exn$1){
    return /* () */0;
  }
}

function open_in_gen(_, _$1, _$2) {
  return Caml_io.caml_ml_open_descriptor_in(Caml_missing_polyfill.not_implemented("caml_sys_open not implemented by bucklescript yet\n"));
}

function open_in(name) {
  return open_in_gen(/* :: */[
              /* Open_rdonly */0,
              /* :: */[
                /* Open_text */7,
                /* [] */0
              ]
            ], 0, name);
}

function open_in_bin(name) {
  return open_in_gen(/* :: */[
              /* Open_rdonly */0,
              /* :: */[
                /* Open_binary */6,
                /* [] */0
              ]
            ], 0, name);
}

function input(_, s, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "input"
        ];
  } else {
    return Caml_missing_polyfill.not_implemented("caml_ml_input not implemented by bucklescript yet\n");
  }
}

function unsafe_really_input(_, _$1, _ofs, _len) {
  while(true) {
    var len = _len;
    var ofs = _ofs;
    if (len <= 0) {
      return /* () */0;
    } else {
      var r = Caml_missing_polyfill.not_implemented("caml_ml_input not implemented by bucklescript yet\n");
      if (r) {
        _len = len - r | 0;
        _ofs = ofs + r | 0;
        continue ;
        
      } else {
        throw Caml_builtin_exceptions.end_of_file;
      }
    }
  };
}

function really_input(ic, s, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "really_input"
        ];
  } else {
    return unsafe_really_input(ic, s, ofs, len);
  }
}

function really_input_string(ic, len) {
  var s = Caml_string.caml_create_string(len);
  really_input(ic, s, 0, len);
  return Caml_string.bytes_to_string(s);
}

function input_line(chan) {
  var build_result = function (buf, _pos, _param) {
    while(true) {
      var param = _param;
      var pos = _pos;
      if (param) {
        var hd = param[0];
        var len = hd.length;
        Caml_string.caml_blit_bytes(hd, 0, buf, pos - len | 0, len);
        _param = param[1];
        _pos = pos - len | 0;
        continue ;
        
      } else {
        return buf;
      }
    };
  };
  var scan = function (_accu, _len) {
    while(true) {
      var len = _len;
      var accu = _accu;
      var n = Caml_missing_polyfill.not_implemented("caml_ml_input_scan_line not implemented by bucklescript yet\n");
      if (n) {
        if (n > 0) {
          var res = Caml_string.caml_create_string(n - 1 | 0);
          Caml_missing_polyfill.not_implemented("caml_ml_input not implemented by bucklescript yet\n");
          Caml_io.caml_ml_input_char(chan);
          if (accu) {
            var len$1 = (len + n | 0) - 1 | 0;
            return build_result(Caml_string.caml_create_string(len$1), len$1, /* :: */[
                        res,
                        accu
                      ]);
          } else {
            return res;
          }
        } else {
          var beg = Caml_string.caml_create_string(-n | 0);
          Caml_missing_polyfill.not_implemented("caml_ml_input not implemented by bucklescript yet\n");
          _len = len - n | 0;
          _accu = /* :: */[
            beg,
            accu
          ];
          continue ;
          
        }
      } else if (accu) {
        return build_result(Caml_string.caml_create_string(len), len, accu);
      } else {
        throw Caml_builtin_exceptions.end_of_file;
      }
    };
  };
  return Caml_string.bytes_to_string(scan(/* [] */0, 0));
}

function close_in_noerr() {
  try {
    return Caml_missing_polyfill.not_implemented("caml_ml_close_channel not implemented by bucklescript yet\n");
  }
  catch (exn){
    return /* () */0;
  }
}

function print_char(c) {
  return Caml_io.caml_ml_output_char(stdout, c);
}

function print_string(s) {
  return output_string(stdout, s);
}

function print_bytes(s) {
  return output_bytes(stdout, s);
}

function print_int(i) {
  return output_string(stdout, "" + i);
}

function print_float(f) {
  return output_string(stdout, valid_float_lexem(Caml_format.caml_format_float("%.12g", f)));
}

function print_endline(param) {
  console.log(param);
  return 0;
}

function print_newline() {
  Caml_io.caml_ml_output_char(stdout, /* "\n" */10);
  return Caml_io.caml_ml_flush(stdout);
}

function prerr_char(c) {
  return Caml_io.caml_ml_output_char(stderr, c);
}

function prerr_string(s) {
  return output_string(stderr, s);
}

function prerr_bytes(s) {
  return output_bytes(stderr, s);
}

function prerr_int(i) {
  return output_string(stderr, "" + i);
}

function prerr_float(f) {
  return output_string(stderr, valid_float_lexem(Caml_format.caml_format_float("%.12g", f)));
}

function prerr_endline(param) {
  console.error(param);
  return 0;
}

function prerr_newline() {
  Caml_io.caml_ml_output_char(stderr, /* "\n" */10);
  return Caml_io.caml_ml_flush(stderr);
}

function read_line() {
  Caml_io.caml_ml_flush(stdout);
  return input_line(stdin);
}

function read_int() {
  return Caml_format.caml_int_of_string((Caml_io.caml_ml_flush(stdout), input_line(stdin)));
}

function read_float() {
  return Caml_format.caml_float_of_string((Caml_io.caml_ml_flush(stdout), input_line(stdin)));
}

function string_of_format(param) {
  return param[1];
}

function $caret$caret(param, param$1) {
  return /* Format */[
          CamlinternalFormatBasics.concat_fmt(param[0], param$1[0]),
          $caret(param[1], $caret("%,", param$1[1]))
        ];
}

var exit_function = [flush_all];

function at_exit(f) {
  var g = exit_function[0];
  exit_function[0] = (function () {
      Curry._1(f, /* () */0);
      return Curry._1(g, /* () */0);
    });
  return /* () */0;
}

function do_at_exit() {
  return Curry._1(exit_function[0], /* () */0);
}

function exit(retcode) {
  do_at_exit(/* () */0);
  return Caml_sys.caml_sys_exit(retcode);
}

var max_int = 2147483647;

var infinity = Infinity;

var neg_infinity = -Infinity;

var nan = NaN;

var max_float = Number.MAX_VALUE;

var min_float = Number.MIN_VALUE;

var epsilon_float = 2.220446049250313e-16;

var flush = Caml_io.caml_ml_flush;

var output_char = Caml_io.caml_ml_output_char;

var output_byte = Caml_io.caml_ml_output_char;

function output_binary_int(_, _$1) {
  return Caml_missing_polyfill.not_implemented("caml_ml_output_int not implemented by bucklescript yet\n");
}

function seek_out(_, _$1) {
  return Caml_missing_polyfill.not_implemented("caml_ml_seek_out not implemented by bucklescript yet\n");
}

function pos_out() {
  return Caml_missing_polyfill.not_implemented("caml_ml_pos_out not implemented by bucklescript yet\n");
}

function out_channel_length() {
  return Caml_missing_polyfill.not_implemented("caml_ml_channel_size not implemented by bucklescript yet\n");
}

function set_binary_mode_out(_, _$1) {
  return Caml_missing_polyfill.not_implemented("caml_ml_set_binary_mode not implemented by bucklescript yet\n");
}

var input_char = Caml_io.caml_ml_input_char;

var input_byte = Caml_io.caml_ml_input_char;

function input_binary_int() {
  return Caml_missing_polyfill.not_implemented("caml_ml_input_int not implemented by bucklescript yet\n");
}

function input_value() {
  return Caml_missing_polyfill.not_implemented("caml_input_value not implemented by bucklescript yet\n");
}

function seek_in(_, _$1) {
  return Caml_missing_polyfill.not_implemented("caml_ml_seek_in not implemented by bucklescript yet\n");
}

function pos_in() {
  return Caml_missing_polyfill.not_implemented("caml_ml_pos_in not implemented by bucklescript yet\n");
}

function in_channel_length() {
  return Caml_missing_polyfill.not_implemented("caml_ml_channel_size not implemented by bucklescript yet\n");
}

function close_in() {
  return Caml_missing_polyfill.not_implemented("caml_ml_close_channel not implemented by bucklescript yet\n");
}

function set_binary_mode_in(_, _$1) {
  return Caml_missing_polyfill.not_implemented("caml_ml_set_binary_mode not implemented by bucklescript yet\n");
}

function LargeFile_000(_, _$1) {
  return Caml_missing_polyfill.not_implemented("caml_ml_seek_out_64 not implemented by bucklescript yet\n");
}

function LargeFile_001() {
  return Caml_missing_polyfill.not_implemented("caml_ml_pos_out_64 not implemented by bucklescript yet\n");
}

function LargeFile_002() {
  return Caml_missing_polyfill.not_implemented("caml_ml_channel_size_64 not implemented by bucklescript yet\n");
}

function LargeFile_003(_, _$1) {
  return Caml_missing_polyfill.not_implemented("caml_ml_seek_in_64 not implemented by bucklescript yet\n");
}

function LargeFile_004() {
  return Caml_missing_polyfill.not_implemented("caml_ml_pos_in_64 not implemented by bucklescript yet\n");
}

function LargeFile_005() {
  return Caml_missing_polyfill.not_implemented("caml_ml_channel_size_64 not implemented by bucklescript yet\n");
}

var LargeFile = [
  LargeFile_000,
  LargeFile_001,
  LargeFile_002,
  LargeFile_003,
  LargeFile_004,
  LargeFile_005
];

exports.invalid_arg         = invalid_arg;
exports.failwith            = failwith;
exports.Exit                = Exit;
exports.min                 = min;
exports.max                 = max;
exports.abs                 = abs;
exports.max_int             = max_int;
exports.min_int             = min_int;
exports.lnot                = lnot;
exports.infinity            = infinity;
exports.neg_infinity        = neg_infinity;
exports.nan                 = nan;
exports.max_float           = max_float;
exports.min_float           = min_float;
exports.epsilon_float       = epsilon_float;
exports.$caret              = $caret;
exports.char_of_int         = char_of_int;
exports.string_of_bool      = string_of_bool;
exports.bool_of_string      = bool_of_string;
exports.string_of_int       = string_of_int;
exports.string_of_float     = string_of_float;
exports.$at                 = $at;
exports.stdin               = stdin;
exports.stdout              = stdout;
exports.stderr              = stderr;
exports.print_char          = print_char;
exports.print_string        = print_string;
exports.print_bytes         = print_bytes;
exports.print_int           = print_int;
exports.print_float         = print_float;
exports.print_endline       = print_endline;
exports.print_newline       = print_newline;
exports.prerr_char          = prerr_char;
exports.prerr_string        = prerr_string;
exports.prerr_bytes         = prerr_bytes;
exports.prerr_int           = prerr_int;
exports.prerr_float         = prerr_float;
exports.prerr_endline       = prerr_endline;
exports.prerr_newline       = prerr_newline;
exports.read_line           = read_line;
exports.read_int            = read_int;
exports.read_float          = read_float;
exports.open_out            = open_out;
exports.open_out_bin        = open_out_bin;
exports.open_out_gen        = open_out_gen;
exports.flush               = flush;
exports.flush_all           = flush_all;
exports.output_char         = output_char;
exports.output_string       = output_string;
exports.output_bytes        = output_bytes;
exports.output              = output;
exports.output_substring    = output_substring;
exports.output_byte         = output_byte;
exports.output_binary_int   = output_binary_int;
exports.output_value        = output_value;
exports.seek_out            = seek_out;
exports.pos_out             = pos_out;
exports.out_channel_length  = out_channel_length;
exports.close_out           = close_out;
exports.close_out_noerr     = close_out_noerr;
exports.set_binary_mode_out = set_binary_mode_out;
exports.open_in             = open_in;
exports.open_in_bin         = open_in_bin;
exports.open_in_gen         = open_in_gen;
exports.input_char          = input_char;
exports.input_line          = input_line;
exports.input               = input;
exports.really_input        = really_input;
exports.really_input_string = really_input_string;
exports.input_byte          = input_byte;
exports.input_binary_int    = input_binary_int;
exports.input_value         = input_value;
exports.seek_in             = seek_in;
exports.pos_in              = pos_in;
exports.in_channel_length   = in_channel_length;
exports.close_in            = close_in;
exports.close_in_noerr      = close_in_noerr;
exports.set_binary_mode_in  = set_binary_mode_in;
exports.LargeFile           = LargeFile;
exports.string_of_format    = string_of_format;
exports.$caret$caret        = $caret$caret;
exports.exit                = exit;
exports.at_exit             = at_exit;
exports.valid_float_lexem   = valid_float_lexem;
exports.unsafe_really_input = unsafe_really_input;
exports.do_at_exit          = do_at_exit;
/* No side effect */

},{"./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./caml_exceptions.js":"stdlib/caml_exceptions","./caml_format.js":"stdlib/caml_format","./caml_io.js":"stdlib/caml_io","./caml_missing_polyfill.js":"stdlib/caml_missing_polyfill","./caml_obj.js":"stdlib/caml_obj","./caml_string.js":"stdlib/caml_string","./caml_sys.js":"stdlib/caml_sys","./camlinternalFormatBasics.js":"stdlib/camlinternalFormatBasics","./curry.js":"stdlib/curry"}],"stdlib/printexc":[function(require,module,exports){
'use strict';

var Obj                     = require("./obj.js");
var $$Array                 = require("./array.js");
var Block                   = require("./block.js");
var Curry                   = require("./curry.js");
var Buffer                  = require("./buffer.js");
var Js_exn                  = require("./js_exn.js");
var Printf                  = require("./printf.js");
var Caml_io                 = require("./caml_io.js");
var Caml_array              = require("./caml_array.js");
var Pervasives              = require("./pervasives.js");
var Caml_backtrace          = require("./caml_backtrace.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

var printers = [/* [] */0];

var locfmt = /* Format */[
  /* String_literal */Block.__(11, [
      "File \"",
      /* String */Block.__(2, [
          /* No_padding */0,
          /* String_literal */Block.__(11, [
              "\", line ",
              /* Int */Block.__(4, [
                  /* Int_d */0,
                  /* No_padding */0,
                  /* No_precision */0,
                  /* String_literal */Block.__(11, [
                      ", characters ",
                      /* Int */Block.__(4, [
                          /* Int_d */0,
                          /* No_padding */0,
                          /* No_precision */0,
                          /* Char_literal */Block.__(12, [
                              /* "-" */45,
                              /* Int */Block.__(4, [
                                  /* Int_d */0,
                                  /* No_padding */0,
                                  /* No_precision */0,
                                  /* String_literal */Block.__(11, [
                                      ": ",
                                      /* String */Block.__(2, [
                                          /* No_padding */0,
                                          /* End_of_format */0
                                        ])
                                    ])
                                ])
                            ])
                        ])
                    ])
                ])
            ])
        ])
    ]),
  "File \"%s\", line %d, characters %d-%d: %s"
];

function field(x, i) {
  var f = x[i];
  if (f.length === undefined) {
    return Curry._1(Printf.sprintf(/* Format */[
                    /* Int */Block.__(4, [
                        /* Int_d */0,
                        /* No_padding */0,
                        /* No_precision */0,
                        /* End_of_format */0
                      ]),
                    "%d"
                  ]), f);
  } else if ((f.tag | 0) === Obj.string_tag) {
    return Curry._1(Printf.sprintf(/* Format */[
                    /* Caml_string */Block.__(3, [
                        /* No_padding */0,
                        /* End_of_format */0
                      ]),
                    "%S"
                  ]), f);
  } else if ((f.tag | 0) === Obj.double_tag) {
    return Pervasives.string_of_float(f);
  } else {
    return "_";
  }
}

function other_fields(x, i) {
  if (i >= x.length) {
    return "";
  } else {
    return Curry._2(Printf.sprintf(/* Format */[
                    /* String_literal */Block.__(11, [
                        ", ",
                        /* String */Block.__(2, [
                            /* No_padding */0,
                            /* String */Block.__(2, [
                                /* No_padding */0,
                                /* End_of_format */0
                              ])
                          ])
                      ]),
                    ", %s%s"
                  ]), field(x, i), other_fields(x, i + 1 | 0));
  }
}

function fields(x) {
  var n = x.length;
  if (n > 2 || n < 0) {
    return Curry._2(Printf.sprintf(/* Format */[
                    /* Char_literal */Block.__(12, [
                        /* "(" */40,
                        /* String */Block.__(2, [
                            /* No_padding */0,
                            /* String */Block.__(2, [
                                /* No_padding */0,
                                /* Char_literal */Block.__(12, [
                                    /* ")" */41,
                                    /* End_of_format */0
                                  ])
                              ])
                          ])
                      ]),
                    "(%s%s)"
                  ]), field(x, 1), other_fields(x, 2));
  } else {
    switch (n) {
      case 0 : 
      case 1 : 
          return "";
      case 2 : 
          return Curry._1(Printf.sprintf(/* Format */[
                          /* Char_literal */Block.__(12, [
                              /* "(" */40,
                              /* String */Block.__(2, [
                                  /* No_padding */0,
                                  /* Char_literal */Block.__(12, [
                                      /* ")" */41,
                                      /* End_of_format */0
                                    ])
                                ])
                            ]),
                          "(%s)"
                        ]), field(x, 1));
      
    }
  }
}

function to_string(x) {
  var _param = printers[0];
  while(true) {
    var param = _param;
    if (param) {
      var match;
      try {
        match = Curry._1(param[0], x);
      }
      catch (exn){
        match = /* None */0;
      }
      if (match) {
        return match[0];
      } else {
        _param = param[1];
        continue ;
        
      }
    } else if (x === Caml_builtin_exceptions.out_of_memory) {
      return "Out of memory";
    } else if (x === Caml_builtin_exceptions.stack_overflow) {
      return "Stack overflow";
    } else if (x[0] === Caml_builtin_exceptions.match_failure) {
      var match$1 = x[1];
      var $$char = match$1[2];
      return Curry._5(Printf.sprintf(locfmt), match$1[0], match$1[1], $$char, $$char + 5 | 0, "Pattern matching failed");
    } else if (x[0] === Caml_builtin_exceptions.assert_failure) {
      var match$2 = x[1];
      var $$char$1 = match$2[2];
      return Curry._5(Printf.sprintf(locfmt), match$2[0], match$2[1], $$char$1, $$char$1 + 6 | 0, "Assertion failed");
    } else if (x[0] === Caml_builtin_exceptions.undefined_recursive_module) {
      var match$3 = x[1];
      var $$char$2 = match$3[2];
      return Curry._5(Printf.sprintf(locfmt), match$3[0], match$3[1], $$char$2, $$char$2 + 6 | 0, "Undefined recursive module");
    } else if ((x.tag | 0) !== 0) {
      return x[0];
    } else {
      var constructor = x[0][0];
      return constructor + fields(x);
    }
  };
}

function print(fct, arg) {
  try {
    return Curry._1(fct, arg);
  }
  catch (raw_x){
    var x = Js_exn.internalToOCamlException(raw_x);
    Curry._1(Printf.eprintf(/* Format */[
              /* String_literal */Block.__(11, [
                  "Uncaught exception: ",
                  /* String */Block.__(2, [
                      /* No_padding */0,
                      /* Char_literal */Block.__(12, [
                          /* "\n" */10,
                          /* End_of_format */0
                        ])
                    ])
                ]),
              "Uncaught exception: %s\n"
            ]), to_string(x));
    Caml_io.caml_ml_flush(Pervasives.stderr);
    throw x;
  }
}

function $$catch(fct, arg) {
  try {
    return Curry._1(fct, arg);
  }
  catch (raw_x){
    var x = Js_exn.internalToOCamlException(raw_x);
    Caml_io.caml_ml_flush(Pervasives.stdout);
    Curry._1(Printf.eprintf(/* Format */[
              /* String_literal */Block.__(11, [
                  "Uncaught exception: ",
                  /* String */Block.__(2, [
                      /* No_padding */0,
                      /* Char_literal */Block.__(12, [
                          /* "\n" */10,
                          /* End_of_format */0
                        ])
                    ])
                ]),
              "Uncaught exception: %s\n"
            ]), to_string(x));
    return Pervasives.exit(2);
  }
}

function convert_raw_backtrace(rbckt) {
  try {
    return /* Some */[$$Array.map(Caml_backtrace.caml_convert_raw_backtrace_slot, rbckt)];
  }
  catch (raw_exn){
    var exn = Js_exn.internalToOCamlException(raw_exn);
    if (exn[0] === Caml_builtin_exceptions.failure) {
      return /* None */0;
    } else {
      throw exn;
    }
  }
}

function format_backtrace_slot(pos, slot) {
  var info = function (is_raise) {
    if (is_raise) {
      if (pos) {
        return "Re-raised at";
      } else {
        return "Raised at";
      }
    } else if (pos) {
      return "Called from";
    } else {
      return "Raised by primitive operation at";
    }
  };
  if (slot.tag) {
    if (slot[0] !== 0) {
      return /* None */0;
    } else {
      return /* Some */[Curry._1(Printf.sprintf(/* Format */[
                        /* String */Block.__(2, [
                            /* No_padding */0,
                            /* String_literal */Block.__(11, [
                                " unknown location",
                                /* End_of_format */0
                              ])
                          ]),
                        "%s unknown location"
                      ]), info(/* false */0))];
    }
  } else {
    return /* Some */[Curry._5(Printf.sprintf(/* Format */[
                      /* String */Block.__(2, [
                          /* No_padding */0,
                          /* String_literal */Block.__(11, [
                              " file \"",
                              /* String */Block.__(2, [
                                  /* No_padding */0,
                                  /* String_literal */Block.__(11, [
                                      "\", line ",
                                      /* Int */Block.__(4, [
                                          /* Int_d */0,
                                          /* No_padding */0,
                                          /* No_precision */0,
                                          /* String_literal */Block.__(11, [
                                              ", characters ",
                                              /* Int */Block.__(4, [
                                                  /* Int_d */0,
                                                  /* No_padding */0,
                                                  /* No_precision */0,
                                                  /* Char_literal */Block.__(12, [
                                                      /* "-" */45,
                                                      /* Int */Block.__(4, [
                                                          /* Int_d */0,
                                                          /* No_padding */0,
                                                          /* No_precision */0,
                                                          /* End_of_format */0
                                                        ])
                                                    ])
                                                ])
                                            ])
                                        ])
                                    ])
                                ])
                            ])
                        ]),
                      "%s file \"%s\", line %d, characters %d-%d"
                    ]), info(slot[0]), slot[1], slot[2], slot[3], slot[4])];
  }
}

function print_raw_backtrace(outchan, raw_backtrace) {
  var outchan$1 = outchan;
  var backtrace = convert_raw_backtrace(raw_backtrace);
  if (backtrace) {
    var a = backtrace[0];
    for(var i = 0 ,i_finish = a.length - 1 | 0; i <= i_finish; ++i){
      var match = format_backtrace_slot(i, Caml_array.caml_array_get(a, i));
      if (match) {
        Curry._1(Printf.fprintf(outchan$1, /* Format */[
                  /* String */Block.__(2, [
                      /* No_padding */0,
                      /* Char_literal */Block.__(12, [
                          /* "\n" */10,
                          /* End_of_format */0
                        ])
                    ]),
                  "%s\n"
                ]), match[0]);
      }
      
    }
    return /* () */0;
  } else {
    return Printf.fprintf(outchan$1, /* Format */[
                /* String_literal */Block.__(11, [
                    "(Program not linked with -g, cannot print stack backtrace)\n",
                    /* End_of_format */0
                  ]),
                "(Program not linked with -g, cannot print stack backtrace)\n"
              ]);
  }
}

function print_backtrace(outchan) {
  return print_raw_backtrace(outchan, /* () */0);
}

function backtrace_to_string(backtrace) {
  if (backtrace) {
    var a = backtrace[0];
    var b = Buffer.create(1024);
    for(var i = 0 ,i_finish = a.length - 1 | 0; i <= i_finish; ++i){
      var match = format_backtrace_slot(i, Caml_array.caml_array_get(a, i));
      if (match) {
        Curry._1(Printf.bprintf(b, /* Format */[
                  /* String */Block.__(2, [
                      /* No_padding */0,
                      /* Char_literal */Block.__(12, [
                          /* "\n" */10,
                          /* End_of_format */0
                        ])
                    ]),
                  "%s\n"
                ]), match[0]);
      }
      
    }
    return Buffer.contents(b);
  } else {
    return "(Program not linked with -g, cannot print stack backtrace)\n";
  }
}

function raw_backtrace_to_string(raw_backtrace) {
  return backtrace_to_string(convert_raw_backtrace(raw_backtrace));
}

function backtrace_slot_is_raise(param) {
  return param[0];
}

function backtrace_slot_location(param) {
  if (param.tag) {
    return /* None */0;
  } else {
    return /* Some */[/* record */[
              /* filename */param[1],
              /* line_number */param[2],
              /* start_char */param[3],
              /* end_char */param[4]
            ]];
  }
}

function backtrace_slots(raw_backtrace) {
  var match = convert_raw_backtrace(raw_backtrace);
  if (match) {
    var backtrace = match[0];
    var usable_slot = function (param) {
      if (param.tag) {
        return /* false */0;
      } else {
        return /* true */1;
      }
    };
    var exists_usable = function (_i) {
      while(true) {
        var i = _i;
        if (i !== -1) {
          if (usable_slot(Caml_array.caml_array_get(backtrace, i))) {
            return /* true */1;
          } else {
            _i = i - 1 | 0;
            continue ;
            
          }
        } else {
          return /* false */0;
        }
      };
    };
    if (exists_usable(backtrace.length - 1 | 0)) {
      return /* Some */[backtrace];
    } else {
      return /* None */0;
    }
  } else {
    return /* None */0;
  }
}

function raw_backtrace_length(bckt) {
  return bckt.length;
}

var get_raw_backtrace_slot = Caml_array.caml_array_get;

function get_backtrace() {
  return backtrace_to_string(convert_raw_backtrace(/* () */0));
}

function register_printer(fn) {
  printers[0] = /* :: */[
    fn,
    printers[0]
  ];
  return /* () */0;
}

function exn_slot(x) {
  if (x.tag) {
    return x;
  } else {
    return x[0];
  }
}

function exn_slot_id(x) {
  var slot = exn_slot(x);
  return slot[1];
}

function exn_slot_name(x) {
  var slot = exn_slot(x);
  return slot[0];
}

var uncaught_exception_handler = [/* None */0];

function set_uncaught_exception_handler(fn) {
  uncaught_exception_handler[0] = /* Some */[fn];
  return /* () */0;
}

function record_backtrace() {
  return /* () */0;
}

function backtrace_status() {
  return /* () */0;
}

function get_raw_backtrace() {
  return /* () */0;
}

function get_callstack() {
  return /* () */0;
}

var Slot = [
  backtrace_slot_is_raise,
  backtrace_slot_location,
  format_backtrace_slot
];

var convert_raw_backtrace_slot = Caml_backtrace.caml_convert_raw_backtrace_slot;

exports.to_string                      = to_string;
exports.print                          = print;
exports.$$catch                        = $$catch;
exports.print_backtrace                = print_backtrace;
exports.get_backtrace                  = get_backtrace;
exports.record_backtrace               = record_backtrace;
exports.backtrace_status               = backtrace_status;
exports.register_printer               = register_printer;
exports.get_raw_backtrace              = get_raw_backtrace;
exports.print_raw_backtrace            = print_raw_backtrace;
exports.raw_backtrace_to_string        = raw_backtrace_to_string;
exports.get_callstack                  = get_callstack;
exports.set_uncaught_exception_handler = set_uncaught_exception_handler;
exports.backtrace_slots                = backtrace_slots;
exports.Slot                           = Slot;
exports.raw_backtrace_length           = raw_backtrace_length;
exports.get_raw_backtrace_slot         = get_raw_backtrace_slot;
exports.convert_raw_backtrace_slot     = convert_raw_backtrace_slot;
exports.exn_slot_id                    = exn_slot_id;
exports.exn_slot_name                  = exn_slot_name;
/* No side effect */

},{"./array.js":"stdlib/array","./block.js":"stdlib/block","./buffer.js":"stdlib/buffer","./caml_array.js":"stdlib/caml_array","./caml_backtrace.js":"stdlib/caml_backtrace","./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./caml_io.js":"stdlib/caml_io","./curry.js":"stdlib/curry","./js_exn.js":"stdlib/js_exn","./obj.js":"stdlib/obj","./pervasives.js":"stdlib/pervasives","./printf.js":"stdlib/printf"}],"stdlib/printf":[function(require,module,exports){
'use strict';

var Curry              = require("./curry.js");
var Buffer             = require("./buffer.js");
var Pervasives         = require("./pervasives.js");
var CamlinternalFormat = require("./camlinternalFormat.js");

function kfprintf(k, o, param) {
  return CamlinternalFormat.make_printf((function (o, acc) {
                CamlinternalFormat.output_acc(o, acc);
                return Curry._1(k, o);
              }), o, /* End_of_acc */0, param[0]);
}

function kbprintf(k, b, param) {
  return CamlinternalFormat.make_printf((function (b, acc) {
                CamlinternalFormat.bufput_acc(b, acc);
                return Curry._1(k, b);
              }), b, /* End_of_acc */0, param[0]);
}

function ikfprintf(k, oc, param) {
  return CamlinternalFormat.make_printf((function (oc, _) {
                return Curry._1(k, oc);
              }), oc, /* End_of_acc */0, param[0]);
}

function fprintf(oc, fmt) {
  return kfprintf((function () {
                return /* () */0;
              }), oc, fmt);
}

function bprintf(b, fmt) {
  return kbprintf((function () {
                return /* () */0;
              }), b, fmt);
}

function ifprintf(oc, fmt) {
  return ikfprintf((function () {
                return /* () */0;
              }), oc, fmt);
}

function printf(fmt) {
  return fprintf(Pervasives.stdout, fmt);
}

function eprintf(fmt) {
  return fprintf(Pervasives.stderr, fmt);
}

function ksprintf(k, param) {
  var k$prime = function (_, acc) {
    var buf = Buffer.create(64);
    CamlinternalFormat.strput_acc(buf, acc);
    return Curry._1(k, Buffer.contents(buf));
  };
  return CamlinternalFormat.make_printf(k$prime, /* () */0, /* End_of_acc */0, param[0]);
}

function sprintf(fmt) {
  return ksprintf((function (s) {
                return s;
              }), fmt);
}

var kprintf = ksprintf;

exports.fprintf   = fprintf;
exports.printf    = printf;
exports.eprintf   = eprintf;
exports.sprintf   = sprintf;
exports.bprintf   = bprintf;
exports.ifprintf  = ifprintf;
exports.kfprintf  = kfprintf;
exports.ikfprintf = ikfprintf;
exports.ksprintf  = ksprintf;
exports.kbprintf  = kbprintf;
exports.kprintf   = kprintf;
/* No side effect */

},{"./buffer.js":"stdlib/buffer","./camlinternalFormat.js":"stdlib/camlinternalFormat","./curry.js":"stdlib/curry","./pervasives.js":"stdlib/pervasives"}],"stdlib/queue":[function(require,module,exports){
'use strict';

var Curry           = require("./curry.js");
var Caml_obj        = require("./caml_obj.js");
var Caml_exceptions = require("./caml_exceptions.js");

var Empty = Caml_exceptions.create("Queue.Empty");

function create() {
  return /* record */[
          /* length */0,
          /* tail : None */0
        ];
}

function clear(q) {
  q[/* length */0] = 0;
  q[/* tail */1] = /* None */0;
  return /* () */0;
}

function add(x, q) {
  if (q[/* length */0]) {
    var tail = q[/* tail */1];
    var head = tail[/* next */1];
    var cell = /* record */[
      /* content */x,
      /* next */head
    ];
    q[/* length */0] = q[/* length */0] + 1 | 0;
    tail[/* next */1] = cell;
    q[/* tail */1] = cell;
    return /* () */0;
  } else {
    var cell$1 = [];
    cell$1[0] = x;
    cell$1[1] = cell$1;
    q[/* length */0] = 1;
    q[/* tail */1] = cell$1;
    return /* () */0;
  }
}

function peek(q) {
  if (q[/* length */0]) {
    return q[/* tail */1][/* next */1][/* content */0];
  } else {
    throw Empty;
  }
}

function take(q) {
  if (!q[/* length */0]) {
    throw Empty;
  }
  q[/* length */0] = q[/* length */0] - 1 | 0;
  var tail = q[/* tail */1];
  var head = tail[/* next */1];
  if (head === tail) {
    q[/* tail */1] = /* None */0;
  } else {
    tail[/* next */1] = head[/* next */1];
  }
  return head[/* content */0];
}

function copy(q) {
  if (q[/* length */0]) {
    var tail = q[/* tail */1];
    var tail$prime = [];
    Caml_obj.caml_update_dummy(tail$prime, /* record */[
          /* content */tail[/* content */0],
          /* next */tail$prime
        ]);
    var copy$1 = function (_prev, _cell) {
      while(true) {
        var cell = _cell;
        var prev = _prev;
        if (cell !== tail) {
          var res = /* record */[
            /* content */cell[/* content */0],
            /* next */tail$prime
          ];
          prev[/* next */1] = res;
          _cell = cell[/* next */1];
          _prev = res;
          continue ;
          
        } else {
          return 0;
        }
      };
    };
    copy$1(tail$prime, tail[/* next */1]);
    return /* record */[
            /* length */q[/* length */0],
            /* tail */tail$prime
          ];
  } else {
    return /* record */[
            /* length */0,
            /* tail : None */0
          ];
  }
}

function is_empty(q) {
  return +(q[/* length */0] === 0);
}

function length(q) {
  return q[/* length */0];
}

function iter(f, q) {
  if (q[/* length */0] > 0) {
    var tail = q[/* tail */1];
    var _cell = tail[/* next */1];
    while(true) {
      var cell = _cell;
      Curry._1(f, cell[/* content */0]);
      if (cell !== tail) {
        _cell = cell[/* next */1];
        continue ;
        
      } else {
        return 0;
      }
    };
  } else {
    return 0;
  }
}

function fold(f, accu, q) {
  if (q[/* length */0]) {
    var tail = q[/* tail */1];
    var _accu = accu;
    var _cell = tail[/* next */1];
    while(true) {
      var cell = _cell;
      var accu$1 = _accu;
      var accu$2 = Curry._2(f, accu$1, cell[/* content */0]);
      if (cell === tail) {
        return accu$2;
      } else {
        _cell = cell[/* next */1];
        _accu = accu$2;
        continue ;
        
      }
    };
  } else {
    return accu;
  }
}

function transfer(q1, q2) {
  var length1 = q1[/* length */0];
  if (length1 > 0) {
    var tail1 = q1[/* tail */1];
    clear(q1);
    if (q2[/* length */0] > 0) {
      var tail2 = q2[/* tail */1];
      var head1 = tail1[/* next */1];
      var head2 = tail2[/* next */1];
      tail1[/* next */1] = head2;
      tail2[/* next */1] = head1;
    }
    q2[/* length */0] = q2[/* length */0] + length1 | 0;
    q2[/* tail */1] = tail1;
    return /* () */0;
  } else {
    return 0;
  }
}

var push = add;

var pop = take;

var top = peek;

exports.Empty    = Empty;
exports.create   = create;
exports.add      = add;
exports.push     = push;
exports.take     = take;
exports.pop      = pop;
exports.peek     = peek;
exports.top      = top;
exports.clear    = clear;
exports.copy     = copy;
exports.is_empty = is_empty;
exports.length   = length;
exports.iter     = iter;
exports.fold     = fold;
exports.transfer = transfer;
/* No side effect */

},{"./caml_exceptions.js":"stdlib/caml_exceptions","./caml_obj.js":"stdlib/caml_obj","./curry.js":"stdlib/curry"}],"stdlib/random":[function(require,module,exports){
'use strict';

var $$Array                 = require("./array.js");
var Curry                   = require("./curry.js");
var Int32                   = require("./int32.js");
var Int64                   = require("./int64.js");
var Digest                  = require("./digest.js");
var Caml_sys                = require("./caml_sys.js");
var Nativeint               = require("./nativeint.js");
var Caml_array              = require("./caml_array.js");
var Caml_int64              = require("./caml_int64.js");
var Pervasives              = require("./pervasives.js");
var Caml_string             = require("./caml_string.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function assign(st1, st2) {
  $$Array.blit(st2[/* st */0], 0, st1[/* st */0], 0, 55);
  st1[/* idx */1] = st2[/* idx */1];
  return /* () */0;
}

function full_init(s, seed) {
  var combine = function (accu, x) {
    return Digest.string(accu + x);
  };
  var extract = function (d) {
    return ((Caml_string.get(d, 0) + (Caml_string.get(d, 1) << 8) | 0) + (Caml_string.get(d, 2) << 16) | 0) + (Caml_string.get(d, 3) << 24) | 0;
  };
  var seed$1 = seed.length ? seed : /* int array */[0];
  var l = seed$1.length;
  for(var i = 0; i <= 54; ++i){
    Caml_array.caml_array_set(s[/* st */0], i, i);
  }
  var accu = "x";
  for(var i$1 = 0 ,i_finish = 54 + Pervasives.max(55, l) | 0; i$1 <= i_finish; ++i$1){
    var j = i$1 % 55;
    var k = i$1 % l;
    accu = combine(accu, Caml_array.caml_array_get(seed$1, k));
    Caml_array.caml_array_set(s[/* st */0], j, (Caml_array.caml_array_get(s[/* st */0], j) ^ extract(accu)) & 1073741823);
  }
  s[/* idx */1] = 0;
  return /* () */0;
}

function make(seed) {
  var result = /* record */[
    /* st */Caml_array.caml_make_vect(55, 0),
    /* idx */0
  ];
  full_init(result, seed);
  return result;
}

function make_self_init() {
  return make(Caml_sys.caml_sys_random_seed(/* () */0));
}

function copy(s) {
  var result = /* record */[
    /* st */Caml_array.caml_make_vect(55, 0),
    /* idx */0
  ];
  assign(result, s);
  return result;
}

function bits(s) {
  s[/* idx */1] = (s[/* idx */1] + 1 | 0) % 55;
  var curval = Caml_array.caml_array_get(s[/* st */0], s[/* idx */1]);
  var newval = Caml_array.caml_array_get(s[/* st */0], (s[/* idx */1] + 24 | 0) % 55) + (curval ^ (curval >>> 25) & 31) | 0;
  var newval30 = newval & 1073741823;
  Caml_array.caml_array_set(s[/* st */0], s[/* idx */1], newval30);
  return newval30;
}

function $$int(s, bound) {
  if (bound > 1073741823 || bound <= 0) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Random.int"
        ];
  } else {
    var s$1 = s;
    var n = bound;
    while(true) {
      var r = bits(s$1);
      var v = r % n;
      if ((r - v | 0) > ((1073741823 - n | 0) + 1 | 0)) {
        continue ;
        
      } else {
        return v;
      }
    };
  }
}

function int32(s, bound) {
  if (bound <= 0) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Random.int32"
        ];
  } else {
    var s$1 = s;
    var n = bound;
    while(true) {
      var b1 = bits(s$1);
      var b2 = ((bits(s$1) & 1) << 30);
      var r = b1 | b2;
      var v = r % n;
      if ((r - v | 0) > ((Int32.max_int - n | 0) + 1 | 0)) {
        continue ;
        
      } else {
        return v;
      }
    };
  }
}

function int64(s, bound) {
  if (Caml_int64.le(bound, /* int64 */[
          /* hi */0,
          /* lo */0
        ])) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Random.int64"
        ];
  } else {
    var s$1 = s;
    var n = bound;
    while(true) {
      var b1 = Caml_int64.of_int32(bits(s$1));
      var b2 = Caml_int64.lsl_(Caml_int64.of_int32(bits(s$1)), 30);
      var b3 = Caml_int64.lsl_(Caml_int64.of_int32(bits(s$1) & 7), 60);
      var r = Caml_int64.or_(b1, /* int64 */[
            /* hi */b2[0] | b3[0],
            /* lo */((b2[1] | b3[1]) >>> 0)
          ]);
      var v = Caml_int64.mod_(r, n);
      if (Caml_int64.gt(Caml_int64.sub(r, v), Caml_int64.add(Caml_int64.sub(Int64.max_int, n), /* int64 */[
                  /* hi */0,
                  /* lo */1
                ]))) {
        continue ;
        
      } else {
        return v;
      }
    };
  }
}

var nativeint = Nativeint.size === 32 ? int32 : (function (s, bound) {
      return int64(s, Caml_int64.of_int32(bound))[1] | 0;
    });

function rawfloat(s) {
  var r1 = bits(s);
  var r2 = bits(s);
  return (r1 / 1073741824.0 + r2) / 1073741824.0;
}

function $$float(s, bound) {
  return rawfloat(s) * bound;
}

function bool(s) {
  return +((bits(s) & 1) === 0);
}

var $$default = /* record */[
  /* st : array */[
    987910699,
    495797812,
    364182224,
    414272206,
    318284740,
    990407751,
    383018966,
    270373319,
    840823159,
    24560019,
    536292337,
    512266505,
    189156120,
    730249596,
    143776328,
    51606627,
    140166561,
    366354223,
    1003410265,
    700563762,
    981890670,
    913149062,
    526082594,
    1021425055,
    784300257,
    667753350,
    630144451,
    949649812,
    48546892,
    415514493,
    258888527,
    511570777,
    89983870,
    283659902,
    308386020,
    242688715,
    482270760,
    865188196,
    1027664170,
    207196989,
    193777847,
    619708188,
    671350186,
    149669678,
    257044018,
    87658204,
    558145612,
    183450813,
    28133145,
    901332182,
    710253903,
    510646120,
    652377910,
    409934019,
    801085050
  ],
  /* idx */0
];

function bits$1() {
  return bits($$default);
}

function $$int$1(bound) {
  return $$int($$default, bound);
}

function int32$1(bound) {
  return int32($$default, bound);
}

function nativeint$1(bound) {
  return Curry._2(nativeint, $$default, bound);
}

function int64$1(bound) {
  return int64($$default, bound);
}

function $$float$1(scale) {
  return rawfloat($$default) * scale;
}

function bool$1() {
  return bool($$default);
}

function full_init$1(seed) {
  return full_init($$default, seed);
}

function init(seed) {
  return full_init($$default, /* int array */[seed]);
}

function self_init() {
  return full_init$1(Caml_sys.caml_sys_random_seed(/* () */0));
}

function get_state() {
  return copy($$default);
}

function set_state(s) {
  return assign($$default, s);
}

var State = [
  make,
  make_self_init,
  copy,
  bits,
  $$int,
  int32,
  nativeint,
  int64,
  $$float,
  bool
];

exports.init      = init;
exports.full_init = full_init$1;
exports.self_init = self_init;
exports.bits      = bits$1;
exports.$$int     = $$int$1;
exports.int32     = int32$1;
exports.nativeint = nativeint$1;
exports.int64     = int64$1;
exports.$$float   = $$float$1;
exports.bool      = bool$1;
exports.State     = State;
exports.get_state = get_state;
exports.set_state = set_state;
/* No side effect */

},{"./array.js":"stdlib/array","./caml_array.js":"stdlib/caml_array","./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./caml_int64.js":"stdlib/caml_int64","./caml_string.js":"stdlib/caml_string","./caml_sys.js":"stdlib/caml_sys","./curry.js":"stdlib/curry","./digest.js":"stdlib/digest","./int32.js":"stdlib/int32","./int64.js":"stdlib/int64","./nativeint.js":"stdlib/nativeint","./pervasives.js":"stdlib/pervasives"}],"stdlib/scanf":[function(require,module,exports){
'use strict';

var List                     = require("./list.js");
var Block                    = require("./block.js");
var Bytes                    = require("./bytes.js");
var Curry                    = require("./curry.js");
var Buffer                   = require("./buffer.js");
var Js_exn                   = require("./js_exn.js");
var Printf                   = require("./printf.js");
var $$String                 = require("./string.js");
var Caml_bytes               = require("./caml_bytes.js");
var Caml_int32               = require("./caml_int32.js");
var Pervasives               = require("./pervasives.js");
var Caml_format              = require("./caml_format.js");
var Caml_string              = require("./caml_string.js");
var Caml_exceptions          = require("./caml_exceptions.js");
var CamlinternalFormat       = require("./camlinternalFormat.js");
var Caml_missing_polyfill    = require("./caml_missing_polyfill.js");
var Caml_builtin_exceptions  = require("./caml_builtin_exceptions.js");
var CamlinternalFormatBasics = require("./camlinternalFormatBasics.js");

function next_char(ib) {
  try {
    var c = Curry._1(ib[/* get_next_char */6], /* () */0);
    ib[/* current_char */1] = c;
    ib[/* current_char_is_valid */2] = /* true */1;
    ib[/* char_count */3] = ib[/* char_count */3] + 1 | 0;
    if (c === /* "\n" */10) {
      ib[/* line_count */4] = ib[/* line_count */4] + 1 | 0;
    }
    return c;
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.end_of_file) {
      ib[/* current_char */1] = /* "\000" */0;
      ib[/* current_char_is_valid */2] = /* false */0;
      ib[/* eof */0] = /* true */1;
      return /* "\000" */0;
    } else {
      throw exn;
    }
  }
}

function peek_char(ib) {
  if (ib[/* current_char_is_valid */2]) {
    return ib[/* current_char */1];
  } else {
    return next_char(ib);
  }
}

function checked_peek_char(ib) {
  var c = peek_char(ib);
  if (ib[/* eof */0]) {
    throw Caml_builtin_exceptions.end_of_file;
  }
  return c;
}

function end_of_input(ib) {
  peek_char(ib);
  return ib[/* eof */0];
}

function beginning_of_input(ib) {
  return +(ib[/* char_count */3] === 0);
}

function name_of_input(ib) {
  var match = ib[/* input_name */8];
  if (typeof match === "number") {
    if (match) {
      return "unnamed function";
    } else {
      return "unnamed character string";
    }
  } else if (match.tag) {
    return "unnamed pervasives input channel";
  } else {
    return match[0];
  }
}

function char_count(ib) {
  if (ib[/* current_char_is_valid */2]) {
    return ib[/* char_count */3] - 1 | 0;
  } else {
    return ib[/* char_count */3];
  }
}

function token(ib) {
  var tokbuf = ib[/* tokbuf */7];
  var tok = Buffer.contents(tokbuf);
  tokbuf[/* position */1] = 0;
  ib[/* token_count */5] = ib[/* token_count */5] + 1 | 0;
  return tok;
}

function ignore_char(width, ib) {
  var width$1 = width - 1 | 0;
  ib[/* current_char_is_valid */2] = /* false */0;
  return width$1;
}

function store_char(width, ib, c) {
  Buffer.add_char(ib[/* tokbuf */7], c);
  return ignore_char(width, ib);
}

function create(iname, next) {
  return /* record */[
          /* eof : false */0,
          /* current_char : "\000" */0,
          /* current_char_is_valid : false */0,
          /* char_count */0,
          /* line_count */0,
          /* token_count */0,
          /* get_next_char */next,
          /* tokbuf */Buffer.create(1024),
          /* input_name */iname
        ];
}

function from_string(s) {
  var i = [0];
  var len = s.length;
  var next = function () {
    if (i[0] >= len) {
      throw Caml_builtin_exceptions.end_of_file;
    } else {
      var c = Caml_string.get(s, i[0]);
      i[0] = i[0] + 1 | 0;
      return c;
    }
  };
  return create(/* From_string */0, next);
}

function from_function(param) {
  return create(/* From_function */1, param);
}

var file_buffer_size = [1024];

function scan_close_at_end() {
  Caml_missing_polyfill.not_implemented("caml_ml_close_channel not implemented by bucklescript yet\n");
  throw Caml_builtin_exceptions.end_of_file;
}

function scan_raise_at_end() {
  throw Caml_builtin_exceptions.end_of_file;
}

function from_ic(scan_close_ic, iname, ic) {
  var len = file_buffer_size[0];
  var buf = Caml_string.caml_create_string(len);
  var i = [0];
  var lim = [0];
  var eof = [/* false */0];
  var next = function () {
    if (i[0] < lim[0]) {
      var c = Caml_bytes.get(buf, i[0]);
      i[0] = i[0] + 1 | 0;
      return c;
    } else if (eof[0]) {
      throw Caml_builtin_exceptions.end_of_file;
    } else {
      lim[0] = Pervasives.input(ic, buf, 0, len);
      if (lim[0]) {
        i[0] = 1;
        return Caml_bytes.get(buf, 0);
      } else {
        eof[0] = /* true */1;
        return Curry._1(scan_close_ic, ic);
      }
    }
  };
  return create(iname, next);
}

var stdin = from_ic(scan_raise_at_end, /* From_file */Block.__(0, [
        "-",
        Pervasives.stdin
      ]), Pervasives.stdin);

function open_in(fname) {
  if (fname === "-") {
    return stdin;
  } else {
    var ic = Pervasives.open_in(fname);
    return from_ic(scan_close_at_end, /* From_file */Block.__(0, [
                  fname,
                  ic
                ]), ic);
  }
}

function open_in_bin(fname) {
  if (fname === "-") {
    return stdin;
  } else {
    var ic = Pervasives.open_in_bin(fname);
    return from_ic(scan_close_at_end, /* From_file */Block.__(0, [
                  fname,
                  ic
                ]), ic);
  }
}

var memo = [/* [] */0];

function memo_from_ic(scan_close_ic, ic) {
  try {
    return List.assq(ic, memo[0]);
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      var ib = from_ic(scan_close_ic, /* From_channel */Block.__(1, [ic]), ic);
      memo[0] = /* :: */[
        /* tuple */[
          ic,
          ib
        ],
        memo[0]
      ];
      return ib;
    } else {
      throw exn;
    }
  }
}

function from_channel(param) {
  return memo_from_ic(scan_raise_at_end, param);
}

function close_in(ib) {
  var match = ib[/* input_name */8];
  if (typeof match === "number") {
    return /* () */0;
  } else if (match.tag) {
    return Caml_missing_polyfill.not_implemented("caml_ml_close_channel not implemented by bucklescript yet\n");
  } else {
    return Caml_missing_polyfill.not_implemented("caml_ml_close_channel not implemented by bucklescript yet\n");
  }
}

var Scan_failure = Caml_exceptions.create("Scanf.Scan_failure");

function bad_input_escape(c) {
  var s = Curry._1(Printf.sprintf(/* Format */[
            /* String_literal */Block.__(11, [
                "illegal escape character ",
                /* Caml_char */Block.__(1, [/* End_of_format */0])
              ]),
            "illegal escape character %C"
          ]), c);
  throw [
        Scan_failure,
        s
      ];
}

function bad_token_length(message) {
  var s = Curry._1(Printf.sprintf(/* Format */[
            /* String_literal */Block.__(11, [
                "scanning of ",
                /* String */Block.__(2, [
                    /* No_padding */0,
                    /* String_literal */Block.__(11, [
                        " failed: the specified length was too short for token",
                        /* End_of_format */0
                      ])
                  ])
              ]),
            "scanning of %s failed: the specified length was too short for token"
          ]), message);
  throw [
        Scan_failure,
        s
      ];
}

function character_mismatch_err(c, ci) {
  return Curry._2(Printf.sprintf(/* Format */[
                  /* String_literal */Block.__(11, [
                      "looking for ",
                      /* Caml_char */Block.__(1, [/* String_literal */Block.__(11, [
                              ", found ",
                              /* Caml_char */Block.__(1, [/* End_of_format */0])
                            ])])
                    ]),
                  "looking for %C, found %C"
                ]), c, ci);
}

function check_char(ib, _c) {
  while(true) {
    var c = _c;
    if (c === /* " " */32) {
      var ib$1 = ib;
      while(true) {
        var c$1 = peek_char(ib$1);
        if (ib$1[/* eof */0]) {
          return 0;
        } else {
          var switcher = c$1 - 9 | 0;
          if (switcher > 4 || switcher < 0) {
            if (switcher !== 23) {
              return /* () */0;
            } else {
              ib$1[/* current_char_is_valid */2] = /* false */0;
              continue ;
              
            }
          } else if (switcher === 3 || switcher === 2) {
            return /* () */0;
          } else {
            ib$1[/* current_char_is_valid */2] = /* false */0;
            continue ;
            
          }
        }
      };
    } else {
      var ci = checked_peek_char(ib);
      if (ci === c) {
        ib[/* current_char_is_valid */2] = /* false */0;
        return /* () */0;
      } else if (ci !== 13) {
        var s = character_mismatch_err(c, ci);
        throw [
              Scan_failure,
              s
            ];
      } else if (c === /* "\n" */10) {
        ib[/* current_char_is_valid */2] = /* false */0;
        _c = /* "\n" */10;
        continue ;
        
      } else {
        var s$1 = character_mismatch_err(c, ci);
        throw [
              Scan_failure,
              s$1
            ];
      }
    }
  };
}

function token_char(ib) {
  return Caml_string.get(token(ib), 0);
}

function token_bool(ib) {
  var s = token(ib);
  switch (s) {
    case "false" : 
        return /* false */0;
    case "true" : 
        return /* true */1;
    default:
      var s$1 = Curry._1(Printf.sprintf(/* Format */[
                /* String_literal */Block.__(11, [
                    "invalid boolean ",
                    /* Caml_string */Block.__(3, [
                        /* No_padding */0,
                        /* End_of_format */0
                      ])
                  ]),
                "invalid boolean %S"
              ]), s);
      throw [
            Scan_failure,
            s$1
          ];
  }
}

function token_int_literal(conv, ib) {
  var tok;
  var exit = 0;
  var switcher = conv - 88 | 0;
  if (switcher > 32 || switcher < 0) {
    exit = 1;
  } else {
    switch (switcher) {
      case 10 : 
          tok = "0b" + token(ib);
          break;
      case 23 : 
          tok = "0o" + token(ib);
          break;
      case 12 : 
      case 17 : 
      case 29 : 
          tok = token(ib);
          break;
      case 1 : 
      case 2 : 
      case 3 : 
      case 4 : 
      case 5 : 
      case 6 : 
      case 7 : 
      case 8 : 
      case 9 : 
      case 11 : 
      case 13 : 
      case 14 : 
      case 15 : 
      case 16 : 
      case 18 : 
      case 19 : 
      case 20 : 
      case 21 : 
      case 22 : 
      case 24 : 
      case 25 : 
      case 26 : 
      case 27 : 
      case 28 : 
      case 30 : 
      case 31 : 
          exit = 1;
          break;
      case 0 : 
      case 32 : 
          tok = "0x" + token(ib);
          break;
      
    }
  }
  if (exit === 1) {
    throw [
          Caml_builtin_exceptions.assert_failure,
          [
            "scanf.ml",
            507,
            11
          ]
        ];
  }
  var l = tok.length;
  if (l === 0 || Caml_string.get(tok, 0) !== /* "+" */43) {
    return tok;
  } else {
    return $$String.sub(tok, 1, l - 1 | 0);
  }
}

function token_float(ib) {
  return Caml_format.caml_float_of_string(token(ib));
}

function scan_decimal_digits(_width, ib) {
  while(true) {
    var width = _width;
    if (width) {
      var c = peek_char(ib);
      if (ib[/* eof */0]) {
        return width;
      } else if (c >= 58) {
        if (c !== 95) {
          return width;
        } else {
          var width$1 = ignore_char(width, ib);
          _width = width$1;
          continue ;
          
        }
      } else if (c >= 48) {
        var width$2 = store_char(width, ib, c);
        _width = width$2;
        continue ;
        
      } else {
        return width;
      }
    } else {
      return width;
    }
  };
}

function scan_decimal_digits_plus(width, ib) {
  if (width) {
    var c = checked_peek_char(ib);
    if (c > 57 || c < 48) {
      var s = Curry._1(Printf.sprintf(/* Format */[
                /* String_literal */Block.__(11, [
                    "character ",
                    /* Caml_char */Block.__(1, [/* String_literal */Block.__(11, [
                            " is not a decimal digit",
                            /* End_of_format */0
                          ])])
                  ]),
                "character %C is not a decimal digit"
              ]), c);
      throw [
            Scan_failure,
            s
          ];
    } else {
      var width$1 = store_char(width, ib, c);
      return scan_decimal_digits(width$1, ib);
    }
  } else {
    return bad_token_length("decimal digits");
  }
}

function scan_digits_plus(basis, digitp, width, ib) {
  if (width) {
    var c = checked_peek_char(ib);
    if (Curry._1(digitp, c)) {
      var _width = store_char(width, ib, c);
      while(true) {
        var width$1 = _width;
        if (width$1) {
          var c$1 = peek_char(ib);
          if (ib[/* eof */0]) {
            return width$1;
          } else if (Curry._1(digitp, c$1)) {
            _width = store_char(width$1, ib, c$1);
            continue ;
            
          } else if (c$1 !== 95) {
            return width$1;
          } else {
            _width = ignore_char(width$1, ib);
            continue ;
            
          }
        } else {
          return width$1;
        }
      };
    } else {
      var s = Curry._2(Printf.sprintf(/* Format */[
                /* String_literal */Block.__(11, [
                    "character ",
                    /* Caml_char */Block.__(1, [/* String_literal */Block.__(11, [
                            " is not a valid ",
                            /* String */Block.__(2, [
                                /* No_padding */0,
                                /* String_literal */Block.__(11, [
                                    " digit",
                                    /* End_of_format */0
                                  ])
                              ])
                          ])])
                  ]),
                "character %C is not a valid %s digit"
              ]), c, basis);
      throw [
            Scan_failure,
            s
          ];
    }
  } else {
    return bad_token_length("digits");
  }
}

function is_binary_digit(param) {
  if (param === 49 || param === 48) {
    return /* true */1;
  } else {
    return /* false */0;
  }
}

function scan_binary_int(param, param$1) {
  return scan_digits_plus("binary", is_binary_digit, param, param$1);
}

function is_octal_digit(param) {
  if (param > 55 || param < 48) {
    return /* false */0;
  } else {
    return /* true */1;
  }
}

function scan_octal_int(param, param$1) {
  return scan_digits_plus("octal", is_octal_digit, param, param$1);
}

function is_hexa_digit(param) {
  var switcher = param - 48 | 0;
  if (switcher > 22 || switcher < 0) {
    if (switcher > 54 || switcher < 49) {
      return /* false */0;
    } else {
      return /* true */1;
    }
  } else if (switcher > 16 || switcher < 10) {
    return /* true */1;
  } else {
    return /* false */0;
  }
}

function scan_hexadecimal_int(param, param$1) {
  return scan_digits_plus("hexadecimal", is_hexa_digit, param, param$1);
}

function scan_sign(width, ib) {
  var c = checked_peek_char(ib);
  if (c !== 43 && c !== 45) {
    return width;
  } else {
    return store_char(width, ib, c);
  }
}

function scan_optionally_signed_decimal_int(width, ib) {
  var width$1 = scan_sign(width, ib);
  return scan_decimal_digits_plus(width$1, ib);
}

function scan_int_conv(conv, width, ib) {
  var exit = 0;
  var switcher = conv - 88 | 0;
  if (switcher > 32 || switcher < 0) {
    exit = 1;
  } else {
    switch (switcher) {
      case 10 : 
          return scan_binary_int(width, ib);
      case 12 : 
          return scan_optionally_signed_decimal_int(width, ib);
      case 17 : 
          var width$1 = width;
          var ib$1 = ib;
          var width$2 = scan_sign(width$1, ib$1);
          var width$3 = width$2;
          var ib$2 = ib$1;
          var c = checked_peek_char(ib$2);
          if (c !== 48) {
            return scan_decimal_digits_plus(width$3, ib$2);
          } else {
            var width$4 = store_char(width$3, ib$2, c);
            if (width$4) {
              var c$1 = peek_char(ib$2);
              if (ib$2[/* eof */0]) {
                return width$4;
              } else if (c$1 >= 99) {
                if (c$1 !== 111) {
                  if (c$1 !== 120) {
                    return scan_decimal_digits(width$4, ib$2);
                  } else {
                    return scan_hexadecimal_int(store_char(width$4, ib$2, c$1), ib$2);
                  }
                } else {
                  return scan_octal_int(store_char(width$4, ib$2, c$1), ib$2);
                }
              } else if (c$1 !== 88) {
                if (c$1 >= 98) {
                  return scan_binary_int(store_char(width$4, ib$2, c$1), ib$2);
                } else {
                  return scan_decimal_digits(width$4, ib$2);
                }
              } else {
                return scan_hexadecimal_int(store_char(width$4, ib$2, c$1), ib$2);
              }
            } else {
              return width$4;
            }
          }
      case 23 : 
          return scan_octal_int(width, ib);
      case 29 : 
          return scan_decimal_digits_plus(width, ib);
      case 1 : 
      case 2 : 
      case 3 : 
      case 4 : 
      case 5 : 
      case 6 : 
      case 7 : 
      case 8 : 
      case 9 : 
      case 11 : 
      case 13 : 
      case 14 : 
      case 15 : 
      case 16 : 
      case 18 : 
      case 19 : 
      case 20 : 
      case 21 : 
      case 22 : 
      case 24 : 
      case 25 : 
      case 26 : 
      case 27 : 
      case 28 : 
      case 30 : 
      case 31 : 
          exit = 1;
          break;
      case 0 : 
      case 32 : 
          return scan_hexadecimal_int(width, ib);
      
    }
  }
  if (exit === 1) {
    throw [
          Caml_builtin_exceptions.assert_failure,
          [
            "scanf.ml",
            674,
            9
          ]
        ];
  }
  
}

function scan_frac_part(width, ib) {
  if (width) {
    var c = peek_char(ib);
    if (ib[/* eof */0] || c > 57 || c < 48) {
      return width;
    } else {
      return scan_decimal_digits(store_char(width, ib, c), ib);
    }
  } else {
    return width;
  }
}

function scan_exp_part(width, ib) {
  if (width) {
    var c = peek_char(ib);
    if (ib[/* eof */0] || c !== 69 && c !== 101) {
      return width;
    } else {
      return scan_optionally_signed_decimal_int(store_char(width, ib, c), ib);
    }
  } else {
    return width;
  }
}

function scan_int_part(width, ib) {
  var width$1 = scan_sign(width, ib);
  return scan_decimal_digits(width$1, ib);
}

function scan_float(width, precision, ib) {
  var width$1 = scan_int_part(width, ib);
  if (width$1) {
    var c = peek_char(ib);
    if (ib[/* eof */0]) {
      return /* tuple */[
              width$1,
              precision
            ];
    } else if (c !== 46) {
      return /* tuple */[
              scan_exp_part(width$1, ib),
              precision
            ];
    } else {
      var width$2 = store_char(width$1, ib, c);
      var precision$1 = Pervasives.min(width$2, precision);
      var width$3 = width$2 - (precision$1 - scan_frac_part(precision$1, ib) | 0) | 0;
      return /* tuple */[
              scan_exp_part(width$3, ib),
              precision$1
            ];
    }
  } else {
    return /* tuple */[
            width$1,
            precision
          ];
  }
}

function scan_caml_float(width, precision, ib) {
  var width$1 = scan_optionally_signed_decimal_int(width, ib);
  if (width$1) {
    var c = peek_char(ib);
    if (ib[/* eof */0]) {
      throw [
            Scan_failure,
            "no dot or exponent part found in float token"
          ];
    } else {
      var switcher = c - 69 | 0;
      if (switcher > 32 || switcher < 0) {
        if (switcher !== -23) {
          throw [
                Scan_failure,
                "no dot or exponent part found in float token"
              ];
        } else {
          var width$2 = store_char(width$1, ib, c);
          var precision$1 = Pervasives.min(width$2, precision);
          var width$3 = width$2 - (precision$1 - scan_frac_part(precision$1, ib) | 0) | 0;
          return scan_exp_part(width$3, ib);
        }
      } else if (switcher > 31 || switcher < 1) {
        return scan_exp_part(width$1, ib);
      } else {
        throw [
              Scan_failure,
              "no dot or exponent part found in float token"
            ];
      }
    }
  } else {
    throw [
          Scan_failure,
          "no dot or exponent part found in float token"
        ];
  }
}

function scan_string(stp, width, ib) {
  var _width = width;
  while(true) {
    var width$1 = _width;
    if (width$1) {
      var c = peek_char(ib);
      if (ib[/* eof */0]) {
        return width$1;
      } else if (stp) {
        if (c === stp[0]) {
          ib[/* current_char_is_valid */2] = /* false */0;
          return width$1;
        } else {
          _width = store_char(width$1, ib, c);
          continue ;
          
        }
      } else {
        var switcher = c - 9 | 0;
        if (switcher > 4 || switcher < 0) {
          if (switcher !== 23) {
            _width = store_char(width$1, ib, c);
            continue ;
            
          } else {
            return width$1;
          }
        } else if (switcher === 3 || switcher === 2) {
          _width = store_char(width$1, ib, c);
          continue ;
          
        } else {
          return width$1;
        }
      }
    } else {
      return width$1;
    }
  };
}

function scan_char(width, ib) {
  return store_char(width, ib, checked_peek_char(ib));
}

function char_for_backslash(c) {
  if (c >= 110) {
    if (c >= 117) {
      return c;
    } else {
      switch (c - 110 | 0) {
        case 0 : 
            return /* "\n" */10;
        case 4 : 
            return /* "\r" */13;
        case 1 : 
        case 2 : 
        case 3 : 
        case 5 : 
            return c;
        case 6 : 
            return /* "\t" */9;
        
      }
    }
  } else if (c !== 98) {
    return c;
  } else {
    return /* "\b" */8;
  }
}

function char_for_decimal_code(c0, c1, c2) {
  var c = (Caml_int32.imul(100, c0 - /* "0" */48 | 0) + Caml_int32.imul(10, c1 - /* "0" */48 | 0) | 0) + (c2 - /* "0" */48 | 0) | 0;
  if (c < 0 || c > 255) {
    var s = Curry._3(Printf.sprintf(/* Format */[
              /* String_literal */Block.__(11, [
                  "bad character decimal encoding \\",
                  /* Char */Block.__(0, [/* Char */Block.__(0, [/* Char */Block.__(0, [/* End_of_format */0])])])
                ]),
              "bad character decimal encoding \\%c%c%c"
            ]), c0, c1, c2);
    throw [
          Scan_failure,
          s
        ];
  } else {
    return Pervasives.char_of_int(c);
  }
}

function hexadecimal_value_of_char(c) {
  if (c >= /* "a" */97) {
    return c - 87 | 0;
  } else if (c >= /* "A" */65) {
    return c - 55 | 0;
  } else {
    return c - /* "0" */48 | 0;
  }
}

function char_for_hexadecimal_code(c1, c2) {
  var c = (hexadecimal_value_of_char(c1) << 4) + hexadecimal_value_of_char(c2) | 0;
  if (c < 0 || c > 255) {
    var s = Curry._2(Printf.sprintf(/* Format */[
              /* String_literal */Block.__(11, [
                  "bad character hexadecimal encoding \\",
                  /* Char */Block.__(0, [/* Char */Block.__(0, [/* End_of_format */0])])
                ]),
              "bad character hexadecimal encoding \\%c%c"
            ]), c1, c2);
    throw [
          Scan_failure,
          s
        ];
  } else {
    return Pervasives.char_of_int(c);
  }
}

function check_next_char(message, width, ib) {
  if (width) {
    var c = peek_char(ib);
    if (ib[/* eof */0]) {
      var message$1 = message;
      var s = Curry._1(Printf.sprintf(/* Format */[
                /* String_literal */Block.__(11, [
                    "scanning of ",
                    /* String */Block.__(2, [
                        /* No_padding */0,
                        /* String_literal */Block.__(11, [
                            " failed: premature end of file occurred before end of token",
                            /* End_of_format */0
                          ])
                      ])
                  ]),
                "scanning of %s failed: premature end of file occurred before end of token"
              ]), message$1);
      throw [
            Scan_failure,
            s
          ];
    } else {
      return c;
    }
  } else {
    return bad_token_length(message);
  }
}

function scan_backslash_char(width, ib) {
  var c = check_next_char("a Char", width, ib);
  var exit = 0;
  if (c >= 40) {
    if (c >= 58) {
      var switcher = c - 92 | 0;
      if (switcher > 28 || switcher < 0) {
        return bad_input_escape(c);
      } else {
        switch (switcher) {
          case 0 : 
          case 6 : 
          case 18 : 
          case 22 : 
          case 24 : 
              exit = 1;
              break;
          case 1 : 
          case 2 : 
          case 3 : 
          case 4 : 
          case 5 : 
          case 7 : 
          case 8 : 
          case 9 : 
          case 10 : 
          case 11 : 
          case 12 : 
          case 13 : 
          case 14 : 
          case 15 : 
          case 16 : 
          case 17 : 
          case 19 : 
          case 20 : 
          case 21 : 
          case 23 : 
          case 25 : 
          case 26 : 
          case 27 : 
              return bad_input_escape(c);
          case 28 : 
              var get_digit = function () {
                var c = next_char(ib);
                var switcher = c - 48 | 0;
                if (switcher > 22 || switcher < 0) {
                  if (switcher > 54 || switcher < 49) {
                    return bad_input_escape(c);
                  } else {
                    return c;
                  }
                } else if (switcher > 16 || switcher < 10) {
                  return c;
                } else {
                  return bad_input_escape(c);
                }
              };
              var c1 = get_digit(/* () */0);
              var c2 = get_digit(/* () */0);
              return store_char(width - 2 | 0, ib, char_for_hexadecimal_code(c1, c2));
          
        }
      }
    } else if (c >= 48) {
      var get_digit$1 = function () {
        var c = next_char(ib);
        if (c > 57 || c < 48) {
          return bad_input_escape(c);
        } else {
          return c;
        }
      };
      var c1$1 = get_digit$1(/* () */0);
      var c2$1 = get_digit$1(/* () */0);
      return store_char(width - 2 | 0, ib, char_for_decimal_code(c, c1$1, c2$1));
    } else {
      return bad_input_escape(c);
    }
  } else if (c !== 34) {
    if (c >= 39) {
      exit = 1;
    } else {
      return bad_input_escape(c);
    }
  } else {
    exit = 1;
  }
  if (exit === 1) {
    return store_char(width, ib, char_for_backslash(c));
  }
  
}

function scan_caml_char(width, ib) {
  var find_stop = function (width) {
    var c = check_next_char("a Char", width, ib);
    if (c !== 39) {
      var s = character_mismatch_err(/* "'" */39, c);
      throw [
            Scan_failure,
            s
          ];
    } else {
      return ignore_char(width, ib);
    }
  };
  var width$1 = width;
  var c = checked_peek_char(ib);
  if (c !== 39) {
    var s = character_mismatch_err(/* "'" */39, c);
    throw [
          Scan_failure,
          s
        ];
  } else {
    var width$2 = ignore_char(width$1, ib);
    var c$1 = check_next_char("a Char", width$2, ib);
    if (c$1 !== 92) {
      return find_stop(store_char(width$2, ib, c$1));
    } else {
      return find_stop(scan_backslash_char(ignore_char(width$2, ib), ib));
    }
  }
}

function scan_caml_string(width, ib) {
  var find_stop = function (_width) {
    while(true) {
      var width = _width;
      var c = check_next_char("a String", width, ib);
      if (c !== 34) {
        if (c !== 92) {
          _width = store_char(width, ib, c);
          continue ;
          
        } else {
          var width$1 = ignore_char(width, ib);
          var match = check_next_char("a String", width$1, ib);
          if (match !== 10) {
            if (match !== 13) {
              return find_stop(scan_backslash_char(width$1, ib));
            } else {
              var width$2 = ignore_char(width$1, ib);
              var match$1 = check_next_char("a String", width$2, ib);
              if (match$1 !== 10) {
                return find_stop(store_char(width$2, ib, /* "\r" */13));
              } else {
                return skip_spaces(ignore_char(width$2, ib));
              }
            }
          } else {
            return skip_spaces(ignore_char(width$1, ib));
          }
        }
      } else {
        return ignore_char(width, ib);
      }
    };
  };
  var skip_spaces = function (_width) {
    while(true) {
      var width = _width;
      var match = check_next_char("a String", width, ib);
      if (match !== 32) {
        return find_stop(width);
      } else {
        _width = ignore_char(width, ib);
        continue ;
        
      }
    };
  };
  var width$1 = width;
  var c = checked_peek_char(ib);
  if (c !== 34) {
    var s = character_mismatch_err(/* "\"" */34, c);
    throw [
          Scan_failure,
          s
        ];
  } else {
    return find_stop(ignore_char(width$1, ib));
  }
}

function scan_bool(ib) {
  var c = checked_peek_char(ib);
  var m;
  if (c !== 102) {
    if (c !== 116) {
      var s = Curry._1(Printf.sprintf(/* Format */[
                /* String_literal */Block.__(11, [
                    "the character ",
                    /* Caml_char */Block.__(1, [/* String_literal */Block.__(11, [
                            " cannot start a boolean",
                            /* End_of_format */0
                          ])])
                  ]),
                "the character %C cannot start a boolean"
              ]), c);
      throw [
            Scan_failure,
            s
          ];
    } else {
      m = 4;
    }
  } else {
    m = 5;
  }
  return scan_string(/* None */0, m, ib);
}

function scan_chars_in_char_set(char_set, scan_indic, width, ib) {
  var scan_chars = function (_i, stp) {
    while(true) {
      var i = _i;
      var c = peek_char(ib);
      if (i > 0 && !ib[/* eof */0] && CamlinternalFormat.is_in_char_set(char_set, c) && c !== stp) {
        store_char(Pervasives.max_int, ib, c);
        _i = i - 1 | 0;
        continue ;
        
      } else {
        return 0;
      }
    };
  };
  if (scan_indic) {
    var c = scan_indic[0];
    scan_chars(width, c);
    if (ib[/* eof */0]) {
      return 0;
    } else {
      var ci = peek_char(ib);
      if (c === ci) {
        ib[/* current_char_is_valid */2] = /* false */0;
        return /* () */0;
      } else {
        var s = character_mismatch_err(c, ci);
        throw [
              Scan_failure,
              s
            ];
      }
    }
  } else {
    return scan_chars(width, -1);
  }
}

function scanf_bad_input(ib, x) {
  var exit = 0;
  var s;
  if (x[0] === Scan_failure) {
    s = x[1];
    exit = 1;
  } else if (x[0] === Caml_builtin_exceptions.failure) {
    s = x[1];
    exit = 1;
  } else {
    throw x;
  }
  if (exit === 1) {
    var i = char_count(ib);
    var s$1 = Curry._2(Printf.sprintf(/* Format */[
              /* String_literal */Block.__(11, [
                  "scanf: bad input at char number ",
                  /* Int */Block.__(4, [
                      /* Int_i */3,
                      /* No_padding */0,
                      /* No_precision */0,
                      /* String_literal */Block.__(11, [
                          ": ",
                          /* Caml_string */Block.__(3, [
                              /* No_padding */0,
                              /* End_of_format */0
                            ])
                        ])
                    ])
                ]),
              "scanf: bad input at char number %i: %S"
            ]), i, s);
    throw [
          Scan_failure,
          s$1
        ];
  }
  
}

function get_counter(ib, counter) {
  switch (counter) {
    case 0 : 
        return ib[/* line_count */4];
    case 1 : 
        return char_count(ib);
    case 2 : 
        return ib[/* token_count */5];
    
  }
}

function width_of_pad_opt(pad_opt) {
  if (pad_opt) {
    return pad_opt[0];
  } else {
    return Pervasives.max_int;
  }
}

function stopper_of_formatting_lit(fmting) {
  if (fmting === /* Escaped_percent */6) {
    return /* tuple */[
            /* "%" */37,
            ""
          ];
  } else {
    var str = CamlinternalFormat.string_of_formatting_lit(fmting);
    var stp = Caml_string.get(str, 1);
    var sub_str = $$String.sub(str, 2, str.length - 2 | 0);
    return /* tuple */[
            stp,
            sub_str
          ];
  }
}

function take_format_readers(k, _fmt) {
  while(true) {
    var fmt = _fmt;
    if (typeof fmt === "number") {
      if (fmt) {
        _fmt = fmt[0];
        continue ;
        
      } else {
        return Curry._1(k, /* Nil */0);
      }
    } else {
      switch (fmt.tag | 0) {
        case 4 : 
        case 5 : 
        case 6 : 
        case 7 : 
        case 8 : 
            _fmt = fmt[3];
            continue ;
            case 14 : 
            return take_fmtty_format_readers(k, CamlinternalFormatBasics.erase_rel(CamlinternalFormat.symm(fmt[1])), fmt[2]);
        case 18 : 
            _fmt = CamlinternalFormatBasics.concat_fmt(fmt[0][0][0], fmt[1]);
            continue ;
            case 19 : 
            var fmt_rest = fmt[0];
            return (function(fmt_rest){
            return function (reader) {
              var new_k = function (readers_rest) {
                return Curry._1(k, /* Cons */[
                            reader,
                            readers_rest
                          ]);
              };
              return take_format_readers(new_k, fmt_rest);
            }
            }(fmt_rest));
        case 2 : 
        case 3 : 
        case 11 : 
        case 12 : 
        case 17 : 
        case 21 : 
            _fmt = fmt[1];
            continue ;
            case 23 : 
            var k$1 = k;
            var ign = fmt[0];
            var fmt$1 = fmt[1];
            if (typeof ign === "number") {
              if (ign === 3) {
                return (function(k$1,fmt$1){
                return function (reader) {
                  var new_k = function (readers_rest) {
                    return Curry._1(k$1, /* Cons */[
                                reader,
                                readers_rest
                              ]);
                  };
                  return take_format_readers(new_k, fmt$1);
                }
                }(k$1,fmt$1));
              } else {
                return take_format_readers(k$1, fmt$1);
              }
            } else if (ign.tag === 8) {
              return take_fmtty_format_readers(k$1, ign[1], fmt$1);
            } else {
              return take_format_readers(k$1, fmt$1);
            }
        case 13 : 
        case 20 : 
        case 24 : 
            _fmt = fmt[2];
            continue ;
            default:
          _fmt = fmt[0];
          continue ;
          
      }
    }
  };
}

function take_fmtty_format_readers(k, _fmtty, fmt) {
  while(true) {
    var fmtty = _fmtty;
    if (typeof fmtty === "number") {
      if (fmtty) {
        _fmtty = fmtty[0];
        continue ;
        
      } else {
        return take_format_readers(k, fmt);
      }
    } else {
      switch (fmtty.tag | 0) {
        case 8 : 
            _fmtty = fmtty[1];
            continue ;
            case 9 : 
            var ty = CamlinternalFormat.trans(CamlinternalFormat.symm(fmtty[0]), fmtty[1]);
            _fmtty = CamlinternalFormatBasics.concat_fmtty(ty, fmtty[2]);
            continue ;
            case 13 : 
            var fmt_rest = fmtty[0];
            return (function(fmt_rest){
            return function (reader) {
              var new_k = function (readers_rest) {
                return Curry._1(k, /* Cons */[
                            reader,
                            readers_rest
                          ]);
              };
              return take_fmtty_format_readers(new_k, fmt_rest, fmt);
            }
            }(fmt_rest));
        case 14 : 
            var fmt_rest$1 = fmtty[0];
            return (function(fmt_rest$1){
            return function (reader) {
              var new_k = function (readers_rest) {
                return Curry._1(k, /* Cons */[
                            reader,
                            readers_rest
                          ]);
              };
              return take_fmtty_format_readers(new_k, fmt_rest$1, fmt);
            }
            }(fmt_rest$1));
        default:
          _fmtty = fmtty[0];
          continue ;
          
      }
    }
  };
}

function make_scanf(ib, _fmt, readers) {
  while(true) {
    var fmt = _fmt;
    if (typeof fmt === "number") {
      return /* Nil */0;
    } else {
      switch (fmt.tag | 0) {
        case 0 : 
            scan_char(0, ib);
            var c = token_char(ib);
            return /* Cons */[
                    c,
                    make_scanf(ib, fmt[0], readers)
                  ];
        case 1 : 
            scan_caml_char(0, ib);
            var c$1 = token_char(ib);
            return /* Cons */[
                    c$1,
                    make_scanf(ib, fmt[0], readers)
                  ];
        case 2 : 
            var rest = fmt[1];
            var pad = fmt[0];
            var exit = 0;
            if (typeof rest === "number") {
              exit = 1;
            } else {
              switch (rest.tag | 0) {
                case 17 : 
                    var match = stopper_of_formatting_lit(rest[0]);
                    var stp = match[0];
                    var scan = (function(stp){
                    return function scan(width, _, ib) {
                      return scan_string(/* Some */[stp], width, ib);
                    }
                    }(stp));
                    var str_rest_000 = match[1];
                    var str_rest_001 = rest[1];
                    var str_rest = /* String_literal */Block.__(11, [
                        str_rest_000,
                        str_rest_001
                      ]);
                    return pad_prec_scanf(ib, str_rest, readers, pad, /* No_precision */0, scan, token);
                case 18 : 
                    var match$1 = rest[0];
                    if (match$1.tag) {
                      var scan$1 = function (width, _, ib) {
                        return scan_string(/* Some */[/* "[" */91], width, ib);
                      };
                      return pad_prec_scanf(ib, CamlinternalFormatBasics.concat_fmt(match$1[0][0], rest[1]), readers, pad, /* No_precision */0, scan$1, token);
                    } else {
                      var scan$2 = function (width, _, ib) {
                        return scan_string(/* Some */[/* "{" */123], width, ib);
                      };
                      return pad_prec_scanf(ib, CamlinternalFormatBasics.concat_fmt(match$1[0][0], rest[1]), readers, pad, /* No_precision */0, scan$2, token);
                    }
                    break;
                default:
                  exit = 1;
              }
            }
            if (exit === 1) {
              var scan$3 = function (width, _, ib) {
                return scan_string(/* None */0, width, ib);
              };
              return pad_prec_scanf(ib, rest, readers, pad, /* No_precision */0, scan$3, token);
            }
            break;
        case 3 : 
            var scan$4 = function (width, _, ib) {
              return scan_caml_string(width, ib);
            };
            return pad_prec_scanf(ib, fmt[1], readers, fmt[0], /* No_precision */0, scan$4, token);
        case 4 : 
            var c$2 = CamlinternalFormat.char_of_iconv(fmt[0]);
            var scan$5 = (function(c$2){
            return function scan$5(width, _, ib) {
              return scan_int_conv(c$2, width, ib);
            }
            }(c$2));
            return pad_prec_scanf(ib, fmt[3], readers, fmt[1], fmt[2], scan$5, (function(c$2){
                      return function (param) {
                        return Caml_format.caml_int_of_string(token_int_literal(c$2, param));
                      }
                      }(c$2)));
        case 5 : 
            var c$3 = CamlinternalFormat.char_of_iconv(fmt[0]);
            var scan$6 = (function(c$3){
            return function scan$6(width, _, ib) {
              return scan_int_conv(c$3, width, ib);
            }
            }(c$3));
            return pad_prec_scanf(ib, fmt[3], readers, fmt[1], fmt[2], scan$6, (function(c$3){
                      return function (param) {
                        return Caml_format.caml_int32_of_string(token_int_literal(c$3, param));
                      }
                      }(c$3)));
        case 6 : 
            var c$4 = CamlinternalFormat.char_of_iconv(fmt[0]);
            var scan$7 = (function(c$4){
            return function scan$7(width, _, ib) {
              return scan_int_conv(c$4, width, ib);
            }
            }(c$4));
            return pad_prec_scanf(ib, fmt[3], readers, fmt[1], fmt[2], scan$7, (function(c$4){
                      return function (param) {
                        return Caml_format.caml_nativeint_of_string(token_int_literal(c$4, param));
                      }
                      }(c$4)));
        case 7 : 
            var c$5 = CamlinternalFormat.char_of_iconv(fmt[0]);
            var scan$8 = (function(c$5){
            return function scan$8(width, _, ib) {
              return scan_int_conv(c$5, width, ib);
            }
            }(c$5));
            return pad_prec_scanf(ib, fmt[3], readers, fmt[1], fmt[2], scan$8, (function(c$5){
                      return function (param) {
                        return Caml_format.caml_int64_of_string(token_int_literal(c$5, param));
                      }
                      }(c$5)));
        case 8 : 
            if (fmt[0] >= 15) {
              return pad_prec_scanf(ib, fmt[3], readers, fmt[1], fmt[2], scan_caml_float, token_float);
            } else {
              return pad_prec_scanf(ib, fmt[3], readers, fmt[1], fmt[2], scan_float, token_float);
            }
        case 9 : 
            scan_bool(ib);
            var b = token_bool(ib);
            return /* Cons */[
                    b,
                    make_scanf(ib, fmt[0], readers)
                  ];
        case 10 : 
            if (end_of_input(ib)) {
              _fmt = fmt[0];
              continue ;
              
            } else {
              throw [
                    Scan_failure,
                    "end of input not found"
                  ];
            }
            break;
        case 11 : 
            var f = function (param) {
              return check_char(ib, param);
            };
            Bytes.iter(f, Caml_string.bytes_of_string(fmt[0]));
            _fmt = fmt[1];
            continue ;
            case 12 : 
            check_char(ib, fmt[0]);
            _fmt = fmt[1];
            continue ;
            case 13 : 
            scan_caml_string(width_of_pad_opt(fmt[0]), ib);
            var s = token(ib);
            var fmt$1;
            try {
              fmt$1 = CamlinternalFormat.format_of_string_fmtty(s, fmt[1]);
            }
            catch (raw_exn){
              var exn = Js_exn.internalToOCamlException(raw_exn);
              if (exn[0] === Caml_builtin_exceptions.failure) {
                throw [
                      Scan_failure,
                      exn[1]
                    ];
              } else {
                throw exn;
              }
            }
            return /* Cons */[
                    fmt$1,
                    make_scanf(ib, fmt[2], readers)
                  ];
        case 14 : 
            var fmtty = fmt[1];
            scan_caml_string(width_of_pad_opt(fmt[0]), ib);
            var s$1 = token(ib);
            var match$2;
            try {
              var match$3 = CamlinternalFormat.fmt_ebb_of_string(/* None */0, s$1);
              var match$4 = CamlinternalFormat.fmt_ebb_of_string(/* None */0, s$1);
              match$2 = /* tuple */[
                CamlinternalFormat.type_format(match$3[0], CamlinternalFormatBasics.erase_rel(fmtty)),
                CamlinternalFormat.type_format(match$4[0], CamlinternalFormatBasics.erase_rel(CamlinternalFormat.symm(fmtty)))
              ];
            }
            catch (raw_exn$1){
              var exn$1 = Js_exn.internalToOCamlException(raw_exn$1);
              if (exn$1[0] === Caml_builtin_exceptions.failure) {
                throw [
                      Scan_failure,
                      exn$1[1]
                    ];
              } else {
                throw exn$1;
              }
            }
            return /* Cons */[
                    /* Format */[
                      match$2[0],
                      s$1
                    ],
                    make_scanf(ib, CamlinternalFormatBasics.concat_fmt(match$2[1], fmt[2]), readers)
                  ];
        case 15 : 
            throw [
                  Caml_builtin_exceptions.invalid_argument,
                  "scanf: bad conversion \"%a\""
                ];
        case 16 : 
            throw [
                  Caml_builtin_exceptions.invalid_argument,
                  "scanf: bad conversion \"%t\""
                ];
        case 17 : 
            var s$2 = CamlinternalFormat.string_of_formatting_lit(fmt[0]);
            var f$1 = function (param) {
              return check_char(ib, param);
            };
            Bytes.iter(f$1, Caml_string.bytes_of_string(s$2));
            _fmt = fmt[1];
            continue ;
            case 18 : 
            var match$5 = fmt[0];
            check_char(ib, /* "@" */64);
            if (match$5.tag) {
              check_char(ib, /* "[" */91);
              _fmt = CamlinternalFormatBasics.concat_fmt(match$5[0][0], fmt[1]);
              continue ;
              
            } else {
              check_char(ib, /* "{" */123);
              _fmt = CamlinternalFormatBasics.concat_fmt(match$5[0][0], fmt[1]);
              continue ;
              
            }
            break;
        case 19 : 
            var x = Curry._1(readers[0], ib);
            return /* Cons */[
                    x,
                    make_scanf(ib, fmt[0], readers[1])
                  ];
        case 20 : 
            var rest$1 = fmt[2];
            var char_set = fmt[1];
            var width_opt = fmt[0];
            var exit$1 = 0;
            if (typeof rest$1 === "number") {
              exit$1 = 1;
            } else if (rest$1.tag === 17) {
              var match$6 = stopper_of_formatting_lit(rest$1[0]);
              var width = width_of_pad_opt(width_opt);
              scan_chars_in_char_set(char_set, /* Some */[match$6[0]], width, ib);
              var s$3 = token(ib);
              var str_rest_000$1 = match$6[1];
              var str_rest_001$1 = rest$1[1];
              var str_rest$1 = /* String_literal */Block.__(11, [
                  str_rest_000$1,
                  str_rest_001$1
                ]);
              return /* Cons */[
                      s$3,
                      make_scanf(ib, str_rest$1, readers)
                    ];
            } else {
              exit$1 = 1;
            }
            if (exit$1 === 1) {
              var width$1 = width_of_pad_opt(width_opt);
              scan_chars_in_char_set(char_set, /* None */0, width$1, ib);
              var s$4 = token(ib);
              return /* Cons */[
                      s$4,
                      make_scanf(ib, rest$1, readers)
                    ];
            }
            break;
        case 21 : 
            var count = get_counter(ib, fmt[0]);
            return /* Cons */[
                    count,
                    make_scanf(ib, fmt[1], readers)
                  ];
        case 22 : 
            var c$6 = checked_peek_char(ib);
            return /* Cons */[
                    c$6,
                    make_scanf(ib, fmt[0], readers)
                  ];
        case 23 : 
            var match$7 = CamlinternalFormat.param_format_of_ignored_format(fmt[0], fmt[1]);
            var match$8 = make_scanf(ib, match$7[0], readers);
            if (match$8) {
              return match$8[1];
            } else {
              throw [
                    Caml_builtin_exceptions.assert_failure,
                    [
                      "scanf.ml",
                      1258,
                      13
                    ]
                  ];
            }
            break;
        case 24 : 
            throw [
                  Caml_builtin_exceptions.invalid_argument,
                  "scanf: bad conversion \"%?\" (custom converter)"
                ];
        
      }
    }
  };
}

function pad_prec_scanf(ib, fmt, readers, pad, prec, scan, token) {
  if (typeof pad === "number") {
    if (typeof prec === "number") {
      if (prec !== 0) {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "scanf: bad conversion \"%*\""
            ];
      } else {
        Curry._3(scan, Pervasives.max_int, Pervasives.max_int, ib);
        var x = Curry._1(token, ib);
        return /* Cons */[
                x,
                make_scanf(ib, fmt, readers)
              ];
      }
    } else {
      Curry._3(scan, Pervasives.max_int, prec[0], ib);
      var x$1 = Curry._1(token, ib);
      return /* Cons */[
              x$1,
              make_scanf(ib, fmt, readers)
            ];
    }
  } else if (pad.tag) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "scanf: bad conversion \"%*\""
        ];
  } else if (pad[0] !== 0) {
    var w = pad[1];
    if (typeof prec === "number") {
      if (prec !== 0) {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "scanf: bad conversion \"%*\""
            ];
      } else {
        Curry._3(scan, w, Pervasives.max_int, ib);
        var x$2 = Curry._1(token, ib);
        return /* Cons */[
                x$2,
                make_scanf(ib, fmt, readers)
              ];
      }
    } else {
      Curry._3(scan, w, prec[0], ib);
      var x$3 = Curry._1(token, ib);
      return /* Cons */[
              x$3,
              make_scanf(ib, fmt, readers)
            ];
    }
  } else {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "scanf: bad conversion \"%-\""
        ];
  }
}

function kscanf(ib, ef, param) {
  var str = param[1];
  var fmt = param[0];
  var k = function (readers, f) {
    Buffer.reset(ib[/* tokbuf */7]);
    var match;
    try {
      match = /* Args */Block.__(0, [make_scanf(ib, fmt, readers)]);
    }
    catch (raw_exc){
      var exc = Js_exn.internalToOCamlException(raw_exc);
      if (exc[0] === Scan_failure) {
        match = /* Exc */Block.__(1, [exc]);
      } else if (exc[0] === Caml_builtin_exceptions.failure) {
        match = /* Exc */Block.__(1, [exc]);
      } else if (exc === Caml_builtin_exceptions.end_of_file) {
        match = /* Exc */Block.__(1, [exc]);
      } else if (exc[0] === Caml_builtin_exceptions.invalid_argument) {
        var s = exc[1] + (" in format \"" + ($$String.escaped(str) + "\""));
        throw [
              Caml_builtin_exceptions.invalid_argument,
              s
            ];
      } else {
        throw exc;
      }
    }
    if (match.tag) {
      return Curry._2(ef, ib, match[0]);
    } else {
      var _f = f;
      var _args = match[0];
      while(true) {
        var args = _args;
        var f$1 = _f;
        if (args) {
          _args = args[1];
          _f = Curry._1(f$1, args[0]);
          continue ;
          
        } else {
          return f$1;
        }
      };
    }
  };
  return take_format_readers(k, fmt);
}

function ksscanf(s, ef, fmt) {
  return kscanf(from_string(s), ef, fmt);
}

function kfscanf(ic, ef, fmt) {
  return kscanf(memo_from_ic(scan_raise_at_end, ic), ef, fmt);
}

function bscanf(ib, fmt) {
  return kscanf(ib, scanf_bad_input, fmt);
}

function fscanf(ic, fmt) {
  return kscanf(memo_from_ic(scan_raise_at_end, ic), scanf_bad_input, fmt);
}

function sscanf(s, fmt) {
  return kscanf(from_string(s), scanf_bad_input, fmt);
}

function scanf(fmt) {
  return kscanf(stdin, scanf_bad_input, fmt);
}

function bscanf_format(ib, format, f) {
  scan_caml_string(Pervasives.max_int, ib);
  var str = token(ib);
  var tmp;
  try {
    tmp = CamlinternalFormat.format_of_string_format(str, format);
  }
  catch (raw_exn){
    var exn = Js_exn.internalToOCamlException(raw_exn);
    if (exn[0] === Caml_builtin_exceptions.failure) {
      throw [
            Scan_failure,
            exn[1]
          ];
    } else {
      throw exn;
    }
  }
  return Curry._1(f, tmp);
}

function sscanf_format(s, format, f) {
  return bscanf_format(from_string(s), format, f);
}

function string_to_String(s) {
  var l = s.length;
  var b = Buffer.create(l + 2 | 0);
  Buffer.add_char(b, /* "\"" */34);
  for(var i = 0 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
    var c = Caml_string.get(s, i);
    if (c === /* "\"" */34) {
      Buffer.add_char(b, /* "\\" */92);
    }
    Buffer.add_char(b, c);
  }
  Buffer.add_char(b, /* "\"" */34);
  return Buffer.contents(b);
}

function format_from_string(s, fmt) {
  return sscanf_format(string_to_String(s), fmt, (function (x) {
                return x;
              }));
}

function unescaped(s) {
  return Curry._1(sscanf("\"" + (s + "\""), /* Format */[
                  /* Caml_string */Block.__(3, [
                      /* No_padding */0,
                      /* Flush */Block.__(10, [/* End_of_format */0])
                    ]),
                  "%S%!"
                ]), (function (x) {
                return x;
              }));
}

var Scanning = [
  stdin,
  open_in,
  open_in_bin,
  close_in,
  open_in,
  open_in_bin,
  from_string,
  from_function,
  from_channel,
  end_of_input,
  beginning_of_input,
  name_of_input,
  stdin
];

exports.Scanning           = Scanning;
exports.Scan_failure       = Scan_failure;
exports.bscanf             = bscanf;
exports.fscanf             = fscanf;
exports.sscanf             = sscanf;
exports.scanf              = scanf;
exports.kscanf             = kscanf;
exports.ksscanf            = ksscanf;
exports.kfscanf            = kfscanf;
exports.bscanf_format      = bscanf_format;
exports.sscanf_format      = sscanf_format;
exports.format_from_string = format_from_string;
exports.unescaped          = unescaped;
/* stdin Not a pure module */

},{"./block.js":"stdlib/block","./buffer.js":"stdlib/buffer","./bytes.js":"stdlib/bytes","./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./caml_bytes.js":"stdlib/caml_bytes","./caml_exceptions.js":"stdlib/caml_exceptions","./caml_format.js":"stdlib/caml_format","./caml_int32.js":"stdlib/caml_int32","./caml_missing_polyfill.js":"stdlib/caml_missing_polyfill","./caml_string.js":"stdlib/caml_string","./camlinternalFormat.js":"stdlib/camlinternalFormat","./camlinternalFormatBasics.js":"stdlib/camlinternalFormatBasics","./curry.js":"stdlib/curry","./js_exn.js":"stdlib/js_exn","./list.js":"stdlib/list","./pervasives.js":"stdlib/pervasives","./printf.js":"stdlib/printf","./string.js":"stdlib/string"}],"stdlib/set":[function(require,module,exports){
'use strict';

var List                    = require("./list.js");
var Curry                   = require("./curry.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function Make(funarg) {
  var height = function (param) {
    if (param) {
      return param[3];
    } else {
      return 0;
    }
  };
  var create = function (l, v, r) {
    var hl = l ? l[3] : 0;
    var hr = r ? r[3] : 0;
    return /* Node */[
            l,
            v,
            r,
            hl >= hr ? hl + 1 | 0 : hr + 1 | 0
          ];
  };
  var bal = function (l, v, r) {
    var hl = l ? l[3] : 0;
    var hr = r ? r[3] : 0;
    if (hl > (hr + 2 | 0)) {
      if (l) {
        var lr = l[2];
        var lv = l[1];
        var ll = l[0];
        if (height(ll) >= height(lr)) {
          return create(ll, lv, create(lr, v, r));
        } else if (lr) {
          return create(create(ll, lv, lr[0]), lr[1], create(lr[2], v, r));
        } else {
          throw [
                Caml_builtin_exceptions.invalid_argument,
                "Set.bal"
              ];
        }
      } else {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "Set.bal"
            ];
      }
    } else if (hr > (hl + 2 | 0)) {
      if (r) {
        var rr = r[2];
        var rv = r[1];
        var rl = r[0];
        if (height(rr) >= height(rl)) {
          return create(create(l, v, rl), rv, rr);
        } else if (rl) {
          return create(create(l, v, rl[0]), rl[1], create(rl[2], rv, rr));
        } else {
          throw [
                Caml_builtin_exceptions.invalid_argument,
                "Set.bal"
              ];
        }
      } else {
        throw [
              Caml_builtin_exceptions.invalid_argument,
              "Set.bal"
            ];
      }
    } else {
      return /* Node */[
              l,
              v,
              r,
              hl >= hr ? hl + 1 | 0 : hr + 1 | 0
            ];
    }
  };
  var add = function (x, t) {
    if (t) {
      var r = t[2];
      var v = t[1];
      var l = t[0];
      var c = Curry._2(funarg[/* compare */0], x, v);
      if (c) {
        if (c < 0) {
          return bal(add(x, l), v, r);
        } else {
          return bal(l, v, add(x, r));
        }
      } else {
        return t;
      }
    } else {
      return /* Node */[
              /* Empty */0,
              x,
              /* Empty */0,
              1
            ];
    }
  };
  var singleton = function (x) {
    return /* Node */[
            /* Empty */0,
            x,
            /* Empty */0,
            1
          ];
  };
  var add_min_element = function (v, param) {
    if (param) {
      return bal(add_min_element(v, param[0]), param[1], param[2]);
    } else {
      return singleton(v);
    }
  };
  var add_max_element = function (v, param) {
    if (param) {
      return bal(param[0], param[1], add_max_element(v, param[2]));
    } else {
      return singleton(v);
    }
  };
  var join = function (l, v, r) {
    if (l) {
      if (r) {
        var rh = r[3];
        var lh = l[3];
        if (lh > (rh + 2 | 0)) {
          return bal(l[0], l[1], join(l[2], v, r));
        } else if (rh > (lh + 2 | 0)) {
          return bal(join(l, v, r[0]), r[1], r[2]);
        } else {
          return create(l, v, r);
        }
      } else {
        return add_max_element(v, l);
      }
    } else {
      return add_min_element(v, r);
    }
  };
  var min_elt = function (_param) {
    while(true) {
      var param = _param;
      if (param) {
        var l = param[0];
        if (l) {
          _param = l;
          continue ;
          
        } else {
          return param[1];
        }
      } else {
        throw Caml_builtin_exceptions.not_found;
      }
    };
  };
  var max_elt = function (_param) {
    while(true) {
      var param = _param;
      if (param) {
        var r = param[2];
        if (r) {
          _param = r;
          continue ;
          
        } else {
          return param[1];
        }
      } else {
        throw Caml_builtin_exceptions.not_found;
      }
    };
  };
  var remove_min_elt = function (param) {
    if (param) {
      var l = param[0];
      if (l) {
        return bal(remove_min_elt(l), param[1], param[2]);
      } else {
        return param[2];
      }
    } else {
      throw [
            Caml_builtin_exceptions.invalid_argument,
            "Set.remove_min_elt"
          ];
    }
  };
  var concat = function (t1, t2) {
    if (t1) {
      if (t2) {
        return join(t1, min_elt(t2), remove_min_elt(t2));
      } else {
        return t1;
      }
    } else {
      return t2;
    }
  };
  var split = function (x, param) {
    if (param) {
      var r = param[2];
      var v = param[1];
      var l = param[0];
      var c = Curry._2(funarg[/* compare */0], x, v);
      if (c) {
        if (c < 0) {
          var match = split(x, l);
          return /* tuple */[
                  match[0],
                  match[1],
                  join(match[2], v, r)
                ];
        } else {
          var match$1 = split(x, r);
          return /* tuple */[
                  join(l, v, match$1[0]),
                  match$1[1],
                  match$1[2]
                ];
        }
      } else {
        return /* tuple */[
                l,
                /* true */1,
                r
              ];
      }
    } else {
      return /* tuple */[
              /* Empty */0,
              /* false */0,
              /* Empty */0
            ];
    }
  };
  var is_empty = function (param) {
    if (param) {
      return /* false */0;
    } else {
      return /* true */1;
    }
  };
  var mem = function (x, _param) {
    while(true) {
      var param = _param;
      if (param) {
        var c = Curry._2(funarg[/* compare */0], x, param[1]);
        if (c) {
          _param = c < 0 ? param[0] : param[2];
          continue ;
          
        } else {
          return /* true */1;
        }
      } else {
        return /* false */0;
      }
    };
  };
  var remove = function (x, param) {
    if (param) {
      var r = param[2];
      var v = param[1];
      var l = param[0];
      var c = Curry._2(funarg[/* compare */0], x, v);
      if (c) {
        if (c < 0) {
          return bal(remove(x, l), v, r);
        } else {
          return bal(l, v, remove(x, r));
        }
      } else {
        var t1 = l;
        var t2 = r;
        if (t1) {
          if (t2) {
            return bal(t1, min_elt(t2), remove_min_elt(t2));
          } else {
            return t1;
          }
        } else {
          return t2;
        }
      }
    } else {
      return /* Empty */0;
    }
  };
  var union = function (s1, s2) {
    if (s1) {
      if (s2) {
        var h2 = s2[3];
        var v2 = s2[1];
        var h1 = s1[3];
        var v1 = s1[1];
        if (h1 >= h2) {
          if (h2 === 1) {
            return add(v2, s1);
          } else {
            var match = split(v1, s2);
            return join(union(s1[0], match[0]), v1, union(s1[2], match[2]));
          }
        } else if (h1 === 1) {
          return add(v1, s2);
        } else {
          var match$1 = split(v2, s1);
          return join(union(match$1[0], s2[0]), v2, union(match$1[2], s2[2]));
        }
      } else {
        return s1;
      }
    } else {
      return s2;
    }
  };
  var inter = function (s1, s2) {
    if (s1) {
      if (s2) {
        var r1 = s1[2];
        var v1 = s1[1];
        var l1 = s1[0];
        var match = split(v1, s2);
        var l2 = match[0];
        if (match[1] !== 0) {
          return join(inter(l1, l2), v1, inter(r1, match[2]));
        } else {
          return concat(inter(l1, l2), inter(r1, match[2]));
        }
      } else {
        return /* Empty */0;
      }
    } else {
      return /* Empty */0;
    }
  };
  var diff = function (s1, s2) {
    if (s1) {
      if (s2) {
        var r1 = s1[2];
        var v1 = s1[1];
        var l1 = s1[0];
        var match = split(v1, s2);
        var l2 = match[0];
        if (match[1] !== 0) {
          return concat(diff(l1, l2), diff(r1, match[2]));
        } else {
          return join(diff(l1, l2), v1, diff(r1, match[2]));
        }
      } else {
        return s1;
      }
    } else {
      return /* Empty */0;
    }
  };
  var cons_enum = function (_s, _e) {
    while(true) {
      var e = _e;
      var s = _s;
      if (s) {
        _e = /* More */[
          s[1],
          s[2],
          e
        ];
        _s = s[0];
        continue ;
        
      } else {
        return e;
      }
    };
  };
  var compare = function (s1, s2) {
    var _e1 = cons_enum(s1, /* End */0);
    var _e2 = cons_enum(s2, /* End */0);
    while(true) {
      var e2 = _e2;
      var e1 = _e1;
      if (e1) {
        if (e2) {
          var c = Curry._2(funarg[/* compare */0], e1[0], e2[0]);
          if (c !== 0) {
            return c;
          } else {
            _e2 = cons_enum(e2[1], e2[2]);
            _e1 = cons_enum(e1[1], e1[2]);
            continue ;
            
          }
        } else {
          return 1;
        }
      } else if (e2) {
        return -1;
      } else {
        return 0;
      }
    };
  };
  var equal = function (s1, s2) {
    return +(compare(s1, s2) === 0);
  };
  var subset = function (_s1, _s2) {
    while(true) {
      var s2 = _s2;
      var s1 = _s1;
      if (s1) {
        if (s2) {
          var r2 = s2[2];
          var l2 = s2[0];
          var r1 = s1[2];
          var v1 = s1[1];
          var l1 = s1[0];
          var c = Curry._2(funarg[/* compare */0], v1, s2[1]);
          if (c) {
            if (c < 0) {
              if (subset(/* Node */[
                      l1,
                      v1,
                      /* Empty */0,
                      0
                    ], l2)) {
                _s1 = r1;
                continue ;
                
              } else {
                return /* false */0;
              }
            } else if (subset(/* Node */[
                    /* Empty */0,
                    v1,
                    r1,
                    0
                  ], r2)) {
              _s1 = l1;
              continue ;
              
            } else {
              return /* false */0;
            }
          } else if (subset(l1, l2)) {
            _s2 = r2;
            _s1 = r1;
            continue ;
            
          } else {
            return /* false */0;
          }
        } else {
          return /* false */0;
        }
      } else {
        return /* true */1;
      }
    };
  };
  var iter = function (f, _param) {
    while(true) {
      var param = _param;
      if (param) {
        iter(f, param[0]);
        Curry._1(f, param[1]);
        _param = param[2];
        continue ;
        
      } else {
        return /* () */0;
      }
    };
  };
  var fold = function (f, _s, _accu) {
    while(true) {
      var accu = _accu;
      var s = _s;
      if (s) {
        _accu = Curry._2(f, s[1], fold(f, s[0], accu));
        _s = s[2];
        continue ;
        
      } else {
        return accu;
      }
    };
  };
  var for_all = function (p, _param) {
    while(true) {
      var param = _param;
      if (param) {
        if (Curry._1(p, param[1])) {
          if (for_all(p, param[0])) {
            _param = param[2];
            continue ;
            
          } else {
            return /* false */0;
          }
        } else {
          return /* false */0;
        }
      } else {
        return /* true */1;
      }
    };
  };
  var exists = function (p, _param) {
    while(true) {
      var param = _param;
      if (param) {
        if (Curry._1(p, param[1])) {
          return /* true */1;
        } else if (exists(p, param[0])) {
          return /* true */1;
        } else {
          _param = param[2];
          continue ;
          
        }
      } else {
        return /* false */0;
      }
    };
  };
  var filter = function (p, param) {
    if (param) {
      var v = param[1];
      var l$prime = filter(p, param[0]);
      var pv = Curry._1(p, v);
      var r$prime = filter(p, param[2]);
      if (pv) {
        return join(l$prime, v, r$prime);
      } else {
        return concat(l$prime, r$prime);
      }
    } else {
      return /* Empty */0;
    }
  };
  var partition = function (p, param) {
    if (param) {
      var v = param[1];
      var match = partition(p, param[0]);
      var lf = match[1];
      var lt = match[0];
      var pv = Curry._1(p, v);
      var match$1 = partition(p, param[2]);
      var rf = match$1[1];
      var rt = match$1[0];
      if (pv) {
        return /* tuple */[
                join(lt, v, rt),
                concat(lf, rf)
              ];
      } else {
        return /* tuple */[
                concat(lt, rt),
                join(lf, v, rf)
              ];
      }
    } else {
      return /* tuple */[
              /* Empty */0,
              /* Empty */0
            ];
    }
  };
  var cardinal = function (param) {
    if (param) {
      return (cardinal(param[0]) + 1 | 0) + cardinal(param[2]) | 0;
    } else {
      return 0;
    }
  };
  var elements_aux = function (_accu, _param) {
    while(true) {
      var param = _param;
      var accu = _accu;
      if (param) {
        _param = param[0];
        _accu = /* :: */[
          param[1],
          elements_aux(accu, param[2])
        ];
        continue ;
        
      } else {
        return accu;
      }
    };
  };
  var elements = function (s) {
    return elements_aux(/* [] */0, s);
  };
  var find = function (x, _param) {
    while(true) {
      var param = _param;
      if (param) {
        var v = param[1];
        var c = Curry._2(funarg[/* compare */0], x, v);
        if (c) {
          _param = c < 0 ? param[0] : param[2];
          continue ;
          
        } else {
          return v;
        }
      } else {
        throw Caml_builtin_exceptions.not_found;
      }
    };
  };
  var of_list = function (l) {
    if (l) {
      var match = l[1];
      var x0 = l[0];
      if (match) {
        var match$1 = match[1];
        var x1 = match[0];
        if (match$1) {
          var match$2 = match$1[1];
          var x2 = match$1[0];
          if (match$2) {
            var match$3 = match$2[1];
            var x3 = match$2[0];
            if (match$3) {
              if (match$3[1]) {
                var l$1 = List.sort_uniq(funarg[/* compare */0], l);
                var sub = function (n, l) {
                  var exit = 0;
                  if (n > 3 || n < 0) {
                    exit = 1;
                  } else {
                    switch (n) {
                      case 0 : 
                          return /* tuple */[
                                  /* Empty */0,
                                  l
                                ];
                      case 1 : 
                          if (l) {
                            return /* tuple */[
                                    /* Node */[
                                      /* Empty */0,
                                      l[0],
                                      /* Empty */0,
                                      1
                                    ],
                                    l[1]
                                  ];
                          } else {
                            exit = 1;
                          }
                          break;
                      case 2 : 
                          if (l) {
                            var match = l[1];
                            if (match) {
                              return /* tuple */[
                                      /* Node */[
                                        /* Node */[
                                          /* Empty */0,
                                          l[0],
                                          /* Empty */0,
                                          1
                                        ],
                                        match[0],
                                        /* Empty */0,
                                        2
                                      ],
                                      match[1]
                                    ];
                            } else {
                              exit = 1;
                            }
                          } else {
                            exit = 1;
                          }
                          break;
                      case 3 : 
                          if (l) {
                            var match$1 = l[1];
                            if (match$1) {
                              var match$2 = match$1[1];
                              if (match$2) {
                                return /* tuple */[
                                        /* Node */[
                                          /* Node */[
                                            /* Empty */0,
                                            l[0],
                                            /* Empty */0,
                                            1
                                          ],
                                          match$1[0],
                                          /* Node */[
                                            /* Empty */0,
                                            match$2[0],
                                            /* Empty */0,
                                            1
                                          ],
                                          2
                                        ],
                                        match$2[1]
                                      ];
                              } else {
                                exit = 1;
                              }
                            } else {
                              exit = 1;
                            }
                          } else {
                            exit = 1;
                          }
                          break;
                      
                    }
                  }
                  if (exit === 1) {
                    var nl = n / 2 | 0;
                    var match$3 = sub(nl, l);
                    var l$1 = match$3[1];
                    if (l$1) {
                      var match$4 = sub((n - nl | 0) - 1 | 0, l$1[1]);
                      return /* tuple */[
                              create(match$3[0], l$1[0], match$4[0]),
                              match$4[1]
                            ];
                    } else {
                      throw [
                            Caml_builtin_exceptions.assert_failure,
                            [
                              "set.ml",
                              372,
                              18
                            ]
                          ];
                    }
                  }
                  
                };
                return sub(List.length(l$1), l$1)[0];
              } else {
                return add(match$3[0], add(x3, add(x2, add(x1, singleton(x0)))));
              }
            } else {
              return add(x3, add(x2, add(x1, singleton(x0))));
            }
          } else {
            return add(x2, add(x1, singleton(x0)));
          }
        } else {
          return add(x1, singleton(x0));
        }
      } else {
        return singleton(x0);
      }
    } else {
      return /* Empty */0;
    }
  };
  return [
          /* Empty */0,
          is_empty,
          mem,
          add,
          singleton,
          remove,
          union,
          inter,
          diff,
          compare,
          equal,
          subset,
          iter,
          fold,
          for_all,
          exists,
          filter,
          partition,
          cardinal,
          elements,
          min_elt,
          max_elt,
          min_elt,
          split,
          find,
          of_list
        ];
}

exports.Make = Make;
/* No side effect */

},{"./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./curry.js":"stdlib/curry","./list.js":"stdlib/list"}],"stdlib/sort":[function(require,module,exports){
'use strict';

var Curry                   = require("./curry.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function merge(order, l1, l2) {
  if (l1) {
    if (l2) {
      var h2 = l2[0];
      var h1 = l1[0];
      if (Curry._2(order, h1, h2)) {
        return /* :: */[
                h1,
                merge(order, l1[1], l2)
              ];
      } else {
        return /* :: */[
                h2,
                merge(order, l1, l2[1])
              ];
      }
    } else {
      return l1;
    }
  } else {
    return l2;
  }
}

function list(order, l) {
  var initlist = function (param) {
    if (param) {
      var match = param[1];
      var e = param[0];
      if (match) {
        var e2 = match[0];
        return /* :: */[
                Curry._2(order, e, e2) ? /* :: */[
                    e,
                    /* :: */[
                      e2,
                      /* [] */0
                    ]
                  ] : /* :: */[
                    e2,
                    /* :: */[
                      e,
                      /* [] */0
                    ]
                  ],
                initlist(match[1])
              ];
      } else {
        return /* :: */[
                /* :: */[
                  e,
                  /* [] */0
                ],
                /* [] */0
              ];
      }
    } else {
      return /* [] */0;
    }
  };
  var merge2 = function (x) {
    if (x) {
      var match = x[1];
      if (match) {
        return /* :: */[
                merge(order, x[0], match[0]),
                merge2(match[1])
              ];
      } else {
        return x;
      }
    } else {
      return x;
    }
  };
  var _llist = initlist(l);
  while(true) {
    var llist = _llist;
    if (llist) {
      if (llist[1]) {
        _llist = merge2(llist);
        continue ;
        
      } else {
        return llist[0];
      }
    } else {
      return /* [] */0;
    }
  };
}

function swap(arr, i, j) {
  var tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
  return /* () */0;
}

function array(cmp, arr) {
  var qsort = function (_lo, _hi) {
    while(true) {
      var hi = _hi;
      var lo = _lo;
      if ((hi - lo | 0) >= 6) {
        var mid = ((lo + hi | 0) >>> 1);
        if (Curry._2(cmp, arr[mid], arr[lo])) {
          swap(arr, mid, lo);
        }
        if (Curry._2(cmp, arr[hi], arr[mid])) {
          swap(arr, mid, hi);
          if (Curry._2(cmp, arr[mid], arr[lo])) {
            swap(arr, mid, lo);
          }
          
        }
        var pivot = arr[mid];
        var i = lo + 1 | 0;
        var j = hi - 1 | 0;
        if (!Curry._2(cmp, pivot, arr[hi]) || !Curry._2(cmp, arr[lo], pivot)) {
          throw [
                Caml_builtin_exceptions.invalid_argument,
                "Sort.array"
              ];
        }
        while(i < j) {
          while(!Curry._2(cmp, pivot, arr[i])) {
            i = i + 1 | 0;
          };
          while(!Curry._2(cmp, arr[j], pivot)) {
            j = j - 1 | 0;
          };
          if (i < j) {
            swap(arr, i, j);
          }
          i = i + 1 | 0;
          j = j - 1 | 0;
        };
        if ((j - lo | 0) <= (hi - i | 0)) {
          qsort(lo, j);
          _lo = i;
          continue ;
          
        } else {
          qsort(i, hi);
          _hi = j;
          continue ;
          
        }
      } else {
        return 0;
      }
    };
  };
  qsort(0, arr.length - 1 | 0);
  for(var i = 1 ,i_finish = arr.length - 1 | 0; i <= i_finish; ++i){
    var val_i = arr[i];
    if (!Curry._2(cmp, arr[i - 1 | 0], val_i)) {
      arr[i] = arr[i - 1 | 0];
      var j = i - 1 | 0;
      while(j >= 1 && !Curry._2(cmp, arr[j - 1 | 0], val_i)) {
        arr[j] = arr[j - 1 | 0];
        j = j - 1 | 0;
      };
      arr[j] = val_i;
    }
    
  }
  return /* () */0;
}

exports.list  = list;
exports.array = array;
exports.merge = merge;
/* No side effect */

},{"./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./curry.js":"stdlib/curry"}],"stdlib/stack":[function(require,module,exports){
'use strict';

var List            = require("./list.js");
var Caml_exceptions = require("./caml_exceptions.js");

var Empty = Caml_exceptions.create("Stack.Empty");

function create() {
  return /* record */[/* c : [] */0];
}

function clear(s) {
  s[/* c */0] = /* [] */0;
  return /* () */0;
}

function copy(s) {
  return /* record */[/* c */s[/* c */0]];
}

function push(x, s) {
  s[/* c */0] = /* :: */[
    x,
    s[/* c */0]
  ];
  return /* () */0;
}

function pop(s) {
  var match = s[/* c */0];
  if (match) {
    s[/* c */0] = match[1];
    return match[0];
  } else {
    throw Empty;
  }
}

function top(s) {
  var match = s[/* c */0];
  if (match) {
    return match[0];
  } else {
    throw Empty;
  }
}

function is_empty(s) {
  return +(s[/* c */0] === /* [] */0);
}

function length(s) {
  return List.length(s[/* c */0]);
}

function iter(f, s) {
  return List.iter(f, s[/* c */0]);
}

exports.Empty    = Empty;
exports.create   = create;
exports.push     = push;
exports.pop      = pop;
exports.top      = top;
exports.clear    = clear;
exports.copy     = copy;
exports.is_empty = is_empty;
exports.length   = length;
exports.iter     = iter;
/* No side effect */

},{"./caml_exceptions.js":"stdlib/caml_exceptions","./list.js":"stdlib/list"}],"stdlib/stdLabels":[function(require,module,exports){
'use strict';


var $$Array = 0;

var Bytes = 0;

var List = 0;

var $$String = 0;

exports.$$Array  = $$Array;
exports.Bytes    = Bytes;
exports.List     = List;
exports.$$String = $$String;
/* No side effect */

},{}],"stdlib/std_exit":[function(require,module,exports){
'use strict';

var Pervasives = require("./pervasives.js");

Pervasives.do_at_exit(/* () */0);

/*  Not a pure module */

},{"./pervasives.js":"stdlib/pervasives"}],"stdlib/stream":[function(require,module,exports){
'use strict';

var List                    = require("./list.js");
var Block                   = require("./block.js");
var Curry                   = require("./curry.js");
var Caml_bytes              = require("./caml_bytes.js");
var Pervasives              = require("./pervasives.js");
var Caml_string             = require("./caml_string.js");
var Caml_exceptions         = require("./caml_exceptions.js");
var CamlinternalLazy        = require("./camlinternalLazy.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

var Failure = Caml_exceptions.create("Stream.Failure");

var $$Error = Caml_exceptions.create("Stream.Error");

function fill_buff(b) {
  b[/* len */2] = Pervasives.input(b[/* ic */0], b[/* buff */1], 0, b[/* buff */1].length);
  b[/* ind */3] = 0;
  return /* () */0;
}

function get_data(count, _d) {
  while(true) {
    var d = _d;
    if (typeof d === "number") {
      return d;
    } else {
      switch (d.tag | 0) {
        case 0 : 
            return d;
        case 1 : 
            var d2 = d[1];
            var match = get_data(count, d[0]);
            if (typeof match === "number") {
              if (match) {
                throw [
                      Caml_builtin_exceptions.assert_failure,
                      [
                        "stream.ml",
                        53,
                        12
                      ]
                    ];
              } else {
                _d = d2;
                continue ;
                
              }
            } else if (match.tag) {
              throw [
                    Caml_builtin_exceptions.assert_failure,
                    [
                      "stream.ml",
                      53,
                      12
                    ]
                  ];
            } else {
              return /* Scons */Block.__(0, [
                        match[0],
                        /* Sapp */Block.__(1, [
                            match[1],
                            d2
                          ])
                      ]);
            }
            break;
        case 2 : 
            var f = d[0];
            var tag = f.tag | 0;
            _d = tag === 250 ? f[0] : (
                tag === 246 ? CamlinternalLazy.force_lazy_block(f) : f
              );
            continue ;
            case 3 : 
            var g = d[0];
            var match$1 = g[/* curr */0];
            if (match$1) {
              var match$2 = match$1[0];
              if (match$2) {
                g[/* curr */0] = /* None */0;
                return /* Scons */Block.__(0, [
                          match$2[0],
                          d
                        ]);
              } else {
                return /* Sempty */0;
              }
            } else {
              var match$3 = Curry._1(g[/* func */1], count);
              if (match$3) {
                return /* Scons */Block.__(0, [
                          match$3[0],
                          d
                        ]);
              } else {
                g[/* curr */0] = /* Some */[/* None */0];
                return /* Sempty */0;
              }
            }
            break;
        case 4 : 
            var b = d[0];
            if (b[/* ind */3] >= b[/* len */2]) {
              fill_buff(b);
            }
            if (b[/* len */2]) {
              var r = b[/* buff */1][b[/* ind */3]];
              b[/* ind */3] = b[/* ind */3] + 1 | 0;
              return /* Scons */Block.__(0, [
                        r,
                        d
                      ]);
            } else {
              return /* Sempty */0;
            }
            break;
        
      }
    }
  };
}

function peek(s) {
  while(true) {
    var match = s[/* data */1];
    if (typeof match === "number") {
      return /* None */0;
    } else {
      switch (match.tag | 0) {
        case 0 : 
            return /* Some */[match[0]];
        case 1 : 
            var d = get_data(s[/* count */0], s[/* data */1]);
            if (typeof d === "number") {
              if (d) {
                throw [
                      Caml_builtin_exceptions.assert_failure,
                      [
                        "stream.ml",
                        82,
                        12
                      ]
                    ];
              } else {
                return /* None */0;
              }
            } else if (d.tag) {
              throw [
                    Caml_builtin_exceptions.assert_failure,
                    [
                      "stream.ml",
                      82,
                      12
                    ]
                  ];
            } else {
              s[1] = d;
              return /* Some */[d[0]];
            }
            break;
        case 2 : 
            var f = match[0];
            var tag = f.tag | 0;
            s[1] = tag === 250 ? f[0] : (
                tag === 246 ? CamlinternalLazy.force_lazy_block(f) : f
              );
            continue ;
            case 3 : 
            var g = match[0];
            var match$1 = g[/* curr */0];
            if (match$1) {
              return match$1[0];
            } else {
              var x = Curry._1(g[/* func */1], s[/* count */0]);
              g[/* curr */0] = /* Some */[x];
              return x;
            }
            break;
        case 4 : 
            var b = match[0];
            if (b[/* ind */3] >= b[/* len */2]) {
              fill_buff(b);
            }
            if (b[/* len */2]) {
              return /* Some */[b[/* buff */1][b[/* ind */3]]];
            } else {
              s[1] = /* Sempty */0;
              return /* None */0;
            }
        
      }
    }
  };
}

function junk(s) {
  while(true) {
    var match = s[/* data */1];
    var exit = 0;
    if (typeof match === "number") {
      exit = 1;
    } else {
      switch (match.tag | 0) {
        case 0 : 
            s[0] = s[/* count */0] + 1 | 0;
            s[1] = match[1];
            return /* () */0;
        case 3 : 
            var g = match[0];
            var match$1 = g[/* curr */0];
            if (match$1) {
              s[0] = s[/* count */0] + 1 | 0;
              g[/* curr */0] = /* None */0;
              return /* () */0;
            } else {
              exit = 1;
            }
            break;
        case 4 : 
            var b = match[0];
            s[0] = s[/* count */0] + 1 | 0;
            b[/* ind */3] = b[/* ind */3] + 1 | 0;
            return /* () */0;
        default:
          exit = 1;
      }
    }
    if (exit === 1) {
      var match$2 = peek(s);
      if (match$2) {
        continue ;
        
      } else {
        return /* () */0;
      }
    }
    
  };
}

function nget(n, s) {
  if (n <= 0) {
    return /* tuple */[
            /* [] */0,
            s[/* data */1],
            0
          ];
  } else {
    var match = peek(s);
    if (match) {
      var a = match[0];
      junk(s);
      var match$1 = nget(n - 1 | 0, s);
      return /* tuple */[
              /* :: */[
                a,
                match$1[0]
              ],
              /* Scons */Block.__(0, [
                  a,
                  match$1[1]
                ]),
              match$1[2] + 1 | 0
            ];
    } else {
      return /* tuple */[
              /* [] */0,
              s[/* data */1],
              0
            ];
    }
  }
}

function npeek(n, s) {
  var match = nget(n, s);
  s[0] = s[/* count */0] - match[2] | 0;
  s[1] = match[1];
  return match[0];
}

function next(s) {
  var match = peek(s);
  if (match) {
    junk(s);
    return match[0];
  } else {
    throw Failure;
  }
}

function empty(s) {
  var match = peek(s);
  if (match) {
    throw Failure;
  } else {
    return /* () */0;
  }
}

function iter(f, strm) {
  var _param = /* () */0;
  while(true) {
    var match = peek(strm);
    if (match) {
      junk(strm);
      Curry._1(f, match[0]);
      _param = /* () */0;
      continue ;
      
    } else {
      return /* () */0;
    }
  };
}

function from(f) {
  return /* record */[
          /* count */0,
          /* data : Sgen */Block.__(3, [/* record */[
                /* curr : None */0,
                /* func */f
              ]])
        ];
}

function of_list(l) {
  return /* record */[
          /* count */0,
          /* data */List.fold_right((function (x, l) {
                  return /* Scons */Block.__(0, [
                            x,
                            l
                          ]);
                }), l, /* Sempty */0)
        ];
}

function of_string(s) {
  var count = [0];
  return from((function () {
                var c = count[0];
                if (c < s.length) {
                  count[0] = count[0] + 1 | 0;
                  return /* Some */[Caml_string.get(s, c)];
                } else {
                  return /* None */0;
                }
              }));
}

function of_bytes(s) {
  var count = [0];
  return from((function () {
                var c = count[0];
                if (c < s.length) {
                  count[0] = count[0] + 1 | 0;
                  return /* Some */[Caml_bytes.get(s, c)];
                } else {
                  return /* None */0;
                }
              }));
}

function of_channel(ic) {
  return /* record */[
          /* count */0,
          /* data : Sbuffio */Block.__(4, [/* record */[
                /* ic */ic,
                /* buff */new Array(4096),
                /* len */0,
                /* ind */0
              ]])
        ];
}

function iapp(i, s) {
  return /* record */[
          /* count */0,
          /* data : Sapp */Block.__(1, [
              i[/* data */1],
              s[/* data */1]
            ])
        ];
}

function icons(i, s) {
  return /* record */[
          /* count */0,
          /* data : Scons */Block.__(0, [
              i,
              s[/* data */1]
            ])
        ];
}

function ising(i) {
  return /* record */[
          /* count */0,
          /* data : Scons */Block.__(0, [
              i,
              /* Sempty */0
            ])
        ];
}

function lapp(f, s) {
  return /* record */[
          /* count */0,
          /* data : Slazy */Block.__(2, [Block.__(246, [(function () {
                      return /* Sapp */Block.__(1, [
                                Curry._1(f, /* () */0)[/* data */1],
                                s[/* data */1]
                              ]);
                    })])])
        ];
}

function lcons(f, s) {
  return /* record */[
          /* count */0,
          /* data : Slazy */Block.__(2, [Block.__(246, [(function () {
                      return /* Scons */Block.__(0, [
                                Curry._1(f, /* () */0),
                                s[/* data */1]
                              ]);
                    })])])
        ];
}

function lsing(f) {
  return /* record */[
          /* count */0,
          /* data : Slazy */Block.__(2, [Block.__(246, [(function () {
                      return /* Scons */Block.__(0, [
                                Curry._1(f, /* () */0),
                                /* Sempty */0
                              ]);
                    })])])
        ];
}

function slazy(f) {
  return /* record */[
          /* count */0,
          /* data : Slazy */Block.__(2, [Block.__(246, [(function () {
                      return Curry._1(f, /* () */0)[/* data */1];
                    })])])
        ];
}

function dump_data(f, param) {
  if (typeof param === "number") {
    return Pervasives.print_string("Sempty");
  } else {
    switch (param.tag | 0) {
      case 0 : 
          Pervasives.print_string("Scons (");
          Curry._1(f, param[0]);
          Pervasives.print_string(", ");
          dump_data(f, param[1]);
          return Pervasives.print_string(")");
      case 1 : 
          Pervasives.print_string("Sapp (");
          dump_data(f, param[0]);
          Pervasives.print_string(", ");
          dump_data(f, param[1]);
          return Pervasives.print_string(")");
      case 2 : 
          return Pervasives.print_string("Slazy");
      case 3 : 
          return Pervasives.print_string("Sgen");
      case 4 : 
          return Pervasives.print_string("Sbuffio");
      
    }
  }
}

function dump(f, s) {
  Pervasives.print_string("{count = ");
  Pervasives.print_int(s[/* count */0]);
  Pervasives.print_string("; data = ");
  dump_data(f, s[/* data */1]);
  Pervasives.print_string("}");
  return Pervasives.print_newline(/* () */0);
}

function count(prim) {
  return prim[0];
}

var sempty = /* record */[
  /* count */0,
  /* data : Sempty */0
];

exports.Failure    = Failure;
exports.$$Error    = $$Error;
exports.from       = from;
exports.of_list    = of_list;
exports.of_string  = of_string;
exports.of_bytes   = of_bytes;
exports.of_channel = of_channel;
exports.iter       = iter;
exports.next       = next;
exports.empty      = empty;
exports.peek       = peek;
exports.junk       = junk;
exports.count      = count;
exports.npeek      = npeek;
exports.iapp       = iapp;
exports.icons      = icons;
exports.ising      = ising;
exports.lapp       = lapp;
exports.lcons      = lcons;
exports.lsing      = lsing;
exports.sempty     = sempty;
exports.slazy      = slazy;
exports.dump       = dump;
/* No side effect */

},{"./block.js":"stdlib/block","./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./caml_bytes.js":"stdlib/caml_bytes","./caml_exceptions.js":"stdlib/caml_exceptions","./caml_string.js":"stdlib/caml_string","./camlinternalLazy.js":"stdlib/camlinternalLazy","./curry.js":"stdlib/curry","./list.js":"stdlib/list","./pervasives.js":"stdlib/pervasives"}],"stdlib/stringLabels":[function(require,module,exports){
'use strict';

var $$String = require("./string.js");

var make = $$String.make;

var init = $$String.init;

var copy = $$String.copy;

var sub = $$String.sub;

var fill = $$String.fill;

var blit = $$String.blit;

var concat = $$String.concat;

var iter = $$String.iter;

var iteri = $$String.iteri;

var map = $$String.map;

var mapi = $$String.mapi;

var trim = $$String.trim;

var escaped = $$String.escaped;

var index = $$String.index;

var rindex = $$String.rindex;

var index_from = $$String.index_from;

var rindex_from = $$String.rindex_from;

var contains = $$String.contains;

var contains_from = $$String.contains_from;

var rcontains_from = $$String.rcontains_from;

var uppercase = $$String.uppercase;

var lowercase = $$String.lowercase;

var capitalize = $$String.capitalize;

var uncapitalize = $$String.uncapitalize;

var compare = $$String.compare;

exports.make           = make;
exports.init           = init;
exports.copy           = copy;
exports.sub            = sub;
exports.fill           = fill;
exports.blit           = blit;
exports.concat         = concat;
exports.iter           = iter;
exports.iteri          = iteri;
exports.map            = map;
exports.mapi           = mapi;
exports.trim           = trim;
exports.escaped        = escaped;
exports.index          = index;
exports.rindex         = rindex;
exports.index_from     = index_from;
exports.rindex_from    = rindex_from;
exports.contains       = contains;
exports.contains_from  = contains_from;
exports.rcontains_from = rcontains_from;
exports.uppercase      = uppercase;
exports.lowercase      = lowercase;
exports.capitalize     = capitalize;
exports.uncapitalize   = uncapitalize;
exports.compare        = compare;
/* No side effect */

},{"./string.js":"stdlib/string"}],"stdlib/string":[function(require,module,exports){
'use strict';

var List        = require("./list.js");
var Bytes       = require("./bytes.js");
var Caml_int32  = require("./caml_int32.js");
var Caml_string = require("./caml_string.js");

function make(n, c) {
  return Caml_string.bytes_to_string(Bytes.make(n, c));
}

function init(n, f) {
  return Caml_string.bytes_to_string(Bytes.init(n, f));
}

function copy(s) {
  return Caml_string.bytes_to_string(Bytes.copy(Caml_string.bytes_of_string(s)));
}

function sub(s, ofs, len) {
  return Caml_string.bytes_to_string(Bytes.sub(Caml_string.bytes_of_string(s), ofs, len));
}

function concat(sep, l) {
  if (l) {
    var hd = l[0];
    var num = [0];
    var len = [0];
    List.iter((function (s) {
            num[0] = num[0] + 1 | 0;
            len[0] = len[0] + s.length | 0;
            return /* () */0;
          }), l);
    var r = Caml_string.caml_create_string(len[0] + Caml_int32.imul(sep.length, num[0] - 1 | 0) | 0);
    Caml_string.caml_blit_string(hd, 0, r, 0, hd.length);
    var pos = [hd.length];
    List.iter((function (s) {
            Caml_string.caml_blit_string(sep, 0, r, pos[0], sep.length);
            pos[0] = pos[0] + sep.length | 0;
            Caml_string.caml_blit_string(s, 0, r, pos[0], s.length);
            pos[0] = pos[0] + s.length | 0;
            return /* () */0;
          }), l[1]);
    return Caml_string.bytes_to_string(r);
  } else {
    return "";
  }
}

function iter(f, s) {
  return Bytes.iter(f, Caml_string.bytes_of_string(s));
}

function iteri(f, s) {
  return Bytes.iteri(f, Caml_string.bytes_of_string(s));
}

function map(f, s) {
  return Caml_string.bytes_to_string(Bytes.map(f, Caml_string.bytes_of_string(s)));
}

function mapi(f, s) {
  return Caml_string.bytes_to_string(Bytes.mapi(f, Caml_string.bytes_of_string(s)));
}

function is_space(param) {
  var switcher = param - 9 | 0;
  if (switcher > 4 || switcher < 0) {
    if (switcher !== 23) {
      return /* false */0;
    } else {
      return /* true */1;
    }
  } else if (switcher !== 2) {
    return /* true */1;
  } else {
    return /* false */0;
  }
}

function trim(s) {
  if (s === "" || !(is_space(s.charCodeAt(0)) || is_space(s.charCodeAt(s.length - 1 | 0)))) {
    return s;
  } else {
    return Caml_string.bytes_to_string(Bytes.trim(Caml_string.bytes_of_string(s)));
  }
}

function escaped(s) {
  var needs_escape = function (_i) {
    while(true) {
      var i = _i;
      if (i >= s.length) {
        return /* false */0;
      } else {
        var match = s.charCodeAt(i);
        if (match >= 32) {
          var switcher = match - 34 | 0;
          if (switcher > 58 || switcher < 0) {
            if (switcher >= 93) {
              return /* true */1;
            } else {
              _i = i + 1 | 0;
              continue ;
              
            }
          } else if (switcher > 57 || switcher < 1) {
            return /* true */1;
          } else {
            _i = i + 1 | 0;
            continue ;
            
          }
        } else {
          return /* true */1;
        }
      }
    };
  };
  if (needs_escape(0)) {
    return Caml_string.bytes_to_string(Bytes.escaped(Caml_string.bytes_of_string(s)));
  } else {
    return s;
  }
}

function index(s, c) {
  return Bytes.index(Caml_string.bytes_of_string(s), c);
}

function rindex(s, c) {
  return Bytes.rindex(Caml_string.bytes_of_string(s), c);
}

function index_from(s, i, c) {
  return Bytes.index_from(Caml_string.bytes_of_string(s), i, c);
}

function rindex_from(s, i, c) {
  return Bytes.rindex_from(Caml_string.bytes_of_string(s), i, c);
}

function contains(s, c) {
  return Bytes.contains(Caml_string.bytes_of_string(s), c);
}

function contains_from(s, i, c) {
  return Bytes.contains_from(Caml_string.bytes_of_string(s), i, c);
}

function rcontains_from(s, i, c) {
  return Bytes.rcontains_from(Caml_string.bytes_of_string(s), i, c);
}

function uppercase(s) {
  return Caml_string.bytes_to_string(Bytes.uppercase(Caml_string.bytes_of_string(s)));
}

function lowercase(s) {
  return Caml_string.bytes_to_string(Bytes.lowercase(Caml_string.bytes_of_string(s)));
}

function capitalize(s) {
  return Caml_string.bytes_to_string(Bytes.capitalize(Caml_string.bytes_of_string(s)));
}

function uncapitalize(s) {
  return Caml_string.bytes_to_string(Bytes.uncapitalize(Caml_string.bytes_of_string(s)));
}

var compare = Caml_string.caml_string_compare;

var fill = Bytes.fill;

var blit = Bytes.blit_string;

exports.make           = make;
exports.init           = init;
exports.copy           = copy;
exports.sub            = sub;
exports.fill           = fill;
exports.blit           = blit;
exports.concat         = concat;
exports.iter           = iter;
exports.iteri          = iteri;
exports.map            = map;
exports.mapi           = mapi;
exports.trim           = trim;
exports.escaped        = escaped;
exports.index          = index;
exports.rindex         = rindex;
exports.index_from     = index_from;
exports.rindex_from    = rindex_from;
exports.contains       = contains;
exports.contains_from  = contains_from;
exports.rcontains_from = rcontains_from;
exports.uppercase      = uppercase;
exports.lowercase      = lowercase;
exports.capitalize     = capitalize;
exports.uncapitalize   = uncapitalize;
exports.compare        = compare;
/* No side effect */

},{"./bytes.js":"stdlib/bytes","./caml_int32.js":"stdlib/caml_int32","./caml_string.js":"stdlib/caml_string","./list.js":"stdlib/list"}],"stdlib/sys":[function(require,module,exports){
'use strict';

var Caml_sys        = require("./caml_sys.js");
var Caml_exceptions = require("./caml_exceptions.js");

var is_js = /* true */1;

var match = Caml_sys.caml_sys_get_argv(/* () */0);

var big_endian = /* false */0;

var unix = /* true */1;

var win32 = /* false */0;

var cygwin = /* false */0;

var max_array_length = 2147483647;

var max_string_length = 2147483647;

var interactive = [/* false */0];

function set_signal(_, _$1) {
  return /* () */0;
}

var Break = Caml_exceptions.create("Sys.Break");

function catch_break() {
  return /* () */0;
}

var argv = match[1];

var executable_name = match[0];

var os_type = "Unix";

var word_size = 32;

var sigabrt = -1;

var sigalrm = -2;

var sigfpe = -3;

var sighup = -4;

var sigill = -5;

var sigint = -6;

var sigkill = -7;

var sigpipe = -8;

var sigquit = -9;

var sigsegv = -10;

var sigterm = -11;

var sigusr1 = -12;

var sigusr2 = -13;

var sigchld = -14;

var sigcont = -15;

var sigstop = -16;

var sigtstp = -17;

var sigttin = -18;

var sigttou = -19;

var sigvtalrm = -20;

var sigprof = -21;

var ocaml_version = "4.02.3+dev1-2015-07-10";

exports.argv              = argv;
exports.executable_name   = executable_name;
exports.interactive       = interactive;
exports.os_type           = os_type;
exports.unix              = unix;
exports.win32             = win32;
exports.cygwin            = cygwin;
exports.word_size         = word_size;
exports.big_endian        = big_endian;
exports.is_js             = is_js;
exports.max_string_length = max_string_length;
exports.max_array_length  = max_array_length;
exports.set_signal        = set_signal;
exports.sigabrt           = sigabrt;
exports.sigalrm           = sigalrm;
exports.sigfpe            = sigfpe;
exports.sighup            = sighup;
exports.sigill            = sigill;
exports.sigint            = sigint;
exports.sigkill           = sigkill;
exports.sigpipe           = sigpipe;
exports.sigquit           = sigquit;
exports.sigsegv           = sigsegv;
exports.sigterm           = sigterm;
exports.sigusr1           = sigusr1;
exports.sigusr2           = sigusr2;
exports.sigchld           = sigchld;
exports.sigcont           = sigcont;
exports.sigstop           = sigstop;
exports.sigtstp           = sigtstp;
exports.sigttin           = sigttin;
exports.sigttou           = sigttou;
exports.sigvtalrm         = sigvtalrm;
exports.sigprof           = sigprof;
exports.Break             = Break;
exports.catch_break       = catch_break;
exports.ocaml_version     = ocaml_version;
/* No side effect */

},{"./caml_exceptions.js":"stdlib/caml_exceptions","./caml_sys.js":"stdlib/caml_sys"}],"stdlib/typed_array":[function(require,module,exports){
'use strict';


var ArrayBuffer = /* module */[];

function TypedArray() {
  return /* module */[];
}

var Int8Array = /* module */[];

var Uint8Array = /* module */[];

var Uint8ClampedArray = /* module */[];

var Int16Array = /* module */[];

var Uint16Array = /* module */[];

var Int32Array = /* module */[];

var Uint32Array = /* module */[];

var Float32Array = /* module */[];

var Float64Array = /* module */[];

var Int32_array = 0;

var Float32_array = 0;

var Float64_array = 0;

exports.ArrayBuffer       = ArrayBuffer;
exports.TypedArray        = TypedArray;
exports.Int8Array         = Int8Array;
exports.Uint8Array        = Uint8Array;
exports.Uint8ClampedArray = Uint8ClampedArray;
exports.Int16Array        = Int16Array;
exports.Uint16Array       = Uint16Array;
exports.Int32Array        = Int32Array;
exports.Int32_array       = Int32_array;
exports.Uint32Array       = Uint32Array;
exports.Float32Array      = Float32Array;
exports.Float32_array     = Float32_array;
exports.Float64Array      = Float64Array;
exports.Float64_array     = Float64_array;
/* No side effect */

},{}],"stdlib/unixLabels":[function(require,module,exports){
'use strict';

var Unix = require("./unix.js");

var Unix_error = Unix.Unix_error;

var error_message = Unix.error_message;

var handle_unix_error = Unix.handle_unix_error;

var environment = Unix.environment;

var getenv = Unix.getenv;

var putenv = Unix.putenv;

var execv = Unix.execv;

var execve = Unix.execve;

var execvp = Unix.execvp;

var execvpe = Unix.execvpe;

var fork = Unix.fork;

var wait = Unix.wait;

var waitpid = Unix.waitpid;

var system = Unix.system;

var getpid = Unix.getpid;

var getppid = Unix.getppid;

var nice = Unix.nice;

var stdin = Unix.stdin;

var stdout = Unix.stdout;

var stderr = Unix.stderr;

var openfile = Unix.openfile;

var close = Unix.close;

var read = Unix.read;

var write = Unix.write;

var single_write = Unix.single_write;

var write_substring = Unix.write_substring;

var single_write_substring = Unix.single_write_substring;

var in_channel_of_descr = Unix.in_channel_of_descr;

var out_channel_of_descr = Unix.out_channel_of_descr;

var descr_of_in_channel = Unix.descr_of_in_channel;

var descr_of_out_channel = Unix.descr_of_out_channel;

var lseek = Unix.lseek;

var truncate = Unix.truncate;

var ftruncate = Unix.ftruncate;

var stat = Unix.stat;

var lstat = Unix.lstat;

var fstat = Unix.fstat;

var isatty = Unix.isatty;

var LargeFile = Unix.LargeFile;

var unlink = Unix.unlink;

var rename = Unix.rename;

var link = Unix.link;

var chmod = Unix.chmod;

var fchmod = Unix.fchmod;

var chown = Unix.chown;

var fchown = Unix.fchown;

var umask = Unix.umask;

var access = Unix.access;

var dup = Unix.dup;

var dup2 = Unix.dup2;

var set_nonblock = Unix.set_nonblock;

var clear_nonblock = Unix.clear_nonblock;

var set_close_on_exec = Unix.set_close_on_exec;

var clear_close_on_exec = Unix.clear_close_on_exec;

var mkdir = Unix.mkdir;

var rmdir = Unix.rmdir;

var chdir = Unix.chdir;

var getcwd = Unix.getcwd;

var chroot = Unix.chroot;

var opendir = Unix.opendir;

var readdir = Unix.readdir;

var rewinddir = Unix.rewinddir;

var closedir = Unix.closedir;

var pipe = Unix.pipe;

var mkfifo = Unix.mkfifo;

var create_process = Unix.create_process;

var create_process_env = Unix.create_process_env;

var open_process_in = Unix.open_process_in;

var open_process_out = Unix.open_process_out;

var open_process = Unix.open_process;

var open_process_full = Unix.open_process_full;

var close_process_in = Unix.close_process_in;

var close_process_out = Unix.close_process_out;

var close_process = Unix.close_process;

var close_process_full = Unix.close_process_full;

var symlink = Unix.symlink;

var readlink = Unix.readlink;

var select = Unix.select;

var lockf = Unix.lockf;

var kill = Unix.kill;

var sigprocmask = Unix.sigprocmask;

var sigpending = Unix.sigpending;

var sigsuspend = Unix.sigsuspend;

var pause = Unix.pause;

var time = Unix.time;

var gettimeofday = Unix.gettimeofday;

var gmtime = Unix.gmtime;

var localtime = Unix.localtime;

var mktime = Unix.mktime;

var alarm = Unix.alarm;

var sleep = Unix.sleep;

var times = Unix.times;

var utimes = Unix.utimes;

var getitimer = Unix.getitimer;

var setitimer = Unix.setitimer;

var getuid = Unix.getuid;

var geteuid = Unix.geteuid;

var setuid = Unix.setuid;

var getgid = Unix.getgid;

var getegid = Unix.getegid;

var setgid = Unix.setgid;

var getgroups = Unix.getgroups;

var setgroups = Unix.setgroups;

var initgroups = Unix.initgroups;

var getlogin = Unix.getlogin;

var getpwnam = Unix.getpwnam;

var getgrnam = Unix.getgrnam;

var getpwuid = Unix.getpwuid;

var getgrgid = Unix.getgrgid;

var inet_addr_of_string = Unix.inet_addr_of_string;

var string_of_inet_addr = Unix.string_of_inet_addr;

var inet_addr_any = Unix.inet_addr_any;

var inet_addr_loopback = Unix.inet_addr_loopback;

var inet6_addr_any = Unix.inet6_addr_any;

var inet6_addr_loopback = Unix.inet6_addr_loopback;

var socket = Unix.socket;

var domain_of_sockaddr = Unix.domain_of_sockaddr;

var socketpair = Unix.socketpair;

var accept = Unix.accept;

var bind = Unix.bind;

var connect = Unix.connect;

var listen = Unix.listen;

var shutdown = Unix.shutdown;

var getsockname = Unix.getsockname;

var getpeername = Unix.getpeername;

var recv = Unix.recv;

var recvfrom = Unix.recvfrom;

var send = Unix.send;

var send_substring = Unix.send_substring;

var sendto = Unix.sendto;

var sendto_substring = Unix.sendto_substring;

var getsockopt = Unix.getsockopt;

var setsockopt = Unix.setsockopt;

var getsockopt_int = Unix.getsockopt_int;

var setsockopt_int = Unix.setsockopt_int;

var getsockopt_optint = Unix.getsockopt_optint;

var setsockopt_optint = Unix.setsockopt_optint;

var getsockopt_float = Unix.getsockopt_float;

var setsockopt_float = Unix.setsockopt_float;

var getsockopt_error = Unix.getsockopt_error;

var open_connection = Unix.open_connection;

var shutdown_connection = Unix.shutdown_connection;

var establish_server = Unix.establish_server;

var gethostname = Unix.gethostname;

var gethostbyname = Unix.gethostbyname;

var gethostbyaddr = Unix.gethostbyaddr;

var getprotobyname = Unix.getprotobyname;

var getprotobynumber = Unix.getprotobynumber;

var getservbyname = Unix.getservbyname;

var getservbyport = Unix.getservbyport;

var getaddrinfo = Unix.getaddrinfo;

var getnameinfo = Unix.getnameinfo;

var tcgetattr = Unix.tcgetattr;

var tcsetattr = Unix.tcsetattr;

var tcsendbreak = Unix.tcsendbreak;

var tcdrain = Unix.tcdrain;

var tcflush = Unix.tcflush;

var tcflow = Unix.tcflow;

var setsid = Unix.setsid;

exports.Unix_error             = Unix_error;
exports.error_message          = error_message;
exports.handle_unix_error      = handle_unix_error;
exports.environment            = environment;
exports.getenv                 = getenv;
exports.putenv                 = putenv;
exports.execv                  = execv;
exports.execve                 = execve;
exports.execvp                 = execvp;
exports.execvpe                = execvpe;
exports.fork                   = fork;
exports.wait                   = wait;
exports.waitpid                = waitpid;
exports.system                 = system;
exports.getpid                 = getpid;
exports.getppid                = getppid;
exports.nice                   = nice;
exports.stdin                  = stdin;
exports.stdout                 = stdout;
exports.stderr                 = stderr;
exports.openfile               = openfile;
exports.close                  = close;
exports.read                   = read;
exports.write                  = write;
exports.single_write           = single_write;
exports.write_substring        = write_substring;
exports.single_write_substring = single_write_substring;
exports.in_channel_of_descr    = in_channel_of_descr;
exports.out_channel_of_descr   = out_channel_of_descr;
exports.descr_of_in_channel    = descr_of_in_channel;
exports.descr_of_out_channel   = descr_of_out_channel;
exports.lseek                  = lseek;
exports.truncate               = truncate;
exports.ftruncate              = ftruncate;
exports.stat                   = stat;
exports.lstat                  = lstat;
exports.fstat                  = fstat;
exports.isatty                 = isatty;
exports.LargeFile              = LargeFile;
exports.unlink                 = unlink;
exports.rename                 = rename;
exports.link                   = link;
exports.chmod                  = chmod;
exports.fchmod                 = fchmod;
exports.chown                  = chown;
exports.fchown                 = fchown;
exports.umask                  = umask;
exports.access                 = access;
exports.dup                    = dup;
exports.dup2                   = dup2;
exports.set_nonblock           = set_nonblock;
exports.clear_nonblock         = clear_nonblock;
exports.set_close_on_exec      = set_close_on_exec;
exports.clear_close_on_exec    = clear_close_on_exec;
exports.mkdir                  = mkdir;
exports.rmdir                  = rmdir;
exports.chdir                  = chdir;
exports.getcwd                 = getcwd;
exports.chroot                 = chroot;
exports.opendir                = opendir;
exports.readdir                = readdir;
exports.rewinddir              = rewinddir;
exports.closedir               = closedir;
exports.pipe                   = pipe;
exports.mkfifo                 = mkfifo;
exports.create_process         = create_process;
exports.create_process_env     = create_process_env;
exports.open_process_in        = open_process_in;
exports.open_process_out       = open_process_out;
exports.open_process           = open_process;
exports.open_process_full      = open_process_full;
exports.close_process_in       = close_process_in;
exports.close_process_out      = close_process_out;
exports.close_process          = close_process;
exports.close_process_full     = close_process_full;
exports.symlink                = symlink;
exports.readlink               = readlink;
exports.select                 = select;
exports.lockf                  = lockf;
exports.kill                   = kill;
exports.sigprocmask            = sigprocmask;
exports.sigpending             = sigpending;
exports.sigsuspend             = sigsuspend;
exports.pause                  = pause;
exports.time                   = time;
exports.gettimeofday           = gettimeofday;
exports.gmtime                 = gmtime;
exports.localtime              = localtime;
exports.mktime                 = mktime;
exports.alarm                  = alarm;
exports.sleep                  = sleep;
exports.times                  = times;
exports.utimes                 = utimes;
exports.getitimer              = getitimer;
exports.setitimer              = setitimer;
exports.getuid                 = getuid;
exports.geteuid                = geteuid;
exports.setuid                 = setuid;
exports.getgid                 = getgid;
exports.getegid                = getegid;
exports.setgid                 = setgid;
exports.getgroups              = getgroups;
exports.setgroups              = setgroups;
exports.initgroups             = initgroups;
exports.getlogin               = getlogin;
exports.getpwnam               = getpwnam;
exports.getgrnam               = getgrnam;
exports.getpwuid               = getpwuid;
exports.getgrgid               = getgrgid;
exports.inet_addr_of_string    = inet_addr_of_string;
exports.string_of_inet_addr    = string_of_inet_addr;
exports.inet_addr_any          = inet_addr_any;
exports.inet_addr_loopback     = inet_addr_loopback;
exports.inet6_addr_any         = inet6_addr_any;
exports.inet6_addr_loopback    = inet6_addr_loopback;
exports.socket                 = socket;
exports.domain_of_sockaddr     = domain_of_sockaddr;
exports.socketpair             = socketpair;
exports.accept                 = accept;
exports.bind                   = bind;
exports.connect                = connect;
exports.listen                 = listen;
exports.shutdown               = shutdown;
exports.getsockname            = getsockname;
exports.getpeername            = getpeername;
exports.recv                   = recv;
exports.recvfrom               = recvfrom;
exports.send                   = send;
exports.send_substring         = send_substring;
exports.sendto                 = sendto;
exports.sendto_substring       = sendto_substring;
exports.getsockopt             = getsockopt;
exports.setsockopt             = setsockopt;
exports.getsockopt_int         = getsockopt_int;
exports.setsockopt_int         = setsockopt_int;
exports.getsockopt_optint      = getsockopt_optint;
exports.setsockopt_optint      = setsockopt_optint;
exports.getsockopt_float       = getsockopt_float;
exports.setsockopt_float       = setsockopt_float;
exports.getsockopt_error       = getsockopt_error;
exports.open_connection        = open_connection;
exports.shutdown_connection    = shutdown_connection;
exports.establish_server       = establish_server;
exports.gethostname            = gethostname;
exports.gethostbyname          = gethostbyname;
exports.gethostbyaddr          = gethostbyaddr;
exports.getprotobyname         = getprotobyname;
exports.getprotobynumber       = getprotobynumber;
exports.getservbyname          = getservbyname;
exports.getservbyport          = getservbyport;
exports.getaddrinfo            = getaddrinfo;
exports.getnameinfo            = getnameinfo;
exports.tcgetattr              = tcgetattr;
exports.tcsetattr              = tcsetattr;
exports.tcsendbreak            = tcsendbreak;
exports.tcdrain                = tcdrain;
exports.tcflush                = tcflush;
exports.tcflow                 = tcflow;
exports.setsid                 = setsid;
/* Unix Not a pure module */

},{"./unix.js":"stdlib/unix"}],"stdlib/unix":[function(require,module,exports){
'use strict';

var Sys                     = require("./sys.js");
var List                    = require("./list.js");
var $$Array                 = require("./array.js");
var Block                   = require("./block.js");
var Curry                   = require("./curry.js");
var Js_exn                  = require("./js_exn.js");
var Printf                  = require("./printf.js");
var Caml_io                 = require("./caml_io.js");
var Hashtbl                 = require("./hashtbl.js");
var Callback                = require("./callback.js");
var Caml_sys                = require("./caml_sys.js");
var Printexc                = require("./printexc.js");
var Caml_array              = require("./caml_array.js");
var Pervasives              = require("./pervasives.js");
var Caml_format             = require("./caml_format.js");
var Caml_string             = require("./caml_string.js");
var Caml_exceptions         = require("./caml_exceptions.js");
var Caml_missing_polyfill   = require("./caml_missing_polyfill.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

var Unix_error = Caml_exceptions.create("Unix.Unix_error");

Callback.register_exception("Unix.Unix_error", [
      Unix_error,
      /* E2BIG */0,
      "",
      ""
    ]);

Printexc.register_printer((function (param) {
        if (param[0] === Unix_error) {
          var e = param[1];
          var msg;
          if (typeof e === "number") {
            switch (e) {
              case 0 : 
                  msg = "E2BIG";
                  break;
              case 1 : 
                  msg = "EACCES";
                  break;
              case 2 : 
                  msg = "EAGAIN";
                  break;
              case 3 : 
                  msg = "EBADF";
                  break;
              case 4 : 
                  msg = "EBUSY";
                  break;
              case 5 : 
                  msg = "ECHILD";
                  break;
              case 6 : 
                  msg = "EDEADLK";
                  break;
              case 7 : 
                  msg = "EDOM";
                  break;
              case 8 : 
                  msg = "EEXIST";
                  break;
              case 9 : 
                  msg = "EFAULT";
                  break;
              case 10 : 
                  msg = "EFBIG";
                  break;
              case 11 : 
                  msg = "EINTR";
                  break;
              case 12 : 
                  msg = "EINVAL";
                  break;
              case 13 : 
                  msg = "EIO";
                  break;
              case 14 : 
                  msg = "EISDIR";
                  break;
              case 15 : 
                  msg = "EMFILE";
                  break;
              case 16 : 
                  msg = "EMLINK";
                  break;
              case 17 : 
                  msg = "ENAMETOOLONG";
                  break;
              case 18 : 
                  msg = "ENFILE";
                  break;
              case 19 : 
                  msg = "ENODEV";
                  break;
              case 20 : 
                  msg = "ENOENT";
                  break;
              case 21 : 
                  msg = "ENOEXEC";
                  break;
              case 22 : 
                  msg = "ENOLCK";
                  break;
              case 23 : 
                  msg = "ENOMEM";
                  break;
              case 24 : 
                  msg = "ENOSPC";
                  break;
              case 25 : 
                  msg = "ENOSYS";
                  break;
              case 26 : 
                  msg = "ENOTDIR";
                  break;
              case 27 : 
                  msg = "ENOTEMPTY";
                  break;
              case 28 : 
                  msg = "ENOTTY";
                  break;
              case 29 : 
                  msg = "ENXIO";
                  break;
              case 30 : 
                  msg = "EPERM";
                  break;
              case 31 : 
                  msg = "EPIPE";
                  break;
              case 32 : 
                  msg = "ERANGE";
                  break;
              case 33 : 
                  msg = "EROFS";
                  break;
              case 34 : 
                  msg = "ESPIPE";
                  break;
              case 35 : 
                  msg = "ESRCH";
                  break;
              case 36 : 
                  msg = "EXDEV";
                  break;
              case 37 : 
                  msg = "EWOULDBLOCK";
                  break;
              case 38 : 
                  msg = "EINPROGRESS";
                  break;
              case 39 : 
                  msg = "EALREADY";
                  break;
              case 40 : 
                  msg = "ENOTSOCK";
                  break;
              case 41 : 
                  msg = "EDESTADDRREQ";
                  break;
              case 42 : 
                  msg = "EMSGSIZE";
                  break;
              case 43 : 
                  msg = "EPROTOTYPE";
                  break;
              case 44 : 
                  msg = "ENOPROTOOPT";
                  break;
              case 45 : 
                  msg = "EPROTONOSUPPORT";
                  break;
              case 46 : 
                  msg = "ESOCKTNOSUPPORT";
                  break;
              case 47 : 
                  msg = "EOPNOTSUPP";
                  break;
              case 48 : 
                  msg = "EPFNOSUPPORT";
                  break;
              case 49 : 
                  msg = "EAFNOSUPPORT";
                  break;
              case 50 : 
                  msg = "EADDRINUSE";
                  break;
              case 51 : 
                  msg = "EADDRNOTAVAIL";
                  break;
              case 52 : 
                  msg = "ENETDOWN";
                  break;
              case 53 : 
                  msg = "ENETUNREACH";
                  break;
              case 54 : 
                  msg = "ENETRESET";
                  break;
              case 55 : 
                  msg = "ECONNABORTED";
                  break;
              case 56 : 
                  msg = "ECONNRESET";
                  break;
              case 57 : 
                  msg = "ENOBUFS";
                  break;
              case 58 : 
                  msg = "EISCONN";
                  break;
              case 59 : 
                  msg = "ENOTCONN";
                  break;
              case 60 : 
                  msg = "ESHUTDOWN";
                  break;
              case 61 : 
                  msg = "ETOOMANYREFS";
                  break;
              case 62 : 
                  msg = "ETIMEDOUT";
                  break;
              case 63 : 
                  msg = "ECONNREFUSED";
                  break;
              case 64 : 
                  msg = "EHOSTDOWN";
                  break;
              case 65 : 
                  msg = "EHOSTUNREACH";
                  break;
              case 66 : 
                  msg = "ELOOP";
                  break;
              case 67 : 
                  msg = "EOVERFLOW";
                  break;
              
            }
          } else {
            msg = Curry._1(Printf.sprintf(/* Format */[
                      /* String_literal */Block.__(11, [
                          "EUNKNOWNERR ",
                          /* Int */Block.__(4, [
                              /* Int_d */0,
                              /* No_padding */0,
                              /* No_precision */0,
                              /* End_of_format */0
                            ])
                        ]),
                      "EUNKNOWNERR %d"
                    ]), e[0]);
          }
          return /* Some */[Curry._3(Printf.sprintf(/* Format */[
                            /* String_literal */Block.__(11, [
                                "Unix.Unix_error(Unix.",
                                /* String */Block.__(2, [
                                    /* No_padding */0,
                                    /* String_literal */Block.__(11, [
                                        ", ",
                                        /* Caml_string */Block.__(3, [
                                            /* No_padding */0,
                                            /* String_literal */Block.__(11, [
                                                ", ",
                                                /* Caml_string */Block.__(3, [
                                                    /* No_padding */0,
                                                    /* Char_literal */Block.__(12, [
                                                        /* ")" */41,
                                                        /* End_of_format */0
                                                      ])
                                                  ])
                                              ])
                                          ])
                                      ])
                                  ])
                              ]),
                            "Unix.Unix_error(Unix.%s, %S, %S)"
                          ]), msg, param[2], param[3])];
        } else {
          return /* None */0;
        }
      }));

function handle_unix_error(f, arg) {
  try {
    return Curry._1(f, arg);
  }
  catch (raw_exn){
    var exn = Js_exn.internalToOCamlException(raw_exn);
    if (exn[0] === Unix_error) {
      var arg$1 = exn[3];
      Pervasives.prerr_string(Caml_array.caml_array_get(Sys.argv, 0));
      Pervasives.prerr_string(": \"");
      Pervasives.prerr_string(exn[2]);
      Pervasives.prerr_string("\" failed");
      if (arg$1.length) {
        Pervasives.prerr_string(" on \"");
        Pervasives.prerr_string(arg$1);
        Pervasives.prerr_string("\"");
      }
      Pervasives.prerr_string(": ");
      console.error(Caml_missing_polyfill.not_implemented("unix_error_message not implemented by bucklescript yet\n"));
      return Pervasives.exit(2);
    } else {
      throw exn;
    }
  }
}

function read(_, buf, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (buf.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Unix.read"
        ];
  } else {
    return Caml_missing_polyfill.not_implemented("unix_read not implemented by bucklescript yet\n");
  }
}

function write(_, buf, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (buf.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Unix.write"
        ];
  } else {
    return Caml_missing_polyfill.not_implemented("unix_write not implemented by bucklescript yet\n");
  }
}

function single_write(_, buf, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (buf.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Unix.single_write"
        ];
  } else {
    return Caml_missing_polyfill.not_implemented("unix_single_write not implemented by bucklescript yet\n");
  }
}

function write_substring(fd, buf, ofs, len) {
  return write(fd, Caml_string.bytes_of_string(buf), ofs, len);
}

function single_write_substring(fd, buf, ofs, len) {
  return single_write(fd, Caml_string.bytes_of_string(buf), ofs, len);
}

function try_set_close_on_exec() {
  try {
    Caml_missing_polyfill.not_implemented("unix_set_close_on_exec not implemented by bucklescript yet\n");
    return /* true */1;
  }
  catch (raw_exn){
    var exn = Js_exn.internalToOCamlException(raw_exn);
    if (exn[0] === Caml_builtin_exceptions.invalid_argument) {
      return /* false */0;
    } else {
      throw exn;
    }
  }
}

function pause() {
  return Caml_missing_polyfill.not_implemented("unix_sigsuspend not implemented by bucklescript yet\n");
}

var inet_addr_any = Caml_missing_polyfill.not_implemented("unix_inet_addr_of_string not implemented by bucklescript yet\n");

var inet_addr_loopback = Caml_missing_polyfill.not_implemented("unix_inet_addr_of_string not implemented by bucklescript yet\n");

var inet6_addr_any;

try {
  inet6_addr_any = Caml_missing_polyfill.not_implemented("unix_inet_addr_of_string not implemented by bucklescript yet\n");
}
catch (raw_exn){
  var exn = Js_exn.internalToOCamlException(raw_exn);
  if (exn[0] === Caml_builtin_exceptions.failure) {
    inet6_addr_any = inet_addr_any;
  } else {
    throw exn;
  }
}

var inet6_addr_loopback;

try {
  inet6_addr_loopback = Caml_missing_polyfill.not_implemented("unix_inet_addr_of_string not implemented by bucklescript yet\n");
}
catch (raw_exn$1){
  var exn$1 = Js_exn.internalToOCamlException(raw_exn$1);
  if (exn$1[0] === Caml_builtin_exceptions.failure) {
    inet6_addr_loopback = inet_addr_loopback;
  } else {
    throw exn$1;
  }
}

function domain_of_sockaddr(param) {
  if (param.tag) {
    if (param[0].length === 16) {
      return /* PF_INET6 */2;
    } else {
      return /* PF_INET */1;
    }
  } else {
    return /* PF_UNIX */0;
  }
}

function recv(_, buf, ofs, len, _$1) {
  if (ofs < 0 || len < 0 || ofs > (buf.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Unix.recv"
        ];
  } else {
    return Caml_missing_polyfill.not_implemented("unix_recv not implemented by bucklescript yet\n");
  }
}

function recvfrom(_, buf, ofs, len, _$1) {
  if (ofs < 0 || len < 0 || ofs > (buf.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Unix.recvfrom"
        ];
  } else {
    return Caml_missing_polyfill.not_implemented("unix_recvfrom not implemented by bucklescript yet\n");
  }
}

function send(_, buf, ofs, len, _$1) {
  if (ofs < 0 || len < 0 || ofs > (buf.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Unix.send"
        ];
  } else {
    return Caml_missing_polyfill.not_implemented("unix_send not implemented by bucklescript yet\n");
  }
}

function sendto(_, buf, ofs, len, _$1, _$2) {
  if (ofs < 0 || len < 0 || ofs > (buf.length - len | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Unix.sendto"
        ];
  } else {
    return Caml_missing_polyfill.not_implemented("unix_sendto not implemented by bucklescript yet\n");
  }
}

function send_substring(fd, buf, ofs, len, flags) {
  return send(fd, Caml_string.bytes_of_string(buf), ofs, len, flags);
}

function sendto_substring(fd, buf, ofs, len, flags, addr) {
  return sendto(fd, Caml_string.bytes_of_string(buf), ofs, len, flags, addr);
}

function SO_005(_, _$1, _$2) {
  return Caml_missing_polyfill.not_implemented("unix_getsockopt not implemented by bucklescript yet\n");
}

function SO_006(_, _$1, _$2, _$3) {
  return Caml_missing_polyfill.not_implemented("unix_setsockopt not implemented by bucklescript yet\n");
}

function getsockopt(fd, opt) {
  return Curry._3(SO_005, 0, fd, opt);
}

function setsockopt(fd, opt, v) {
  return Curry._4(SO_006, 0, fd, opt, v);
}

function getsockopt_int(fd, opt) {
  return Curry._3(SO_005, 1, fd, opt);
}

function setsockopt_int(fd, opt, v) {
  return Curry._4(SO_006, 1, fd, opt, v);
}

function getsockopt_optint(fd, opt) {
  return Curry._3(SO_005, 2, fd, opt);
}

function setsockopt_optint(fd, opt, v) {
  return Curry._4(SO_006, 2, fd, opt, v);
}

function getsockopt_float(fd, opt) {
  return Curry._3(SO_005, 3, fd, opt);
}

function setsockopt_float(fd, opt, v) {
  return Curry._4(SO_006, 3, fd, opt, v);
}

function getsockopt_error(fd) {
  return Curry._3(SO_005, 4, fd, /* SO_ERROR */0);
}

function getaddrinfo(node, service, opts) {
  try {
    return List.rev(Caml_missing_polyfill.not_implemented("unix_getaddrinfo not implemented by bucklescript yet\n"));
  }
  catch (raw_exn){
    var exn = Js_exn.internalToOCamlException(raw_exn);
    if (exn[0] === Caml_builtin_exceptions.invalid_argument) {
      var node$1 = node;
      var service$1 = service;
      var opts$1 = opts;
      var opt_socktype = [/* None */0];
      var opt_protocol = [0];
      var opt_passive = [/* false */0];
      List.iter((function (param) {
              if (typeof param === "number") {
                if (param === 2) {
                  opt_passive[0] = /* true */1;
                  return /* () */0;
                } else {
                  return /* () */0;
                }
              } else {
                switch (param.tag | 0) {
                  case 1 : 
                      opt_socktype[0] = /* Some */[param[0]];
                      return /* () */0;
                  case 2 : 
                      opt_protocol[0] = param[0];
                      return /* () */0;
                  default:
                    return /* () */0;
                }
              }
            }), opts$1);
      var get_port = function (ty, _) {
        if (service$1 === "") {
          return /* :: */[
                  /* tuple */[
                    ty,
                    0
                  ],
                  /* [] */0
                ];
        } else {
          try {
            return /* :: */[
                    /* tuple */[
                      ty,
                      Caml_format.caml_int_of_string(service$1)
                    ],
                    /* [] */0
                  ];
          }
          catch (raw_exn){
            var exn = Js_exn.internalToOCamlException(raw_exn);
            if (exn[0] === Caml_builtin_exceptions.failure) {
              try {
                return /* :: */[
                        /* tuple */[
                          ty,
                          Caml_missing_polyfill.not_implemented("unix_getservbyname not implemented by bucklescript yet\n")[/* s_port */2]
                        ],
                        /* [] */0
                      ];
              }
              catch (exn$1){
                if (exn$1 === Caml_builtin_exceptions.not_found) {
                  return /* [] */0;
                } else {
                  throw exn$1;
                }
              }
            } else {
              throw exn;
            }
          }
        }
      };
      var match = opt_socktype[0];
      var ports;
      if (match) {
        var ty = match[0];
        ports = ty !== 1 ? (
            ty !== 0 ? (
                service$1 === "" ? /* :: */[
                    /* tuple */[
                      ty,
                      0
                    ],
                    /* [] */0
                  ] : /* [] */0
              ) : get_port(/* SOCK_STREAM */0, "tcp")
          ) : get_port(/* SOCK_DGRAM */1, "udp");
      } else {
        ports = Pervasives.$at(get_port(/* SOCK_STREAM */0, "tcp"), get_port(/* SOCK_DGRAM */1, "udp"));
      }
      var addresses;
      if (node$1 === "") {
        addresses = List.mem(/* AI_PASSIVE */2, opts$1) ? /* :: */[
            /* tuple */[
              inet_addr_any,
              "0.0.0.0"
            ],
            /* [] */0
          ] : /* :: */[
            /* tuple */[
              inet_addr_loopback,
              "127.0.0.1"
            ],
            /* [] */0
          ];
      } else {
        try {
          addresses = /* :: */[
            /* tuple */[
              Caml_missing_polyfill.not_implemented("unix_inet_addr_of_string not implemented by bucklescript yet\n"),
              node$1
            ],
            /* [] */0
          ];
        }
        catch (raw_exn$1){
          var exn$1 = Js_exn.internalToOCamlException(raw_exn$1);
          if (exn$1[0] === Caml_builtin_exceptions.failure) {
            try {
              var he = Caml_missing_polyfill.not_implemented("unix_gethostbyname not implemented by bucklescript yet\n");
              addresses = List.map((function (a) {
                      return /* tuple */[
                              a,
                              he[/* h_name */0]
                            ];
                    }), $$Array.to_list(he[/* h_addr_list */3]));
            }
            catch (exn$2){
              if (exn$2 === Caml_builtin_exceptions.not_found) {
                addresses = /* [] */0;
              } else {
                throw exn$2;
              }
            }
          } else {
            throw exn$1;
          }
        }
      }
      return List.flatten(List.map((function (param) {
                        var port = param[1];
                        var ty = param[0];
                        return List.map((function (param) {
                                      return /* record */[
                                              /* ai_family : PF_INET */1,
                                              /* ai_socktype */ty,
                                              /* ai_protocol */opt_protocol[0],
                                              /* ai_addr : ADDR_INET */Block.__(1, [
                                                  param[0],
                                                  port
                                                ]),
                                              /* ai_canonname */param[1]
                                            ];
                                    }), addresses);
                      }), ports));
    } else {
      throw exn;
    }
  }
}

function getnameinfo(addr, opts) {
  try {
    return Caml_missing_polyfill.not_implemented("unix_getnameinfo not implemented by bucklescript yet\n");
  }
  catch (raw_exn){
    var exn = Js_exn.internalToOCamlException(raw_exn);
    if (exn[0] === Caml_builtin_exceptions.invalid_argument) {
      var addr$1 = addr;
      var opts$1 = opts;
      if (addr$1.tag) {
        var p = addr$1[1];
        var hostname;
        try {
          if (List.mem(/* NI_NUMERICHOST */1, opts$1)) {
            throw Caml_builtin_exceptions.not_found;
          }
          hostname = Caml_missing_polyfill.not_implemented("unix_gethostbyaddr not implemented by bucklescript yet\n")[/* h_name */0];
        }
        catch (exn$1){
          if (exn$1 === Caml_builtin_exceptions.not_found) {
            if (List.mem(/* NI_NAMEREQD */2, opts$1)) {
              throw Caml_builtin_exceptions.not_found;
            }
            hostname = Caml_missing_polyfill.not_implemented("unix_string_of_inet_addr not implemented by bucklescript yet\n");
          } else {
            throw exn$1;
          }
        }
        var service;
        try {
          if (List.mem(/* NI_NUMERICSERV */3, opts$1)) {
            throw Caml_builtin_exceptions.not_found;
          }
          List.mem(/* NI_DGRAM */4, opts$1) ? "udp" : "tcp";
          service = Caml_missing_polyfill.not_implemented("unix_getservbyport not implemented by bucklescript yet\n")[/* s_name */0];
        }
        catch (exn$2){
          if (exn$2 === Caml_builtin_exceptions.not_found) {
            service = "" + p;
          } else {
            throw exn$2;
          }
        }
        return /* record */[
                /* ni_hostname */hostname,
                /* ni_service */service
              ];
      } else {
        return /* record */[
                /* ni_hostname */"",
                /* ni_service */addr$1[0]
              ];
      }
    } else {
      throw exn;
    }
  }
}

function waitpid_non_intr() {
  while(true) {
    try {
      return Caml_missing_polyfill.not_implemented("unix_waitpid not implemented by bucklescript yet\n");
    }
    catch (raw_exn){
      var exn = Js_exn.internalToOCamlException(raw_exn);
      if (exn[0] === Unix_error) {
        var match = exn[1];
        if (typeof match === "number") {
          if (match !== 11) {
            throw exn;
          } else {
            continue ;
            
          }
        } else {
          throw exn;
        }
      } else {
        throw exn;
      }
    }
  };
}

function system() {
  var id = Caml_missing_polyfill.not_implemented("unix_fork not implemented by bucklescript yet\n");
  if (id !== 0) {
    return waitpid_non_intr(id)[1];
  } else {
    try {
      return Caml_missing_polyfill.not_implemented("unix_execv not implemented by bucklescript yet\n");
    }
    catch (exn){
      return Pervasives.exit(127);
    }
  }
}

function safe_dup(fd) {
  var new_fd = Caml_missing_polyfill.not_implemented("unix_dup not implemented by bucklescript yet\n");
  if (new_fd >= 3) {
    return new_fd;
  } else {
    var res = safe_dup(fd);
    Caml_missing_polyfill.not_implemented("unix_close not implemented by bucklescript yet\n");
    return res;
  }
}

function safe_close() {
  try {
    return Caml_missing_polyfill.not_implemented("unix_close not implemented by bucklescript yet\n");
  }
  catch (raw_exn){
    var exn = Js_exn.internalToOCamlException(raw_exn);
    if (exn[0] === Unix_error) {
      return /* () */0;
    } else {
      throw exn;
    }
  }
}

function perform_redirections(new_stdin, new_stdout, new_stderr) {
  safe_dup(new_stdin);
  safe_dup(new_stdout);
  safe_dup(new_stderr);
  safe_close(new_stdin);
  safe_close(new_stdout);
  safe_close(new_stderr);
  Caml_missing_polyfill.not_implemented("unix_dup2 not implemented by bucklescript yet\n");
  Caml_missing_polyfill.not_implemented("unix_close not implemented by bucklescript yet\n");
  Caml_missing_polyfill.not_implemented("unix_dup2 not implemented by bucklescript yet\n");
  Caml_missing_polyfill.not_implemented("unix_close not implemented by bucklescript yet\n");
  Caml_missing_polyfill.not_implemented("unix_dup2 not implemented by bucklescript yet\n");
  return Caml_missing_polyfill.not_implemented("unix_close not implemented by bucklescript yet\n");
}

function create_process(_, _$1, new_stdin, new_stdout, new_stderr) {
  var id = Caml_missing_polyfill.not_implemented("unix_fork not implemented by bucklescript yet\n");
  if (id !== 0) {
    return id;
  } else {
    try {
      perform_redirections(new_stdin, new_stdout, new_stderr);
      return Caml_missing_polyfill.not_implemented("unix_execvp not implemented by bucklescript yet\n");
    }
    catch (exn){
      return Pervasives.exit(127);
    }
  }
}

function create_process_env(_, _$1, _$2, new_stdin, new_stdout, new_stderr) {
  var id = Caml_missing_polyfill.not_implemented("unix_fork not implemented by bucklescript yet\n");
  if (id !== 0) {
    return id;
  } else {
    try {
      perform_redirections(new_stdin, new_stdout, new_stderr);
      return Caml_missing_polyfill.not_implemented("unix_execvpe not implemented by bucklescript yet\n");
    }
    catch (exn){
      return Pervasives.exit(127);
    }
  }
}

var popen_processes = Hashtbl.create(/* None */0, 7);

function open_proc(_, proc, input, output, toclose) {
  var cloexec = List.for_all(try_set_close_on_exec, toclose);
  var id = Caml_missing_polyfill.not_implemented("unix_fork not implemented by bucklescript yet\n");
  if (id !== 0) {
    return Hashtbl.add(popen_processes, proc, id);
  } else {
    if (input !== 0) {
      Caml_missing_polyfill.not_implemented("unix_dup2 not implemented by bucklescript yet\n");
      Caml_missing_polyfill.not_implemented("unix_close not implemented by bucklescript yet\n");
    }
    if (output !== 1) {
      Caml_missing_polyfill.not_implemented("unix_dup2 not implemented by bucklescript yet\n");
      Caml_missing_polyfill.not_implemented("unix_close not implemented by bucklescript yet\n");
    }
    if (!cloexec) {
      List.iter((function () {
              return Caml_missing_polyfill.not_implemented("unix_close not implemented by bucklescript yet\n");
            }), toclose);
    }
    try {
      return Caml_missing_polyfill.not_implemented("unix_execv not implemented by bucklescript yet\n");
    }
    catch (exn){
      return Pervasives.exit(127);
    }
  }
}

function open_process_in(cmd) {
  var match = Caml_missing_polyfill.not_implemented("unix_pipe not implemented by bucklescript yet\n");
  var in_write = match[1];
  var in_read = match[0];
  var inchan = Caml_io.caml_ml_open_descriptor_in(in_read);
  try {
    open_proc(cmd, /* Process_in */Block.__(1, [inchan]), 0, in_write, /* :: */[
          in_read,
          /* [] */0
        ]);
  }
  catch (e){
    Caml_missing_polyfill.not_implemented("caml_ml_close_channel not implemented by bucklescript yet\n");
    Caml_missing_polyfill.not_implemented("unix_close not implemented by bucklescript yet\n");
    throw e;
  }
  Caml_missing_polyfill.not_implemented("unix_close not implemented by bucklescript yet\n");
  return inchan;
}

function open_process_out(cmd) {
  var match = Caml_missing_polyfill.not_implemented("unix_pipe not implemented by bucklescript yet\n");
  var out_write = match[1];
  var out_read = match[0];
  var outchan = Caml_io.caml_ml_open_descriptor_out(out_write);
  try {
    open_proc(cmd, /* Process_out */Block.__(2, [outchan]), out_read, 1, /* :: */[
          out_write,
          /* [] */0
        ]);
  }
  catch (e){
    Caml_io.caml_ml_flush(outchan);
    Caml_missing_polyfill.not_implemented("caml_ml_close_channel not implemented by bucklescript yet\n");
    Caml_missing_polyfill.not_implemented("unix_close not implemented by bucklescript yet\n");
    throw e;
  }
  Caml_missing_polyfill.not_implemented("unix_close not implemented by bucklescript yet\n");
  return outchan;
}

function open_process(cmd) {
  var match = Caml_missing_polyfill.not_implemented("unix_pipe not implemented by bucklescript yet\n");
  var in_write = match[1];
  var in_read = match[0];
  var fds_to_close = /* :: */[
    in_read,
    /* :: */[
      in_write,
      /* [] */0
    ]
  ];
  try {
    var match$1 = Caml_missing_polyfill.not_implemented("unix_pipe not implemented by bucklescript yet\n");
    var out_write = match$1[1];
    var out_read = match$1[0];
    fds_to_close = /* :: */[
      in_read,
      /* :: */[
        in_write,
        /* :: */[
          out_read,
          /* :: */[
            out_write,
            /* [] */0
          ]
        ]
      ]
    ];
    var inchan = Caml_io.caml_ml_open_descriptor_in(in_read);
    var outchan = Caml_io.caml_ml_open_descriptor_out(out_write);
    open_proc(cmd, /* Process */Block.__(0, [
            inchan,
            outchan
          ]), out_read, in_write, /* :: */[
          in_read,
          /* :: */[
            out_write,
            /* [] */0
          ]
        ]);
    Caml_missing_polyfill.not_implemented("unix_close not implemented by bucklescript yet\n");
    Caml_missing_polyfill.not_implemented("unix_close not implemented by bucklescript yet\n");
    return /* tuple */[
            inchan,
            outchan
          ];
  }
  catch (e){
    List.iter((function () {
            return Caml_missing_polyfill.not_implemented("unix_close not implemented by bucklescript yet\n");
          }), fds_to_close);
    throw e;
  }
}

function open_proc_full(_, _$1, proc, _$2, _$3, _$4, toclose) {
  var cloexec = List.for_all(try_set_close_on_exec, toclose);
  var id = Caml_missing_polyfill.not_implemented("unix_fork not implemented by bucklescript yet\n");
  if (id !== 0) {
    return Hashtbl.add(popen_processes, proc, id);
  } else {
    Caml_missing_polyfill.not_implemented("unix_dup2 not implemented by bucklescript yet\n");
    Caml_missing_polyfill.not_implemented("unix_close not implemented by bucklescript yet\n");
    Caml_missing_polyfill.not_implemented("unix_dup2 not implemented by bucklescript yet\n");
    Caml_missing_polyfill.not_implemented("unix_close not implemented by bucklescript yet\n");
    Caml_missing_polyfill.not_implemented("unix_dup2 not implemented by bucklescript yet\n");
    Caml_missing_polyfill.not_implemented("unix_close not implemented by bucklescript yet\n");
    if (!cloexec) {
      List.iter((function () {
              return Caml_missing_polyfill.not_implemented("unix_close not implemented by bucklescript yet\n");
            }), toclose);
    }
    try {
      return Caml_missing_polyfill.not_implemented("unix_execve not implemented by bucklescript yet\n");
    }
    catch (exn){
      return Pervasives.exit(127);
    }
  }
}

function open_process_full(cmd, env) {
  var match = Caml_missing_polyfill.not_implemented("unix_pipe not implemented by bucklescript yet\n");
  var in_write = match[1];
  var in_read = match[0];
  var fds_to_close = /* :: */[
    in_read,
    /* :: */[
      in_write,
      /* [] */0
    ]
  ];
  try {
    var match$1 = Caml_missing_polyfill.not_implemented("unix_pipe not implemented by bucklescript yet\n");
    var out_write = match$1[1];
    var out_read = match$1[0];
    fds_to_close = /* :: */[
      out_read,
      /* :: */[
        out_write,
        fds_to_close
      ]
    ];
    var match$2 = Caml_missing_polyfill.not_implemented("unix_pipe not implemented by bucklescript yet\n");
    var err_write = match$2[1];
    var err_read = match$2[0];
    fds_to_close = /* :: */[
      err_read,
      /* :: */[
        err_write,
        fds_to_close
      ]
    ];
    var inchan = Caml_io.caml_ml_open_descriptor_in(in_read);
    var outchan = Caml_io.caml_ml_open_descriptor_out(out_write);
    var errchan = Caml_io.caml_ml_open_descriptor_in(err_read);
    open_proc_full(cmd, env, /* Process_full */Block.__(3, [
            inchan,
            outchan,
            errchan
          ]), out_read, in_write, err_write, /* :: */[
          in_read,
          /* :: */[
            out_write,
            /* :: */[
              err_read,
              /* [] */0
            ]
          ]
        ]);
    Caml_missing_polyfill.not_implemented("unix_close not implemented by bucklescript yet\n");
    Caml_missing_polyfill.not_implemented("unix_close not implemented by bucklescript yet\n");
    Caml_missing_polyfill.not_implemented("unix_close not implemented by bucklescript yet\n");
    return /* tuple */[
            inchan,
            outchan,
            errchan
          ];
  }
  catch (e){
    List.iter((function () {
            return Caml_missing_polyfill.not_implemented("unix_close not implemented by bucklescript yet\n");
          }), fds_to_close);
    throw e;
  }
}

function find_proc_id(fun_name, proc) {
  try {
    var pid = Hashtbl.find(popen_processes, proc);
    Hashtbl.remove(popen_processes, proc);
    return pid;
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      throw [
            Unix_error,
            /* EBADF */3,
            fun_name,
            ""
          ];
    } else {
      throw exn;
    }
  }
}

function close_process_in(inchan) {
  var pid = find_proc_id("close_process_in", /* Process_in */Block.__(1, [inchan]));
  Caml_missing_polyfill.not_implemented("caml_ml_close_channel not implemented by bucklescript yet\n");
  return waitpid_non_intr(pid)[1];
}

function close_process_out(outchan) {
  var pid = find_proc_id("close_process_out", /* Process_out */Block.__(2, [outchan]));
  Caml_io.caml_ml_flush(outchan);
  Caml_missing_polyfill.not_implemented("caml_ml_close_channel not implemented by bucklescript yet\n");
  return waitpid_non_intr(pid)[1];
}

function close_process(param) {
  var outchan = param[1];
  var inchan = param[0];
  var pid = find_proc_id("close_process", /* Process */Block.__(0, [
          inchan,
          outchan
        ]));
  Caml_missing_polyfill.not_implemented("caml_ml_close_channel not implemented by bucklescript yet\n");
  try {
    Caml_io.caml_ml_flush(outchan);
    Caml_missing_polyfill.not_implemented("caml_ml_close_channel not implemented by bucklescript yet\n");
  }
  catch (raw_exn){
    var exn = Js_exn.internalToOCamlException(raw_exn);
    if (exn[0] !== Caml_builtin_exceptions.sys_error) {
      throw exn;
    }
    
  }
  return waitpid_non_intr(pid)[1];
}

function close_process_full(param) {
  var errchan = param[2];
  var outchan = param[1];
  var inchan = param[0];
  var pid = find_proc_id("close_process_full", /* Process_full */Block.__(3, [
          inchan,
          outchan,
          errchan
        ]));
  Caml_missing_polyfill.not_implemented("caml_ml_close_channel not implemented by bucklescript yet\n");
  try {
    Caml_io.caml_ml_flush(outchan);
    Caml_missing_polyfill.not_implemented("caml_ml_close_channel not implemented by bucklescript yet\n");
  }
  catch (raw_exn){
    var exn = Js_exn.internalToOCamlException(raw_exn);
    if (exn[0] !== Caml_builtin_exceptions.sys_error) {
      throw exn;
    }
    
  }
  Caml_missing_polyfill.not_implemented("caml_ml_close_channel not implemented by bucklescript yet\n");
  return waitpid_non_intr(pid)[1];
}

function open_connection() {
  var sock = Caml_missing_polyfill.not_implemented("unix_socket not implemented by bucklescript yet\n");
  try {
    Caml_missing_polyfill.not_implemented("unix_connect not implemented by bucklescript yet\n");
    try_set_close_on_exec(sock);
    return /* tuple */[
            Caml_io.caml_ml_open_descriptor_in(sock),
            Caml_io.caml_ml_open_descriptor_out(sock)
          ];
  }
  catch (exn){
    Caml_missing_polyfill.not_implemented("unix_close not implemented by bucklescript yet\n");
    throw exn;
  }
}

function shutdown_connection() {
  return Caml_missing_polyfill.not_implemented("unix_shutdown not implemented by bucklescript yet\n");
}

function accept_non_intr() {
  while(true) {
    try {
      return Caml_missing_polyfill.not_implemented("unix_accept not implemented by bucklescript yet\n");
    }
    catch (raw_exn){
      var exn = Js_exn.internalToOCamlException(raw_exn);
      if (exn[0] === Unix_error) {
        var match = exn[1];
        if (typeof match === "number") {
          if (match !== 11) {
            throw exn;
          } else {
            continue ;
            
          }
        } else {
          throw exn;
        }
      } else {
        throw exn;
      }
    }
  };
}

function establish_server(server_fun, _) {
  var sock = Caml_missing_polyfill.not_implemented("unix_socket not implemented by bucklescript yet\n");
  setsockopt(sock, /* SO_REUSEADDR */2, /* true */1);
  Caml_missing_polyfill.not_implemented("unix_bind not implemented by bucklescript yet\n");
  Caml_missing_polyfill.not_implemented("unix_listen not implemented by bucklescript yet\n");
  while(true) {
    var match = accept_non_intr(sock);
    var s = match[0];
    var id = Caml_missing_polyfill.not_implemented("unix_fork not implemented by bucklescript yet\n");
    if (id !== 0) {
      Caml_missing_polyfill.not_implemented("unix_close not implemented by bucklescript yet\n");
      waitpid_non_intr(id);
    } else {
      if (Caml_missing_polyfill.not_implemented("unix_fork not implemented by bucklescript yet\n") !== 0) {
        Pervasives.exit(0);
      }
      Caml_missing_polyfill.not_implemented("unix_close not implemented by bucklescript yet\n");
      try_set_close_on_exec(s);
      var inchan = Caml_io.caml_ml_open_descriptor_in(s);
      var outchan = Caml_io.caml_ml_open_descriptor_out(s);
      Curry._2(server_fun, inchan, outchan);
      Pervasives.exit(0);
    }
  };
  return /* () */0;
}

function error_message() {
  return Caml_missing_polyfill.not_implemented("unix_error_message not implemented by bucklescript yet\n");
}

function environment() {
  return Caml_missing_polyfill.not_implemented("unix_environment not implemented by bucklescript yet\n");
}

var getenv = Caml_sys.caml_sys_getenv;

function putenv(_, _$1) {
  return Caml_missing_polyfill.not_implemented("unix_putenv not implemented by bucklescript yet\n");
}

function execv(_, _$1) {
  return Caml_missing_polyfill.not_implemented("unix_execv not implemented by bucklescript yet\n");
}

function execve(_, _$1, _$2) {
  return Caml_missing_polyfill.not_implemented("unix_execve not implemented by bucklescript yet\n");
}

function execvp(_, _$1) {
  return Caml_missing_polyfill.not_implemented("unix_execvp not implemented by bucklescript yet\n");
}

function execvpe(_, _$1, _$2) {
  return Caml_missing_polyfill.not_implemented("unix_execvpe not implemented by bucklescript yet\n");
}

function fork() {
  return Caml_missing_polyfill.not_implemented("unix_fork not implemented by bucklescript yet\n");
}

function wait() {
  return Caml_missing_polyfill.not_implemented("unix_wait not implemented by bucklescript yet\n");
}

function waitpid(_, _$1) {
  return Caml_missing_polyfill.not_implemented("unix_waitpid not implemented by bucklescript yet\n");
}

function getpid() {
  return Caml_missing_polyfill.not_implemented("unix_getpid not implemented by bucklescript yet\n");
}

function getppid() {
  return Caml_missing_polyfill.not_implemented("unix_getppid not implemented by bucklescript yet\n");
}

function nice() {
  return Caml_missing_polyfill.not_implemented("unix_nice not implemented by bucklescript yet\n");
}

var stdin = 0;

var stdout = 1;

var stderr = 2;

function openfile(_, _$1, _$2) {
  return Caml_missing_polyfill.not_implemented("unix_open not implemented by bucklescript yet\n");
}

function close() {
  return Caml_missing_polyfill.not_implemented("unix_close not implemented by bucklescript yet\n");
}

var in_channel_of_descr = Caml_io.caml_ml_open_descriptor_in;

var out_channel_of_descr = Caml_io.caml_ml_open_descriptor_out;

function descr_of_in_channel() {
  return Caml_missing_polyfill.not_implemented("caml_channel_descriptor not implemented by bucklescript yet\n");
}

function descr_of_out_channel() {
  return Caml_missing_polyfill.not_implemented("caml_channel_descriptor not implemented by bucklescript yet\n");
}

function lseek(_, _$1, _$2) {
  return Caml_missing_polyfill.not_implemented("unix_lseek not implemented by bucklescript yet\n");
}

function truncate(_, _$1) {
  return Caml_missing_polyfill.not_implemented("unix_truncate not implemented by bucklescript yet\n");
}

function ftruncate(_, _$1) {
  return Caml_missing_polyfill.not_implemented("unix_ftruncate not implemented by bucklescript yet\n");
}

function stat() {
  return Caml_missing_polyfill.not_implemented("unix_stat not implemented by bucklescript yet\n");
}

function lstat() {
  return Caml_missing_polyfill.not_implemented("unix_lstat not implemented by bucklescript yet\n");
}

function fstat() {
  return Caml_missing_polyfill.not_implemented("unix_fstat not implemented by bucklescript yet\n");
}

function isatty() {
  return Caml_missing_polyfill.not_implemented("unix_isatty not implemented by bucklescript yet\n");
}

function LargeFile_000(_, _$1, _$2) {
  return Caml_missing_polyfill.not_implemented("unix_lseek_64 not implemented by bucklescript yet\n");
}

function LargeFile_001(_, _$1) {
  return Caml_missing_polyfill.not_implemented("unix_truncate_64 not implemented by bucklescript yet\n");
}

function LargeFile_002(_, _$1) {
  return Caml_missing_polyfill.not_implemented("unix_ftruncate_64 not implemented by bucklescript yet\n");
}

function LargeFile_003() {
  return Caml_missing_polyfill.not_implemented("unix_stat_64 not implemented by bucklescript yet\n");
}

function LargeFile_004() {
  return Caml_missing_polyfill.not_implemented("unix_lstat_64 not implemented by bucklescript yet\n");
}

function LargeFile_005() {
  return Caml_missing_polyfill.not_implemented("unix_fstat_64 not implemented by bucklescript yet\n");
}

var LargeFile = [
  LargeFile_000,
  LargeFile_001,
  LargeFile_002,
  LargeFile_003,
  LargeFile_004,
  LargeFile_005
];

function unlink() {
  return Caml_missing_polyfill.not_implemented("unix_unlink not implemented by bucklescript yet\n");
}

function rename(_, _$1) {
  return Caml_missing_polyfill.not_implemented("unix_rename not implemented by bucklescript yet\n");
}

function link(_, _$1) {
  return Caml_missing_polyfill.not_implemented("unix_link not implemented by bucklescript yet\n");
}

function chmod(_, _$1) {
  return Caml_missing_polyfill.not_implemented("unix_chmod not implemented by bucklescript yet\n");
}

function fchmod(_, _$1) {
  return Caml_missing_polyfill.not_implemented("unix_fchmod not implemented by bucklescript yet\n");
}

function chown(_, _$1, _$2) {
  return Caml_missing_polyfill.not_implemented("unix_chown not implemented by bucklescript yet\n");
}

function fchown(_, _$1, _$2) {
  return Caml_missing_polyfill.not_implemented("unix_fchown not implemented by bucklescript yet\n");
}

function umask() {
  return Caml_missing_polyfill.not_implemented("unix_umask not implemented by bucklescript yet\n");
}

function access(_, _$1) {
  return Caml_missing_polyfill.not_implemented("unix_access not implemented by bucklescript yet\n");
}

function dup() {
  return Caml_missing_polyfill.not_implemented("unix_dup not implemented by bucklescript yet\n");
}

function dup2(_, _$1) {
  return Caml_missing_polyfill.not_implemented("unix_dup2 not implemented by bucklescript yet\n");
}

function set_nonblock() {
  return Caml_missing_polyfill.not_implemented("unix_set_nonblock not implemented by bucklescript yet\n");
}

function clear_nonblock() {
  return Caml_missing_polyfill.not_implemented("unix_clear_nonblock not implemented by bucklescript yet\n");
}

function set_close_on_exec() {
  return Caml_missing_polyfill.not_implemented("unix_set_close_on_exec not implemented by bucklescript yet\n");
}

function clear_close_on_exec() {
  return Caml_missing_polyfill.not_implemented("unix_clear_close_on_exec not implemented by bucklescript yet\n");
}

function mkdir(_, _$1) {
  return Caml_missing_polyfill.not_implemented("unix_mkdir not implemented by bucklescript yet\n");
}

function rmdir() {
  return Caml_missing_polyfill.not_implemented("unix_rmdir not implemented by bucklescript yet\n");
}

function chdir() {
  return Caml_missing_polyfill.not_implemented("unix_chdir not implemented by bucklescript yet\n");
}

function getcwd() {
  return Caml_missing_polyfill.not_implemented("unix_getcwd not implemented by bucklescript yet\n");
}

function chroot() {
  return Caml_missing_polyfill.not_implemented("unix_chroot not implemented by bucklescript yet\n");
}

function opendir() {
  return Caml_missing_polyfill.not_implemented("unix_opendir not implemented by bucklescript yet\n");
}

function readdir() {
  return Caml_missing_polyfill.not_implemented("unix_readdir not implemented by bucklescript yet\n");
}

function rewinddir() {
  return Caml_missing_polyfill.not_implemented("unix_rewinddir not implemented by bucklescript yet\n");
}

function closedir() {
  return Caml_missing_polyfill.not_implemented("unix_closedir not implemented by bucklescript yet\n");
}

function pipe() {
  return Caml_missing_polyfill.not_implemented("unix_pipe not implemented by bucklescript yet\n");
}

function mkfifo(_, _$1) {
  return Caml_missing_polyfill.not_implemented("unix_mkfifo not implemented by bucklescript yet\n");
}

function symlink(_, _$1) {
  return Caml_missing_polyfill.not_implemented("unix_symlink not implemented by bucklescript yet\n");
}

function readlink() {
  return Caml_missing_polyfill.not_implemented("unix_readlink not implemented by bucklescript yet\n");
}

function select(_, _$1, _$2, _$3) {
  return Caml_missing_polyfill.not_implemented("unix_select not implemented by bucklescript yet\n");
}

function lockf(_, _$1, _$2) {
  return Caml_missing_polyfill.not_implemented("unix_lockf not implemented by bucklescript yet\n");
}

function kill(_, _$1) {
  return Caml_missing_polyfill.not_implemented("unix_kill not implemented by bucklescript yet\n");
}

function sigprocmask(_, _$1) {
  return Caml_missing_polyfill.not_implemented("unix_sigprocmask not implemented by bucklescript yet\n");
}

function sigpending() {
  return Caml_missing_polyfill.not_implemented("unix_sigpending not implemented by bucklescript yet\n");
}

function sigsuspend() {
  return Caml_missing_polyfill.not_implemented("unix_sigsuspend not implemented by bucklescript yet\n");
}

function time() {
  return Caml_missing_polyfill.not_implemented("unix_time not implemented by bucklescript yet\n");
}

function gettimeofday() {
  return Caml_missing_polyfill.not_implemented("unix_gettimeofday not implemented by bucklescript yet\n");
}

function gmtime() {
  return Caml_missing_polyfill.not_implemented("unix_gmtime not implemented by bucklescript yet\n");
}

function localtime() {
  return Caml_missing_polyfill.not_implemented("unix_localtime not implemented by bucklescript yet\n");
}

function mktime() {
  return Caml_missing_polyfill.not_implemented("unix_mktime not implemented by bucklescript yet\n");
}

function alarm() {
  return Caml_missing_polyfill.not_implemented("unix_alarm not implemented by bucklescript yet\n");
}

function sleep() {
  return Caml_missing_polyfill.not_implemented("unix_sleep not implemented by bucklescript yet\n");
}

function times() {
  return Caml_missing_polyfill.not_implemented("unix_times not implemented by bucklescript yet\n");
}

function utimes(_, _$1, _$2) {
  return Caml_missing_polyfill.not_implemented("unix_utimes not implemented by bucklescript yet\n");
}

function getitimer() {
  return Caml_missing_polyfill.not_implemented("unix_getitimer not implemented by bucklescript yet\n");
}

function setitimer(_, _$1) {
  return Caml_missing_polyfill.not_implemented("unix_setitimer not implemented by bucklescript yet\n");
}

function getuid() {
  return Caml_missing_polyfill.not_implemented("unix_getuid not implemented by bucklescript yet\n");
}

function geteuid() {
  return Caml_missing_polyfill.not_implemented("unix_geteuid not implemented by bucklescript yet\n");
}

function setuid() {
  return Caml_missing_polyfill.not_implemented("unix_setuid not implemented by bucklescript yet\n");
}

function getgid() {
  return Caml_missing_polyfill.not_implemented("unix_getgid not implemented by bucklescript yet\n");
}

function getegid() {
  return Caml_missing_polyfill.not_implemented("unix_getegid not implemented by bucklescript yet\n");
}

function setgid() {
  return Caml_missing_polyfill.not_implemented("unix_setgid not implemented by bucklescript yet\n");
}

function getgroups() {
  return Caml_missing_polyfill.not_implemented("unix_getgroups not implemented by bucklescript yet\n");
}

function setgroups() {
  return Caml_missing_polyfill.not_implemented("unix_setgroups not implemented by bucklescript yet\n");
}

function initgroups(_, _$1) {
  return Caml_missing_polyfill.not_implemented("unix_initgroups not implemented by bucklescript yet\n");
}

function getlogin() {
  return Caml_missing_polyfill.not_implemented("unix_getlogin not implemented by bucklescript yet\n");
}

function getpwnam() {
  return Caml_missing_polyfill.not_implemented("unix_getpwnam not implemented by bucklescript yet\n");
}

function getgrnam() {
  return Caml_missing_polyfill.not_implemented("unix_getgrnam not implemented by bucklescript yet\n");
}

function getpwuid() {
  return Caml_missing_polyfill.not_implemented("unix_getpwuid not implemented by bucklescript yet\n");
}

function getgrgid() {
  return Caml_missing_polyfill.not_implemented("unix_getgrgid not implemented by bucklescript yet\n");
}

function inet_addr_of_string() {
  return Caml_missing_polyfill.not_implemented("unix_inet_addr_of_string not implemented by bucklescript yet\n");
}

function string_of_inet_addr() {
  return Caml_missing_polyfill.not_implemented("unix_string_of_inet_addr not implemented by bucklescript yet\n");
}

function socket(_, _$1, _$2) {
  return Caml_missing_polyfill.not_implemented("unix_socket not implemented by bucklescript yet\n");
}

function socketpair(_, _$1, _$2) {
  return Caml_missing_polyfill.not_implemented("unix_socketpair not implemented by bucklescript yet\n");
}

function accept() {
  return Caml_missing_polyfill.not_implemented("unix_accept not implemented by bucklescript yet\n");
}

function bind(_, _$1) {
  return Caml_missing_polyfill.not_implemented("unix_bind not implemented by bucklescript yet\n");
}

function connect(_, _$1) {
  return Caml_missing_polyfill.not_implemented("unix_connect not implemented by bucklescript yet\n");
}

function listen(_, _$1) {
  return Caml_missing_polyfill.not_implemented("unix_listen not implemented by bucklescript yet\n");
}

function shutdown(_, _$1) {
  return Caml_missing_polyfill.not_implemented("unix_shutdown not implemented by bucklescript yet\n");
}

function getsockname() {
  return Caml_missing_polyfill.not_implemented("unix_getsockname not implemented by bucklescript yet\n");
}

function getpeername() {
  return Caml_missing_polyfill.not_implemented("unix_getpeername not implemented by bucklescript yet\n");
}

function gethostname() {
  return Caml_missing_polyfill.not_implemented("unix_gethostname not implemented by bucklescript yet\n");
}

function gethostbyname() {
  return Caml_missing_polyfill.not_implemented("unix_gethostbyname not implemented by bucklescript yet\n");
}

function gethostbyaddr() {
  return Caml_missing_polyfill.not_implemented("unix_gethostbyaddr not implemented by bucklescript yet\n");
}

function getprotobyname() {
  return Caml_missing_polyfill.not_implemented("unix_getprotobyname not implemented by bucklescript yet\n");
}

function getprotobynumber() {
  return Caml_missing_polyfill.not_implemented("unix_getprotobynumber not implemented by bucklescript yet\n");
}

function getservbyname(_, _$1) {
  return Caml_missing_polyfill.not_implemented("unix_getservbyname not implemented by bucklescript yet\n");
}

function getservbyport(_, _$1) {
  return Caml_missing_polyfill.not_implemented("unix_getservbyport not implemented by bucklescript yet\n");
}

function tcgetattr() {
  return Caml_missing_polyfill.not_implemented("unix_tcgetattr not implemented by bucklescript yet\n");
}

function tcsetattr(_, _$1, _$2) {
  return Caml_missing_polyfill.not_implemented("unix_tcsetattr not implemented by bucklescript yet\n");
}

function tcsendbreak(_, _$1) {
  return Caml_missing_polyfill.not_implemented("unix_tcsendbreak not implemented by bucklescript yet\n");
}

function tcdrain() {
  return Caml_missing_polyfill.not_implemented("unix_tcdrain not implemented by bucklescript yet\n");
}

function tcflush(_, _$1) {
  return Caml_missing_polyfill.not_implemented("unix_tcflush not implemented by bucklescript yet\n");
}

function tcflow(_, _$1) {
  return Caml_missing_polyfill.not_implemented("unix_tcflow not implemented by bucklescript yet\n");
}

function setsid() {
  return Caml_missing_polyfill.not_implemented("unix_setsid not implemented by bucklescript yet\n");
}

exports.Unix_error             = Unix_error;
exports.error_message          = error_message;
exports.handle_unix_error      = handle_unix_error;
exports.environment            = environment;
exports.getenv                 = getenv;
exports.putenv                 = putenv;
exports.execv                  = execv;
exports.execve                 = execve;
exports.execvp                 = execvp;
exports.execvpe                = execvpe;
exports.fork                   = fork;
exports.wait                   = wait;
exports.waitpid                = waitpid;
exports.system                 = system;
exports.getpid                 = getpid;
exports.getppid                = getppid;
exports.nice                   = nice;
exports.stdin                  = stdin;
exports.stdout                 = stdout;
exports.stderr                 = stderr;
exports.openfile               = openfile;
exports.close                  = close;
exports.read                   = read;
exports.write                  = write;
exports.single_write           = single_write;
exports.write_substring        = write_substring;
exports.single_write_substring = single_write_substring;
exports.in_channel_of_descr    = in_channel_of_descr;
exports.out_channel_of_descr   = out_channel_of_descr;
exports.descr_of_in_channel    = descr_of_in_channel;
exports.descr_of_out_channel   = descr_of_out_channel;
exports.lseek                  = lseek;
exports.truncate               = truncate;
exports.ftruncate              = ftruncate;
exports.stat                   = stat;
exports.lstat                  = lstat;
exports.fstat                  = fstat;
exports.isatty                 = isatty;
exports.LargeFile              = LargeFile;
exports.unlink                 = unlink;
exports.rename                 = rename;
exports.link                   = link;
exports.chmod                  = chmod;
exports.fchmod                 = fchmod;
exports.chown                  = chown;
exports.fchown                 = fchown;
exports.umask                  = umask;
exports.access                 = access;
exports.dup                    = dup;
exports.dup2                   = dup2;
exports.set_nonblock           = set_nonblock;
exports.clear_nonblock         = clear_nonblock;
exports.set_close_on_exec      = set_close_on_exec;
exports.clear_close_on_exec    = clear_close_on_exec;
exports.mkdir                  = mkdir;
exports.rmdir                  = rmdir;
exports.chdir                  = chdir;
exports.getcwd                 = getcwd;
exports.chroot                 = chroot;
exports.opendir                = opendir;
exports.readdir                = readdir;
exports.rewinddir              = rewinddir;
exports.closedir               = closedir;
exports.pipe                   = pipe;
exports.mkfifo                 = mkfifo;
exports.create_process         = create_process;
exports.create_process_env     = create_process_env;
exports.open_process_in        = open_process_in;
exports.open_process_out       = open_process_out;
exports.open_process           = open_process;
exports.open_process_full      = open_process_full;
exports.close_process_in       = close_process_in;
exports.close_process_out      = close_process_out;
exports.close_process          = close_process;
exports.close_process_full     = close_process_full;
exports.symlink                = symlink;
exports.readlink               = readlink;
exports.select                 = select;
exports.lockf                  = lockf;
exports.kill                   = kill;
exports.sigprocmask            = sigprocmask;
exports.sigpending             = sigpending;
exports.sigsuspend             = sigsuspend;
exports.pause                  = pause;
exports.time                   = time;
exports.gettimeofday           = gettimeofday;
exports.gmtime                 = gmtime;
exports.localtime              = localtime;
exports.mktime                 = mktime;
exports.alarm                  = alarm;
exports.sleep                  = sleep;
exports.times                  = times;
exports.utimes                 = utimes;
exports.getitimer              = getitimer;
exports.setitimer              = setitimer;
exports.getuid                 = getuid;
exports.geteuid                = geteuid;
exports.setuid                 = setuid;
exports.getgid                 = getgid;
exports.getegid                = getegid;
exports.setgid                 = setgid;
exports.getgroups              = getgroups;
exports.setgroups              = setgroups;
exports.initgroups             = initgroups;
exports.getlogin               = getlogin;
exports.getpwnam               = getpwnam;
exports.getgrnam               = getgrnam;
exports.getpwuid               = getpwuid;
exports.getgrgid               = getgrgid;
exports.inet_addr_of_string    = inet_addr_of_string;
exports.string_of_inet_addr    = string_of_inet_addr;
exports.inet_addr_any          = inet_addr_any;
exports.inet_addr_loopback     = inet_addr_loopback;
exports.inet6_addr_any         = inet6_addr_any;
exports.inet6_addr_loopback    = inet6_addr_loopback;
exports.socket                 = socket;
exports.domain_of_sockaddr     = domain_of_sockaddr;
exports.socketpair             = socketpair;
exports.accept                 = accept;
exports.bind                   = bind;
exports.connect                = connect;
exports.listen                 = listen;
exports.shutdown               = shutdown;
exports.getsockname            = getsockname;
exports.getpeername            = getpeername;
exports.recv                   = recv;
exports.recvfrom               = recvfrom;
exports.send                   = send;
exports.send_substring         = send_substring;
exports.sendto                 = sendto;
exports.sendto_substring       = sendto_substring;
exports.getsockopt             = getsockopt;
exports.setsockopt             = setsockopt;
exports.getsockopt_int         = getsockopt_int;
exports.setsockopt_int         = setsockopt_int;
exports.getsockopt_optint      = getsockopt_optint;
exports.setsockopt_optint      = setsockopt_optint;
exports.getsockopt_float       = getsockopt_float;
exports.setsockopt_float       = setsockopt_float;
exports.getsockopt_error       = getsockopt_error;
exports.open_connection        = open_connection;
exports.shutdown_connection    = shutdown_connection;
exports.establish_server       = establish_server;
exports.gethostname            = gethostname;
exports.gethostbyname          = gethostbyname;
exports.gethostbyaddr          = gethostbyaddr;
exports.getprotobyname         = getprotobyname;
exports.getprotobynumber       = getprotobynumber;
exports.getservbyname          = getservbyname;
exports.getservbyport          = getservbyport;
exports.getaddrinfo            = getaddrinfo;
exports.getnameinfo            = getnameinfo;
exports.tcgetattr              = tcgetattr;
exports.tcsetattr              = tcsetattr;
exports.tcsendbreak            = tcsendbreak;
exports.tcdrain                = tcdrain;
exports.tcflush                = tcflush;
exports.tcflow                 = tcflow;
exports.setsid                 = setsid;
/*  Not a pure module */

},{"./array.js":"stdlib/array","./block.js":"stdlib/block","./callback.js":"stdlib/callback","./caml_array.js":"stdlib/caml_array","./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./caml_exceptions.js":"stdlib/caml_exceptions","./caml_format.js":"stdlib/caml_format","./caml_io.js":"stdlib/caml_io","./caml_missing_polyfill.js":"stdlib/caml_missing_polyfill","./caml_string.js":"stdlib/caml_string","./caml_sys.js":"stdlib/caml_sys","./curry.js":"stdlib/curry","./hashtbl.js":"stdlib/hashtbl","./js_exn.js":"stdlib/js_exn","./list.js":"stdlib/list","./pervasives.js":"stdlib/pervasives","./printexc.js":"stdlib/printexc","./printf.js":"stdlib/printf","./sys.js":"stdlib/sys"}],"stdlib/weak":[function(require,module,exports){
'use strict';

var Sys                     = require("./sys.js");
var $$Array                 = require("./array.js");
var Curry                   = require("./curry.js");
var Caml_obj                = require("./caml_obj.js");
var Caml_weak               = require("./caml_weak.js");
var Caml_array              = require("./caml_array.js");
var Caml_int32              = require("./caml_int32.js");
var Pervasives              = require("./pervasives.js");
var Caml_builtin_exceptions = require("./caml_builtin_exceptions.js");

function length(x) {
  return x.length - 1 | 0;
}

function fill(ar, ofs, len, x) {
  if (ofs < 0 || len < 0 || (ofs + len | 0) > (ar.length - 1 | 0)) {
    throw [
          Caml_builtin_exceptions.invalid_argument,
          "Weak.fill"
        ];
  } else {
    for(var i = ofs ,i_finish = (ofs + len | 0) - 1 | 0; i <= i_finish; ++i){
      Caml_weak.caml_weak_set(ar, i, x);
    }
    return /* () */0;
  }
}

function Make(H) {
  var emptybucket = Caml_weak.caml_weak_create(0);
  var get_index = function (t, h) {
    return (h & Pervasives.max_int) % t[/* table */0].length;
  };
  var create = function (sz) {
    var sz$1 = sz < 7 ? 7 : sz;
    var sz$2 = sz$1 > Sys.max_array_length ? Sys.max_array_length : sz$1;
    return /* record */[
            /* table */Caml_array.caml_make_vect(sz$2, emptybucket),
            /* hashes */Caml_array.caml_make_vect(sz$2, /* int array */[]),
            /* limit */7,
            /* oversize */0,
            /* rover */0
          ];
  };
  var clear = function (t) {
    for(var i = 0 ,i_finish = t[/* table */0].length - 1 | 0; i <= i_finish; ++i){
      Caml_array.caml_array_set(t[/* table */0], i, emptybucket);
      Caml_array.caml_array_set(t[/* hashes */1], i, /* int array */[]);
    }
    t[/* limit */2] = 7;
    t[/* oversize */3] = 0;
    return /* () */0;
  };
  var fold = function (f, t, init) {
    return $$Array.fold_right((function (param, param$1) {
                  var _i = 0;
                  var b = param;
                  var _accu = param$1;
                  while(true) {
                    var accu = _accu;
                    var i = _i;
                    if (i >= (b.length - 1 | 0)) {
                      return accu;
                    } else {
                      var match = Caml_weak.caml_weak_get(b, i);
                      if (match) {
                        _accu = Curry._2(f, match[0], accu);
                        _i = i + 1 | 0;
                        continue ;
                        
                      } else {
                        _i = i + 1 | 0;
                        continue ;
                        
                      }
                    }
                  };
                }), t[/* table */0], init);
  };
  var iter = function (f, t) {
    return $$Array.iter((function (param) {
                  var _i = 0;
                  var b = param;
                  while(true) {
                    var i = _i;
                    if (i >= (b.length - 1 | 0)) {
                      return /* () */0;
                    } else {
                      var match = Caml_weak.caml_weak_get(b, i);
                      if (match) {
                        Curry._1(f, match[0]);
                        _i = i + 1 | 0;
                        continue ;
                        
                      } else {
                        _i = i + 1 | 0;
                        continue ;
                        
                      }
                    }
                  };
                }), t[/* table */0]);
  };
  var iter_weak = function (f, t) {
    return $$Array.iteri((function (param, param$1) {
                  var _i = 0;
                  var j = param;
                  var b = param$1;
                  while(true) {
                    var i = _i;
                    if (i >= (b.length - 1 | 0)) {
                      return /* () */0;
                    } else {
                      var match = Caml_weak.caml_weak_check(b, i);
                      if (match !== 0) {
                        Curry._3(f, b, Caml_array.caml_array_get(t[/* hashes */1], j), i);
                        _i = i + 1 | 0;
                        continue ;
                        
                      } else {
                        _i = i + 1 | 0;
                        continue ;
                        
                      }
                    }
                  };
                }), t[/* table */0]);
  };
  var count_bucket = function (_i, b, _accu) {
    while(true) {
      var accu = _accu;
      var i = _i;
      if (i >= (b.length - 1 | 0)) {
        return accu;
      } else {
        _accu = accu + (
          Caml_weak.caml_weak_check(b, i) ? 1 : 0
        ) | 0;
        _i = i + 1 | 0;
        continue ;
        
      }
    };
  };
  var count = function (t) {
    return $$Array.fold_right((function (param, param$1) {
                  return count_bucket(0, param, param$1);
                }), t[/* table */0], 0);
  };
  var next_sz = function (n) {
    return Pervasives.min((Caml_int32.imul(3, n) / 2 | 0) + 3 | 0, Sys.max_array_length);
  };
  var prev_sz = function (n) {
    return (((n - 3 | 0) << 1) + 2 | 0) / 3 | 0;
  };
  var test_shrink_bucket = function (t) {
    var bucket = Caml_array.caml_array_get(t[/* table */0], t[/* rover */4]);
    var hbucket = Caml_array.caml_array_get(t[/* hashes */1], t[/* rover */4]);
    var len = bucket.length - 1 | 0;
    var prev_len = prev_sz(len);
    var live = count_bucket(0, bucket, 0);
    if (live <= prev_len) {
      var loop = function (_i, _j) {
        while(true) {
          var j = _j;
          var i = _i;
          if (j >= prev_len) {
            if (Caml_weak.caml_weak_check(bucket, i)) {
              _i = i + 1 | 0;
              continue ;
              
            } else if (Caml_weak.caml_weak_check(bucket, j)) {
              Caml_weak.caml_weak_blit(bucket, j, bucket, i, 1);
              Caml_array.caml_array_set(hbucket, i, Caml_array.caml_array_get(hbucket, j));
              _j = j - 1 | 0;
              _i = i + 1 | 0;
              continue ;
              
            } else {
              _j = j - 1 | 0;
              continue ;
              
            }
          } else {
            return 0;
          }
        };
      };
      loop(0, (bucket.length - 1 | 0) - 1 | 0);
      if (prev_len) {
        Caml_obj.caml_obj_truncate(bucket, prev_len + 1 | 0);
        Caml_obj.caml_obj_truncate(hbucket, prev_len);
      } else {
        Caml_array.caml_array_set(t[/* table */0], t[/* rover */4], emptybucket);
        Caml_array.caml_array_set(t[/* hashes */1], t[/* rover */4], /* int array */[]);
      }
      if (len > t[/* limit */2] && prev_len <= t[/* limit */2]) {
        t[/* oversize */3] = t[/* oversize */3] - 1 | 0;
      }
      
    }
    t[/* rover */4] = (t[/* rover */4] + 1 | 0) % t[/* table */0].length;
    return /* () */0;
  };
  var add_aux = function (t, setter, d, h, index) {
    var bucket = Caml_array.caml_array_get(t[/* table */0], index);
    var hashes = Caml_array.caml_array_get(t[/* hashes */1], index);
    var sz = bucket.length - 1 | 0;
    var _i = 0;
    while(true) {
      var i = _i;
      if (i >= sz) {
        var newsz = Pervasives.min((Caml_int32.imul(3, sz) / 2 | 0) + 3 | 0, Sys.max_array_length - 1 | 0);
        if (newsz <= sz) {
          throw [
                Caml_builtin_exceptions.failure,
                "Weak.Make: hash bucket cannot grow more"
              ];
        }
        var newbucket = Caml_weak.caml_weak_create(newsz);
        var newhashes = Caml_array.caml_make_vect(newsz, 0);
        Caml_weak.caml_weak_blit(bucket, 0, newbucket, 0, sz);
        $$Array.blit(hashes, 0, newhashes, 0, sz);
        Curry._3(setter, newbucket, sz, d);
        Caml_array.caml_array_set(newhashes, sz, h);
        Caml_array.caml_array_set(t[/* table */0], index, newbucket);
        Caml_array.caml_array_set(t[/* hashes */1], index, newhashes);
        if (sz <= t[/* limit */2] && newsz > t[/* limit */2]) {
          t[/* oversize */3] = t[/* oversize */3] + 1 | 0;
          for(var _i$1 = 0; _i$1 <= 2; ++_i$1){
            test_shrink_bucket(t);
          }
        }
        if (t[/* oversize */3] > (t[/* table */0].length >> 1)) {
          var t$1 = t;
          var oldlen = t$1[/* table */0].length;
          var newlen = next_sz(oldlen);
          if (newlen > oldlen) {
            var newt = create(newlen);
            var add_weak = (function(newt){
            return function add_weak(ob, oh, oi) {
              var setter = function (nb, ni, _) {
                return Caml_weak.caml_weak_blit(ob, oi, nb, ni, 1);
              };
              var h = Caml_array.caml_array_get(oh, oi);
              return add_aux(newt, setter, /* None */0, h, get_index(newt, h));
            }
            }(newt));
            iter_weak(add_weak, t$1);
            t$1[/* table */0] = newt[/* table */0];
            t$1[/* hashes */1] = newt[/* hashes */1];
            t$1[/* limit */2] = newt[/* limit */2];
            t$1[/* oversize */3] = newt[/* oversize */3];
            t$1[/* rover */4] = t$1[/* rover */4] % newt[/* table */0].length;
            return /* () */0;
          } else {
            t$1[/* limit */2] = Pervasives.max_int;
            t$1[/* oversize */3] = 0;
            return /* () */0;
          }
        } else {
          return 0;
        }
      } else if (Caml_weak.caml_weak_check(bucket, i)) {
        _i = i + 1 | 0;
        continue ;
        
      } else {
        Curry._3(setter, bucket, i, d);
        return Caml_array.caml_array_set(hashes, i, h);
      }
    };
  };
  var add = function (t, d) {
    var h = Curry._1(H[/* hash */1], d);
    return add_aux(t, Caml_weak.caml_weak_set, /* Some */[d], h, get_index(t, h));
  };
  var find_or = function (t, d, ifnotfound) {
    var h = Curry._1(H[/* hash */1], d);
    var index = get_index(t, h);
    var bucket = Caml_array.caml_array_get(t[/* table */0], index);
    var hashes = Caml_array.caml_array_get(t[/* hashes */1], index);
    var sz = bucket.length - 1 | 0;
    var _i = 0;
    while(true) {
      var i = _i;
      if (i >= sz) {
        return Curry._2(ifnotfound, h, index);
      } else if (h === Caml_array.caml_array_get(hashes, i)) {
        var match = Caml_weak.caml_weak_get_copy(bucket, i);
        if (match) {
          if (Curry._2(H[/* equal */0], match[0], d)) {
            var match$1 = Caml_weak.caml_weak_get(bucket, i);
            if (match$1) {
              return match$1[0];
            } else {
              _i = i + 1 | 0;
              continue ;
              
            }
          } else {
            _i = i + 1 | 0;
            continue ;
            
          }
        } else {
          _i = i + 1 | 0;
          continue ;
          
        }
      } else {
        _i = i + 1 | 0;
        continue ;
        
      }
    };
  };
  var merge = function (t, d) {
    return find_or(t, d, (function (h, index) {
                  add_aux(t, Caml_weak.caml_weak_set, /* Some */[d], h, index);
                  return d;
                }));
  };
  var find = function (t, d) {
    return find_or(t, d, (function (_, _$1) {
                  throw Caml_builtin_exceptions.not_found;
                }));
  };
  var find_shadow = function (t, d, iffound, ifnotfound) {
    var h = Curry._1(H[/* hash */1], d);
    var index = get_index(t, h);
    var bucket = Caml_array.caml_array_get(t[/* table */0], index);
    var hashes = Caml_array.caml_array_get(t[/* hashes */1], index);
    var sz = bucket.length - 1 | 0;
    var _i = 0;
    while(true) {
      var i = _i;
      if (i >= sz) {
        return ifnotfound;
      } else if (h === Caml_array.caml_array_get(hashes, i)) {
        var match = Caml_weak.caml_weak_get_copy(bucket, i);
        if (match) {
          if (Curry._2(H[/* equal */0], match[0], d)) {
            return Curry._2(iffound, bucket, i);
          } else {
            _i = i + 1 | 0;
            continue ;
            
          }
        } else {
          _i = i + 1 | 0;
          continue ;
          
        }
      } else {
        _i = i + 1 | 0;
        continue ;
        
      }
    };
  };
  var remove = function (t, d) {
    return find_shadow(t, d, (function (w, i) {
                  return Caml_weak.caml_weak_set(w, i, /* None */0);
                }), /* () */0);
  };
  var mem = function (t, d) {
    return find_shadow(t, d, (function (_, _$1) {
                  return /* true */1;
                }), /* false */0);
  };
  var find_all = function (t, d) {
    var h = Curry._1(H[/* hash */1], d);
    var index = get_index(t, h);
    var bucket = Caml_array.caml_array_get(t[/* table */0], index);
    var hashes = Caml_array.caml_array_get(t[/* hashes */1], index);
    var sz = bucket.length - 1 | 0;
    var _i = 0;
    var _accu = /* [] */0;
    while(true) {
      var accu = _accu;
      var i = _i;
      if (i >= sz) {
        return accu;
      } else if (h === Caml_array.caml_array_get(hashes, i)) {
        var match = Caml_weak.caml_weak_get_copy(bucket, i);
        if (match) {
          if (Curry._2(H[/* equal */0], match[0], d)) {
            var match$1 = Caml_weak.caml_weak_get(bucket, i);
            if (match$1) {
              _accu = /* :: */[
                match$1[0],
                accu
              ];
              _i = i + 1 | 0;
              continue ;
              
            } else {
              _i = i + 1 | 0;
              continue ;
              
            }
          } else {
            _i = i + 1 | 0;
            continue ;
            
          }
        } else {
          _i = i + 1 | 0;
          continue ;
          
        }
      } else {
        _i = i + 1 | 0;
        continue ;
        
      }
    };
  };
  var stats = function (t) {
    var len = t[/* table */0].length;
    var lens = $$Array.map(length, t[/* table */0]);
    $$Array.sort(Caml_obj.caml_compare, lens);
    var totlen = $$Array.fold_left((function (prim, prim$1) {
            return prim + prim$1 | 0;
          }), 0, lens);
    return /* tuple */[
            len,
            count(t),
            totlen,
            Caml_array.caml_array_get(lens, 0),
            Caml_array.caml_array_get(lens, len / 2 | 0),
            Caml_array.caml_array_get(lens, len - 1 | 0)
          ];
  };
  return /* module */[
          /* create */create,
          /* clear */clear,
          /* merge */merge,
          /* add */add,
          /* remove */remove,
          /* find */find,
          /* find_all */find_all,
          /* mem */mem,
          /* iter */iter,
          /* fold */fold,
          /* count */count,
          /* stats */stats
        ];
}

var create = Caml_weak.caml_weak_create;

var set = Caml_weak.caml_weak_set;

var get = Caml_weak.caml_weak_get;

var get_copy = Caml_weak.caml_weak_get_copy;

var check = Caml_weak.caml_weak_check;

var blit = Caml_weak.caml_weak_blit;

exports.create   = create;
exports.length   = length;
exports.set      = set;
exports.get      = get;
exports.get_copy = get_copy;
exports.check    = check;
exports.fill     = fill;
exports.blit     = blit;
exports.Make     = Make;
/* No side effect */

},{"./array.js":"stdlib/array","./caml_array.js":"stdlib/caml_array","./caml_builtin_exceptions.js":"stdlib/caml_builtin_exceptions","./caml_int32.js":"stdlib/caml_int32","./caml_obj.js":"stdlib/caml_obj","./caml_weak.js":"stdlib/caml_weak","./curry.js":"stdlib/curry","./pervasives.js":"stdlib/pervasives","./sys.js":"stdlib/sys"}]},{},[]);