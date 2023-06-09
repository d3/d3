# Selecting elements

A *selection* is a set of elements from the DOM. Typically these elements are identified by [selectors](http://www.w3.org/TR/selectors-api/) such as `.fancy` for elements with the class *fancy*, or `div` to select DIV elements.

Selection methods come in two forms, **select** and **selectAll**: the former selects only the first matching element, while the latter selects all matching elements in document order. The top-level selection methods, [d3.select](#select) and [d3.selectAll](#selectAll), query the entire document; the subselection methods, [*selection*.select](#selection_select) and [*selection*.selectAll](#selection_selectAll), restrict selection to descendants of the selected elements. There is also [*selection*.selectChild](#selection_selectChild) and [*selection*.selectChildren](#selection_selectChildren) for direct children.

By convention, selection methods that return the current selection such as [*selection*.attr](./modifying.md#selection_attr) use four spaces of indent, while methods that return a new selection use only two. This helps reveal changes of context by making them stick out of the chain:

```js
d3.select("body")
  .append("svg")
    .attr("width", 960)
    .attr("height", 500)
  .append("g")
    .attr("transform", "translate(20,20)")
  .append("rect")
    .attr("width", 920)
    .attr("height", 460);
```

## selection() {#selection}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/index.js) · [Selects](#select) the root element, `document.documentElement`.

```js
const root = d3.selection();
```

This function can also be used to test for selections (`instanceof d3.selection`) or to extend the selection prototype. For example, to add a method to check checkboxes:

```js
d3.selection.prototype.checked = function(value) {
  return arguments.length < 1
      ? this.property("checked")
      : this.property("checked", !!value);
};
```

And then to use:

```js
d3.selectAll("input[type=checkbox]").checked(true);
```

## select(*selector*) {#select}

[Source](https://github.com/d3/d3-selection/blob/main/src/select.js) · Selects the first element that matches the specified *selector* string.

```js
const svg = d3.select("#chart");
```

If no elements match the *selector*, returns an empty selection. If multiple elements match the *selector*, only the first matching element (in document order) will be selected. For example, to select the first anchor element:

```js
const anchor = d3.select("a");
```

If the *selector* is not a string, instead selects the specified node; this is useful if you already have a reference to a node, such as `document.body`.

```js
d3.select(document.body).style("background", "red");
```

Or, to make a clicked paragraph red:

```js
d3.selectAll("p").on("click", (event) => d3.select(event.currentTarget).style("color", "red"));
```

## selectAll(*selector*) {#selectAll}

[Source](https://github.com/d3/d3-selection/blob/main/src/selectAll.js) · Selects all elements that match the specified *selector* string.

```js
const p = d3.selectAll("p");
```

The elements will be selected in document order (top-to-bottom). If no elements in the document match the *selector*, or if the *selector* is null or undefined, returns an empty selection.

If the *selector* is not a string, instead selects the specified array of nodes; this is useful if you already have a reference to nodes, such as `this.childNodes` within an event listener or a global such as `document.links`. The nodes may instead be an iterable, or a pseudo-array such as a NodeList. For example, to color all links red:

```js
d3.selectAll(document.links).style("color", "red");
```

## *selection*.select(*selector*) {#selection_select}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/select.js) · For each selected element, selects the first descendant element that matches the specified *selector* string.

```js
const b = d3.selectAll("p").select("b"); // the first <b> in every <p>
```

If no element matches the specified selector for the current element, the element at the current index will be null in the returned selection. (If the *selector* is null, every element in the returned selection will be null, resulting in an empty selection.) If the current element has associated data, this data is propagated to the corresponding selected element. If multiple elements match the selector, only the first matching element in document order is selected.

If the *selector* is a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element (*nodes*[*i*]). It must return an element, or null if there is no matching element. For example, to select the previous sibling of each paragraph:

```js
const previous = d3.selectAll("p").select(function() {
  return this.previousElementSibling;
});
```

Unlike [*selection*.selectAll](#selection_selectAll), *selection*.select does not affect grouping: it preserves the existing group structure and indexes, and propagates data (if any) to selected children. Grouping plays an important role in the [data join](./joining.md). See [Nested Selections](http://bost.ocks.org/mike/nest/) and [How Selections Work](http://bost.ocks.org/mike/selection/) for more on this topic.

:::warning CAUTION
*selection*.select propagates the parent’s data to the selected child.
:::

## *selection*.selectAll(selector) {#selection_selectAll}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/selectAll.js) · For each selected element, selects the descendant elements that match the specified *selector* string.

```js
const b = d3.selectAll("p").selectAll("b"); // every <b> in every <p>
```

The elements in the returned selection are grouped by their corresponding parent node in this selection. If no element matches the specified selector for the current element, or if the *selector* is null, the group at the current index will be empty. The selected elements do not inherit data from this selection; use [*selection*.data](./joining.md#selection_data) to propagate data to children.

If the *selector* is a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element (*nodes*[*i*]). It must return an array of elements (or an iterable, or a pseudo-array such as a NodeList), or the empty array if there are no matching elements. For example, to select the previous and next siblings of each paragraph:

```js
const sibling = d3.selectAll("p").selectAll(function() {
  return [
    this.previousElementSibling,
    this.nextElementSibling
  ];
});
```

Unlike [*selection*.select](#selection_select), *selection*.selectAll does affect grouping: each selected descendant is grouped by the parent element in the originating selection. Grouping plays an important role in the [data join](./joining.md). See [Nested Selections](http://bost.ocks.org/mike/nest/) and [How Selections Work](http://bost.ocks.org/mike/selection/) for more on this topic.

## *selection*.filter(*filter*) {#selection_filter}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/filter.js) · Filters the selection, returning a new selection that contains only the elements for which the specified *filter* is true. For example, to filter a selection of table rows to contain only even rows:

```js
const even = d3.selectAll("tr").filter(":nth-child(even)");
```

This is approximately equivalent to using [d3.selectAll](#selectAll) directly, although the indexes may be different:

```js
const even = d3.selectAll("tr:nth-child(even)");
```

The *filter* may be specified either as a selector string or a function. If the *filter* is a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element (*nodes*[*i*]). Using a function:

```js
const even = d3.selectAll("tr").filter((d, i) => i & 1);
```

Or using [*selection*.select](#selection_select) (and avoiding an arrow function, since *this* is needed to refer to the current element):

```js
const even = d3.selectAll("tr").select(function(d, i) { return i & 1 ? this : null; });
```

Note that the `:nth-child` pseudo-class is a one-based index rather than a zero-based index. Also, the above filter functions do not have precisely the same meaning as `:nth-child`; they rely on the selection index rather than the number of preceding sibling elements in the DOM.

The returned filtered selection preserves the parents of this selection, but like [*array*.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), it does not preserve indexes as some elements may be removed; use [*selection*.select](#selection_select) to preserve the index, if needed.

## *selection*.selectChild(*selector*) {#selection_selectChild}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/selectChild.js) · Returns a new selection with the (first) child of each element of the current selection matching the *selector*.

```js
d3.selectAll("p").selectChild("b") // the first <b> child of every <p>
```

If no *selector* is specified, selects the first child (if any). If the *selector* is specified as a string, selects the first child that matches (if any). If the *selector* is a function, it is evaluated for each of the children nodes, in order, being passed the child (*child*), the child’s index (*i*), and the list of children (*children*); the method selects the first child for which the selector return truthy, if any.

:::warning CAUTION
*selection*.selectChild propagates the parent’s data to the selected child.
:::

## *selection*.selectChildren(*selector*) {#selection_selectChildren}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/selectChildren.js) · Returns a new selection with the children of each element of the current selection matching the *selector*. If no *selector* is specified, selects all the children. If the *selector* is specified as a string, selects the children that match (if any). If the *selector* is a function, it is evaluated for each of the children nodes, in order, being passed the child (*child*), the child’s index (*i*), and the list of children (*children*); the method selects all children for which the selector return truthy.

## *selection*.selection() {#selection_selection}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/index.js) · Returns the selection (for symmetry with [*transition*.selection](../d3-transition/selecting.md#transition_selection)).

## matcher(*selector*) {#matcher}

[Source](https://github.com/d3/d3-selection/blob/main/src/matcher.js) · Given the specified *selector*, returns a function which returns true if `this` element [matches](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches) the specified selector. This method is used internally by [*selection*.filter](#selection_filter). For example, this:

```js
const div = selection.filter("div");
```

Is equivalent to:

```js
const div = selection.filter(d3.matcher("div"));
```

(Although D3 is not a compatibility layer, this implementation does support vendor-prefixed implementations due to the recent standardization of *element*.matches.)

## selector(*selector*) {#selector}

[Source](https://github.com/d3/d3-selection/blob/main/src/selector.js) · Given the specified *selector*, returns a function which returns the first descendant of `this` element that matches the specified selector. This method is used internally by [*selection*.select](#selection_select). For example, this:

```js
const div = selection.select("div");
```

Is equivalent to:

```js
const div = selection.select(d3.selector("div"));
```

## selectorAll(*selector*) {#selectorAll}

[Source](https://github.com/d3/d3-selection/blob/main/src/selectAll.js) · Given the specified *selector*, returns a function which returns all descendants of `this` element that match the specified selector. This method is used internally by [*selection*.selectAll](#selection_selectAll). For example, this:

```js
const div = selection.selectAll("div");
```

Is equivalent to:

```js
const div = selection.selectAll(d3.selectorAll("div"));
```

## window(*node*) {#window}

[Source](https://github.com/d3/d3-selection/blob/main/src/window.js) · Returns the owner window for the specified *node*. If *node* is a node, returns the owner document’s default view; if *node* is a document, returns its default view; otherwise returns the *node*.

## style(*node*, *name*) {#style}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/style.js) · Returns the value of the style property with the specified *name* for the specified *node*. If the *node* has an inline style with the specified *name*, its value is returned; otherwise, the [computed property value](https://developer.mozilla.org/en-US/docs/Web/CSS/computed_value) is returned. See also [*selection*.style](./modifying.md#selection_style).
