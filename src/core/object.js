if (!Object.create) Object.create = function(o) {
  /** @constructor */ function f() {}
  f.prototype = o;
  return new f();
};
