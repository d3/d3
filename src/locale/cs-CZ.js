import "locale";

var d3_locale_csCZ = d3.locale({
  decimal: ",",
  thousands: "\xa0",
  grouping: [3],
  currency: ["", "\xa0CZK"],
  dateTime: "%A,%e.%B %Y, %X",
  date: "%-d.%-m.%Y",
  time: "%H:%M:%S",
  periods: ["AM", "PM"], // unused
  days: ["neděle", "pondělí", "úterý", "středa", "čvrtek", "pátek", "sobota"],
  shortDays: ["ne.", "po.", "út.", "st.", "čt.", "pá.", "so."],
  months: ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec"],
  shortMonths: ["led", "úno", "břez", "dub", "kvě", "čer", "červ", "srp", "zář", "říj", "list", "pros"]/* In the Czech language, the abbreviated months are rarely used so these abbreviation are probably not correct. */
});
