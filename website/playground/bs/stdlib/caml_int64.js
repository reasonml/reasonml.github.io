'use strict';

var Caml_int32 = require("./caml_int32.js");
var Caml_primitive = require("./caml_primitive.js");

function mk(lo, hi) {
  return /* Int64 */[
          /* hi */hi,
          /* lo */(lo >>> 0)
        ];
}

var min_int = /* Int64 */[
  /* hi */-2147483648,
  /* lo */0
];

var max_int = /* Int64 */[
  /* hi */2147483647,
  /* lo */4294967295
];

var one = /* Int64 */[
  /* hi */0,
  /* lo */1
];

var zero = /* Int64 */[
  /* hi */0,
  /* lo */0
];

var neg_one = /* Int64 */[
  /* hi */-1,
  /* lo */4294967295
];

function neg_signed(x) {
  return (x & 2147483648) !== 0;
}

function non_neg_signed(x) {
  return (x & 2147483648) === 0;
}

function succ(param) {
  var x_lo = param[/* lo */1];
  var x_hi = param[/* hi */0];
  var lo = x_lo + 1 | 0;
  return mk(lo, x_hi + (
              lo === 0 ? 1 : 0
            ) | 0);
}

function neg(param) {
  var other_lo = (param[/* lo */1] ^ -1) + 1 | 0;
  return mk(other_lo, (param[/* hi */0] ^ -1) + (
              other_lo === 0 ? 1 : 0
            ) | 0);
}

function add_aux(param, y_lo, y_hi) {
  var x_lo = param[/* lo */1];
  var lo = x_lo + y_lo | 0;
  var overflow = neg_signed(x_lo) && (neg_signed(y_lo) || non_neg_signed(lo)) || neg_signed(y_lo) && non_neg_signed(lo) ? 1 : 0;
  return mk(lo, param[/* hi */0] + y_hi + overflow | 0);
}

function add(self, param) {
  return add_aux(self, param[/* lo */1], param[/* hi */0]);
}

function eq(x, y) {
  if (x[/* hi */0] === y[/* hi */0]) {
    return x[/* lo */1] === y[/* lo */1];
  } else {
    return false;
  }
}

function equal_null(x, y) {
  if (y !== null) {
    return eq(x, y);
  } else {
    return false;
  }
}

function equal_undefined(x, y) {
  if (y !== undefined) {
    return eq(x, y);
  } else {
    return false;
  }
}

function equal_nullable(x, y) {
  if (y == null) {
    return false;
  } else {
    return eq(x, y);
  }
}

function sub_aux(x, lo, hi) {
  var y_lo = ((lo ^ -1) + 1 >>> 0);
  var y_hi = (hi ^ -1) + (
    y_lo === 0 ? 1 : 0
  ) | 0;
  return add_aux(x, y_lo, y_hi);
}

function sub(self, param) {
  return sub_aux(self, param[/* lo */1], param[/* hi */0]);
}

function lsl_(x, numBits) {
  if (numBits === 0) {
    return x;
  }
  var lo = x[/* lo */1];
  if (numBits >= 32) {
    return mk(0, (lo << (numBits - 32 | 0)));
  } else {
    return mk((lo << numBits), (lo >>> (32 - numBits | 0)) | (x[/* hi */0] << numBits));
  }
}

function lsr_(x, numBits) {
  if (numBits === 0) {
    return x;
  }
  var hi = x[/* hi */0];
  var offset = numBits - 32 | 0;
  if (offset === 0) {
    return mk(hi, 0);
  } else if (offset > 0) {
    return mk((hi >>> offset), 0);
  } else {
    return mk((hi << (-offset | 0)) | (x[/* lo */1] >>> numBits), (hi >>> numBits));
  }
}

function asr_(x, numBits) {
  if (numBits === 0) {
    return x;
  }
  var hi = x[/* hi */0];
  if (numBits < 32) {
    return mk((hi << (32 - numBits | 0)) | (x[/* lo */1] >>> numBits), (hi >> numBits));
  } else {
    return mk((hi >> (numBits - 32 | 0)), hi >= 0 ? 0 : -1);
  }
}

