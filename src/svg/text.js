d3.svg.textWrap = function() {

  // general setup
  var default_bounds = {x: 0, y: 0, width: 960, height: 500},
      padding = 0,
      bounds = default_bounds,
      arg,
      arg_int,
      y_offset = 0,
      line_height;
                    
  var textWrap = function(text_selection) {
  
    var text_node = text_selection.node(),
        text_node_height = text_node.getBBox().height,
        text_node_width = text_node.getBBox().width,
        text_content = text_selection.text(),
        words = text_content.split(' '),
        word,
        styled_line_height = text_selection.style('line-height'),
        line = [],
        lines = [],
        line_previous,
        line_next,
        text_y = text_selection.attr("y") || 0,
        line_dy,
        test_tspan;
        
    // only wrap if it actually overflows                              
    if (text_node_width > bounds.width) {

      // determine line height from styling or computed text dimensions
      if (
          (styled_line_height) &&
          (parseInt(styled_line_height, 10))
      ) {
          line_height = parseInt(styled_line_height.replace('px', ''), 10);
      } else {
          line_height = text_node_height;
      }

      // clear out initial text
      text_selection.text(null);
      
      // use a dummy tspan to check computed length for each
      // additional word and built an array of lines that fit
      test_tspan = text_selection.append('tspan');
      for (var i = 0; i < words.length; i++) {
        word = words[i];
        line_previous = line_next;
        line.push(word);
        line_next = line.join(' ');
        test_tspan.text(line_next);
        if (text_node.getComputedTextLength() >= bounds.width) {
          lines.push(line_previous);
          line = [word];
          line_next = word;
        } else if (i == words.length) {
          lines.push(line_next);
        }
        test_tspan.text('');
      }
      test_tspan.remove();
      
      // append each line as a tspan
      for (var j = 0; j < lines.length; j++) {
        line_dy = j * line_height;
        // only append the line if it doesn't overflow the bounds
        // line height is slightly expanded to account for characters
        // with descenders, but the height may vary between fonts.
        if (text_node.getBBox().height + (line_height * 1.25) < bounds.height) {
          text_selection.append('tspan')
            .text(lines[j])
            .attr('x', bounds.x)
            .attr('y', line_height * (j + 1) - bounds.y_offset + bounds.padding);
        }
      }
      
    }

  }
  
  textWrap.bounds = function(_) {
    // if there's no argument, return current bounds
    if (_ == undefined) {
      return bounds;
    } else {
      arg = arguments[0];
      // merge width integer with defaults
      if (typeof arg == 'number') {
        arg_int = parseInt(arg, 10);
        bounds.width = arg_int;
      // allow any object with the necessary coordinates
      } else if (
        (arg.hasOwnProperty('x')) &&
        (arg.hasOwnProperty('y')) &&
        (arg.hasOwnProperty('height')) &&
        (arg.hasOwnProperty('width'))
      ) {
        bounds = arg;
        y_offset = padding - 16;
      // get bounding box for any d3 selection
      } else if (typeof arg.data == 'function') {
        bounds.x = arg[0][0].getBBox().x;
        bounds.y = arg[0][0].getBBox().y;
        bounds.height = arg[0][0].getBBox().height;
        bounds.width = arg[0][0].getBBox().width;
      // if all else fails, use defaults
      } else {
        bounds = default_bounds;
      }
      // adjust wrap boundaries depending on quirks of 
      // the different wrap targets
      if(arg[0]) {
        // shift up if there's a cy attribute
        if(arg[0][0].cy) {
          y_offset = bounds.height / 2;
        // shift down for text nodes
        } else if (arg[0][0].nodeName == 'text') {
          y_offset = arg[0][0].offsetHeight + (arg[0][0].offsetTop * 0.75);
        // for polygons, hard coded as approximately half of 1em because
        // in many cases there isn't a computed offset with which to
        // adjust this dynamically
         } else if (arg[0][0].nodeName == 'polygon') {
           y_offset = -8;
         }        
      }
      bounds.y_offset = y_offset;
    }
    return textWrap;
  }
  
  textWrap.padding = function(_) {
    // if there's no argument, return current padding
    if (typeof _ == 'undefined') {
      return bounds.padding;
    // adjust bounds by padding value
    } else {
      arg_int = parseInt(arguments[0], 10);
      if (typeof arg_int == 'number') {
        bounds.x += arg_int;
        bounds.y += arg_int;
        bounds.width -= (arg_int * 2);
        bounds.height -= (arg_int * 2);
        bounds.padding = arg_int;
        return textWrap;
      }
    }
  }
        
  // return configured function
  return textWrap;

}