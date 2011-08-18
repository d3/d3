var jsdom = require("jsdom");

document.createRange = function() {
  return {
    selectNode: function() {},
    createContextualFragment: function(html) { return jsdom.jsdom(html); }
  };
};
