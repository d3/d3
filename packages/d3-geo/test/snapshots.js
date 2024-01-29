import {Canvas} from "canvas";
import {feature, mesh} from "topojson-client";
import {
  geoAlbers,
  geoAlbersUsa,
  geoAzimuthalEqualArea,
  geoAzimuthalEquidistant,
  geoConicConformal,
  geoConicEqualArea,
  geoConicEquidistant,
  geoEqualEarth,
  geoEquirectangular,
  geoGnomonic,
  geoGraticule,
  geoMercator,
  geoNaturalEarth1,
  geoOrthographic,
  geoPath,
  geoStereographic,
  geoTransverseMercator
} from "../src/index.js";
import {readFile} from "fs/promises";

const width = 960;
const height = 500;

async function renderWorld(projection) {
  const world = JSON.parse(await readFile("./node_modules/world-atlas/world/50m.json"));
  const canvas = new Canvas(width, height);
  const graticule = geoGraticule();
  const sphere = {type: "Sphere"};
  const context = canvas.getContext("2d");
  const path = geoPath(projection, context);
  context.fillStyle = "#fff";
  context.fillRect(0, 0, width, height);
  context.save();
  context.beginPath();
  path(feature(world, world.objects.land));
  context.fillStyle = "#000";
  context.fill();
  context.beginPath();
  path(graticule());
  context.strokeStyle = "rgba(119,119,119,0.5)";
  context.stroke();
  context.restore();
  context.beginPath();
  path(sphere);
  context.strokeStyle = "#000";
  context.stroke();
  return canvas;
}

async function renderUs(projection) {
  const us = JSON.parse(await readFile("./test/data/us-10m.json"));
  const canvas = new Canvas(width, height);
  const context = canvas.getContext("2d");
  const path = geoPath(projection, context);
  context.fillStyle = "#fff";
  context.fillRect(0, 0, width, height);
  context.beginPath();
  path(feature(us, us.objects.land));
  context.fillStyle = "#000";
  context.fill();
  context.beginPath();
  path(mesh(us, us.objects.counties, (a, b) => a !== b && !(a.id / 1000 ^ b.id / 1000)));
  context.lineWidth = 0.5;
  context.strokeStyle = "#fff";
  context.stroke();
  context.beginPath();
  path(mesh(us, us.objects.states, (a, b) => a !== b));
  context.lineWidth = 1;
  context.strokeStyle = "#fff";
  context.stroke();
  return canvas;
}

export async function azimuthalEqualArea() {
  return renderWorld(geoAzimuthalEqualArea().precision(0.1));
}

export async function azimuthalEquidistant() {
  return renderWorld(geoAzimuthalEquidistant().precision(0.1));
}

export async function conicConformal() {
  return renderWorld(geoConicConformal().precision(0.1));
}

export async function conicEqualArea() {
  return renderWorld(geoConicEqualArea().precision(0.1));
}

export async function conicEquidistant() {
  return renderWorld(geoConicEquidistant().precision(0.1));
}

export async function equalEarth() {
  return renderWorld(geoEqualEarth().precision(0.1));
}

export async function equirectangular() {
  return renderWorld(geoEquirectangular().precision(0.1));
}

export async function gnomonic() {
  return renderWorld(geoGnomonic().precision(0.1));
}

export async function mercator() {
  return renderWorld(geoMercator().precision(0.1));
}

export async function naturalEarth1() {
  return renderWorld(geoNaturalEarth1().precision(0.1));
}

export async function angleorient30() {
  return renderWorld(geoEquirectangular().clipAngle(90).angle(-30).precision(0.1).fitExtent([[0, 0], [width, height]], {type: "Sphere"}));
}

export async function orthographic() {
  return renderWorld(geoOrthographic().precision(0.1));
}

export async function stereographic() {
  return renderWorld(geoStereographic().precision(0.1));
}

export async function transverseMercator() {
  return renderWorld(geoTransverseMercator().precision(0.1));
}

export async function albers() {
  return renderUs(geoAlbers().precision(0.1));
}

export async function albersUsa() {
  return renderUs(geoAlbersUsa().precision(0.1));
}
