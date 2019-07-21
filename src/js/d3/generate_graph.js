
import * as d3 from "d3";

export const generateGraph = (data, width = 960, height = 500, type) => {
  console.log("generateGraph");
  
  // var lineGenerator = d3.line()
  //   .curve(d3.curveCardinal);

  d3.selectAll("#graph-content").remove(); //Forcefully clear all SVG element

  let svg = d3.select("#graph-content-wrapper")
    .append("svg")
    .attr("id", "graph-content");
  let graphContent = document.getElementById("graph-content");
  // let svg = d3.select(graphContent);

  const margin = { top: 100, right: 70, bottom: 100, left: 70 };

  let padding = 70;

  // Calculate X and Y based on input data
  let prices = [];
  let points = [];
  prices = data.map( (col) => {
    // console.log(`${JSON.stringfy(col.fields)}`)
    return parseInt(col.fields.priceusd)
  })

  let date = data.map( col => {
    return new Date(col.fields.date);
  });


  // const fields = d3.nest()
  //   .key(d => d.fields )
  //   .entries(data);
  
  // console.log(`fields: ${JSON.stringify(fields)}`);


  let min = d3.min(prices);
  let max = d3.max(prices);
  let size = prices.length;
  let diff = max - min;

  width = graphContent.clientWidth;
  height = graphContent.clientHeight;


  let widthBegin = margin.left;
  let widthEnd = width - margin.right;
  let heightBegin = height - margin.top;
  let heightEnd = margin.bottom;
  let innerWidth = width - margin.left - margin.right;
  let innerHeight = height - margin.top - margin.bottom;
  let offsetWidth = width - padding * 2;
  let offsetHeight = height - padding * 2;

  console.log(`prices: ${prices}; \n Min: ${min} \n Max: ${max}`);

  let minDate = date[date.length - 1];
  let maxDate = date[0];

  console.log(`date: ${JSON.stringify(date)}; \n Min: ${minDate}; \n Max: ${maxDate}`);
  
  // points = prices.map( (val, idx) => {
  //   // return [ width / size * idx, (val - min) / diff * height ]
  //   return { 
  //     x: (padding * 2) + (offsetWidth / size * idx) ,
  //     y: (padding / 2) + ((val - min) / diff * offsetHeight)
  //   }
  // })

  points = data.map( (col, idx) => {
    return { 
      x: new Date(col.fields.date),
      y: col.fields.priceusd
    }
  })

  console.log(`points: ${JSON.stringify(points)}`);

  let factor = min > 1000 ? 1000 : 100;
  let offsetMin = Math.floor(min / factor) * factor;
  let offsetMax = Math.ceil(max / factor) * factor;

  console.log(`offsetMin ${offsetMin}\noffsetMax ${offsetMax}`);

  let xPathScale = d3.scaleTime()
    .domain([minDate, maxDate])
    .range([widthBegin, widthEnd]);

  let yPathScale = d3.scaleLinear()
    .domain([offsetMin, offsetMax])
    .range([heightBegin, heightEnd]);

  let lineGenerator = d3.line()
    .x(function (d) { return xPathScale(d.x) })
    .y(function (d) { return yPathScale(d.y) })
    .curve(d3.curveCatmullRom.alpha(1));

  var pathData = lineGenerator(points);

  console.log(`Path Data: ${pathData}`);

  let path = svg.append("path")
    .attr("id", "graph-path");
  
  // let graphPath = document.getElementById("graph-path");
  // let path = d3.select(graphPath);

  path
    .attr('d', pathData)
    // .attr("stroke-width", 3)
    // .attr("stroke", "#777")
    // .attr("fill", "none");

  // Also draw points for reference

  // TODO: how to add point for X when data is DateTime?
  // svg
  //   .selectAll('circle')
  //   .data(points)
  //   .enter()
  //   .append('circle')
  //   .attr('cx', function (d) {
  //     return d.x;
  //   })
  //   .attr('cy', function (d) {
  //     return d.y;
  //   })
  //   .attr('r', 3)


  // let xAxisScale = d3.scaleLinear()
  //   // .domain([new Date(date[size-1]), new Date(date[0])])
  //   .domain( minDate, maxDate )
  //   .range([0, width - 100]);


  let yAxisScale = d3.scaleLinear()
    .domain([offsetMin, offsetMax])
    .range([innerHeight, 0]);

  let xAxisScale = d3.scaleTime()
    .domain([minDate, maxDate])
    .range([0, innerWidth]);

  // define the y axis
  let yAxis = d3.axisLeft()
    // .tickSize(-innerWidth)
    .scale(yAxisScale);

  let xAxis = d3.axisBottom()
    // .tickSize(-innerHeight)
    .scale(xAxisScale)
    .tickFormat(d3.timeFormat("%m/%d/%y"))
    .tickValues(date);

  svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + widthBegin + ", " + heightEnd + ")")
    .call(yAxis);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(" + widthBegin + "," + heightBegin + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-45)");


  // svg.data(
  //   { name: 'curveBasis', curve: d3.curveBasis, active: true, lineString: '', clear: true, info: 'Interpolates the start and end points and approximates the inner points using a B-spline.' }
  // )

  


}