process.env.TZ = "America/Los_Angeles";

var smash = require("smash"),
    jsdom = require("jsdom");

require("./XMLHttpRequest");

module.exports = function() {
  var files = [].slice.call(arguments).map(function(d) { return "src/" + d; }),
      expression = "d3",
      sandbox = {console: console, Date: Date}; // so we can use deepEqual in tests

  files.unshift("test/start");

  function topic() {
    var callback = this.callback;
    smash.load(files, expression, sandbox, function(error, result) {
      if (error) console.trace(error.stack);
      callback(error, result);
    });
  }

  topic.expression = function(_) {
    expression = _;
    return topic;
  };

  topic.sandbox = function(_) {
    sandbox = _;
    return topic;
  };

  topic.document = function(_) {
    var document = jsdom.jsdom();

    // Monkey-patch createRange support to JSDOM.
    document.createRange = function() {
      return {
        selectNode: function() {},
        createContextualFragment: jsdom.jsdom
      };
    };

    sandbox = {
      console: console,
      XMLHttpRequest: XMLHttpRequest,
      document: document,
      window: document.parentWindow,
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
      Date: Date // so we can override Date.now in tests, and use deepEqual
    };

    return topic;
  };

  return topic;
};

process.on("uncaughtException", function(e) {
  console.trace(e.stack);
});
