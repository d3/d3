// The date and time format (%c), date format (%x) and time format (%X).
var d3_time_formatDateTime = "%a %e %b %H:%M:%S %Y",
    d3_time_formatDate = "%d.%m.%y",
    d3_time_formatTime = "%H:%M:%S";

// The weekday names. Abbreviations MUST be three characters.
var d3_time_weekdays = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
    d3_time_weekdayAbbrevRe = /^(?:dim|lun|mar|mer|jeu|ven|sam)/i,
    d3_time_weekdayRe = /^(?:dimanche|lundi|mardi|mercredi|jeudi|vendredi|samedi)/i;

// The month names. Abbreviations MUST be three characters.
var d3_time_months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
    d3_time_monthRe = /^(?:janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i,
    d3_time_monthAbbrevLookup = d3.map({jan: 0, fév: 1, mar: 2, avr: 3, mai: 4, jun: 5, jul: 6, aoû: 7, sep: 8, oct: 9, nov: 10, déc: 11}),
    d3_time_monthLookup = d3.map({janvier: 0, février: 1, mars: 2, avril: 3, mai: 4, juin: 5, juillet: 6, août: 7, septembre: 8, octobre: 9, novembre: 10, décembre: 11});
