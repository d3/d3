<script setup>

import * as d3 from "d3";

</script>
<script>

export default {
  props: {
    color: true,
    text: {type: String},
    format: {type: String, optional: true}
  }
};

function formatColor(color, format) {
  switch (format) {
    case "rgb": color = d3.rgb(color).formatRgb(); break;
    case "hex": color = d3.rgb(color).formatHex(); break;
    case "hex8": color = d3.rgb(color).formatHex8(); break;
    case "hsl": color = d3.hsl(color).formatHsl(); break;
    default: color = String(color); break;
  }
  return color.replace(/(\d+\.\d+)/g, (d) => +(+d).toFixed(1));
}

</script>
<template>
  <em :style="{borderBottom: `solid 2px ${String(color)}`}">{{text === undefined ? formatColor(color, format) : text}}</em>
</template>
