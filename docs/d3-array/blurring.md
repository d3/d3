# d3-array: Blurring {#top}

## blur(data, radius) {#blur}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/blur.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-blur) -->

Blurs an array of *data* in-place by applying three iterations of a moving average transform, for a fast approximation of a gaussian kernel of the given *radius*, a non-negative number, and returns the array.

```js
const randomWalk = d3.cumsum({length: 1000}, () => Math.random() - 0.5);
blur(randomWalk, 5);
```

Copy the data if you don’t want to smooth it in-place:
```js
const smoothed = blur(randomWalk.slice(), 5);
```

## blur2({data, width, height}, rx, ry) {#blur2}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/blur.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-blur) -->

Blurs a matrix of the given *width* and *height* in-place, by applying an horizontal blur of radius *rx* and a vertical blur or radius *ry* (which defaults to *rx*). The matrix *data* is stored in a flat array, used to determine the *height* if it is not specified. Returns the blurred {data, width, height}.

```js
data = [
  1, 0, 0,
  0, 0, 0,
  0, 0, 1
];
blur2({data, width: 3}, 1);
```

## blurImage(imageData, rx, ry) {#blurImage}

<!-- [Source](https://github.com/d3/d3-array/blob/main/src/blur.js) -->
<!-- [Examples](https://observablehq.com/@d3/d3-blurimage) -->

Blurs an [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) structure in-place, blurring each of the RGBA layers independently by applying an horizontal blur of radius *rx* and a vertical blur or radius *ry* (which defaults to *rx*). Returns the blurred ImageData.

```js
const imData = context.getImageData(0, 0, width, height);
blurImage(imData, 5);
```
