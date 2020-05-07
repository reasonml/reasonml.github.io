'use strict';

var Curry = require("./curry.js");
var Caml_option = require("./caml_option.js");

function Make(funarg) {
  var height = function (param) {
    if (param) {
      return param[/* h */4];
    } else {
      return 0;
    }
  };
  var create = function (l, x, d, r) {
    var hl = height(l);
    var hr = height(r);
    return /* Node */[
            /* l */l,
            /* v */x,
            /* d */d,
            /* r */r,
            /* h */hl >= hr ? hl + 1 | 0 : hr + 1 | 0
          ];
  };
  var singleton = function (x, d) {
    return /* Node */[
            /* l : Empty */0,
            /* v */x,
            /* d */d,
            /* r : Empty */0,
            /* h */1
          ];
  };
  var bal = function (l, x, d, r) {
    var hl = l ? l[/* h */4] : 0;
    var hr = r ? r[/* h */4] : 0;
    if (hl > (hr + 2 | 0)) {
      if (l) {
        var lr = l[/* r */3];
        var ld = l[/* d */2];
        var lv = l[/* v */1];
        var ll = l[/* l */0];
        if (height(ll) >= height(lr)) {
          return create(ll, lv, ld, create(lr, x, d, r));
        }
        if (lr) {
          return create(create(ll, lv, ld, lr[/* l */0]), lr[/* v */1], lr[/* d */2], create(lr[/* r */3], x, d, r));
        }
        throw {
              RE_EXN_ID: "Invalid_argument",
              _1: "Map.bal",
              Error: new Error()
            };
      }
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Map.bal",
            Error: new Error()
          };
    }
    if (hr <= (hl + 2 | 0)) {
      return /* Node */[
              /* l */l,
              /* v */x,
              /* d */d,
              /* r */r,
              /* h */hl >= hr ? hl + 1 | 0 : hr + 1 | 0
            ];
    }
    if (r) {
      var rr = r[/* r */3];
      var rd = r[/* d */2];
      var rv = r[/* v */1];
      var rl = r[/* l */0];
      if (height(rr) >= height(rl)) {
        return create(create(l, x, d, rl), rv, rd, rr);
      }
      if (rl) {
        return create(create(l, x, d, rl[/* l */0]), rl[/* v */1], rl[/* d */2], create(rl[/* r */3], rv, rd, rr));
      }
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Map.bal",
            Error: new Error()
          };
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Map.bal",
          Error: new Error()
        };
  };
  var is_empty = function (param) {
    if (param) {
      return false;
    } else {
      return true;
    }
  };
  var add = function (x, data, m) {
    if (!m) {
      return /* Node */[
              /* l : Empty */0,
              /* v */x,
              /* d */data,
              /* r : Empty */0,
              /* h */1
            ];
    }
    var r = m[/* r */3];
    var d = m[/* d */2];
    var v = m[/* v */1];
    var l = m[/* l */0];
    var c = Curry._2(funarg.compare, x, v);
    if (c === 0) {
      if (d === data) {
        return m;
      } else {
        return /* Node */[
                /* l */l,
                /* v */x,
                /* d */data,
                /* r */r,
                /* h */m[/* h */4]
              ];
      }
    }
    if (c < 0) {
      var ll = add(x, data, l);
      if (l === ll) {
        return m;
      } else {
        return bal(ll, v, d, r);
      }
    }
    var rr = add(x, data, r);
    if (r === rr) {
      return m;
    } else {
      return bal(l, v, d, rr);
    }
  };
  var find = function (x, _param) {
    while(true) {
      var param = _param;
      if (param) {
        var c = Curry._2(funarg.compare, x, param[/* v */1]);
        if (c === 0) {
          return param[/* d */2];
        }
        _param = c < 0 ? param[/* l */0] : param[/* r */3];
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
          var _d0 = param[/* d */2];
          var _param$1 = param[/* l */0];
          while(true) {
            var param$1 = _param$1;
            var d0 = _d0;
            var v0 = _v0;
            if (!param$1) {
              return /* tuple */[
                      v0,
                      d0
                    ];
            }
            var v$1 = param$1[/* v */1];
            if (Curry._1(f, v$1)) {
              _param$1 = param$1[/* l */0];
              _d0 = param$1[/* d */2];
              _v0 = v$1;
              continue ;
            }
            _param$1 = param$1[/* r */3];
            continue ;
          };
        }
        _param = param[/* r */3];
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
        var _d0 = param[/* d */2];
        var _param$1 = param[/* l */0];
        while(true) {
          var param$1 = _param$1;
          var d0 = _d0;
          var v0 = _v0;
          if (!param$1) {
            return /* tuple */[
                    v0,
                    d0
                  ];
          }
          var v$1 = param$1[/* v */1];
          if (Curry._1(f, v$1)) {
            _param$1 = param$1[/* l */0];
            _d0 = param$1[/* d */2];
            _v0 = v$1;
            continue ;
          }
          _param$1 = param$1[/* r */3];
          continue ;
        };
      }
      _param = param[/* r */3];
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
          var _d0 = param[/* d */2];
          var _param$1 = param[/* r */3];
          while(true) {
            var param$1 = _param$1;
            var d0 = _d0;
            var v0 = _v0;
            if (!param$1) {
              return /* tuple */[
                      v0,
                      d0
                    ];
            }
            var v$1 = param$1[/* v */1];
            if (Curry._1(f, v$1)) {
              _param$1 = param$1[/* r */3];
              _d0 = param$1[/* d */2];
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
        var _d0 = param[/* d */2];
        var _param$1 = param[/* r */3];
        while(true) {
          var param$1 = _param$1;
          var d0 = _d0;
          var v0 = _v0;
          if (!param$1) {
            return /* tuple */[
                    v0,
                    d0
                  ];
          }
          var v$1 = param$1[/* v */1];
          if (Curry._1(f, v$1)) {
            _param$1 = param$1[/* r */3];
            _d0 = param$1[/* d */2];
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
      var c = Curry._2(funarg.compare, x, param[/* v */1]);
      if (c === 0) {
        return Caml_option.some(param[/* d */2]);
      }
      _param = c < 0 ? param[/* l */0] : param[/* r */3];
      continue ;
    };
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
      _param = c < 0 ? param[/* l */0] : param[/* r */3];
      continue ;
    };
  };
  var min_binding = function (_param) {
    while(true) {
      var param = _param;
      if (param) {
        var l = param[/* l */0];
        if (!l) {
          return /* tuple */[
                  param[/* v */1],
                  param[/* d */2]
                ];
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
  var min_binding_opt = function (_param) {
    while(true) {
      var param = _param;
      if (!param) {
        return ;
      }
      var l = param[/* l */0];
      if (!l) {
        return /* tuple */[
                param[/* v */1],
                param[/* d */2]
              ];
      }
      _param = l;
      continue ;
    };
  };
  var max_binding = function (_param) {
    while(true) {
      var param = _param;
      if (param) {
        var r = param[/* r */3];
        if (!r) {
          return /* tuple */[
                  param[/* v */1],
                  param[/* d */2]
                ];
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
  var max_binding_opt = function (_param) {
    while(true) {
      var param = _param;
      if (!param) {
        return ;
      }
      var r = param[/* r */3];
      if (!r) {
        return /* tuple */[
                param[/* v */1],
                param[/* d */2]
              ];
      }
      _param = r;
      continue ;
    };
  };
  var remove_min_binding = function (param) {
    if (param) {
      var l = param[/* l */0];
      if (l) {
        return bal(remove_min_binding(l), param[/* v */1], param[/* d */2], param[/* r */3]);
      } else {
        return param[/* r */3];
      }
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Map.remove_min_elt",
          Error: new Error()
        };
  };
  var merge = function (t1, t2) {
    if (!t1) {
      return t2;
    }
    if (!t2) {
      return t1;
    }
    var match = min_binding(t2);
    return bal(t1, match[0], match[1], remove_min_binding(t2));
  };
  var remove = function (x, m) {
    if (!m) {
      return /* Empty */0;
    }
    var r = m[/* r */3];
    var d = m[/* d */2];
    var v = m[/* v */1];
    var l = m[/* l */0];
    var c = Curry._2(funarg.compare, x, v);
    if (c === 0) {
      return merge(l, r);
    }
    if (c < 0) {
      var ll = remove(x, l);
      if (l === ll) {
        return m;
      } else {
        return bal(ll, v, d, r);
      }
    }
    var rr = remove(x, r);
    if (r === rr) {
      return m;
    } else {
      return bal(l, v, d, rr);
    }
  };
  var update = function (x, f, m) {
    if (m) {
      var r = m[/* r */3];
      var d = m[/* d */2];
      var v = m[/* v */1];
      var l = m[/* l */0];
      var c = Curry._2(funarg.compare, x, v);
      if (c === 0) {
        var data = Curry._1(f, Caml_option.some(d));
        if (data === undefined) {
          return merge(l, r);
        }
        var data$1 = Caml_option.valFromOption(data);
        if (d === data$1) {
          return m;
        } else {
          return /* Node */[
                  /* l */l,
                  /* v */x,
                  /* d */data$1,
                  /* r */r,
                  /* h */m[/* h */4]
                ];
        }
      }
      if (c < 0) {
        var ll = update(x, f, l);
        if (l === ll) {
          return m;
        } else {
          return bal(ll, v, d, r);
        }
      }
      var rr = update(x, f, r);
      if (r === rr) {
        return m;
      } else {
        return bal(l, v, d, rr);
      }
    }
    var data$2 = Curry._1(f, undefined);
    if (data$2 !== undefined) {
      return /* Node */[
              /* l : Empty */0,
              /* v */x,
              /* d */Caml_option.valFromOption(data$2),
              /* r : Empty */0,
              /* h */1
            ];
    } else {
      return /* Empty */0;
    }
  };
  var iter = function (f, _param) {
    while(true) {
      var param = _param;
      if (!param) {
        return ;
      }
      iter(f, param[/* l */0]);
      Curry._2(f, param[/* v */1], param[/* d */2]);
      _param = param[/* r */3];
      continue ;
    };
  };
  var map = function (f, param) {
    if (!param) {
      return /* Empty */0;
    }
    var l$prime = map(f, param[/* l */0]);
    var d$prime = Curry._1(f, param[/* d */2]);
    var r$prime = map(f, param[/* r */3]);
    return /* Node */[
            /* l */l$prime,
            /* v */param[/* v */1],
            /* d */d$prime,
            /* r */r$prime,
            /* h */param[/* h */4]
          ];
  };
  var mapi = function (f, param) {
    if (!param) {
      return /* Empty */0;
    }
    var v = param[/* v */1];
    var l$prime = mapi(f, param[/* l */0]);
    var d$prime = Curry._2(f, v, param[/* d */2]);
    var r$prime = mapi(f, param[/* r */3]);
    return /* Node */[
            /* l */l$prime,
            /* v */v,
            /* d */d$prime,
            /* r */r$prime,
            /* h */param[/* h */4]
          ];
  };
  var fold = function (f, _m, _accu) {
    while(true) {
      var accu = _accu;
      var m = _m;
      if (!m) {
        return accu;
      }
      _accu = Curry._3(f, m[/* v */1], m[/* d */2], fold(f, m[/* l */0], accu));
      _m = m[/* r */3];
      continue ;
    };
  };
  var for_all = function (p, _param) {
    while(true) {
      var param = _param;
      if (!param) {
        return true;
      }
      if (!Curry._2(p, param[/* v */1], param[/* d */2])) {
        return false;
      }
      if (!for_all(p, param[/* l */0])) {
        return false;
      }
      _param = param[/* r */3];
      continue ;
    };
  };
  var exists = function (p, _param) {
    while(true) {
      var param = _param;
      if (!param) {
        return false;
      }
      if (Curry._2(p, param[/* v */1], param[/* d */2])) {
        return true;
      }
      if (exists(p, param[/* l */0])) {
        return true;
      }
      _param = param[/* r */3];
      continue ;
    };
  };
  var add_min_binding = function (k, x, param) {
    if (param) {
      return bal(add_min_binding(k, x, param[/* l */0]), param[/* v */1], param[/* d */2], param[/* r */3]);
    } else {
      return singleton(k, x);
    }
  };
  var add_max_binding = function (k, x, param) {
    if (param) {
      return bal(param[/* l */0], param[/* v */1], param[/* d */2], add_max_binding(k, x, param[/* r */3]));
    } else {
      return singleton(k, x);
    }
  };
  var join = function (l, v, d, r) {
    if (!l) {
      return add_min_binding(v, d, r);
    }
    if (!r) {
      return add_max_binding(v, d, l);
    }
    var rh = r[/* h */4];
    var lh = l[/* h */4];
    if (lh > (rh + 2 | 0)) {
      return bal(l[/* l */0], l[/* v */1], l[/* d */2], join(l[/* r */3], v, d, r));
    } else if (rh > (lh + 2 | 0)) {
      return bal(join(l, v, d, r[/* l */0]), r[/* v */1], r[/* d */2], r[/* r */3]);
    } else {
      return create(l, v, d, r);
    }
  };
  var concat = function (t1, t2) {
    if (!t1) {
      return t2;
    }
    if (!t2) {
      return t1;
    }
    var match = min_binding(t2);
    return join(t1, match[0], match[1], remove_min_binding(t2));
  };
  var concat_or_join = function (t1, v, d, t2) {
    if (d !== undefined) {
      return join(t1, v, Caml_option.valFromOption(d), t2);
    } else {
      return concat(t1, t2);
    }
  };
  var split = function (x, param) {
    if (!param) {
      return /* tuple */[
              /* Empty */0,
              undefined,
              /* Empty */0
            ];
    }
    var r = param[/* r */3];
    var d = param[/* d */2];
    var v = param[/* v */1];
    var l = param[/* l */0];
    var c = Curry._2(funarg.compare, x, v);
    if (c === 0) {
      return /* tuple */[
              l,
              Caml_option.some(d),
              r
            ];
    }
    if (c < 0) {
      var match = split(x, l);
      return /* tuple */[
              match[0],
              match[1],
              join(match[2], v, d, r)
            ];
    }
    var match$1 = split(x, r);
    return /* tuple */[
            join(l, v, d, match$1[0]),
            match$1[1],
            match$1[2]
          ];
  };
  var merge$1 = function (f, s1, s2) {
    if (s1) {
      var v1 = s1[/* v */1];
      if (s1[/* h */4] >= height(s2)) {
        var match = split(v1, s2);
        return concat_or_join(merge$1(f, s1[/* l */0], match[0]), v1, Curry._3(f, v1, Caml_option.some(s1[/* d */2]), match[1]), merge$1(f, s1[/* r */3], match[2]));
      }
      
    } else if (!s2) {
      return /* Empty */0;
    }
    if (s2) {
      var v2 = s2[/* v */1];
      var match$1 = split(v2, s1);
      return concat_or_join(merge$1(f, match$1[0], s2[/* l */0]), v2, Curry._3(f, v2, match$1[1], Caml_option.some(s2[/* d */2])), merge$1(f, match$1[2], s2[/* r */3]));
    }
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: /* tuple */[
            "map.ml",
            393,
            10
          ],
          Error: new Error()
        };
  };
  var union = function (f, s1, s2) {
    if (!s1) {
      return s2;
    }
    if (!s2) {
      return s1;
    }
    var d2 = s2[/* d */2];
    var v2 = s2[/* v */1];
    var d1 = s1[/* d */2];
    var v1 = s1[/* v */1];
    if (s1[/* h */4] >= s2[/* h */4]) {
      var match = split(v1, s2);
      var d2$1 = match[1];
      var l = union(f, s1[/* l */0], match[0]);
      var r = union(f, s1[/* r */3], match[2]);
      if (d2$1 !== undefined) {
        return concat_or_join(l, v1, Curry._3(f, v1, d1, Caml_option.valFromOption(d2$1)), r);
      } else {
        return join(l, v1, d1, r);
      }
    }
    var match$1 = split(v2, s1);
    var d1$1 = match$1[1];
    var l$1 = union(f, match$1[0], s2[/* l */0]);
    var r$1 = union(f, match$1[2], s2[/* r */3]);
    if (d1$1 !== undefined) {
      return concat_or_join(l$1, v2, Curry._3(f, v2, Caml_option.valFromOption(d1$1), d2), r$1);
    } else {
      return join(l$1, v2, d2, r$1);
    }
  };
  var filter = function (p, m) {
    if (!m) {
      return /* Empty */0;
    }
    var r = m[/* r */3];
    var d = m[/* d */2];
    var v = m[/* v */1];
    var l = m[/* l */0];
    var l$prime = filter(p, l);
    var pvd = Curry._2(p, v, d);
    var r$prime = filter(p, r);
    if (pvd) {
      if (l === l$prime && r === r$prime) {
        return m;
      } else {
        return join(l$prime, v, d, r$prime);
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
    var d = param[/* d */2];
    var v = param[/* v */1];
    var match = partition(p, param[/* l */0]);
    var lf = match[1];
    var lt = match[0];
    var pvd = Curry._2(p, v, d);
    var match$1 = partition(p, param[/* r */3]);
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
  };
  var cons_enum = function (_m, _e) {
    while(true) {
      var e = _e;
      var m = _m;
      if (!m) {
        return e;
      }
      _e = /* More */[
        m[/* v */1],
        m[/* d */2],
        m[/* r */3],
        e
      ];
      _m = m[/* l */0];
      continue ;
    };
  };
  var compare = function (cmp, m1, m2) {
    var _e1 = cons_enum(m1, /* End */0);
    var _e2 = cons_enum(m2, /* End */0);
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
      var c$1 = Curry._2(cmp, e1[1], e2[1]);
      if (c$1 !== 0) {
        return c$1;
      }
      _e2 = cons_enum(e2[2], e2[3]);
      _e1 = cons_enum(e1[2], e1[3]);
      continue ;
    };
  };
  var equal = function (cmp, m1, m2) {
    var _e1 = cons_enum(m1, /* End */0);
    var _e2 = cons_enum(m2, /* End */0);
    while(true) {
      var e2 = _e2;
      var e1 = _e1;
      if (!e1) {
        if (e2) {
          return false;
        } else {
          return true;
        }
      }
      if (!e2) {
        return false;
      }
      if (Curry._2(funarg.compare, e1[0], e2[0]) !== 0) {
        return false;
      }
      if (!Curry._2(cmp, e1[1], e2[1])) {
        return false;
      }
      _e2 = cons_enum(e2[2], e2[3]);
      _e1 = cons_enum(e1[2], e1[3]);
      continue ;
    };
  };
  var cardinal = function (param) {
    if (param) {
      return (cardinal(param[/* l */0]) + 1 | 0) + cardinal(param[/* r */3]) | 0;
    } else {
      return 0;
    }
  };
  var bindings_aux = function (_accu, _param) {
    while(true) {
      var param = _param;
      var accu = _accu;
      if (!param) {
        return accu;
      }
      _param = param[/* l */0];
      _accu = /* :: */[
        /* tuple */[
          param[/* v */1],
          param[/* d */2]
        ],
        bindings_aux(accu, param[/* r */3])
      ];
      continue ;
    };
  };
  var bindings = function (s) {
    return bindings_aux(/* [] */0, s);
  };
  return {
          empty: /* Empty */0,
          is_empty: is_empty,
          mem: mem,
          add: add,
          update: update,
          singleton: singleton,
          remove: remove,
          merge: merge$1,
          union: union,
          compare: compare,
          equal: equal,
          iter: iter,
          fold: fold,
          for_all: for_all,
          exists: exists,
          filter: filter,
          partition: partition,
          cardinal: cardinal,
          bindings: bindings,
          min_binding: min_binding,
          min_binding_opt: min_binding_opt,
          max_binding: max_binding,
          max_binding_opt: max_binding_opt,
          choose: min_binding,
          choose_opt: min_binding_opt,
          split: split,
          find: find,
          find_opt: find_opt,
          find_first: find_first,
          find_first_opt: find_first_opt,
          find_last: find_last,
          find_last_opt: find_last_opt,
          map: map,
          mapi: mapi
        };
}

exports.Make = Make;
/* No side effect */
