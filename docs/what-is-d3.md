# What is D3?

**D3** (or **D3.js**) is an open-source JavaScript library for visualizing data.

:::tip
Unless you need D3’s low-level control, we recommend our high-level sister library: [Observable Plot](https://observablehq.com/plot). Plot’s concise API lets you focus more on analyzing and visualizing data instead of web development. You can even combine Plot and D3 for the best of both.
:::

## D3 is a low-level toolbox

D3 is not a charting library in the traditional sense. It has no concept of “charts”—or even “marks” (or “geoms”) from the grammar of graphics.

When you visualize data with D3, you compose a variety primitives. To make a [stacked area chart](https://observablehq.com/@d3/stacked-area-chart/2), you might use

- a [CSV parser](./d3-dsv.md) to load data,
- a [time scale](./d3-scale/time.md) for horizontal position (*x*),
- a [linear scale](./d3-scale/linear.md) for vertical position (*y*),
- an [ordinal scale](./d3-scale/ordinal.md) with a [categorical scheme](./d3-scale-chromatic/categorical.md) for color,
- a [stack layout](./d3-shape/stack.md) for arranging values,
- an [area shape](./d3-shape/area.md) with a [linear curve](./d3-shape/curve.md) for generating SVG path data,
- [axes](./d3-axis.md) for documenting the position encodings, and
- [selections](./d3-selection.md) for creating SVG elements.

That’s a lot to take in, right? But take a deep breath—you don’t have to learn everything at once. Each piece can be used independently, so you can learn them individually before you fit them together. D3 is not a single monolith but rather a suite of 30 discrete libraries (or “modules”). We bundle these modules together into “D3” for convenience rather than necessity, so your tools are within reach as you iterate on your design.

What all’s in the D3 toolbox? Take a gander at the side bar to your left. We recommend exploring the documentation and examples to get a sense of what’s relevant to you.

## D3 has extraordinary flexibility

Because D3 has no overarching “chart” abstraction, even a basic chart may require a few dozen lines of code. On the upside, all the pieces are laid out in front of you and you have complete control over what happens. You can tailor the visualization to achieve exactly what you want. D3 has no default presentation of your data—there’s just the code you write yourself. (Or copy from an example.)

Consider D3 an alternative to “doing everything yourself”, not an alternative to a high-level charting library. If you aren’t satisfied with other tools and you’re thinking of rolling your own charts using SVG or Canvas (or even WebGL), you might as well peruse D3’s toolbox! There’s almost certainly something here that will help you build the chart of your dreams without imposing on your creativity.

## D3 works with the web

D3 doesn’t introduce a new graphical representation; instead, you use D3 directly with web standards such as SVG and Canvas.

The name “D3” is short for *data-driven documents*, where *documents* refers to the [Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) standard that represents the contents of a webpage. While some of D3’s modules (such as [selections](./d3-selection.md) and [transitions](./d3-selection.md)) touch the DOM, others (including [scales](./d3-scale.md) and [shapes](./d3-shape.md)) only operate on data. D3 can also be paired with web frameworks such as React, Vue, and Svelte; see the [getting started guide](./getting-started.md) for recommendations.

D3’s embrace of web standards brings many benefits. For example, you can use external stylesheets to alter the appearance of charts (even in response to media queries, say for responsive charts or dark mode); you can use the debugger and element inspector to review what your code is doing; and D3’s synchronous, imperative evaluation model—calling [*selection*.attr](./d3-selection/modifying.md#selection_attr) immediately mutates the DOM—can make it easier to debug than frameworks with complex asynchronous runtimes.

## D3 is for bespoke visualization

D3 makes things possible, not necessarily easy; even simple things that should be easy are often not. To paraphrase Amanda Cox: “Use D3 if you think it’s perfectly normal to write a hundred lines of code for a bar chart.”

If you need maximal expressiveness for your bespoke visualization, you should consider D3. D3 makes sense for media organizations such as *The New York Times* or *The Pudding*, where a single graphic may be seen by a million readers, and where a team of editors can work together to advance the state of the art in visual communication.

On the other hand, D3 is overkill for throwing together a private dashboard or a one-off analysis. Don’t get seduced by whizbang examples: many of them took an immense effort to implement! If you’re constrained by time (and who isn’t?), you’d likely produce a better visualization or analysis with [Observable Plot](https://observablehq.com/plot).

## D3 is for dynamic visualization

D3’s most novel concept is its [data join](./d3-selection/joining.md): given a set of data and a set of DOM elements, the data join allows you to apply separate operations for *entering*, *updating*, and *exiting* elements. If you’re only creating static charts (charts that don’t animate or respond to user input), you may find this concept unintuitive or even bizarre because it’s not needed.

The data join exists so that you can control *exactly* what happens when your data changes and update the display in response. This direct control allows extremely performant updates—you only touch the elements and attributes that need changing, without diffing the DOM—and smooth animated transitions between states. D3 shines for dynamic, interactive visualizations. (Try option-clicking the state toggles in [“512 Paths to the White House”](https://archive.nytimes.com/www.nytimes.com/interactive/2012/11/02/us/politics/paths-to-the-white-house.html) from 2012. Really.)
