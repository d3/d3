# d3-zoom

[Examples](https://observablehq.com/collection/@d3/d3-zoom) · [Panning and zooming](https://observablehq.com/@d3/zoomable-scatterplot) let the user focus on a region of interest by restricting the view. It uses direct manipulation: click-and-drag to pan (translate), spin the wheel to zoom (scale), or pinch with touch. Panning and zooming are widely used in web-based mapping, but can also be used in visualization such as dense time series and scatterplots.

The zoom behavior is a flexible abstraction, handling a surprising variety of input modalities and browser quirks. The zoom behavior is agnostic about the DOM, so you can use it with HTML, [SVG](https://observablehq.com/@d3/zoom), or [Canvas](https://observablehq.com/@d3/zoom-canvas). You can use d3-zoom with [d3-scale](./d3-scale.md) and [d3-axis](./d3-axis.md) to [zoom axes](https://observablehq.com/@d3/pan-zoom-axes). You can restrict zooming using [*zoom*.scaleExtent](./d3-zoom/zoom.md#zoom_scaleExtent) and panning using [*zoom*.translateExtent](./d3-zoom/zoom.md#zoom_translateExtent). You can combine d3-zoom with other behaviors such as [d3-drag](./d3-drag.md) for [dragging](https://observablehq.com/@d3/drag-zoom) and [d3-brush](./d3-brush.md) for [focus + context](https://observablehq.com/@d3/focus-context).

The zoom behavior can be controlled programmatically using [*zoom*.transform](./d3-zoom/zoom.md#zoom_transform), allowing you to implement user interface controls which drive the display or to stage [animated tours](https://observablehq.com/@d3/scatterplot-tour) through your data. [Smooth zoom transitions](https://observablehq.com/@d3/programmatic-zoom) are based on [“Smooth and efficient zooming and panning”](http://www.win.tue.nl/~vanwijk/zoompan.pdf) by Jarke J. van Wijk and Wim A.A. Nuij.

See one of:

- [Zoom behavior](./d3-zoom/zoom.md)
- [Zoom transforms](./d3-zoom/transform.md)

See also [d3-tile](https://github.com/d3/d3-tile) for examples panning and zooming maps.
