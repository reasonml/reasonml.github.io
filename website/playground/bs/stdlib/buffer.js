'use strict';

var Bytes = require("./bytes.js");
var Curry = require("./curry.js");
var $$String = require("./string.js");
var Caml_bytes = require("./caml_bytes.js");
var Pervasives = require("./pervasives.js");
var Caml_string = require("./caml_string.js");

function create(n) {
  var n$1 = n < 1 ? 1 : n;
  var s = Caml_bytes.caml_create_bytes(n$1);
  return {
          buffer: s,
          position: 0,
          length: n$1,
          initial_buffer: s
        };
}

function contents(b) {
  return Bytes.sub_string(b.buffer, 0, b.position);
}

function to_bytes(b) {
  return Bytes.sub(b.buffer, 0, b.position);
}

function sub(b, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (b.position - len | 0)) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Buffer.sub",
          Error: new Error()
        };
  }
  return Bytes.sub_string(b.buffer, ofs, len);
}

function blit(src, srcoff, dst, dstoff, len) {
  if (len < 0 || srcoff < 0 || srcoff > (src.position - len | 0) || dstoff < 0 || dstoff > (dst.length - len | 0)) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Buffer.blit",
          Error: new Error()
        };
  }
  return Caml_bytes.caml_blit_bytes(src.buffer, srcoff, dst, dstoff, len);
}

function nth(b, ofs) {
  if (ofs < 0 || ofs >= b.position) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Buffer.nth",
          Error: new Error()
        };
  }
  return b.buffer[ofs];
}

function length(b) {
  return b.position;
}

function clear(b) {
  b.position = 0;
  
}

function reset(b) {
  b.position = 0;
  b.buffer = b.initial_buffer;
  b.length = b.buffer.length;
  
}

function resize(b, more) {
  var len = b.length;
  var new_len = len;
  while((b.position + more | 0) > new_len) {
    new_len = (new_len << 1);
  };
  var new_buffer = Caml_bytes.caml_create_bytes(new_len);
  Bytes.blit(b.buffer, 0, new_buffer, 0, b.position);
  b.buffer = new_buffer;
  b.length = new_len;
  
}

function add_char(b, c) {
  var pos = b.position;
  if (pos >= b.length) {
    resize(b, 1);
  }
  b.buffer[pos] = c;
  b.position = pos + 1 | 0;
  
}

function add_utf_8_uchar(b, u) {
  var u$1 = u;
  if (u$1 < 0) {
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: /* tuple */[
            "buffer.ml",
            90,
            19
          ],
          Error: new Error()
        };
  }
  if (u$1 <= 127) {
    return add_char(b, u$1);
  }
  if (u$1 <= 2047) {
    var pos = b.position;
    if ((pos + 2 | 0) > b.length) {
      resize(b, 2);
    }
    b.buffer[pos] = 192 | (u$1 >>> 6);
    b.buffer[pos + 1 | 0] = 128 | u$1 & 63;
    b.position = pos + 2 | 0;
    return ;
  }
  if (u$1 <= 65535) {
    var pos$1 = b.position;
    if ((pos$1 + 3 | 0) > b.length) {
      resize(b, 3);
    }
    b.buffer[pos$1] = 224 | (u$1 >>> 12);
    b.buffer[pos$1 + 1 | 0] = 128 | (u$1 >>> 6) & 63;
    b.buffer[pos$1 + 2 | 0] = 128 | u$1 & 63;
    b.position = pos$1 + 3 | 0;
    return ;
  }
  if (u$1 <= 1114111) {
    var pos$2 = b.position;
    if ((pos$2 + 4 | 0) > b.length) {
      resize(b, 4);
    }
    b.buffer[pos$2] = 240 | (u$1 >>> 18);
    b.buffer[pos$2 + 1 | 0] = 128 | (u$1 >>> 12) & 63;
    b.buffer[pos$2 + 2 | 0] = 128 | (u$1 >>> 6) & 63;
    b.buffer[pos$2 + 3 | 0] = 128 | u$1 & 63;
    b.position = pos$2 + 4 | 0;
    return ;
  }
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: /* tuple */[
          "buffer.ml",
          123,
          8
        ],
        Error: new Error()
      };
}

