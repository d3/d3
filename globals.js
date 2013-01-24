var document = global.document = require("jsdom").jsdom("<html><head></head><body></body></html>"),
    window = global.window = document.createWindow(),
    navigator = global.navigator = window.navigator,
    getComputedStyle = global.getComputedStyle = window.getComputedStyle,
    CSSStyleDeclaration = global.CSSStyleDeclaration = window.CSSStyleDeclaration;

// https://github.com/chad3814/CSSStyleDeclaration/issues/3
var CSSStyleDeclaration_setProperty = CSSStyleDeclaration.prototype.setProperty;
CSSStyleDeclaration.prototype.setProperty = function(name, value, priority) {
  return CSSStyleDeclaration_setProperty.call(this, name + "", value == null ? null : value + "", priority == null ? null : priority + "");
};
