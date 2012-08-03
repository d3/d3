require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("selection.insertInOrder");

var identity = function(d) {return d;};

suite.addBatch({
  "selectAll(div).data(…).enter()": {
    topic: function() {
      return d3.select("body");
    },
    "inserts properly even if there are no existing nodes in the DOM": function(body) {
      var div = body.html("").selectAll("div").data(d3.range(3)).enter().insertInOrder("div").attr("class", identity);
      assert.equal(div.length, 1);
      assert.equal(div[0].length, 3);
      assert.domEqual(div[0][0], document.body.firstChild);
      assert.domEqual(div[0][1].previousSibling, div[0][0]);
      assert.domEqual(div[0][2], document.body.lastChild);
    },
    "inserts new nodes in order": function(body) {
      body.html("").selectAll("div").data([2,3,5], identity).enter().insertInOrder("div").attr("class", identity);
      body.selectAll("div").data([1,2,3,4,5,6], identity).enter().insertInOrder("div").attr("class", identity);

      assert.equal(document.body.childNodes.length, 6);
      assert.equal(document.body.childNodes[0].__data__, 1);
      assert.equal(document.body.childNodes[1].__data__, 2);
      assert.equal(document.body.childNodes[2].__data__, 3);
      assert.equal(document.body.childNodes[3].__data__, 4);
      assert.equal(document.body.childNodes[4].__data__, 5);
      assert.equal(document.body.childNodes[5].__data__, 6);
    },
    "it works properly in nested selections": function(body) {
      var table = body.html("").append("table");
      var tableNode = table[0][0];
      var rows  = table.selectAll("tr").data([[1,3], [2], [1,2,3]]).enter().insertInOrder("tr").attr("class", identity);
      var cells = rows.selectAll("td").data(identity, identity).enter().insertInOrder("td").attr("class", identity);

      assert.equal(tableNode.childNodes.length, 3);
      assert.deepEqual(tableNode.childNodes[0].__data__, [1,3]);
      assert.deepEqual(tableNode.childNodes[1].__data__, [2]);
      assert.deepEqual(tableNode.childNodes[2].__data__, [1,2,3]);
      assert.equal(tableNode.childNodes[0].childNodes.length, 2);
      assert.equal(tableNode.childNodes[0].childNodes[0].__data__, 1);
      assert.equal(tableNode.childNodes[0].childNodes[1].__data__, 3);
      assert.equal(tableNode.childNodes[1].childNodes.length, 1);
      assert.equal(tableNode.childNodes[1].childNodes[0].__data__, 2);
      assert.equal(tableNode.childNodes[2].childNodes.length, 3);
      assert.equal(tableNode.childNodes[2].childNodes[0].__data__, 1);
      assert.equal(tableNode.childNodes[2].childNodes[1].__data__, 2);
      assert.equal(tableNode.childNodes[2].childNodes[2].__data__, 3);

      rows = table.selectAll("tr").data([[1,2,3], [2,3], [1,2,3]])
      rows.enter().insertInOrder("tr");
      rows.selectAll("td").data(identity, identity).enter().insertInOrder("td").attr("class", identity);

      assert.equal(document.body.childNodes.length, 1);
      assert.equal(tableNode.childNodes.length, 3);
      assert.deepEqual(tableNode.childNodes[0].__data__, [1,2,3]);
      assert.deepEqual(tableNode.childNodes[1].__data__, [2,3]);
      assert.deepEqual(tableNode.childNodes[2].__data__, [1,2,3]);
      assert.equal(tableNode.childNodes[0].childNodes.length, 3);
      assert.equal(tableNode.childNodes[0].childNodes[0].__data__, 1);
      assert.equal(tableNode.childNodes[0].childNodes[1].__data__, 2);
      assert.equal(tableNode.childNodes[0].childNodes[2].__data__, 3);
      assert.equal(tableNode.childNodes[1].childNodes.length, 2);
      assert.equal(tableNode.childNodes[1].childNodes[0].__data__, 2);
      assert.equal(tableNode.childNodes[1].childNodes[1].__data__, 3);
      assert.equal(tableNode.childNodes[2].childNodes.length, 3);
      assert.equal(tableNode.childNodes[2].childNodes[0].__data__, 1);
      assert.equal(tableNode.childNodes[2].childNodes[1].__data__, 2);
      assert.equal(tableNode.childNodes[2].childNodes[2].__data__, 3);
    },
    "it is only exposed on enter() selections": function(body) {
      assert.equal(typeof body.html("").insertInOrder, "undefined");
    },
    "it supports functions that synthesize a new node": function(body) {
      var div = body.html("").selectAll("div").data([12,27,2]).enter().insertInOrder(
        function(d, i) {
          var node = document.createElement("div");
          node.className = "" + d + "-" + i;
          return node;
        }
      );

      assert.equal(div.length, 1);
      assert.equal(div[0].length, 3);
      assert.domEqual(div[0][0], document.body.firstChild);
      assert.domEqual(div[0][1].previousSibling, div[0][0]);
      assert.domEqual(div[0][2], document.body.lastChild);
      assert.equal(div[0][0].className, "12-0");
      assert.equal(div[0][1].className, "27-1");
      assert.equal(div[0][2].className, "2-2");
    }
  }
});

suite.export(module);
