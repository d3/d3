var fs = require("fs"),
    puts = require("util").puts,
    formats = {},
    kvRe = /=/,
    valueRe = /("[^"]+")/g,
    data = [];

process.stdin.resume();
process.stdin.setEncoding("utf8");
process.stdin.on("data", function(chunk) { data.push(chunk); });
process.stdin.on("end", write);

function write() {
  data.join("\n").split(/\n/g).forEach(function(line) {
    var i = line.match(kvRe);
    if (i && (i = i.index)) {
      var value = line.substring(i + 1).split(valueRe);
      formats[line.substring(0, i)] = value.length > 3
          ? value.map(function(d, i) { return d === "" ? i ? "]" : "[" : d === ";" ? ", " : d; }).join("")
          : value[1];
    }
  });

  puts(fs.readFileSync(process.argv[2], "utf8").replace(/\{([^\}]+)\}/g, function(d, k) {
    d = formats[k];
    return k === "grouping"
        ? d === "\"127\"" ? null : d.replace(/^"/, "[").replace(/"$/, "]").replace(/;/, ", ")
        : d == null ? null : d;
  }));
}
