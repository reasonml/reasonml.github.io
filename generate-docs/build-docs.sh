#!/bin/bash
set -euo pipefail

cd ocaml/
make html_doc
cd ..

docs_path="../website/pages/api/"

mkdir -p ./output/
rm -f ./output/*.html
cp ocaml/ocamldoc/stdlib_html/*.html ./output/
echo ""
echo "converting docs - this will take a minute"
echo ""
node_modules/.bin/jscodeshift --extensions=html --transform=transform.js output/
mkdir -p "$docs_path"
rm -f "$docs_path"*.html
cp output/* "$docs_path"
echo "docs output to $docs_path"
