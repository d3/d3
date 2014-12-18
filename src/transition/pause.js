d3.transition.__paused__ = false;
d3.transition.pause = function() {
	d3.transition.__paused__ = true;
}
d3.transition.resume = function() {
	d3.transition.__paused__ = false;
}
