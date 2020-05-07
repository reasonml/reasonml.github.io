'use strict';

var List = require("./list.js");
var Block = require("./block.js");
var Bytes = require("./bytes.js");
var Curry = require("./curry.js");
var $$Buffer = require("./buffer.js");
var $$String = require("./string.js");
var Caml_io = require("./caml_io.js");
var Caml_obj = require("./caml_obj.js");
var Caml_bytes = require("./caml_bytes.js");
var Pervasives = require("./pervasives.js");
var Caml_string = require("./caml_string.js");
var Caml_primitive = require("./caml_primitive.js");
var Caml_exceptions = require("./caml_exceptions.js");
var Caml_js_exceptions = require("./caml_js_exceptions.js");
var CamlinternalFormat = require("./camlinternalFormat.js");

function add_queue(x, q) {
  var c = /* Cons */[
    /* head */x,
    /* tail : Nil */0
  ];
  var cell = q.insert;
  if (cell) {
    q.insert = c;
    cell[/* tail */1] = c;
    return ;
  } else {
    q.insert = c;
    q.body = c;
    return ;
  }
}

var Empty_queue = Caml_exceptions.create("Format.Empty_queue");

function peek_queue(param) {
  var match = param.body;
  if (match) {
    return match[/* head */0];
  }
  throw {
        RE_EXN_ID: Empty_queue,
        Error: new Error()
      };
}

function take_queue(q) {
  var match = q.body;
  if (match) {
    var tl = match[/* tail */1];
    q.body = tl;
    if (tl === /* Nil */0) {
      q.insert = /* Nil */0;
    }
    return match[/* head */0];
  }
  throw {
        RE_EXN_ID: Empty_queue,
        Error: new Error()
      };
}

function pp_enqueue(state, token) {
  state.pp_right_total = state.pp_right_total + token.length | 0;
  return add_queue(token, state.pp_queue);
}

function pp_clear_queue(state) {
  state.pp_left_total = 1;
  state.pp_right_total = 1;
  var q = state.pp_queue;
  q.insert = /* Nil */0;
  q.body = /* Nil */0;
  
}

function pp_output_string(state, s) {
  return Curry._3(state.pp_out_string, s, 0, s.length);
}

function break_new_line(state, offset, width) {
  Curry._1(state.pp_out_newline, undefined);
  state.pp_is_new_line = true;
  var indent = (state.pp_margin - width | 0) + offset | 0;
  var real_indent = state.pp_max_indent < indent ? state.pp_max_indent : indent;
  state.pp_current_indent = real_indent;
  state.pp_space_left = state.pp_margin - state.pp_current_indent | 0;
  return Curry._1(state.pp_out_indent, state.pp_current_indent);
}

function break_same_line(state, width) {
  state.pp_space_left = state.pp_space_left - width | 0;
  return Curry._1(state.pp_out_spaces, width);
}

function pp_force_break_line(state) {
  var match = state.pp_format_stack;
  if (!match) {
    return Curry._1(state.pp_out_newline, undefined);
  }
  var match$1 = match[0];
  var width = match$1[1];
  if (width > state.pp_space_left && (match$1[0] - 1 >>> 0) <= 3) {
    return break_new_line(state, 0, width);
  }
  
}

