import {timeInterval} from "./interval.js";
import {durationMinute, durationWeek} from "./duration.js";

function timeWeekday(i) {
  return timeInterval((date) => {
    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    date.setHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setDate(date.getDate() + step * 7);
  }, (start, end) => {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
  });
}

export const timeSunday = timeWeekday(0);
export const timeMonday = timeWeekday(1);
export const timeTuesday = timeWeekday(2);
export const timeWednesday = timeWeekday(3);
export const timeThursday = timeWeekday(4);
export const timeFriday = timeWeekday(5);
export const timeSaturday = timeWeekday(6);

export const timeSundays = timeSunday.range;
export const timeMondays = timeMonday.range;
export const timeTuesdays = timeTuesday.range;
export const timeWednesdays = timeWednesday.range;
export const timeThursdays = timeThursday.range;
export const timeFridays = timeFriday.range;
export const timeSaturdays = timeSaturday.range;

function utcWeekday(i) {
  return timeInterval((date) => {
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    date.setUTCHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setUTCDate(date.getUTCDate() + step * 7);
  }, (start, end) => {
    return (end - start) / durationWeek;
  });
}

export const utcSunday = utcWeekday(0);
export const utcMonday = utcWeekday(1);
export const utcTuesday = utcWeekday(2);
export const utcWednesday = utcWeekday(3);
export const utcThursday = utcWeekday(4);
export const utcFriday = utcWeekday(5);
export const utcSaturday = utcWeekday(6);

export const utcSundays = utcSunday.range;
export const utcMondays = utcMonday.range;
export const utcTuesdays = utcTuesday.range;
export const utcWednesdays = utcWednesday.range;
export const utcThursdays = utcThursday.range;
export const utcFridays = utcFriday.range;
export const utcSaturdays = utcSaturday.range;
