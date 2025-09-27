/**
 * @file Parser for the PDDL language
 * @author Arthur Bit-Monnot <abitmonnot@laas.fr>
 * @license MIT
 *
 * Implementation adapted (mostly for simplification) from elisp's grammar: https://github.com/Wilfred/tree-sitter-elisp
 */

const COMMENT = token(/;.*/);

const STRING = token(
  seq('"', repeat(choice(/[^"\\]/, seq("\\", /(.|\n)/))), '"'),
);

const SYMBOL = token(/[^\s\f();]+/);
// keyword start with ':'
const KEYWORD = token(/:[^\s\f();]+/);
// keyword start with '?'
const PARAMETER = token(/\?[^\s\f();]+/);
// any other symbol
const IDENTIFIER = token(/[^\?:\s\f();][^\s\f();]*/);

const INTEGER_BASE10 = token(/[+-]?[0-9]+\.?/);
const INTEGER_WITH_BASE = token(/#([box]|[0-9][0-9]?r)[0-9a-zA-Z]/);

const FLOAT_WITH_DEC_POINT = token(/[+-]?[0-9]*\.[0-9]+/);
const FLOAT_WITH_EXPONENT = token(/[+-]?[0-9]+[eE][0-9]+/);
const FLOAT_WITH_BOTH = token(/[+-]?[0-9]*\.[0-9]+[eE][0-9]+/);
const FLOAT_INF = token(/-?1.0[eE]\+INF/);

module.exports = grammar({
  name: "pddl",

  extras: ($) => [/(\s|\f)/, $.comment],
  supertypes: ($) => [$.expression],

  rules: {
    pddl: ($) => seq("(", repeat(choice($.action, $.expression)), ")"),

    action: ($) => seq("(", ":action", $.ident, repeat($.expression), ")"),

    expression: ($) => choice($.list, $._atom),

    _atom: ($) => choice($.number, $.string, $.keyword, $.param, $.ident),

    keyword: ($) => KEYWORD,
    actionkw: ($) => "action",
    param: ($) => PARAMETER,
    number: ($) => choice($._float, $._integer),
    _float: ($) =>
      choice(
        FLOAT_WITH_DEC_POINT,
        FLOAT_WITH_EXPONENT,
        FLOAT_WITH_BOTH,
        FLOAT_INF,
      ),
    _integer: ($) => choice(INTEGER_BASE10, INTEGER_WITH_BASE),
    string: ($) => STRING,
    ident: ($) => IDENTIFIER,

    list: ($) => seq("(", choice(repeat($.expression)), ")"),

    comment: ($) => COMMENT,
  },
});
