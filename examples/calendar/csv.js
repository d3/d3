function csv(url) {
  var values = [],
      req = new XMLHttpRequest(),
      value,
      row,
      rows,
      columns,
      i,
      n,
      j,
      m;
  req.overrideMimeType("text/plain");
  req.open("GET", url, false);
  req.send(null);
  rows = req.responseText.split(/\n/g);
  header = rows[0].split(/,/g);
  for (i = 1, n = rows.length; i < n; ++i) {
    if ((row = rows[i]).length) {
      values.push(value = {});
      for (j = 0, columns = row.split(/,/g), m = columns.length; j < m; ++j) {
        value[header[j]] = columns[j];
      }
    }
  }
  return values;
}
