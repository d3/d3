<script setup>

import * as d3 from "d3";
import {ref, onMounted} from "vue";

const container = ref();
const width = 688;
const height = 540;
const k = width / 200;
const r = d3.randomUniform(k, k * 4);
const nodes = Array.from({length: 200}, () => ({r: r()}));

const matrix = [
  // to black, blond, brown, red
  [11975,  5871, 8916, 2868], // from black
  [ 1951, 10048, 2060, 6171], // from blond
  [ 8010, 16145, 8090, 8045], // from brown
  [ 1013,   990,  940, 6907]  // from red
];

function groupTicks(d, step) {
  const k = (d.endAngle - d.startAngle) / d.value;
  return d3.range(0, d.value, step).map(value => {
    return {value: value, angle: value * k + d.startAngle};
  });
}

const formatValue = d3.formatPrefix(",.0", 1e3);
const outerRadius = Math.min(width, height) * 0.5 - 30;
const innerRadius = outerRadius - 20;
const arc = d3.arc()
  .innerRadius(innerRadius)
  .outerRadius(outerRadius);
const ribbon = d3.ribbon()
  .radius(innerRadius);
const color = d3.scaleOrdinal()
  .domain(d3.range(4))
  .range(["#000000", "#FFDD89", "#957244", "#F26223"]);
  

onMounted(() => {
  const svg = d3.select(container.value)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("font-size", 10)
      .attr("font-family", "sans-serif");

  const chords = d3.chord()
      .padAngle(0.05)
      .sortSubgroups(d3.descending)
    (matrix);

  const group = svg.append("g")
    .selectAll("g")
    .data(chords.groups)
    .enter().append("g");

  group.append("path")
      .attr("fill", d => color(d.index))
      .attr("stroke", d => d3.rgb(color(d.index)).brighter())
      .attr("d", arc);

  const groupTick = group.append("g")
    .selectAll("g")
    .data(d => groupTicks(d, 1e3))
    .enter().append("g")
      .attr("transform", d => `rotate(${d.angle * 180 / Math.PI - 90}) translate(${outerRadius},0)`);

  groupTick.append("line")
      .attr("stroke", "currentColor")
      .attr("x2", 6);

  groupTick
    .filter(d => d.value % 5e3 === 0)
    .append("text")
      .attr("x", 8)
      .attr("dy", ".35em")
      .attr("transform", d => d.angle > Math.PI ? "rotate(180) translate(-16)" : null)
      .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
      .text(d => formatValue(d.value));

  svg.append("g")
      .attr("fill-opacity", 0.67)
    .selectAll("path")
    .data(chords)
    .enter().append("path")
      .attr("d", ribbon)
      .attr("fill", d => color(d.target.index))
      .attr("stroke", d => d3.rgb(color(d.target.index)).darker());
});

</script>
<template>
  <div style="margin: 1em 0;">
    <svg :width="width" :height="height" :viewBox="[-width / 2, -height / 2, width, height].join(' ')" fill="currentColor" style="overflow: visible; position: relative; z-index: 2; max-width: 100%; height: auto;" ref="container"></svg>
    <a href="https://observablehq.com/@d3/chord-diagram?intent=fork" style="font-size: smaller;" target="_blank">Fork ↗︎</a>
  </div>
</template>
