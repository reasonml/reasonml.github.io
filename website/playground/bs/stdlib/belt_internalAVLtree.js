'use strict';

var Curry = require("./curry.js");
var Caml_option = require("./caml_option.js");
var Belt_SortArray = require("./belt_SortArray.js");

function treeHeight(n) {
  if (n !== undefined) {
    return n.height;
  } else {
    return 0;
  }
}

function copy(n) {
  if (n !== undefined) {
    return {
            key: n.key,
            value: n.value,
            height: n.height,
            left: copy(n.left),
            right: copy(n.right)
          };
  } else {
    return n;
  }
}

function create(l, x, d, r) {
  var hl = treeHeight(l);
  var hr = treeHeight(r);
  return {
          key: x,
          value: d,
          height: hl >= hr ? hl + 1 | 0 : hr + 1 | 0,
          left: l,
          right: r
        };
}

function singleton(x, d) {
  return {
          key: x,
          value: d,
          height: 1,
          left: undefined,
          right: undefined
        };
}

function heightGe(l, r) {
  if (r !== undefined) {
    if (l !== undefined) {
      return l.height >= r.height;
    } else {
      return false;
    }
  } else {
    return true;
  }
}

function updateValue(n, newValue) {
  if (n.value === newValue) {
    return n;
  } else {
    return {
            key: n.key,
            value: newValue,
            height: n.height,
            left: n.left,
            right: n.right
          };
  }
}

function bal(l, x, d, r) {
  var hl = l !== undefined ? l.height : 0;
  var hr = r !== undefined ? r.height : 0;
  if (hl > (hr + 2 | 0)) {
    var lv = l.key;
    var ld = l.value;
    var ll = l.left;
    var lr = l.right;
    if (treeHeight(ll) >= treeHeight(lr)) {
      return create(ll, lv, ld, create(lr, x, d, r));
    } else {
      return create(create(ll, lv, ld, lr.left), lr.key, lr.value, create(lr.right, x, d, r));
    }
  }
  if (hr <= (hl + 2 | 0)) {
    return {
            key: x,
            value: d,
            height: hl >= hr ? hl + 1 | 0 : hr + 1 | 0,
            left: l,
            right: r
          };
  }
  var rv = r.key;
  var rd = r.value;
  var rl = r.left;
  var rr = r.right;
  if (treeHeight(rr) >= treeHeight(rl)) {
    return create(create(l, x, d, rl), rv, rd, rr);
  } else {
    return create(create(l, x, d, rl.left), rl.key, rl.value, create(rl.right, rv, rd, rr));
  }
}

function minKey0Aux(_n) {
  while(true) {
    var n = _n;
    var n$1 = n.left;
    if (n$1 === undefined) {
      return n.key;
    }
    _n = n$1;
    continue ;
  };
}

function minKey(n) {
  if (n !== undefined) {
    return Caml_option.some(minKey0Aux(n));
  }
  
}

function minKeyUndefined(n) {
  if (n !== undefined) {
    return minKey0Aux(n);
  }
  
}

function maxKey0Aux(_n) {
  while(true) {
    var n = _n;
    var n$1 = n.right;
    if (n$1 === undefined) {
      return n.key;
    }
    _n = n$1;
    continue ;
  };
}

function maxKey(n) {
  if (n !== undefined) {
    return Caml_option.some(maxKey0Aux(n));
  }
  
}

function maxKeyUndefined(n) {
  if (n !== undefined) {
    return maxKey0Aux(n);
  }
  
}

function minKV0Aux(_n) {
  while(true) {
    var n = _n;
    var n$1 = n.left;
    if (n$1 === undefined) {
      return /* tuple */[
              n.key,
              n.value
            ];
    }
    _n = n$1;
    continue ;
  };
}

function minimum(n) {
  if (n !== undefined) {
    return minKV0Aux(n);
  }
  
}

function minUndefined(n) {
  if (n !== undefined) {
    return minKV0Aux(n);
  }
  
}

