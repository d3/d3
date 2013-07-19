import "../color/rgb";
import "ordinal";
import "scale";

/*
 * This product includes color specifications and designs developed by Cynthia
 * Brewer (http://colorbrewer.org/). See lib/colorbrewer for more information.
 */

d3.scale.category10 = function() {
  return d3.scale.ordinal().range(d3_category10);
};

d3.scale.category20 = function() {
  return d3.scale.ordinal().range(d3_category20);
};

d3.scale.category20b = function() {
  return d3.scale.ordinal().range(d3_category20b);
};

d3.scale.category20c = function() {
  return d3.scale.ordinal().range(d3_category20c);
};

var d3_category10 = [
  0x1f77b4, 0xff7f0e, 0x2ca02c, 0xd62728, 0x9467bd,
  0x8c564b, 0xe377c2, 0x7f7f7f, 0xbcbd22, 0x17becf
].map(d3_rgbString);

var d3_category20 = [
  0x1f77b4, 0xaec7e8,
  0xff7f0e, 0xffbb78,
  0x2ca02c, 0x98df8a,
  0xd62728, 0xff9896,
  0x9467bd, 0xc5b0d5,
  0x8c564b, 0xc49c94,
  0xe377c2, 0xf7b6d2,
  0x7f7f7f, 0xc7c7c7,
  0xbcbd22, 0xdbdb8d,
  0x17becf, 0x9edae5
].map(d3_rgbString);

var d3_category20b = [
  0x393b79, 0x5254a3, 0x6b6ecf, 0x9c9ede,
  0x637939, 0x8ca252, 0xb5cf6b, 0xcedb9c,
  0x8c6d31, 0xbd9e39, 0xe7ba52, 0xe7cb94,
  0x843c39, 0xad494a, 0xd6616b, 0xe7969c,
  0x7b4173, 0xa55194, 0xce6dbd, 0xde9ed6
].map(d3_rgbString);

var d3_category20c = [
  0x3182bd, 0x6baed6, 0x9ecae1, 0xc6dbef,
  0xe6550d, 0xfd8d3c, 0xfdae6b, 0xfdd0a2,
  0x31a354, 0x74c476, 0xa1d99b, 0xc7e9c0,
  0x756bb1, 0x9e9ac8, 0xbcbddc, 0xdadaeb,
  0x636363, 0x969696, 0xbdbdbd, 0xd9d9d9
].map(d3_rgbString);
