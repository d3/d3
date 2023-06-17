# D3: Data-Driven Documents

<a href="https://d3js.org"><img src="./docs/public/logo.svg" width="256" height="256"></a>

**D3** (or **D3.js**) is a free, open-source JavaScript library for visualizing data. Its low-level approach built on web standards offers unparalleled flexibility in authoring dynamic, data-driven graphics. For more than a decade D3 has powered groundbreaking and award-winning visualizations, become a foundational building block of higher-level chart libraries, and fostered a vibrant community of data practitioners around the world.

## Resources

* [Documentation](https://d3js.org)
* [Examples](https://observablehq.com/@d3/gallery)
* [Releases](https://github.com/d3/d3/releases)

## Installing

If you use npm, `npm install d3`. You can also download the [latest release on GitHub](https://github.com/d3/d3/releases/latest). For vanilla HTML in modern browsers, import D3 from jsDelivr:

```html
<script type="module">

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const div = d3.selectAll("div");

</script>
```

For legacy environments, you can load D3’s UMD bundle from an npm-based CDN such as jsDelivr; a `d3` global is exported:

```html
<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
<script>

const div = d3.selectAll("div");

</script>
```

You can also use D3 modules individually. For example, [d3-selection](https://github.com/d3/d3-selection):

```html
<script type="module">

import {selectAll} from "https://cdn.jsdelivr.net/npm/d3-selection@3/+esm";

const div = selectAll("div");

</script>
```

D3 is written using ES modules. Create a custom bundle using Rollup, Webpack, or your preferred bundler. To import D3 into an ES2015 application, either import specific symbols from specific D3 modules:

```js
import {scaleLinear} from "d3-scale";
```

Or import everything into a namespace (here, `d3`):

```js
import * as d3 from "d3";
```

Or using dynamic import:

```js
const d3 = await import("d3");
```

You can also import individual modules and combine them into a `d3` object using [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign):

```js
const d3 = await Promise.all([
  import("d3-format"),
  import("d3-geo"),
  import("d3-geo-projection")
]).then((d3) => Object.assign({}, ...d3));
```
