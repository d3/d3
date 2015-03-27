import "locale";
d3.locale.de_CH = d3.locale({
decimal: ".",
thousands: "'",
grouping: [3],
currency: ["", " CHF"],
dateTime: "%A, der %e. %B %Y, %X",
date: "%d.%m.%Y",
time: "%H:%M:%S",
periods: ["AM", "PM"], // unused
days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
shortDays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
shortMonths: ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
});
