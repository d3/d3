var fs = require("fs"),
    path = require("path"),
    document = require("jsdom").jsdom("<html><head></head><body></body></html>"),
    window = document.createWindow();

// https://github.com/chad3814/CSSStyleDeclaration/issues/3
var CSSStyleDeclaration_prototype = window.CSSStyleDeclaration.prototype,
    CSSStyleDeclaration_setProperty = CSSStyleDeclaration_prototype.setProperty;
CSSStyleDeclaration_prototype.setProperty = function(name, value, priority) {
  return CSSStyleDeclaration_setProperty.call(this, name + "", value == null ? null : value + "", priority == null ? null : priority + "");
};

module.exports = (new Function("window", "document",
  "return " + fs.readFileSync(path.join(__dirname, "d3.js"), "utf-8"))
)(window, document);
