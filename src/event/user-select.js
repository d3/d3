import "../core/document";
import "../core/vendor";
import "event";

var d3_event_userSelectProperty = d3_vendorSymbol(d3_documentElement.style, "userSelect"),
    d3_event_userSelectSuppress = d3_event_userSelectProperty
      ? function() {
          var style = d3_documentElement.style,
              select = style[d3_event_userSelectProperty];
          style[d3_event_userSelectProperty] = "none";
          return function() { style[d3_event_userSelectProperty] = select; };
        }
      : function(type) {
          var w = d3.select(d3_window).on("selectstart." + type, d3_eventCancel);
          return function() { w.on("selectstart." + type, null); };
        };