function is_zero(param) {
  if (param[/* hi */0] !== 0 || param[/* lo */1] !== 0) {
    return false;
  } else {
    return true;
  }
}

function mul(_this, _other) {
  while(true) {
    var other = _other;
    var $$this = _this;
    var lo;
    var exit = 0;
    var exit$1 = 0;
    if ($$this[/* hi */0] !== 0) {
      exit$1 = 3;
    } else {
      if ($$this[/* lo */1] === 0) {
        return zero;
      }
      exit$1 = 3;
    }
    if (exit$1 === 3) {
      if (other[/* hi */0] !== 0) {
        exit = 2;
      } else {
        if (other[/* lo */1] === 0) {
          return zero;
        }
        exit = 2;
      }
    }
    if (exit === 2) {
      var this_hi = $$this[/* hi */0];
      var exit$2 = 0;
      if (this_hi !== -2147483648 || $$this[/* lo */1] !== 0) {
        exit$2 = 3;
      } else {
        lo = other[/* lo */1];
      }
      if (exit$2 === 3) {
        var other_hi = other[/* hi */0];
        var lo$1 = $$this[/* lo */1];
        var exit$3 = 0;
        if (other_hi !== -2147483648 || other[/* lo */1] !== 0) {
          exit$3 = 4;
        } else {
          lo = lo$1;
        }
        if (exit$3 === 4) {
          var other_lo = other[/* lo */1];
          if (this_hi < 0) {
            if (other_hi >= 0) {
              return neg(mul(neg($$this), other));
            }
            _other = neg(other);
            _this = neg($$this);
            continue ;
          }
          if (other_hi < 0) {
            return neg(mul($$this, neg(other)));
          }
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
          c48 = c48 + (c32 >>> 16);
          c32 = (c32 & 65535) + a00 * b32;
          c48 = c48 + (c32 >>> 16);
          c32 = c32 & 65535;
          c48 = c48 + (a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48) & 65535;
          return mk(c00 & 65535 | ((c16 & 65535) << 16), c32 | (c48 << 16));
        }
        
      }
      
    }
    if ((lo & 1) === 0) {
      return zero;
    } else {
      return min_int;
    }
  };
}

function swap(param) {
  return mk(Caml_int32.caml_int32_bswap(param[/* hi */0]), Caml_int32.caml_int32_bswap(param[/* lo */1]));
}

function xor(param, param$1) {
  return mk(param[/* lo */1] ^ param$1[/* lo */1], param[/* hi */0] ^ param$1[/* hi */0]);
}

function or_(param, param$1) {
  return mk(param[/* lo */1] | param$1[/* lo */1], param[/* hi */0] | param$1[/* hi */0]);
}

function and_(param, param$1) {
  return mk(param[/* lo */1] & param$1[/* lo */1], param[/* hi */0] & param$1[/* hi */0]);
}

function ge(param, param$1) {
  var other_hi = param$1[/* hi */0];
  var hi = param[/* hi */0];
  if (hi > other_hi) {
    return true;
  } else if (hi < other_hi) {
    return false;
  } else {
    return param[/* lo */1] >= param$1[/* lo */1];
  }
}

function neq(x, y) {
  return !eq(x, y);
}

function lt(x, y) {
  return !ge(x, y);
}

function gt(x, y) {
  if (x[/* hi */0] > y[/* hi */0]) {
    return true;
  } else if (x[/* hi */0] < y[/* hi */0]) {
    return false;
  } else {
    return x[/* lo */1] > y[/* lo */1];
  }
}

function le(x, y) {
  return !gt(x, y);
}

function min(x, y) {
  if (ge(x, y)) {
    return y;
  } else {
    return x;
  }
}

function max(x, y) {
  if (gt(x, y)) {
    return x;
  } else {
    return y;
  }
}

function to_float(param) {
  return param[/* hi */0] * 0x100000000 + param[/* lo */1];
}

