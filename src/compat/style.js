import "../core/document";

try {
  d3_document.createElement("div").style.setProperty("opacity", 0, "");
} catch (error) {
  var d3_element_prototype = d3_window.Element.prototype,
      d3_element_setAttribute = d3_element_prototype.setAttribute,
      d3_element_setAttributeNS = d3_element_prototype.setAttributeNS,
      d3_style_prototype = d3_window.CSSStyleDeclaration.prototype,
      d3_style_setProperty = d3_style_prototype.setProperty;
  d3_element_prototype.setAttribute = function(name, value) {
    d3_element_setAttribute.call(this, name, value + "");
  };
  d3_element_prototype.setAttributeNS = function(space, local, value) {
    d3_element_setAttributeNS.call(this, space, local, value + "");
  };
  d3_style_prototype.setProperty = function(name, value, priority) {
    d3_style_setProperty.call(this, name, value + "", priority);
  };
}