function maxKV0Aux(_n) {
  while(true) {
    var n = _n;
    var n$1 = n.right;
    if (n$1 === undefined) {
      return /* tuple */[
              n.key,
              n.value
            ];
    }
    _n = n$1;
    continue ;
  };
}

function maximum(n) {
  if (n !== undefined) {
    return maxKV0Aux(n);
  }
  
}

function maxUndefined(n) {
  if (n !== undefined) {
    return maxKV0Aux(n);
  }
  
}

function removeMinAuxWithRef(n, kr, vr) {
  var ln = n.left;
  var rn = n.right;
  var kn = n.key;
  var vn = n.value;
  if (ln !== undefined) {
    return bal(removeMinAuxWithRef(ln, kr, vr), kn, vn, rn);
  } else {
    kr.contents = kn;
    vr.contents = vn;
    return rn;
  }
}

function isEmpty(x) {
  return x === undefined;
}

function stackAllLeft(_v, _s) {
  while(true) {
    var s = _s;
    var v = _v;
    if (v === undefined) {
      return s;
    }
    _s = /* :: */[
      v,
      s
    ];
    _v = v.left;
    continue ;
  };
}

function findFirstByU(n, p) {
  if (n === undefined) {
    return ;
  }
  var left = findFirstByU(n.left, p);
  if (left !== undefined) {
    return left;
  }
  var v = n.key;
  var d = n.value;
  var pvd = p(v, d);
  if (pvd) {
    return /* tuple */[
            v,
            d
          ];
  }
  var right = findFirstByU(n.right, p);
  if (right !== undefined) {
    return right;
  }
  
}

function findFirstBy(n, p) {
  return findFirstByU(n, Curry.__2(p));
}

function forEachU(_n, f) {
  while(true) {
    var n = _n;
    if (n === undefined) {
      return ;
    }
    forEachU(n.left, f);
    f(n.key, n.value);
    _n = n.right;
    continue ;
  };
}

function forEach(n, f) {
  return forEachU(n, Curry.__2(f));
}

function mapU(n, f) {
  if (n === undefined) {
    return ;
  }
  var newLeft = mapU(n.left, f);
  var newD = f(n.value);
  var newRight = mapU(n.right, f);
  return {
          key: n.key,
          value: newD,
          height: n.height,
          left: newLeft,
          right: newRight
        };
}

function map(n, f) {
  return mapU(n, Curry.__1(f));
}

function mapWithKeyU(n, f) {
  if (n === undefined) {
    return ;
  }
  var key = n.key;
  var newLeft = mapWithKeyU(n.left, f);
  var newD = f(key, n.value);
  var newRight = mapWithKeyU(n.right, f);
  return {
          key: key,
          value: newD,
          height: n.height,
          left: newLeft,
          right: newRight
        };
}

function mapWithKey(n, f) {
  return mapWithKeyU(n, Curry.__2(f));
}

function reduceU(_m, _accu, f) {
  while(true) {
    var accu = _accu;
    var m = _m;
    if (m === undefined) {
      return accu;
    }
    var v = m.key;
    var d = m.value;
    var l = m.left;
    var r = m.right;
    _accu = f(reduceU(l, accu, f), v, d);
    _m = r;
    continue ;
  };
}

function reduce(m, accu, f) {
  return reduceU(m, accu, Curry.__3(f));
}

function everyU(_n, p) {
  while(true) {
    var n = _n;
    if (n === undefined) {
      return true;
    }
    if (!p(n.key, n.value)) {
      return false;
    }
    if (!everyU(n.left, p)) {
      return false;
    }
    _n = n.right;
    continue ;
  };
}

function every(n, p) {
  return everyU(n, Curry.__2(p));
}

function someU(_n, p) {
  while(true) {
    var n = _n;
    if (n === undefined) {
      return false;
    }
    if (p(n.key, n.value)) {
      return true;
    }
    if (someU(n.left, p)) {
      return true;
    }
    _n = n.right;
    continue ;
  };
}

