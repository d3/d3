export {version} from "./package.json";

import {
  bisect,
  bisectRight,
  bisectLeft,
  histogram,
  thresholdFreedmanDiaconis,
  thresholdScott,
  thresholdSturges
} from "d3-array";

bisect.right = bisectRight;
bisect.left = bisectLeft;

histogram.thresholdFreedmanDiaconis = thresholdFreedmanDiaconis;
histogram.thresholdScott = thresholdScott;
histogram.thresholdSturges = thresholdSturges;

export {
  bisect,
  ascending,
  bisector,
  descending,
  deviation,
  entries,
  extent,
  histogram,
  keys,
  map,
  max,
  mean,
  median,
  merge,
  min,
  nest,
  pairs,
  permute,
  quantile,
  range,
  scan,
  set,
  shuffle,
  sum,
  ticks,
  transpose,
  values,
  variance,
  zip
} from "d3-array";

export {
  bisect,
  ascending,
  bisector,
  descending,
  deviation,
  entries,
  extent,
  histogram,
  keys,
  map,
  max,
  mean,
  median,
  merge,
  min,
  nest,
  pairs,
  permute,
  quantile,
  range,
  scan,
  set,
  shuffle,
  sum,
  ticks,
  transpose,
  values,
  variance,
  zip
} from "d3-array";

import {
  uniform as randomUniform,
  normal as randomNormal,
  logNormal as randomLogNormal,
  bates as randomBates,
  irwinHall as randomIrwinHall,
  exponential as randomExponential
} from "d3-random";

export var random = {
  uniform: randomUniform,
  normal: randomNormal,
  logNormal: randomLogNormal,
  bates: randomBates,
  irwinHall: randomIrwinHall,
  exponential: randomExponential
};

import {
  bind as easeBind,
  linearIn,
  linearOut,
  linearInOut,
  quadIn,
  quadOut,
  quadInOut,
  cubicIn,
  cubicOut,
  cubicInOut,
  polyIn,
  polyOut,
  polyInOut,
  sinIn,
  sinOut,
  sinInOut,
  expIn,
  expOut,
  expInOut,
  circleIn,
  circleOut,
  circleInOut,
  bounceIn,
  bounceOut,
  bounceInOut,
  backIn,
  backOut,
  backInOut,
  elasticIn,
  elasticOut,
  elasticInOut
} from "d3-ease";

export var ease = {
  bind: easeBind,
  linear: linearIn,
  linearIn: linearIn,
  linearOut: linearOut,
  linearInOut: linearInOut,
  quad: quadIn,
  quadIn: quadIn,
  quadOut: quadOut,
  quadInOut: quadInOut,
  cubic: cubicIn,
  cubicIn: cubicIn,
  cubicOut: cubicOut,
  cubicInOut: cubicInOut,
  poly: polyIn,
  polyIn: polyIn,
  polyOut: polyOut,
  sin: sinIn,
  sinIn: sinIn,
  sinOut: sinOut,
  sinInOut: sinInOut,
  exp: expIn,
  expIn: expIn,
  expOut: expOut,
  expInOut: expInOut,
  circle: circleIn,
  circleIn: circleIn,
  circleOut: circleOut,
  circleInOut: circleInOut,
  bounce: bounceIn,
  bounceIn: bounceIn,
  bounceOut: bounceOut,
  bounceInOut: bounceInOut,
  back: backIn,
  backIn: backIn,
  backOut: backOut,
  backInOut: backInOut,
  elastic: elasticIn,
  elasticIn: elasticIn,
  elasticOut: elasticOut,
  elasticInOut: elasticInOut
};

export {
  path
} from "d3-path";

import {
  arc,
  area,
  line,
  pie,
  radialArea,
  radialLine,
  symbol,
  symbols,
  circle,
  cross,
  diamond,
  square,
  star,
  triangle,
  wye,
  basisClosed,
  basisOpen,
  basis,
  bundle,
  cardinalClosed,
  cardinalOpen,
  cardinal,
  catmullRomClosed,
  catmullRomOpen,
  catmullRom,
  linearClosed,
  linear,
  monotone,
  natural,
  step,
  stepAfter,
  stepBefore
} from "d3-shape"

area.radial = radialArea;
line.radial = radialLine;

export var shape = {
  arc: arc,
  area: area,
  line: line,
  pie: pie,
  symbol: symbol,
  symbols: symbols,
  circle: circle,
  cross: cross,
  diamond: diamond,
  square: square,
  star: star,
  triangle: triangle,
  wye: wye
};

export var curve = {
  basisClosed: basisClosed,
  basisOpen: basisOpen,
  basis: basis,
  bundle: bundle,
  cardinalClosed: cardinalClosed,
  cardinalOpen: cardinalOpen,
  cardinal: cardinal,
  catmullRomClosed: catmullRomClosed,
  catmullRomOpen: catmullRomOpen,
  catmullRom: catmullRom,
  linearClosed: linearClosed,
  linear: linear,
  monotone: monotone,
  natural: natural,
  step: step,
  stepAfter: stepAfter,
  stepBefore: stepBefore
};
