'use strict';

var Belt_internalSetBuckets = require("./belt_internalSetBuckets.js");
var Belt_internalBucketsType = require("./belt_internalBucketsType.js");

function copyBucket(hash, h_buckets, ndata_tail, _old_bucket) {
  while(true) {
    var old_bucket = _old_bucket;
    if (old_bucket === undefined) {
      return ;
    }
    var nidx = hash(old_bucket.key) & (h_buckets.length - 1 | 0);
    var tail = ndata_tail[nidx];
    if (tail !== undefined) {
      tail.next = old_bucket;
    } else {
      h_buckets[nidx] = old_bucket;
    }
    ndata_tail[nidx] = old_bucket;
    _old_bucket = old_bucket.next;
    continue ;
  };
}

function remove(h, key) {
  var eq = h.eq;
  var h_buckets = h.buckets;
  var i = h.hash(key) & (h_buckets.length - 1 | 0);
  var l = h_buckets[i];
  if (l === undefined) {
    return ;
  }
  var next_cell = l.next;
  if (eq(l.key, key)) {
    h.size = h.size - 1 | 0;
    h_buckets[i] = next_cell;
    return ;
  } else if (next_cell !== undefined) {
    var _prec = l;
    var _cell = next_cell;
    while(true) {
      var cell = _cell;
      var prec = _prec;
      var cell_next = cell.next;
      if (eq(cell.key, key)) {
        prec.next = cell_next;
        h.size = h.size - 1 | 0;
        return ;
      }
      if (cell_next === undefined) {
        return ;
      }
      _cell = cell_next;
      _prec = cell;
      continue ;
    };
  } else {
    return ;
  }
}

function addBucket(h, key, _cell, eq) {
  while(true) {
    var cell = _cell;
    if (eq(cell.key, key)) {
      return ;
    }
    var n = cell.next;
    if (n !== undefined) {
      _cell = n;
      continue ;
    }
    h.size = h.size + 1 | 0;
    cell.next = {
      key: key,
      next: undefined
    };
    return ;
  };
}

function add0(h, key, hash, eq) {
  var h_buckets = h.buckets;
  var buckets_len = h_buckets.length;
  var i = hash(key) & (buckets_len - 1 | 0);
  var l = h_buckets[i];
  if (l !== undefined) {
    addBucket(h, key, l, eq);
  } else {
    h.size = h.size + 1 | 0;
    h_buckets[i] = {
      key: key,
      next: undefined
    };
  }
  if (h.size > (buckets_len << 1)) {
    var odata = h.buckets;
    var osize = odata.length;
    var nsize = (osize << 1);
    if (nsize < osize) {
      return ;
    }
    var h_buckets$1 = new Array(nsize);
    var ndata_tail = new Array(nsize);
    h.buckets = h_buckets$1;
    for(var i$1 = 0; i$1 < osize; ++i$1){
      copyBucket(hash, h_buckets$1, ndata_tail, odata[i$1]);
    }
    for(var i$2 = 0; i$2 < nsize; ++i$2){
      var tail = ndata_tail[i$2];
      if (tail !== undefined) {
        tail.next = undefined;
      }
      
    }
    return ;
  }
  
}

function add(h, key) {
  return add0(h, key, h.hash, h.eq);
}

function has(h, key) {
  var eq = h.eq;
  var h_buckets = h.buckets;
  var nid = h.hash(key) & (h_buckets.length - 1 | 0);
  var bucket = h_buckets[nid];
  if (bucket !== undefined) {
    var _cell = bucket;
    while(true) {
      var cell = _cell;
      if (eq(cell.key, key)) {
        return true;
      }
      var nextCell = cell.next;
      if (nextCell === undefined) {
        return false;
      }
      _cell = nextCell;
      continue ;
    };
  } else {
    return false;
  }
}

function make(hintSize, id) {
  return Belt_internalBucketsType.make(id.hash, id.eq, hintSize);
}

function size(h) {
  return h.size;
}

function fromArray(arr, id) {
  var eq = id.eq;
  var hash = id.hash;
  var len = arr.length;
  var v = Belt_internalBucketsType.make(hash, eq, len);
  for(var i = 0; i < len; ++i){
    add0(v, arr[i], hash, eq);
  }
  return v;
}

function mergeMany(h, arr) {
  var eq = h.eq;
  var hash = h.hash;
  var len = arr.length;
  for(var i = 0; i < len; ++i){
    add0(h, arr[i], hash, eq);
  }
  
}

var Int;

var $$String;

var clear = Belt_internalBucketsType.clear;

var isEmpty = Belt_internalBucketsType.isEmpty;

var copy = Belt_internalSetBuckets.copy;

var forEachU = Belt_internalSetBuckets.forEachU;

var forEach = Belt_internalSetBuckets.forEach;

var reduceU = Belt_internalSetBuckets.reduceU;

var reduce = Belt_internalSetBuckets.reduce;

var logStats = Belt_internalSetBuckets.logStats;

var toArray = Belt_internalSetBuckets.toArray;

var getBucketHistogram = Belt_internalSetBuckets.getBucketHistogram;

exports.Int = Int;
exports.$$String = $$String;
exports.make = make;
exports.clear = clear;
exports.isEmpty = isEmpty;
exports.add = add;
exports.copy = copy;
exports.has = has;
exports.remove = remove;
exports.forEachU = forEachU;
exports.forEach = forEach;
exports.reduceU = reduceU;
exports.reduce = reduce;
exports.size = size;
exports.logStats = logStats;
exports.toArray = toArray;
exports.fromArray = fromArray;
exports.mergeMany = mergeMany;
exports.getBucketHistogram = getBucketHistogram;
/* No side effect */
