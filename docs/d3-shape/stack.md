# Stacks

[<img alt="Stacked Bar Chart" src="./img/stacked-bar.png" width="295" height="154">](https://observablehq.com/@d3/stacked-bar-chart)[<img alt="Streamgraph" src="./img/stacked-stream.png" width="295" height="154">](https://observablehq.com/@mbostock/streamgraph-transitions)

Some shape types can be stacked, placing one shape adjacent to another. For example, a bar chart of monthly sales might be broken down into a multi-series bar chart by product category, stacking bars vertically. This is equivalent to subdividing a bar chart by an ordinal dimension (such as product category) and applying a color encoding.

Stacked charts can show overall value and per-category value simultaneously; however, it is typically harder to compare across categories, as only the bottom layer of the stack is aligned. So, chose the [stack order](#stack_order) carefully, and consider a [streamgraph](#stackOffsetWiggle). (See also [grouped charts](https://observablehq.com/@d3/grouped-bar-chart).)

Like the [pie generator](#pies), the stack generator does not produce a shape directly. Instead it computes positions which you can then pass to an [area generator](#areas) or use directly, say to position bars.

### d3.stack()

[Source](https://github.com/d3/d3-shape/blob/main/src/stack.js)

Constructs a new stack generator with the default settings.

### stack(data, arguments…)

[Source](https://github.com/d3/d3-shape/blob/main/src/stack.js)

Generates a stack for the given array of *data*, returning an array representing each series. Any additional *arguments* are arbitrary; they are propagated to accessors along with the `this` object.

The series are determined by the [keys accessor](#stack_keys); each series *i* in the returned array corresponds to the *i*th key. Each series is an array of points, where each point *j* corresponds to the *j*th element in the input *data*. Lastly, each point is represented as an array [*y0*, *y1*] where *y0* is the lower value (baseline) and *y1* is the upper value (topline); the difference between *y0* and *y1* corresponds to the computed [value](#stack_value) for this point. The key for each series is available as *series*.key, and the [index](#stack_order) as *series*.index. The input data element for each point is available as *point*.data.

For example, consider the following table representing monthly sales of fruits:

Month   | Apples | Bananas | Cherries | Durians
--------|--------|---------|----------|---------
 1/2015 |   3840 |    1920 |      960 |     400
 2/2015 |   1600 |    1440 |      960 |     400
 3/2015 |    640 |     960 |      640 |     400
 4/2015 |    320 |     480 |      640 |     400

This might be represented in JavaScript as an array of objects:

```js
const data = [
  {month: new Date(2015, 0, 1), apples: 3840, bananas: 1920, cherries: 960, durians: 400},
  {month: new Date(2015, 1, 1), apples: 1600, bananas: 1440, cherries: 960, durians: 400},
  {month: new Date(2015, 2, 1), apples:  640, bananas:  960, cherries: 640, durians: 400},
  {month: new Date(2015, 3, 1), apples:  320, bananas:  480, cherries: 640, durians: 400}
];
```

To produce a stack for this data:

```js
const stack = d3.stack()
    .keys(["apples", "bananas", "cherries", "durians"])
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone);

const series = stack(data);
```

The resulting array has one element per *series*. Each series has one point per month, and each point has a lower and upper value defining the baseline and topline:

```js
[
  [[   0, 3840], [   0, 1600], [   0,  640], [   0,  320]], // apples
  [[3840, 5760], [1600, 3040], [ 640, 1600], [ 320,  800]], // bananas
  [[5760, 6720], [3040, 4000], [1600, 2240], [ 800, 1440]], // cherries
  [[6720, 7120], [4000, 4400], [2240, 2640], [1440, 1840]], // durians
]
```

Each series in then typically passed to an [area generator](#areas) to render an area chart, or used to construct rectangles for a bar chart.

### stack.keys(keys)

[Source](https://github.com/d3/d3-shape/blob/main/src/stack.js)

If *keys* is specified, sets the keys accessor to the specified function or array and returns this stack generator. If *keys* is not specified, returns the current keys accessor, which defaults to the empty array. A series (layer) is [generated](#_stack) for each key. Keys are typically strings, but they may be arbitrary values. The series’ key is passed to the [value accessor](#stack_value), along with each data point, to compute the point’s value.

### stack.value(value)

[Source](https://github.com/d3/d3-shape/blob/main/src/stack.js)

If *value* is specified, sets the value accessor to the specified function or number and returns this stack generator. If *value* is not specified, returns the current value accessor, which defaults to:

```js
function value(d, key) {
  return d[key];
}
```

Thus, by default the stack generator assumes that the input data is an array of objects, with each object exposing named properties with numeric values; see [*stack*](#_stack) for an example.

### stack.order(order)

[Source](https://github.com/d3/d3-shape/blob/main/src/stack.js)

If *order* is specified, sets the order accessor to the specified function or array and returns this stack generator. If *order* is not specified, returns the current order accessor, which defaults to [stackOrderNone](#stackOrderNone); this uses the order given by the [key accessor](#stack_key). See [stack orders](#stack-orders) for the built-in orders.

If *order* is a function, it is passed the generated series array and must return an array of numeric indexes representing the stack order. For example, the default order is defined as:

```js
function orderNone(series) {
  let n = series.length;
  const o = new Array(n);
  while (--n >= 0) o[n] = n;
  return o;
}
```

The stack order is computed prior to the [offset](#stack_offset); thus, the lower value for all points is zero at the time the order is computed. The index attribute for each series is also not set until after the order is computed.

### stack.offset(offset)

[Source](https://github.com/d3/d3-shape/blob/main/src/stack.js)

If *offset* is specified, sets the offset accessor to the specified function and returns this stack generator. If *offset* is not specified, returns the current offset acccesor, which defaults to [stackOffsetNone](#stackOffsetNone); this uses a zero baseline. See [stack offsets](#stack-offsets) for the built-in offsets.

The offset function is passed the generated series array and the order index array; it is then responsible for updating the lower and upper values in the series array. For example, the default offset is defined as:

```js
function offsetNone(series, order) {
  if (!((n = series.length) > 1)) return;
  for (let i = 1, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
    s0 = s1, s1 = series[order[i]];
    for (let j = 0; j < m; ++j) {
      s1[j][1] += s1[j][0] = s0[j][1];
    }
  }
}
```

## Stack orders

Stack orders are typically not used directly, but are instead passed to [*stack*.order](#stack_order).

### d3.stackOrderAppearance(series)

[Source](https://github.com/d3/d3-shape/blob/main/src/order/appearance.js)

Returns a series order such that the earliest series (according to the maximum value) is at the bottom.

### d3.stackOrderAscending(series)

[Source](https://github.com/d3/d3-shape/blob/main/src/order/ascending.js)

Returns a series order such that the smallest series (according to the sum of values) is at the bottom.

### d3.stackOrderDescending(series)

[Source](https://github.com/d3/d3-shape/blob/main/src/order/descending.js)

Returns a series order such that the largest series (according to the sum of values) is at the bottom.

### d3.stackOrderInsideOut(series)

[Source](https://github.com/d3/d3-shape/blob/main/src/order/insideOut.js)

Returns a series order such that the earliest series (according to the maximum value) are on the inside and the later series are on the outside. This order is recommended for streamgraphs in conjunction with the [wiggle offset](#stackOffsetWiggle). See [Stacked Graphs—Geometry & Aesthetics](http://leebyron.com/streamgraph/) by Byron & Wattenberg for more information.

### d3.stackOrderNone(series)

[Source](https://github.com/d3/d3-shape/blob/main/src/order/none.js)

Returns the given series order [0, 1, … *n* - 1] where *n* is the number of elements in *series*. Thus, the stack order is given by the [key accessor](#stack_keys).

### d3.stackOrderReverse(series)

[Source](https://github.com/d3/d3-shape/blob/main/src/order/reverse.js)

Returns the reverse of the given series order [*n* - 1, *n* - 2, … 0] where *n* is the number of elements in *series*. Thus, the stack order is given by the reverse of the [key accessor](#stack_keys).

## Stack offsets

Stack offsets are typically not used directly, but are instead passed to [*stack*.offset](#stack_offset).

### d3.stackOffsetExpand(series, order)

[Source](https://github.com/d3/d3-shape/blob/main/src/offset/expand.js)

Applies a zero baseline and normalizes the values for each point such that the topline is always one.

### d3.stackOffsetDiverging(series, order)

[Source](https://github.com/d3/d3-shape/blob/main/src/offset/diverging.js)

Positive values are stacked above zero, negative values are [stacked below zero](https://observablehq.com/@d3/diverging-stacked-bar-chart), and zero values are stacked at zero.

### d3.stackOffsetNone(series, order)

[Source](https://github.com/d3/d3-shape/blob/main/src/offset/none.js)

Applies a zero baseline.

### d3.stackOffsetSilhouette(series, order)

[Source](https://github.com/d3/d3-shape/blob/main/src/offset/silhouette.js)

Shifts the baseline down such that the center of the streamgraph is always at zero.

### d3.stackOffsetWiggle(series, order)

[Source](https://github.com/d3/d3-shape/blob/main/src/offset/wiggle.js)

Shifts the baseline so as to minimize the weighted wiggle of layers. This offset is recommended for streamgraphs in conjunction with the [inside-out order](#stackOrderInsideOut). See [Stacked Graphs—Geometry & Aesthetics](http://leebyron.com/streamgraph/) by Bryon & Wattenberg for more information.
