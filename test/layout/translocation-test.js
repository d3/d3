var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.layout.translocation");

suite.addBatch({
  "translocation": {
    topic: load("layout/translocation").expression("d3.layout.translocation"),
    "of a simple matrix": {
      topic: function(translocation) {
        var groups = [60, 70, 80, 90];
        var edges = [
            [0, 10, 1, 15, 5, 5, {"name" : "test"}],
            [3, 20, 2, 25, 10, 5],
            [2, 30, 2, 45, 3, 5, {"date" : "august"}],
            [1, 40, 0, 35, 15, 5],
        ];

        return translocation()
            .padding(.05)
            .groups(groups)
            .edges(edges);
      },
      "computes translocation groups": function(translocation) {
        var groups = translocation.groups();
        assert.equal(groups.length, 4);

        assert.equal(groups[0].index, 0);
        assert.inDelta(groups[0].startAngle, 0.0000000000000000, 1e-6);
        assert.inDelta(groups[0].endAngle, 1.2166370614359172, 1e-6);
        assert.inDelta(groups[0].value, 60, 1e-6);

        assert.equal(groups[1].index, 1);
        assert.inDelta(groups[1].startAngle, 1.2666370614359173, 1e-6);
        assert.inDelta(groups[1].endAngle, 2.6860469664444873, 1e-6);
        assert.inDelta(groups[1].value, 70, 1e-6);

        assert.equal(groups[2].index, 2);
        assert.inDelta(groups[2].startAngle, 2.736046966444487, 1e-6);
        assert.inDelta(groups[2].endAngle, 4.358229715025709, 1e-6);
        assert.inDelta(groups[2].value, 80, 1e-6);

        assert.equal(groups[3].index, 3);
        assert.inDelta(groups[3].startAngle, 4.408229715025709, 1e-6);
        assert.inDelta(groups[3].endAngle, 6.2331853071795855, 1e-6);
        assert.inDelta(groups[3].value, 90, 1e-6);
      },
      "computes edges": function(translocation) {
        var edges = translocation.edges();
        assert.equal(edges.length, 4);

        assert.equal(edges[0].source.index, 0);
        assert.inDelta(edges[0].source.startAngle, 0.20277284357265285, 1e-6);
        assert.inDelta(edges[0].source.endAngle, 0.3041592653589793, 1e-6);
        assert.equal(edges[0].source.value, 10);
        assert.equal(edges[0].source.width, 5);
        assert.equal(edges[0].target.index, 1);
        assert.inDelta(edges[0].target.startAngle, 1.5707963267948966, 1e-6);
        assert.inDelta(edges[0].target.endAngle, 1.672182748581223, 1e-6);
        assert.equal(edges[0].target.value, 15);
        assert.equal(edges[0].target.width, 5);
        assert.equal(Object.keys(edges[0].attributes).length, 1);
        assert.equal(edges[0].attributes.name, "test");

        assert.equal(edges[1].source.index, 3);
        assert.inDelta(edges[1].source.startAngle, 4.813775402171015, 1e-6);
        assert.inDelta(edges[1].source.endAngle, 5.016548245743667, 1e-6);
        assert.equal(edges[1].source.value, 20);
        assert.equal(edges[1].source.width, 10);
        assert.equal(edges[1].target.index, 2);
        assert.inDelta(edges[1].target.startAngle, 3.242979075376119, 1e-6);
        assert.inDelta(edges[1].target.endAngle, 3.3443654971624457, 1e-6);
        assert.equal(edges[1].target.value, 25);
        assert.equal(edges[1].target.width, 5);
        assert.equal(Object.keys(edges[1].attributes).length, 0);

        assert.equal(edges[2].source.index, 2);
        assert.inDelta(edges[2].source.startAngle, 3.3443654971624457, 1e-6);
        assert.inDelta(edges[2].source.endAngle, 3.4051973502342414, 1e-6);
        assert.equal(edges[2].source.value, 30);
        assert.equal(edges[2].source.width, 3);
        assert.equal(edges[2].target.index, 2);
        assert.inDelta(edges[2].target.startAngle, 3.6485247625214248, 1e-6);
        assert.inDelta(edges[2].target.endAngle, 3.7499111843077513, 1e-6);
        assert.equal(edges[2].target.value, 45);
        assert.equal(edges[2].target.width, 5);
        assert.equal(Object.keys(edges[2].attributes).length, 1);
        assert.equal(edges[2].attributes.date, "august");

        assert.equal(edges[3].source.index, 1);
        assert.inDelta(edges[3].source.startAngle, 2.0777284357265287, 1e-6);
        assert.inDelta(edges[3].source.endAngle, 2.3818877010855077, 1e-6);
        assert.equal(edges[3].source.value, 40);
        assert.equal(edges[3].source.width, 15);
        assert.equal(edges[3].target.index, 0);
        assert.inDelta(edges[3].target.startAngle, 0.709704952504285, 1e-6);
        assert.inDelta(edges[3].target.endAngle, 0.8110913742906114, 1e-6);
        assert.equal(edges[3].target.value, 35);
        assert.equal(edges[3].target.width, 5);
        assert.equal(Object.keys(edges[3].attributes).length, 0);
      }
    }
  }
});

suite.export(module);
