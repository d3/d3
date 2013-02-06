var document = global.document = require("jsdom").jsdom("<html><head></head><body></body></html>"),
    window = global.window = document.createWindow();

// https://github.com/chad3814/CSSStyleDeclaration/issues/3
var CSSStyleDeclaration_prototype = window.CSSStyleDeclaration.prototype,
    CSSStyleDeclaration_setProperty = CSSStyleDeclaration_prototype.setProperty;
CSSStyleDeclaration_prototype.setProperty = function(name, value, priority) {
  return CSSStyleDeclaration_setProperty.call(this, name + "", value == null ? null : value + "", priority == null ? null : priority + "");
};
