How to generate Reason API docs from OCaml

```bash
./install-dependencies.sh
./build-docs.sh
```

Converted HTML is now in `output/`

After running this converter, some documentation like `Array.get` becomes awkward yet funny:

`a[n] returns the element number n of array a . The first element has number 0. The last element has number Array.length(a) - 1; . You can also write a[n] instead of a[n] .`

This is because `refmt` sugars `Array.get(n, a)` into `a[n]`. You should manually copy and paste this snippet over the entry for `Array.get` inside of `../website/pages/api/Array.html`:

```
<code class="code">Array.get(a, n)</code> returns the element number <code class="code">n</code> of array <code class="code">a</code>.
   The first element has number 0.
   The last element has number <code class="code">Array.length(a) - 1</code>.
   You can also write <code class="code">a[n]</code> instead of <code class="code">Array.get(a, n)</code>.
```

Then do the same for `Array.set`:

```
<code class="code">Array.set(a, n, x)</code> modifies array <code class="code">a</code> in place, replacing
   element number <code class="code">n</code> with <code class="code">x</code>.
   You can also write <code class="code">a[n] = x</code> instead of <code class="code">Array.set(a, n, x)</code>.
```
