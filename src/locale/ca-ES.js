import "locale";

var d3_locale_caES = d3.locale({
  decimal: ",",
  thousands: ".",
  grouping: [3],
  currency: ["", " €"],
  dateTime: "%A, %e de %B de %Y, %X",
  date: "%d/%m/%Y",
  time: "%H:%M:%S",
  periods: ["AM", "PM"],
  days: ["diumenge", "dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte"],
  shortDays: ["dg.", "dl.", "dt.", "dc.", "dj.", "dv.", "ds."],
  months: ["gener", "febrer", "març", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre"],
  shortMonths: ["gen.", "febr.", "març", "abr.", "maig", "juny", "jul.", "ag.", "set.", "oct.", "nov.", "des."]
});
