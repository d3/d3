<script>

import * as d3 from "d3";

function render(el, {padAngle, padRadius, cornerRadius}) {
  const width = 400;
  const height = 400;
  const outerRadius = height / 2 - 10;
  const innerRadius = outerRadius / 3;
  const data = [1, 1, 2, 3, 5, 8, 13, 21];
  const pie = d3.pie().padAngle(padAngle);
  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius).padRadius(padRadius);

  const svg = d3.select(el)
    .selectAll("svg")
    .data([null])
    .join("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto;");

  svg.selectChildren("[fill='none']")
    .data(cornerRadius ? [null] : [])
    .join("g")
      .attr("fill", "none")
      .attr("stroke", "currentColor")
    .selectAll("path")
    .data(pie(data))
    .join("path")
      .attr("d", arc.cornerRadius(0));

  svg.selectChildren("[fill='currentColor']")
    .data([null])
    .join("g")
      .attr("fill", "currentColor")
      .attr("fill-opacity", 0.2)
      .attr("stroke", "currentColor")
      .attr("stroke-width", "1.5px")
      .attr("stroke-linejoin", "round")
    .selectAll("path")
    .data(pie(data))
    .join("path")
      .attr("d", arc.cornerRadius(cornerRadius));

  return svg.node();
}

export default {
  props: {
    cornerRadius: {
      type: Number,
      default: 0
    },
    padAngle: {
      type: Number,
      default: 0.03
    },
    padRadius: {
      type: Number,
      optional: true
    }
  },
  mounted() {
    render(this.$el, this);
  },
  updated() {
    render(this.$el, this);
  }
}

</script>

<template>
  <div></div>
</template>
