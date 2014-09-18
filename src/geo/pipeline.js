import "geo";

d3.geo.pipeline = function() {
  var pipes = [];
  return {
    source: function() {
      pipes[0] = arguments;
      return this;
    },
    pipe: function() {
      pipes.push(arguments);
      return this;
    },
    sink: function() {
      var source = arguments[0].apply(null, [].slice.call(arguments, 1)),
          sink = source,
          pipe;
      while (pipe = pipes.pop()) {
        var args = [].slice.call(pipe, 1);
        args.push(source);
        source = pipe[0].apply(null, args);
      }
      return function() {
        source.apply(this, arguments);
        return sink.value && sink.value();
      };
    }
  };
};
