require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.svg.symbol");

suite.addBatch({
  "symbol": {
    topic: function() {
      return d3.svg.symbol;
    },
    "default symbol is a fixed-size circle": function(symbol) {
      var a = symbol();
      assert.pathEqual(a(), "M0,4.51351666838205A4.51351666838205,4.51351666838205 0 1,1 0,-4.51351666838205A4.51351666838205,4.51351666838205 0 1,1 0,4.51351666838205Z");
    },
    "size accessor specifies shape area in square pixels": function(symbol) {
      var a = symbol().size(Number);
      assert.pathEqual(a(0), "M0,0A0,0 0 1,1 0,0A0,0 0 1,1 0,0Z");
      assert.pathEqual(a(Math.PI), "M0,1A1,1 0 1,1 0,-1A1,1 0 1,1 0,1Z");
      assert.pathEqual(a(4 * Math.PI), "M0,2A2,2 0 1,1 0,-2A2,2 0 1,1 0,2Z");
    },
    "size accessor is passed data and index": function(symbol) {
      var a = symbol().size(function(d, i) { return d.z * 2 + i; });
      assert.pathEqual(a({z: 0}, 0), "M0,0A0,0 0 1,1 0,0A0,0 0 1,1 0,0Z");
      assert.pathEqual(a({z: Math.PI}, 1), "M0,1.5225997130512636A1.5225997130512636,1.5225997130512636 0 1,1 0,-1.5225997130512636A1.5225997130512636,1.5225997130512636 0 1,1 0,1.5225997130512636Z");
      assert.pathEqual(a({z: 4 * Math.PI}, 2), "M0,2.938812646693828A2.938812646693828,2.938812646693828 0 1,1 0,-2.938812646693828A2.938812646693828,2.938812646693828 0 1,1 0,2.938812646693828Z");
    },
    "supports cross symbol type": function(symbol) {
      var a = symbol().type("cross").size(Number);
      assert.pathEqual(a(0), "M0,0H0V0H0V0H0V0H0V0H0V0H0Z");
      assert.pathEqual(a(20), "M-3,-1H-1V-3H1V-1H3V1H1V3H-1V1H-3Z");
    },
    "supports diamond symbol type": function(symbol) {
      var a = symbol().type("diamond").size(Number);
      assert.pathEqual(a(0), "M0,0L0,0 0,0 0,0Z");
      assert.pathEqual(a(10), "M0,-2.9428309563827124L1.6990442448471224,0 0,2.9428309563827124 -1.6990442448471224,0Z");
    },
    "supports square symbol type": function(symbol) {
      var a = symbol().type("square").size(Number);
      assert.pathEqual(a(0), "M0,0L0,0 0,0 0,0Z");
      assert.pathEqual(a(4), "M-1,-1L1,-1 1,1 -1,1Z");
      assert.pathEqual(a(16), "M-2,-2L2,-2 2,2 -2,2Z");
    },
    "supports triangle-down symbol type": function(symbol) {
      var a = symbol().type("triangle-down").size(Number);
      assert.pathEqual(a(0), "M0,0L0,0 0,0Z");
      assert.pathEqual(a(10), "M0,2.0808957251439084L2.4028114141347543,-2.0808957251439084 -2.4028114141347543,-2.0808957251439084Z");
    },
    "supports triangle-up symbol type": function(symbol) {
      var a = symbol().type("triangle-up").size(Number);
      assert.pathEqual(a(0), "M0,0L0,0 0,0Z");
      assert.pathEqual(a(10), "M0,-2.0808957251439084L2.4028114141347543,2.0808957251439084 -2.4028114141347543,2.0808957251439084Z");
    },
    "unknown symbol type defaults to circle": function(symbol) {
      var a = symbol().type(String);
      assert.pathEqual(a(), "M0,4.51351666838205A4.51351666838205,4.51351666838205 0 1,1 0,-4.51351666838205A4.51351666838205,4.51351666838205 0 1,1 0,4.51351666838205Z");
      assert.pathEqual(a("invalid"), "M0,4.51351666838205A4.51351666838205,4.51351666838205 0 1,1 0,-4.51351666838205A4.51351666838205,4.51351666838205 0 1,1 0,4.51351666838205Z");
      assert.pathEqual(a("hasOwnProperty"), "M0,4.51351666838205A4.51351666838205,4.51351666838205 0 1,1 0,-4.51351666838205A4.51351666838205,4.51351666838205 0 1,1 0,4.51351666838205Z");
    },
    "can specify type accessor as a function": function(symbol) {
      var a = symbol().type(String);
      assert.pathEqual(a("circle"), "M0,4.51351666838205A4.51351666838205,4.51351666838205 0 1,1 0,-4.51351666838205A4.51351666838205,4.51351666838205 0 1,1 0,4.51351666838205Z");
      assert.pathEqual(a("cross"), "M-5.366563145999495,-1.7888543819998317H-1.7888543819998317V-5.366563145999495H1.7888543819998317V-1.7888543819998317H5.366563145999495V1.7888543819998317H1.7888543819998317V5.366563145999495H-1.7888543819998317V1.7888543819998317H-5.366563145999495Z");
      assert.pathEqual(a("diamond"), "M0,-7.444838872816797L4.298279727294167,0 0,7.444838872816797 -4.298279727294167,0Z");
      assert.pathEqual(a("square"), "M-4,-4L4,-4 4,4 -4,4Z");
      assert.pathEqual(a("triangle-down"), "M0,5.26429605180997L6.078685485212741,-5.26429605180997 -6.078685485212741,-5.26429605180997Z");
      assert.pathEqual(a("triangle-up"), "M0,-5.26429605180997L6.078685485212741,5.26429605180997 -6.078685485212741,5.26429605180997Z");
    }
  },
  "symbolTypes": {
    topic: function() {
      return d3.svg.symbolTypes;
    },
    "contains circle": function(types) {
      assert.isTrue(types.indexOf("circle") != -1);
    },
    "contains cross": function(types) {
      assert.isTrue(types.indexOf("cross") != -1);
    },
    "contains diamond": function(types) {
      assert.isTrue(types.indexOf("diamond") != -1);
    },
    "contains square": function(types) {
      assert.isTrue(types.indexOf("square") != -1);
    },
    "contains triangle-down": function(types) {
      assert.isTrue(types.indexOf("triangle-down") != -1);
    },
    "contains triangle-up": function(types) {
      assert.isTrue(types.indexOf("triangle-up") != -1);
    }
  }
});

suite.export(module);
