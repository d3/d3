<script setup>

import * as d3 from "d3";

const width = 688;
const height = 688;
const outerRadius = Math.min(width, height) * 0.5 - 30;
const innerRadius = outerRadius - 20;

const matrix = [
  // to black, blond, brown, red
  [11975,  5871, 8916, 2868], // from black
  [ 1951, 10048, 2060, 6171], // from blond
  [ 8010, 16145, 8090, 8045], // from brown
  [ 1013,   990,  940, 6907]  // from red
];

const sum = d3.sum(matrix.flat());
const tickStepMinor = d3.tickStep(0, sum, 100);
const tickStepMajor = d3.tickStep(0, sum, 20);

function groupTicks(d, step) {
  const k = (d.endAngle - d.startAngle) / d.value;
  return d3.range(0, d.value, step).map(value => {
    return {value: value, angle: value * k + d.startAngle};
  });
}

const formatValue = d3.formatPrefix(",.0", tickStepMinor);

const arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

const ribbon = d3.ribbon()
    .radius(innerRadius);

const color = d3.scaleOrdinal()
    .domain(d3.range(matrix.length))
    .range(["#000000", "#ffdd89", "#957244", "#f26223"]);

const name = d3.scaleOrdinal()
    .domain(d3.range(matrix.length))
    .range(["black", "blond", "brown", "red"]);

const chords = d3.chord()
    .padAngle(0.05)
    .sortSubgroups(d3.descending)
  (matrix);

</script>
<template>
  <div style="margin: 1em 0;">
    <svg :width="width" :height="height" :viewBox="[-width / 2, -height / 2, width, height].join(' ')" fill="currentColor" style="font: 10px sans-serif; max-width: 100%; height: auto;">
      <g v-for="d in chords.groups">
        <path :d="arc(d)" :fill="color(d.index)" :stroke="color(d.index)">
          <title>
            {{ `${name(d.index)}\n${d.value.toLocaleString("en-US")}` }}
          </title>
        </path>
        <g v-for="d in groupTicks(d, tickStepMinor)" :transform="`rotate(${d.angle * 180 / Math.PI - 90}) translate(${outerRadius},0)`">
          <line stroke="currentColor" x2="6" />
          <text v-if="d.value % tickStepMajor === 0" x="8" dy="0.35em" :transform="d.angle > Math.PI ? 'rotate(180) translate(-16)' : null" :text-anchor="d.angle > Math.PI ? 'end' : null">{{ formatValue(d.value) }}</text>
        </g>
      </g>
      <g fill-opacity="0.67" stroke="var(--vp-c-bg)">
        <path v-for="d in chords" :d="ribbon(d)" :fill="color(d.target.index)">
          <title>
            {{ `${name(d.source.index)} → ${name(d.target.index)}: ${d.source.value.toLocaleString("en-US")}${d.source.index !== d.target.index ? `\n${name(d.target.index)} → ${name(d.source.index)}: ${d.target.value.toLocaleString("en-US")}` : ``}` }}
          </title>
        </path>
      </g>
    </svg>
    <a href="https://observablehq.com/@d3/chord-diagram?intent=fork" style="font-size: smaller;" target="_blank">Fork ↗︎</a>
  </div>
</template>