function of_float(x) {
  if (isNaN(x) || !isFinite(x)) {
    return zero;
  } else if (x <= -9.22337203685477581e+18) {
    return min_int;
  } else if (x + 1 >= 9.22337203685477581e+18) {
    return max_int;
  } else if (x < 0) {
    return neg(of_float(-x));
  } else {
    return mk(x % 4294967296 | 0, x / 4294967296 | 0);
  }
}

function isSafeInteger(param) {
  var hi = param[/* hi */0];
  var top11Bits = (hi >> 21);
  if (top11Bits === 0) {
    return true;
  } else if (top11Bits === -1) {
    return !(param[/* lo */1] === 0 && hi === (4292870144 | 0));
  } else {
    return false;
  }
}

function to_string(self) {
  if (isSafeInteger(self)) {
    return String(to_float(self));
  }
  if (self[/* hi */0] < 0) {
    if (eq(self, min_int)) {
      return "-9223372036854775808";
    } else {
      return "-" + to_string(neg(self));
    }
  }
  var approx_div1 = of_float(Math.floor(to_float(self) / 10));
  var lo = approx_div1[/* lo */1];
  var hi = approx_div1[/* hi */0];
  var match = sub_aux(sub_aux(self, (lo << 3), (lo >>> 29) | (hi << 3)), (lo << 1), (lo >>> 31) | (hi << 1));
  var rem_lo = match[/* lo */1];
  var rem_hi = match[/* hi */0];
  if (rem_lo === 0 && rem_hi === 0) {
    return to_string(approx_div1) + "0";
  }
  if (rem_hi < 0) {
    var rem_lo$1 = ((rem_lo ^ -1) + 1 >>> 0);
    var delta = Math.ceil(rem_lo$1 / 10);
    var remainder = 10 * delta - rem_lo$1;
    return to_string(sub_aux(approx_div1, delta | 0, 0)) + String(remainder | 0);
  }
  var rem_lo$2 = rem_lo;
  var delta$1 = Math.floor(rem_lo$2 / 10);
  var remainder$1 = rem_lo$2 - 10 * delta$1;
  return to_string(add_aux(approx_div1, delta$1 | 0, 0)) + String(remainder$1 | 0);
}

function div(_self, _other) {
  while(true) {
    var other = _other;
    var self = _self;
    var exit = 0;
    var exit$1 = 0;
    if (other[/* hi */0] !== 0 || other[/* lo */1] !== 0) {
      exit$1 = 3;
    } else {
      throw {
            RE_EXN_ID: "Division_by_zero",
            Error: new Error()
          };
    }
    if (exit$1 === 3) {
      var match = self[/* hi */0];
      if (match !== -2147483648) {
        if (match !== 0) {
          exit = 2;
        } else {
          if (self[/* lo */1] === 0) {
            return zero;
          }
          exit = 2;
        }
      } else if (self[/* lo */1] !== 0) {
        exit = 2;
      } else {
        if (eq(other, one) || eq(other, neg_one)) {
          return self;
        }
        if (eq(other, min_int)) {
          return one;
        }
        var half_this = asr_(self, 1);
        var approx = lsl_(div(half_this, other), 1);
        var exit$2 = 0;
        if (approx[/* hi */0] !== 0) {
          exit$2 = 4;
        } else {
          if (approx[/* lo */1] === 0) {
            if (other[/* hi */0] < 0) {
              return one;
            } else {
              return neg(one);
            }
          }
          exit$2 = 4;
        }
        if (exit$2 === 4) {
          var rem = sub(self, mul(other, approx));
          return add(approx, div(rem, other));
        }
        
      }
    }
    if (exit === 2 && other[/* hi */0] === -2147483648 && other[/* lo */1] === 0) {
      return zero;
    }
    var other_hi = other[/* hi */0];
    if (self[/* hi */0] < 0) {
      if (other_hi >= 0) {
        return neg(div(neg(self), other));
      }
      _other = neg(other);
      _self = neg(self);
      continue ;
    }
    if (other_hi < 0) {
      return neg(div(self, neg(other)));
    }
    var res = zero;
    var rem$1 = self;
    while(ge(rem$1, other)) {
      var approx$1 = Caml_primitive.caml_float_max(1, Math.floor(to_float(rem$1) / to_float(other)));
      var log2 = Math.ceil(Math.log(approx$1) / Math.LN2);
      var delta = log2 <= 48 ? 1 : Math.pow(2, log2 - 48);
      var approxRes = of_float(approx$1);
      var approxRem = mul(approxRes, other);
      while(approxRem[/* hi */0] < 0 || gt(approxRem, rem$1)) {
        approx$1 = approx$1 - delta;
        approxRes = of_float(approx$1);
        approxRem = mul(approxRes, other);
      };
      if (is_zero(approxRes)) {
        approxRes = one;
      }
      res = add(res, approxRes);
      rem$1 = sub(rem$1, approxRem);
    };
    return res;
  };
}

