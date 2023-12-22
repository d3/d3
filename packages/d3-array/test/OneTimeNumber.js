export function OneTimeNumber(value) {
  this.value = value;
}

OneTimeNumber.prototype.valueOf = function() {
  var v = this.value;
  this.value = NaN;
  return v;
};
