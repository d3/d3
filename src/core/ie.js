// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
var ie = (function getInternetExplorerVersion()
{
  var result = -1; 
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      result = parseFloat( RegExp.$1 );
  }
  return result;
})();

// Does the browser support style.setProperty, IE9 and below don't
var d3_setStyleProperty = (ie > -1) ?
    function(obj, name, value, priority) { obj.style[name] = value; }  :
    function(obj, name, value, priority) { obj.style.setProperty(name, value, priority); };

// Does the browser support style.removeProperty, IE8 and below don't
var d3_removeStyleProperty = (ie > -1 && ie < 9) ?
    function(obj, name) { delete obj.style[name]; }  :
    function(obj, name) { obj.style.removeProperty(name); };

// Does the browser support style.getPropertyValue, IE8 and below don't
var d3_getStylePropertyValue = (ie > -1 && ie < 9) ?
    function(obj, name) { return obj[name]; }  :
    function(obj, name) { return obj.getPropertyValue(name); };

