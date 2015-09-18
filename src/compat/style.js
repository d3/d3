import "../core/document";

// Redefine style.setProperty et al. if the browser doesn’t coerce arguments.
if (d3_document) {
  try {
    d3_document.createElement("DIV").style.setProperty("opacity", 0, "");
  } catch (error) {
    var d3_element_prototype = this.Element.prototype,
        d3_element_setAttribute = d3_element_prototype.setAttribute,
        d3_element_setAttributeNS = d3_element_prototype.setAttributeNS,
        d3_style_prototype = this.CSSStyleDeclaration.prototype,
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
}
