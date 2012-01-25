var express = require('express'),
    fs = require('fs'),
    jsp = require("uglify-js").parser,
    pro = require("uglify-js").uglify;

/**
 * Uglify JavaScript source code.
 *
 * @param {String} src Original JavaScript source code
 * @return {String} Uglified code
 */
function uglify(src) {
  if (!src || src === '') {
    return '';
  }

  var ast = jsp.parse(src); // parse code and get the initial AST
  ast = pro.ast_mangle(ast); // get a new AST with mangled names
  ast = pro.ast_squeeze(ast); // get an AST with compression optimizations

  var uglified = pro.gen_code(ast); // compressed code here

  // @see https://github.com/mishoo/UglifyJS/issues/126
  return (uglified + ';').replace(/;*$/, ";");
}

/**
 * Concatinate files in arguments
 *
 * @param files
 * @return {String} Concatinate string that contains all file content.
 */
function concat(files) {
  var result = '',
      keys = [],
      file, path, content, k;

  for (k in files) {
    keys.push(k);
  }

  keys.sort();
  keys.forEach(function(key) {
    file = files[key];
    path = file.path;
    content = fs.readFileSync(path, 'utf-8');
    result += content;
  });

  return result;
}

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

app.post('/uglify', function(req, res, next) {
  var src = req.param('src');
  if (req.files && Object.keys(req.files).length > 0) {
    src = concat(req.files);
  }

  try {
    var uglifiedCode = uglify(src);
    res.send(uglifiedCode);
  } catch (e) {
    console.error(e);
    res.statusText = e.message;
    res.send(500);
  }
});

app.listen(process.env.PORT || 3000);
console.log("uglify-me server listening on port %d in %s mode", app.address().port, app.settings.env);