function some(n, p) {
  return someU(n, Curry.__2(p));
}

function addMinElement(n, k, v) {
  if (n !== undefined) {
    return bal(addMinElement(n.left, k, v), n.key, n.value, n.right);
  } else {
    return singleton(k, v);
  }
}

function addMaxElement(n, k, v) {
  if (n !== undefined) {
    return bal(n.left, n.key, n.value, addMaxElement(n.right, k, v));
  } else {
    return singleton(k, v);
  }
}

function join(ln, v, d, rn) {
  if (ln === undefined) {
    return addMinElement(rn, v, d);
  }
  if (rn === undefined) {
    return addMaxElement(ln, v, d);
  }
  var lv = ln.key;
  var ld = ln.value;
  var lh = ln.height;
  var ll = ln.left;
  var lr = ln.right;
  var rv = rn.key;
  var rd = rn.value;
  var rh = rn.height;
  var rl = rn.left;
  var rr = rn.right;
  if (lh > (rh + 2 | 0)) {
    return bal(ll, lv, ld, join(lr, v, d, rn));
  } else if (rh > (lh + 2 | 0)) {
    return bal(join(ln, v, d, rl), rv, rd, rr);
  } else {
    return create(ln, v, d, rn);
  }
}

function concat(t1, t2) {
  if (t1 === undefined) {
    return t2;
  }
  if (t2 === undefined) {
    return t1;
  }
  var kr = {
    contents: t2.key
  };
  var vr = {
    contents: t2.value
  };
  var t2r = removeMinAuxWithRef(t2, kr, vr);
  return join(t1, kr.contents, vr.contents, t2r);
}

function concatOrJoin(t1, v, d, t2) {
  if (d !== undefined) {
    return join(t1, v, Caml_option.valFromOption(d), t2);
  } else {
    return concat(t1, t2);
  }
}

function keepSharedU(n, p) {
  if (n === undefined) {
    return ;
  }
  var v = n.key;
  var d = n.value;
  var newLeft = keepSharedU(n.left, p);
  var pvd = p(v, d);
  var newRight = keepSharedU(n.right, p);
  if (pvd) {
    return join(newLeft, v, d, newRight);
  } else {
    return concat(newLeft, newRight);
  }
}

function keepShared(n, p) {
  return keepSharedU(n, Curry.__2(p));
}

function keepMapU(n, p) {
  if (n === undefined) {
    return ;
  }
  var v = n.key;
  var d = n.value;
  var newLeft = keepMapU(n.left, p);
  var pvd = p(v, d);
  var newRight = keepMapU(n.right, p);
  if (pvd !== undefined) {
    return join(newLeft, v, Caml_option.valFromOption(pvd), newRight);
  } else {
    return concat(newLeft, newRight);
  }
}

function keepMap(n, p) {
  return keepMapU(n, Curry.__2(p));
}

function partitionSharedU(n, p) {
  if (n === undefined) {
    return /* tuple */[
            undefined,
            undefined
          ];
  }
  var key = n.key;
  var value = n.value;
  var match = partitionSharedU(n.left, p);
  var lf = match[1];
  var lt = match[0];
  var pvd = p(key, value);
  var match$1 = partitionSharedU(n.right, p);
  var rf = match$1[1];
  var rt = match$1[0];
  if (pvd) {
    return /* tuple */[
            join(lt, key, value, rt),
            concat(lf, rf)
          ];
  } else {
    return /* tuple */[
            concat(lt, rt),
            join(lf, key, value, rf)
          ];
  }
}

function partitionShared(n, p) {
  return partitionSharedU(n, Curry.__2(p));
}

function lengthNode(n) {
  var l = n.left;
  var r = n.right;
  var sizeL = l !== undefined ? lengthNode(l) : 0;
  var sizeR = r !== undefined ? lengthNode(r) : 0;
  return (1 + sizeL | 0) + sizeR | 0;
}

