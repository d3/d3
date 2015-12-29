<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>No. Of Victims</title>
	<script src="http://labratrevenge.com/d3-tip/javascripts/d3.tip.v0.6.3.js"></script> 
    <link rel="stylesheet" href="normalize.css">
    <style>
	  .tooltip{
position: absolute;	
  text-align: center;	
  width: 13%;	
  height:10%;		
  padding: 2vw;	
  font: 1.2vw sans-serif;		
  border: 0px;					
  border-radius: 8px;
  color:black;
  box-shadow: -3px 3px 15px #888888;
  opacity:0;	

}
</style>
<body>
<script src="http://d3js.org/d3.v3.min.js"></script>
<div id = "svgContent"></div>

<script>
var data = [{"age":"Below 6 years","population":511},
            {"age":"6 yrs & Above – Below 12 yrs","population":394},
            {"age":"12 yrs & Above –Below 16 yrs","population":429},
            {"age":"16 yrs & Above – Below 18 yrs","population":568},
            {"age":"18 yrs & Above – Below 30 yrs","population":13117},          
			{"age":"30 yrs & Above – Below 45 yrs","population":13094},
            {"age":"45 yrs & Above – Below 60 yrs","population":5225},
            {"age":"60 yrs & Above","population":1116}];
var margin = {top:40,left:40,right:40,bottom:40};
width = 300;
height = 300;
radius = Math.min(width-100,height-100)/2;
var color = d3.scale.category10();
var arc = d3.svg.arc()  
         .outerRadius(radius -230)
         .innerRadius(radius - 50)
		 .cornerRadius(20);
var arcOver = d3.svg.arc()  
.outerRadius(radius +50)
.innerRadius(0);

var a=width/2 - 20;
var b=height/2 - 90;
var svg = d3.select("#svgContent").append("svg")
          .attr("viewBox", "0 0 " + width + " " + height/2)
    .attr("preserveAspectRatio", "xMidYMid meet")
          .append("g")
          .attr("transform","translate("+a+","+b+")");

		  div = d3.select("body")
.append("div") 
.attr("class", "tooltip");
var pie = d3.layout.pie()
          .sort(null)
          .value(function(d){return d.population;})
		  .padAngle(.02);
var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class","arc")
         .on("mousemove",function(d){
        	var mouseVal = d3.mouse(this);
        	div.style("display","none");
        	div
        	.html("Age:"+d.data.age+"</br>"+"No. of Victims:"+d.data.population)
            .style("left", (d3.event.pageX+12) + "px")
            .style("top", (d3.event.pageY-10) + "px")
            .style("opacity", 1)
            .style("display","block");
        })
        .on("mouseout",function(){div.html(" ").style("display","none");});
        
        
        
		g.append("path")
		.attr("d",arc)
		.style("fill",function(d){return color(d.data.age);})
		 .attr("d", arc);;
/*
		            svg.selectAll("text").data(pie(data)).enter()
		             .append("text")
		             .attr("class","label1")
		             .attr("transform", function(d) {
		      		   var dist=radius+15;
		    		   var winkel=(d.startAngle+d.endAngle)/2;
		    		   var x=dist*Math.sin(winkel)-4;
		    		   var y=-dist*Math.cos(winkel)-4;
		    		   
		    		   return "translate(" + x + "," + y + ")";
		            })
		            .attr("dy", "0.35em")
		            .attr("text-anchor", "middle")
		            
		    	    .text(function(d){
		    	      return d.value;
		    	    });
		    	    
		    	   
		
*/
</script>


</body>
</html>
