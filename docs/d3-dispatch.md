# d3-dispatch

Dispatching is a low-level interaction mechanism that allows you to register named callbacks and then call them with arbitrary arguments. A variety of D3 interaction components, such as [d3-drag](./d3-drag.md), use [dispatch](#dispatch) to emit events to listeners. Think of this as [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) except every listener has a well-defined name so it’s easy to remove or replace them.

For example, to create a dispatch for *start* and *end* events:

```js
const dispatch = d3.dispatch("start", "end");
```

You can then register callbacks for these events using [*dispatch*.on](#dispatch_on):

```js
dispatch.on("start", callback1);
dispatch.on("start.foo", callback2);
dispatch.on("end", callback3);
```

Then, you can invoke all the *start* callbacks using [*dispatch*.call](#dispatch_call) or [*dispatch*.apply](#dispatch_apply):

```js
dispatch.call("start");
```

Like *function*.call, you may also specify the `this` context and any arguments:

```js
dispatch.call("start", {about: "I am a context object"}, "I am an argument");
```

<!-- Want a more involved example? See how to use [d3-dispatch for coordinated views](http://bl.ocks.org/mbostock/5872848). -->

## dispatch(...*types*) {#dispatch}

[Source](https://github.com/d3/d3-dispatch/blob/main/src/dispatch.js) · Creates a new dispatch for the specified event *types*. Each *type* is a string, such as `"start"` or `"end"`.

## *dispatch*.on(*typenames*, *callback*) {#dispatch_on}

[Source](https://github.com/d3/d3-dispatch/blob/main/src/dispatch.js) · Adds, removes or gets the *callback* for the specified *typenames*. If a *callback* function is specified, it is registered for the specified (fully-qualified) *typenames*. If a callback was already registered for the given *typenames*, the existing callback is removed before the new callback is added.

The specified *typenames* is a string, such as `start` or `end.foo`. The type may be optionally followed by a period (`.`) and a name; the optional name allows multiple callbacks to be registered to receive events of the same type, such as `start.foo` and `start.bar`. To specify multiple typenames, separate typenames with spaces, such as `start end` or `start.foo start.bar`.

To remove all callbacks for a given name `foo`, say `dispatch.on(".foo", null)`.

If *callback* is not specified, returns the current callback for the specified *typenames*, if any. If multiple typenames are specified, the first matching callback is returned.

## *dispatch*.copy() {#dispatch_copy}

[Source](https://github.com/d3/d3-dispatch/blob/main/src/dispatch.js) · Returns a copy of this dispatch object. Changes to this dispatch do not affect the returned copy and *vice versa*.

## *dispatch*.call(*type*, *that*, ...*arguments*) {#dispatch_call}

[Source](https://github.com/d3/d3-dispatch/blob/main/src/dispatch.js) · Like [*function*.call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call), invokes each registered callback for the specified *type*, passing the callback the specified *...*argument**, with *that* as the `this` context. See [*dispatch*.apply](#dispatch_apply) for more information.

## *dispatch*.apply(*type*, *that*, *arguments*) {#dispatch_apply}

[Source](https://github.com/d3/d3-dispatch/blob/main/src/dispatch.js) · Like [*function*.apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call), invokes each registered callback for the specified *type*, passing the callback the specified *arguments*, with *that* as the `this` context. For example, if you wanted to dispatch your *custom* callbacks after handling a native *click* event, while preserving the current `this` context and arguments, you could say:

```js
selection.on("click", function() {
  dispatch.apply("custom", this, arguments);
});
```

You can pass whatever arguments you want to callbacks; most commonly, you might create an object that represents an event, or pass the current datum (*d*) and index (*i*). See [function.call](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/Call) and [function.apply](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/Apply) for further information.
