import "../format/collapse";
import "../format/requote";
import "selection";

d3_selectionPrototype.addClass = function(name) {
  this.each(function(){
    if (! new RegExp('(\\s|^)' + name + '(\\s|$)').test( this.classList ) )
      this.classList.add(name);
    });
  };
