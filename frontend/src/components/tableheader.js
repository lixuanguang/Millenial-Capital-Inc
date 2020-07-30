import React from "react";
import * as d3 from "d3";
import "../App.css";

class TableHeader extends React.Component {
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
    
    const eventName = data[0]["index"];
    const eventDate = data[0]["Value"];

    // create table
    var table = d3.select("#col1a").append("table");
    table.append("text").text(function (d) {
        return ("The event is " + eventName + " on the day " + eventDate)
    });
    d3.select("#col1").selectAll("text").data(data).enter().append("text");

  }

  render() {
    return <div id={"tableheader"}></div>;
  }
}

export default TableHeader;