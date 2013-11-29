import "locale";

var d3_locale_enUS = d3.locale(
  ".", // decimalPoint
  ",", // thousandsSeparator
  [3, 3], // grouping
  "$", // currencySymbol
  "%a %b %e %X %Y", // formatDateTime
  "%m/%d/%Y", // formatDate
  "%H:%M:%S", // formatTime
  ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], // days
  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], // dayAbbreviations
  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], // months
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] // monthAbbreviations
);