function size(n) {
  if (n !== undefined) {
    return lengthNode(n);
  } else {
    return 0;
  }
}

function toListAux(_n, _accu) {
  while(true) {
    var accu = _accu;
    var n = _n;
    if (n === undefined) {
      return accu;
    }
    var k = n.key;
    var v = n.value;
    var l = n.left;
    var r = n.right;
    _accu = /* :: */[
      /* tuple */[
        k,
        v
      ],
      toListAux(r, accu)
    ];
    _n = l;
    continue ;
  };
}

function toList(s) {
  return toListAux(s, /* [] */0);
}

function checkInvariantInternal(_v) {
  while(true) {
    var v = _v;
    if (v === undefined) {
      return ;
    }
    var l = v.left;
    var r = v.right;
    var diff = treeHeight(l) - treeHeight(r) | 0;
    if (!(diff <= 2 && diff >= -2)) {
      throw new Error("File \"belt_internalAVLtree.ml\", line 381, characters 6-12");
    }
    checkInvariantInternal(l);
    _v = r;
    continue ;
  };
}

function fillArrayKey(_n, _i, arr) {
  while(true) {
    var i = _i;
    var n = _n;
    var v = n.key;
    var l = n.left;
    var r = n.right;
    var next = l !== undefined ? fillArrayKey(l, i, arr) : i;
    arr[next] = v;
    var rnext = next + 1 | 0;
    if (r === undefined) {
      return rnext;
    }
    _i = rnext;
    _n = r;
    continue ;
  };
}

function fillArrayValue(_n, _i, arr) {
  while(true) {
    var i = _i;
    var n = _n;
    var l = n.left;
    var r = n.right;
    var next = l !== undefined ? fillArrayValue(l, i, arr) : i;
    arr[next] = n.value;
    var rnext = next + 1 | 0;
    if (r === undefined) {
      return rnext;
    }
    _i = rnext;
    _n = r;
    continue ;
  };
}

function fillArray(_n, _i, arr) {
  while(true) {
    var i = _i;
    var n = _n;
    var l = n.left;
    var v = n.key;
    var r = n.right;
    var next = l !== undefined ? fillArray(l, i, arr) : i;
    arr[next] = /* tuple */[
      v,
      n.value
    ];
    var rnext = next + 1 | 0;
    if (r === undefined) {
      return rnext;
    }
    _i = rnext;
    _n = r;
    continue ;
  };
}

function toArray(n) {
  if (n === undefined) {
    return [];
  }
  var size = lengthNode(n);
  var v = new Array(size);
  fillArray(n, 0, v);
  return v;
}

function keysToArray(n) {
  if (n === undefined) {
    return [];
  }
  var size = lengthNode(n);
  var v = new Array(size);
  fillArrayKey(n, 0, v);
  return v;
}

function valuesToArray(n) {
  if (n === undefined) {
    return [];
  }
  var size = lengthNode(n);
  var v = new Array(size);
  fillArrayValue(n, 0, v);
  return v;
}

function fromSortedArrayRevAux(arr, off, len) {
  switch (len) {
    case 0 :
        return ;
    case 1 :
        var match = arr[off];
        return singleton(match[0], match[1]);
    case 2 :
        var match_000 = arr[off];
        var match_001 = arr[off - 1 | 0];
        var match$1 = match_001;
        var match$2 = match_000;
        return {
                key: match$1[0],
                value: match$1[1],
                height: 2,
                left: singleton(match$2[0], match$2[1]),
                right: undefined
              };
    case 3 :
        var match_000$1 = arr[off];
        var match_001$1 = arr[off - 1 | 0];
        var match_002 = arr[off - 2 | 0];
        var match$3 = match_002;
        var match$4 = match_001$1;
        var match$5 = match_000$1;
        return {
                key: match$4[0],
                value: match$4[1],
                height: 2,
                left: singleton(match$5[0], match$5[1]),
                right: singleton(match$3[0], match$3[1])
              };
    default:
      var nl = len / 2 | 0;
      var left = fromSortedArrayRevAux(arr, off, nl);
      var match$6 = arr[off - nl | 0];
      var right = fromSortedArrayRevAux(arr, (off - nl | 0) - 1 | 0, (len - nl | 0) - 1 | 0);
      return create(left, match$6[0], match$6[1], right);
  }
}

