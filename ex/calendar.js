var calendar = {

  format: d3.time.format("%Y-%m-%d"),

  dates: function(year) {
    var dates = [],
        date = new Date(year, 0, 1),
        week = 0,
        day;
    do {
      dates.push({
        day: day = date.getDay(),
        week: week,
        month: date.getMonth(),
        Date: calendar.format(date)
      });
      date.setDate(date.getDate() + 1);
      if (day == 6) week++;
    } while (date.getFullYear() == year);
    return dates;
  },

  months: function(year) {
    var months = [],
        date = new Date(year, 0, 1),
        month,
        firstDay,
        firstWeek,
        day,
        week = 0;
    do {
      firstDay = date.getDay();
      firstWeek = week;
      month = date.getMonth();
      do {
        day = date.getDay();
        if (day == 6) week++;
        date.setDate(date.getDate() + 1);
      } while (date.getMonth() == month);
      months.push({
        firstDay: firstDay,
        firstWeek: firstWeek,
        lastDay: day,
        lastWeek: day == 6 ? week - 1 : week
      });
    } while (date.getFullYear() == year);
    return months;
  }

};
