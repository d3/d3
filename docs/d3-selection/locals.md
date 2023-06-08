# Local variables

D3 locals allow you to define local state independent of data. For instance, when rendering [small multiples](https://gist.github.com/mbostock/e1192fe405703d8321a5187350910e08) of time-series data, you might want the same x scale for all charts but distinct y scales to compare the relative performance of each metric. D3 locals are scoped by DOM elements: on set, the value is stored on the given element; on get, the value is retrieved from given element or the nearest ancestor that defines it.

:::warning CAUTION
Locals are rarely used; you may find it easier to store whatever state you need in the selection’s data.
:::

## local() {#local}

[Source](https://github.com/d3/d3-selection/blob/main/src/local.js) · Declares a new local variable.

```js
const foo = d3.local();
```

Like `var`, each local is a distinct symbolic reference; unlike `var`, the value of each local is also scoped by the DOM.

## *local*.set(*node*, *value*) {#local_set}

[Source](https://github.com/d3/d3-selection/blob/main/src/local.js) · Sets the value of this local on the specified *node* to the *value*, and returns the specified *value*. This is often performed using [*selection*.each](./control-flow.md#selection_each):

```js
selection.each(function(d) {
  foo.set(this, d.value);
});
```

If you are just setting a single variable, consider using [*selection*.property](./modifying.md#selection_property):

```js
selection.property(foo, (d) => d.value);
```

## *local*.get(*node*) {#local_get}

[Source](https://github.com/d3/d3-selection/blob/main/src/local.js) · Returns the value of this local on the specified *node*.

```js
selection.each(function() {
  const value = foo.get(this);
});
```

If the *node* does not define this local, returns the value from the nearest ancestor that defines it. Returns undefined if no ancestor defines this local.

## *local*.remove(*node*) {#local_remove}

[Source](https://github.com/d3/d3-selection/blob/main/src/local.js) · Deletes this local’s value from the specified *node*.

```js
selection.each(function() {
  foo.remove(this);
});
```

Returns true if the *node* defined this local prior to removal, and false otherwise. If ancestors also define this local, those definitions are unaffected, and thus [*local*.get](#local_get) will still return the inherited value.

## *local*.toString() {#local_toString}

[Source](https://github.com/d3/d3-selection/blob/main/src/local.js) · Returns the automatically-generated identifier for this local. This is the name of the property that is used to store the local’s value on elements, and thus you can also set or get the local’s value using *element*[*local*] or by using [*selection*.property](./modifying.md#selection_property).
