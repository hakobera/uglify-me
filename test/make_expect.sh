#!/bin/sh
CURRENT=$(cd $(dirname $0) && pwd)
uglifyjs -v -nc -o $CURRENT/expect/src.min.js $CURRENT/src/src.js
cat $CURRENT/src/src.js $CURRENT/src/src2.js | uglifyjs -v -nc -o $CURRENT/expect/src.combined.min.js