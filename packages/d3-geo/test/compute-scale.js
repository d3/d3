#!/usr/bin/env node

import {format} from "d3-format";
import * as d3 from "../src/index.js";

const width = 960 - 1;
const height = 500 - 1;
const projectionName = process.argv[2];
const projectionSymbol = "geo" + projectionName[0].toUpperCase() + projectionName.slice(1);

if (!/^[a-z0-9]+$/i.test(projectionName)) throw new Error;

const formatNumber = format(".6");

const projection = d3[projectionSymbol]()
    .precision(0.01)
    .scale(1)
    .translate([0, 0])
    .center([0, 0]);

if (projection.rotate) projection.rotate([0, 0]);

const land = {type: "Sphere"};

switch (projectionName) {
  case "conicConformal":
  case "stereographic": {
    projection.clipAngle(90);
    break;
  }
}

const path = d3.geoPath()
    .projection(projection);

const bounds = path.bounds(land),
    dx = bounds[1][0] - bounds[0][0],
    dy = bounds[1][1] - bounds[0][1],
    cx = (bounds[1][0] + bounds[0][0]) / 2,
    cy = (bounds[1][1] + bounds[0][1]) / 2,
    scale = Math.min(width / dx, height / dy);

console.log(`d3.${projectionSymbol}()
    .scale(${formatNumber(scale)})
    .center([${(projection.invert ? projection.angle(0).invert([cx, cy]) : [0, 0]).map(formatNumber).join(", ")}]);
`);
