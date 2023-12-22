import assert from "assert";
import {readdirSync, readFileSync} from "fs";
import {join} from "path";
import {timeFormatLocale} from "../src/index.js";

it("locale data is valid", () => {
  for (const localePath of readdirSync("locale")) {
    if (!/\.json$/i.test(localePath)) continue;
    const locale = JSON.parse(readFileSync(join("locale", localePath), "utf8"));
    assert.deepStrictEqual(Object.keys(locale).sort(), ["date", "dateTime", "days", "months", "periods", "shortDays", "shortMonths", "time"]);
    timeFormatLocale(locale);
  }
});