function format_pp_token(state, size, s) {
  if (typeof s === "number") {
    switch (s) {
      case /* Pp_stab */0 :
          var match = state.pp_tbox_stack;
          if (!match) {
            return ;
          }
          var tabs = match[0][0];
          var add_tab = function (n, ls) {
            if (!ls) {
              return /* :: */[
                      n,
                      /* [] */0
                    ];
            }
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
          };
          tabs.contents = add_tab(state.pp_margin - state.pp_space_left | 0, tabs.contents);
          return ;
      case /* Pp_end */1 :
          var match$1 = state.pp_format_stack;
          if (match$1) {
            state.pp_format_stack = match$1[1];
            return ;
          } else {
            return ;
          }
      case /* Pp_tend */2 :
          var match$2 = state.pp_tbox_stack;
          if (match$2) {
            state.pp_tbox_stack = match$2[1];
            return ;
          } else {
            return ;
          }
      case /* Pp_newline */3 :
          var match$3 = state.pp_format_stack;
          if (match$3) {
            return break_new_line(state, 0, match$3[0][1]);
          } else {
            return Curry._1(state.pp_out_newline, undefined);
          }
      case /* Pp_if_newline */4 :
          if (state.pp_current_indent !== (state.pp_margin - state.pp_space_left | 0)) {
            var match$4 = take_queue(state.pp_queue);
            var size$1 = match$4.elem_size;
            state.pp_left_total = state.pp_left_total - match$4.length | 0;
            state.pp_space_left = state.pp_space_left + size$1 | 0;
            return ;
          } else {
            return ;
          }
      case /* Pp_close_tag */5 :
          var match$5 = state.pp_mark_stack;
          if (!match$5) {
            return ;
          }
          var marker = Curry._1(state.pp_mark_close_tag, match$5[0]);
          pp_output_string(state, marker);
          state.pp_mark_stack = match$5[1];
          return ;
      
    }
  } else {
    switch (s.tag | 0) {
      case /* Pp_text */0 :
          state.pp_space_left = state.pp_space_left - size | 0;
          pp_output_string(state, s[0]);
          state.pp_is_new_line = false;
          return ;
      case /* Pp_break */1 :
          var off = s[1];
          var n = s[0];
          var match$6 = state.pp_format_stack;
          if (!match$6) {
            return ;
          }
          var match$7 = match$6[0];
          var width = match$7[1];
          switch (match$7[0]) {
            case /* Pp_vbox */1 :
            case /* Pp_hvbox */2 :
                return break_new_line(state, off, width);
            case /* Pp_hovbox */3 :
                if (size > state.pp_space_left) {
                  return break_new_line(state, off, width);
                } else {
                  return break_same_line(state, n);
                }
            case /* Pp_box */4 :
                if (state.pp_is_new_line || !(size > state.pp_space_left || state.pp_current_indent > ((state.pp_margin - width | 0) + off | 0))) {
                  return break_same_line(state, n);
                } else {
                  return break_new_line(state, off, width);
                }
            case /* Pp_hbox */0 :
            case /* Pp_fits */5 :
                return break_same_line(state, n);
            
          }
      case /* Pp_tbreak */2 :
          var insertion_point = state.pp_margin - state.pp_space_left | 0;
          var match$8 = state.pp_tbox_stack;
          if (!match$8) {
            return ;
          }
          var tabs$1 = match$8[0][0];
          var find = function (n, _param) {
            while(true) {
              var param = _param;
              if (param) {
                var x = param[0];
                if (Caml_obj.caml_greaterequal(x, n)) {
                  return x;
                }
                _param = param[1];
                continue ;
              }
              throw {
                    RE_EXN_ID: "Not_found",
                    Error: new Error()
                  };
            };
          };
          var match$9 = tabs$1.contents;
          var tab;
          if (match$9) {
            try {
              tab = find(insertion_point, tabs$1.contents);
            }
            catch (raw_exn){
              var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
              if (exn.RE_EXN_ID === "Not_found") {
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
            return break_same_line(state, offset + s[0] | 0);
          } else {
            return break_new_line(state, tab + s[1] | 0, state.pp_margin);
          }
      case /* Pp_begin */3 :
          var ty = s[1];
          var insertion_point$1 = state.pp_margin - state.pp_space_left | 0;
          if (insertion_point$1 > state.pp_max_indent) {
            pp_force_break_line(state);
          }
          var offset$1 = state.pp_space_left - s[0] | 0;
          var bl_type = ty !== 1 ? (
              size > state.pp_space_left ? ty : /* Pp_fits */5
            ) : /* Pp_vbox */1;
          state.pp_format_stack = /* :: */[
            /* Format_elem */[
              bl_type,
              offset$1
            ],
            state.pp_format_stack
          ];
          return ;
      case /* Pp_tbegin */4 :
          state.pp_tbox_stack = /* :: */[
            s[0],
            state.pp_tbox_stack
          ];
          return ;
      case /* Pp_open_tag */5 :
          var tag_name = s[0];
          var marker$1 = Curry._1(state.pp_mark_open_tag, tag_name);
          pp_output_string(state, marker$1);
          state.pp_mark_stack = /* :: */[
            tag_name,
            state.pp_mark_stack
          ];
          return ;
      
    }
  }
}

function advance_left(state) {
  try {
    while(true) {
      var match = peek_queue(state.pp_queue);
      var size = match.elem_size;
      if (size < 0 && (state.pp_right_total - state.pp_left_total | 0) < state.pp_space_left) {
        return ;
      }
      take_queue(state.pp_queue);
      format_pp_token(state, size < 0 ? 1000000010 : size, match.token);
      state.pp_left_total = match.length + state.pp_left_total | 0;
      continue ;
    };
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === Empty_queue) {
      return ;
    }
    throw exn;
  }
}

function enqueue_advance(state, tok) {
  pp_enqueue(state, tok);
  return advance_left(state);
}

function enqueue_string_as(state, size, s) {
  return enqueue_advance(state, {
              elem_size: size,
              token: /* Pp_text */Block.__(0, [s]),
              length: size
            });
}

var q_elem = {
  elem_size: -1,
  token: /* Pp_text */Block.__(0, [""]),
  length: 0
};

var scan_stack_bottom_000 = /* Scan_elem */[
  -1,
  q_elem
];

var scan_stack_bottom = /* :: */[
  scan_stack_bottom_000,
  /* [] */0
];

function set_size(state, ty) {
  var match = state.pp_scan_stack;
  if (!match) {
    return ;
  }
  var match$1 = match[0];
  var queue_elem = match$1[1];
  var size = queue_elem.elem_size;
  var t = match[1];
  if (match$1[0] < state.pp_left_total) {
    state.pp_scan_stack = scan_stack_bottom;
    return ;
  }
  var tmp = queue_elem.token;
  if (typeof tmp === "number") {
    return ;
  }
  switch (tmp.tag | 0) {
    case /* Pp_break */1 :
    case /* Pp_tbreak */2 :
        break;
    case /* Pp_begin */3 :
        if (!ty) {
          queue_elem.elem_size = state.pp_right_total + size | 0;
          state.pp_scan_stack = t;
          return ;
        } else {
          return ;
        }
    default:
      return ;
  }
  if (ty) {
    queue_elem.elem_size = state.pp_right_total + size | 0;
    state.pp_scan_stack = t;
    return ;
  }
  
}

function scan_push(state, b, tok) {
  pp_enqueue(state, tok);
  if (b) {
    set_size(state, true);
  }
  state.pp_scan_stack = /* :: */[
    /* Scan_elem */[
      state.pp_right_total,
      tok
    ],
    state.pp_scan_stack
  ];
  
}

function pp_open_box_gen(state, indent, br_ty) {
  state.pp_curr_depth = state.pp_curr_depth + 1 | 0;
  if (state.pp_curr_depth >= state.pp_max_boxes) {
    if (state.pp_curr_depth === state.pp_max_boxes) {
      var s = state.pp_ellipsis;
      var len = s.length;
      return enqueue_string_as(state, len, s);
    } else {
      return ;
    }
  }
  var elem = {
    elem_size: -state.pp_right_total | 0,
    token: /* Pp_begin */Block.__(3, [
        indent,
        br_ty
      ]),
    length: 0
  };
  return scan_push(state, false, elem);
}

function pp_close_box(state, param) {
  if (state.pp_curr_depth > 1) {
    if (state.pp_curr_depth < state.pp_max_boxes) {
      pp_enqueue(state, {
            elem_size: 0,
            token: /* Pp_end */1,
            length: 0
          });
      set_size(state, true);
      set_size(state, false);
    }
    state.pp_curr_depth = state.pp_curr_depth - 1 | 0;
    return ;
  }
  
}

function pp_open_tag(state, tag_name) {
  if (state.pp_print_tags) {
    state.pp_tag_stack = /* :: */[
      tag_name,
      state.pp_tag_stack
    ];
    Curry._1(state.pp_print_open_tag, tag_name);
  }
  if (state.pp_mark_tags) {
    return pp_enqueue(state, {
                elem_size: 0,
                token: /* Pp_open_tag */Block.__(5, [tag_name]),
                length: 0
              });
  }
  
}

function pp_close_tag(state, param) {
  if (state.pp_mark_tags) {
    pp_enqueue(state, {
          elem_size: 0,
          token: /* Pp_close_tag */5,
          length: 0
        });
  }
  if (!state.pp_print_tags) {
    return ;
  }
  var match = state.pp_tag_stack;
  if (match) {
    Curry._1(state.pp_print_close_tag, match[0]);
    state.pp_tag_stack = match[1];
    return ;
  }
  
}

function pp_set_print_tags(state, b) {
  state.pp_print_tags = b;
  
}

function pp_set_mark_tags(state, b) {
  state.pp_mark_tags = b;
  
}

function pp_get_print_tags(state, param) {
  return state.pp_print_tags;
}

function pp_get_mark_tags(state, param) {
  return state.pp_mark_tags;
}

function pp_set_tags(state, b) {
  state.pp_print_tags = b;
  state.pp_mark_tags = b;
  
}

function pp_get_formatter_tag_functions(state, param) {
  return {
          mark_open_tag: state.pp_mark_open_tag,
          mark_close_tag: state.pp_mark_close_tag,
          print_open_tag: state.pp_print_open_tag,
          print_close_tag: state.pp_print_close_tag
        };
}

function pp_set_formatter_tag_functions(state, param) {
  state.pp_mark_open_tag = param.mark_open_tag;
  state.pp_mark_close_tag = param.mark_close_tag;
  state.pp_print_open_tag = param.print_open_tag;
  state.pp_print_close_tag = param.print_close_tag;
  
}

function pp_rinit(state) {
  pp_clear_queue(state);
  state.pp_scan_stack = scan_stack_bottom;
  state.pp_format_stack = /* [] */0;
  state.pp_tbox_stack = /* [] */0;
  state.pp_tag_stack = /* [] */0;
  state.pp_mark_stack = /* [] */0;
  state.pp_current_indent = 0;
  state.pp_curr_depth = 0;
  state.pp_space_left = state.pp_margin;
  return pp_open_box_gen(state, 0, /* Pp_hovbox */3);
}

function clear_tag_stack(state) {
  return List.iter((function (param) {
                return pp_close_tag(state, undefined);
              }), state.pp_tag_stack);
}

function pp_flush_queue(state, b) {
  clear_tag_stack(state);
  while(state.pp_curr_depth > 1) {
    pp_close_box(state, undefined);
  };
  state.pp_right_total = 1000000010;
  advance_left(state);
  if (b) {
    Curry._1(state.pp_out_newline, undefined);
  }
  return pp_rinit(state);
}

function pp_print_as_size(state, size, s) {
  if (state.pp_curr_depth < state.pp_max_boxes) {
    return enqueue_string_as(state, size, s);
  }
  
}

var pp_print_as = pp_print_as_size;

function pp_print_string(state, s) {
  return pp_print_as(state, s.length, s);
}

function pp_print_int(state, i) {
  return pp_print_string(state, String(i));
}

function pp_print_float(state, f) {
  return pp_print_string(state, Pervasives.string_of_float(f));
}

function pp_print_bool(state, b) {
  return pp_print_string(state, b ? "true" : "false");
}

function pp_print_char(state, c) {
  return pp_print_as(state, 1, Caml_bytes.bytes_to_string(Bytes.make(1, c)));
}

function pp_open_hbox(state, param) {
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

function pp_print_newline(state, param) {
  pp_flush_queue(state, true);
  return Curry._1(state.pp_out_flush, undefined);
}

function pp_print_flush(state, param) {
  pp_flush_queue(state, false);
  return Curry._1(state.pp_out_flush, undefined);
}

function pp_force_newline(state, param) {
  if (state.pp_curr_depth < state.pp_max_boxes) {
    return enqueue_advance(state, {
                elem_size: 0,
                token: /* Pp_newline */3,
                length: 0
              });
  }
  
}

function pp_print_if_newline(state, param) {
  if (state.pp_curr_depth < state.pp_max_boxes) {
    return enqueue_advance(state, {
                elem_size: 0,
                token: /* Pp_if_newline */4,
                length: 0
              });
  }
  
}

function pp_print_break(state, width, offset) {
  if (state.pp_curr_depth >= state.pp_max_boxes) {
    return ;
  }
  var elem = {
    elem_size: -state.pp_right_total | 0,
    token: /* Pp_break */Block.__(1, [
        width,
        offset
      ]),
    length: width
  };
  return scan_push(state, true, elem);
}

function pp_print_space(state, param) {
  return pp_print_break(state, 1, 0);
}

function pp_print_cut(state, param) {
  return pp_print_break(state, 0, 0);
}

function pp_open_tbox(state, param) {
  state.pp_curr_depth = state.pp_curr_depth + 1 | 0;
  if (state.pp_curr_depth >= state.pp_max_boxes) {
    return ;
  }
  var elem = {
    elem_size: 0,
    token: /* Pp_tbegin */Block.__(4, [/* Pp_tbox */[{
            contents: /* [] */0
          }]]),
    length: 0
  };
  return enqueue_advance(state, elem);
}

function pp_close_tbox(state, param) {
  if (state.pp_curr_depth <= 1) {
    return ;
  }
  if (state.pp_curr_depth >= state.pp_max_boxes) {
    return ;
  }
  var elem = {
    elem_size: 0,
    token: /* Pp_tend */2,
    length: 0
  };
  enqueue_advance(state, elem);
  state.pp_curr_depth = state.pp_curr_depth - 1 | 0;
  
}

function pp_print_tbreak(state, width, offset) {
  if (state.pp_curr_depth >= state.pp_max_boxes) {
    return ;
  }
  var elem = {
    elem_size: -state.pp_right_total | 0,
    token: /* Pp_tbreak */Block.__(2, [
        width,
        offset
      ]),
    length: width
  };
  return scan_push(state, true, elem);
}

function pp_print_tab(state, param) {
  return pp_print_tbreak(state, 0, 0);
}

function pp_set_tab(state, param) {
  if (state.pp_curr_depth >= state.pp_max_boxes) {
    return ;
  }
  var elem = {
    elem_size: 0,
    token: /* Pp_stab */0,
    length: 0
  };
  return enqueue_advance(state, elem);
}

function pp_set_max_boxes(state, n) {
  if (n > 1) {
    state.pp_max_boxes = n;
    return ;
  }
  
}

function pp_get_max_boxes(state, param) {
  return state.pp_max_boxes;
}

function pp_over_max_boxes(state, param) {
  return state.pp_curr_depth === state.pp_max_boxes;
}

function pp_set_ellipsis_text(state, s) {
  state.pp_ellipsis = s;
  
}

function pp_get_ellipsis_text(state, param) {
  return state.pp_ellipsis;
}

function pp_limit(n) {
  if (n < 1000000010) {
    return n;
  } else {
    return 1000000009;
  }
}

function pp_set_max_indent(state, n) {
  var n$1 = state.pp_margin - n | 0;
  if (n$1 < 1) {
    return ;
  }
  var n$2 = pp_limit(n$1);
  state.pp_min_space_left = n$2;
  state.pp_max_indent = state.pp_margin - state.pp_min_space_left | 0;
  return pp_rinit(state);
}

function pp_get_max_indent(state, param) {
  return state.pp_max_indent;
}

function pp_set_margin(state, n) {
  if (n < 1) {
    return ;
  }
  var n$1 = pp_limit(n);
  state.pp_margin = n$1;
  var new_max_indent = state.pp_max_indent <= state.pp_margin ? state.pp_max_indent : Caml_primitive.caml_int_max(Caml_primitive.caml_int_max(state.pp_margin - state.pp_min_space_left | 0, state.pp_margin / 2 | 0), 1);
  return pp_set_max_indent(state, new_max_indent);
}

function pp_get_margin(state, param) {
  return state.pp_margin;
}

function pp_set_formatter_out_functions(state, param) {
  state.pp_out_string = param.out_string;
  state.pp_out_flush = param.out_flush;
  state.pp_out_newline = param.out_newline;
  state.pp_out_spaces = param.out_spaces;
  state.pp_out_indent = param.out_indent;
  
}

function pp_get_formatter_out_functions(state, param) {
  return {
          out_string: state.pp_out_string,
          out_flush: state.pp_out_flush,
          out_newline: state.pp_out_newline,
          out_spaces: state.pp_out_spaces,
          out_indent: state.pp_out_indent
        };
}

function pp_set_formatter_output_functions(state, f, g) {
  state.pp_out_string = f;
  state.pp_out_flush = g;
  
}

function pp_get_formatter_output_functions(state, param) {
  return /* tuple */[
          state.pp_out_string,
          state.pp_out_flush
        ];
}

function display_newline(state, param) {
  return Curry._3(state.pp_out_string, "\n", 0, 1);
}

var blank_line = Caml_bytes.bytes_to_string(Bytes.make(80, /* " " */32));

function display_blanks(state, _n) {
  while(true) {
    var n = _n;
    if (n <= 0) {
      return ;
    }
    if (n <= 80) {
      return Curry._3(state.pp_out_string, blank_line, 0, n);
    }
    Curry._3(state.pp_out_string, blank_line, 0, 80);
    _n = n - 80 | 0;
    continue ;
  };
}

function pp_set_formatter_out_channel(state, oc) {
  state.pp_out_string = (function (param, param$1, param$2) {
      return Pervasives.output_substring(oc, param, param$1, param$2);
    });
  state.pp_out_flush = (function (param) {
      return Caml_io.caml_ml_flush(oc);
    });
  state.pp_out_newline = (function (param) {
      return display_newline(state, param);
    });
  state.pp_out_spaces = (function (param) {
      return display_blanks(state, param);
    });
  state.pp_out_indent = (function (param) {
      return display_blanks(state, param);
    });
  
}

function default_pp_mark_open_tag(s) {
  return "<" + (s + ">");
}

function default_pp_mark_close_tag(s) {
  return "</" + (s + ">");
}

function default_pp_print_open_tag(prim) {
  
}

function default_pp_print_close_tag(prim) {
  
}

function pp_make_formatter(f, g, h, i, j) {
  var pp_queue = {
    insert: /* Nil */0,
    body: /* Nil */0
  };
  var sys_tok = {
    elem_size: -1,
    token: /* Pp_begin */Block.__(3, [
        0,
        /* Pp_hovbox */3
      ]),
    length: 0
  };
  add_queue(sys_tok, pp_queue);
  var sys_scan_stack_000 = /* Scan_elem */[
    1,
    sys_tok
  ];
  var sys_scan_stack = /* :: */[
    sys_scan_stack_000,
    scan_stack_bottom
  ];
  return {
          pp_scan_stack: sys_scan_stack,
          pp_format_stack: /* [] */0,
          pp_tbox_stack: /* [] */0,
          pp_tag_stack: /* [] */0,
          pp_mark_stack: /* [] */0,
          pp_margin: 78,
          pp_min_space_left: 10,
          pp_max_indent: 68,
          pp_space_left: 78,
          pp_current_indent: 0,
          pp_is_new_line: true,
          pp_left_total: 1,
          pp_right_total: 1,
          pp_curr_depth: 1,
          pp_max_boxes: Pervasives.max_int,
          pp_ellipsis: ".",
          pp_out_string: f,
          pp_out_flush: g,
          pp_out_newline: h,
          pp_out_spaces: i,
          pp_out_indent: j,
          pp_print_tags: false,
          pp_mark_tags: false,
          pp_mark_open_tag: default_pp_mark_open_tag,
          pp_mark_close_tag: default_pp_mark_close_tag,
          pp_print_open_tag: default_pp_print_open_tag,
          pp_print_close_tag: default_pp_print_close_tag,
          pp_queue: pp_queue
        };
}

function formatter_of_out_functions(out_funs) {
  return pp_make_formatter(out_funs.out_string, out_funs.out_flush, out_funs.out_newline, out_funs.out_spaces, out_funs.out_indent);
}

function make_formatter(output, flush) {
  var ppf = pp_make_formatter(output, flush, (function (prim) {
          
        }), (function (prim) {
          
        }), (function (prim) {
          
        }));
  ppf.pp_out_newline = (function (param) {
      return display_newline(ppf, param);
    });
  ppf.pp_out_spaces = (function (param) {
      return display_blanks(ppf, param);
    });
  ppf.pp_out_indent = (function (param) {
      return display_blanks(ppf, param);
    });
  return ppf;
}

function formatter_of_out_channel(oc) {
  return make_formatter((function (param, param$1, param$2) {
                return Pervasives.output_substring(oc, param, param$1, param$2);
              }), (function (param) {
                return Caml_io.caml_ml_flush(oc);
              }));
}

function formatter_of_buffer(b) {
  return make_formatter((function (param, param$1, param$2) {
                return $$Buffer.add_substring(b, param, param$1, param$2);
              }), (function (prim) {
                
              }));
}

var stdbuf = $$Buffer.create(512);

var std_formatter = formatter_of_out_channel(Pervasives.stdout);

var err_formatter = formatter_of_out_channel(Pervasives.stderr);

var str_formatter = formatter_of_buffer(stdbuf);

function flush_buffer_formatter(buf, ppf) {
  pp_flush_queue(ppf, false);
  var s = $$Buffer.contents(buf);
  $$Buffer.reset(buf);
  return s;
}

function flush_str_formatter(param) {
  return flush_buffer_formatter(stdbuf, str_formatter);
}

function make_symbolic_output_buffer(param) {
  return {
          symbolic_output_contents: /* [] */0
        };
}

function clear_symbolic_output_buffer(sob) {
  sob.symbolic_output_contents = /* [] */0;
  
}

function get_symbolic_output_buffer(sob) {
  return List.rev(sob.symbolic_output_contents);
}

function flush_symbolic_output_buffer(sob) {
  var items = List.rev(sob.symbolic_output_contents);
  sob.symbolic_output_contents = /* [] */0;
  return items;
}

function add_symbolic_output_item(sob, item) {
  sob.symbolic_output_contents = /* :: */[
    item,
    sob.symbolic_output_contents
  ];
  
}

function formatter_of_symbolic_output_buffer(sob) {
  var f = function (param, param$1, param$2) {
    return add_symbolic_output_item(sob, /* Output_string */Block.__(0, [$$String.sub(param, param$1, param$2)]));
  };
  var g = function (param) {
    return add_symbolic_output_item(sob, /* Output_flush */0);
  };
  var h = function (param) {
    return add_symbolic_output_item(sob, /* Output_newline */1);
  };
  var i = function (param) {
    return add_symbolic_output_item(sob, /* Output_spaces */Block.__(1, [param]));
  };
  var j = function (param) {
    return add_symbolic_output_item(sob, /* Output_indent */Block.__(2, [param]));
  };
  return pp_make_formatter(f, g, h, i, j);
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
  return pp_print_string(std_formatter, String(param));
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

function print_cut(param) {
  return pp_print_break(std_formatter, 0, 0);
}

function print_space(param) {
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

function print_tab(param) {
  return pp_print_tbreak(std_formatter, 0, 0);
}

function set_margin(param) {
  return pp_set_margin(std_formatter, param);
}

function get_margin(param) {
  return std_formatter.pp_margin;
}

function set_max_indent(param) {
  return pp_set_max_indent(std_formatter, param);
}

function get_max_indent(param) {
  return std_formatter.pp_max_indent;
}

function set_max_boxes(param) {
  return pp_set_max_boxes(std_formatter, param);
}

function get_max_boxes(param) {
  return std_formatter.pp_max_boxes;
}

function over_max_boxes(param) {
  return pp_over_max_boxes(std_formatter, param);
}

function set_ellipsis_text(param) {
  std_formatter.pp_ellipsis = param;
  
}

function get_ellipsis_text(param) {
  return std_formatter.pp_ellipsis;
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

function set_formatter_tag_functions(param) {
  return pp_set_formatter_tag_functions(std_formatter, param);
}

function get_formatter_tag_functions(param) {
  return pp_get_formatter_tag_functions(std_formatter, param);
}

function set_print_tags(param) {
  std_formatter.pp_print_tags = param;
  
}

function get_print_tags(param) {
  return std_formatter.pp_print_tags;
}

function set_mark_tags(param) {
  std_formatter.pp_mark_tags = param;
  
}

function get_mark_tags(param) {
  return std_formatter.pp_mark_tags;
}

function set_tags(param) {
  return pp_set_tags(std_formatter, param);
}

function pp_print_list(_$staropt$star, pp_v, ppf, _param) {
  while(true) {
    var param = _param;
    var $staropt$star = _$staropt$star;
    var pp_sep = $staropt$star !== undefined ? $staropt$star : pp_print_cut;
    if (!param) {
      return ;
    }
    var vs = param[1];
    var v = param[0];
    if (!vs) {
      return Curry._2(pp_v, ppf, v);
    }
    Curry._2(pp_v, ppf, v);
    Curry._2(pp_sep, ppf, undefined);
    _param = vs;
    _$staropt$star = pp_sep;
    continue ;
  };
}

function pp_print_text(ppf, s) {
  var len = s.length;
  var left = {
    contents: 0
  };
  var right = {
    contents: 0
  };
  var flush = function (param) {
    pp_print_string(ppf, $$String.sub(s, left.contents, right.contents - left.contents | 0));
    right.contents = right.contents + 1 | 0;
    left.contents = right.contents;
    
  };
  while(right.contents !== len) {
    var match = Caml_string.get(s, right.contents);
    if (match !== 10) {
      if (match !== 32) {
        right.contents = right.contents + 1 | 0;
      } else {
        flush(undefined);
        pp_print_break(ppf, 1, 0);
      }
    } else {
      flush(undefined);
      pp_force_newline(ppf, undefined);
    }
  };
  if (left.contents !== len) {
    return flush(undefined);
  }
  
}

function compute_tag(output, tag_acc) {
  var buf = $$Buffer.create(16);
  var ppf = formatter_of_buffer(buf);
  Curry._2(output, ppf, tag_acc);
  pp_print_flush(ppf, undefined);
  var len = buf.position;
  if (len < 2) {
    return $$Buffer.contents(buf);
  } else {
    return $$Buffer.sub(buf, 1, len - 2 | 0);
  }
}

function output_formatting_lit(ppf, fmting_lit) {
  if (typeof fmting_lit === "number") {
    switch (fmting_lit) {
      case /* Close_box */0 :
          return pp_close_box(ppf, undefined);
      case /* Close_tag */1 :
          return pp_close_tag(ppf, undefined);
      case /* FFlush */2 :
          return pp_print_flush(ppf, undefined);
      case /* Force_newline */3 :
          return pp_force_newline(ppf, undefined);
      case /* Flush_newline */4 :
          return pp_print_newline(ppf, undefined);
      case /* Escaped_at */5 :
          return pp_print_char(ppf, /* "@" */64);
      case /* Escaped_percent */6 :
          return pp_print_char(ppf, /* "%" */37);
      
    }
  } else {
    switch (fmting_lit.tag | 0) {
      case /* Break */0 :
          return pp_print_break(ppf, fmting_lit[1], fmting_lit[2]);
      case /* Magic_size */1 :
          return ;
      case /* Scan_indic */2 :
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
    return ;
  }
  switch (acc.tag | 0) {
    case /* Acc_formatting_lit */0 :
        output_acc(ppf, acc[0]);
        return output_formatting_lit(ppf, acc[1]);
    case /* Acc_formatting_gen */1 :
        var acc$prime = acc[1];
        var p$2 = acc[0];
        if (acc$prime.tag) {
          output_acc(ppf, p$2);
          var match = CamlinternalFormat.open_box_of_string(compute_tag(output_acc, acc$prime[0]));
          return pp_open_box_gen(ppf, match[0], match[1]);
        }
        output_acc(ppf, p$2);
        return pp_open_tag(ppf, compute_tag(output_acc, acc$prime[0]));
    case /* Acc_string_literal */2 :
        var p$3 = acc[0];
        var exit$1 = 0;
        if (typeof p$3 === "number" || p$3.tag) {
          exit$1 = 3;
        } else {
          var match$1 = p$3[1];
          if (typeof match$1 === "number" || match$1.tag !== /* Magic_size */1) {
            exit$1 = 3;
          } else {
            p = p$3[0];
            size = match$1[1];
            s = acc[1];
            exit = 1;
          }
        }
        if (exit$1 === 3) {
          output_acc(ppf, p$3);
          return pp_print_string(ppf, acc[1]);
        }
        break;
    case /* Acc_char_literal */3 :
        var p$4 = acc[0];
        var exit$2 = 0;
        if (typeof p$4 === "number" || p$4.tag) {
          exit$2 = 3;
        } else {
          var match$2 = p$4[1];
          if (typeof match$2 === "number" || match$2.tag !== /* Magic_size */1) {
            exit$2 = 3;
          } else {
            p$1 = p$4[0];
            size$1 = match$2[1];
            c = acc[1];
            exit = 2;
          }
        }
        if (exit$2 === 3) {
          output_acc(ppf, p$4);
          return pp_print_char(ppf, acc[1]);
        }
        break;
    case /* Acc_data_string */4 :
        var p$5 = acc[0];
        var exit$3 = 0;
        if (typeof p$5 === "number" || p$5.tag) {
          exit$3 = 3;
        } else {
          var match$3 = p$5[1];
          if (typeof match$3 === "number" || match$3.tag !== /* Magic_size */1) {
            exit$3 = 3;
          } else {
            p = p$5[0];
            size = match$3[1];
            s = acc[1];
            exit = 1;
          }
        }
        if (exit$3 === 3) {
          output_acc(ppf, p$5);
          return pp_print_string(ppf, acc[1]);
        }
        break;
    case /* Acc_data_char */5 :
        var p$6 = acc[0];
        var exit$4 = 0;
        if (typeof p$6 === "number" || p$6.tag) {
          exit$4 = 3;
        } else {
          var match$4 = p$6[1];
          if (typeof match$4 === "number" || match$4.tag !== /* Magic_size */1) {
            exit$4 = 3;
          } else {
            p$1 = p$6[0];
            size$1 = match$4[1];
            c = acc[1];
            exit = 2;
          }
        }
        if (exit$4 === 3) {
          output_acc(ppf, p$6);
          return pp_print_char(ppf, acc[1]);
        }
        break;
    case /* Acc_delay */6 :
        output_acc(ppf, acc[0]);
        return Curry._1(acc[1], ppf);
    case /* Acc_flush */7 :
        output_acc(ppf, acc[0]);
        return pp_print_flush(ppf, undefined);
    case /* Acc_invalid_arg */8 :
        output_acc(ppf, acc[0]);
        throw {
              RE_EXN_ID: "Invalid_argument",
              _1: acc[1],
              Error: new Error()
            };
    
  }
  switch (exit) {
    case 1 :
        output_acc(ppf, p);
        return pp_print_as_size(ppf, size, s);
    case 2 :
        output_acc(ppf, p$1);
        return pp_print_as_size(ppf, size$1, Caml_bytes.bytes_to_string(Bytes.make(1, c)));
    
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
    return ;
  }
  switch (acc.tag | 0) {
    case /* Acc_formatting_lit */0 :
        strput_acc(ppf, acc[0]);
        return output_formatting_lit(ppf, acc[1]);
    case /* Acc_formatting_gen */1 :
        var acc$prime = acc[1];
        var p$2 = acc[0];
        if (acc$prime.tag) {
          strput_acc(ppf, p$2);
          var match = CamlinternalFormat.open_box_of_string(compute_tag(strput_acc, acc$prime[0]));
          return pp_open_box_gen(ppf, match[0], match[1]);
        }
        strput_acc(ppf, p$2);
        return pp_open_tag(ppf, compute_tag(strput_acc, acc$prime[0]));
    case /* Acc_string_literal */2 :
        var p$3 = acc[0];
        var exit$1 = 0;
        if (typeof p$3 === "number" || p$3.tag) {
          exit$1 = 3;
        } else {
          var match$1 = p$3[1];
          if (typeof match$1 === "number" || match$1.tag !== /* Magic_size */1) {
            exit$1 = 3;
          } else {
            p = p$3[0];
            size = match$1[1];
            s = acc[1];
            exit = 1;
          }
        }
        if (exit$1 === 3) {
          strput_acc(ppf, p$3);
          return pp_print_string(ppf, acc[1]);
        }
        break;
    case /* Acc_char_literal */3 :
        var p$4 = acc[0];
        var exit$2 = 0;
        if (typeof p$4 === "number" || p$4.tag) {
          exit$2 = 3;
        } else {
          var match$2 = p$4[1];
          if (typeof match$2 === "number" || match$2.tag !== /* Magic_size */1) {
            exit$2 = 3;
          } else {
            p$1 = p$4[0];
            size$1 = match$2[1];
            c = acc[1];
            exit = 2;
          }
        }
        if (exit$2 === 3) {
          strput_acc(ppf, p$4);
          return pp_print_char(ppf, acc[1]);
        }
        break;
    case /* Acc_data_string */4 :
        var p$5 = acc[0];
        var exit$3 = 0;
        if (typeof p$5 === "number" || p$5.tag) {
          exit$3 = 3;
        } else {
          var match$3 = p$5[1];
          if (typeof match$3 === "number" || match$3.tag !== /* Magic_size */1) {
            exit$3 = 3;
          } else {
            p = p$5[0];
            size = match$3[1];
            s = acc[1];
            exit = 1;
          }
        }
        if (exit$3 === 3) {
          strput_acc(ppf, p$5);
          return pp_print_string(ppf, acc[1]);
        }
        break;
    case /* Acc_data_char */5 :
        var p$6 = acc[0];
        var exit$4 = 0;
        if (typeof p$6 === "number" || p$6.tag) {
          exit$4 = 3;
        } else {
          var match$4 = p$6[1];
          if (typeof match$4 === "number" || match$4.tag !== /* Magic_size */1) {
            exit$4 = 3;
          } else {
            p$1 = p$6[0];
            size$1 = match$4[1];
            c = acc[1];
            exit = 2;
          }
        }
        if (exit$4 === 3) {
          strput_acc(ppf, p$6);
          return pp_print_char(ppf, acc[1]);
        }
        break;
    case /* Acc_delay */6 :
        var p$7 = acc[0];
        var exit$5 = 0;
        if (typeof p$7 === "number" || p$7.tag) {
          exit$5 = 3;
        } else {
          var match$5 = p$7[1];
          if (typeof match$5 === "number") {
            exit$5 = 3;
          } else {
            if (match$5.tag === /* Magic_size */1) {
              strput_acc(ppf, p$7[0]);
              return pp_print_as_size(ppf, match$5[1], Curry._1(acc[1], undefined));
            }
            exit$5 = 3;
          }
        }
        if (exit$5 === 3) {
          strput_acc(ppf, p$7);
          return pp_print_string(ppf, Curry._1(acc[1], undefined));
        }
        break;
    case /* Acc_flush */7 :
        strput_acc(ppf, acc[0]);
        return pp_print_flush(ppf, undefined);
    case /* Acc_invalid_arg */8 :
        strput_acc(ppf, acc[0]);
        throw {
              RE_EXN_ID: "Invalid_argument",
              _1: acc[1],
              Error: new Error()
            };
    
  }
  switch (exit) {
    case 1 :
        strput_acc(ppf, p);
        return pp_print_as_size(ppf, size, s);
    case 2 :
        strput_acc(ppf, p$1);
        return pp_print_as_size(ppf, size$1, Caml_bytes.bytes_to_string(Bytes.make(1, c)));
    
  }
}

function kfprintf(k, ppf, param) {
  return CamlinternalFormat.make_printf((function (ppf, acc) {
                output_acc(ppf, acc);
                return Curry._1(k, ppf);
              }), ppf, /* End_of_acc */0, param[0]);
}

function ikfprintf(k, ppf, param) {
  return CamlinternalFormat.make_iprintf(k, ppf, param[0]);
}

function fprintf(ppf, fmt) {
  return kfprintf((function (prim) {
                
              }), ppf, fmt);
}

function ifprintf(ppf, fmt) {
  return ikfprintf((function (prim) {
                
              }), ppf, fmt);
}

function printf(fmt) {
  return fprintf(std_formatter, fmt);
}

function eprintf(fmt) {
  return fprintf(err_formatter, fmt);
}

function ksprintf(k, param) {
  var b = $$Buffer.create(512);
  var ppf = formatter_of_buffer(b);
  var k$1 = function (param, acc) {
    strput_acc(ppf, acc);
    return Curry._1(k, flush_buffer_formatter(b, ppf));
  };
  return CamlinternalFormat.make_printf(k$1, undefined, /* End_of_acc */0, param[0]);
}

function sprintf(fmt) {
  return ksprintf((function (s) {
                return s;
              }), fmt);
}

function kasprintf(k, param) {
  var b = $$Buffer.create(512);
  var ppf = formatter_of_buffer(b);
  var k$1 = function (ppf, acc) {
    output_acc(ppf, acc);
    return Curry._1(k, flush_buffer_formatter(b, ppf));
  };
  return CamlinternalFormat.make_printf(k$1, ppf, /* End_of_acc */0, param[0]);
}

function asprintf(fmt) {
  return kasprintf((function (s) {
                return s;
              }), fmt);
}

Pervasives.at_exit(print_flush);

function pp_set_all_formatter_output_functions(state, f, g, h, i) {
  pp_set_formatter_output_functions(state, f, g);
  state.pp_out_newline = h;
  state.pp_out_spaces = i;
  
}

function pp_get_all_formatter_output_functions(state, param) {
  return /* tuple */[
          state.pp_out_string,
          state.pp_out_flush,
          state.pp_out_newline,
          state.pp_out_spaces
        ];
}

function set_all_formatter_output_functions(param, param$1, param$2, param$3) {
  return pp_set_all_formatter_output_functions(std_formatter, param, param$1, param$2, param$3);
}

function get_all_formatter_output_functions(param) {
  return pp_get_all_formatter_output_functions(std_formatter, param);
}

function bprintf(b, param) {
  var k = function (ppf, acc) {
    output_acc(ppf, acc);
    return pp_flush_queue(ppf, false);
  };
  return CamlinternalFormat.make_printf(k, formatter_of_buffer(b), /* End_of_acc */0, param[0]);
}

var kprintf = ksprintf;

exports.pp_open_box = pp_open_box;
exports.open_box = open_box;
exports.pp_close_box = pp_close_box;
exports.close_box = close_box;
exports.pp_open_hbox = pp_open_hbox;
exports.open_hbox = open_hbox;
exports.pp_open_vbox = pp_open_vbox;
exports.open_vbox = open_vbox;
exports.pp_open_hvbox = pp_open_hvbox;
exports.open_hvbox = open_hvbox;
exports.pp_open_hovbox = pp_open_hovbox;
exports.open_hovbox = open_hovbox;
exports.pp_print_string = pp_print_string;
exports.print_string = print_string;
exports.pp_print_as = pp_print_as;
exports.print_as = print_as;
exports.pp_print_int = pp_print_int;
exports.print_int = print_int;
exports.pp_print_float = pp_print_float;
exports.print_float = print_float;
exports.pp_print_char = pp_print_char;
exports.print_char = print_char;
exports.pp_print_bool = pp_print_bool;
exports.print_bool = print_bool;
exports.pp_print_space = pp_print_space;
exports.print_space = print_space;
exports.pp_print_cut = pp_print_cut;
exports.print_cut = print_cut;
exports.pp_print_break = pp_print_break;
exports.print_break = print_break;
exports.pp_force_newline = pp_force_newline;
exports.force_newline = force_newline;
exports.pp_print_if_newline = pp_print_if_newline;
exports.print_if_newline = print_if_newline;
exports.pp_print_flush = pp_print_flush;
exports.print_flush = print_flush;
exports.pp_print_newline = pp_print_newline;
exports.print_newline = print_newline;
exports.pp_set_margin = pp_set_margin;
exports.set_margin = set_margin;
exports.pp_get_margin = pp_get_margin;
exports.get_margin = get_margin;
exports.pp_set_max_indent = pp_set_max_indent;
exports.set_max_indent = set_max_indent;
exports.pp_get_max_indent = pp_get_max_indent;
exports.get_max_indent = get_max_indent;
exports.pp_set_max_boxes = pp_set_max_boxes;
exports.set_max_boxes = set_max_boxes;
exports.pp_get_max_boxes = pp_get_max_boxes;
exports.get_max_boxes = get_max_boxes;
exports.pp_over_max_boxes = pp_over_max_boxes;
exports.over_max_boxes = over_max_boxes;
exports.pp_open_tbox = pp_open_tbox;
exports.open_tbox = open_tbox;
exports.pp_close_tbox = pp_close_tbox;
exports.close_tbox = close_tbox;
exports.pp_set_tab = pp_set_tab;
exports.set_tab = set_tab;
exports.pp_print_tab = pp_print_tab;
exports.print_tab = print_tab;
exports.pp_print_tbreak = pp_print_tbreak;
exports.print_tbreak = print_tbreak;
exports.pp_set_ellipsis_text = pp_set_ellipsis_text;
exports.set_ellipsis_text = set_ellipsis_text;
exports.pp_get_ellipsis_text = pp_get_ellipsis_text;
exports.get_ellipsis_text = get_ellipsis_text;
exports.pp_open_tag = pp_open_tag;
exports.open_tag = open_tag;
exports.pp_close_tag = pp_close_tag;
exports.close_tag = close_tag;
exports.pp_set_tags = pp_set_tags;
exports.set_tags = set_tags;
exports.pp_set_print_tags = pp_set_print_tags;
exports.set_print_tags = set_print_tags;
exports.pp_set_mark_tags = pp_set_mark_tags;
exports.set_mark_tags = set_mark_tags;
exports.pp_get_print_tags = pp_get_print_tags;
exports.get_print_tags = get_print_tags;
exports.pp_get_mark_tags = pp_get_mark_tags;
exports.get_mark_tags = get_mark_tags;
exports.pp_set_formatter_out_channel = pp_set_formatter_out_channel;
exports.set_formatter_out_channel = set_formatter_out_channel;
exports.pp_set_formatter_output_functions = pp_set_formatter_output_functions;
exports.set_formatter_output_functions = set_formatter_output_functions;
exports.pp_get_formatter_output_functions = pp_get_formatter_output_functions;
exports.get_formatter_output_functions = get_formatter_output_functions;
exports.pp_set_formatter_out_functions = pp_set_formatter_out_functions;
exports.set_formatter_out_functions = set_formatter_out_functions;
exports.pp_get_formatter_out_functions = pp_get_formatter_out_functions;
exports.get_formatter_out_functions = get_formatter_out_functions;
exports.pp_set_formatter_tag_functions = pp_set_formatter_tag_functions;
exports.set_formatter_tag_functions = set_formatter_tag_functions;
exports.pp_get_formatter_tag_functions = pp_get_formatter_tag_functions;
exports.get_formatter_tag_functions = get_formatter_tag_functions;
exports.formatter_of_out_channel = formatter_of_out_channel;
exports.std_formatter = std_formatter;
exports.err_formatter = err_formatter;
exports.formatter_of_buffer = formatter_of_buffer;
exports.stdbuf = stdbuf;
exports.str_formatter = str_formatter;
exports.flush_str_formatter = flush_str_formatter;
exports.make_formatter = make_formatter;
exports.formatter_of_out_functions = formatter_of_out_functions;
exports.make_symbolic_output_buffer = make_symbolic_output_buffer;
exports.clear_symbolic_output_buffer = clear_symbolic_output_buffer;
exports.get_symbolic_output_buffer = get_symbolic_output_buffer;
exports.flush_symbolic_output_buffer = flush_symbolic_output_buffer;
exports.add_symbolic_output_item = add_symbolic_output_item;
exports.formatter_of_symbolic_output_buffer = formatter_of_symbolic_output_buffer;
exports.pp_print_list = pp_print_list;
exports.pp_print_text = pp_print_text;
exports.fprintf = fprintf;
exports.printf = printf;
exports.eprintf = eprintf;
exports.sprintf = sprintf;
exports.asprintf = asprintf;
exports.ifprintf = ifprintf;
exports.kfprintf = kfprintf;
exports.ikfprintf = ikfprintf;
exports.ksprintf = ksprintf;
exports.kasprintf = kasprintf;
exports.bprintf = bprintf;
exports.kprintf = kprintf;
exports.set_all_formatter_output_functions = set_all_formatter_output_functions;
exports.get_all_formatter_output_functions = get_all_formatter_output_functions;
exports.pp_set_all_formatter_output_functions = pp_set_all_formatter_output_functions;
exports.pp_get_all_formatter_output_functions = pp_get_all_formatter_output_functions;
/* blank_line Not a pure module */
