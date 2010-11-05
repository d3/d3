d3.csv.parse = function(text) {
  var header;
  return d3.csv.parseRows(text, function(row, i) {
    if (i) {
      var o = {}, j = -1, m = header.length;
      while (++j < m) o[header[j]] = row[j];
      return o;
    } else {
      header = row;
      return null;
    }
  });
};

d3.csv.parseRows = function(text, f) {
  var EOL = {}, // sentinel value for end-of-line
      EOF = {}, // sentinel value for end-of-file
      rows = [], // output rows
      re = /[,\n]/g, // field separator regex
      n = 0, // the current line number
      t, // the current token
      eol; // is the current token followed by EOL?

  /** @private Returns the next token. */
  function token() {
    if (re.lastIndex == text.length) return EOF; // special case: end of file
    if (eol) { eol = false; return EOL; } // special case: end of line

    // special case: quotes
    var j = re.lastIndex;
    if (text.charCodeAt(j) == 34) {
      var i = j;
      while (i++ < text.length) {
        if (text.charCodeAt(i) == 34) {
          if (text.charCodeAt(i + 1) != 34) break;
          i++;
        }
      }
      if (text.charCodeAt(i + 1) == 10) eol = true;
      re.lastIndex = i + 2;
      return text.substring(j + 1, i).replace(/""/g, "\"");
    }

    // common case
    var m = re.exec(text);
    if (m) {
      if (m[0] == "\n") eol = true;
      return text.substring(j, m.index);
    }
    re.lastIndex = text.length;
    return text.substring(j);
  }

  while ((t = token()) !== EOF) {
    var a = [];
    while ((t !== EOL) && (t !== EOF)) {
      a.push(t);
      t = token();
    }
    if (f && !(a = f(a, n++))) continue;
    rows.push(a);
  }

  return rows;
};
