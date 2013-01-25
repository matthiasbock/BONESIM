var plotH = 20;
var plotW = 100;

/**
   * Construct the node label column
   * @param {Object} state Current state of the network.
   */
  var createNodesColumn = function(state) {
    var yPos = 0; 
    
    for (i in state) {
      plot.append('svg:text').attr('y', function(d) { return yPos; })
          .attr('dx', 10).attr('dy', 15)
          .text(i)
          .attr('id', 'label' + i);
          
      var width = d3.select('#label' + i).node().getBBox()['width'];
      if (width > plotW)
        plotW = width + 50;
      yPos += plotH;
    }  
    plot.attr('height', yPos + 50);
  }
  
  /**
   * Construct a column with all the states.
   * @param {Object} state Current state of the network.
   */
  var createStateColumn = function(state) {
    var maxColumns = 40;
    
    // Calculate position of the column
    var yPos = 0, xPos = plotW + (iterationCounter % maxColumns) * plotH; 
    var color;
    
    // Replace previous column
    removeStateColumn(iterationCounter - maxColumns);
    
    for (i in state) {
      if (state[i]) color = 'red'; else color = 'green';
      // Add a rectangle of required color
      plot.append('svg:rect').attr('y', function(d) { return yPos; }).attr('x', xPos)
          .attr('height', plotH).attr('width', plotH)
          .attr('fill', color)
          .attr('class', iterationCounter);
      yPos += plotH;
    }  
    // Iteration count text on the bottom
    plot.append('svg:text').attr('y', function(d) { return yPos; }).attr('x', xPos)
          .attr('dx', 5).attr('dy', 15)
          .attr('class', iterationCounter)
          .text(iterationCounter);
    // Add the marker for current iteration
    plot.append('svg:rect').attr('height', yPos).attr('width', 7)
          .attr('id', 'currMarker')
          .attr('x', xPos + plotH);      
  }
  
  /**
   * Delete a column before replacing it.
   * @param {number} index The index of the column to be deleted.
   */
  var removeStateColumn = function(index) {
    $('rect.' + index).remove();
    $('text.' + index).remove();
    d3.selectAll('#currMarker').remove();
  }
  /**
   * Create the Heatmap Plotter. 
   */
  var createPlotter = function() {
    
    if (plot !== null) return;
    
    $('#tabTimeseries > svg').remove();
    
    // Use d3 to create the initial svg with the start states
    plot = d3.select('#tabTimeseries').append('svg:svg');
    createNodesColumn(network.state);
    createStateColumn(network.state);
  };
