import "locale";

var d3_locale_itIT = d3.locale({
  decimal: ",",
  thousands: ".",
  grouping: [3],
  currency: ["€", ""],
  dateTime: "%A %e %B %Y, %X",
  date: "%d/%m/%Y",
  time: "%H:%M:%S",
  periods: ["AM", "PM"], // unused
  days: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
  shortDays: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
  months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
  shortMonths: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"]
});
