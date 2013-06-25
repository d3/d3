var d3_event_dragSelect = d3_vendorSymbol(d3_documentElement.style, "userSelect");

function d3_event_dragSuppress(type) {
  var w = d3.select(d3_window).on("selectstart." + type, d3_eventPreventDefault).on("dragstart." + type, d3_eventPreventDefault),
      style = d3_documentElement.style,
      select = style[d3_event_dragSelect];
  style[d3_event_dragSelect] = "none";
  return function(suppressClick) {
    w.on("selectstart." + type, null).on("dragstart." + type, null);
    style[d3_event_dragSelect] = select;
    if (suppressClick) d3_eventSuppress(w, "click." + type);
  };
}
