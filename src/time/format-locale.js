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

  puts([
    "// The date and time format (%c), date format (%x) and time format (%X).",
    "var d3_time_formatDateTime = {d_t_fmt},",
    "    d3_time_formatDate = {d_fmt},",
    "    d3_time_formatTime = {t_fmt};",
    "",
    "// The weekday and month names.",
    "var d3_time_days = {day},",
    "    d3_time_dayAbbreviations = {abday},",
    "    d3_time_months = {mon},",
    "    d3_time_monthAbbreviations = {abmon};"
  ].join("\n").replace(/\{([^\}]+)\}/g, function(_, k) {
    return formats[k];
  }));
}