function add_utf_16be_uchar(b, u) {
  var u$1 = u;
  if (u$1 < 0) {
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: /* tuple */[
            "buffer.ml",
            126,
            19
          ],
          Error: new Error()
        };
  }
  if (u$1 <= 65535) {
    var pos = b.position;
    if ((pos + 2 | 0) > b.length) {
      resize(b, 2);
    }
    b.buffer[pos] = (u$1 >>> 8);
    b.buffer[pos + 1 | 0] = u$1 & 255;
    b.position = pos + 2 | 0;
    return ;
  }
  if (u$1 <= 1114111) {
    var u$prime = u$1 - 65536 | 0;
    var hi = 55296 | (u$prime >>> 10);
    var lo = 56320 | u$prime & 1023;
    var pos$1 = b.position;
    if ((pos$1 + 4 | 0) > b.length) {
      resize(b, 4);
    }
    b.buffer[pos$1] = (hi >>> 8);
    b.buffer[pos$1 + 1 | 0] = hi & 255;
    b.buffer[pos$1 + 2 | 0] = (lo >>> 8);
    b.buffer[pos$1 + 3 | 0] = lo & 255;
    b.position = pos$1 + 4 | 0;
    return ;
  }
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: /* tuple */[
          "buffer.ml",
          144,
          8
        ],
        Error: new Error()
      };
}

function add_utf_16le_uchar(b, u) {
  var u$1 = u;
  if (u$1 < 0) {
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: /* tuple */[
            "buffer.ml",
            147,
            19
          ],
          Error: new Error()
        };
  }
  if (u$1 <= 65535) {
    var pos = b.position;
    if ((pos + 2 | 0) > b.length) {
      resize(b, 2);
    }
    b.buffer[pos] = u$1 & 255;
    b.buffer[pos + 1 | 0] = (u$1 >>> 8);
    b.position = pos + 2 | 0;
    return ;
  }
  if (u$1 <= 1114111) {
    var u$prime = u$1 - 65536 | 0;
    var hi = 55296 | (u$prime >>> 10);
    var lo = 56320 | u$prime & 1023;
    var pos$1 = b.position;
    if ((pos$1 + 4 | 0) > b.length) {
      resize(b, 4);
    }
    b.buffer[pos$1] = hi & 255;
    b.buffer[pos$1 + 1 | 0] = (hi >>> 8);
    b.buffer[pos$1 + 2 | 0] = lo & 255;
    b.buffer[pos$1 + 3 | 0] = (lo >>> 8);
    b.position = pos$1 + 4 | 0;
    return ;
  }
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: /* tuple */[
          "buffer.ml",
          165,
          8
        ],
        Error: new Error()
      };
}

function add_substring(b, s, offset, len) {
  if (offset < 0 || len < 0 || offset > (s.length - len | 0)) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Buffer.add_substring/add_subbytes",
          Error: new Error()
        };
  }
  var new_position = b.position + len | 0;
  if (new_position > b.length) {
    resize(b, len);
  }
  Bytes.blit_string(s, offset, b.buffer, b.position, len);
  b.position = new_position;
  
}

function add_subbytes(b, s, offset, len) {
  return add_substring(b, Caml_bytes.bytes_to_string(s), offset, len);
}

function add_string(b, s) {
  var len = s.length;
  var new_position = b.position + len | 0;
  if (new_position > b.length) {
    resize(b, len);
  }
  Bytes.blit_string(s, 0, b.buffer, b.position, len);
  b.position = new_position;
  
}

function add_bytes(b, s) {
  return add_string(b, Caml_bytes.bytes_to_string(s));
}

function add_buffer(b, bs) {
  return add_subbytes(b, bs.buffer, 0, bs.position);
}

function add_channel(b, ic, len) {
  if (len < 0) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Buffer.add_channel",
          Error: new Error()
        };
  }
  if ((b.position + len | 0) > b.length) {
    resize(b, len);
  }
  var _len = len;
  while(true) {
    var len$1 = _len;
    if (len$1 <= 0) {
      return ;
    }
    var n = Pervasives.input(ic, b.buffer, b.position, len$1);
    b.position = b.position + n | 0;
    if (n === 0) {
      throw {
            RE_EXN_ID: "End_of_file",
            Error: new Error()
          };
    }
    _len = len$1 - n | 0;
    continue ;
  };
}

