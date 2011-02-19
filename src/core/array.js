var d3_array = d3_arraySlice; // conversion for NodeLists

function d3_arrayCopy(psuedoarray) {
  var i = -1, n = psuedoarray.length, array = [];
  while (++i < n) array.push(psuedoarray[i]);
  return array;
}

function d3_arraySlice(psuedoarray) {
  return Array.prototype.slice.call(psuedoarray);
}

try {
  d3_array(document.documentElement.childNodes)[0].nodeType;
} catch(e) {
  d3_array = d3_arrayCopy;
}
