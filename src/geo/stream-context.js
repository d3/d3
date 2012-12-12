function d3_geo_streamContext() {
  this._pointRadius = 4.5;
}

d3_geo_streamContext.prototype = {
  point: d3_geo_streamContextPoint,

  // While inside a line, override point to moveTo then lineTo.
  lineStart: function() { this.point = d3_geo_streamContextPointLineStart; },
  lineEnd: d3_geo_streamContextLineEnd,

  // While inside a polygon, override lineEnd to closePath.
  polygonStart: function() { this.lineEnd = d3_geo_streamContextLineEndPolygon; },
  polygonEnd: function() { this.lineEnd = d3_geo_streamContextLineEnd; }
};

function d3_geo_streamContextPoint(x, y) {
  this._context.moveTo(x, y);
  this._context.arc(x, y, this._pointRadius, 0, 2 * π);
}

function d3_geo_streamContextPointLineStart(x, y) {
  this._context.moveTo(x, y);
  this.point = d3_geo_streamContextPointLine;
}

function d3_geo_streamContextPointLine(x, y) {
  this._context.lineTo(x, y);
}

function d3_geo_streamContextLineEnd() {
  this.point = d3_geo_streamContextPoint;
}

function d3_geo_streamContextLineEndPolygon() {
  this._context.closePath();
}
