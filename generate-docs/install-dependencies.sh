#!/bin/bash
set -euo pipefail

npm install

if [[ ! -d "ocaml/" ]]; then
  git clone https://github.com/ocaml/ocaml.git
fi
cd ocaml/

git checkout 4.02.3
./configure
make clean
make world
make html_doc
