import "../core/document";
import "../core/vendor";
import "../selection/on";

var d3_event_dragSelect,
    d3_event_dragId = 0;

function d3_event_dragSuppress(node) {
  var name = ".dragsuppress-" + ++d3_event_dragId,
      click = "click" + name,
      w = d3.select(d3_window(node))
          .on("touchmove" + name, d3_eventPreventDefault)
          .on("dragstart" + name, d3_eventPreventDefault)
          .on("selectstart" + name, d3_eventPreventDefault);

  if (d3_event_dragSelect == null) {
    d3_event_dragSelect = "onselectstart" in node ? false
        : d3_vendorSymbol(node.style, "userSelect");
  }

  if (d3_event_dragSelect) {
    var style = d3_documentElement(node).style,
        select = style[d3_event_dragSelect];
    style[d3_event_dragSelect] = "none";
  }

  return function(suppressClick) {
    w.on(name, null);
    if (d3_event_dragSelect) style[d3_event_dragSelect] = select;
    if (suppressClick) { // suppress the next click, but only if it’s immediate
      var off = function() { w.on(click, null); };
      w.on(click, function() { d3_eventPreventDefault(); off(); }, true);
      setTimeout(off, 0);
    }
  };
}
