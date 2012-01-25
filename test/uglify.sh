#!/bin/sh
CURRENT=$(cd $(dirname $0) && pwd)

files=''
num=1

echo "Find uglify target files in $CURRENT/$1"
for JS in `ls $CURRENT/$1/*.js`
do
  files="$files -F f$num=@$JS"
  num=`expr $num + 1`
  echo "found $JS"
done

echo "curl $files http://localhost:3000/uglify"
curl $files http://localhost:3000/uglify > $2
