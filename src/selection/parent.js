import "selection";

d3_selectionPrototype.parent = function( ) {
  return this.select(function( ) {
  	return this.parentNode;
  });
};