function fromSortedArrayAux(arr, off, len) {
  switch (len) {
    case 0 :
        return ;
    case 1 :
        var match = arr[off];
        return singleton(match[0], match[1]);
    case 2 :
        var match_000 = arr[off];
        var match_001 = arr[off + 1 | 0];
        var match$1 = match_001;
        var match$2 = match_000;
        return {
                key: match$1[0],
                value: match$1[1],
                height: 2,
                left: singleton(match$2[0], match$2[1]),
                right: undefined
              };
    case 3 :
        var match_000$1 = arr[off];
        var match_001$1 = arr[off + 1 | 0];
        var match_002 = arr[off + 2 | 0];
        var match$3 = match_002;
        var match$4 = match_001$1;
        var match$5 = match_000$1;
        return {
                key: match$4[0],
                value: match$4[1],
                height: 2,
                left: singleton(match$5[0], match$5[1]),
                right: singleton(match$3[0], match$3[1])
              };
    default:
      var nl = len / 2 | 0;
      var left = fromSortedArrayAux(arr, off, nl);
      var match$6 = arr[off + nl | 0];
      var right = fromSortedArrayAux(arr, (off + nl | 0) + 1 | 0, (len - nl | 0) - 1 | 0);
      return create(left, match$6[0], match$6[1], right);
  }
}

function fromSortedArrayUnsafe(arr) {
  return fromSortedArrayAux(arr, 0, arr.length);
}

function cmpU(s1, s2, kcmp, vcmp) {
  var len1 = size(s1);
  var len2 = size(s2);
  if (len1 === len2) {
    var _e1 = stackAllLeft(s1, /* [] */0);
    var _e2 = stackAllLeft(s2, /* [] */0);
    while(true) {
      var e2 = _e2;
      var e1 = _e1;
      if (!e1) {
        return 0;
      }
      if (!e2) {
        return 0;
      }
      var h2 = e2[0];
      var h1 = e1[0];
      var c = kcmp(h1.key, h2.key);
      if (c !== 0) {
        return c;
      }
      var cx = vcmp(h1.value, h2.value);
      if (cx !== 0) {
        return cx;
      }
      _e2 = stackAllLeft(h2.right, e2[1]);
      _e1 = stackAllLeft(h1.right, e1[1]);
      continue ;
    };
  } else if (len1 < len2) {
    return -1;
  } else {
    return 1;
  }
}

function cmp(s1, s2, kcmp, vcmp) {
  return cmpU(s1, s2, kcmp, Curry.__2(vcmp));
}

function eqU(s1, s2, kcmp, veq) {
  var len1 = size(s1);
  var len2 = size(s2);
  if (len1 === len2) {
    var _e1 = stackAllLeft(s1, /* [] */0);
    var _e2 = stackAllLeft(s2, /* [] */0);
    while(true) {
      var e2 = _e2;
      var e1 = _e1;
      if (!e1) {
        return true;
      }
      if (!e2) {
        return true;
      }
      var h2 = e2[0];
      var h1 = e1[0];
      if (!(kcmp(h1.key, h2.key) === 0 && veq(h1.value, h2.value))) {
        return false;
      }
      _e2 = stackAllLeft(h2.right, e2[1]);
      _e1 = stackAllLeft(h1.right, e1[1]);
      continue ;
    };
  } else {
    return false;
  }
}

function eq(s1, s2, kcmp, veq) {
  return eqU(s1, s2, kcmp, Curry.__2(veq));
}

