require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.geo.path");

suite.addBatch({
  "path": {
    topic: function() {
      return d3.geo.path()
          .context(testContext)
          .projection(d3.geo.equirectangular()
            .scale(900 / Math.PI)
            .precision(0));
    },

    "Point": function(path) {
      path({
        type: "Point",
        coordinates: [-63, 18]
      });
      assert.deepEqual(testContext.buffer(), [
        {type: "moveTo", x: 165, y: 160},
        {type: "arc", x: 165, y: 160, r: 4.5}
      ]);
    },

    "MultiPoint": function(path) {
      path({
        type: "MultiPoint",
        coordinates: [[-63, 18], [-62, 18], [-62, 17]]
      });
      assert.deepEqual(testContext.buffer(), [
        {type: "moveTo", x: 165, y: 160}, {type: "arc", x: 165, y: 160, r: 4.5},
        {type: "moveTo", x: 170, y: 160}, {type: "arc", x: 170, y: 160, r: 4.5},
        {type: "moveTo", x: 170, y: 165}, {type: "arc", x: 170, y: 165, r: 4.5}
      ]);
    },

    "LineString": function(path) {
      path({
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [[-63, 18], [-62, 18], [-62, 17]]
        },
      });
      assert.deepEqual(testContext.buffer(), [
        {type: "moveTo", x: 165, y: 160},
        {type: "lineTo", x: 170, y: 160},
        {type: "lineTo", x: 170, y: 165}
      ]);
    },

    "Polygon": function(path) {
      path({
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [[[-63, 18], [-62, 18], [-62, 17], [-63, 18]]]
        },
      });
      assert.deepEqual(testContext.buffer(), [
        {type: "moveTo", x: 165, y: 160},
        {type: "lineTo", x: 170, y: 160},
        {type: "lineTo", x: 170, y: 165},
        {type: "closePath"}
      ]);
    },

    "GeometryCollection": function(path) {
      path({
        type: "GeometryCollection",
        geometries: [{type: "Point", coordinates: [0, 0]}]
      });
      assert.deepEqual(testContext.buffer(), [
        {type: "moveTo", x: 480, y: 250}, {type: "arc", x: 480, y: 250, r: 4.5}
      ]);
    },

    "FeatureCollection": function(path) {
      path({
        type: "FeatureCollection",
        features: [{type: "Feature", geometry: {type: "Point", coordinates: [0, 0]}}]
      });
      assert.deepEqual(testContext.buffer(), [
        {type: "moveTo", x: 480, y: 250}, {type: "arc", x: 480, y: 250, r: 4.5}
      ]);
    },

    "with a null projection": {
      topic: function() {
        return d3.geo.path().context(testContext).projection(null);
      },
      "Polygon": function(path) {
        path({
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [[[-63, 18], [-62, 18], [-62, 17], [-63, 18]]]
          },
        });
        assert.deepEqual(testContext.buffer(), [
          {type: "moveTo", x: -63, y: 18},
          {type: "lineTo", x: -62, y: 18},
          {type: "lineTo", x: -62, y: 17},
          {type: "closePath"}
        ]);
      }
    },

    "winding order": {
      "tiny polygon": function(path) {
        path({type: "Polygon", coordinates: [[
          [-0.06904102953339501, 0.346043661846373],
          [-6.725674252975136e-15, 0.3981303360336475],
          [-6.742247658534323e-15, -0.08812465346531581],
          [-0.17301258217724075, -0.12278150669440671],
          [-0.06904102953339501, 0.346043661846373]]]});
        assert.equal(testContext.buffer().filter(function(d) { return d.type === "moveTo"; }).length, 1);
      }
    },

    "with no context": {
      topic: function(path) {
        return d3.geo.path().projection(path.projection());
      },
      "returns null when passed null or undefined": function(path) {
        assert.equal(path(null), null);
        assert.equal(path(undefined), null);
        assert.equal(path(), null);
      },
      "returns null with bogus type name": function(path) {
        assert.equal(path({
          type: "Feature",
          geometry: {
            type: "__proto__",
            coordinates: [[[-63.03, 18.02], [-63.14, 18.06], [-63.01, 18.07], [-63.03, 18.02]]]
          },
        }), null);
      }
    },

    "projection": {
      "returns the current projection when called with no arguments": function() {
        var path = d3.geo.path(), projection = d3.geo.albers();
        path.projection(projection);
        assert.strictEqual(path.projection(), projection);
      }
    },

    "pointRadius": {
      "returns the current point radius when called with no arguments": function() {
        var path = d3.geo.path(), radius = function() { return 5; };
        assert.strictEqual(path.pointRadius(), 4.5);
        assert.strictEqual(path.pointRadius(radius).pointRadius(), radius);
      },
      "coerces point radius to a number": {
        "constant": function() {
          var path = d3.geo.path();
          assert.strictEqual(path.pointRadius("6").pointRadius(), 6);
        },
        "function": function(path) {
          var radius = path.pointRadius();
          try {
            path.pointRadius(function() { return "6"; })({type: "Point", coordinates: [0, 0]});
            assert.strictEqual(testContext.buffer().filter(function(d) { return d.type === "arc"; })[0].r, 6);
          } finally {
            path.pointRadius(radius);
          }
        }
      }
    },

    "area": {
      topic: function(path) {
        return path.area;
      },
      "no holes": function(area) {
        assert.strictEqual(area({type: "Polygon", coordinates: [[[100, 0], [100, 1], [101, 1], [101, 0], [100, 0]]]}), 25);
      },
      "holes": function(area) {
        assert.strictEqual(area({type: "Polygon", coordinates: [[[100, 0], [100, 1], [101, 1], [101, 0], [100, 0]],
                                                                [[100.2, .2], [100.8, .2], [100.8, .8], [100.2, .8], [100.2, .2]]]}), 16);
      },
      "Sphere": function(area) {
        assert.strictEqual(area({type: "Sphere"}), 1620000);
      }
    },

    "centroid": {
      topic: function(path) {
        return path.centroid;
      },
      "Point": function(centroid) {
        assert.deepEqual(centroid({type: "Point", coordinates: [0, 0]}), [480, 250]);
      },
      "MultiPoint": {
        "empty": function(centroid) {
          assert.isUndefined(centroid({type: "MultiPoint", coordinates: []}));
        },
        "single point": function(centroid) {
          assert.deepEqual(centroid({type: "MultiPoint", coordinates: [[0, 0]]}), [480, 250]);
        },
        "two points": function(centroid) {
          assert.deepEqual(centroid({type: "MultiPoint", coordinates: [[-122, 37], [-74, 40]]}), [-10, 57.5]);
        }
      },
      "LineString": {
        "empty": function(centroid) {
          assert.isUndefined(centroid({type: "LineString", coordinates: []}));
        },
        "two points": function(centroid) {
          assert.deepEqual(centroid({type: "LineString", coordinates: [[100, 0], [0, 0]]}), [730, 250]);
          assert.deepEqual(centroid({type: "LineString", coordinates: [[0, 0], [100, 0], [101, 0]]}), [732.5, 250]);
        },
        "two points, one unique": function(centroid) {
          assert.isUndefined(centroid({type: "LineString", coordinates: [[-122, 37], [-122, 37]]}));
          assert.isUndefined(centroid({type: "LineString", coordinates: [[ -74, 40], [ -74, 40]]}));
        },
        "three points; two unique": function(centroid) {
          assert.deepEqual(centroid({type: "LineString", coordinates: [[-122, 37], [-74, 40], [-74, 40]]}), [-10, 57.5]);
        },
        "three points": function(centroid) {
          assert.inDelta(centroid({type: "LineString", coordinates: [[-122, 37], [-74, 40], [-100, 0]]}), [17.389135, 103.563545], 1e-6);
        }
      },
      "MultiLineString": function(centroid) {
        assert.deepEqual(centroid({type: "MultiLineString", coordinates: [[[100, 0], [0, 0]], [[-10, 0], [0, 0]]]}), [705, 250]);
      },
      "Polygon": {
        "single ring": function(centroid) {
          assert.deepEqual(centroid({type: "Polygon", coordinates: [[[100, 0], [100, 1], [101, 1], [101, 0], [100, 0]]]}), [982.5, 247.5]);
        },
        "zero area": function(centroid) {
          assert.isUndefined(centroid({type: "Polygon", coordinates: [[[1, 0], [2, 0], [3, 0], [1, 0]]]}));
        },
        "two rings, one zero area": function(centroid) {
          assert.deepEqual(centroid({type: "Polygon", coordinates: [
            [[100,   0], [100,   1], [101,   1], [101,   0], [100, 0]],
            [[100.1, 0], [100.2, 0], [100.3, 0], [100.1, 0]
          ]]}), [982.5, 247.5]);
        },
        "clockwise exterior, anticlockwise interior": function(centroid) {
          assert.inDelta(centroid({
            type: "Polygon",
            coordinates: [
              [[-2, -2], [2, -2], [2, 2], [-2, 2], [-2, -2]].reverse(),
              [[ 0, -1], [1, -1], [1, 1], [ 0, 1], [ 0, -1]]
            ]
          }), [479.642857, 250], 1e-6);
        }
      },
      "MultiPolygon": {
        "empty": function(centroid) {
          assert.isUndefined(centroid({type: "MultiPolygon", coordinates: []}));
        },
        "single polygon": function(centroid) {
          assert.deepEqual(centroid({type: "MultiPolygon", coordinates: [[[[100, 0], [100, 1], [101, 1], [101, 0], [100, 0]]]]}), [982.5, 247.5]);
        },
        "two polygons": function(centroid) {
          assert.deepEqual(centroid({type: "MultiPolygon", coordinates: [
            [[[100, 0], [100, 1], [101, 1], [101, 0], [100, 0]]],
            [[[0, 0], [1, 0], [1, -1], [0, -1], [0, 0]]]
          ]}), [732.5, 250]);
        },
        "two polygons, one zero area": function(centroid) {
          assert.deepEqual(centroid({type: "MultiPolygon", coordinates: [
            [[[100, 0], [100, 1], [101, 1], [101, 0], [100, 0]]],
            [[[0, 0], [1, 0], [2, 0], [0, 0]]]
          ]}), [982.5, 247.5]);
        }
      },
      "GeometryCollection": {
        "Point": function(centroid) {
          assert.deepEqual(centroid({type: "GeometryCollection", geometries: [{type: "Point", coordinates: [0, 0]}]}), [480, 250]);
        },
        "Point and LineString": function(centroid) {
          assert.deepEqual(centroid({type: "GeometryCollection", geometries: [
            {type: "LineString", coordinates: [[179, 0], [180, 0]]},
            {type: "Point", coordinates: [0, 0]}
          ]}), [1377.5, 250]);
        },
        "Point, LineString and Polygon": function(centroid) {
          assert.deepEqual(centroid({type: "GeometryCollection", geometries: [
            {type: "Polygon", coordinates: [[[-180, 0], [-180, 1], [-179, 1], [-179, 0], [-180, 0]]]},
            {type: "LineString", coordinates: [[179, 0], [180, 0]]},
            {type: "Point", coordinates: [0, 0]}
          ]}), [-417.5, 247.5]);
        }
      },
      "FeatureCollection": {
        "Point": function(centroid) {
          assert.deepEqual(centroid({type: "FeatureCollection", features: [{type: "Feature", geometry: {type: "Point", coordinates: [0, 0]}}]}), [480, 250]);
        },
        "Point and LineString": function(centroid) {
          assert.deepEqual(centroid({type: "FeatureCollection", features: [
            {type: "Feature", geometry: {type: "LineString", coordinates: [[179, 0], [180, 0]]}},
            {type: "Feature", geometry: {type: "Point", coordinates: [0, 0]}}
          ]}), [1377.5, 250]);
        },
        "Point, LineString and Polygon": function(centroid) {
          assert.deepEqual(centroid({type: "FeatureCollection", features: [
            {type: "Feature", geometry: {type: "Polygon", coordinates: [[[-180, 0], [-180, 1], [-179, 1], [-179, 0], [-180, 0]]]}},
            {type: "Feature", geometry: {type: "LineString", coordinates: [[179, 0], [180, 0]]}},
            {type: "Feature", geometry: {type: "Point", coordinates: [0, 0]}}
          ]}), [-417.5, 247.5]);
        }
      },
      "Sphere": function(centroid) {
        assert.deepEqual(centroid({type: "Sphere"}), [480, 250]);
      },
      "rotate([180, -248])": function() {
        d3.geo.path()
            .context(testContext)
            .projection(d3.geo.equirectangular()
              .rotate([-180, -248])
              .scale(900 / Math.PI)
              .precision(0))({type: "Polygon",  coordinates: [[[-175.03150315031502, 66.57410661866186], [-174.34743474347434, 66.33097912391239], [-174.5994599459946, 67.0603616081608], [-171.86318631863185, 66.90406536153614], [-169.9189918991899, 65.96628788178816], [-170.89108910891088, 65.53213164116411], [-172.54725472547256, 65.42793414341432], [-172.5832583258326, 64.45542416441643], [-172.97929792979298, 64.2470291689169], [-173.91539153915392, 64.28176166816681], [-174.67146714671466, 64.62908666066605], [-176.003600360036, 64.90694665466546], [-176.21962196219621, 65.34110289528951], [-177.22772277227722, 65.51476539153916], [-178.37983798379838, 65.37583539453945], [-178.91989198919893, 65.72316038703869], [-178.7038703870387, 66.10521787878787], [-179.8919891989199, 65.8620903840384], [-179.45994599459945, 65.3932016441644], [-180, 64.97641165316531], [-180, 68.95328281728172], [-177.55175517551754, 68.18916783378336], [-174.95949594959495, 67.19929160516051], [-175.03150315031502, 66.57410661866186]]]});
        assert.deepEqual(testContext.buffer().filter(function(d) { return d.type === "moveTo"; }), [
          {type: "moveTo", x: 1370, y: 243}
        ]);
      }
    },

    "clipAngle(90)": {
      topic: function() {
        return d3.geo.path()
            .context(testContext)
            .projection(d3.geo.equirectangular()
              .scale(900 / Math.PI)
              .precision(0)
              .clipAngle(90));
      },
      "Point": function(path) {
        path({
          type: "Point",
          coordinates: [-63, 18]
        });
        assert.deepEqual(testContext.buffer(), [
          {type: "moveTo", x: 165, y: 160}, {type: "arc", x: 165, y: 160, r: 4.5}
        ]);
      },
      "MultiPoint": function(path) {
        path({
          type: "MultiPoint",
          coordinates: [[-63, 18], [-62, 18], [-62, 17]]
        });
        assert.deepEqual(testContext.buffer(), [
          {type: "moveTo", x: 165, y: 160}, {type: "arc", x: 165, y: 160, r: 4.5},
          {type: "moveTo", x: 170, y: 160}, {type: "arc", x: 170, y: 160, r: 4.5},
          {type: "moveTo", x: 170, y: 165}, {type: "arc", x: 170, y: 165, r: 4.5}
        ]);
      },
      "Polygon": {
        "inserts exterior along clip edge if polygon interior surrounds it": function(path) {
          path({type: "Polygon", coordinates: [[[80, -80], [80, 80], [-80, 80], [-80, -80], [80, -80]]]});
          assert.equal(testContext.buffer().filter(function(d) { return d.type === "moveTo"; }).length, 2);
        },
        "inserts exterior along clip edge if polygon exterior surrounds it": function(path) {
          path({type: "Polygon", coordinates: [[[100, -80], [-100, -80], [-100, 80], [100, 80], [100, -80]]]});
          assert.equal(testContext.buffer().filter(function(d) { return d.type === "moveTo"; }).length, 1);
        }
      },
      "rotate([-17, -451])": function() {
        var pole = d3.range(-180, 180, 10).map(function(x) { return [x, 70]; });
        pole.push(pole[0]);
        d3.geo.path()
            .context(testContext)
            .projection(d3.geo.equirectangular()
              .rotate([-17, -451])
              .scale(900 / Math.PI)
              .precision(0)
              .clipAngle(90))({type: "Polygon", coordinates: [pole]});
        assert.deepEqual(testContext.buffer().filter(function(d) { return d.type === "moveTo"; }), [
          {type: "moveTo", x: 510, y: 160},
          {type: "moveTo", x:  87, y: 700}
        ]);
      },
      "rotate([71.03, 42.37])": {
        topic: function() {
          return d3.geo.path()
              .context(testContext)
              .projection(d3.geo.equirectangular()
                .rotate([71.03, 42.37])
                .scale(900 / Math.PI)
                .precision(0)
                .clipAngle(90));
        },
        /*
        "grid component": function(path) {
          var yStepsBig = d3.range(-90, 90, 10);
          path({type: "LineString", coordinates: yStepsBig.map(function(y) { return [110, y]; })});
          assert.inDelta(testContext.buffer(), [[
            [109.538009, -90],
            [110, -80],
            [110, -70],
            [110, -60],
            [110, -50],
            [110, -47.625390]
          ]], 1e-6);
        },
        */
        "can completely clip a LineString": function(path) {
          path({type: "LineString", coordinates: [[90.0, -42.37], [95.0, -42.37], [90.0, -42.37]]});
          assert.deepEqual(testContext.buffer(), []);
        },
        "doesn't insert a duplicate point": function(path) {
          path({type: "LineString", coordinates: [[0, 0]]});
          assert.deepEqual(testContext.buffer(), [{type: "moveTo", x: 859, y: 187}]);
        },
        "Point": {
          "visible": function(path) {
            path({type: "Point", coordinates: [0, 0]});
            assert.deepEqual(testContext.buffer(), [{type: "moveTo", x: 859, y: 187}, {type: "arc", x: 859, y: 187, r: 4.5}]);
          },
          "invisible": function(path) {
            path({type: "Point", coordinates: [-180, 0]});
            assert.deepEqual(testContext.buffer(), []);
          }
        },
        "MultiPoint": function(path) {
          path({type: "MultiPoint", coordinates: [[0, 0], [-180, 0]]});
          assert.deepEqual(testContext.buffer(), [{type: "moveTo", x: 859, y: 187}, {type: "arc", x: 859, y: 187, r: 4.5}]);
        }
      },
      "rotate(-24, -175.5])": {
        topic: function() {
          return d3.geo.path()
              .context(testContext)
              .projection(d3.geo.equirectangular()
                .rotate([-24, -175.5])
                .scale(900 / Math.PI)
                .precision(0)
                .clipAngle(90));
        },
        "Antarctica": function(path) {
          path(antarctica);
          assert.equal(testContext.buffer().filter(function(d) { return d.type === "moveTo"; }).length, 2);
        }
      },
      "circle.angle(60)": {
        "rotate([0, 0])": function(path) {
          path(d3.geo.circle().angle(60)());
          assert.deepEqual(testContext.buffer().filter(function(d) { return d.type === "moveTo"; }), [
            {type: "moveTo", x: 276, y: 493}]);
        },
        "rotate([90, 0])": function(path) {
          try {
            path.projection().rotate([90, 0]);
            path(d3.geo.circle().angle(60)());
            assert.deepEqual(testContext.buffer().filter(function(d) { return d.type === "moveTo"; }), [
              {type: "moveTo", x: 930, y: 550}]);
          } finally {
            path.projection().rotate([0, 0]);
          }
        },
        "rotate([180, 0])": function(path) {
          try {
            path.projection().rotate([180, 0]);
            path(d3.geo.circle().angle(60)());
            assert.deepEqual(testContext.buffer().filter(function(d) { return d.type === "moveTo"; }), []);
          } finally {
            path.projection().rotate([0, 0]);
          }
        },
        "rotate([270, 0])": function(path) {
          try {
            path.projection().rotate([270, 0]);
            path(d3.geo.circle().angle(60)());
            assert.deepEqual(testContext.buffer().filter(function(d) { return d.type === "moveTo"; }), [
              {type: "moveTo", x: 30, y: -50}]);
          } finally {
            path.projection().rotate([0, 0]);
          }
        }
      },
      "circle.angle(120)": {
        "rotate([0, 0])": function(path) {
          path(d3.geo.circle().angle(120)());
          assert.deepEqual(testContext.buffer().filter(function(d) { return d.type === "moveTo"; }), [
            {type: "moveTo", x: 87, y: 700}]);
        },
        "rotate([90, 0])": function(path) {
          try {
            path.projection().rotate([90, 0]);
            path(d3.geo.circle().angle(120)());
            assert.deepEqual(testContext.buffer().filter(function(d) { return d.type === "moveTo"; }), [
              {type: "moveTo", x: 30, y: 550}]);
          } finally {
            path.projection().rotate([0, 0]);
          }
        },
        "rotate([180, 0])": function(path) {
          try {
            path.projection().rotate([180, 0]);
            path(d3.geo.circle().angle(120)());
            assert.deepEqual(testContext.buffer().filter(function(d) { return d.type === "moveTo"; }), [
              {type: "moveTo", x: 276, y: 493},
              {type: "moveTo", x:  87, y: 700}]);
          } finally {
            path.projection().rotate([0, 0]);
          }
        },
        "rotate([270, 0])": function(path) {
          try {
            path.projection().rotate([270, 0]);
            path(d3.geo.circle().angle(120)());
            assert.deepEqual(testContext.buffer().filter(function(d) { return d.type === "moveTo"; }), [
              {type: "moveTo", x: 930, y: -50}]);
          } finally {
            path.projection().rotate([0, 0]);
          }
        },
        "rotate([210, 1])": function(path) {
          try {
            path.projection().rotate([210, 1]);
            path(d3.geo.circle().angle(120)());
            assert.deepEqual(testContext.buffer().filter(function(d) { return d.type === "moveTo"; }), [{type: "moveTo", x: 930, y: 250}]);
          } finally {
            path.projection().rotate([0, 0]);
          }
        },
        "rotate([-150, 60])": function(path) {
          try {
            path.projection().rotate([-150, 60]);
            path(d3.geo.circle().angle(120)());
            assert.deepEqual(testContext.buffer().filter(function(d) { return d.type === "moveTo"; }), [{type: "moveTo", x: 30, y: -87}]);
          } finally {
            path.projection().rotate([0, 0]);
          }
        }
      },
      "Sphere": function(path) {
        path({type: "Sphere"});
        assert.deepEqual(testContext.buffer().filter(function(d) { return d.type === "moveTo"; }), [{type: "moveTo", x: 87, y: 700}]);
      }
    },
    "clipAngle(170)": {
      topic: function() {
        return d3.geo.path()
            .context(testContext)
            .projection(d3.geo.equirectangular()
              .scale(900 / Math.PI)
              .precision(0)
              .clipAngle(170));
      },
      "stripes": {
        "rotate([0, 0])": function(path) {
          path(stripes(80, -80));
          assert.deepEqual(testContext.buffer().filter(function(d) { return d.type === "moveTo"; }), [
            {type: "moveTo", x: -420, y: -150},
            {type: "moveTo", x: -420, y:  650},
            {type: "moveTo", x: 1331, y:  259}]);
        },
        "rotate([0, -90])": function(path) {
          try {
            path.projection().rotate([0, -90]);
            path(stripes(80, -80));
            assert.deepEqual(testContext.buffer().filter(function(d) { return d.type === "moveTo"; }), [
              {type: "moveTo", x:  480, y: 200},
              {type: "moveTo", x: 1350, y: 210}]);
          } finally {
            path.projection().rotate([0, 0]);
          }
        }
      }
    },

    "antimeridian cutting": {
      "rotate([98, 0])": {
        topic: function() {
          return d3.geo.path()
              .context(testContext)
              .projection(d3.geo.equirectangular()
                .scale(900 / Math.PI)
                .rotate([98, 0])
                .precision(0));
        },
        "small U.S. county polygons": {
          "Keweenaw": function(path) {
            path({
              type: "Polygon",
              coordinates: [[[-88.23013, 47.198326], [-88.514931, 47.285957], [-88.383484, 47.285957], [-88.23013, 47.198326]]]
            });
            assert.equal(testContext.buffer().filter(function(d) { return d.type === "moveTo"; }).length, 1);
          },
          "Accomack": function(path) {
            path({
              type: "MultiPolygon",
              coordinates: [
                [[[-75.397659, 38.013497], [-75.244304, 38.029928], [-75.666029, 37.465803], [-75.939876, 37.547957], [-75.671506, 37.95325], [-75.622213, 37.991589], [-75.397659, 38.013497]]],
                [[[-76.016553, 37.95325], [-76.043938, 37.95325], [-75.994645, 37.95325], [-76.016553, 37.95325]]]
              ]
            });
            assert.equal(testContext.buffer().filter(function(d) { return d.type === "moveTo"; }).length, 2);
          },
          "Hopewell": function(path) {
            path({
              type: "Polygon",
              coordinates: [[[-77.298157, 37.312448], [-77.298157, 37.312448], [-77.336496, 37.312448], [-77.281726, 37.312448], [-77.298157, 37.312448]]]
            });
            assert.equal(testContext.buffer().filter(function(d) { return d.type === "moveTo"; }).length, 1);
          }
        }
      },
      "rotate([330, 232])": {
        topic: function() {
          return d3.geo.path()
              .context(testContext)
              .projection(d3.geo.equirectangular()
                .rotate([330, 232])
                .scale(900 / Math.PI)
                .precision(0));
        },
        "degenerate points": function(path) {
          path(d3.geo.circle().angle(30)());
          assert.equal(testContext.buffer().filter(function(d) { return d.type === "moveTo"; }).length, 2);
        }
      },
      "rotate([34.5, 90])": {
        topic: function() {
          return d3.geo.path()
              .context(testContext)
              .projection(d3.geo.equirectangular()
                .rotate([34.5, 90])
                .scale(900 / Math.PI)
                .precision(0));
        },
        "clip point ordering": function(path) {
          var line = d3.range(-90,  180,  10).map(function(x) { return [x, 20]; })
             .concat(d3.range(170, -100, -10).map(function(x) { return [x,  0]; }))
             .concat([[-90, 20]]);
          path({type: "Polygon", coordinates: [line]});
          assert.equal(testContext.buffer().filter(function(d) { return d.type === "moveTo"; }).length, 3);
        }
      }
    },

    "stereographic.precision(1)": {
      topic: function() {
        return d3.geo.path()
            .context(testContext)
            .projection(d3.geo.stereographic()
              .precision(1));
      },
      "correctly resamples points on antimeridian": function(path) {
        path({type: "LineString", coordinates: [[0, 90], [90, 0]]});
        assert.deepEqual(testContext.buffer(), [
          {type: "moveTo", x: 480, y: 100},
          {type: "lineTo", x: 509, y: 103},
          {type: "lineTo", x: 537, y: 111},
          {type: "lineTo", x: 563, y: 125},
          {type: "lineTo", x: 586, y: 144},
          {type: "lineTo", x: 605, y: 167},
          {type: "lineTo", x: 619, y: 193},
          {type: "lineTo", x: 627, y: 221},
          {type: "lineTo", x: 630, y: 250}
        ]);
      }
    },
    "resampling near poles": {
      topic: function() {
        return d3.geo.path()
            .context(testContext)
            .projection(d3.geo.albers()
              .scale(140)
              .rotate([0, 0])
              .precision(1));
      },
      "rotate([0, 0])": function(path) {
        path({type: "LineString", coordinates: [[0, 88], [180, 89]]});
        assert.isTrue(testContext.buffer().filter(function(d) { return d.type === "lineTo"; }).length > 1);
        path({type: "LineString", coordinates: [[180, 90], [1, 89.5]]});
        assert.isTrue(testContext.buffer().filter(function(d) { return d.type === "lineTo"; }).length > 1);
      },
      "rotate([11.5, 285])": function(path) {
        try {
          path.projection().rotate([11.5, 285]);
          path({type: "LineString", coordinates: [[170, 20], [170, 0]]});
          assert.isTrue(testContext.buffer().filter(function(d) { return d.type === "lineTo"; }).length > 1);
        } finally {
          path.projection().rotate([0, 0]);
        }
      }
    },
    "rotate([0, 0, 0])": {
      "longitudes wrap at ±180°": function(path) {
        path({type: "Point", coordinates: [180 + 1e-6, 0]});
        assert.deepEqual(testContext.buffer(), [{type: "moveTo", x: -420, y: 250}, {type: "arc", x: -420, y: 250, r: 4.5}]);
      }
    }
  }
});

