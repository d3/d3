process.env.TZ = "America/Los_Angeles";

var smash = require("smash"),
    jsdom = require("jsdom"),
    version = require("../package.json").version;

require("./XMLHttpRequest");

module.exports = function() {
  var files = [].slice.call(arguments).map(function(d) { return "src/" + d; }),
      expression = "d3",
      sandbox = {VERSION: version};

  files.unshift("src/start");
  files.push("src/end");

  function topic() {
    smash.load(files, expression, sandbox, this.callback);
  }

  topic.expression = function(_) {
    expression = _;
    return topic;
  };

  topic.document = function(_) {
    var document = jsdom.jsdom("<html><head></head><body></body></html>");

    // Monkey-patch createRange support to JSDOM.
    document.createRange = function() {
      return {
        selectNode: function() {},
        createContextualFragment: jsdom.jsdom
      };
    };

    sandbox = {
      VERSION: version,
      console: console,
      XMLHttpRequest: XMLHttpRequest,
      document: document,
      window: document.createWindow(),
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
      Date: Date // so we can override Date.now in tests
    };

    return topic;
  };

  return topic;
};

process.on("uncaughtException", function(e) {
  console.trace(e.stack);
});
