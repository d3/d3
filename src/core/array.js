function d3_array(psuedoarray) {
  return Array.prototype.slice.call(psuedoarray);
}

// Adapted from Sizzle.js:
//
// Perform a simple check to determine if the browser is capable of
// converting a NodeList to an array using builtin methods.
// Also verifies that the returned array holds DOM nodes
// (which is not the case in the Blackberry browser)
try {
  Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType;
// Provide a fallback method if it does not work
} catch(e) {
  d3_array = function(array) {
    var i = 0,
      ret = [];

    if (toString.call(array) === "[object Array]") {
      Array.prototype.push.apply(ret, array);
    } else {
      if (typeof array.length === "number") {
        for (var l = array.length; i < l; i++) {
          ret.push(array[i]);
        }
      } else {
        for (; array[i]; i++) {
          ret.push(array[i]);
        }
      }
    }
    return ret;
  };
}
