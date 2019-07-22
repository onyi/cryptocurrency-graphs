
import * as d3 from "d3";

const moment = require('moment');

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

  let parseDate = d3.timeFormat("%m/%d/%y");

  //Generate X and Y Axis
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
    .tickFormat(parseDate)
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
    .transition()
    .duration(4000)
    .ease(d3.easeLinear)
    // .attr("stroke-width", 3)
    // .attr("stroke", "#777")
    // .attr("fill", "none");

  // Draw points for reference
  let g = svg.selectAll()
    .data(points).enter().append("g");

  g.append('circle')
    .attr('cx', function (d) {
      return xPathScale(d.x)
    })
    .attr('cy', function (d) {
      return yPathScale(d.y);
    })
    .attr('r', 2);

  let infoTooltipsDiv = d3.select("body").append("div")
    .attr("class", "tooltip")
    .attr("id", "info-tooltips-div")
    .style("opacity", 0);

  g.selectAll("circle")
    .on("mouseover", (d) =>  {
      infoTooltipsDiv.transition().duration(200).style("opacity", 0.8);
      console.log(d);
      infoTooltipsDiv.html(
        "<span>Date: " + moment(d.x).format('YYYY-MM-DD') + "</span>" 
        + "<br/>" 
        + "<span>Price: " + parseFloat(d.y).toFixed(2) + "</span>"
      )
      .style("left", (d3.event.pageX - 20) + "px")
      .style("top", (d3.event.pageY + 6) + "px");

    })
    .on("mouseout", (d) => {
      infoTooltipsDiv.transition().duration(500).style("opacity", 0);

    })


  let repeat = () => {
    svg.selectAll("#roller-coaster-path").remove();

    let rcPath = svg.append("path")
      .attr("d", lineGenerator(points.reverse()))
      .attr("id", "roller-coaster-path")
      .attr("stroke", "darkgrey")
      .attr("stroke-width", "2")
      .attr("fill", "none")
      .attr("transform", "translate(0, -10)");

    let totalLength = rcPath.node().getTotalLength();

    rcPath
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(8000)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0)
      .on("end", repeat);
  };
  repeat();

  


}