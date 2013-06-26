import "../core/document";
import "../core/vendor";
import "../selection/on";

var d3_event_dragSelect = d3_vendorSymbol(d3_documentElement.style, "userSelect");

function d3_event_dragSuppress(type) {
  var selectstart = "selectstart." + type,
      dragstart = "dragstart." + type,
      click = "click." + type,
      w = d3.select(d3_window).on(selectstart, d3_eventPreventDefault).on(dragstart, d3_eventPreventDefault),
      style = d3_documentElement.style,
      select = style[d3_event_dragSelect];
  style[d3_event_dragSelect] = "none";
  return function(suppressClick) {
    w.on(selectstart, null).on(dragstart, null);
    style[d3_event_dragSelect] = select;
    if (suppressClick) { // suppress the next click, but only if it’s immediate
      function off() { w.on(click, null); }
      w.on(click, function() { d3_eventPreventDefault(); off(); }, true);
      setTimeout(off, 0);
    }
  };
}
