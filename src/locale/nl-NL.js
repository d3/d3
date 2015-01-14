import "locale";

d3.locale.nl_NL = d3.locale({
  decimal: ",",
  thousands: ".",
  grouping: [3],
  currency: ["€ ", ""],
  dateTime: "%a %e %B %Y %T",
  date: "%d-%m-%Y",
  time: "%H:%M:%S",
  periods: ["AM", "PM"], // unused
  days: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"],
  shortDays: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"],
  months: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]
});
