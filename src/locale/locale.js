// XXX avoid globals within localized closure
import "../core/identity";
import "../format/re";
import "../time/interval";

d3.locale = function(
    d3_format_decimalPoint,
    d3_format_thousandsSeparator,
    d3_format_grouping,
    d3_format_currencySymbol,
    d3_time_formatDateTime,
    d3_time_formatDate,
    d3_time_formatTime,
    d3_time_days,
    d3_time_dayAbbreviations,
    d3_time_months,
    d3_time_monthAbbreviations) {

import "number-format";
import "time-format";

  return {
    numberFormat: d3_format,
    timeFormat: d3_time_format
  };
};
