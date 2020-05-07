'use strict';

var Belt_internalAVLset = require("./belt_internalAVLset.js");

function add(t, x, cmp) {
  if (t === undefined) {
    return Belt_internalAVLset.singleton(x);
  }
  var k = t.value;
  var c = cmp(x, k);
  if (c === 0) {
    return t;
  }
  var l = t.left;
  var r = t.right;
  if (c < 0) {
    var ll = add(l, x, cmp);
    if (ll === l) {
      return t;
    } else {
      return Belt_internalAVLset.bal(ll, k, r);
    }
  }
  var rr = add(r, x, cmp);
  if (rr === r) {
    return t;
  } else {
    return Belt_internalAVLset.bal(l, k, rr);
  }
}

function remove(t, x, cmp) {
  if (t === undefined) {
    return t;
  }
  var v = t.value;
  var l = t.left;
  var r = t.right;
  var c = cmp(x, v);
  if (c === 0) {
    if (l === undefined) {
      return r;
    }
    if (r === undefined) {
      return l;
    }
    var v$1 = {
      contents: r.value
    };
    var r$1 = Belt_internalAVLset.removeMinAuxWithRef(r, v$1);
    return Belt_internalAVLset.bal(l, v$1.contents, r$1);
  }
  if (c < 0) {
    var ll = remove(l, x, cmp);
    if (ll === l) {
      return t;
    } else {
      return Belt_internalAVLset.bal(ll, v, r);
    }
  }
  var rr = remove(r, x, cmp);
  if (rr === r) {
    return t;
  } else {
    return Belt_internalAVLset.bal(l, v, rr);
  }
}

function mergeMany(h, arr, cmp) {
  var len = arr.length;
  var v = h;
  for(var i = 0; i < len; ++i){
    var key = arr[i];
    v = add(v, key, cmp);
  }
  return v;
}

function removeMany(h, arr, cmp) {
  var len = arr.length;
  var v = h;
  for(var i = 0; i < len; ++i){
    var key = arr[i];
    v = remove(v, key, cmp);
  }
  return v;
}

function splitAuxNoPivot(cmp, n, x) {
  var v = n.value;
  var l = n.left;
  var r = n.right;
  var c = cmp(x, v);
  if (c === 0) {
    return /* tuple */[
            l,
            r
          ];
  }
  if (c < 0) {
    if (l === undefined) {
      return /* tuple */[
              undefined,
              n
            ];
    }
    var match = splitAuxNoPivot(cmp, l, x);
    return /* tuple */[
            match[0],
            Belt_internalAVLset.joinShared(match[1], v, r)
          ];
  }
  if (r === undefined) {
    return /* tuple */[
            n,
            undefined
          ];
  }
  var match$1 = splitAuxNoPivot(cmp, r, x);
  return /* tuple */[
          Belt_internalAVLset.joinShared(l, v, match$1[0]),
          match$1[1]
        ];
}

function splitAuxPivot(cmp, n, x, pres) {
  var v = n.value;
  var l = n.left;
  var r = n.right;
  var c = cmp(x, v);
  if (c === 0) {
    pres.contents = true;
    return /* tuple */[
            l,
            r
          ];
  }
  if (c < 0) {
    if (l === undefined) {
      return /* tuple */[
              undefined,
              n
            ];
    }
    var match = splitAuxPivot(cmp, l, x, pres);
    return /* tuple */[
            match[0],
            Belt_internalAVLset.joinShared(match[1], v, r)
          ];
  }
  if (r === undefined) {
    return /* tuple */[
            n,
            undefined
          ];
  }
  var match$1 = splitAuxPivot(cmp, r, x, pres);
  return /* tuple */[
          Belt_internalAVLset.joinShared(l, v, match$1[0]),
          match$1[1]
        ];
}

function split(t, x, cmp) {
  if (t === undefined) {
    return /* tuple */[
            /* tuple */[
              undefined,
              undefined
            ],
            false
          ];
  }
  var pres = {
    contents: false
  };
  var v = splitAuxPivot(cmp, t, x, pres);
  return /* tuple */[
          v,
          pres.contents
        ];
}

function union(s1, s2, cmp) {
  if (s1 === undefined) {
    return s2;
  }
  if (s2 === undefined) {
    return s1;
  }
  var h1 = s1.height;
  var h2 = s2.height;
  if (h1 >= h2) {
    if (h2 === 1) {
      return add(s1, s2.value, cmp);
    }
    var v1 = s1.value;
    var l1 = s1.left;
    var r1 = s1.right;
    var match = splitAuxNoPivot(cmp, s2, v1);
    return Belt_internalAVLset.joinShared(union(l1, match[0], cmp), v1, union(r1, match[1], cmp));
  }
  if (h1 === 1) {
    return add(s2, s1.value, cmp);
  }
  var v2 = s2.value;
  var l2 = s2.left;
  var r2 = s2.right;
  var match$1 = splitAuxNoPivot(cmp, s1, v2);
  return Belt_internalAVLset.joinShared(union(match$1[0], l2, cmp), v2, union(match$1[1], r2, cmp));
}

