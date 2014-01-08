import "number-format";
import "time-format";
import "time-scale-format";

d3.locale = function(locale) {
  var timeFormat = d3_locale_timeFormat(locale);
  return {
    numberFormat: d3_locale_numberFormat(locale),
    timeFormat: timeFormat,
    timeScaleFormat: d3_locale_timeScaleFormat(timeFormat)
  };
};