function mod_(self, other) {
  return sub(self, mul(div(self, other), other));
}

function div_mod(self, other) {
  var quotient = div(self, other);
  return /* tuple */[
          quotient,
          sub(self, mul(quotient, other))
        ];
}

function compare(self, other) {
  var v = Caml_primitive.caml_nativeint_compare(self[/* hi */0], other[/* hi */0]);
  if (v === 0) {
    return Caml_primitive.caml_nativeint_compare(self[/* lo */1], other[/* lo */1]);
  } else {
    return v;
  }
}

function of_int32(lo) {
  return mk(lo, lo < 0 ? -1 : 0);
}

function to_int32(x) {
  return x[/* lo */1] | 0;
}

function to_hex(x) {
  var x_lo = x[/* lo */1];
  var x_hi = x[/* hi */0];
  var aux = function (v) {
    return (v >>> 0).toString(16);
  };
  if (x_hi === 0 && x_lo === 0) {
    return "0";
  }
  if (x_lo === 0) {
    return aux(x_hi) + "00000000";
  }
  if (x_hi === 0) {
    return aux(x_lo);
  }
  var lo = aux(x_lo);
  var pad = 8 - lo.length | 0;
  if (pad <= 0) {
    return aux(x_hi) + lo;
  } else {
    return aux(x_hi) + ("0".repeat(pad) + lo);
  }
}

function discard_sign(x) {
  return /* Int64 */[
          /* hi */2147483647 & x[/* hi */0],
          /* lo */x[/* lo */1]
        ];
}

function float_of_bits(x) {
  return (function(lo,hi){ return (new Float64Array(new Int32Array([lo,hi]).buffer))[0]})(x[/* lo */1], x[/* hi */0]);
}

function bits_of_float(x) {
  var buf = (function(x){return new Int32Array(new Float64Array([x]).buffer)})(x);
  return mk(buf[0], buf[1]);
}

exports.mk = mk;
exports.succ = succ;
exports.min_int = min_int;
exports.max_int = max_int;
exports.one = one;
exports.zero = zero;
exports.neg_one = neg_one;
exports.of_int32 = of_int32;
exports.to_int32 = to_int32;
exports.add = add;
exports.neg = neg;
exports.sub = sub;
exports.lsl_ = lsl_;
exports.lsr_ = lsr_;
exports.asr_ = asr_;
exports.is_zero = is_zero;
exports.mul = mul;
exports.xor = xor;
exports.or_ = or_;
exports.and_ = and_;
exports.swap = swap;
exports.ge = ge;
exports.eq = eq;
exports.neq = neq;
exports.lt = lt;
exports.gt = gt;
exports.le = le;
exports.equal_null = equal_null;
exports.equal_undefined = equal_undefined;
exports.equal_nullable = equal_nullable;
exports.min = min;
exports.max = max;
exports.to_float = to_float;
exports.of_float = of_float;
exports.div = div;
exports.mod_ = mod_;
exports.compare = compare;
exports.float_of_bits = float_of_bits;
exports.bits_of_float = bits_of_float;
exports.div_mod = div_mod;
exports.to_hex = to_hex;
exports.discard_sign = discard_sign;
exports.to_string = to_string;
/* Caml_int32 Not a pure module */
