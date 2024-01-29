import {quadtree} from "../src/index.js";

const n = 1000000;
const points1 = new Array(n);
const points2 = new Array(n);

for (let j = 0; j < n; ++j) {
  points1[j] = [Math.random() * 99, Math.random() * 99];
}

for (let j = 0; j < n; ++j) {
  points2[j] = [points1[j][0] + Math.random(), points1[j][1] + Math.random()];
}

function time(message, run) {
  const [starts, startns] = process.hrtime();
  run();
  const [ends, endns] = process.hrtime();
  console.log(message, Math.round((ends - starts) * 1e3 + (endns - startns) / 1e6));
}

let root;

time("create", () => {
  root = quadtree().extent([[0, 0], [100, 100]]).addAll(points1);
});

time("iterate", () => {
  root.visit(() => {});
});

time("update", () => {
  for (let j = 0; j < n; ++j) {
    root.remove(points1[j]);
    root.add(points2[j]);
  }
});
