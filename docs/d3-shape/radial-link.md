# Radial links

A radial link generator is like the Cartesian [link generator](./link.md) except the [x](./link.md#link_x) and [y](./link.md#link_y) accessors are replaced with [angle](#linkRadial_angle) and [radius](#linkRadial_radius) accessors. Radial links are positioned relative to the origin; use a [transform](http://www.w3.org/TR/SVG/coords.html#TransformAttribute) to change the origin.

## linkRadial() {#linkRadial}

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js) · Returns a new [link generator](./link.md#_link) with radial tangents. For example, to visualize [links](../d3-hierarchy/hierarchy.md#node_links) in a [tree diagram](../d3-hierarchy/tree.md) rooted in the center of the display, you might say:

```js
const link = d3.linkRadial()
    .angle((d) => d.x)
    .radius((d) => d.y);
```

## *linkRadial*.angle(*angle*) {#linkRadial_angle}

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js) · Equivalent to [*link*.x](./link.md#link_x), except the accessor returns the angle in radians, with 0 at -*y* (12 o’clock).

## *linkRadial*.radius(*radius*) {#linkRadial_radius}

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js) · Equivalent to [*link*.y](./link.md#link_y), except the accessor returns the radius: the distance from the origin.
