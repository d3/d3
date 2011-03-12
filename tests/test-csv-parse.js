require("./../lib/env-js/envjs/node");
require("./../d3");
require("./../d3.csv");

var newlines = {
  UNIX: "\n",
  DOS: "\r\n",
  Mac: "\r"
};

for (os in newlines) {
  console.log("parse " + os + " newlines:");
  var rows = d3.csv.parse(["a,b,c", "1,2,3", "4,5,\"6\"", "7,8,9"].join(newlines[os]));
  console.log("  " + rows.map(function(row) {
    return row.a + ":" + row.b + ":" + row.c;
  }).join("|"));
  console.log("");
}
