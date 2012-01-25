var app = require('../app'),
    util = require('util'),
    fs = require('fs'),
    exec = require('child_process').exec,
    request = require('request');

var should = require('should');

describe('app', function() {

  var host = app.address().address,
      port = app.address().port,
      base = util.format('http://%s:%d', host, port);

  console.log('Test URL: %s', base);

  describe('POST /uglify', function() {

    it('should return uglified code', function(done) {

      var data = fs.readFileSync(__dirname + '/src/src.js', 'utf-8');
      console.log(data);

      request.post({
        method: 'POST',
        uri: base + '/uglify',
        form: {
          src: data
        }
      }, function(err, res, body) {
        if (err) return done(err);
        res.statusCode.should.eql(200);

        body.should.equal(fs.readFileSync(__dirname + '/expect/src.min.js', 'utf-8'));
        done();
      });
    });

  });

  describe('POST /uglify to multiple files (multipart/form-data)', function() {

    it('should return uglified code', function(done) {
      var f1 = util.format('-F f1=@%s', __dirname + '/src/src.js'),
          f2 = util.format('-F f2=@%s', __dirname + '/src/src2.js'),
          command = util.format('curl %s %s %s', f1, f2, base + '/uglify');

      exec(command, function(err, stdout, stderr) {
        if (err) return done(err);

        stdout.should.equal(fs.readFileSync(__dirname + '/expect/src.combined.min.js', 'utf-8'));
        done();
      });
    });

  });

});