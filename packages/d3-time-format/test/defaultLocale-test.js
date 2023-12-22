import assert from "assert";
import {readFileSync} from "fs";
import {timeFormat, timeFormatDefaultLocale, timeParse, utcFormat, utcParse} from "../src/index.js";

const enUs = JSON.parse(readFileSync("./locale/en-US.json"));
const frFr = JSON.parse(readFileSync("./locale/fr-FR.json"));

it("timeFormat(specifier) defaults to en-US", () => {
  assert.strictEqual(timeFormat("%c")(new Date(2000, 0, 1)), "1/1/2000, 12:00:00 AM");
});

it("timeParse(specifier) defaults to en-US", () => {
  assert.strictEqual(+timeParse("%c")("1/1/2000, 12:00:00 AM"), +new Date(2000, 0, 1));
});

it("utcFormat(specifier) defaults to en-US", () => {
  assert.strictEqual(utcFormat("%c")(new Date(Date.UTC(2000, 0, 1))), "1/1/2000, 12:00:00 AM");
});

it("utcParse(specifier) defaults to en-US", () => {
  assert.strictEqual(+utcParse("%c")("1/1/2000, 12:00:00 AM"), +new Date(Date.UTC(2000, 0, 1)));
});

it("timeFormatDefaultLocale(definition) returns the new default locale", () => {
  const locale = timeFormatDefaultLocale(frFr);
  try {
    assert.strictEqual(locale.format("%c")(new Date(2000, 0, 1)), "samedi  1 janvier 2000 à 00:00:00");
} finally {
    timeFormatDefaultLocale(enUs);
  }
});

it("timeFormatDefaultLocale(definition) affects timeFormat", () => {
  const locale = timeFormatDefaultLocale(frFr);
  try {
    assert.strictEqual(timeFormat, locale.format);
    assert.strictEqual(timeFormat("%c")(new Date(2000, 0, 1)), "samedi  1 janvier 2000 à 00:00:00");
} finally {
    timeFormatDefaultLocale(enUs);
  }
});

it("timeFormatDefaultLocale(definition) affects timeParse", () => {
  const locale = timeFormatDefaultLocale(frFr);
  try {
    assert.strictEqual(timeParse, locale.parse);
    assert.strictEqual(+timeParse("%c")("samedi  1 janvier 2000 à 00:00:00"), +new Date(2000, 0, 1));
} finally {
    timeFormatDefaultLocale(enUs);
  }
});

it("timeFormatDefaultLocale(definition) affects utcFormat", () => {
  const locale = timeFormatDefaultLocale(frFr);
  try {
    assert.strictEqual(utcFormat, locale.utcFormat);
    assert.strictEqual(utcFormat("%c")(new Date(Date.UTC(2000, 0, 1))), "samedi  1 janvier 2000 à 00:00:00");
} finally {
    timeFormatDefaultLocale(enUs);
  }
});

it("timeFormatDefaultLocale(definition) affects utcParse", () => {
  const locale = timeFormatDefaultLocale(frFr);
  try {
    assert.strictEqual(utcParse, locale.utcParse);
    assert.strictEqual(+utcParse("%c")("samedi  1 janvier 2000 à 00:00:00"), +new Date(Date.UTC(2000, 0, 1)));
} finally {
    timeFormatDefaultLocale(enUs);
  }
});
