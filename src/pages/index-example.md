```reason
type tree = Node int tree tree | Leaf;

let rec sum =
  fun | Leaf => 0
      | Node value left right =>
        value + (sum left) + (sum right);
```
