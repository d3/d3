import assert from "assert";
import {chord} from "../src/index.js";
import {assertInDelta} from "./asserts.js";

// From http://mkweb.bcgsc.ca/circos/guide/tables/
const matrix = [
  [11975,  5871, 8916, 2868],
  [ 1951, 10048, 2060, 6171],
  [ 8010, 16145, 8090, 8045],
  [ 1013,   990,  940, 6907]
];

it("chord() has the expected defaults", () => {
  const c = chord();
  assert.strictEqual(c.padAngle(), 0);
  assert.strictEqual(c.sortGroups(), null);
  assert.strictEqual(c.sortSubgroups(), null);
  assert.strictEqual(c.sortChords(), null);
  const chords = c(matrix);
  assertInDelta(chords.groups, [
    {index: 0, startAngle: 0.0000000, endAngle: 1.8617078, value: 29630},
    {index: 1, startAngle: 1.8617078, endAngle: 3.1327961, value: 20230},
    {index: 2, startAngle: 3.1327961, endAngle: 5.6642915, value: 40290},
    {index: 3, startAngle: 5.6642915, endAngle: 6.2831853, value:  9850}
  ]);
  assertInDelta(chords, [
    {
      source: {index: 0, startAngle: 0.0000000, endAngle: 0.7524114, value: 11975},
      target: {index: 0, startAngle: 0.0000000, endAngle: 0.7524114, value: 11975}
    }, {
      source: {index: 0, startAngle: 0.7524114, endAngle: 1.1212972, value:  5871},
      target: {index: 1, startAngle: 1.8617078, endAngle: 1.9842927, value:  1951}
    }, {
      source: {index: 0, startAngle: 1.1212972, endAngle: 1.6815060, value:  8916},
      target: {index: 2, startAngle: 3.1327961, endAngle: 3.6360793, value:  8010}
    }, {
      source: {index: 0, startAngle: 1.6815060, endAngle: 1.8617078, value:  2868},
      target: {index: 3, startAngle: 5.6642915, endAngle: 5.7279402, value:  1013}
    }, {
      source: {index: 1, startAngle: 1.9842927, endAngle: 2.6156272, value: 10048},
      target: {index: 1, startAngle: 1.9842927, endAngle: 2.6156272, value: 10048}
    }, {
      source: {index: 2, startAngle: 3.6360793, endAngle: 4.6504996, value: 16145},
      target: {index: 1, startAngle: 2.6156272, endAngle: 2.7450608, value:  2060}
    }, {
      source: {index: 1, startAngle: 2.7450608, endAngle: 3.1327961, value:  6171},
      target: {index: 3, startAngle: 5.7279402, endAngle: 5.7901437, value:   990}
    }, {
      source: {index: 2, startAngle: 4.6504996, endAngle: 5.1588092, value:  8090},
      target: {index: 2, startAngle: 4.6504996, endAngle: 5.1588092, value:  8090}
    }, {
      source: {index: 2, startAngle: 5.1588092, endAngle: 5.6642915, value:  8045},
      target: {index: 3, startAngle: 5.7901437, endAngle: 5.8492056, value:   940}
    }, {
      source: {index: 3, startAngle: 5.8492056, endAngle: 6.2831853, value:  6907},
      target: {index: 3, startAngle: 5.8492056, endAngle: 6.2831853, value:  6907}
    }
  ]);
});

it("chord.padAngle(angle) sets the pad angle", () => {
  const c = chord().sortSubgroups(function(a, b) { return b - a; });
  assert.strictEqual(c.padAngle(0.05), c);
  assert.strictEqual(c.padAngle(), 0.05);
  const chords = c(matrix);
  assertInDelta(chords.groups, [
    {index: 0, startAngle: 0.0000000, endAngle: 1.80244780, value: 29630},
    {index: 1, startAngle: 1.8524478, endAngle: 3.08307619, value: 20230},
    {index: 2, startAngle: 3.1330761, endAngle: 5.58399155, value: 40290},
    {index: 3, startAngle: 5.6339915, endAngle: 6.23318530, value:  9850}
  ]);
  assertInDelta(chords, [
    {
      source: {index: 0, startAngle: 0.0000000, endAngle: 0.7284614, value: 11975},
      target: {index: 0, startAngle: 0.0000000, endAngle: 0.7284614, value: 11975}
    }, {
      source: {index: 0, startAngle: 1.2708382, endAngle: 1.6279820, value:  5871},
      target: {index: 1, startAngle: 2.9643932, endAngle: 3.0830761, value:  1951}
    }, {
      source: {index: 0, startAngle: 0.7284614, endAngle: 1.2708382, value:  8916},
      target: {index: 2, startAngle: 5.0967284, endAngle: 5.5839915, value:  8010}
    }, {
      source: {index: 0, startAngle: 1.6279820, endAngle: 1.8024478, value:  2868},
      target: {index: 3, startAngle: 6.0541571, endAngle: 6.1157798, value:  1013}
    }, {
      source: {index: 1, startAngle: 1.8524478, endAngle: 2.4636862, value: 10048},
      target: {index: 1, startAngle: 1.8524478, endAngle: 2.4636862, value: 10048}
    }, {
      source: {index: 2, startAngle: 3.1330761, endAngle: 4.1152064, value: 16145},
      target: {index: 1, startAngle: 2.8390796, endAngle: 2.9643932, value:  2060}
    }, {
      source: {index: 1, startAngle: 2.4636862, endAngle: 2.8390796, value:  6171},
      target: {index: 3, startAngle: 6.1157798, endAngle: 6.1760033, value:   990}
    }, {
      source: {index: 2, startAngle: 4.1152064, endAngle: 4.6073361, value:  8090},
      target: {index: 2, startAngle: 4.1152064, endAngle: 4.6073361, value:  8090}
    }, {
      source: {index: 2, startAngle: 4.6073361, endAngle: 5.0967284, value:  8045},
      target: {index: 3, startAngle: 6.1760033, endAngle: 6.2331853, value:   940}
    }, {
      source: {index: 3, startAngle: 5.6339915, endAngle: 6.0541571, value:  6907},
      target: {index: 3, startAngle: 5.6339915, endAngle: 6.0541571, value:  6907}
    }
  ]);
});
