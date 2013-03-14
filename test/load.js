var smash = require("smash");

module.exports = function() {
  var files = [].slice.call(arguments).map(function(d) { return "src/" + d; }),
      sandbox = null;
  files.unshift("src/start");
  files.push("src/end");

  function topic() {
    smash.load(files, "d3", sandbox, this.callback);
  }

  topic.sandbox = function(_) {
    sandbox = _;
    return topic;
  };

  return topic;
};
