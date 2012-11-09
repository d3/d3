// The date and time format (%c), date format (%x) and time format (%X).
var d3_time_formatDateTime = "%a %e %b %H:%M:%S %Y",
    d3_time_formatDate = "%d/%m/%y",
    d3_time_formatTime = "%H:%M:%S";

// The weekday and month names.
var d3_time_days = ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"],
    d3_time_dayAbbreviations = d3_time_days.map(d3_time_formatAbbreviate),
    d3_time_months = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"],
    d3_time_monthAbbreviations = d3_time_months.map(d3_time_formatAbbreviate);

function d3_time_formatAbbreviate(name) {
  return name.substring(0, 3);
}
