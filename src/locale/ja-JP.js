import "locale";

var d3_locale_jaJP = d3.locale({
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["￥", ""],
  dateTime: "%Y年%b月%e日 %X (%a)",
  date: "%Y/%m/%d",
  time: "%H:%M:%S",
  periods: ["午前", "午後"],
  days: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
  shortDays: ["日", "月", "火", "水", "木", "金", "土"],
  months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
  shortMonths: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
});
