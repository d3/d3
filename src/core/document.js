var d3_document = document,
    d3_documentElement = d3_document.documentElement,
    d3_window = window,
    d3_attr = function(element, name, value) { element.setAttribute(name, value); },
    d3_attrNS = function(element, space, local, value) { element.setAttributeNS(space, local, value); },
    d3_style = function(element, name, value, priority) { element.style.setProperty(name, value, priority); };
