require("../env");
require("../../d3");
require("../../d3.geo");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.geo.bonne");

suite.addBatch({
  "default instance": {
    topic: function() {
      return d3.geo.bonne();
    },
    "scale defaults to 200": function(bonne) {
      assert.equal(bonne.scale(), 200);
    },
    "parallel defaults to 45°": function(bonne) {
      assert.equal(bonne.parallel(), 45);
    },
    "origin defaults to [0,0]": function(bonne) {
      assert.deepEqual(bonne.origin(), [0, 0]);
    },
    "translate defaults to [480, 250]": function(bonne) {
      assert.deepEqual(bonne.translate(), [480, 250]);
    }
  },

  "Bonne at 40° parallel": {
    topic: function() {
      return d3.geo.bonne().parallel(40);
    },
    "Arctic": function(bonne) {
      var lonlat = [0, 85],
          coords = bonne(lonlat);
      assert.inDelta(coords, [480, 92.920367], 1e-6);
      assert.inDelta(bonne.invert(coords), lonlat, 1e-6);
    },
    "Antarctic": function(bonne) {
      var lonlat = [0, -85],
          coords = bonne(lonlat);
      assert.inDelta(coords, [480, 686.332312], 1e-6);
      assert.inDelta(bonne.invert(coords), lonlat, 1e-6);
    },
    "Hawaii": function(bonne) {
      var lonlat = [-180, 0],
          coords = bonne(lonlat);
      assert.inDelta(coords, [103.604887, -22.895998], 1e-6);
      assert.inDelta(bonne.invert(coords), lonlat, 1e-6);
    },
    "Phillipines": function(bonne) {
      var lonlat = [180, 0],
          coords = bonne(lonlat);
      assert.inDelta(coords, [856.395112, -22.895998], 1e-6);
      assert.inDelta(bonne.invert(coords), lonlat, 1e-6);
    },
    "invert observes translation": function() {
      var bonne = d3.geo.bonne().translate([123, 99]).scale(100),
          coords = bonne([0, 85]),
          lonlat = bonne.invert(coords);
      assert.inDelta(lonlat[0], 0, 1e-6);
      assert.inDelta(lonlat[1], 85, 1e-6);
    },
    "invert(project(location)) equals location": function(bonne) {
      for (var i = -1; i < 20; ++i) {
        var location = [Math.random() * 360 - 180, Math.random() * 180 - 90];
        assert.inDelta(location, bonne.invert(bonne(location)), .5);
      }
    },
    "project(invert(point)) equals point": function(bonne) {
      for (var i = -1; i < 20; ++i) {
        var point = [Math.random() * 700 + 100, Math.random() * 400 + 50];
        assert.inDelta(point, bonne(bonne.invert(point)), .5);
      }
    }
  },

  "Werner": {
    topic: function() {
      return d3.geo.bonne().parallel(90);
    },
    "invert(project(location)) equals location": function(bonne) {
      for (var i = -1; i < 20; ++i) {
        var location = [Math.random() * 360 - 180, Math.random() * 180 - 90];
        assert.inDelta(location, bonne.invert(bonne(location)), .5);
      }
    },
    "project(invert(point)) equals point": function(bonne) {
      for (var i = -1; i < 20; ++i) {
        var point = [Math.random() * 700 + 100, Math.random() * 400 + 50];
        assert.inDelta(point, bonne(bonne.invert(point)), .5);
      }
    }
  },

  "Sinsuoidal": {
    topic: function() {
      return d3.geo.bonne().parallel(0);
    },
    "invert(project(location)) equals location": function(bonne) {
      for (var i = -1; i < 20; ++i) {
        var location = [Math.random() * 360 - 180, Math.random() * 180 - 90];
        assert.inDelta(location, bonne.invert(bonne(location)), .5);
      }
    },
    "project(invert(point)) equals point": function(bonne) {
      for (var i = -1; i < 20; ++i) {
        var point = [Math.random() * 700 + 100, Math.random() * 400 + 50];
        assert.inDelta(point, bonne(bonne.invert(point)), .5);
      }
    }
  }

});

suite.export(module);