function intersect(s1, s2, cmp) {
  if (s1 === undefined) {
    return ;
  }
  if (s2 === undefined) {
    return ;
  }
  var v1 = s1.value;
  var l1 = s1.left;
  var r1 = s1.right;
  var pres = {
    contents: false
  };
  var match = splitAuxPivot(cmp, s2, v1, pres);
  var ll = intersect(l1, match[0], cmp);
  var rr = intersect(r1, match[1], cmp);
  if (pres.contents) {
    return Belt_internalAVLset.joinShared(ll, v1, rr);
  } else {
    return Belt_internalAVLset.concatShared(ll, rr);
  }
}

function diff(s1, s2, cmp) {
  if (s1 === undefined) {
    return s1;
  }
  if (s2 === undefined) {
    return s1;
  }
  var v1 = s1.value;
  var l1 = s1.left;
  var r1 = s1.right;
  var pres = {
    contents: false
  };
  var match = splitAuxPivot(cmp, s2, v1, pres);
  var ll = diff(l1, match[0], cmp);
  var rr = diff(r1, match[1], cmp);
  if (pres.contents) {
    return Belt_internalAVLset.concatShared(ll, rr);
  } else {
    return Belt_internalAVLset.joinShared(ll, v1, rr);
  }
}

var empty;

var fromArray = Belt_internalAVLset.fromArray;

var fromSortedArrayUnsafe = Belt_internalAVLset.fromSortedArrayUnsafe;

var isEmpty = Belt_internalAVLset.isEmpty;

var has = Belt_internalAVLset.has;

var subset = Belt_internalAVLset.subset;

var cmp = Belt_internalAVLset.cmp;

var eq = Belt_internalAVLset.eq;

var forEachU = Belt_internalAVLset.forEachU;

var forEach = Belt_internalAVLset.forEach;

var reduceU = Belt_internalAVLset.reduceU;

var reduce = Belt_internalAVLset.reduce;

var everyU = Belt_internalAVLset.everyU;

var every = Belt_internalAVLset.every;

var someU = Belt_internalAVLset.someU;

var some = Belt_internalAVLset.some;

var keepU = Belt_internalAVLset.keepSharedU;

var keep = Belt_internalAVLset.keepShared;

var partitionU = Belt_internalAVLset.partitionSharedU;

var partition = Belt_internalAVLset.partitionShared;

var size = Belt_internalAVLset.size;

var toList = Belt_internalAVLset.toList;

var toArray = Belt_internalAVLset.toArray;

var minimum = Belt_internalAVLset.minimum;

var minUndefined = Belt_internalAVLset.minUndefined;

var maximum = Belt_internalAVLset.maximum;

var maxUndefined = Belt_internalAVLset.maxUndefined;

var get = Belt_internalAVLset.get;

var getUndefined = Belt_internalAVLset.getUndefined;

var getExn = Belt_internalAVLset.getExn;

var checkInvariantInternal = Belt_internalAVLset.checkInvariantInternal;

exports.empty = empty;
exports.fromArray = fromArray;
exports.fromSortedArrayUnsafe = fromSortedArrayUnsafe;
exports.isEmpty = isEmpty;
exports.has = has;
exports.add = add;
exports.mergeMany = mergeMany;
exports.remove = remove;
exports.removeMany = removeMany;
exports.union = union;
exports.intersect = intersect;
exports.diff = diff;
exports.subset = subset;
exports.cmp = cmp;
exports.eq = eq;
exports.forEachU = forEachU;
exports.forEach = forEach;
exports.reduceU = reduceU;
exports.reduce = reduce;
exports.everyU = everyU;
exports.every = every;
exports.someU = someU;
exports.some = some;
exports.keepU = keepU;
exports.keep = keep;
exports.partitionU = partitionU;
exports.partition = partition;
exports.size = size;
exports.toList = toList;
exports.toArray = toArray;
exports.minimum = minimum;
exports.minUndefined = minUndefined;
exports.maximum = maximum;
exports.maxUndefined = maxUndefined;
exports.get = get;
exports.getUndefined = getUndefined;
exports.getExn = getExn;
exports.split = split;
exports.checkInvariantInternal = checkInvariantInternal;
/* No side effect */
