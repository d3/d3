d3.svg.line.variable = function() {
    return d3_svg_lineVariable();
}

function d3_svg_lineVariable() {
    var x = function(d) { return d[0]; },
        y = function(d) { return d[1]; },
        w = 5,
        intpol = "linear",
        t = .7;

    function lineVariable(d) {
        return d.length < 1 ? null :
            d3_svg_lineVariablePoints(this, d, x, y, w, intpol, t) + "Z";
    }

    lineVariable.x = function(v) {
        if(!arguments.length) return x;
        x = v;
        return lineVariable;
    };

    lineVariable.y = function(v) {
        if(!arguments.length) return y;
        y = v;
        return lineVariable;
    };

    lineVariable.w = function(v) {
        if(!arguments.length) return w;
        w = v;
        return lineVariable;
    };

    lineVariable.interpolate = function(v) {
        if (!arguments.length) return intpol;
        intpol = v;
        return lineVariable;
    };

    lineVariable.tension = function(v) {
        if (!arguments.length) return t;
        t = v;
        return lineVariable;
    };

    return lineVariable;
};

function d3_svg_lineVariablePoints(self, d, x, y, w, intpol, t) {
    var spinePoints = [],
        points = [],
        tmpStack = [],
        i = -1,
        n = d.length,
        fx = typeof x === "function",
        fy = typeof y === "function",
        fw = typeof w === "function",
        line = d3.svg.line().interpolate(intpol).tension(t),
        value;

    if(fx && fy) {
        while(++i < n) spinePoints.push([
              x.call(self, value = d[i], i),
              y.call(self, value, i)
        ]);
    } else if(fx) {
        while(++i < n) spinePoints.push([x.call(self, d[i], i), y]);
    } else if(fy) {
        while(++i < n) spinePoints.push([x, y.call(self, d[i], i)]);
    } else {
        while(++i < n) spinePoints.push([x, y]);
    }

    for(i = 0; i < n; i++) {
        var thisx = spinePoints[i][0],
            thisy = spinePoints[i][1],
            width = fw ? w.call(self, d[i], i) : w,
            aleft = Math.PI, aright = 0;
        if(i > 0) {
            var dx = thisx - spinePoints[i-1][0],
                dy = thisy - spinePoints[i-1][1];
            aleft = Math.PI - Math.atan2(dy, dx);
        }
        if(i < n-1) {
            var dx = spinePoints[i+1][0] - thisx,
                dy = thisy - spinePoints[i+1][1];
            aright = Math.atan2(dy, dx);
        }
        var gamma = aleft - aright,
            diff = width/2 / Math.sin(gamma/2),
            aup = aright + gamma/2,
            adown = aup - Math.PI,
            dxup = diff * Math.cos(aup),
            dyup = diff * Math.sin(aup),
            dxdown = diff * Math.cos(adown),
            dydown = diff * Math.sin(adown);
        points.push([thisx + dxup, thisy - dyup]);
        tmpStack.push([thisx + dxdown, thisy - dydown]);
    }
    var line0 = line(points),
        // change moveto to lineto as we are continuing the line
        line1 = line(tmpStack.reverse()).replace("M", "L");

    return line0 + line1;
}
