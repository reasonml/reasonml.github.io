'use strict';

var List = require("./list.js");
var Curry = require("./curry.js");
var Caml_option = require("./caml_option.js");

function Make(funarg) {
  var height = function (param) {
    if (param) {
      return param[/* h */3];
    } else {
      return 0;
    }
  };
  var create = function (l, v, r) {
    var hl = l ? l[/* h */3] : 0;
    var hr = r ? r[/* h */3] : 0;
    return /* Node */[
            /* l */l,
            /* v */v,
            /* r */r,
            /* h */hl >= hr ? hl + 1 | 0 : hr + 1 | 0
          ];
  };
  var bal = function (l, v, r) {
    var hl = l ? l[/* h */3] : 0;
    var hr = r ? r[/* h */3] : 0;
    if (hl > (hr + 2 | 0)) {
      if (l) {
        var lr = l[/* r */2];
        var lv = l[/* v */1];
        var ll = l[/* l */0];
        if (height(ll) >= height(lr)) {
          return create(ll, lv, create(lr, v, r));
        }
        if (lr) {
          return create(create(ll, lv, lr[/* l */0]), lr[/* v */1], create(lr[/* r */2], v, r));
        }
        throw {
              RE_EXN_ID: "Invalid_argument",
              _1: "Set.bal",
              Error: new Error()
            };
      }
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Set.bal",
            Error: new Error()
          };
    }
    if (hr <= (hl + 2 | 0)) {
      return /* Node */[
              /* l */l,
              /* v */v,
              /* r */r,
              /* h */hl >= hr ? hl + 1 | 0 : hr + 1 | 0
            ];
    }
    if (r) {
      var rr = r[/* r */2];
      var rv = r[/* v */1];
      var rl = r[/* l */0];
      if (height(rr) >= height(rl)) {
        return create(create(l, v, rl), rv, rr);
      }
      if (rl) {
        return create(create(l, v, rl[/* l */0]), rl[/* v */1], create(rl[/* r */2], rv, rr));
      }
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Set.bal",
            Error: new Error()
          };
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Set.bal",
          Error: new Error()
        };
  };
  var add = function (x, t) {
    if (!t) {
      return /* Node */[
              /* l : Empty */0,
              /* v */x,
              /* r : Empty */0,
              /* h */1
            ];
    }
    var r = t[/* r */2];
    var v = t[/* v */1];
    var l = t[/* l */0];
    var c = Curry._2(funarg.compare, x, v);
    if (c === 0) {
      return t;
    }
    if (c < 0) {
      var ll = add(x, l);
      if (l === ll) {
        return t;
      } else {
        return bal(ll, v, r);
      }
    }
    var rr = add(x, r);
    if (r === rr) {
      return t;
    } else {
      return bal(l, v, rr);
    }
  };
  var singleton = function (x) {
    return /* Node */[
            /* l : Empty */0,
            /* v */x,
            /* r : Empty */0,
            /* h */1
          ];
  };
  var add_min_element = function (x, param) {
    if (param) {
      return bal(add_min_element(x, param[/* l */0]), param[/* v */1], param[/* r */2]);
    } else {
      return singleton(x);
    }
  };
  var add_max_element = function (x, param) {
    if (param) {
      return bal(param[/* l */0], param[/* v */1], add_max_element(x, param[/* r */2]));
    } else {
      return singleton(x);
    }
  };
  var join = function (l, v, r) {
    if (!l) {
      return add_min_element(v, r);
    }
    if (!r) {
      return add_max_element(v, l);
    }
    var rh = r[/* h */3];
    var lh = l[/* h */3];
    if (lh > (rh + 2 | 0)) {
      return bal(l[/* l */0], l[/* v */1], join(l[/* r */2], v, r));
    } else if (rh > (lh + 2 | 0)) {
      return bal(join(l, v, r[/* l */0]), r[/* v */1], r[/* r */2]);
    } else {
      return create(l, v, r);
    }
  };
  var min_elt = function (_param) {
    while(true) {
      var param = _param;
      if (param) {
        var l = param[/* l */0];
        if (!l) {
          return param[/* v */1];
        }
        _param = l;
        continue ;
      }
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    };
  };
  var min_elt_opt = function (_param) {
    while(true) {
      var param = _param;
      if (!param) {
        return ;
      }
      var l = param[/* l */0];
      if (!l) {
        return Caml_option.some(param[/* v */1]);
      }
      _param = l;
      continue ;
    };
  };
  var max_elt = function (_param) {
    while(true) {
      var param = _param;
      if (param) {
        var r = param[/* r */2];
        if (!r) {
          return param[/* v */1];
        }
        _param = r;
        continue ;
      }
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    };
  };
  var max_elt_opt = function (_param) {
    while(true) {
      var param = _param;
      if (!param) {
        return ;
      }
      var r = param[/* r */2];
      if (!r) {
        return Caml_option.some(param[/* v */1]);
      }
      _param = r;
      continue ;
    };
  };
  var remove_min_elt = function (param) {
    if (param) {
      var l = param[/* l */0];
      if (l) {
        return bal(remove_min_elt(l), param[/* v */1], param[/* r */2]);
      } else {
        return param[/* r */2];
      }
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Set.remove_min_elt",
          Error: new Error()
        };
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
    if (!param) {
      return /* tuple */[
              /* Empty */0,
              false,
              /* Empty */0
            ];
    }
    var r = param[/* r */2];
    var v = param[/* v */1];
    var l = param[/* l */0];
    var c = Curry._2(funarg.compare, x, v);
    if (c === 0) {
      return /* tuple */[
              l,
              true,
              r
            ];
    }
    if (c < 0) {
      var match = split(x, l);
      return /* tuple */[
              match[0],
              match[1],
              join(match[2], v, r)
            ];
    }
    var match$1 = split(x, r);
    return /* tuple */[
            join(l, v, match$1[0]),
            match$1[1],
            match$1[2]
          ];
  };
  var is_empty = function (param) {
    if (param) {
      return false;
    } else {
      return true;
    }
  };
  var mem = function (x, _param) {
    while(true) {
      var param = _param;
      if (!param) {
        return false;
      }
      var c = Curry._2(funarg.compare, x, param[/* v */1]);
      if (c === 0) {
        return true;
      }
      _param = c < 0 ? param[/* l */0] : param[/* r */2];
      continue ;
    };
  };
  var remove = function (x, t) {
    if (!t) {
      return /* Empty */0;
    }
    var r = t[/* r */2];
    var v = t[/* v */1];
    var l = t[/* l */0];
    var c = Curry._2(funarg.compare, x, v);
    if (c === 0) {
      if (l) {
        if (r) {
          return bal(l, min_elt(r), remove_min_elt(r));
        } else {
          return l;
        }
      } else {
        return r;
      }
    }
    if (c < 0) {
      var ll = remove(x, l);
      if (l === ll) {
        return t;
      } else {
        return bal(ll, v, r);
      }
    }
    var rr = remove(x, r);
    if (r === rr) {
      return t;
    } else {
      return bal(l, v, rr);
    }
  };
  var union = function (s1, s2) {
    if (!s1) {
      return s2;
    }
    if (!s2) {
      return s1;
    }
    var h2 = s2[/* h */3];
    var v2 = s2[/* v */1];
    var h1 = s1[/* h */3];
    var v1 = s1[/* v */1];
    if (h1 >= h2) {
      if (h2 === 1) {
        return add(v2, s1);
      }
      var match = split(v1, s2);
      return join(union(s1[/* l */0], match[0]), v1, union(s1[/* r */2], match[2]));
    }
    if (h1 === 1) {
      return add(v1, s2);
    }
    var match$1 = split(v2, s1);
    return join(union(match$1[0], s2[/* l */0]), v2, union(match$1[2], s2[/* r */2]));
  };
  var inter = function (s1, s2) {
    if (!s1) {
      return /* Empty */0;
    }
    if (!s2) {
      return /* Empty */0;
    }
    var r1 = s1[/* r */2];
    var v1 = s1[/* v */1];
    var l1 = s1[/* l */0];
    var match = split(v1, s2);
    var l2 = match[0];
    if (match[1]) {
      return join(inter(l1, l2), v1, inter(r1, match[2]));
    } else {
      return concat(inter(l1, l2), inter(r1, match[2]));
    }
  };
  var diff = function (s1, s2) {
    if (!s1) {
      return /* Empty */0;
    }
    if (!s2) {
      return s1;
    }
    var r1 = s1[/* r */2];
    var v1 = s1[/* v */1];
    var l1 = s1[/* l */0];
    var match = split(v1, s2);
    var l2 = match[0];
    if (match[1]) {
      return concat(diff(l1, l2), diff(r1, match[2]));
    } else {
      return join(diff(l1, l2), v1, diff(r1, match[2]));
    }
  };
  var cons_enum = function (_s, _e) {
    while(true) {
      var e = _e;
      var s = _s;
      if (!s) {
        return e;
      }
      _e = /* More */[
        s[/* v */1],
        s[/* r */2],
        e
      ];
      _s = s[/* l */0];
      continue ;
    };
  };
  var compare = function (s1, s2) {
    var _e1 = cons_enum(s1, /* End */0);
    var _e2 = cons_enum(s2, /* End */0);
    while(true) {
      var e2 = _e2;
      var e1 = _e1;
      if (!e1) {
        if (e2) {
          return -1;
        } else {
          return 0;
        }
      }
      if (!e2) {
        return 1;
      }
      var c = Curry._2(funarg.compare, e1[0], e2[0]);
      if (c !== 0) {
        return c;
      }
      _e2 = cons_enum(e2[1], e2[2]);
      _e1 = cons_enum(e1[1], e1[2]);
      continue ;
    };
  };
  var equal = function (s1, s2) {
    return compare(s1, s2) === 0;
  };
  var subset = function (_s1, _s2) {
    while(true) {
      var s2 = _s2;
      var s1 = _s1;
      if (!s1) {
        return true;
      }
      if (!s2) {
        return false;
      }
      var r2 = s2[/* r */2];
      var l2 = s2[/* l */0];
      var r1 = s1[/* r */2];
      var v1 = s1[/* v */1];
      var l1 = s1[/* l */0];
      var c = Curry._2(funarg.compare, v1, s2[/* v */1]);
      if (c === 0) {
        if (!subset(l1, l2)) {
          return false;
        }
        _s2 = r2;
        _s1 = r1;
        continue ;
      }
      if (c < 0) {
        if (!subset(/* Node */[
                /* l */l1,
                /* v */v1,
                /* r : Empty */0,
                /* h */0
              ], l2)) {
          return false;
        }
        _s1 = r1;
        continue ;
      }
      if (!subset(/* Node */[
              /* l : Empty */0,
              /* v */v1,
              /* r */r1,
              /* h */0
            ], r2)) {
        return false;
      }
      _s1 = l1;
      continue ;
    };
  };
  var iter = function (f, _param) {
    while(true) {
      var param = _param;
      if (!param) {
        return ;
      }
      iter(f, param[/* l */0]);
      Curry._1(f, param[/* v */1]);
      _param = param[/* r */2];
      continue ;
    };
  };
  var fold = function (f, _s, _accu) {
    while(true) {
      var accu = _accu;
      var s = _s;
      if (!s) {
        return accu;
      }
      _accu = Curry._2(f, s[/* v */1], fold(f, s[/* l */0], accu));
      _s = s[/* r */2];
      continue ;
    };
  };
  var for_all = function (p, _param) {
    while(true) {
      var param = _param;
      if (!param) {
        return true;
      }
      if (!Curry._1(p, param[/* v */1])) {
        return false;
      }
      if (!for_all(p, param[/* l */0])) {
        return false;
      }
      _param = param[/* r */2];
      continue ;
    };
  };
  var exists = function (p, _param) {
    while(true) {
      var param = _param;
      if (!param) {
        return false;
      }
      if (Curry._1(p, param[/* v */1])) {
        return true;
      }
      if (exists(p, param[/* l */0])) {
        return true;
      }
      _param = param[/* r */2];
      continue ;
    };
  };
  var filter = function (p, t) {
    if (!t) {
      return /* Empty */0;
    }
    var r = t[/* r */2];
    var v = t[/* v */1];
    var l = t[/* l */0];
    var l$prime = filter(p, l);
    var pv = Curry._1(p, v);
    var r$prime = filter(p, r);
    if (pv) {
      if (l === l$prime && r === r$prime) {
        return t;
      } else {
        return join(l$prime, v, r$prime);
      }
    } else {
      return concat(l$prime, r$prime);
    }
  };
  var partition = function (p, param) {
    if (!param) {
      return /* tuple */[
              /* Empty */0,
              /* Empty */0
            ];
    }
    var v = param[/* v */1];
    var match = partition(p, param[/* l */0]);
    var lf = match[1];
    var lt = match[0];
    var pv = Curry._1(p, v);
    var match$1 = partition(p, param[/* r */2]);
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
  };
  var cardinal = function (param) {
    if (param) {
      return (cardinal(param[/* l */0]) + 1 | 0) + cardinal(param[/* r */2]) | 0;
    } else {
      return 0;
    }
  };
  var elements_aux = function (_accu, _param) {
    while(true) {
      var param = _param;
      var accu = _accu;
      if (!param) {
        return accu;
      }
      _param = param[/* l */0];
      _accu = /* :: */[
        param[/* v */1],
        elements_aux(accu, param[/* r */2])
      ];
      continue ;
    };
  };
  var elements = function (s) {
    return elements_aux(/* [] */0, s);
  };
  var find = function (x, _param) {
    while(true) {
      var param = _param;
      if (param) {
        var v = param[/* v */1];
        var c = Curry._2(funarg.compare, x, v);
        if (c === 0) {
          return v;
        }
        _param = c < 0 ? param[/* l */0] : param[/* r */2];
        continue ;
      }
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    };
  };
  var find_first = function (f, _param) {
    while(true) {
      var param = _param;
      if (param) {
        var v = param[/* v */1];
        if (Curry._1(f, v)) {
          var _v0 = v;
          var _param$1 = param[/* l */0];
          while(true) {
            var param$1 = _param$1;
            var v0 = _v0;
            if (!param$1) {
              return v0;
            }
            var v$1 = param$1[/* v */1];
            if (Curry._1(f, v$1)) {
              _param$1 = param$1[/* l */0];
              _v0 = v$1;
              continue ;
            }
            _param$1 = param$1[/* r */2];
            continue ;
          };
        }
        _param = param[/* r */2];
        continue ;
      }
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    };
  };
  var find_first_opt = function (f, _param) {
    while(true) {
      var param = _param;
      if (!param) {
        return ;
      }
      var v = param[/* v */1];
      if (Curry._1(f, v)) {
        var _v0 = v;
        var _param$1 = param[/* l */0];
        while(true) {
          var param$1 = _param$1;
          var v0 = _v0;
          if (!param$1) {
            return Caml_option.some(v0);
          }
          var v$1 = param$1[/* v */1];
          if (Curry._1(f, v$1)) {
            _param$1 = param$1[/* l */0];
            _v0 = v$1;
            continue ;
          }
          _param$1 = param$1[/* r */2];
          continue ;
        };
      }
      _param = param[/* r */2];
      continue ;
    };
  };
  var find_last = function (f, _param) {
    while(true) {
      var param = _param;
      if (param) {
        var v = param[/* v */1];
        if (Curry._1(f, v)) {
          var _v0 = v;
          var _param$1 = param[/* r */2];
          while(true) {
            var param$1 = _param$1;
            var v0 = _v0;
            if (!param$1) {
              return v0;
            }
            var v$1 = param$1[/* v */1];
            if (Curry._1(f, v$1)) {
              _param$1 = param$1[/* r */2];
              _v0 = v$1;
              continue ;
            }
            _param$1 = param$1[/* l */0];
            continue ;
          };
        }
        _param = param[/* l */0];
        continue ;
      }
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    };
  };
  var find_last_opt = function (f, _param) {
    while(true) {
      var param = _param;
      if (!param) {
        return ;
      }
      var v = param[/* v */1];
      if (Curry._1(f, v)) {
        var _v0 = v;
        var _param$1 = param[/* r */2];
        while(true) {
          var param$1 = _param$1;
          var v0 = _v0;
          if (!param$1) {
            return Caml_option.some(v0);
          }
          var v$1 = param$1[/* v */1];
          if (Curry._1(f, v$1)) {
            _param$1 = param$1[/* r */2];
            _v0 = v$1;
            continue ;
          }
          _param$1 = param$1[/* l */0];
          continue ;
        };
      }
      _param = param[/* l */0];
      continue ;
    };
  };
  var find_opt = function (x, _param) {
    while(true) {
      var param = _param;
      if (!param) {
        return ;
      }
      var v = param[/* v */1];
      var c = Curry._2(funarg.compare, x, v);
      if (c === 0) {
        return Caml_option.some(v);
      }
      _param = c < 0 ? param[/* l */0] : param[/* r */2];
      continue ;
    };
  };
  var map = function (f, t) {
    if (!t) {
      return /* Empty */0;
    }
    var r = t[/* r */2];
    var v = t[/* v */1];
    var l = t[/* l */0];
    var l$prime = map(f, l);
    var v$prime = Curry._1(f, v);
    var r$prime = map(f, r);
    if (l === l$prime && v === v$prime && r === r$prime) {
      return t;
    } else if ((l$prime === /* Empty */0 || Curry._2(funarg.compare, max_elt(l$prime), v$prime) < 0) && (r$prime === /* Empty */0 || Curry._2(funarg.compare, v$prime, min_elt(r$prime)) < 0)) {
      return join(l$prime, v$prime, r$prime);
    } else {
      return union(l$prime, add(v$prime, r$prime));
    }
  };
  var of_list = function (l) {
    if (!l) {
      return /* Empty */0;
    }
    var match = l[1];
    var x0 = l[0];
    if (!match) {
      return singleton(x0);
    }
    var match$1 = match[1];
    var x1 = match[0];
    if (!match$1) {
      return add(x1, singleton(x0));
    }
    var match$2 = match$1[1];
    var x2 = match$1[0];
    if (!match$2) {
      return add(x2, add(x1, singleton(x0)));
    }
    var match$3 = match$2[1];
    var x3 = match$2[0];
    if (match$3) {
      if (match$3[1]) {
        var l$1 = List.sort_uniq(funarg.compare, l);
        var sub = function (n, l) {
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
                            /* l : Empty */0,
                            /* v */l[0],
                            /* r : Empty */0,
                            /* h */1
                          ],
                          l[1]
                        ];
                }
                break;
            case 2 :
                if (l) {
                  var match = l[1];
                  if (match) {
                    return /* tuple */[
                            /* Node */[
                              /* l : Node */[
                                /* l : Empty */0,
                                /* v */l[0],
                                /* r : Empty */0,
                                /* h */1
                              ],
                              /* v */match[0],
                              /* r : Empty */0,
                              /* h */2
                            ],
                            match[1]
                          ];
                  }
                  
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
                                /* l : Node */[
                                  /* l : Empty */0,
                                  /* v */l[0],
                                  /* r : Empty */0,
                                  /* h */1
                                ],
                                /* v */match$1[0],
                                /* r : Node */[
                                  /* l : Empty */0,
                                  /* v */match$2[0],
                                  /* r : Empty */0,
                                  /* h */1
                                ],
                                /* h */2
                              ],
                              match$2[1]
                            ];
                    }
                    
                  }
                  
                }
                break;
            default:
              
          }
          var nl = n / 2 | 0;
          var match$3 = sub(nl, l);
          var l$1 = match$3[1];
          if (l$1) {
            var match$4 = sub((n - nl | 0) - 1 | 0, l$1[1]);
            return /* tuple */[
                    create(match$3[0], l$1[0], match$4[0]),
                    match$4[1]
                  ];
          }
          throw {
                RE_EXN_ID: "Assert_failure",
                _1: /* tuple */[
                  "set.ml",
                  510,
                  18
                ],
                Error: new Error()
              };
        };
        return sub(List.length(l$1), l$1)[0];
      } else {
        return add(match$3[0], add(x3, add(x2, add(x1, singleton(x0)))));
      }
    } else {
      return add(x3, add(x2, add(x1, singleton(x0))));
    }
  };
  return {
          empty: /* Empty */0,
          is_empty: is_empty,
          mem: mem,
          add: add,
          singleton: singleton,
          remove: remove,
          union: union,
          inter: inter,
          diff: diff,
          compare: compare,
          equal: equal,
          subset: subset,
          iter: iter,
          map: map,
          fold: fold,
          for_all: for_all,
          exists: exists,
          filter: filter,
          partition: partition,
          cardinal: cardinal,
          elements: elements,
          min_elt: min_elt,
          min_elt_opt: min_elt_opt,
          max_elt: max_elt,
          max_elt_opt: max_elt_opt,
          choose: min_elt,
          choose_opt: min_elt_opt,
          split: split,
          find: find,
          find_opt: find_opt,
          find_first: find_first,
          find_first_opt: find_first_opt,
          find_last: find_last,
          find_last_opt: find_last_opt,
          of_list: of_list
        };
}

exports.Make = Make;
/* No side effect */
