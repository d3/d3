(function() {
  d3.svg.transform = function(chain) {
    var transforms = [];
    if (chain !== undefined) { transforms.push(chain) }

    function push(kind, args) {
      var n = args.length;

      transforms.push(function() {
        return kind + '(' + (n == 1 && typeof args[0] == 'function'
            ? args[0].apply(this, arr(arguments)) : args) + ')';
      });
    };

    function arr(args) {
      return Array.prototype.slice.call(args);
    }

    var my = function() {
      var that = this,
          args = arr(arguments);

      return transforms.map(function(f) {
        return f.apply(that, args);
      }).join(' ');
    };

    ['translate', 'rotate', 'scale', 'matrix', 'skewX', 'skewY'].forEach(function(t) {
      my[t] = function() {
        push(t, arr(arguments));
        return my;
      };
    });

    return my;
  };
})();
