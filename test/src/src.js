/*
 * copyright (c) 2012 author
 *
 * Some descriptions
 */
var namespace = namespace || {};

function globalFunc1() {
  return [1, 2, 3];
}

function globalFunc2(arg1, arg2, callback) {
  var a;
  var longLoaclVariables;
  a = arg1;
  longLoaclVariables = arg2;
  callback({
    'arg1': a,
    'arg2': longLoaclVariables
  });
}

namespace.addOne = function(arg1) {
  return arg1 + 1;
};

/**
 * Some jQuery dependent codes
 */
$(function() {
  $('input[type=text]').val('');

  var array = globalFunc1();

  var val = namespace.addOne(1);

  setTimeout(function() {
    alert(val);
  }, 1000);

  globalFunc2(1, 2, function(data) {
    console.log(data);
  });
});