(function() {
  if (typeof module === "undefined") self.queue = queue;
  else module.exports = queue;

  queue.version = "0.0.2";

  function queue(parallelism) {
    var queue = {},
        active = 0, // number of in-flight deferrals
        remaining = 0, // number of deferrals remaining
        index = -1, // monotonically-increasing index
        head, tail, // singly-linked list of deferrals
        error = null,
        results = [],
        await = noop;

    if (arguments.length < 1) parallelism = Infinity;

    queue.defer = function() {
      if (!error) {
        var node = arguments;
        node.index = ++index;
        if (tail) tail.next = node, tail = tail.next;
        else head = tail = node;
        ++remaining;
        pop();
      }
      return queue;
    };

    queue.await = function(f) {
      await = f;
      if (!remaining) await(error, results);
      return queue;
    };

    function pop() {
      if (head && active < parallelism) {
        var node = head,
            f = node[0],
            a = Array.prototype.slice.call(node, 1),
            i = node.index;
        if (head === tail) head = tail = null;
        else head = head.next;
        ++active;
        a.push(function(e, r) {
          --active;
          if (error) return;
          if (e) {
            if (remaining) {
              // clearing remaining cancels subsequent callbacks
              // clearing head stops queued tasks from being executed
              // setting error ignores subsequent calls to defer
              await(error = e, remaining = results = head = tail = null);
            }
          } else {
            results[i] = r;
            if (--remaining) pop();
            else await(null, results);
          }
        });
        f.apply(null, a);
      }
    }

    return queue;
  }

  function noop() {}
})();
