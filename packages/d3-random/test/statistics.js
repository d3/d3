import {mean} from "d3-array";

export function kurtosis(numbers) {
  let m = mean(numbers),
      sum4 = 0,
      sum2 = 0,
      v,
      i = -1,
      n = numbers.length;

  while (++i < n) {
    v = numbers[i] - m;
    sum2 += v * v;
    sum4 += v * v * v * v;
  }

  return (1 / n) * sum4 / Math.pow((1 / n) * sum2, 2) - 3;
}

export function skewness(numbers) {
  let m = mean(numbers),
      sum3 = 0,
      sum2 = 0,
      v,
      i = -1,
      n = numbers.length;

  while (++i < n) {
    v = numbers[i] - m;
    sum2 += v * v;
    sum3 += v * v * v;
  }

  return (1 / n) * sum3 / Math.pow((1 / (n - 1)) * sum2, 3 / 2);
}
