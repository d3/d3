import "../format/collapse";
import "../format/requote";
import "selection";

d3_selectionPrototype.removeClass = function(name) {
    this.each(function(){
      if (new RegExp('(\\s|^)' + name + '(\\s|$)').test( this.classList ) )
        this.classList.remove(name);
    });
  };
