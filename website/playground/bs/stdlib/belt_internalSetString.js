'use strict';

var Belt_internalAVLset = require("./belt_internalAVLset.js");
var Belt_SortArrayString = require("./belt_SortArrayString.js");

function has(_t, x) {
  while(true) {
    var t = _t;
    if (t === undefined) {
      return false;
    }
    var v = t.value;
    if (x === v) {
      return true;
    }
    _t = x < v ? t.left : t.right;
    continue ;
  };
}

function compareAux(_e1, _e2) {
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
    var k1 = h1.value;
    var k2 = h2.value;
    if (k1 !== k2) {
      if (k1 < k2) {
        return -1;
      } else {
        return 1;
      }
    }
    _e2 = Belt_internalAVLset.stackAllLeft(h2.right, e2[1]);
    _e1 = Belt_internalAVLset.stackAllLeft(h1.right, e1[1]);
    continue ;
  };
}

function cmp(s1, s2) {
  var len1 = Belt_internalAVLset.size(s1);
  var len2 = Belt_internalAVLset.size(s2);
  if (len1 === len2) {
    return compareAux(Belt_internalAVLset.stackAllLeft(s1, /* [] */0), Belt_internalAVLset.stackAllLeft(s2, /* [] */0));
  } else if (len1 < len2) {
    return -1;
  } else {
    return 1;
  }
}

function eq(s1, s2) {
  return cmp(s1, s2) === 0;
}

function subset(_s1, _s2) {
  while(true) {
    var s2 = _s2;
    var s1 = _s1;
    if (s1 === undefined) {
      return true;
    }
    if (s2 === undefined) {
      return false;
    }
    var v1 = s1.value;
    var l1 = s1.left;
    var r1 = s1.right;
    var v2 = s2.value;
    var l2 = s2.left;
    var r2 = s2.right;
    if (v1 === v2) {
      if (!subset(l1, l2)) {
        return false;
      }
      _s2 = r2;
      _s1 = r1;
      continue ;
    }
    if (v1 < v2) {
      if (!subset(Belt_internalAVLset.create(l1, v1, undefined), l2)) {
        return false;
      }
      _s1 = r1;
      continue ;
    }
    if (!subset(Belt_internalAVLset.create(undefined, v1, r1), r2)) {
      return false;
    }
    _s1 = l1;
    continue ;
  };
}

function get(_n, x) {
  while(true) {
    var n = _n;
    if (n === undefined) {
      return ;
    }
    var v = n.value;
    if (x === v) {
      return v;
    }
    _n = x < v ? n.left : n.right;
    continue ;
  };
}

function getUndefined(_n, x) {
  while(true) {
    var n = _n;
    if (n === undefined) {
      return ;
    }
    var v = n.value;
    if (x === v) {
      return v;
    }
    _n = x < v ? n.left : n.right;
    continue ;
  };
}

function getExn(_n, x) {
  while(true) {
    var n = _n;
    if (n !== undefined) {
      var v = n.value;
      if (x === v) {
        return v;
      }
      _n = x < v ? n.left : n.right;
      continue ;
    }
    throw new Error("getExn");
  };
}

function addMutate(t, x) {
  if (t === undefined) {
    return Belt_internalAVLset.singleton(x);
  }
  var k = t.value;
  if (x === k) {
    return t;
  }
  var l = t.left;
  var r = t.right;
  if (x < k) {
    t.left = addMutate(l, x);
  } else {
    t.right = addMutate(r, x);
  }
  return Belt_internalAVLset.balMutate(t);
}

function fromArray(xs) {
  var len = xs.length;
  if (len === 0) {
    return ;
  }
  var next = Belt_SortArrayString.strictlySortedLength(xs);
  var result;
  if (next >= 0) {
    result = Belt_internalAVLset.fromSortedArrayAux(xs, 0, next);
  } else {
    next = -next | 0;
    result = Belt_internalAVLset.fromSortedArrayRevAux(xs, next - 1 | 0, next);
  }
  for(var i = next; i < len; ++i){
    result = addMutate(result, xs[i]);
  }
  return result;
}

var S;

var N;

var A;

exports.S = S;
exports.N = N;
exports.A = A;
exports.has = has;
exports.compareAux = compareAux;
exports.cmp = cmp;
exports.eq = eq;
exports.subset = subset;
exports.get = get;
exports.getUndefined = getUndefined;
exports.getExn = getExn;
exports.addMutate = addMutate;
exports.fromArray = fromArray;
/* No side effect */
