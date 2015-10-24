import "locale";

var d3_locale_huHU = d3.locale({
  decimal: ",",
  thousands: "\xa0",
  grouping: [3],
  currency: ["", "\xa0Ft"],
  dateTime: "%Y. %B %-e., %A %X",
  date: "%Y. %m. %d.",
  time: "%H:%M:%S",
  periods: ["de.", "du."], // unused
  days: ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"],
  shortDays: ["V", "H", "K", "Sze", "Cs", "P", "Szo"],
  months: ["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december"],
  shortMonths: ["jan.", "feb.", "már.", "ápr.", "máj.", "jún.", "júl.", "aug.", "szept.", "okt.", "nov.", "dec."]
});
