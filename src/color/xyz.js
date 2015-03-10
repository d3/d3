function d3_xyz_lab(x) {
  return x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787037 * x + 4 / 29;
}

function d3_xyz_rgb(r) {
  return Math.round(255 * (r <= 0.00304 ? 12.92 * r : 1.055 * Math.pow(r, 1 / 2.4) - 0.055));
}
