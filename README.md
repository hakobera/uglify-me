uglify-me
=========

This applicaion is JavaScript uglify server for inhouse usage

Prerequisites
-------------

You'll need to install the following software to run this application.

- Node.js (>= 0.6.0)

Usage
-----

    $ git https://github.com/hakobera/uglify-me.git
    $ cd uglify-me
    $ node app.js

Usage from curl
---------------

You can use this application from `curl`.
Make shell script like below named `uglify.sh`.

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

If your JavaScript source files to uglify in `javascripts` directory, then execute below.

    uglify.sh javascripts output.js
