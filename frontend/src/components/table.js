import React from "react";
import * as d3 from "d3";
import "../App.css";

class Table extends React.Component {
  constructor() {
    super();
    this.state = {
      tableData: [],
    };
  }

  async componentDidMount() {
    await this.drawTable();
  }

  async drawTable() {

    const data = await this.props.data;

    // create table
    var table = d3.select("#col1b").append("table");
    
    // headers
    table
      .append("thead")
      .append("tr")
      .selectAll("th")
      .data(["Index", "Value"])
      .enter()
      .append("th")
      .text(function (d) {
        return d;
      });

    
    var tr = d3
      .select("#col1b")
      .selectAll("tr")
      .data(data)
      .enter()
      .append("tr");

    var td = tr
      .selectAll("td")
      .data(function (d, i) {
        return Object.values(d);
      })
      .enter()
      .append("td")
      .text(function (d) {
        return d;
      });

  }

  render() {
    return <div id={"table"}></div>;
  }
}

export default Table;
