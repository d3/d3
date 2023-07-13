# Joining data

For an introduction, see [Thinking With Joins](http://bost.ocks.org/mike/join/) and the [*selection*.join notebook](https://observablehq.com/@d3/selection-join).

## *selection*.data(*data*, *key*) {#selection_data}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/data.js) · Binds the specified array of *data* with the selected elements, returning a new selection that represents the *update* selection: the elements successfully bound to data. Also defines the [enter](#selection_enter) and [exit](#selection_exit) selections on the returned selection, which can be used to add or remove elements to correspond to the new data. The specified *data* is an array of arbitrary values (*e.g.*, numbers or objects), or a function that returns an array of values for each group. When data is assigned to an element, it is stored in the property `__data__`, thus making the data “sticky” and available on re-selection.

The *data* is specified **for each group** in the selection. If the selection has multiple groups (such as [d3.selectAll](./selecting.md#selectAll) followed by [*selection*.selectAll](./selecting.md#selection_selectAll)), then *data* should typically be specified as a function. This function will be evaluated for each group in order, being passed the group’s parent datum (*d*, which may be undefined), the group index (*i*), and the selection’s parent nodes (*nodes*), with *this* as the group’s parent element.

In conjunction with [*selection*.join](#selection_join) (or more explicitly with [*selection*.enter](#selection_enter), [*selection*.exit](#selection_exit), [*selection*.append](./modifying.md#selection_append) and [*selection*.remove](./modifying.md#selection_remove)), *selection*.data can be used to enter, update and exit elements to match data. For example, to create an HTML table from a matrix of numbers:

```js
const matrix = [
  [11975,  5871, 8916, 2868],
  [ 1951, 10048, 2060, 6171],
  [ 8010, 16145, 8090, 8045],
  [ 1013,   990,  940, 6907]
];

d3.select("body")
  .append("table")
  .selectAll("tr")
  .data(matrix)
  .join("tr")
  .selectAll("td")
  .data(d => d)
  .join("td")
    .text(d => d);
```

In this example the *data* function is the identity function: for each table row, it returns the corresponding row from the data matrix.

If a *key* function is not specified, then the first datum in *data* is assigned to the first selected element, the second datum to the second selected element, and so on. A *key* function may be specified to control which datum is assigned to which element, replacing the default join-by-index, by computing a string identifier for each datum and element. This key function is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element (*nodes*[*i*]); the returned string is the element’s key. The key function is then also evaluated for each new datum in *data*, being passed the current datum (*d*), the current index (*i*), and the group’s new *data*, with *this* as the group’s parent DOM element; the returned string is the datum’s key. The datum for a given key is assigned to the element with the matching key. If multiple elements have the same key, the duplicate elements are put into the exit selection; if multiple data have the same key, the duplicate data are put into the enter selection.

For example, given this document:

```html
<div id="Ford"></div>
<div id="Jarrah"></div>
<div id="Kwon"></div>
<div id="Locke"></div>
<div id="Reyes"></div>
<div id="Shephard"></div>
```

You could join data by key as follows:


```js
const data = [
  {name: "Locke", number: 4},
  {name: "Reyes", number: 8},
  {name: "Ford", number: 15},
  {name: "Jarrah", number: 16},
  {name: "Shephard", number: 23},
  {name: "Kwon", number: 42}
];

d3.selectAll("div")
  .data(data, function(d) { return d ? d.name : this.id; })
    .text(d => d.number);
```

This example key function uses the datum *d* if present, and otherwise falls back to the element’s id property. Since these elements were not previously bound to data, the datum *d* is null when the key function is evaluated on selected elements, and non-null when the key function is evaluated on the new data.

The *update* and *enter* selections are returned in data order, while the *exit* selection preserves the selection order prior to the join. If a key function is specified, the order of elements in the selection may not match their order in the document; use [*selection*.order](./modifying.md#selection_order) or [*selection*.sort](./modifying.md#selection_sort) as needed. For more on how the key function affects the join, see [A Bar Chart, Part 2](https://observablehq.com/@d3/lets-make-a-bar-chart/2) and [Object Constancy](http://bost.ocks.org/mike/constancy/).

If *data* is not specified, this method returns the array of data for the selected elements.

This method cannot be used to clear bound data; use [*selection*.datum](#selection_datum) instead.

## *selection*.join(*enter*, *update*, *exit*) {#selection_join}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/join.js) · Appends, removes and reorders elements as necessary to match the data that was previously bound by [*selection*.data](#selection_data), returning the [merged](#selection_merge) enter and update selection. This method is a convenient alternative to the explicit [general update pattern](https://observablehq.com/@d3/general-update-pattern), replacing [*selection*.enter](#selection_enter), [*selection*.exit](#selection_exit), [*selection*.append](./modifying.md#selection_append), [*selection*.remove](./modifying.md#selection_remove), and [*selection*.order](./modifying.md#selection_order). For example:

```js
svg.selectAll("circle")
  .data(data)
  .join("circle")
    .attr("fill", "none")
    .attr("stroke", "black");
```

The *enter* function may be specified as a string shorthand, as above, which is equivalent to [*selection*.append](./modifying.md#selection_append) with the given element name. Likewise, optional *update* and *exit* functions may be specified, which default to the identity function and calling [*selection*.remove](./modifying.md#selection_remove), respectively. The shorthand above is thus equivalent to:

```js
svg.selectAll("circle")
  .data(data)
  .join(
    enter => enter.append("circle"),
    update => update,
    exit => exit.remove()
  )
    .attr("fill", "none")
    .attr("stroke", "black");
```

By passing separate functions on enter, update and exit, you have greater control over what happens. And by specifying a key function to [*selection*.data](#selection_data), you can minimize changes to the DOM to optimize performance. For example, to set different fill colors for enter and update:

```js
svg.selectAll("circle")
  .data(data)
  .join(
    enter => enter.append("circle").attr("fill", "green"),
    update => update.attr("fill", "blue")
  )
    .attr("stroke", "black");
```

The selections returned by the *enter* and *update* functions are merged and then returned by *selection*.join.

You can animate enter, update and exit by creating transitions inside the *enter*, *update* and *exit* functions. If the *enter* and *update* functions return transitions, their underlying selections are merged and then returned by *selection*.join. The return value of the *exit* function is not used.

For more, see the [*selection*.join notebook](https://observablehq.com/@d3/selection-join).

## *selection*.enter() {#selection_enter}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/enter.js) · Returns the enter selection: placeholder nodes for each datum that had no corresponding DOM element in the selection. (The enter selection is empty for selections not returned by [*selection*.data](#selection_data).)

The enter selection is typically used to create “missing” elements corresponding to new data. For example, to create DIV elements from an array of numbers:

```js
const div = d3.select("body")
  .selectAll("div")
  .data([4, 8, 15, 16, 23, 42])
  .enter().append("div")
    .text(d => d);
```

If the body is initially empty, the above code will create six new DIV elements, append them to the body in-order, and assign their text content as the associated (string-coerced) number:

```html
<div>4</div>
<div>8</div>
<div>15</div>
<div>16</div>
<div>23</div>
<div>42</div>
```

Conceptually, the enter selection’s placeholders are pointers to the parent element (in this example, the document body). The enter selection is typically only used transiently to append elements, and is often [merged](#selection_merge) with the update selection after appending, such that modifications can be applied to both entering and updating elements.

## *selection*.exit() {#selection_exit}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/exit.js) · Returns the exit selection: existing DOM elements in the selection for which no new datum was found. (The exit selection is empty for selections not returned by [*selection*.data](#selection_data).)

The exit selection is typically used to remove “superfluous” elements corresponding to old data. For example, to update the DIV elements created previously with a new array of numbers:

```js
div = div.data([1, 2, 4, 8, 16, 32], d => d);
```

Since a key function was specified (as the identity function), and the new data contains the numbers [4, 8, 16] which match existing elements in the document, the update selection contains three DIV elements. Leaving those elements as-is, we can append new elements for [1, 2, 32] using the enter selection:

```js
div.enter().append("div").text(d => d);
```

Likewise, to remove the exiting elements [15, 23, 42]:

```js
div.exit().remove();
```

Now the document body looks like this:

```html
<div>1</div>
<div>2</div>
<div>4</div>
<div>8</div>
<div>16</div>
<div>32</div>
```

The order of the DOM elements matches the order of the data because the old data’s order and the new data’s order were consistent. If the new data’s order is different, use [*selection*.order](./modifying.md#selection_order) to reorder the elements in the DOM. See the [general update pattern](https://observablehq.com/@d3/general-update-pattern) notebook for more on data joins.

## *selection*.datum(value) {#selection_datum}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/datum.js) · Gets or sets the bound data for each selected element. Unlike [*selection*.data](#selection_data), this method does not compute a join and does not affect indexes or the enter and exit selections.

If a *value* is specified, sets the element’s bound data to the specified value on all selected elements. If the *value* is a constant, all elements are given the same datum; otherwise, if the *value* is a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element (*nodes*[*i*]). The function is then used to set each element’s new data. A null value will delete the bound data.

If a *value* is not specified, returns the bound datum for the first (non-null) element in the selection. This is generally useful only if you know the selection contains exactly one element.

This method is useful for accessing HTML5 [custom data attributes](http://www.w3.org/TR/html5/dom.html#custom-data-attribute). For example, given the following elements:

```html
<ul id="list">
  <li data-username="shawnbot">Shawn Allen</li>
  <li data-username="mbostock">Mike Bostock</li>
</ul>
```

You can expose the custom data attributes by setting each element’s data as the built-in [dataset](http://www.w3.org/TR/html5/dom.html#dom-dataset) property:

```js
selection.datum(function() { return this.dataset; })
```

## *selection*.merge(*other*) {#selection_merge}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/merge.js) · Returns a new selection merging this selection with the specified *other* selection or transition. The returned selection has the same number of groups and the same parents as this selection. Any missing (null) elements in this selection are filled with the corresponding element, if present (not null), from the specified *selection*. (If the *other* selection has additional groups or parents, they are ignored.)

This method is used internally by [*selection*.join](#selection_join) to merge the [enter](#selection_enter) and [update](#selection_data) selections after binding data. You can also merge explicitly, although note that since merging is based on element index, you should use operations that preserve index, such as [*selection*.select](./selecting.md#selection_select) instead of [*selection*.filter](./selecting.md#selection_filter). For example:

```js
const odd = selection.select(function(d, i) { return i & 1 ? this : null; ));
const even = selection.select(function(d, i) { return i & 1 ? null : this; ));
const merged = odd.merge(even);
```

See [*selection*.data](#selection_data) for more.

This method is not intended for concatenating arbitrary selections, however: if both this selection and the specified *other* selection have (non-null) elements at the same index, this selection’s element is returned in the merge and the *other* selection’s element is ignored.
