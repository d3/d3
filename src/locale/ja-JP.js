import "locale";

var d3_locale_jaJP = d3.locale({
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["", "円"],
  dateTime: "%Y %b %e %a %X",
  date: "%Y/%m/%d",
  time: "%H:%M:%S",
  periods: ["AM", "PM"],
  days: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
  shortDays: ["日", "月", "火", "水", "木", "金", "土"],
  months: ["睦月", "如月", "弥生", "卯月", "皐月", "水無月", "文月", "葉月", "長月", "神無月", "霜月", "師走"],
  shortMonths: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
});