function get(_n, x, cmp) {
  while(true) {
    var n = _n;
    if (n === undefined) {
      return ;
    }
    var v = n.key;
    var c = cmp(x, v);
    if (c === 0) {
      return Caml_option.some(n.value);
    }
    _n = c < 0 ? n.left : n.right;
    continue ;
  };
}

function getUndefined(_n, x, cmp) {
  while(true) {
    var n = _n;
    if (n === undefined) {
      return ;
    }
    var v = n.key;
    var c = cmp(x, v);
    if (c === 0) {
      return n.value;
    }
    _n = c < 0 ? n.left : n.right;
    continue ;
  };
}

function getExn(_n, x, cmp) {
  while(true) {
    var n = _n;
    if (n !== undefined) {
      var v = n.key;
      var c = cmp(x, v);
      if (c === 0) {
        return n.value;
      }
      _n = c < 0 ? n.left : n.right;
      continue ;
    }
    throw new Error("getExn0");
  };
}

function getWithDefault(_n, x, def, cmp) {
  while(true) {
    var n = _n;
    if (n === undefined) {
      return def;
    }
    var v = n.key;
    var c = cmp(x, v);
    if (c === 0) {
      return n.value;
    }
    _n = c < 0 ? n.left : n.right;
    continue ;
  };
}

function has(_n, x, cmp) {
  while(true) {
    var n = _n;
    if (n === undefined) {
      return false;
    }
    var v = n.key;
    var c = cmp(x, v);
    if (c === 0) {
      return true;
    }
    _n = c < 0 ? n.left : n.right;
    continue ;
  };
}

function rotateWithLeftChild(k2) {
  var k1 = k2.left;
  k2.left = k1.right;
  k1.right = k2;
  var hlk2 = treeHeight(k2.left);
  var hrk2 = treeHeight(k2.right);
  k2.height = (
    hlk2 > hrk2 ? hlk2 : hrk2
  ) + 1 | 0;
  var hlk1 = treeHeight(k1.left);
  var hk2 = k2.height;
  k1.height = (
    hlk1 > hk2 ? hlk1 : hk2
  ) + 1 | 0;
  return k1;
}

function rotateWithRightChild(k1) {
  var k2 = k1.right;
  k1.right = k2.left;
  k2.left = k1;
  var hlk1 = treeHeight(k1.left);
  var hrk1 = treeHeight(k1.right);
  k1.height = (
    hlk1 > hrk1 ? hlk1 : hrk1
  ) + 1 | 0;
  var hrk2 = treeHeight(k2.right);
  var hk1 = k1.height;
  k2.height = (
    hrk2 > hk1 ? hrk2 : hk1
  ) + 1 | 0;
  return k2;
}

function doubleWithLeftChild(k3) {
  var v = rotateWithRightChild(k3.left);
  k3.left = v;
  return rotateWithLeftChild(k3);
}

function doubleWithRightChild(k2) {
  var v = rotateWithLeftChild(k2.right);
  k2.right = v;
  return rotateWithRightChild(k2);
}

function heightUpdateMutate(t) {
  var hlt = treeHeight(t.left);
  var hrt = treeHeight(t.right);
  t.height = (
    hlt > hrt ? hlt : hrt
  ) + 1 | 0;
  return t;
}

function balMutate(nt) {
  var l = nt.left;
  var r = nt.right;
  var hl = treeHeight(l);
  var hr = treeHeight(r);
  if (hl > (2 + hr | 0)) {
    var ll = l.left;
    var lr = l.right;
    if (heightGe(ll, lr)) {
      return heightUpdateMutate(rotateWithLeftChild(nt));
    } else {
      return heightUpdateMutate(doubleWithLeftChild(nt));
    }
  }
  if (hr > (2 + hl | 0)) {
    var rl = r.left;
    var rr = r.right;
    if (heightGe(rr, rl)) {
      return heightUpdateMutate(rotateWithRightChild(nt));
    } else {
      return heightUpdateMutate(doubleWithRightChild(nt));
    }
  }
  nt.height = (
    hl > hr ? hl : hr
  ) + 1 | 0;
  return nt;
}

