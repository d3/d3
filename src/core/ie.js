// Is the browser Internet Explorer
var ie = (function()
{
  if (navigator.appName == 'Microsoft Internet Explorer')
  {  
    return true;
  }
  return false;
})();

function setStyleProperty(obj, name, value, priority) {
  if (ie)
    obj.style[name] = value;
  else
    obj.style.setProperty(name, value, priority);
}

function removeStyleProperty(obj, name) {
  if (ie)
    delete obj.style[name];
  else
    obj.style.removeProperty(name);
}                      
