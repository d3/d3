# Blurring data

A [box blur](https://en.wikipedia.org/wiki/Box_blur) implementation for 1D, 2D, and RGBA images; supports fractional radius.

## blur(*data*, *radius*) {#blur}

```js
const numbers = d3.cumsum({length: 1000}, () => Math.random() - 0.5);
d3.blur(numbers, 5); // a smoothed random walk
```

[Examples](https://observablehq.com/@d3/d3-blur) · [Source](https://github.com/d3/d3-array/blob/main/src/blur.js) · Blurs an array of *data* in-place by applying three iterations of a moving average transform (box filter) for a fast approximation of a Gaussian kernel of the given *radius*, a non-negative number. Returns the given *data*.

## blur2({data, width, height}, *rx*, *ry*) {#blur2}

```js
const matrix = {
  width: 4,
  height: 3,
  data: [
    1, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 1
  ]
};

d3.blur2(matrix, 1);
```

[Examples](https://observablehq.com/@d3/d3-blur) · [Source](https://github.com/d3/d3-array/blob/main/src/blur.js) · Blurs a matrix of the given *width* and *height* in-place by applying a horizontal blur of radius *rx* and a vertical blur of radius *ry* (which defaults to *rx*). The matrix values *data* are stored in a flat (one-dimensional) array. If *height* is not specified, it is inferred from the given *width* and *data*.length. Returns the blurred matrix {data, width, height}.

## blurImage(*imageData*, *rx*, *ry*) {#blurImage}

```js
const imageData = context.getImageData(0, 0, width, height);
d3.blurImage(imageData, 5);
```

[Examples](https://observablehq.com/@d3/d3-blurimage) · [Source](https://github.com/d3/d3-array/blob/main/src/blur.js) · Blurs the given [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) in-place, blurring each of the RGBA layers independently by applying an horizontal blur of radius *rx* and a vertical blur of radius *ry* (which defaults to *rx*). Returns the blurred ImageData.
