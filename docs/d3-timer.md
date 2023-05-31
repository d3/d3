# d3-timer

This module provides an efficient queue capable of managing thousands of concurrent animations, while guaranteeing consistent, synchronized timing with concurrent or staged animations. Internally, it uses [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) for fluid animation (if available), switching to [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout) for delays longer than 24ms.

## Installing

If you use npm, `npm install d3-timer`. You can also download the [latest release on GitHub](https://github.com/d3/d3-timer/releases/latest). For vanilla HTML in modern browsers, import d3-timer from Skypack:

```html
<script type="module">

import {timer} from "https://cdn.skypack.dev/d3-timer@3";

const t = timer(callback);

</script>
```

For legacy environments, you can load d3-timer’s UMD bundle from an npm-based CDN such as jsDelivr; a `d3` global is exported:

```html
<script src="https://cdn.jsdelivr.net/npm/d3-timer@3"></script>
<script>

const timer = d3.timer(callback);

</script>
```

## API Reference

#### d3.now()

[Source](https://github.com/d3/d3-timer/blob/main/src/timer.js "Source")

Returns the current time as defined by [performance.now](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now) if available, and [Date.now](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/now) if not. The current time is updated at the start of a frame; it is thus consistent during the frame, and any timers scheduled during the same frame will be synchronized. If this method is called outside of a frame, such as in response to a user event, the current time is calculated and then fixed until the next frame, again ensuring consistent timing during event handling.

#### d3.timer(callback, delay, time)

[Source](https://github.com/d3/d3-timer/blob/main/src/timer.js "Source")

Schedules a new timer, invoking the specified *callback* repeatedly until the timer is [stopped](#timer_stop). An optional numeric *delay* in milliseconds may be specified to invoke the given *callback* after a delay; if *delay* is not specified, it defaults to zero. The delay is relative to the specified *time* in milliseconds; if *time* is not specified, it defaults to [now](#now).

The *callback* is passed the (apparent) *elapsed* time since the timer became active. For example:

```js
const t = d3.timer((elapsed) => {
  console.log(elapsed);
  if (elapsed > 200) t.stop();
}, 150);
```

This produces roughly the following console output:

```
3
25
48
65
85
106
125
146
167
189
209
```

(The exact values may vary depending on your JavaScript runtime and what else your computer is doing.) Note that the first *elapsed* time is 3ms: this is the elapsed time since the timer started, not since the timer was scheduled. Here the timer started 150ms after it was scheduled due to the specified delay. The apparent *elapsed* time may be less than the true *elapsed* time if the page is backgrounded and [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) is paused; in the background, apparent time is frozen.

If [timer](#timer) is called within the callback of another timer, the new timer callback (if eligible as determined by the specified *delay* and *time*) will be invoked immediately at the end of the current frame, rather than waiting until the next frame. Within a frame, timer callbacks are guaranteed to be invoked in the order they were scheduled, regardless of their start time.

#### timer.restart(callback, delay, time)

[Source](https://github.com/d3/d3-timer/blob/main/src/timer.js "Source")

Restart a timer with the specified *callback* and optional *delay* and *time*. This is equivalent to stopping this timer and creating a new timer with the specified arguments, although this timer retains the original invocation priority.

#### timer.stop()

[Source](https://github.com/d3/d3-timer/blob/main/src/timer.js "Source")

Stops this timer, preventing subsequent callbacks. This method has no effect if the timer has already stopped.

#### d3.timerFlush()

[Source](https://github.com/d3/d3-timer/blob/main/src/timer.js "Source")

Immediately invoke any eligible timer callbacks. Note that zero-delay timers are normally first executed after one frame (~17ms). This can cause a brief flicker because the browser renders the page twice: once at the end of the first event loop, then again immediately on the first timer callback. By flushing the timer queue at the end of the first event loop, you can run any zero-delay timers immediately and avoid the flicker.

#### d3.timeout(callback, delay, time)

[Source](https://github.com/d3/d3-timer/blob/main/src/timeout.js "Source")

Like [timer](#timer), except the timer automatically [stops](#timer_stop) on its first callback. A suitable replacement for [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout) that is guaranteed to not run in the background. The *callback* is passed the elapsed time.

#### d3.interval(callback, delay, time)

[Source](https://github.com/d3/d3-timer/blob/main/src/interval.js "Source")

Like [timer](#timer), except the *callback* is invoked only every *delay* milliseconds; if *delay* is not specified, this is equivalent to [timer](#timer). A suitable replacement for [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) that is guaranteed to not run in the background. The *callback* is passed the elapsed time.