function output_buffer(oc, b) {
  return Pervasives.output(oc, b.buffer, 0, b.position);
}

function closing(param) {
  if (param === 40) {
    return /* ")" */41;
  }
  if (param === 123) {
    return /* "}" */125;
  }
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: /* tuple */[
          "buffer.ml",
          216,
          9
        ],
        Error: new Error()
      };
}

function advance_to_closing(opening, closing, k, s, start) {
  var _k = k;
  var _i = start;
  var lim = s.length;
  while(true) {
    var i = _i;
    var k$1 = _k;
    if (i >= lim) {
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    }
    if (Caml_string.get(s, i) === opening) {
      _i = i + 1 | 0;
      _k = k$1 + 1 | 0;
      continue ;
    }
    if (Caml_string.get(s, i) === closing) {
      if (k$1 === 0) {
        return i;
      }
      _i = i + 1 | 0;
      _k = k$1 - 1 | 0;
      continue ;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function advance_to_non_alpha(s, start) {
  var _i = start;
  var lim = s.length;
  while(true) {
    var i = _i;
    if (i >= lim) {
      return lim;
    }
    var match = Caml_string.get(s, i);
    if (match >= 91) {
      if (match >= 97) {
        if (match >= 123) {
          return i;
        }
        
      } else if (match !== 95) {
        return i;
      }
      
    } else if (match >= 58) {
      if (match < 65) {
        return i;
      }
      
    } else if (match < 48) {
      return i;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function find_ident(s, start, lim) {
  if (start >= lim) {
    throw {
          RE_EXN_ID: "Not_found",
          Error: new Error()
        };
  }
  var c = Caml_string.get(s, start);
  if (c !== 40 && c !== 123) {
    var stop = advance_to_non_alpha(s, start + 1 | 0);
    return /* tuple */[
            $$String.sub(s, start, stop - start | 0),
            stop
          ];
  }
  var new_start = start + 1 | 0;
  var stop$1 = advance_to_closing(c, closing(c), 0, s, new_start);
  return /* tuple */[
          $$String.sub(s, new_start, (stop$1 - start | 0) - 1 | 0),
          stop$1 + 1 | 0
        ];
}

function add_substitute(b, f, s) {
  var lim = s.length;
  var _previous = /* " " */32;
  var _i = 0;
  while(true) {
    var i = _i;
    var previous = _previous;
    if (i >= lim) {
      if (previous === /* "\\" */92) {
        return add_char(b, previous);
      } else {
        return ;
      }
    }
    var current = Caml_string.get(s, i);
    if (current !== 36) {
      if (previous === /* "\\" */92) {
        add_char(b, /* "\\" */92);
        add_char(b, current);
        _i = i + 1 | 0;
        _previous = /* " " */32;
        continue ;
      }
      if (current !== 92) {
        add_char(b, current);
        _i = i + 1 | 0;
        _previous = current;
        continue ;
      }
      _i = i + 1 | 0;
      _previous = current;
      continue ;
    }
    if (previous === /* "\\" */92) {
      add_char(b, current);
      _i = i + 1 | 0;
      _previous = /* " " */32;
      continue ;
    }
    var j = i + 1 | 0;
    var match = find_ident(s, j, lim);
    add_string(b, Curry._1(f, match[0]));
    _i = match[1];
    _previous = /* " " */32;
    continue ;
  };
}

function truncate(b, len) {
  if (len < 0 || len > b.position) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Buffer.truncate",
          Error: new Error()
        };
  }
  b.position = len;
  
}

exports.create = create;
exports.contents = contents;
exports.to_bytes = to_bytes;
exports.sub = sub;
exports.blit = blit;
exports.nth = nth;
exports.length = length;
exports.clear = clear;
exports.reset = reset;
exports.add_char = add_char;
exports.add_utf_8_uchar = add_utf_8_uchar;
exports.add_utf_16le_uchar = add_utf_16le_uchar;
exports.add_utf_16be_uchar = add_utf_16be_uchar;
exports.add_string = add_string;
exports.add_bytes = add_bytes;
exports.add_substring = add_substring;
exports.add_subbytes = add_subbytes;
exports.add_substitute = add_substitute;
exports.add_buffer = add_buffer;
exports.add_channel = add_channel;
exports.output_buffer = output_buffer;
exports.truncate = truncate;
/* No side effect */
