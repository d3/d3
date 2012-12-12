function d3_geo_streamBuffer() {
  this._buffer = [];
  this._point = d3_geo_pathCircle(4.5);
}

var d3_geo_streamBufferPrototype = {
  point: d3_geo_streamBufferPoint,

  // While inside a line, override point to moveTo then lineTo.
  lineStart: function() { this.point = d3_geo_streamBufferPointLineStart; },
  lineEnd: d3_geo_streamBufferLineEnd,

  // While inside a polygon, override lineEnd to closePath.
  polygonStart: function() { this.lineEnd = d3_geo_streamBufferLineEndPolygon; },
  polygonEnd: function() { this.lineEnd = d3_geo_streamBufferLineEnd; },

  toString: function() {
    var s = this._buffer.join("");
    this._buffer = [];
    return s;
  }
}

function d3_geo_streamBufferPoint(x, y) {
  this._buffer.push("M", x, ",", y, this._point);
}

function d3_geo_streamBufferPointLineStart(x, y) {
  this._buffer.push("M", x, ",", y);
  this.point = d3_geo_streamBufferPointLine;
}

function d3_geo_streamBufferPointLine(x, y) {
  this._buffer.push("L", x, ",", y);
}

function d3_geo_streamBufferLineEnd() {
  this.point = d3_geo_streamBufferPoint;
}

function d3_geo_streamBufferLineEndPolygon() {
  this._buffer.push("Z");
}
