import React from "react";
import * as d3 from "d3";
import "../App.css";

class LineChart extends React.Component {
  componentDidMount() {
    this.drawChart();
  }

  async drawChart() {
    const data = await this.props.data;

    let dataset = data.map(function (d) {
      return {
        Date: d3.timeParse("%Y-%m-%d")(d.Date),
        Close: d.Close,
      };
    });

    dataset = dataset.slice(-365);

    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 30, left: 30 },
      width = 600 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#col2")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    var x = d3
      .scaleTime()
      .domain(
        d3.extent(dataset, function (d) {
          return d.Date;
        })
      )
      .range([0, width]);

    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(
        d3
          .axisBottom(x)
          .ticks(d3.timeDay.every(90))
          .tickFormat(d3.timeFormat("%b %d"))
          .scale(x)
      );

    // Add Y axis
    var y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(dataset, function (d) {
          return +d.Close;
        }),
      ])
      .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    
    // Add the line
    svg.append("path")
        .datum(dataset)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
        .x(function(d) { return x(d.Date) })
        .y(function(d) { return y(d.Close) })
        )
        
  }

  render() {
    return <div id={"#linechart"}></div>;
  }
}

export default LineChart;
