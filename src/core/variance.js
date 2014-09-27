d3.variance = function(array, f) {
	var n = array.length,
			m = 0,
			a,
			d,
			s = 0,
			i = -1,
			j = 0;
	if(n < 2) return undefined;
	if (arguments.length === 1) {
		while (++i < n){
			if (d3_number(a = array[i])){
				++j;
				d = a - m;
				m = m + (d/j);
				s = s + d * (a -m);
			}
		}
	} else {
		while (++i < n){
			if (d3_number(a = f.call(array, array[i], i))){
				++j;
				d = a - m;
				m = m + (d/j);
				s = s + d * (a -m);
			}
		}
	}
	return j ? (s / (j-1)) : undefined;
};
