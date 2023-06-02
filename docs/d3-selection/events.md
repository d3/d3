# Handling events

For interaction, selections allow listening for and dispatching of events.

## *selection*.on(*typenames*, *listener*, *options*) {#selection_on}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/on.js) · Adds or removes a *listener* to each selected element for the specified event *typenames*.

```js
d3.selectAll("p").on("click", (event) => console.log(event))
```

The *typenames* is a string event type, such as `click`, `mouseover`, or `submit`; any [DOM event type](https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events) supported by your browser may be used. The type may be optionally followed by a period (`.`) and a name; the optional name allows multiple callbacks to be registered to receive events of the same type, such as `click.foo` and `click.bar`. To specify multiple typenames, separate typenames with spaces, such as `input change` or `click.foo click.bar`.

When a specified event is dispatched on a selected element, the specified *listener* will be evaluated for the element, being passed the current event (*event*) and the current datum (*d*), with *this* as the current DOM element (*event*.currentTarget). Listeners always see the latest datum for their element. Note: while you can use [*event*.pageX](https://developer.mozilla.org/en/DOM/event.pageX) and [*event*.pageY](https://developer.mozilla.org/en/DOM/event.pageY) directly, it is often convenient to transform the event position to the local coordinate system of the element that received the event using [d3.pointer](#pointer).

If an event listener was previously registered for the same *typename* on a selected element, the old listener is removed before the new listener is added. To remove a listener, pass null as the *listener*. To remove all listeners for a given name, pass null as the *listener* and `.foo` as the *typename*, where `foo` is the name; to remove all listeners with no name, specify `.` as the *typename*.

An optional *options* object may specify characteristics about the event listener, such as whether it is capturing or passive; see [*element*.addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

If a *listener* is not specified, returns the currently-assigned listener for the specified event *typename* on the first (non-null) selected element, if any. If multiple typenames are specified, the first matching listener is returned.

## *selection*.dispatch(*type*, *parameters*) {#selection_dispatch}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/dispatch.js) · Dispatches a [custom event](http://www.w3.org/TR/dom/#interface-customevent) of the specified *type* to each selected element, in order.

```js
d3.select("p").dispatch("click")
```

An optional *parameters* object may be specified to set additional properties of the event. It may contain the following fields:

* [`bubbles`](https://www.w3.org/TR/dom/#dom-event-bubbles) - if true, the event is dispatched to ancestors in reverse tree order.
* [`cancelable`](https://www.w3.org/TR/dom/#dom-event-cancelable) - if true, *event*.preventDefault is allowed.
* [`detail`](https://www.w3.org/TR/dom/#dom-customevent-detail) - any custom data associated with the event.

If *parameters* is a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element (*nodes*[*i*]). It must return the parameters for the current element.

## pointer(*event*, *target*) {#pointer}

[Source](https://github.com/d3/d3-selection/blob/main/src/pointer.js) · Returns a two-element array of numbers [*x*, *y*] representing the coordinates of the specified *event* relative to the specified *target*.

```js
const [x, y] = d3.pointer(event);
```

*event* can be a [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent), a [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent), a [Touch](https://www.w3.org/TR/touch-events/#touch-interface), or a custom event holding a UIEvent as *event*.sourceEvent.

If *target* is not specified, it defaults to the source event’s currentTarget property, if available. If the *target* is an SVG element, the event’s coordinates are transformed using the [inverse](https://www.w3.org/TR/geometry-1/#dom-dommatrixreadonly-inverse) of the [screen coordinate transformation matrix](https://www.w3.org/TR/SVG/types.html#__svg__SVGGraphicsElement__getScreenCTM). If the *target* is an HTML element, the event’s coordinates are translated relative to the top-left corner of the *target*’s [bounding client rectangle](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect). (As such, the coordinate system can only be translated relative to the client coordinates. See also [GeometryUtils](https://www.w3.org/TR/cssom-view-1/#the-geometryutils-interface).) Otherwise, [*event*.pageX, *event*.pageY] is returned.

## pointers(*event*, *target*) {#pointers}

[Source](https://github.com/d3/d3-selection/blob/main/src/pointers.js) · Returns an array [[*x0*, *y0*], [*x1*, *y1*]…] of coordinates of the specified *event*’s pointer locations relative to the specified *target*.

```js
const points = d3.pointers(event);
```

For touch events, the returned array of positions corresponds to the *event*.touches array; for other events, returns a single-element array.

If *target* is not specified, it defaults to the source event’s currentTarget property, if any.
