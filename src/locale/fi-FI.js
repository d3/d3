import "locale";

d3.locale.fi_FI = d3.locale({
  decimal: ",",
  thousands: "\xa0",
  grouping: [3],
  currency: ["", "\xa0€"],
  dateTime: "%A, %-d. %Bta %Y klo %X",
  date: "%-d.%-m.%Y",
  time: "%H:%M:%S",
  periods: ["a.m.", "p.m."],
  days: ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"],
  shortDays: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"],
  months: ["tammikuu", "helmikuu", "maaliskuu", "huhtikuu", "toukokuu", "kesäkuu", "heinäkuu", "elokuu", "syyskuu", "lokakuu", "marraskuu", "joulukuu"],
  shortMonths: ["Tammi", "Helmi", "Maalis", "Huhti", "Touko", "Kesä", "Heinä", "Elo", "Syys", "Loka", "Marras", "Joulu"]
});
