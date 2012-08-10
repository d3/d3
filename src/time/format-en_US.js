// The date and time format (%c), date format (%x) and time format (%X).
var d3_time_formatDateTime = "%a %b %e %H:%M:%S %Y",
    d3_time_formatDate = "%m/%d/%y",
    d3_time_formatTime = "%H:%M:%S";

// The weekday and month names.
var d3_time_days = d3_time_daySymbols,
    d3_time_dayAbbreviations = d3_time_days.map(d3_time_formatAbbreviate),
    d3_time_months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    d3_time_monthAbbreviations = d3_time_months.map(d3_time_formatAbbreviate);

function d3_time_formatAbbreviate(name) {
  return name.substring(0, 3);
}
