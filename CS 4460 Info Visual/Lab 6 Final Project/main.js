var margin = { top: 10, right: 10, bottom: 30, left: 0 };
var width = 700 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;
var barBand;
var barWidth;

var data;
var yScale2;
var yAxis2;

d3.csv("TransportationFatalities_ByYear_postoncanvas.csv", function (csv) {
  data = csv;

  for (var i = 0; i < csv.length - 1; ++i) {
    //console.log(csv[i])
    csv[i].Year = Number(csv[i].Year)
    csv[i].Population = Number(csv[i].Population)
    csv[i].Car_Occupant = Number(csv[i].Car_Occupant);
    csv[i].Pedestrian = Number(csv[i].Pedestrian);
    csv[i].Motorcycle = Number(csv[i].Motorcycle);
    csv[i].Bicycle = Number(csv[i].Bicycle);
    csv[i].Trucks = Number(csv[i].Trucks)
    csv[i].Total = Number(csv[i].Total)
  }

  console.log(csv);

  // Functions used for scaling axes +++++++++++++++
  var yearExtent = d3.extent(csv, function (row) {
    return row.Year;
  });
  var carExtent = d3.extent(csv, function (row) {
    return row.Car_Occupant;
  });
  var pedExtent = d3.extent(csv, function (row) {
    return row.Pedestrian;
  });
  var motExtent = d3.extent(csv, function (row) {
    return row.Motorcycle;
  });
  var bicExtent = d3.extent(csv, function (row) {
    return row.Bicycle;
  });
  var truckExtent = d3.extent(csv, function (row) {
    return row.Trucks;
  });
  var totalExtent = d3.extent(csv, function (row) {
    return row.Total;
  });
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  var legend = d3.select("#chart3");

  var lowCentry1 = d3
    .select("#centry1")
    .append("circle")
    .attr("transform", "translate(10, 6)")
    .style("opacity", 0.7)
    .style("stroke", "black")
    .attr("r", 5)
    .style("fill", "#F2898F")

  var lowCentry2 = d3
    .select("#centry2")
    .append("circle")
    .attr("transform", "translate(10, 6)")
    .style("opacity", 0.7)
    .style("stroke", "black")
    .attr("r", 5)
    .style("fill", "#FF1F3A")

  var lowCentry3 = d3
    .select("#centry3")
    .append("circle")
    .attr("transform", "translate(10, 6)")
    .style("opacity", 0.7)
    .style("stroke", "black")
    .attr("r", 5)
    .style("fill", "#8C0200")


  /************* Chart 1 ****************/
  var div = d3.select("#chart1").append("div")
    .attr("class", "tooltip")
    .style("display", "none");

  // Axis setup
  var xScale1_year = d3.scaleLinear().domain(yearExtent).range([60, 1218]);

  var yScale1_total = d3.scaleLinear().domain(totalExtent).range([height, 30]);
  var yAxis1_total = d3.axisLeft().scale(yScale1_total);

  //Create SVGs for charts
  var chart1 = d3
    .select("#chart1")
    .append("svg:svg")
    .attr("id", "svg1")
    .attr("width", 1230)
    .attr("height", 650)
    .attr("transform", "translate(" + 20 + "," + 0 + ")");

  //Labels for Charts
  var title1 = d3
    .select("#svg1")
    .append("text")
    .attr("class", "title")
    .attr("x", 1200 / 2 - 100)
    .attr("y", 15)
    .attr("font-size", "12px")
    .text("Total Number of Deaths by Year");

  //Labels for Axes
  var xLabel1 = d3
    .select("#svg1")
    .append("text")
    .attr("x", 1200 / 2 - 20)
    .attr("y", 610)
    .attr("font-size", "12px")
    .text("Year");

  var yLabel1 = d3
    .select("#svg1")
    .append("text")
    .attr("x", -width / 2 + 70)
    .attr("y", 9)
    .attr("font-size", "12px")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .text("Total Deaths");

  // bar graph set up
  barBand = 1200 / csv.length;
  barWidth = 0.7 * barBand;

  var tooltip = d3.select("#chart1")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden");

  chart1.selectAll('circle').data(csv)
    .enter()
    .append('circle')
    .attr("cx", function (d) { return xScale1_year(d.Year); })
    .attr("cy", function (d) { return yScale1_total(d.Total); })
    .attr("r", 5)
    .style("fill", "#69b3a2")
    .on("mouseover", function (d) {
      tooltip.text("Total Deaths: " + d.Total + " | Year:" + d.Year);
      d3.select(this).transition()
        .duration('100')
        .style('opacity', 0.35)
      div.transition()
        .duration('100')
        .style("opacity", 0.35);
      return tooltip.style("visibility", "visible");
    })
    .on("mousemove", function () { return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px"); })
    .on("mouseout", function () {
      d3.select(this).transition()
        .duration('100')
        .style('opacity', 0.9)
      div.transition()
        .duration('100')
        .style("opacity", 1);
      return tooltip.style("visibility", "hidden");
    });

  var line_chart1 = d3.line()
    .x(function (d) { return xScale1_year(d.Year); })
    .y(function (d) { return yScale1_total(d.Total); })
    .curve(d3.curveMonotoneX)

  chart1.append("path")
    .datum(csv)
    .attr("d", line_chart1)
    .style("fill", "none")
    .style("stroke", "#69b3a2")
    .style("stroke-width", "1.5");

  //Chart1 call(xAxis)
  chart1
    .append("g")
    .attr("transform", "translate(0," + (height + 10) + ")")
    .call(d3.axisBottom(xScale1_year).tickFormat(function (d) {
      return d;
    }));

  //Chart1 call(yAxis)
  chart1
    .append("g")
    .attr("transform", "translate(60, 10)")
    .call(yAxis1_total)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 10)
    .attr("dy", ".71em")
    .style("text-anchor", "end");
  /*************** End of Chart1 ***************/



  /************* Chart 2 ****************/
  var div = d3.select("#chart2").append("div")
    .attr("class", "tooltip2")
    .style("display", "none");

  var tooltip2 = d3.select("#chart2")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden");

  var xScale2_car = d3.scaleLinear().domain(carExtent).range([70, width]);
  yScale2 = d3.scaleLinear().domain(pedExtent).range([height, 30]);

  var xAxis2_car = d3.axisBottom().scale(xScale2_car);
  yAxis2 = d3.axisLeft().scale(yScale2);

  //Create SVGs for charts
  var chart2 = d3
    .select("#chart2")
    .append("svg:svg")
    .attr("id", "svg2")
    .attr("width", 900)
    .attr("height", 600)
    .attr("transform", "translate(" + 20 + "," + 0 + ")");

  //Labels for Charts
  var title2 = d3
    .select("#svg2")
    .append("text")
    .attr("class", "title")
    .attr("x", width / 2 - 80)
    .attr("y", 12)
    .attr("font-size", "12px")
    .text("Number of Deaths From Car vs Other Transportation");

  //Labels for Axes
  var xLabel2 = d3
    .select("#svg2")
    .append("text")
    .attr("x", width / 2)
    .attr("y", 595)
    .attr("font-size", "12px")
    .text("Car");

  var yLabel2 = d3
    .select("#svg2")
    .append("text")
    .attr("class", "yLabel2")
    .attr("x", -width / 2 + 50)
    .attr("y", 9)
    .attr("font-size", "12px")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .text("Pedestrians");

  var value = -1;

  d3.select("#transportSelect").on("change", function () {
    value = document.getElementById("transportSelect").value;
    if (value == 0) {
      updateChart(pedExtent, value)
    } else if (value == 1) {
      updateChart(motExtent, value)
    } else if (value == 2) {
      updateChart(bicExtent, value)
    } else {
      updateChart(truckExtent, value)
    }
  })

  var circle2 = chart2.selectAll('circle').data(csv)
    .enter()
    .append('circle')
    //.attr('class', 'circles')
    .attr('cx', function (d) { return xScale2_car(d.Car_Occupant); })
    .attr('cy', function (d) { return yScale2(d.Pedestrian); })
    .attr('r', 5)
    .style('fill', function (d) {
      if (d.Year <= 1990) {
        return '#F2898F';
      } else if (d.Year > 1990 && d.Year < 2005) {
        return '#FF1F3A';
      } else {
        return "#8C0200";
      }
    })
    .style('stroke', 'black')
    .style("opacity", 0.7)
    .on("mouseover", function (d) {
      tooltip2.text("Year: " + d.Year);
      d3.select(this).transition()
        .duration('100')
        .style('opacity', 0.35)
      div.transition()
        .duration('100')
        .style("opacity", 0.35);
      return tooltip2.style("visibility", "visible");
    })
    .on("mousemove", function () { return tooltip2.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px"); })
    .on("mouseout", function () {
      d3.select(this).transition()
        .duration('100')
        .style('opacity', 0.7)
      div.transition()
        .duration('100')
        .style("opacity", 0.7);
      return tooltip2.style("visibility", "hidden");
    });

  //Chart2 call(xAxis)
  chart2
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis2_car) // call the axis generator
    .append("text")
    .attr("class", "label")
    .attr("x", width - 16)
    .attr("y", -6)
    .style("text-anchor", "end");

  //Chart2 call(yAxis)
  chart2
    .append("g")
    .attr("transform", "translate(70, 0)")
    .attr("class", "yAxis2")
    .call(yAxis2)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end");

  function updateChart(acceptedValue, value) {
    yScale2 = d3.scaleLinear().domain(acceptedValue).range([height, 30]);
    var new_yAxis2 = d3.axisLeft().scale(yScale2);

    var new_yLabel2 = d3.select("#svg2").selectAll("text.yLabel2")
      .attr("x", -width / 2 + 50)
      .attr("y", 9)
      .attr("font-size", "12px")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .text(function (d) {
        if (value == 0) {
          return "Pedestrian";
        } else if (value == 1) {
          return "Motorcycle";
        } else if (value == 2) {
          return "Bicycle";
        } else {
          return "Trucks";
        }
      });

    chart2.selectAll(".yAxis2").call(new_yAxis2);

    var circles = d3.select("#chart2").selectAll("circle").data(csv);
    circles.enter().append("circle");

    circles.attr('cx', function (d) { return xScale2_car(d.Car_Occupant); })
      .attr('cy', function (d) {
        if (value == 0) {
          return yScale2(d.Pedestrian);
        } else if (value == 1) {
          return yScale2(d.Motorcycle);
        } else if (value == 2) {
          return yScale2(d.Bicycle)
        } else {
          return yScale2(d.Trucks);
        }
      })
      .attr('r', 5)
      .style('fill', function (d) {
        if (d.Year <= 1990) {
          return '#F2898F';
        } else if (d.Year > 1990 && d.Year < 2005) {
          return '#FF1F3A';
        } else {
          return "#8C0200";
        }
      })
      .style('stroke', 'black')
      .style("opacity", 0.7);

    circles.exit().remove();
  }
  /*************** End of Chart2 ***************/

});