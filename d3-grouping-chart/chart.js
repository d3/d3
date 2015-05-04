function Chart(width, height, id) {
	
	this.data = {};
	
	this.margin = {top: 20, right: 0, bottom:30, left: 40};
	
	this.width = width - this.margin.right - this.margin.left;
	this.height = height - this.margin.top - this.margin.bottom;
	
	this.x = d3.scale.ordinal().rangeRoundBands([0, this.width], .1);
	this.y = d3.scale.linear().range([this.height, 0]);
	
	this.xAxis = d3.svg.axis().scale(this.x).orient('bottom');
	this.yAxis = d3.svg.axis().scale(this.y).orient('left').ticks(10);
	
	this.container = d3.select(id);
	this.svg = [];
	
	this.colorScale = d3.scale.ordinal();
	//set range of colors for colorScale
	this.colorScale.range(["#C3C3C3", "#96B566",  "#7C7C7C", "#BCE27F", "#F6FF97"]);
}

Chart.render = function(json, chart, c) {
	
	// Remove any previous svg/chart element
	chart.container.selectAll('svg').remove();
	
	chart.svg = chart.container.append('svg')
			 .attr('width', chart.width + chart.margin.right + chart.margin.left)
			 .attr('height', chart.height + chart.margin.top + chart.margin.bottom)
			 .style('background-color', '');//#efefef
		
	chart.data = json;
	
	// --------------------------------------
	// x-y scales - based on data volume
	// --------------------------------------
	
	// x-scale:
	chart.x.domain(chart.data.map(function(d) { return d.name; }));

	//retrieve all values in array
	var items = [];
	for (var i = 0, len1 = json.length; i < len1; i++) {
		for (var j = 0, len2 = json[i].value.length; j < len2; j++) {
			items = items.concat(d3.values(json[i].value[j]));	
		}
	}

	// y-scale:
	chart.y.domain([0, d3.max(items)]);
	
	// --------------------------------------
	
	
	// Color Scheme domain for rectangles
	// --------------------------------------
	
	var domain = [];
	
	for (var i = 0, len = chart.data[0].value.length; i < len; i++) {
		domain.push(i);
	}
	
	chart.colorScale.domain(domain);
	
	// --------------------------------------
	
	var g = chart.svg.append('g')
			.attr("transform", "translate(" + chart.margin.left + "," + chart.margin.top + ")");

	//group x axis
	g.append("g")
      	.attr("class", "x axis")
      	.attr("transform", "translate(0," + chart.height + ")")
      	.call(chart.xAxis);

	//group y axis
	g.append("g")
	.attr("class", "y axis")
      	.call(chart.yAxis)
     	.append('text')
      	.attr("transform", "rotate(-90)")
      	.attr("y", 6)
      	.attr("dy", ".71em")
      	.style("text-anchor", "end")
      	.text("Frequency (k)");

	//group bars
	var barsContainer = g.append("g").attr('id', 'bars');

	//Data join - Append g elements to the bars element
	var bars = barsContainer.selectAll('g')
		.data(chart.data);
		
	bars.enter().append('g')
		.attr('transform', function(d) { return 'translate(' + (chart.x(d.name) + 1) + ',0)'; });
	
	// Create rects based on data
	for (var j = 0, len = json[0].value.length; j < len; j++) {
		
		bars.append('rect')
			.attr('x', function(d) { 
					if (j === 0) return 0; 
					else return (chart.x.rangeBand()/len) * j; 
				})
			.attr('width', chart.x.rangeBand()/len)
			.attr('y', function(d) { return chart.height; })
			.attr('height', 0)
			.attr('fill', 'white')
			.attr('opacity', 0.5)
			.attr('onmouseover', '')
			.transition()
			.delay(function(d, i) { return i * 100; })
			.duration(400)
			.attr('fill', chart.colorScale(j))
			.attr('opacity', 1)
			.attr('y', function(d) { return chart.y(d3.values(d.value[j])); })
			.attr('height', function(d) { return chart.height - chart.y(d3.values(d.value[j])); });
	}
}
