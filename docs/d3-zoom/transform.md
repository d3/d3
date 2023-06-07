# Zoom transforms

The [zoom behavior](./zoom.md) stores the zoom state on the element to which the zoom behavior was [applied](#_zoom), not on the zoom behavior itself. This allows the zoom behavior to be applied to many elements simultaneously with independent zooming. The zoom state can change either on user interaction or programmatically via [*zoom*.transform](./zoom.md#zoom_transform).

To retrieve the zoom state, use *event*.transform on the current [zoom event](./zoom.md#zoom-events) within a zoom event listener (see [*zoom*.on](./zoom.md#zoom_on)), or use [zoomTransform](#zoomTransform) for a given node. The latter is useful for modifying the zoom state programmatically, say to implement buttons for zooming in and out.

## zoomTransform(*node*) {#zoomTransform}

[Source](https://github.com/d3/d3-zoom/blob/main/src/transform.js) · Returns the current transform for the specified *node*. Note that *node* should typically be a DOM element, not a *selection*. (A selection may consist of multiple nodes, in different states, and this function only returns a single transform.) If you have a selection, call [*selection*.node](../d3-selection/control-flow.md#selection_node) first:

```js
var transform = d3.zoomTransform(selection.node());
```

In the context of an [event listener](../d3-selection/events.md#selection_on), the *node* is typically the element that received the input event (which should be equal to [*event*.transform](./zoom.md#zoom-events)), *this*:

```js
var transform = d3.zoomTransform(this);
```

Internally, an element’s transform is stored as *element*.\_\_zoom; however, you should use this method rather than accessing it directly. If the given *node* has no defined transform, returns the transform of the closest ancestor, or if none exists, the [identity transformation](#zoomIdentity). The returned transform represents a two-dimensional [transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix#Affine_transformations) of the form:

*k* 0 *t<sub>x</sub>*
<br>0 *k* *t<sub>y</sub>*
<br>0 0 1

(This matrix is capable of representing only scale and translation; a future release may also allow rotation, though this would probably not be a backwards-compatible change.) The position ⟨*x*,*y*⟩ is transformed to ⟨*xk* + *t<sub>x</sub>*,*yk* + *t<sub>y</sub>*⟩. The transform object exposes the following properties:

* *transform*.x - the translation amount *t<sub>x</sub>* along the *x*-axis.
* *transform*.y - the translation amount *t<sub>y</sub>* along the *y*-axis.
* *transform*.k - the scale factor *k*.

These properties should be considered read-only; instead of mutating a transform, use [*transform*.scale](#transform_scale) and [*transform*.translate](#transform_translate) to derive a new transform. Also see [*zoom*.scaleBy](./zoom.md#zoom_scaleBy), [*zoom*.scaleTo](./zoom.md#zoom_scaleTo) and [*zoom*.translateBy](./zoom.md#zoom_translateBy) for convenience methods on the zoom behavior. To create a transform with a given *k*, *t<sub>x</sub>*, and *t<sub>y</sub>*:

```js
var t = d3.zoomIdentity.translate(x, y).scale(k);
```

To apply the transformation to a [Canvas 2D context](https://www.w3.org/TR/2dcontext/), use [*context*.translate](https://www.w3.org/TR/2dcontext/#dom-context-2d-translate) followed by [*context*.scale](https://www.w3.org/TR/2dcontext/#dom-context-2d-scale):

```js
context.translate(transform.x, transform.y);
context.scale(transform.k, transform.k);
```

Similarly, to apply the transformation to HTML elements via [CSS](https://www.w3.org/TR/css-transforms-1/):

```js
div.style("transform", "translate(" + transform.x + "px," + transform.y + "px) scale(" + transform.k + ")");
div.style("transform-origin", "0 0");
```

To apply the transformation to [SVG](https://www.w3.org/TR/SVG/coords.html#TransformAttribute):

```js
g.attr("transform", "translate(" + transform.x + "," + transform.y + ") scale(" + transform.k + ")");
```

Or more simply, taking advantage of [*transform*.toString](#transform_toString):

```js
g.attr("transform", transform);
```

Note that the order of transformations matters! The translate must be applied before the scale.

## new d3.ZoomTransform(*k*, *x*, *y*) {#ZoomTransform}

[Source](https://github.com/d3/d3-zoom/blob/main/src/transform.js) · Returns a transform with scale *k* and translation (*x*, *y*).

## zoomIdentity {#zoomIdentity}

[Source](https://github.com/d3/d3-zoom/blob/main/src/transform.js) · The identity transform, where *k* = 1, *t<sub>x</sub>* = *t<sub>y</sub>* = 0.

## *transform*.scale(*k*) {#transform_scale}

[Source](https://github.com/d3/d3-zoom/blob/main/src/transform.js) · Returns a transform whose scale *k₁* is equal to *k₀k*, where *k₀* is this transform’s scale.

## *transform*.translate(*x*, *y*) {#transform_translate}

[Source](https://github.com/d3/d3-zoom/blob/main/src/transform.js) · Returns a transform whose translation *t<sub>x1</sub>* and *t<sub>y1</sub>* is equal to *t<sub>x0</sub>* + *t<sub>k</sub> x* and *t<sub>y0</sub>* + *t<sub>k</sub> y*, where *t<sub>x0</sub>* and *t<sub>y0</sub>* is this transform’s translation and *t<sub>k</sub>* is this transform’s scale.

## *transform*.apply(*point*) {#transform_apply}

[Source](https://github.com/d3/d3-zoom/blob/main/src/transform.js) · Returns the transformation of the specified *point* which is a two-element array of numbers [*x*, *y*]. The returned point is equal to [*xk* + *t<sub>x</sub>*, *yk* + *t<sub>y</sub>*].

## *transform*.applyX(*x*) {#transform_applyX}

[Source](https://github.com/d3/d3-zoom/blob/main/src/transform.js) · Returns the transformation of the specified *x*-coordinate, *xk* + *t<sub>x</sub>*.

## *transform*.applyY(*y*) {#transform_applyY}

[Source](https://github.com/d3/d3-zoom/blob/main/src/transform.js) · Returns the transformation of the specified y coordinate, *yk* + *t<sub>y</sub>*.

## *transform*.invert(*point*) {#transform_invert}

[Source](https://github.com/d3/d3-zoom/blob/main/src/transform.js) · Returns the inverse transformation of the specified *point* which is a two-element array of numbers [*x*, *y*]. The returned point is equal to [(*x* - *t<sub>x</sub>*) / *k*, (*y* - *t<sub>y</sub>*) / *k*].

## *transform*.invertX(*x*) {#transform_invertX}

[Source](https://github.com/d3/d3-zoom/blob/main/src/transform.js) · Returns the inverse transformation of the specified *x*-coordinate, (*x* - *t<sub>x</sub>*) / *k*.

## *transform*.invertY(*y*) {#transform_invertY}

[Source](https://github.com/d3/d3-zoom/blob/main/src/transform.js) · Returns the inverse transformation of the specified y coordinate, (*y* - *t<sub>y</sub>*) / *k*.

## *transform*.rescaleX(*x*) {#transform_rescaleX}

[Source](https://github.com/d3/d3-zoom/blob/main/src/transform.js) · Returns a [copy](https://github.com/d3/d3-scale#continuous_copy) of the [continuous scale](https://github.com/d3/d3-scale#continuous-scales) *x* whose [domain](https://github.com/d3/d3-scale#continuous_domain) is transformed. This is implemented by first applying the [inverse *x*-transform](#transform_invertX) on the scale’s [range](https://github.com/d3/d3-scale#continuous_range), and then applying the [inverse scale](https://github.com/d3/d3-scale#continuous_invert) to compute the corresponding domain:

```js
function rescaleX(x) {
  var range = x.range().map(transform.invertX, transform),
      domain = range.map(x.invert, x);
  return x.copy().domain(domain);
}
```

The scale *x* must use [interpolateNumber](https://github.com/d3/d3-interpolate#interpolateNumber); do not use [*continuous*.rangeRound](https://github.com/d3/d3-scale#continuous_rangeRound) as this reduces the accuracy of [*continuous*.invert](https://github.com/d3/d3-scale#continuous_invert) and can lead to an inaccurate rescaled domain. This method does not modify the input scale *x*; *x* thus represents the untransformed scale, while the returned scale represents its transformed view.

## *transform*.rescaleY(*y*) {#transform_rescaleY}

[Source](https://github.com/d3/d3-zoom/blob/main/src/transform.js) · Returns a [copy](https://github.com/d3/d3-scale#continuous_copy) of the [continuous scale](https://github.com/d3/d3-scale#continuous-scales) *y* whose [domain](https://github.com/d3/d3-scale#continuous_domain) is transformed. This is implemented by first applying the [inverse *y*-transform](#transform_invertY) on the scale’s [range](https://github.com/d3/d3-scale#continuous_range), and then applying the [inverse scale](https://github.com/d3/d3-scale#continuous_invert) to compute the corresponding domain:

```js
function rescaleY(y) {
  var range = y.range().map(transform.invertY, transform),
      domain = range.map(y.invert, y);
  return y.copy().domain(domain);
}
```

The scale *y* must use [interpolateNumber](https://github.com/d3/d3-interpolate#interpolateNumber); do not use [*continuous*.rangeRound](https://github.com/d3/d3-scale#continuous_rangeRound) as this reduces the accuracy of [*continuous*.invert](https://github.com/d3/d3-scale#continuous_invert) and can lead to an inaccurate rescaled domain. This method does not modify the input scale *y*; *y* thus represents the untransformed scale, while the returned scale represents its transformed view.

## *transform*.toString() {#transform_toString}

[Source](https://github.com/d3/d3-zoom/blob/main/src/transform.js) · Returns a string representing the [SVG transform](https://www.w3.org/TR/SVG/coords.html#TransformAttribute) corresponding to this transform. Implemented as:

```js
function toString() {
  return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
}
```
