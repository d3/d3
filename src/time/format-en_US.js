// The date and time format (%c), date format (%x) and time format (%X).
var d3_time_formatDateTime = "%a %b %e %H:%M:%S %Y",
    d3_time_formatDate = "%m/%d/%y",
    d3_time_formatTime = "%H:%M:%S";

// The weekday names. Abbreviations MUST be three characters.
var d3_time_weekdays = d3_time_weekdaySymbols,
    d3_time_weekdayAbbrevRe = /^(?:sun|mon|tue|wed|thu|fri|sat)/i,
    d3_time_weekdayRe = /^(?:Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)/i;

// The month names. Abbreviations MUST be three characters.
var d3_time_months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    d3_time_monthRe = /^(?:January|February|March|April|May|June|July|August|September|October|November|December)/ig,
    d3_time_monthAbbrevLookup = d3.map({jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11}),
    d3_time_monthLookup = d3.map({january: 0, february: 1, march: 2, april: 3, may: 4, june: 5, july: 6, august: 7, september: 8, october: 9, november: 10, december: 11});
