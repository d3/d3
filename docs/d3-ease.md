<script setup>

import * as d3 from "d3";
import {ref} from "vue";
import ExampleEase from "./components/ExampleEase.vue";

const amplitude = ref(1);
const exponent = ref(2);
const period = ref(0.3);
const overshoot = ref(1.7);

</script>

# d3-ease

[Examples](https://observablehq.com/@d3/easing) · *Easing* is a method of distorting time to control apparent motion in animation. It is most commonly used for [slow-in, slow-out](https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation#Slow_in_and_slow_out). By easing time, [animated transitions](./d3-transition.md) are smoother and exhibit more plausible motion.

The easing types in this module implement the [ease method](#_ease) which takes a normalized time *t* and returns the corresponding “eased” time *tʹ*. Both the normalized time and the eased time are typically in the range [0,1], where 0 represents the start of the animation and 1 represents the end; some easing types, such as [easeElastic](#easeElastic), may return eased times slightly outside this range. A good easing type should return 0 if *t* = 0 and 1 if *t* = 1.

These easing types are largely based on work by [Robert Penner](http://robertpenner.com/easing/).

## *ease*(*t*) {#_ease}

Given the specified normalized time *t*, typically in the range [0,1], returns the “eased” time *tʹ*, also typically in [0,1]. 0 represents the start of the animation and 1 represents the end. A good implementation returns 0 if *t* = 0 and 1 if *t* = 1. For example, to apply [easeCubic](#easeCubic) easing:

```js
const te = d3.easeCubic(t);
```

To apply custom [elastic](#easeElastic) easing, create your easing function before the animation starts:

```js
const ease = d3.easeElastic.period(0.4);
```

Then during the animation, apply the easing function:

```js
const te = ease(t);
```

See also [*transition*.ease](./d3-transition/timing.md#transition_ease).

## easeLinear {#easeLinear}

<ExampleEase :eases='[{y: d3.easeLinear}]' />

[Source](https://github.com/d3/d3-ease/blob/main/src/linear.js) · Linear easing; the identity function; *linear*(*t*) returns *t*.

## easePoly {#easePoly}

[Source](https://github.com/d3/d3-ease/blob/main/src/poly.js) · Alias for [easePolyInOut](#easePolyInOut).

### easePolyIn {#easePolyIn}

<ExampleEase label="exponent" :eases='[0.5, 1, 1.5, 2, 3, 4].map((e) => ({y: d3.easePolyIn.exponent(e), stroke: e}))' />

Polynomial easing; raises *t* to the specified [exponent](#easePoly_exponent). If the exponent is not specified, it defaults to 3, equivalent to [easeCubicIn](#easeCubicIn).

### easePolyOut {#easePolyOut}

<ExampleEase label="exponent" :eases='[0.5, 1, 1.5, 2, 3, 4].map((e) => ({y: d3.easePolyOut.exponent(e), stroke: e}))' />

Reverse polynomial easing; equivalent to 1 - [easePolyIn](#easePolyIn)(1 - *t*). If the exponent is not specified, it defaults to 3, equivalent to [easeCubicOut](#easeCubicOut).

### easePolyInOut {#easePolyInOut}

<ExampleEase label="exponent" :eases='[0.5, 1, 1.5, 2, 3, 4].map((e) => ({y: d3.easePolyInOut.exponent(e), stroke: e}))' />

Symmetric polynomial easing; scales [easePolyIn](#easePolyIn) for *t* in 0–0.5 and [easePolyOut](#easePolyOut) for *t* in 0.5–1. If the exponent is not specified, it defaults to 3, equivalent to [easeCubic](#easeCubic).

### easePoly.exponent(*e*) {#easePoly_exponent}

<p>
  <label class="label-input">
    <span>Exponent:</span>
    <input type="range" v-model.number="exponent" min="1" max="8" step="0.01">
    <span style="font-variant-numeric: tabular-nums;">{{exponent.toFixed(2)}}</span>
  </label>
</p>

<ExampleEase label="exponent" :eases='[{y: d3.easePolyInOut.exponent(exponent)}]' />

Returns a new polynomial easing with the specified exponent *e*. For example, to create equivalents of [easeLinear](#easeLinear), [easeQuad](#easeQuad), and [easeCubic](#easeCubic):

```js
const linear = d3.easePoly.exponent(1);
const quad = d3.easePoly.exponent(2);
const cubic = d3.easePoly.exponent(3);
```

## easeQuad {#easeQuad}

[Source](https://github.com/d3/d3-ease/blob/main/src/quad.js) · Alias for [easeQuadInOut](#easeQuadInOut).

### easeQuadIn {#easeQuadIn}

<ExampleEase label="exponent" :eases='[{y: d3.easeQuadIn}]' />

Quadratic easing; equivalent to [easePolyIn](#easePolyIn).[exponent](#easePoly_exponent)(2).

### easeQuadOut {#easeQuadOut}

<ExampleEase label="exponent" :eases='[{y: d3.easeQuadOut}]' />

Reverse quadratic easing; equivalent to 1 - [easeQuadIn](#easeQuadIn)(1 - *t*). Also equivalent to [easePolyOut](#easePolyOut).[exponent](#easePoly_exponent)(2).

### easeQuadInOut {#easeQuadInOut}

<ExampleEase label="exponent" :eases='[{y: d3.easeQuadInOut}]' />

Symmetric quadratic easing; scales [easeQuadIn](#easeQuadIn) for *t* in 0–0.5 and [easeQuadOut](#easeQuadOut) for *t* in 0.5–1. Also equivalent to [easePoly](#easePoly).[exponent](#easePoly_exponent)(2).

## easeCubic {#easeCubic}

[Source](https://github.com/d3/d3-ease/blob/main/src/cubic.js) · Alias for [easeCubicInOut](#easeCubicInOut).

### easeCubicIn {#easeCubicIn}

<ExampleEase :eases='[{y: d3.easeCubicIn}]' />

Cubic easing; equivalent to [easePolyIn](#easePolyIn).[exponent](#easePoly_exponent)(3).

### easeCubicOut {#easeCubicOut}

<ExampleEase :eases='[{y: d3.easeCubicOut}]' />

Reverse cubic easing; equivalent to 1 - [easeCubicIn](#easeCubicIn)(1 - *t*). Also equivalent to [easePolyOut](#easePolyOut).[exponent](#easePoly_exponent)(3).

### easeCubicInOut {#easeCubicInOut}

<ExampleEase :eases='[{y: d3.easeCubicInOut}]' />

Symmetric cubic easing; scales [easeCubicIn](#easeCubicIn) for *t* in 0–0.5 and [easeCubicOut](#easeCubicOut) for *t* in 0.5–1. Also equivalent to [easePoly](#easePoly).[exponent](#easePoly_exponent)(3).

## easeSin {#easeSin}

[Source](https://github.com/d3/d3-ease/blob/main/src/sin.js) · Alias for [easeSinInOut](#easeSinInOut).

### easeSinIn {#easeSinIn}

<ExampleEase :eases='[{y: d3.easeSinIn}]' />

Sinusoidal easing; returns sin(*t*).

### easeSinOut {#easeSinOut}

<ExampleEase :eases='[{y: d3.easeSinOut}]' />

Reverse sinusoidal easing; equivalent to 1 - [easeSinIn](#easeSinIn)(1 - *t*).

### easeSinInOut {#easeSinInOut}

<ExampleEase :eases='[{y: d3.easeSinInOut}]' />

Symmetric sinusoidal easing; scales [easeSinIn](#easeSinIn) for *t* in 0–0.5 and [easeSinOut](#easeSinOut) for *t* in 0.5–1.

## easeExp {#easeExp}

[Source](https://github.com/d3/d3-ease/blob/main/src/exp.js) · Alias for [easeExpInOut](#easeExpInOut).

### easeExpIn {#easeExpIn}

<ExampleEase :eases='[{y: d3.easeExpIn}]' />

Exponential easing; raises 2 to the exponent 10 × (*t* - 1).

### easeExpOut {#easeExpOut}

<ExampleEase :eases='[{y: d3.easeExpOut}]' />

Reverse exponential easing; equivalent to 1 - [easeExpIn](#easeExpIn)(1 - *t*).

### easeExpInOut {#easeExpInOut}

<ExampleEase :eases='[{y: d3.easeExpInOut}]' />

Symmetric exponential easing; scales [easeExpIn](#easeExpIn) for *t* in 0–0.5 and [easeExpOut](#easeExpOut) for *t* in 0.5–1.

## easeCircle {#easeCircle}

[Source](https://github.com/d3/d3-ease/blob/main/src/circle.js) · Alias for [easeCircleInOut](#easeCircleInOut).

### easeCircleIn {#easeCircleIn}

<ExampleEase :eases='[{y: d3.easeCircleIn}]' />

Circular easing.

### easeCircleOut {#easeCircleOut}

<ExampleEase :eases='[{y: d3.easeCircleOut}]' />

Reverse circular easing; equivalent to 1 - [easeCircleIn](#easeCircleIn)(1 - *t*).

### easeCircleInOut {#easeCircleInOut}

<ExampleEase :eases='[{y: d3.easeCircleInOut}]' />

Symmetric circular easing; scales [easeCircleIn](#easeCircleIn) for *t* in 0–0.5 and [easeCircleOut](#easeCircleOut) for *t* in 0.5–1.

## easeElastic {#easeElastic}

[Source](https://github.com/d3/d3-ease/blob/main/src/elastic.js) · Alias for [easeElasticOut](#easeElasticOut).

### easeElasticIn {#easeElasticIn}

<ExampleEase label="amplitude" :eases='[1, 1.1, 1.2, 1.3, 1.4, 1.5].map((a) => ({y: d3.easeElasticIn.amplitude(a), stroke: a}))' />

Elastic easing, like a rubber band. The [amplitude](#easeElastic_amplitude) and [period](#easeElastic_period) of the oscillation are configurable; if not specified, they default to 1 and 0.3, respectively.

### easeElasticOut {#easeElasticOut}

<ExampleEase label="amplitude" :eases='[1, 1.1, 1.2, 1.3, 1.4, 1.5].map((a) => ({y: d3.easeElasticOut.amplitude(a), stroke: a}))' />

Reverse elastic easing; equivalent to 1 - [elasticIn](#easeElasticIn)(1 - *t*).

### easeElasticInOut {#easeElasticInOut}

<ExampleEase label="amplitude" :eases='[1, 1.1, 1.2, 1.3, 1.4, 1.5].map((a) => ({y: d3.easeElasticInOut.amplitude(a), stroke: a}))' />

Symmetric elastic easing; scales [elasticIn](#easeElasticIn) for *t* in 0–0.5 and [elasticOut](#easeElasticOut) for *t* in 0.5–1.

### easeElastic.amplitude(*a*) {#easeElastic_amplitude}

<p>
  <label class="label-input">
    <span>Amplitude:</span>
    <input type="range" v-model.number="amplitude" min="1" max="4" step="0.01">
    <span style="font-variant-numeric: tabular-nums;">{{amplitude.toFixed(2)}}</span>
  </label>
</p>

<ExampleEase label="amplitude" :eases='[{y: d3.easeElastic.amplitude(amplitude)}]' />

Returns a new elastic easing with the specified amplitude *a*. The amplitude *a* must be greater than or equal to 1.

### easeElastic.period(*p*) {#easeElastic_period}

<p>
  <label class="label-input">
    <span>Period:</span>
    <input type="range" v-model.number="period" min="0.1" max="1.5" step="0.01">
    <span style="font-variant-numeric: tabular-nums;">{{period.toFixed(2)}}</span>
  </label>
</p>

<ExampleEase label="period" :eases='[{y: d3.easeElastic.period(period)}]' />

Returns a new elastic easing with the specified period *p*.

## easeBack {#easeBack}

[Source](https://github.com/d3/d3-ease/blob/main/src/back.js) · Alias for [easeBackInOut](#easeBackInOut).

### easeBackIn {#easeBackIn}

<ExampleEase label="overshoot" :eases='d3.ticks(0.5, 3, 6).map((a) => ({y: d3.easeBackIn.overshoot(a), stroke: a}))' />

[Anticipatory](https://en.wikipedia.org/wiki/12_basic_principles_of_animation#Anticipation) easing like a dancer bending her knees before jumping off the floor. The degree of [overshoot](#easeBack_overshoot) is configurable; if not specified, it defaults to 1.70158.

### easeBackOut {#easeBackOut}

<ExampleEase label="overshoot" :eases='d3.ticks(0.5, 3, 6).map((a) => ({y: d3.easeBackOut.overshoot(a), stroke: a}))' />

Reverse anticipatory easing; equivalent to 1 - [easeBackIn](#easeBackIn)(1 - *t*).

### easeBackInOut {#easeBackInOut}

<ExampleEase label="overshoot" :eases='d3.ticks(0.5, 3, 6).map((a) => ({y: d3.easeBackInOut.overshoot(a), stroke: a}))' />

Symmetric anticipatory easing; scales [easeBackIn](#easeBackIn) for *t* in 0–0.5 and [easeBackOut](#easeBackOut) for *t* in 0.5–1.

### easeBack.overshoot(*s*) {#easeBack_overshoot}

<p>
  <label class="label-input">
    <span>Overshoot:</span>
    <input type="range" v-model.number="overshoot" min="0" max="5" step="0.01">
    <span style="font-variant-numeric: tabular-nums;">{{overshoot.toFixed(2)}}</span>
  </label>
</p>

<ExampleEase label="overshoot" :eases='[{y: d3.easeBack.overshoot(overshoot)}]' />

Returns a new back easing with the specified overshoot *s*.

## easeBounce {#easeBounce}

[Source](https://github.com/d3/d3-ease/blob/main/src/bounce.js) · Alias for [easeBounceOut](#easeBounceOut).

### easeBounceIn {#easeBounceIn}

<ExampleEase :eases='[{y: d3.easeBounceIn}]' />

Bounce easing, like a rubber ball.

### easeBounceOut {#easeBounceOut}

<ExampleEase :eases='[{y: d3.easeBounceOut}]' />

Reverse bounce easing; equivalent to 1 - [easeBounceIn](#easeBounceIn)(1 - *t*).

### easeBounceInOut {#easeBounceInOut}

<ExampleEase :eases='[{y: d3.easeBounceInOut}]' />

Symmetric bounce easing; scales [easeBounceIn](#easeBounceIn) for *t* in 0–0.5 and [easeBounceOut](#easeBounceOut) for *t* in 0.5–1.
