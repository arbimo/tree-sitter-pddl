# Tree Sitter grammar for PDDL

This repository provides a very primitive grammar for PDDL, which is used for an extension to the Zed editor: [zed-pddl](https://github.com/arbimo/zed-pddl).

The grammar is very minimal, mostly parsing everything as a big S-Expression. One of the motivation for this is to be very robust wrt to what we parse and have the basic syntax highlighting work even for PDDL variants and extensions.

Another reason for the very minimal parser and lack of pretty much everything that tree-sitter can do is that I am (very) far from mastering it.
