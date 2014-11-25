'use strict';

Tinytest.add('Instantiation', function (test) {
  var element = document.createElement('p');
  element.id = 'd3-test';
  d3.select('body').style('color', 'blue');

  test.equal(document.body.style.color, 'blue', 'Instantiation OK');
});
