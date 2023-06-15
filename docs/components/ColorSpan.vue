<script setup>

import * as d3 from "d3";

</script>
<script>

export default {
  props: {
    color: {type: String},
    text: {type: String},
    format: {type: String, optional: true}
  }
};

function format(color, formatType) {
  switch (formatType) {
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
  <em :style="{borderBottom: `solid 2px ${String(this.color)}`}">{{this.text === undefined ? format(this.color, this.format) : this.text}}</em>
</template>
