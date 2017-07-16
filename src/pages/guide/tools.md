---
title: Outils
order: 4
---

Reason-tools
-------

[Reason-tools](https://github.com/reasonml/reason-tools) is a convenient browser
extension for quickly toggling between OCaml syntax and Reason syntax. It also
prettifies the OCaml libraries documentation pages.
[Here](https://reasonml.github.io/reason-tools/popup.html)'s the standalone
version.

Command Line Utilities
-------

The Reason toolchain uses a few important tools that are used in the terminal,
and/or with your editor.

**Note**: the [JavaScript](./gettingStarted.html#javascript-workflow-editor-setup-global-utilities)
and [native](./nativeWorkflow.html#native-workflow-editor-setup-global-utilities)
workflow have different ways of installing  these tools. Please consult their
respective sections for the installation proper. This section only describes
what they are.

### Refmt

`refmt` ("Reason format") takes in your code text and spits it out, nicely formatted. Developers
use it pervasively to prettify their code, either through invoking it in the
terminal, or through an editor shortcut. It also serves to convert to/from
Reason/OCaml syntax.

`refmt` optionally takes in a column width, and **responsively** formats your
code based on it. In other words, it doesn't just naively break to the next line
at a certain characters limit; it solves the constrains and arranges your code
accordingly. Here's `refmt` inside Vim, called once per window resize (just to
show the point):

<img src="images/LiquidSmallOptCrop.gif" style="width:100%; max-width:466px; max-height:433px;" />

The Reason community uses it to enforce a consistent style and avoid time-consuming
manual formatting & stylistic debates.

See `refmt --help` for the options.

### Merlin

[Merlin](https://github.com/ocaml/merlin) provides type hint, refactor, real-
time errors, jump to definitions, etc. to our editors.


Merlin's command line name is called `ocamlmerlin`, though you wouldn't call it
manually (editors start it themselves and query it). To configure Merlin to
understand your project, you'd write a `.merlin` file at the root (documentation
[here](https://github.com/ocaml/merlin/wiki/project-configuration)).

**Note**: For the JS workflow, we generate the `.merlin` file for you, so no
need to worry about it.

Merlin is for OCaml, but has first-class support for Reason. **For the support to
work, you'd need the `ocamlmerlin-reason` binary**. Again, the installation of
these utilities are described in the [JS Workflow](./gettingStarted.html#javascript-workflow-editor-setup-global-utilities)
and [Native Workflow](./nativeWorkflow.html#native-workflow-editor-setup-global-utilities)
page.


### REPL

Reason comes with a REPL called `rtop` which lets you interactively evaluate
Reason. It features intelligent, type-driven autocompletion.

<img src="images/RtopOptCrop.gif" style="width:100%; max-width:466px; max-height:433px;">


```sh
# The rtop command begins a REPL session
rtop
```

```sh
let myVar = "Hello Reason!";
# myVar: bytes = "Hello Reason!"

let result = 100 + 200;
# result : int = 300;
```

Use `#quit;` to close your REPL session.

Editor Integration
=======

All our editor integrations provides at minimum:

- Displaying types.
- `refmt`-ing a file.
- Showing errors
- Syntax highlighting.

They're powered by Reason's `refmt` and Merlin, mentioned in the previous sections.

### VSCode (recommended)

The Visual Studio Code Reason plugin offers lots of great features and polish.
https://github.com/freebroccolo/vscode-reasonml

### Atom

You can install the [Atom](https://atom.io/) Reason integration through either
[atom-ocaml-merlin](https://atom.io/packages/ocaml-merlin) or
[Nuclide](https://nuclide.io/). The former is lighter.

<img style="width:100%; max-width:470px; max-height:440px" src="images/AtomAutocomplete.png" />

#### OCaml-Merlin
As per the instructions [here](https://atom.io/packages/ocaml-merlin), you'll also need:

- [language-reason](https://atom.io/packages/language-reason)
- [linter-refmt](https://atom.io/packages/linter-refmt)
- [reason-refmt](https://atom.io/packages/reason-refmt)

As noted on the page, you'll also need the linter (which itself needs Linter-ui-default,
Intention and Busy-signal).

**Note**: if you've installed the global binaries through the [JS Workflow](./gettingStarted.html#javascript-workflow-project-setup) then you can ignore the `opam install merlin` instructions at the end.

#### Nuclide
Alternatively, if you use Nuclide:

- Open the package installer from the menu `Packages > Settings View > Install Packages and Themes`.
- Search for and install `nuclide` if not already installed.
- If you don't want to turn on all of Nuclide's features, you can disable most of it except for:
  - nuclide-ocaml
  - hyperclick
  - autocomplete
  - linter
  - nuclide-code-format
  - nuclide-outline-view
  - nuclide-datatip
  - nuclide-language-reason
  - nuclide-type-hint

We piggy back on Nuclide's facilities (formatting, diagnosis, datatip). `⌘+shift+p` and search for these keywords).

### Vim

Install [vim-reason](https://github.com/reasonml-editor/vim-reason) like you would any Vim plugin.

For example, through [NeoBundle](https://github.com/Shougo/neobundle.vim):

```
NeoBundle 'reasonml-editor/vim-reason'
```

Likewise for [vim-plug](https://github.com/junegunn/vim-plug) and others.

<img src="images/VimReason.png" style="width:100%; max-width:470px; max-height:440px" />

#### Merlin

`merlin` has built in `Vim` support.

Completion is provided using `omnifunc`. By default you can trigger it with `<C-X><C-O>` while in insert mode.
If you use completion plugins, most of them can use `omni` as a source.

```
" deoplete

let g:deoplete#omni_patterns = {}
let g:deoplete#omni_patterns.reason = '[^. *\t]\.\w*\|\h\w*|#'
let g:deoplete#sources = {}
let g:deoplete#sources.reason = ['omni', 'buffer']

" neocomplete and YouCompleteMe work out of the box
```

You can use syntactic checks with plugins like [Syntastic](https://github.com/vim-syntastic/syntastic) (vim-reason should just work with it out of the box), ALE, and others.

```
" For ALE

let g:ale_linter_aliases = {'reason': 'ocaml'}
```

See the other provided Merlin features in the [README](https://github.com/reasonml-editor/vim-reason#merlin).

The command `:ReasonPrettyPrint` invokes the binary `refmt` and formats text in the current buffer.
You can set `g:vimreason_extra_args_expr_reason` variable to control the arguments passed to `refmt` (such as `--print-width`).

### Emacs

[Reason-mode](https://github.com/arichiardi/reason-mode) provides `refmt` and optional REPL support.
For Merlin support, merlin-mode is on [Elpa](https://www.emacswiki.org/emacs/ELPA). Please see merlin-mode's usage [here](https://github.com/ocaml/merlin/wiki/emacs-from-scratch#discovering-the-emacs-mode) (ignore the installation part above).

### Sublime Text
*Experimental*. Doesn't support Merlin yet!
https://github.com/reasonml-editor/sublime-reason

### IDEA
*Experimental*.
https://github.com/reasonml-editor/reasonml-idea-plugin
