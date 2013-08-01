import "document";

var d3_array = d3_arraySlice; // conversion for NodeLists

function d3_arrayCopy(pseudoarray) {
  var i = pseudoarray.length, array = new Array(i);
  while (i--) array[i] = pseudoarray[i];
  return array;
}

function d3_arraySlice(pseudoarray) {
  return Array.prototype.slice.call(pseudoarray);
}

try {
  d3_array(d3_documentElement.childNodes)[0].nodeType;
} catch(e) {
  d3_array = d3_arrayCopy;
}
