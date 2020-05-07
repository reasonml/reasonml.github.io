'use strict';

var Block = require("./block.js");
var Curry = require("./curry.js");
var Printf = require("./printf.js");
var Caml_gc = require("./caml_gc.js");

var dummy_stat = {
  minor_words: 0,
  promoted_words: 0,
  major_words: 0,
  minor_collections: 0,
  major_collections: 0,
  heap_words: 0,
  heap_chunks: 0,
  live_words: 0,
  live_blocks: 0,
  free_words: 0,
  free_blocks: 0,
  largest_free: 0,
  fragments: 0,
  compactions: 0,
  top_heap_words: 0,
  stack_size: 0
};

function stat(param) {
  return dummy_stat;
}

function quick_stat(param) {
  return dummy_stat;
}

function get(param) {
  return {
          minor_heap_size: 0,
          major_heap_increment: 0,
          space_overhead: 0,
          verbose: 0,
          max_overhead: 0,
          stack_limit: 0,
          allocation_policy: 0,
          window_size: 0
        };
}

function print_stat(c) {
  var st = stat(undefined);
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
          ]), st.minor_collections);
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
          ]), st.major_collections);
  Curry._1(Printf.fprintf(c, /* Format */[
            /* String_literal */Block.__(11, [
                "compactions:       ",
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
            "compactions:       %d\n"
          ]), st.compactions);
  Printf.fprintf(c, /* Format */[
        /* Char_literal */Block.__(12, [
            /* "\n" */10,
            /* End_of_format */0
          ]),
        "\n"
      ]);
  var l1 = Curry._1(Printf.sprintf(/* Format */[
            /* Float */Block.__(8, [
                /* Float_f */0,
                /* No_padding */0,
                /* Lit_precision */[0],
                /* End_of_format */0
              ]),
            "%.0f"
          ]), st.minor_words).length;
  Curry._2(Printf.fprintf(c, /* Format */[
            /* String_literal */Block.__(11, [
                "minor_words:    ",
                /* Float */Block.__(8, [
                    /* Float_f */0,
                    /* Arg_padding */Block.__(1, [/* Right */1]),
                    /* Lit_precision */[0],
                    /* Char_literal */Block.__(12, [
                        /* "\n" */10,
                        /* End_of_format */0
                      ])
                  ])
              ]),
            "minor_words:    %*.0f\n"
          ]), l1, st.minor_words);
  Curry._2(Printf.fprintf(c, /* Format */[
            /* String_literal */Block.__(11, [
                "promoted_words: ",
                /* Float */Block.__(8, [
                    /* Float_f */0,
                    /* Arg_padding */Block.__(1, [/* Right */1]),
                    /* Lit_precision */[0],
                    /* Char_literal */Block.__(12, [
                        /* "\n" */10,
                        /* End_of_format */0
                      ])
                  ])
              ]),
            "promoted_words: %*.0f\n"
          ]), l1, st.promoted_words);
  Curry._2(Printf.fprintf(c, /* Format */[
            /* String_literal */Block.__(11, [
                "major_words:    ",
                /* Float */Block.__(8, [
                    /* Float_f */0,
                    /* Arg_padding */Block.__(1, [/* Right */1]),
                    /* Lit_precision */[0],
                    /* Char_literal */Block.__(12, [
                        /* "\n" */10,
                        /* End_of_format */0
                      ])
                  ])
              ]),
            "major_words:    %*.0f\n"
          ]), l1, st.major_words);
  Printf.fprintf(c, /* Format */[
        /* Char_literal */Block.__(12, [
            /* "\n" */10,
            /* End_of_format */0
          ]),
        "\n"
      ]);
  var l2 = Curry._1(Printf.sprintf(/* Format */[
            /* Int */Block.__(4, [
                /* Int_d */0,
                /* No_padding */0,
                /* No_precision */0,
                /* End_of_format */0
              ]),
            "%d"
          ]), st.top_heap_words).length;
  Curry._2(Printf.fprintf(c, /* Format */[
            /* String_literal */Block.__(11, [
                "top_heap_words: ",
                /* Int */Block.__(4, [
                    /* Int_d */0,
                    /* Arg_padding */Block.__(1, [/* Right */1]),
                    /* No_precision */0,
                    /* Char_literal */Block.__(12, [
                        /* "\n" */10,
                        /* End_of_format */0
                      ])
                  ])
              ]),
            "top_heap_words: %*d\n"
          ]), l2, st.top_heap_words);
  Curry._2(Printf.fprintf(c, /* Format */[
            /* String_literal */Block.__(11, [
                "heap_words:     ",
                /* Int */Block.__(4, [
                    /* Int_d */0,
                    /* Arg_padding */Block.__(1, [/* Right */1]),
                    /* No_precision */0,
                    /* Char_literal */Block.__(12, [
                        /* "\n" */10,
                        /* End_of_format */0
                      ])
                  ])
              ]),
            "heap_words:     %*d\n"
          ]), l2, st.heap_words);
  Curry._2(Printf.fprintf(c, /* Format */[
            /* String_literal */Block.__(11, [
                "live_words:     ",
                /* Int */Block.__(4, [
                    /* Int_d */0,
                    /* Arg_padding */Block.__(1, [/* Right */1]),
                    /* No_precision */0,
                    /* Char_literal */Block.__(12, [
                        /* "\n" */10,
                        /* End_of_format */0
                      ])
                  ])
              ]),
            "live_words:     %*d\n"
          ]), l2, st.live_words);
  Curry._2(Printf.fprintf(c, /* Format */[
            /* String_literal */Block.__(11, [
                "free_words:     ",
                /* Int */Block.__(4, [
                    /* Int_d */0,
                    /* Arg_padding */Block.__(1, [/* Right */1]),
                    /* No_precision */0,
                    /* Char_literal */Block.__(12, [
                        /* "\n" */10,
                        /* End_of_format */0
                      ])
                  ])
              ]),
            "free_words:     %*d\n"
          ]), l2, st.free_words);
  Curry._2(Printf.fprintf(c, /* Format */[
            /* String_literal */Block.__(11, [
                "largest_free:   ",
                /* Int */Block.__(4, [
                    /* Int_d */0,
                    /* Arg_padding */Block.__(1, [/* Right */1]),
                    /* No_precision */0,
                    /* Char_literal */Block.__(12, [
                        /* "\n" */10,
                        /* End_of_format */0
                      ])
                  ])
              ]),
            "largest_free:   %*d\n"
          ]), l2, st.largest_free);
  Curry._2(Printf.fprintf(c, /* Format */[
            /* String_literal */Block.__(11, [
                "fragments:      ",
                /* Int */Block.__(4, [
                    /* Int_d */0,
                    /* Arg_padding */Block.__(1, [/* Right */1]),
                    /* No_precision */0,
                    /* Char_literal */Block.__(12, [
                        /* "\n" */10,
                        /* End_of_format */0
                      ])
                  ])
              ]),
            "fragments:      %*d\n"
          ]), l2, st.fragments);
  Printf.fprintf(c, /* Format */[
        /* Char_literal */Block.__(12, [
            /* "\n" */10,
            /* End_of_format */0
          ]),
        "\n"
      ]);
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
          ]), st.live_blocks);
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
          ]), st.free_blocks);
  return Curry._1(Printf.fprintf(c, /* Format */[
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
                ]), st.heap_chunks);
}

function allocated_bytes(param) {
  var match = Caml_gc.caml_gc_counters(undefined);
  return (match[0] + match[2] - match[1]) * 4;
}

function finalise_last(param, param$1) {
  
}

function call_alarm(arec) {
  if (arec.active.contents) {
    Caml_gc.caml_final_register(call_alarm, arec);
    return Curry._1(arec.f, undefined);
  }
  
}

function create_alarm(f) {
  var arec_active = {
    contents: true
  };
  var arec = {
    active: arec_active,
    f: f
  };
  Caml_gc.caml_final_register(call_alarm, arec);
  return arec_active;
}

function delete_alarm(a) {
  a.contents = false;
  
}

var finalise = Caml_gc.caml_final_register;

var finalise_release = Caml_gc.caml_final_release;

exports.stat = stat;
exports.quick_stat = quick_stat;
exports.get = get;
exports.print_stat = print_stat;
exports.allocated_bytes = allocated_bytes;
exports.finalise = finalise;
exports.finalise_last = finalise_last;
exports.finalise_release = finalise_release;
exports.create_alarm = create_alarm;
exports.delete_alarm = delete_alarm;
/* No side effect */
