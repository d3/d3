# Modifying elements

After selecting elements, use the selection to modify the elements. For example, to set the class and color style of all paragraph elements in the current document:

```js
d3.selectAll("p")
    .attr("class", "graf")
    .style("color", "red");
```

Selection methods typically return the current selection, or a new selection, allowing the concise application of multiple operations on a given selection via method chaining. The above is equivalent to:

```js
const p = d3.selectAll("p");
p.attr("class", "graf");
p.style("color", "red");
```

Selections are immutable. All selection methods that affect which elements are selected (or their order) return a new selection rather than modifying the current selection. However, note that elements are necessarily mutable, as selections drive transformations of the document!

## *selection*.attr(*name*, *value*) {#selection_attr}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/attr.js) · If a *value* is specified, sets the attribute with the specified *name* to the specified value on the selected elements and returns this selection.

```js
selection.attr("color", "red")
```

If the *value* is a constant, all elements are given the same attribute value; otherwise, if the *value* is a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element (*nodes*[*i*]). The function’s return value is then used to set each element’s attribute. A null value will remove the specified attribute.

```js
selection.attr("color") // "red"
```

If a *value* is not specified, returns the current value of the specified attribute for the first (non-null) element in the selection. This is generally useful only if you know that the selection contains exactly one element.

The specified *name* may have a namespace prefix, such as `xlink:href` to specify the `href` attribute in the XLink namespace. See [namespaces](./namespaces.md#namespaces) for the map of supported namespaces; additional namespaces can be registered by adding to the map.

## *selection*.classed(*names*, *value*) {#selection_classed}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/classed.js) · If a *value* is specified, assigns or unassigns the specified CSS class *names* on the selected elements by setting the `class` attribute or modifying the `classList` property and returns this selection.

```js
selection.classed("foo", true)
```

The specified *names* is a string of space-separated class names. For example, to assign the classes `foo` and `bar` to the selected elements:

```js
selection.classed("foo bar", true)
```

If the *value* is truthy, then all elements are assigned the specified classes; otherwise, the classes are unassigned.

```js
selection.classed("foo", () => Math.random() > 0.5)
```

If the *value* is a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element (*nodes*[*i*]). The function’s return value is then used to assign or unassign classes on each element.

```js
selection.classed("foo") // true, perhaps
```

If a *value* is not specified, returns true if and only if the first (non-null) selected element has the specified *classes*. This is generally useful only if you know the selection contains exactly one element.

## *selection*.style(*name*, *value*, *priority*) {#selection_style}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/style.js) · If a *value* is specified, sets the style property with the specified *name* to the specified value on the selected elements and returns this selection.

```js
selection.style("color", "red")
```

If the *value* is a constant, then all elements are given the same style property value; otherwise, if the *value* is a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element (*nodes*[*i*]). The function’s return value is then used to set each element’s style property. A null value will remove the style property. An optional *priority* may also be specified, either as null or the string `important` (without the exclamation point).

```js
selection.style("color") // "red"
```

If a *value* is not specified, returns the current value of the specified style property for the first (non-null) element in the selection. The current value is defined as the element’s inline value, if present, and otherwise its [computed value](https://developer.mozilla.org/en-US/docs/Web/CSS/computed_value). Accessing the current style value is generally useful only if you know the selection contains exactly one element.

:::warning CAUTION
Unlike many SVG attributes, CSS styles typically have associated units. For example, `3px` is a valid stroke-width property value, while `3` is not. Some browsers implicitly assign the `px` (pixel) unit to numeric values, but not all browsers do: IE, for example, throws an “invalid arguments” error!
:::

## *selection*.property(*name*, *value*) {#selection_property}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/property.js) · Some HTML elements have special properties that are not addressable using attributes or styles, such as a form field’s text `value` and a checkbox’s `checked` boolean. Use this method to get or set these properties.

```js
selection.property("checked", true)
```

If a *value* is specified, sets the property with the specified *name* to the specified value on selected elements. If the *value* is a constant, then all elements are given the same property value; otherwise, if the *value* is a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element (*nodes*[*i*]). The function’s return value is then used to set each element’s property. A null value will delete the specified property.

```js
selection.property("checked") // true, perhaps
```

If a *value* is not specified, returns the value of the specified property for the first (non-null) element in the selection. This is generally useful only if you know the selection contains exactly one element.

## *selection*.text(*value*) {#selection_text}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/text.js) · If a *value* is specified, sets the [text content](http://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-textContent) to the specified value on all selected elements, replacing any existing child elements.

```js
selection.text("Hello, world!")
```

If the *value* is a constant, then all elements are given the same text content; otherwise, if the *value* is a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element (*nodes*[*i*]). The function’s return value is then used to set each element’s text content. A null value will clear the content.

```js
selection.text() // "Hello, world!"
```

If a *value* is not specified, returns the text content for the first (non-null) element in the selection. This is generally useful only if you know the selection contains exactly one element.

## *selection*.html(*value*) {#selection_html}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/html.js) · If a *value* is specified, sets the [inner HTML](http://dev.w3.org/html5/spec-LC/apis-in-html-documents.html#innerhtml) to the specified value on all selected elements, replacing any existing child elements.

```js
selection.html("Hello, <i>world</i>!")
```

If the *value* is a constant, then all elements are given the same inner HTML; otherwise, if the *value* is a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element (*nodes*[*i*]). The function’s return value is then used to set each element’s inner HTML. A null value will clear the content.

```js
selection.html() // "Hello, <i>world</i>!"
```

If a *value* is not specified, returns the inner HTML for the first (non-null) element in the selection. This is generally useful only if you know the selection contains exactly one element.

Use [*selection*.append](#selection_append) or [*selection*.insert](#selection_insert) instead to create data-driven content; this method is intended for when you want a little bit of HTML, say for rich formatting. Also, *selection*.html is only supported on HTML elements. SVG elements and other non-HTML elements do not support the innerHTML property, and thus are incompatible with *selection*.html. Consider using [XMLSerializer](https://developer.mozilla.org/en-US/docs/XMLSerializer) to convert a DOM subtree to text. See also the [innersvg polyfill](https://code.google.com/p/innersvg/), which provides a shim to support the innerHTML property on SVG elements.

## *selection*.append(*type*) {#selection_append}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/append.js) · If the specified *type* is a string, appends a new element of this type (tag name) as the last child of each selected element, or before the next following sibling in the update selection if this is an [enter selection](./joining.md#selection_enter). The latter behavior for enter selections allows you to insert elements into the DOM in an order consistent with the new bound data; however, note that [*selection*.order](#selection_order) may still be required if updating elements change order (*i.e.*, if the order of new data is inconsistent with old data).

If the specified *type* is a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element (*nodes*[*i*]). This function should return an element to be appended. (The function typically creates a new element, but it may instead return an existing element.) For example, to append a paragraph to each DIV element:

```js
d3.selectAll("div").append("p");
```

This is equivalent to:

```js
d3.selectAll("div").append(() => document.createElement("p"));
```

Which is equivalent to:

```js
d3.selectAll("div").select(function() {
  return this.appendChild(document.createElement("p"));
});
```

In both cases, this method returns a new selection containing the appended elements. Each new element inherits the data of the current elements, if any, in the same manner as [*selection*.select](./selecting.md#selection_select).

The specified *name* may have a namespace prefix, such as `svg:text` to specify a `text` attribute in the SVG namespace. See [namespaces](./namespaces.md#namespaces) for the map of supported namespaces; additional namespaces can be registered by adding to the map. If no namespace is specified, the namespace will be inherited from the parent element; or, if the name is one of the known prefixes, the corresponding namespace will be used (for example, `svg` implies `svg:svg`).

## *selection*.insert(*type*, *before*) {#selection_insert}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/insert.js) · If the specified *type* is a string, inserts a new element of this type (tag name) before the first element matching the specified *before* selector for each selected element. For example, a *before* selector `:first-child` will prepend nodes before the first child. If *before* is not specified, it defaults to null. (To append elements in an order consistent with [bound data](./joining.md), use [*selection*.append](#selection_append).)

Both *type* and *before* may instead be specified as functions which are evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element (*nodes*[*i*]). The *type* function should return an element to be inserted; the *before* function should return the child element before which the element should be inserted. For example, to append a paragraph to each DIV element:

```js
d3.selectAll("div").insert("p");
```

This is equivalent to:

```js
d3.selectAll("div").insert(() => document.createElement("p"));
```

Which is equivalent to:

```js
d3.selectAll("div").select(function() {
  return this.insertBefore(document.createElement("p"), null);
});
```

In both cases, this method returns a new selection containing the appended elements. Each new element inherits the data of the current elements, if any, in the same manner as [*selection*.select](./selecting.md#selection_select).

The specified *name* may have a namespace prefix, such as `svg:text` to specify a `text` attribute in the SVG namespace. See [namespaces](./namespaces.md#namespaces) for the map of supported namespaces; additional namespaces can be registered by adding to the map. If no namespace is specified, the namespace will be inherited from the parent element; or, if the name is one of the known prefixes, the corresponding namespace will be used (for example, `svg` implies `svg:svg`).

## *selection*.remove() {#selection_remove}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/remove.js) · Removes the selected elements from the document. Returns this selection (the removed elements) which are now detached from the DOM. There is not currently a dedicated API to add removed elements back to the document; however, you can pass a function to [*selection*.append](#selection_append) or [*selection*.insert](#selection_insert) to re-add elements.

## *selection*.clone(*deep*) {#selection_clone}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/clone.js) · Inserts clones of the selected elements immediately following the selected elements and returns a selection of the newly added clones. If *deep* is truthy, the descendant nodes of the selected elements will be cloned as well. Otherwise, only the elements themselves will be cloned. Equivalent to:

```js
selection.select(function() {
  return this.parentNode.insertBefore(this.cloneNode(deep), this.nextSibling);
});
```

## *selection*.sort(*compare*) {#selection_sort}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/sort.js) · Returns a new selection that contains a copy of each group in this selection sorted according to the *compare* function. After sorting, re-inserts elements to match the resulting order (per [*selection*.order](#selection_order)).

The compare function, which defaults to [ascending](../d3-array/sort.md#ascending), is passed two elements’ data *a* and *b* to compare. It should return either a negative, positive, or zero value. If negative, then *a* should be before *b*; if positive, then *a* should be after *b*; otherwise, *a* and *b* are considered equal and the order is arbitrary.

## *selection*.order() {#selection_order}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/order.js) · Re-inserts elements into the document such that the document order of each group matches the selection order. This is equivalent to calling [*selection*.sort](#selection_sort) if the data is already sorted, but much faster.

## *selection*.raise() {#selection_raise}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/raise.js) · Re-inserts each selected element, in order, as the last child of its parent. Equivalent to:

```js
selection.each(function() {
  this.parentNode.appendChild(this);
});
```

## *selection*.lower() {#selection_lower}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/lower.js) · Re-inserts each selected element, in order, as the first child of its parent. Equivalent to:

```js
selection.each(function() {
  this.parentNode.insertBefore(this, this.parentNode.firstChild);
});
```

## create(*name*) {#create}

[Source](https://github.com/d3/d3-selection/blob/main/src/create.js) · Given the specified element *name*, returns a single-element selection containing a detached element of the given name in the current document. This method assumes the HTML namespace, so you must specify a namespace explicitly when creating SVG or other non-HTML elements; see [namespace](./namespaces.md#namespace) for details on supported namespace prefixes.

```js
d3.create("svg") // equivalent to svg:svg
```
```js
d3.create("svg:svg") // more explicitly
```
```js
d3.create("svg:g") // an SVG G element
```
```js
d3.create("g") // an HTML G (unknown) element
```

## creator(*name*) {#creator}

[Source](https://github.com/d3/d3-selection/blob/main/src/creator.js) · Given the specified element *name*, returns a function which creates an element of the given name, assuming that `this` is the parent element. This method is used internally by [*selection*.append](#selection_append) and [*selection*.insert](#selection_insert) to create new elements. For example, this:

```js
selection.append("div");
```

Is equivalent to:

```js
selection.append(d3.creator("div"));
```

See [namespace](./namespaces.md#namespace) for details on supported namespace prefixes, such as for SVG elements.
