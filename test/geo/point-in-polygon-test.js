var vows = require("vows"),
    _ = require("../../"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.geo.pointInPolygon");

suite.addBatch({
  "d3.geo.pointInPolygon": {
    topic: load("../test/geo/point-in-polygon-mock").expression("d3.geo.pointInPolygon"),
    "empty": function(pointInPolygon) {
      assert.ok(!pointInPolygon([])([0, 0]));
    },
    "simple": {
      topic: function(pointInPolygon) {
        return pointInPolygon([[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]]);
      },
      "outside": function(pointInPolygon) {
        assert.ok(!pointInPolygon([0.1, 2]));
      },
      "inside": function(pointInPolygon) {
        assert.ok(pointInPolygon([0.1, 0.1]));
      }
    },
    "small circle": {
      topic: function(pointInPolygon) {
        return pointInPolygon(_.geo.circle().angle(60)().coordinates);
      },
      "outside": function(pointInPolygon) {
        assert.ok(!pointInPolygon([-180, 0]));
      },
      "inside": function(pointInPolygon) {
        assert.ok(pointInPolygon([1, 1]));
      }
    },
    "South pole": {
      topic: function(pointInPolygon) {
        return pointInPolygon([
          [[-60, -80], [60, -80], [180, -80], [-60, -80]]
        ]);
      },
      "outside": function(pointInPolygon) {
        assert.ok(!pointInPolygon([0, 0]));
      },
      "inside": function(pointInPolygon) {
        assert.ok(pointInPolygon([0, -85]));
      }
    },
    "North pole": {
      topic: function(pointInPolygon) {
        return pointInPolygon([
          [[60, 80], [-60, 80], [-180, 80], [60, 80]]
        ]);
      },
      "outside": function(pointInPolygon) {
        assert.ok(!pointInPolygon([0, 0]));
      },
      "inside": function(pointInPolygon) {
        assert.ok(pointInPolygon([0, 85]));
      }
    },
    "larger than hemisphere": {
      "near [0°, 0°]": {
        topic: function(pointInPolygon) {
          return pointInPolygon([
            [[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]
          ]);
        },
        "outside": function(pointInPolygon) {
          assert.ok(!pointInPolygon([0.1, 0.1]));
        },
        "inside": function(pointInPolygon) {
          assert.ok(pointInPolygon([2, 0.1]));
        }
      },
      "South pole": {
        topic: function(pointInPolygon) {
          return pointInPolygon([
            [[-60, 80], [60, 80], [180, 80], [-60, 80]]
          ]);
        },
        "outside": function(pointInPolygon) {
          assert.ok(!pointInPolygon([0, 85]));
        },
        "inside": function(pointInPolygon) {
          assert.ok(pointInPolygon([0, 0]));
        }
      },
      "North pole": {
        topic: function(pointInPolygon) {
          return pointInPolygon([
            [[60, -80], [-60, -80], [-180, -80], [60, -80]]
          ]);
        },
        "outside": function(pointInPolygon) {
          assert.ok(!pointInPolygon([0, -85]));
        },
        "inside": function(pointInPolygon) {
          assert.ok(pointInPolygon([0, 0]));
        }
      },
      "circle with radius 120°": {
        topic: function(pointInPolygon) {
          return pointInPolygon(_.geo.circle().angle(120)().coordinates);
        },
        "outside": function(pointInPolygon) {
          assert.ok(!pointInPolygon([-180, 0]));
        },
        "inside": function(pointInPolygon) {
          assert.ok(pointInPolygon([-90, 0]));
        }
      },
      "narrow strip hole, length 340°": {
        topic: function(pointInPolygon) {
          return pointInPolygon([
            [[-170, -1], [0, -1], [170, -1], [170, 1], [0, 1], [-170, 1], [-170, -1]]
          ]);
        },
        "outside": function(pointInPolygon) {
          assert.ok(!pointInPolygon([0, 0]));
        },
        "inside": function(pointInPolygon) {
          assert.ok(pointInPolygon([0, 20]));
        }
      },
      "narrow equatorial hole": {
        topic: function(pointInPolygon) {
          var circle = _.geo.circle().origin([0, -90]);
          return pointInPolygon([
            circle.angle(90 - 0.01)().coordinates[0],
            circle.angle(90 + 0.01)().coordinates[0].reverse()
          ]);
        },
        "outside": function(pointInPolygon) {
          assert.ok(!pointInPolygon([0, 0]));
        },
        "inside": function(pointInPolygon) {
          assert.ok(pointInPolygon([0, -90]));
        }
      },
      "narrow equatorial strip": {
        topic: function(pointInPolygon) {
          var circle = _.geo.circle().origin([0, -90]);
          return pointInPolygon([
            circle.angle(90 + 0.01)().coordinates[0],
            circle.angle(90 - 0.01)().coordinates[0].reverse()
          ]);
        },
        "outside": function(pointInPolygon) {
          assert.ok(!pointInPolygon([0, -90]));
        },
        "inside": function(pointInPolygon) {
          assert.ok(pointInPolygon([0, 0]));
        }
      }
    },
    "ring": {
      "near [0°, 0°]": {
        topic: function(pointInPolygon) {
          return pointInPolygon([
            [[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]],
            [[0.4, 0.4], [0.6, 0.4], [0.6, 0.6], [0.4, 0.6], [0.4, 0.4]]
          ]);
        },
        "outside": function(pointInPolygon) {
          assert.ok(!pointInPolygon([0.5, 0.5]));
        },
        "inside": function(pointInPolygon) {
          assert.ok(pointInPolygon([0.1, 0.5]));
        }
      },
      "equatorial": {
        topic: function(pointInPolygon) {
          return pointInPolygon([
            [[0, -10], [-120, -10], [120, -10], [0, -10]],
            [[0, 10], [120, 10], [-120, 10], [0, 10]]
          ]);
        },
        "outside": function(pointInPolygon) {
          assert.ok(!pointInPolygon([0, 20]));
        },
        "inside": function(pointInPolygon) {
          assert.ok(pointInPolygon([0, 0]));
        }
      },
      "excluding both poles": {
        topic: function(pointInPolygon) {
          return pointInPolygon([
            [[10, 10], [-10, 10], [-10, -10], [10, -10], [10, 10]].reverse(),
            [[170, 10], [170, -10], [-170, -10], [-170, 10], [170, 10]].reverse()
          ]);
        },
        "outside": function(pointInPolygon) {
          assert.ok(!pointInPolygon([0, 90]));
        },
        "inside": function(pointInPolygon) {
          assert.ok(pointInPolygon([0, 0]));
        }
      },
      "containing both poles": {
        topic: function(pointInPolygon) {
          return pointInPolygon([
            [[10, 10], [-10, 10], [-10, -10], [10, -10], [10, 10]],
            [[170, 10], [170, -10], [-170, -10], [-170, 10], [170, 10]]
          ]);
        },
        "outside": function(pointInPolygon) {
          assert.ok(!pointInPolygon([0, 0]));
        },
        "inside": function(pointInPolygon) {
          assert.ok(pointInPolygon([0, 20]));
        }
      },
      "containing the South pole": {
        topic: function(pointInPolygon) {
          return pointInPolygon([
            [[10, 10], [-10, 10], [-10, -10], [10, -10], [10, 10]],
            [[0, 80], [120, 80], [-120, 80], [0, 80]]
          ]);
        },
        "outside": function(pointInPolygon) {
          assert.ok(!pointInPolygon([0, 90]));
        },
        "inside": function(pointInPolygon) {
          assert.ok(pointInPolygon([0, -90]));
        }
      },
      "containing the North pole": {
        topic: function(pointInPolygon) {
          return pointInPolygon([
            [[10, 10], [-10, 10], [-10, -10], [10, -10], [10, 10]].reverse(),
            [[0, 80], [120, 80], [-120, 80], [0, 80]].reverse()
          ]);
        },
        "inside": function(pointInPolygon) {
          assert.ok(pointInPolygon([0, 90]));
        },
        "outside": function(pointInPolygon) {
          assert.ok(!pointInPolygon([0, -90]));
        }
      }
    },
    "self-intersecting": {
      "near [0°, 0°]": {
        topic: function(pointInPolygon) {
          return pointInPolygon([
            [[0, 0], [1, 0], [1, 3], [3, 3], [3, 1], [0, 1], [0, 0]]
          ]);
        },
        "inside": {
          "counter-clockwise region": function(pointInPolygon) {
            assert.ok(pointInPolygon([0.5, 0.5]));
          },
          "clockwise region": function(pointInPolygon) {
            assert.ok(pointInPolygon([2, 2]));
          }
        },
        "outside": {
          "counter-clockwise region": function(pointInPolygon) {
            assert.ok(!pointInPolygon([15, 0.5]));
          },
          "clockwise region": function(pointInPolygon) {
            assert.ok(!pointInPolygon([12, 2]));
          }
        }
      },
      "near the South pole": {
        topic: function(pointInPolygon) {
          return pointInPolygon([
            [[-10, -80], [120, -80], [-120, -80], [10, -85], [10, -75], [-10, -75], [-10, -80]]
          ]);
        },
        "inside": {
          "counter-clockwise region": function(pointInPolygon) {
            assert.ok(pointInPolygon([0, -76]));
          },
          "clockwise region": function(pointInPolygon) {
            assert.ok(pointInPolygon([0, -89]));
          }
        },
        "outside": function(pointInPolygon) {
          assert.ok(!pointInPolygon([0, 0]));
        }
      },
      "near the North pole": {
        topic: function(pointInPolygon) {
          return pointInPolygon([
            [[-10, 80], [-10, 75], [10, 75], [10, 85], [-120, 80], [120, 80], [-10, 80]]
          ]);
        },
        "inside": {
          "clockwise region": function(pointInPolygon) {
            assert.ok(pointInPolygon([0, 76]));
          },
          "counter-clockwise region": function(pointInPolygon) {
            assert.ok(pointInPolygon([0, 89]));
          }
        },
        "outside": function(pointInPolygon) {
          assert.ok(!pointInPolygon([0, 0]));
        }
      }
    },
    "touching a pole": {
      "hemisphere touching the South pole": {
        topic: function(pointInPolygon) {
          return pointInPolygon(_.geo.circle().angle(90)().coordinates);
        },
        "origin is inside": function(pointInPolygon) {
          assert.ok(pointInPolygon([0, 0]));
        }
      },
      "triangle touching the South pole": {
        topic: function(pointInPolygon) {
          return pointInPolygon([[[180, -90], [-45, 0], [45, 0], [180, -90]]]);
        },
        "inside": function(pointInPolygon) {
          assert.ok(pointInPolygon([-44, 0]));
          assert.ok(pointInPolygon([0, 0]));
          assert.ok(pointInPolygon([0, -30]));
          assert.ok(pointInPolygon([30, -80]));
        },
        "outside": function(pointInPolygon) {
          assert.ok(!pointInPolygon([-46, 0]));
          assert.ok(!pointInPolygon([0, 1]));
          assert.ok(!pointInPolygon([-90, -80]));
        }
      },
      "triangle touching the South pole (2)": {
        topic: function(pointInPolygon) {
          return pointInPolygon([[[-45, 0], [45, 0], [180, -90], [-45, 0]]]);
        },
        "inside": function(pointInPolygon) {
          assert.ok(pointInPolygon([-44, 0]));
          assert.ok(pointInPolygon([0, 0]));
          assert.ok(pointInPolygon([0, -30]));
          assert.ok(pointInPolygon([30, -80]));
        },
        "outside": function(pointInPolygon) {
          assert.ok(!pointInPolygon([-46, 0]));
          assert.ok(!pointInPolygon([0, 1]));
          assert.ok(!pointInPolygon([-90, -80]));
        }
      },
      "triangle touching the South pole (3)": {
        topic: function(pointInPolygon) {
          return pointInPolygon([[[180, -90], [-135, 0], [135, 0], [180, -90]]]);
        },
        "inside": function(pointInPolygon) {
          assert.ok(pointInPolygon([0, 0]));
          assert.ok(pointInPolygon([180, 1]));
          assert.ok(pointInPolygon([-90, -80]));
        },
        "outside": function(pointInPolygon) {
          assert.ok(!pointInPolygon([180, 0]));
          assert.ok(!pointInPolygon([150, 0]));
          assert.ok(!pointInPolygon([180, -30]));
          assert.ok(!pointInPolygon([150, -80]));
        }
      },
      "triangle touching the North pole": {
        topic: function(pointInPolygon) {
          return pointInPolygon([[[180, 90], [45, 0], [-45, 0], [180, 90]]]);
        },
        "inside": function(pointInPolygon) {
          assert.ok(pointInPolygon([-44, 10]));
          assert.ok(pointInPolygon([0, 10]));
          assert.ok(pointInPolygon([30, 80]));
        },
        "outside": function(pointInPolygon) {
          assert.ok(!pointInPolygon([-90, 0]));
          assert.ok(!pointInPolygon([0, -1]));
          assert.ok(!pointInPolygon([0, -80]));
          assert.ok(!pointInPolygon([-90, 1]));
          assert.ok(!pointInPolygon([-90, 80]));
        }
      }
    }
  }
});

suite.export(module);
