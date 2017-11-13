---
title: Comparison to OCaml
order: 50
---
If you come from OCaml or are a newcomer reading a tutorial written on OCaml, this guide's for you! But don't forget that [reason-tools](https://github.com/reasonml/reason-tools) can convert between OCaml and Reason syntax on the fly.

### Comments

| OCaml                  | Reason                   |
| ---------------------- | ------------------------ |
| `(* OCaml (*nest*) *)` | `/* Reason /*nest*/  */` |

### Operator Renaming

Reason has all of OCaml's infix operators, but a couple of operators are expressed differently. In Reason, structural equality is written as `==`, and reference (physical) equality is written as `===`. In Reason, to achieve the corresponding inequality, simply swap the first character with a `!` character. (`!=` for structural inequality, and `!==` for reference inequality).

| Equality   | OCaml    | Reason    |
| ---------- | -------- | --------- |
| Structural | `x = y`  | `x == y`  |
| Reference  | `x == y` | `x === y` |

| Inequality | OCaml          | Reason    |
| ---------- | -------------- | --------- |
| Structural | `x <> y` | `x != y`  |
| Reference  | `x != y`       | `x !== y` |

### Local Scope

Reason's lexical scoping is exactly the same as OCaml's, but let bindings syntactically resemble "block scope" which is more familiar to many developers. In Reason, they are created with `{}` braces, which may contain both `let` bindings and imperative commands, separated by `;`. All blocks evaluate to the last line and the semicolon on the last line is optional. `{}` braces are only needed if you have more than one item to chain together via `;`.

<table>
  <tr>
    <th scope="col">
      <p>
        OCaml
      </p>
    </th>
    
    <th scope="col">
      <p>
        Reason
      </p>
    </th>
  </tr>
  
  <tr>
    <td>
      <pre>
let _ =
  let msg = "Hello" in
  print_string msg;
  let msg2 = "Goodbye" in
  print_string msg2</pre>
    </td>
    
    <td>
      <pre>
{
  let msg = "Hello";
  print_string(msg);
  let msg2 = "Goodbye";
  print_string(msg2)
};</pre>
    </td>
  </tr>
</table>

Reason's `{}` syntax removes many commonly reported pain points in OCaml's syntax:

- Double semicolons are removed entirely.
- `begin`/`end` is removed entirely.
- Infamous imperative parsing [issues](https://github.com/ocaml/ocaml/pull/278) are gone.
- Module bodies and local scope are unified.

### Local Scope Vs. Module Body

In Reason, everything that can go between the `{}` in [Local Scopes](#local-scope) and in module bodies. You can usually even cut/paste code between the two contexts. In OCaml, the syntaxes for the two contexts are very different. Local scope requires trailing `in`, but module bodies do not and some imperative statements must be assigned to `_` or `()`, or else use double `;;`.

<table>
  <tr>
    <th scope="col">
      <p>
        OCaml Module Body
      </p>
    </th>
    
    <th scope="col">
      <p>
        Reason Module Body
      </p>
    </th>
  </tr>
  
  <tr>
    <td>
      <pre>
let ten = 10
let () = imperativeFunc ten ten
let () = imperativeFunc 0 0</pre>
    </td>
    
    <td>
      <pre>
let ten = 10;
imperativeFunc(ten, ten);
imperativeFunc(0, 0);</pre>
    </td>
  </tr>
  
  <tr>
    <td>
      <pre>
let ten = 10;;
imperativeFunc ten ten;;
imperativeFunc 0 0;;</pre>
    </td>
    
    <td>
      Same as above
    </td>
  </tr>
  
  <tr>
    <th scope="col">
      <p>
        OCaml Local Scope
      </p>
    </th>
    
    <th scope="col">
      <p>
        Reason Local Scope
      </p>
    </th>
  </tr>
  
  <tr>
    <td>
      <pre>
let ten = 10 in
let _ = imperativeFunc ten ten in
imperativeFunc 0 0</pre>
    </td>
    
    <td>
      same as above
    </td>
  </tr>
  
  <tr>
    <td>
      <pre>
let ten = 10 in begin
  imperativeFunc ten ten;
  imperativeFunc 0 0
end</pre>
    </td>
    
    <td>
      same as above
    </td>
  </tr>
  
  <tr>
    <td>
      <pre>
let ten = 10 in (
  imperativeFunc ten ten;
  imperativeFunc 0 0
)</pre>
    </td>
    
    <td>
      same as above
    </td>
  </tr>
</table>

### Tuple and Record

In Reason, tuples always require parentheses.

| OCaml                              | Reason                        |
| ---------------------------------- | ----------------------------- |
| `let tup = 4, 5`                   | `let tup = (4, 5);`           |
| `let tup = ((1: int), (2:int))`    | `let tup = (1: int, 2:int);`  |
| `fun ((a: int), (b: int)) -> a` | `((a: int, b: int)) => a;` |

In Reason, record values resemble JavaScript, using `:` instead of `=`. Because Reason tuples always require wrapping parens, records may contain lambdas as values without needing extra parens.

<table>
  <tr>
    <th scope="col">
      <p>
        OCaml
      </p>
    </th>
    
    <th scope="col">
      <p>
        Reason
      </p>
    </th>
  </tr>
  
  <tr>
    <td>
      <pre>
let myRec = {x = 0; y = 10}</pre>
    </td>
    
    <td>
      <pre>
let myRec = {x: 0, y: 10};</pre>
    </td>
  </tr>
  
  <tr>
    <td>
      <pre>
let myFuncs = {
  myFun = (fun x -> x + 1);
  your = (fun a b -> a + b);
}</pre>
    </td>
    
    <td>
      <pre>
let myFuncs = {
  myFun: (x) => x + 1,
  your: (a, b) => a + b
};</pre>
    </td></table> 
    
    <h3>
      Lists
    </h3>
    
    <table>
      <tr>
        <th>
          OCaml
        </th>
        
        <th>
          Reason
        </th>
      </tr>
      
      <tr>
        <td>
          <code>let list = [1; 2; 3]</code>
        </td>
        
        <td>
          <code>let list = [1, 2, 3]</code>
        </td>
      </tr>
      
      <tr>
        <td>
          <code>let list = hd :: tl</code>
        </td>
        
        <td>
          <code>let list = [hd, ...tl];</code>
        </td>
      </tr>
    </table>
    
    <h3>
      Type Definitions
    </h3>
    
    <table>
      <tr>
        <th>
          OCaml Tuple
        </th>
        
        <th>
          Reason Tuple
        </th>
      </tr>
      
      <tr>
        <td>
          <code>type tuple = int * int</code>
        </td>
        
        <td>
          <code>type tuple = (int, int);</code>
        </td>
      </tr>
      
      <tr>
        <td>
          <code>let tup: tuple = (10, 30)</code>
        </td>
        
        <td>
          <code>let tup: tuple = (10, 30);</code>
        </td>
      </tr>
    </table>
    
    <table>
      <tr>
        <th>
          OCaml Record
        </th>
        
        <th>
          Reason Record
        </th>
      </tr>
      
      <tr>
        <td>
          <code>type r = {x: int; y: int}</code>
        </td>
        
        <td>
          <code>type r = {x: int, y: int};</code>
        </td>
      </tr>
      
      <tr>
        <td>
          <code>let myRec: r = {x = 0; y = 10}</code>
        </td>
        
        <td>
          <code>let myRec: r = {x: 0, y: 10};</code>
        </td>
      </tr>
    </table>
    
    <table>
      <tr>
        <th>
          OCaml Function
        </th>
        
        <th>
          Reason Function
        </th>
      </tr>
      
      <tr>
        <td>
          <code>type func = int -&gt; int</code>
        </td>
        
        <td>
          <code>type func = int =&gt; int;</code>
        </td>
      </tr>
      
      <tr>
        <td>
          <code>let x: func = fun a -&gt; a + 1</code>
        </td>
        
        <td>
          <code>let x: func = (a) =&gt; a + 1;</code>
        </td>
      </tr>
    </table>
    
    <h3>
      Functions
    </h3>
    
    <table>
      <tr>
        <th>
          OCaml
        </th>
        
        <th>
          Reason
        </th>
      </tr>
      
      <tr>
        <td>
          <code>let x a b = e</code>
        </td>
        
        <td>
          <code>let x = (a, b) =&gt; e</code>
        </td>
      </tr>
      
      <tr>
        <td>
          <code>let x = fun a b -&gt; e</code>
        </td>
        
        <td>
          <code>let x = (a, b) =&gt; e</code>
        </td>
      </tr>
      
      <tr>
        <td>
          <code>let x = fun a -&gt; fun b -&gt; e</code>
        </td>
        
        <td>
          <code>let x = (a, b) =&gt; e</code>
        </td>
      </tr>
    </table>
    
    <h4>
      Single argument match functions
    </h4>
    
    <p>
      OCaml has a function definition (<code>function |</code>) which is considered to be equivalent of <code>function a -&gt; match a with ...</code>. Reason has the same, but the syntax makes it clear how it is actually an extension of a single argument function. The single case match is a natural extension of the simple lambda, and the multicase lambda is a natural extension of the single case lambda.
    </p>
    
    <table>
      <tr>
        <th scope="col">
          <p>
            Form
          </p>
        </th>
        
        <th scope="col">
          <p>
            OCaml
          </p>
        </th>
        
        <th scope="col">
          <p>
            Reason
          </p>
        </th>
      </tr>
      
      <tr>
        <td>
          lambda
        </td>
        
        <td>
          <pre>
fun pat -> e</pre>
        </td>
        
        <td>
          <pre>
fun pat => e</pre>
        </td>
      </tr>
      
      <tr>
        <td>
          one match case
        </td>
        
        <td>
          <pre>
function | pat -> e</pre>
        </td>
        
        <td>
          <pre>
fun | pat => e</pre>
        </td>
      </tr>
      
      <tr>
        <td>
          many cases
        </td>
        
        <td>
          <pre>
function | pat -> e
         | pat2 -> e</pre>
        </td>
        
        <td>
          <pre>
fun | pat => e
    | pat2 => e</pre>
        </td>
      </tr>
    </table>
    
    <h4>
      Annotating Arguments
    </h4>
    
    <p>
      In both Reason and OCaml, arguments are annotated with types by (as with everything else), wrapping them in parenthesis after appending <code>:typeAnnotation</code>.
    </p>
    
    <pre><code class="reason">(arg: argType) =&gt; returnValue;
</code></pre>
    
    <pre><code class="reason">(arg: argType) =&gt; (arg2: arg2Type) =&gt; returnValue;
</code></pre>
    
    <pre><code class="reason">(arg: argType, arg2: arg2Type) =&gt; returnValue;
</code></pre>
    
    <p>
      Both Reason and OCaml allow annotating the return type, when using the "super sugared let binding" form.
    </p>
    
    <pre><code class="ocaml">(* OCaml *)
let myFunc (a:int) (b:int) :int * int = (a, b)
let myFunc (a:int) (b:int) :int list = [1]
let myFunc (a:int) (b:int) :int -&gt; int = fun x -&gt; x + a + b
</code></pre>
    
    <pre><code class="reason">/* Reason */
let myFunc = (a: int, b: int) :(int, int) =&gt; (a, b);
let myFunc = (a: int, b: int) :list(int) =&gt; [1];
let myFunc = (a: int, b: int): (int =&gt; int) =&gt; (x) =&gt; x + a + b;
</code></pre>
    
    <p>
      Because we're using <code>=&gt;</code> for all functions everywhere in Reason, there's one case where we need to add extra parens around a return type that is itself a function type.
    </p>
    
    <h4>
      Type Parameters
    </h4>
    
    <h5>
      OCaml
    </h5>
    
    <p>
      OCaml's type applications (think "generics"), are applied in reverse order.
    </p>
    
    <p>
      With OCaml, there are some unintuitive consequences of this.
    </p>
    
    <pre><code class="ocaml">let x: int list = [2]

type listOfListOfInts = int list list

(* Parsed as: *)
type listOfListOfInts = (int list) list
</code></pre>
    
    <p>
      Things get even more strange when type constructors accept multiple parameters. Multiple arguments require parenthesis and commas to separate type parameters, but those parentheses don't represent tuples. The parentheses/comma form must also be given when constructing type instances such as <code>(int, string) tuple</code>.
    </p>
    
    <pre><code class="ocaml">type ('a, 'b) tuple = 'a * 'b

type listOfTuplesOfStringAndInt = (string, int) tuple list

(* Which is parsed as: *)
type listOfTuplesOfStringAndInt = ((string, int) tuple) list

(* Which allows a list of (tuples of (string and int)) *)
let tuples: listOfTuplesOfStringAndInt = [("asdf", 3)]
</code></pre>
    
    <h5>
      Reason
    </h5>
    
    <p>
      In summary, Reason unifies almost all of the syntax into simple "function application" style meaning that type parameters follow the same comma-separated pattern seen everywhere else in the syntax. This results in fewer syntactic patterns to learn.
    </p>
    
    <p>
      For example, you can imagine <code>list</code> being a "function" for types that accepts a type and returns a new type.
    </p>
    
    <table>
      <tr>
        <th scope="col">
          <p>
            OCaml
          </p>
        </th>
        
        <th scope="col">
          <p>
            Reason
          </p>
        </th>
      </tr>
      
      <tr>
        <td>
          <pre>
let x: int list = [2]
type listOfListOfInts = int list list
type ('a, 'b) tup = ('a * 'b)
type pairs = (int, int) tup list
let tuples: pairs = [(2, 3)]</pre>
        </td>
        
        <td>
          <pre>
let x: list(int) = [2];
type listOfListOfInts = list(list(int));
type tup('a, 'b) = ('a, 'b);
type pairs = list(tup(int, int));
let tuples: pairs = [(2, 3)];</pre>
        </td>
      </tr>
    </table>
    
    <h3>
      Tuples as Type Parameters
    </h3>
    
    <p>
      Because OCaml uses parens and commas to represent multiple arguments to type constructors, it's confusing when one of the arguments to a type constructor is itself a tuple. In OCaml, it's difficult to remember the difference between a type constructor accepting multiple arguments and a type constructor accepting a single argument which happens to be a tuple.
    </p>
    
    <p>
      The following examples shows the difference between passing <em>two</em> type parameters to <code>pair</code>, and a <em>single</em> type parameter that happens to be a tuple.
    </p>
    
    <table>
      <tr>
        <th>
          OCaml
        </th>
        
        <th>
          Reason
        </th>
      </tr>
      
      <tr>
        <td>
          <code>type intPair = (int, int) pair</code>
        </td>
        
        <td>
          <code>type intPair = pair(int, int)</code>
        </td>
      </tr>
      
      <tr>
        <td>
          <code>type pairList = (int * int) list</code>
        </td>
        
        <td>
          <code>type pairList = list((int, int))</code>
        </td>
      </tr>
    </table>
    
    <ul>
      <li>
        In Reason, syntax that represent tuple or tuple types, always looks like tuples.
      </li>
      <li>
        In Reason, syntax that represent records or record types, always look like records.
      </li>
      <li>
        Just about everything else uses the syntactic pattern of function application (comma separated arguments).
      </li>
    </ul>
    
    <h3>
      Variants
    </h3>
    
    <h6>
      OCaml
    </h6>
    
    <ul>
      <li>
        OCaml already expects constructor argument types to be specified in tuple form, so it's confusing when a single constructor expects a single argument that <em>happens</em> to be a tuple type.
      </li>
      <li>
        What's even more confusing is that the constructors don't <em>actually</em> accept tuples, yet the syntax appear to resemble tuples.
      </li>
      <li>
        Sometimes the syntax for instantiating a constructor with multiple arguments overlaps the syntax for constructing a variant with a single argument that happens to be a tuple - so it looks <em>exactly</em> like you <em>are</em> supplying a tuple when you are not actually supplying a tuple.
      </li>
    </ul>
    
    <h6>
      Reason
    </h6>
    
    <ul>
      <li>
        Variant constructor types are expected to be listed as comma separated lists, using parenthesis to group precedence (as with <strong>everything</strong> else).
      </li>
      <li>
        Constructing instances of the variant (as you would have guessed) follows function application style (comma separated lists).
      </li>
      <li>
        Tuples <strong>always</strong> <em>look</em> like tuples, and anything that looks like a tuple <em>is</em> a tuple.
      </li>
    </ul>
    
    <table>
      <tr>
        <th scope="col">
          <p>
            OCaml
          </p>
        </th>
        
        <th scope="col">
          <p>
            Reason
          </p>
        </th>
      </tr>
      
      <tr>
        <td>
          <pre>
type myVariant =
  | HasNothing
  | HasSingleInt of int
  | HasSingleTuple of (int * int)
  | HasMultipleInts of int * int
  | HasMultipleTuples of (int * int) * (int * int)
      </pre>
        </td>
        
        <td>
          <pre>
type myVariant =
  | HasNothing
  | HasSingleInt(int)
  | HasSingleTuple((int, int))
  | HasMultipleInts(int, int)
  | HasMultipleTuples((int, int), (int, int));
      </pre>
        </td>
      </tr>
      
      <tr>
        <td>
          <pre>
let a = HasSingleInt 10
let a = HasSingleTuple (10, 10)
let a = HasMultipleInts (10, 10)
let a = HasMultipleTuples ((10, 10), (10, 10))
      </pre>
        </td>
        
        <td>
          <pre>
let a = HasSingleInt(10);
let a = HasSingleTuple((10, 10));
let a = HasMultipleInts(10, 10);
let a = HasMultipleTuples((10, 10), (10, 10));
      </pre>
        </td>
      </tr>
      
      <tr>
        <td>
          <pre>
let res x = match x with
  | HasNothing -> 0
  | HasSingleInt x -> 0
  | HasSingleTuple (x, y) -> 0
  | HasMultipleInts (x, y) -> 0
  | HasMultipleTuples ((x, y), (q, r)) -> 0
      </pre>
        </td>
        
        <td>
          <pre>
let res = (x) =>
  switch x {
  | HasNothing => 0
  | HasSingleInt(x) => 0
  | HasSingleTuple((x, y)) => 0
  | HasMultipleInts(x, y) => 0
  | HasMultipleTuples((x, y), (q, r)) => 0
  };
      </pre>
        </td>
      </tr>
    </table>
    
    <h3>
      Pattern Matching
    </h3>
    
    <table>
      <tr>
        <th scope="col">
          <p>
            OCaml
          </p>
        </th>
        
        <th scope="col">
          <p>
            Reason
          </p>
        </th>
      </tr>
      
      <tr>
        <td>
          <pre>
let res = match x with
  | A (x, y) -> match y with
    | None -> 0
    | Some i -> 10
  | B (x, y) -> 0</pre>
        </td>
        
        <td>
          <pre>
let res = switch x {
  | A((x, y)) => switch y {
      | None => 0
      | Some(i) => 10
    }
  | B((x, y)) => 0
};
</pre>
        </td>
      </tr>
    </table>
    
    <p>
      Can you spot the error in the OCaml example? This is one of the most common mistakes among OCaml programmers. The nested <code>match</code> <em>must</em> be wrapped in parentheses, otherwise the <code>Some</code> case is parsed as belonging to the outer <code>match</code>. Visually, it's actually:
    </p>
    
    <pre><code class="ocaml">let res = match x with
  | A (x, y) -&gt; match y with
    | None -&gt; 0
    | Some i -&gt; 10
    | B (x, y) -&gt; 0
</code></pre>
    
    <p>
      Reason's mandatory <code>{}</code> around <code>switch</code> cases prevents this issue.
    </p>
    
    <h3>
      Modules and Signatures
    </h3>
    
    <h4>
      Definition
    </h4>
    
    <table>
      <tr>
        <th scope="col">
          <p>
            OCaml
          </p>
        </th>
        
        <th scope="col">
          <p>
            Reason
          </p>
        </th>
      </tr>
      
      <tr>
        <td>
          <pre>
module type MySig = sig
  type t = int
  val x: int
end
module MyModule: MySig = struct
  type t = int
  let x = 10
end
module MyModule = struct
  module NestedModule = struct
     let msg = "hello";
  end
end
      </pre>
        </td>
        
        <td>
          <pre>
module type MySig = {
  type t = int;
  let x: int;
};

module MyModule: MySig = {
  type t = int;
  let x = 10;
};

module MyModule = {
  module NestedModule = {
    let msg = "hello";
  };
};
      </pre>
        </td>
      </tr>
    </table>
    
    <h4>
      Functors Types
    </h4>
    
    <table>
      <tr>
        <th scope="col">
          <p>
            OCaml
          </p>
        </th>
        
        <th scope="col">
          <p>
            Reason
          </p>
        </th>
      </tr>
      
      <tr>
        <td>
          <pre>
module type FType =
  functor (A: ASig) ->
  functor (B: BSig) -> Result
      </pre>
        </td>
        
        <td>
          <pre>
module type FType =
  (A: ASig) =>
  (B: BSig) => Result;
      </pre>
        </td>
      </tr>
    </table>
    
    <h3>
      Functors
    </h3>
    
    <table>
      <tr>
        <th scope="col">
          <p>
            OCaml
          </p>
        </th>
        
        <th scope="col">
          <p>
            Reason
          </p>
        </th>
      </tr>
      
      <tr>
        <td>
          <pre>
module F =
  functor (A: ASig) ->
  functor (B: BSig) -> struct end</pre>
        </td>
        
        <td>
          <pre>
module F =
  (A: ASig) =>
  (B: BSig) => {};</pre>
        </td>
      </tr>
      
      <tr>
        <td>
          <pre>
module F = functor (A: ASig) (B: BSig) -> struct end</pre>
        </td>
        
        <td>
          <pre>
module F = (A: ASig, B: BSig) => {};</pre>
        </td>
      </tr>
      
      <tr>
        <td>
          <pre>
module F (A: ASig) (B: BSig) = struct end</pre>
        </td>
        
        <td>
          <pre>
module F (A: ASig, B: BSig) => {};</pre>
        </td>
      </tr>
      
      <tr>
        <td>
          <pre>
module Res = F(A)(B)</pre>
        </td>
        
        <td>
          <pre>
module Res = F(A, B);</pre>
        </td>
      </tr>
    </table>
    
    <p>
      <strong>Note: There is currently a known inconsistency where functors do not conform to function application syntax when in type annotation position - see <a href="https://github.com/facebook/reason">the Reason repo's</a> <code>formatTest/modules.re</code>.</strong>
    </p>
    
    <h3>
      Various Improvements
    </h3>
    
    <p>
      OCaml doesn't require parens around sequences <code>(a;b;c;d)</code> or tuples <code>(x,y)</code>, so that ends up ruling out a bunch of other very convenient syntax rules. Since Reason always uses <code>{}</code> to enclose sequences or let bindings, and Reason always requires <code>()</code> around tuples, many other syntax constructs are expressed more intuitively, without requiring extra wrapping in parenthesis.
    </p>
    
    <h4>
      Lambdas as record fields no longer need extra parens
    </h4>
    
    <p>
      This is a welcomed improvement because the OCaml type errors the user would see were very confusing when it would believe the function's return value was a tuple with infix <code>,</code> comma.
    </p>
    
    <table>
      <tr>
        <th scope="col">
          <p>
            OCaml
          </p>
        </th>
        
        <th scope="col">
          <p>
            Reason
          </p>
        </th>
      </tr>
      
      <tr>
        <td>
          <pre>
let myFuncs = {
  myFun = (fun x -> x + 1);
  your = (fun a b -> a + b);
}</pre>
        </td>
        
        <td>
          <pre>
let myFuncs = {
  myFun: (x) => x + 1,
  your: (a, b) => a + b
};</pre>
        </td>
      </tr>
    </table>
    
    <h4>
      Lambdas as match results no longer need extra parens
    </h4>
    
    <table>
      <tr>
        <th scope="col">
          <p>
            OCaml
          </p>
        </th>
        
        <th scope="col">
          <p>
            Reason
          </p>
        </th>
      </tr>
      
      <tr>
        <td>
          <pre>
let x = match prnt with
  | None -> fun a -> blah
  (* Extra () required ! *)
  | Some "_" -> (fun a -> ())
  | Some "ml" -> blah
      </pre>
        </td>
        
        <td>
          <pre>
let x =
  switch prnt {
  | None => (a) => blah
  | Some("_") => (a) => ()
  | Some("ml") => blah
  };</pre>
        </td>
      </tr>
    </table>
    
    <h4>
      Lambdas and type annotations in tuples no longer require extra parens
    </h4>
    
    <table>
      <tr>
        <th>
          OCaml
        </th>
        
        <th>
          Reason
        </th>
      </tr>
      
      <tr>
        <td>
          <code>let tuple = ((fun x -&gt; x), 20)</code>
        </td>
        
        <td>
          <code>let tuple = ((x) =&gt; x, 20);</code>
        </td>
      </tr>
      
      <tr>
        <td>
          <code>let tuple = (("hi": string), (20: int))</code>
        </td>
        
        <td>
          <code>let tuple = ("hi": string, 20: int);</code>
        </td>
      </tr>
    </table>
    
    <h3>
      Various Differences
    </h3>
    
    <h4>
      <code>as</code> precedence
    </h4>
    
    <p>
      With Reason, <code>as</code> has a higher precedence than <code>|</code> bar. This allows creating <code>as</code> aliases for entire rows in pattern matching.
    </p>
    
    <table>
      <tr>
        <th scope="col">
          <p>
            OCaml
          </p>
        </th>
        
        <th scope="col">
          <p>
            Reason
          </p>
        </th>
      </tr>
      
      <tr>
        <td>
          <pre>
let ppp = match MyThing 20 with
  | (MyThing x as ppp)
  | (YourThing x as ppp) -> ppp;
      </pre>
        </td>
        
        <td>
          <pre>
let ppp =
  switch (MyThing(20)) {
  | MyThing(x) as ppp
  | YourThing(x) as ppp => ppp
  };
      </pre>
        </td>
      </tr>
    </table>
    
    <h4>
      Mutable Record Field Updates
    </h4>
    
    <p>
      Because equalities and their negations have been made more consistent in Reason, the <code>=</code> operator is available for mutable field update.
    </p>
    
    <table>
      <tr>
        <th>
          OCaml
        </th>
        
        <th>
          Reason
        </th>
      </tr>
      
      <tr>
        <td>
          <code>myRec.field &lt;- "next"</code>
        </td>
        
        <td>
          <code>myRec.field = "next"</code>
        </td>
      </tr>
    </table>
    
    <h4>
      Prefix operators
    </h4>
    
    <p>
      Reason's <code>!</code> is used for boolean <code>not</code>. Deferencing uses the postfix <code>^</code>.
    </p>
    
    <table>
      <tr>
        <th>
          OCaml
        </th>
        
        <th>
          Reason
        </th>
      </tr>
      
      <tr>
        <td>
          <code>let x = !(foo.bar)</code>
        </td>
        
        <td>
          <code>let x = foo.bar^;</code>
        </td>
      </tr>
      
      <tr>
        <td>
          <code>let x = !(foo#bar)</code>
        </td>
        
        <td>
          <code>let x = foo#bar^;</code>
        </td>
      </tr>
      
      <tr>
        <td>
          <code>let x = !(!foo.bar)</code>
        </td>
        
        <td>
          <code>let x = foo^.bar^;</code>
        </td>
      </tr>
      
      <tr>
        <td>
          <code>let x = !(!foo#bar)</code>
        </td>
        
        <td>
          <code>let x = (foo^)#bar^;</code>
        </td>
      </tr>
      
      <tr>
        <td>
          <code>let x = !(!(foo.bar))</code>
        </td>
        
        <td>
          <code>let x = foo.bar^ ^;</code>
        </td>
      </tr>
      
      <tr>
        <td>
          <code>let x = !(!(foo#bar))</code>
        </td>
        
        <td>
          <code>let x = foo#bar^ ^;</code>
        </td>
      </tr>
      
      <tr>
        <td>
          <code>let x = !!(foo.bar)</code>
        </td>
        
        <td>
          <code>let x = !!foo.bar;</code>
        </td>
      </tr>
      
      <tr>
        <td>
          <code>let x = !!(foo#bar)</code>
        </td>
        
        <td>
          <code>let x = !!foo#bar;</code>
        </td>
      </tr>
      
      <tr>
        <td>
          <code>let x = !~(foo.bar)</code>
        </td>
        
        <td>
          <code>let x = !~foo.bar;</code>
        </td>
      </tr>
      
      <tr>
        <td>
          <code>let x = !~(foo#bar)</code>
        </td>
        
        <td>
          <code>let x = !~foo#bar;</code>
        </td>
      </tr>
    </table>
    
    <h4>
      Comment Escaping
    </h4>
    
    <p>
      Because Reason uses C-style comments, some obscure custom prefix/infix operators must be written differently. The rules for prefix/infix operators are the same as in OCaml syntax, but with the following exceptions:
    </p>
    
    <p>
      Specifically, if any character except the first in an prefix/infix operator is a star or forward slash, that must be first escaped with a backslash. These will be parsed <em>without</em> the backslash when added to the AST. When reprinted, the escape backslashes are added back in automatically.
    </p>
    
    <table>
      <tr>
        <th>
          OCaml
        </th>
        
        <th>
          Reason
        </th>
      </tr>
      
      <tr>
        <td>
          <code>let (/*) a b = a + b</code>
        </td>
        
        <td>
          <code>let (/\*) a b =&gt; a + b;</code>
        </td>
      </tr>
      
      <tr>
        <td>
          <code>let x = 12 /-* 23 /-* 12</code>
        </td>
        
        <td>
          <code>let x = 12 /-* 23 /-* 12;</code>
        </td>
      </tr>
      
      <tr>
        <td>
          <code>let y = (/*) a b</code>
        </td>
        
        <td>
          <code>let y = a /\* b;</code>
        </td>
      </tr>
      
      <tr>
        <td>
          <code>let (!=*) q r = q + r</code>
        </td>
        
        <td>
          <code>let ( !=* ) = (q, r) =&gt; q + r;</code>
        </td>
      </tr>
      
      <tr>
        <td>
          <code>let res = q (!=*) r</code>
        </td>
        
        <td>
          <code>let res = q(( !=* ), r);</code>
        </td>
      </tr>
      
      <tr>
        <td>
          <code>let (!=/*) q r = q + r</code>
        </td>
        
        <td>
          <code>let ( !=/\* ) = (q, r) =&gt; q + r;</code>
        </td>
      </tr>
      
      <tr>
        <td>
          <code>let res = q (!=/*) r</code>
        </td>
        
        <td>
          <code>let res = q(( !=/\* ), r);</code>
        </td>
      </tr>
    </table>
    
    <h4>
      Operator Renaming
    </h4>
    
    <p>
      If Reason uses <code>==</code> to represent OCaml's <code>=</code>, and uses <code>===</code> to represent OCaml's <code>==</code>, then how would Reason represent OCaml's <code>===</code> symbol (if it were defined)? Reason provides a way! "Escape" the triple equals symbol!
    </p>
    
    <table>
      <tr>
        <th>
          Identifier
        </th>
        
        <th>
          Meaning
        </th>
        
        <th>
          OCaml
        </th>
        
        <th>
          Reason
        </th>
      </tr>
      
      <tr>
        <td>
          <code>"==="</code>
        </td>
        
        <td>
          Custom value
        </td>
        
        <td>
          <code>x === y</code>
        </td>
        
        <td>
          <code>x \=== y</code>
        </td>
      </tr>
    </table>
    
    <h4>
      REPL
    </h4>
    
    <p>
      In Reason's repl <a href="/guide/editor-tools/extra-goodies#repl"><code>rtop</code></a> (a customized <a href="https://github.com/diml/utop"><code>utop</code></a>), each input is submitted via a single <code>;</code> semicolon. OCaml's repl requires two semicolons <code>;;</code>.
    </p>
    
    <table>
      <tr>
        <th>
          OCaml
        </th>
        
        <th>
          Reason
        </th>
      </tr>
      
      <tr>
        <td>
          <code>;;</code>
        </td>
        
        <td>
          <code>;</code>
        </td>
      </tr>
    </table>