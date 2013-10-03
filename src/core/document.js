import "array";

var d3_document = document,
    d3_documentElement = d3_document.documentElement,
    d3_window = window;

// Redefine d3_array if the browser doesn’t support slice-based conversion.
try {
  d3_array(d3_documentElement.childNodes)[0].nodeType;
} catch(e) {
  d3_array = function(list) {
    var n = list.length,
      array = new Array(n),
      i = -1;
    while (++i < n) array[i] = list[i];
    return array;
  };
}
