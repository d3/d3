# Adding numbers

Add floating point numbers with full precision.

## new Adder() {#Adder}

```js
const adder = new d3.Adder();
```

[Examples](https://observablehq.com/@d3/d3-fsum) · [Source](https://github.com/d3/d3-array/blob/main/src/fsum.js) · Creates a new adder with an initial value of 0.

## *adder*.add(*number*) {#adder_add}

```js
adder.add(42)
```

Adds the specified *number* to the adder’s current value and returns the adder.

## *adder*.valueOf() {#adder_valueOf}

```js
adder.valueOf() // 42
```

Returns the IEEE 754 double-precision representation of the adder’s current value. Most useful as the short-hand notation `+adder`, or when coercing as `Number(adder)`.

## fsum(*values*, *accessor*) {#fsum}

```js
d3.fsum([0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]) // 1
```

[Examples](https://observablehq.com/@d3/d3-fsum) · [Source](https://github.com/d3/d3-array/blob/main/src/fsum.js) · Returns a full-precision summation of the given *values*. Although slower, d3.fsum can replace [d3.sum](./summarize.md#sum) wherever greater precision is needed.

```js
d3.fsum(penguins, (d) => d.body_mass_g) // 1437000
```

If an *accessor* is specified, invokes the given function for each element in the input *values*, being passed the element `d`, the index `i`, and the array `data` as three arguments; the returned values will then be added.

## fcumsum(*values*, *accessor*) {#fcumsum}

```js
d3.fcumsum([1, 1e-14, -1]) // [1, 1.00000000000001, 1e-14]
```

[Examples](https://observablehq.com/@d3/d3-fcumsum) · [Source](https://github.com/d3/d3-array/blob/main/src/fsum.js) · Returns a full-precision cumulative sum of the given *values* as a Float64Array. Although slower, d3.fcumsum can replace [d3.cumsum](./summarize.md#cumsum) when greater precision is needed.

```js
d3.fcumsum(penguins, (d) => d.body_mass_g) // [3750, 7550, 10800, 10800, 14250, …]
```

If an *accessor* is specified, invokes the given function for each element in the input *values*, being passed the element `d`, the index `i`, and the array `data` as three arguments; the returned values will then be added.
