# Control flow

For advanced usage, selections provide methods for custom control flow.

## *selection*.each(*function*) {#selection_each}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/each.js) · Invokes the specified *function* for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element (*nodes*[*i*]). This method can be used to invoke arbitrary code for each selected element, and is useful for creating a context to access parent and child data simultaneously, such as:

```js
parent.each(function(p, j) {
  d3.select(this)
    .selectAll(".child")
      .text(d => `child ${d.name} of ${p.name}`);
});
```

See [sized donut multiples](https://observablehq.com/@d3/sized-donut-multiples) for an example.

## *selection*.call(*function*, ...*arguments*) {#selection_call}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/call.js) · Invokes the specified *function* exactly once, passing in this selection along with any optional *arguments*. Returns this selection. This is equivalent to invoking the function by hand but facilitates method chaining. For example, to set several styles in a reusable function:

```js
function name(selection, first, last) {
  selection
      .attr("first-name", first)
      .attr("last-name", last);
}
```

Now say:

```js
d3.selectAll("div").call(name, "John", "Snow");
```

This is roughly equivalent to:

```js
name(d3.selectAll("div"), "John", "Snow");
```

The only difference is that *selection*.call always returns the *selection* and not the return value of the called *function*, `name`.

## *selection*.empty() {#selection_empty}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/empty.js) · Returns true if this selection contains no (non-null) elements.

```js
d3.selectAll("p").empty() // false, here
```

## *selection*.nodes() {#selection_nodes}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/nodes.js) · Returns an array of all (non-null) elements in this selection.

```js
d3.selectAll("p").nodes() // [p, p, p, …]
```

Equivalent to:

```js
Array.from(selection)
```

## *selection*[Symbol.iterator]\(\) {#selection_iterator}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/iterator.js) · Returns an iterator over the selected (non-null) elements. For example, to iterate over the selected elements:

```js
for (const element of selection) {
  console.log(element);
}
```

To flatten the selection to an array:

```js
const elements = [...selection];
```

## *selection*.node() {#selection_node}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/node.js) · Returns the first (non-null) element in this selection. If the selection is empty, returns null.

## *selection*.size() {#selection_size}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/size.js) · Returns the total number of (non-null) elements in this selection.
