// The date and time format (%c), date format (%x) and time format (%X).
var d3_time_formatDateTime = "%a %b %e %X %Y",
    d3_time_formatDate = "%m/%d/%Y",
    d3_time_formatTime = "%H:%M:%S";

// The weekday and month names.
// start of i18n patch
// d3_time_daySymbols will be set another time in time.js, but setLocalizedStrings can just be called later
var d3_time_daySymbols = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    d3_time_days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    d3_time_dayAbbreviations = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    d3_time_months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    d3_time_monthAbbreviations = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Set localized strings for weekdays and month.
 * When d3 is initialized some time variables are used to calculate e. g. european and us calendar weeks.
 * As far as I know, renaming this strings later does not produce side effects.
 * @param time_days full day names for sunday to saturday
 * @param time_dayAbbreviations short day names for sunday to saturday, e.g. sun ... sat
 * @param time_months full month names from january to december
 * @param time_monthAbbreviations short month names from january to december,e.g. jan ... dec
 */
d3.time.setLocalizedStrings = function(time_days, time_dayAbbreviations, time_months, time_monthAbbreviations){
    function isValidArray(array, expectedSize){
        return (array && Object.prototype.toString.apply(array) === '[object Array]' && array.length == expectedSize ? true : false);
    }
    // overwrite if valid, otherwise keep english presets
    // check for size
    // should we check for string?
    // do not check for string length as it differs e.g. english vs german vs chinese
    if(isValidArray(time_days, 7)){
        d3_time_days = time_days;
        d3_time_daySymbols = time_days;
    }
    if(isValidArray(time_dayAbbreviations, 7)){
        d3_time_dayAbbreviations = time_dayAbbreviations;
    }
    if (isValidArray(time_months, 12)){
        d3_time_months = time_months;
    }
    if(isValidArray(time_monthAbbreviations, 12)){
        d3_time_monthAbbreviations = time_monthAbbreviations;
    }
};
// end of i18n patch