var testBuffer = [];

var testContext = {
  arc: function(x, y, r, a0, a1) { testBuffer.push({type: "arc", x: Math.round(x), y: Math.round(y), r: r}); },
  moveTo: function(x, y) { testBuffer.push({type: "moveTo", x: Math.round(x), y: Math.round(y)}); },
  lineTo: function(x, y) { testBuffer.push({type: "lineTo", x: Math.round(x), y: Math.round(y)}); },
  closePath: function() { testBuffer.push({type: "closePath"}); },
  buffer: function() { var result = testBuffer; testBuffer = []; return result; }
};

function feature(o) {
  return {type: "Feature", geometry: o};
}

function stripes(a, b) {
  return {type: "Polygon", coordinates: [a, b].map(function(d, i) {
    var stripe = d3.range(-180, 180, 1).map(function(x) { return [x, d]; });
    stripe.push(stripe[0]);
    return i ? stripe.reverse() : stripe;
  })};
}

var antarctica = {type: "Polygon", coordinates: [[[-58.61414,-64.15246],[-59.04507,-64.36800],[-59.78934,-64.21122],[-60.61192,-64.30920],[-61.29741,-64.54432],[-62.02210,-64.79909],[-62.51176,-65.09302],[-62.64885,-65.48494],[-62.59012,-65.85721],[-62.12007,-66.19032],[-62.80556,-66.42550],[-63.74569,-66.50384],[-64.29410,-66.83700],[-64.88169,-67.15047],[-65.50842,-67.58161],[-65.66508,-67.95388],[-65.31254,-68.36533],[-64.78371,-68.67890],[-63.96110,-68.91398],[-63.19729,-69.22755],[-62.78595,-69.61941],[-62.57051,-69.99174],[-62.27673,-70.38366],[-61.80666,-70.71676],[-61.51290,-71.08904],[-61.37580,-72.01007],[-61.08197,-72.38235],[-61.00366,-72.77426],[-60.69026,-73.16617],[-60.82736,-73.69524],[-61.37580,-74.10674],[-61.96336,-74.43984],[-63.29520,-74.57699],[-63.74569,-74.92974],[-64.35283,-75.26284],[-65.86098,-75.63512],[-67.19281,-75.79191],[-68.44628,-76.00745],[-69.79772,-76.22299],[-70.60072,-76.63449],[-72.20677,-76.67366],[-73.96953,-76.63449],[-75.55597,-76.71288],[-77.24037,-76.71288],[-76.92697,-77.10480],[-75.39929,-77.28106],[-74.28287,-77.55542],[-73.65611,-77.90811],[-74.77253,-78.22163],[-76.49610,-78.12365],[-77.92585,-78.37841],[-77.98466,-78.78991],[-78.02378,-79.18183],[-76.84863,-79.51493],[-76.63322,-79.88721],[-75.36009,-80.25954],[-73.24485,-80.41633],[-71.44294,-80.69062],[-70.01316,-81.00415],[-68.19164,-81.31767],[-65.70427,-81.47445],[-63.25603,-81.74875],[-61.55202,-82.04269],[-59.69141,-82.37585],[-58.71212,-82.84610],[-58.22248,-83.21843],[-57.00811,-82.86569],[-55.36289,-82.57175],[-53.61977,-82.25823],[-51.54364,-82.00352],[-49.76134,-81.72917],[-47.27393,-81.70958],[-44.82570,-81.84673],[-42.80836,-82.08191],[-42.16202,-81.65082],[-40.77143,-81.35689],[-38.24481,-81.33730],[-36.26666,-81.12171],[-34.38639,-80.90617],[-32.31029,-80.76902],[-30.09709,-80.59265],[-28.54980,-80.33793],[-29.25490,-79.98519],[-29.68580,-79.63250],[-29.68580,-79.26022],[-31.62480,-79.29939],[-33.68132,-79.45613],[-35.63991,-79.45613],[-35.91410,-79.08385],[-35.77700,-78.33924],[-35.32654,-78.12365],[-33.89676,-77.88852],[-32.21236,-77.65345],[-30.99805,-77.35951],[-29.78373,-77.06557],[-28.88277,-76.67366],[-27.51175,-76.49734],[-26.16033,-76.36014],[-25.47482,-76.28180],[-23.92755,-76.24258],[-22.45859,-76.10543],[-21.22469,-75.90947],[-20.01037,-75.67434],[-18.91354,-75.43921],[-17.52298,-75.12569],[-16.64158,-74.79253],[-15.70149,-74.49860],[-15.40771,-74.10674],[-16.46532,-73.87161],[-16.11278,-73.46011],[-15.44685,-73.14654],[-14.40880,-72.95058],[-13.31197,-72.71545],[-12.29350,-72.40193],[-11.51006,-72.01007],[-11.02043,-71.53976],[-10.29577,-71.26541],[-9.10101,-71.32422],[-8.61138,-71.65733],[-7.41662,-71.69650],[-7.37745,-71.32422],[-6.86823,-70.93231],[-5.79098,-71.03028],[-5.53637,-71.40261],[-4.34166,-71.46137],[-3.04898,-71.28505],[-1.79549,-71.16743],[-0.65948,-71.22624],[-0.22863,-71.63774],[0.86819,-71.30463],[1.88668,-71.12826],[3.02263,-70.99111],[4.13905,-70.85391],[5.15754,-70.61878],[6.27391,-70.46205],[7.13571,-70.24651],[7.74286,-69.89376],[8.48711,-70.14853],[9.52513,-70.01133],[10.24984,-70.48163],[10.81782,-70.83433],[11.95382,-70.63837],[12.40428,-70.24651],[13.42277,-69.97216],[14.73499,-70.03091],[15.12675,-70.40324],[15.94934,-70.03091],[17.02658,-69.91335],[18.20171,-69.87418],[19.25937,-69.89376],[20.37573,-70.01133],[21.45298,-70.07014],[21.92303,-70.40324],[22.56940,-70.69718],[23.66618,-70.52081],[24.84135,-70.48163],[25.97730,-70.48163],[27.09372,-70.46205],[28.09258,-70.32485],[29.15024,-70.20728],[30.03158,-69.93293],[30.97173,-69.75661],[31.99017,-69.65864],[32.75405,-69.38429],[33.30244,-68.83564],[33.87041,-68.50258],[34.90849,-68.65927],[35.30020,-69.01201],[36.16201,-69.24714],[37.20003,-69.16874],[37.90510,-69.52144],[38.64940,-69.77620],[39.66789,-69.54107],[40.02043,-69.10994],[40.92135,-68.93362],[41.95943,-68.60051],[42.93870,-68.46331],[44.11387,-68.26740],[44.89729,-68.05186],[45.71992,-67.81673],[46.50334,-67.60119],[47.44344,-67.71875],[48.34441,-67.36606],[48.99073,-67.09171],[49.93088,-67.11130],[50.75347,-66.87617],[50.94932,-66.52348],[51.79154,-66.24913],[52.61413,-66.05317],[53.61303,-65.89639],[54.53355,-65.81804],[55.41494,-65.87680],[56.35504,-65.97478],[57.15809,-66.24913],[57.25596,-66.68021],[58.13736,-67.01332],[58.74450,-67.28767],[59.93931,-67.40523],[60.60522,-67.67958],[61.42780,-67.95388],[62.38748,-68.01269],[63.19048,-67.81673],[64.05234,-67.40523],[64.99244,-67.62072],[65.97171,-67.73834],[66.91186,-67.85590],[67.89113,-67.93430],[68.89003,-67.93430],[69.71262,-68.97279],[69.67345,-69.22755],[69.55594,-69.67822],[68.59625,-69.93293],[67.81273,-70.30526],[67.94988,-70.69718],[69.06630,-70.67754],[68.92915,-71.06945],[68.41998,-71.44178],[67.94988,-71.85328],[68.71376,-72.16680],[69.86930,-72.26478],[71.02489,-72.08841],[71.57328,-71.69650],[71.90628,-71.32422],[72.45462,-71.01070],[73.08141,-70.71676],[73.33602,-70.36402],[73.86487,-69.87418],[74.49155,-69.77620],[75.62755,-69.73703],[76.62646,-69.61941],[77.64490,-69.46268],[78.13453,-69.07076],[78.42837,-68.69844],[79.11385,-68.32621],[80.09312,-68.07150],[80.93534,-67.87554],[81.48379,-67.54238],[82.05176,-67.36606],[82.77642,-67.20928],[83.77533,-67.30726],[84.67620,-67.20928],[85.65552,-67.09171],[86.75235,-67.15047],[87.47701,-66.87617],[87.98628,-66.20991],[88.35841,-66.48426],[88.82840,-66.95456],[89.67063,-67.15047],[90.63036,-67.22886],[91.59009,-67.11130],[92.60853,-67.18969],[93.54863,-67.20928],[94.17541,-67.11130],[95.01759,-67.17011],[95.78147,-67.38565],[96.68239,-67.24850],[97.75964,-67.24850],[98.68020,-67.11130],[99.71818,-67.24850],[100.38418,-66.91534],[100.89335,-66.58223],[101.57889,-66.30788],[102.83241,-65.56328],[103.47867,-65.70048],[104.24255,-65.97478],[104.90845,-66.32752],[106.18156,-66.93493],[107.16088,-66.95456],[108.08139,-66.95456],[109.15863,-66.83700],[110.23583,-66.69980],[111.05847,-66.42550],[111.74395,-66.13156],[112.86037,-66.09234],[113.60467,-65.87680],[114.38808,-66.07276],[114.89730,-66.38628],[115.60238,-66.69980],[116.69916,-66.66063],[117.38470,-66.91534],[118.57946,-67.17011],[119.83292,-67.26808],[120.87099,-67.18969],[121.65441,-66.87617],[122.32036,-66.56265],[123.22129,-66.48426],[124.12227,-66.62146],[125.16024,-66.71938],[126.10039,-66.56265],[127.00142,-66.56265],[127.88276,-66.66063],[128.80328,-66.75861],[129.70425,-66.58223],[130.78145,-66.42550],[131.79994,-66.38628],[132.93589,-66.38628],[133.85646,-66.28830],[134.75738,-66.20996],[135.03158,-65.72007],[135.07075,-65.30857],[135.69748,-65.58286],[135.87380,-66.03359],[136.20670,-66.44509],[136.61804,-66.77819],[137.46027,-66.95456],[138.59622,-66.89576],[139.90844,-66.87617],[140.80942,-66.81736],[142.12169,-66.81736],[143.06184,-66.79778],[144.37406,-66.83700],[145.49042,-66.91534],[146.19555,-67.22886],[145.99969,-67.60119],[146.64606,-67.89513],[147.72326,-68.13025],[148.83962,-68.38502],[150.13231,-68.56129],[151.48370,-68.71812],[152.50224,-68.87481],[153.63819,-68.89450],[154.28456,-68.56129],[155.16585,-68.83564],[155.92979,-69.14921],[156.81113,-69.38429],[158.02552,-69.48226],[159.18101,-69.59983],[159.67069,-69.99174],[160.80665,-70.22687],[161.57047,-70.57961],[162.68689,-70.73635],[163.84243,-70.71676],[164.91968,-70.77552],[166.11443,-70.75593],[167.30909,-70.83433],[168.42561,-70.97148],[169.46358,-71.20666],[170.50166,-71.40261],[171.20679,-71.69650],[171.08922,-72.08841],[170.56042,-72.44115],[170.10995,-72.89182],[169.75736,-73.24452],[169.28732,-73.65601],[167.97510,-73.81280],[167.38748,-74.16549],[166.09480,-74.38104],[165.64439,-74.77295],[164.95885,-75.14528],[164.23419,-75.45880],[163.82279,-75.87030],[163.56823,-76.24258],[163.47026,-76.69330],[163.48989,-77.06557],[164.05787,-77.45744],[164.27336,-77.82977],[164.74346,-78.18251],[166.60412,-78.31961],[166.99578,-78.75074],[165.19387,-78.90748],[163.66621,-79.12302],[161.76638,-79.16224],[160.92416,-79.73048],[160.74789,-80.20073],[160.31696,-80.57306],[159.78821,-80.94539],[161.12001,-81.27850],[161.62928,-81.69000],[162.49099,-82.06227],[163.70533,-82.39543],[165.09594,-82.70895],[166.60412,-83.02247],[168.89566,-83.33599],[169.40478,-83.82589],[172.28393,-84.04143],[172.47704,-84.11791],[173.22408,-84.41371],[175.98567,-84.15899],[178.27721,-84.47251],[180.00000,-84.71338],[180.00000,-90.0],[-180.0,-90.0],[-180.0,-84.71338],[-179.94249,-84.72144],[-179.05867,-84.13941],[-177.25677,-84.45293],[-177.14080,-84.41794],[-176.86199,-84.33381],[-176.52395,-84.23181],[-176.23030,-84.14320],[-176.08467,-84.09925],[-175.93410,-84.10159],[-175.82988,-84.11791],[-174.38250,-84.53432],[-173.11655,-84.11791],[-172.88910,-84.06101],[-169.95122,-83.88464],[-168.99998,-84.11791],[-168.53019,-84.23739],[-167.02209,-84.57049],[-164.18214,-84.82520],[-161.92977,-85.13873],[-158.07137,-85.37391],[-155.19225,-85.09955],[-150.94209,-85.29551],[-148.53307,-85.60903],[-145.88891,-85.31510],[-143.10771,-85.04075],[-142.89227,-84.57049],[-146.82906,-84.53127],[-150.06073,-84.29614],[-150.90292,-83.90423],[-153.58620,-83.68868],[-153.40990,-83.23801],[-153.03775,-82.82652],[-152.66563,-82.45419],[-152.86151,-82.04269],[-154.52629,-81.76839],[-155.29017,-81.41565],[-156.83744,-81.10212],[-154.40878,-81.16093],[-152.09766,-81.00415],[-150.64829,-81.33730],[-148.86599,-81.04337],[-147.22074,-80.67104],[-146.41774,-80.33793],[-146.77028,-79.92643],[-148.06294,-79.65208],[-149.53190,-79.35820],[-151.58841,-79.29939],[-153.39032,-79.16224],[-155.32937,-79.06426],[-155.97566,-78.69193],[-157.26830,-78.37841],[-158.05176,-78.02567],[-158.36513,-76.88920],[-157.87547,-76.98723],[-156.97457,-77.30075],[-155.32937,-77.20272],[-153.74283,-77.06557],[-152.92024,-77.49666],[-151.33378,-77.39873],[-150.00194,-77.18314],[-148.74848,-76.90884],[-147.61248,-76.57573],[-146.10440,-76.47775],[-146.14352,-76.10543],[-146.49609,-75.73315],[-146.20230,-75.38041],[-144.90962,-75.20403],[-144.32203,-75.53719],[-142.79435,-75.34123],[-141.63876,-75.08647],[-140.20900,-75.06688],[-138.85759,-74.96891],[-137.50619,-74.73378],[-136.42890,-74.51824],[-135.21458,-74.30269],[-134.43119,-74.36145],[-133.74565,-74.43984],[-132.25716,-74.30269],[-130.92531,-74.47901],[-129.55428,-74.45943],[-128.24203,-74.32228],[-126.89062,-74.42026],[-125.40208,-74.51824],[-124.01149,-74.47901],[-122.56215,-74.49860],[-121.07361,-74.51824],[-119.70255,-74.47901],[-118.68414,-74.18508],[-117.46980,-74.02834],[-116.21631,-74.24389],[-115.02155,-74.06751],[-113.94433,-73.71482],[-113.29798,-74.02834],[-112.94545,-74.38104],[-112.29908,-74.71419],[-111.26105,-74.42026],[-110.06632,-74.79253],[-108.71490,-74.91010],[-107.55934,-75.18445],[-106.14914,-75.12569],[-104.87607,-74.94932],[-103.36794,-74.98849],[-102.01650,-75.12569],[-100.64553,-75.30201],[-100.11669,-74.87093],[-100.76304,-74.53782],[-101.25270,-74.18508],[-102.54533,-74.10674],[-103.11331,-73.73441],[-103.32875,-73.36208],[-103.68128,-72.61753],[-102.91748,-72.75467],[-101.60523,-72.81343],[-100.31252,-72.75467],[-99.13737,-72.91141],[-98.11888,-73.20534],[-97.68803,-73.55804],[-96.33659,-73.61684],[-95.04396,-73.47969],[-93.67290,-73.28374],[-92.43900,-73.16617],[-91.42056,-73.40130],[-90.08873,-73.32291],[-89.22695,-72.55872],[-88.42395,-73.00939],[-87.26833,-73.18576],[-86.01482,-73.08778],[-85.19223,-73.47969],[-83.87999,-73.51887],[-82.66564,-73.63643],[-81.47091,-73.85197],[-80.68744,-73.47969],[-80.29579,-73.12695],[-79.29688,-73.51887],[-77.92585,-73.42089],[-76.90736,-73.63643],[-76.22187,-73.96954],[-74.89004,-73.87161],[-73.85202,-73.65601],[-72.83353,-73.40130],[-71.61921,-73.26415],[-70.20904,-73.14654],[-68.93591,-73.00939],[-67.95662,-72.79385],[-67.36906,-72.48032],[-67.13403,-72.04924],[-67.25154,-71.63774],[-67.56494,-71.24583],[-67.91747,-70.85391],[-68.23084,-70.46205],[-68.48545,-70.10931],[-68.54420,-69.71739],[-68.44628,-69.32553],[-67.97623,-68.95320],[-67.58449,-68.54170],[-67.42784,-68.14984],[-67.62367,-67.71875],[-67.74118,-67.32684],[-67.25154,-66.87617],[-66.70318,-66.58223],[-66.05681,-66.20996],[-65.37132,-65.89639],[-64.56827,-65.60250],[-64.17654,-65.17142],[-63.62815,-64.89707],[-63.00139,-64.64230],[-62.04168,-64.58355],[-61.41492,-64.27003],[-60.70985,-64.07407],[-59.88726,-63.95651],[-59.16258,-63.70174],[-58.59455,-63.38822],[-57.81114,-63.27066],[-57.22358,-63.52542],[-57.59572,-63.85853],[-58.61414,-64.15246]]]};

suite.export(module);
