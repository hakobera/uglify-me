$(function() {
  var src = $('#src'),
      uglified = $('#uglified');

  $('#uglifyForm').submit(function(e) {
    e.preventDefault();

    $.post('/uglify', { src: src.val() })
      .success(function(code) {
        uglified.val(code);
      })
      .error(function(jqXHR, textStatus, errorThrown) {
        alert('Server error! ' + textStatus);
      });
  });
});