function updateMutate(t, x, data, cmp) {
  if (t === undefined) {
    return singleton(x, data);
  }
  var k = t.key;
  var c = cmp(x, k);
  if (c === 0) {
    t.value = data;
    return t;
  }
  var l = t.left;
  var r = t.right;
  if (c < 0) {
    var ll = updateMutate(l, x, data, cmp);
    t.left = ll;
  } else {
    t.right = updateMutate(r, x, data, cmp);
  }
  return balMutate(t);
}

function fromArray(xs, cmp) {
  var len = xs.length;
  if (len === 0) {
    return ;
  }
  var next = Belt_SortArray.strictlySortedLengthU(xs, (function (param, param$1) {
          return cmp(param[0], param$1[0]) < 0;
        }));
  var result;
  if (next >= 0) {
    result = fromSortedArrayAux(xs, 0, next);
  } else {
    next = -next | 0;
    result = fromSortedArrayRevAux(xs, next - 1 | 0, next);
  }
  for(var i = next; i < len; ++i){
    var match = xs[i];
    result = updateMutate(result, match[0], match[1], cmp);
  }
  return result;
}

function removeMinAuxWithRootMutate(nt, n) {
  var rn = n.right;
  var ln = n.left;
  if (ln !== undefined) {
    n.left = removeMinAuxWithRootMutate(nt, ln);
    return balMutate(n);
  } else {
    nt.key = n.key;
    nt.value = n.value;
    return rn;
  }
}

exports.copy = copy;
exports.create = create;
exports.bal = bal;
exports.singleton = singleton;
exports.updateValue = updateValue;
exports.minKey = minKey;
exports.minKeyUndefined = minKeyUndefined;
exports.maxKey = maxKey;
exports.maxKeyUndefined = maxKeyUndefined;
exports.minimum = minimum;
exports.minUndefined = minUndefined;
exports.maximum = maximum;
exports.maxUndefined = maxUndefined;
exports.removeMinAuxWithRef = removeMinAuxWithRef;
exports.isEmpty = isEmpty;
exports.stackAllLeft = stackAllLeft;
exports.findFirstByU = findFirstByU;
exports.findFirstBy = findFirstBy;
exports.forEachU = forEachU;
exports.forEach = forEach;
exports.mapU = mapU;
exports.map = map;
exports.mapWithKeyU = mapWithKeyU;
exports.mapWithKey = mapWithKey;
exports.reduceU = reduceU;
exports.reduce = reduce;
exports.everyU = everyU;
exports.every = every;
exports.someU = someU;
exports.some = some;
exports.join = join;
exports.concat = concat;
exports.concatOrJoin = concatOrJoin;
exports.keepSharedU = keepSharedU;
exports.keepShared = keepShared;
exports.keepMapU = keepMapU;
exports.keepMap = keepMap;
exports.partitionSharedU = partitionSharedU;
exports.partitionShared = partitionShared;
exports.lengthNode = lengthNode;
exports.size = size;
exports.toList = toList;
exports.checkInvariantInternal = checkInvariantInternal;
exports.fillArray = fillArray;
exports.toArray = toArray;
exports.keysToArray = keysToArray;
exports.valuesToArray = valuesToArray;
exports.fromSortedArrayAux = fromSortedArrayAux;
exports.fromSortedArrayRevAux = fromSortedArrayRevAux;
exports.fromSortedArrayUnsafe = fromSortedArrayUnsafe;
exports.cmpU = cmpU;
exports.cmp = cmp;
exports.eqU = eqU;
exports.eq = eq;
exports.get = get;
exports.getUndefined = getUndefined;
exports.getWithDefault = getWithDefault;
exports.getExn = getExn;
exports.has = has;
exports.fromArray = fromArray;
exports.updateMutate = updateMutate;
exports.balMutate = balMutate;
exports.removeMinAuxWithRootMutate = removeMinAuxWithRootMutate;
/* No side effect */
