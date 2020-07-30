import React from "react";
import { unmountComponentAtNode } from "react-dom";
import "./App.css";
import Table from "./components/table.js";
import TableHeader from "./components/tableheader.js";
import LineChart from "./components/chart.js";
import AnalystTable from "./components/analysttable.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendations: [],
      actions: [],
      price: [],
      calendar: [],
      value: "",
      showTables: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchDatasets = this.fetchDatasets.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.fetchDatasets = this.fetchDatasets.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  // captures input by user
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  // handles user action of clicking
  async handleClick() {
    let resultDataset = await this.fetchDatasets(
      this.state.value,
      "recommendations"
    );
    this.setState({ recommendations: resultDataset });
    let resultDataset2 = await this.fetchDatasets(this.state.value, "actions");
    this.setState({ actions: resultDataset2 });
    let resultDataset3 = await this.fetchDatasets(this.state.value, "price");
    this.setState({ price: resultDataset3 });
    let resultDataset4 = await this.fetchDatasets(this.state.value, "calendar");
    this.setState({ calendar: resultDataset4 });
    this.state.showTables
      ? this.setState({ showTables: false })
      : this.setState({ showTables: true });
  }

  handleRemove() {
    this.setState({ showTables: false, value: "" });
  }

  // draws the data
  async fetchDatasets(tickerVal, typeData) {
    var urlResp =
      "http://localhost:3000/finstat/" +
      String(typeData) +
      "/" +
      String(tickerVal);
    var responseData = await fetch(urlResp);
    var datasettxt = await responseData.text();
    var datasetDouble = datasettxt.replace(/'/g, '"');
    let datasetDouble2 = datasetDouble.replace("Timestamp(", "");
    let datasetDouble3 = datasetDouble2.replace(")", "");
    try {
      var datasetJSON = JSON.parse(datasetDouble3);
      return datasetJSON;
    } catch(err) {
      return [{"data": "no data"}];
    }
  }

  render() {
    var table_title = this.state.showTables ? (
      <TableHeader data={this.state.calendar} />
    ) : (
      ""
    );
    var table_content = this.state.showTables ? (
      <Table data={this.state.calendar} />
    ) : (
      ""
    );
    var line_chart = this.state.showTables ? (
      <LineChart data={this.state.price} />
    ) : (
      ""
    );
    var analyst_table = this.state.showTables ? (
      <AnalystTable data={this.state.recommendations} />
    ) : (
      ""
    );
    return (
      <div className="App">
        <header className="App-header">
          <div className="container">
            <div className="item">
              <h3>Financial Database</h3>
              <h1>Millenial Capital Inc</h1>
              <p>Refreshing each time will take some time</p>
              <div className="styledInput">
                <input
                  id="input"
                  type="text"
                  placeholder="Enter company ticker"
                  value={this.state.value}
                  onChange={this.handleChange}
                ></input>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => this.handleClick()}
                >
                  FETCH DATA
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => this.handleRemove()}
                >
                  RESET DATA
                </button>
              </div>
            </div>
          </div>
        </header>
        <div id="content">
          <div className="row">
            <div className="column1">
              <b>Key Financial Events</b>
              <div id="col1a">{table_title}</div>
              <div id="col1b">{table_content}</div>
            </div>
            <div className="column2">
              <b>Time Series Common Stock Price</b>
              <div id="col2">{line_chart}</div>
            </div>
            <div className="column3">
              <b>Analyst Ratings</b>
              <div id="col3">{analyst_table}</div>
            </div>
          </div>
          <div className="footer">
            <h3>Trademarks, Disclaimer, etc</h3>
            <p> This website is designed and maintained by Li Xuanguang. </p>
            <p> The front end relies on React, with a few other frameworks designed to pull data from the server running on localhost:3000.</p>
            <p> The back end relies on MySQL for data, Express for connectivity, and a few other frameworks I can't think of right now as I justed finished an all nighter for this project.</p>
            <p> Ah yes, the back end relies on Python as well, connected to Javascript via Python-Shell. Quite a useful module for data manipulation, but venv has to be enabled.</p>
            <h4>Generic End of Website Verbose</h4>
            <p> With reference to Quantopian website for the content, enjoy.</p>
            <p> The material on this website is provided for informational purposes only and does not constitute an offer to sell, a solicitation to buy, or a recommendation or endorsement for any security or strategy, nor does it constitute an offer to provide investment advisory services.</p>
            <p> In addition, the material offers no opinion with respect to the suitability of any security or specific investment. No information contained herein should be regarded as a suggestion to engage in or refrain from any investment-related course of action as none of Quantopian nor any of its affiliates is undertaking to provide investment advice, act as an adviser to any plan or entity subject to the Employee Retirement Income Security Act of 1974, as amended, individual retirement account or individual retirement annuity, or give advice in a fiduciary capacity with respect to the materials presented herein. If you are an individual retirement or other investor, contact your financial advisor or other fiduciary unrelated to Quantopian about whether any given investment idea, strategy, product or service described herein may be appropriate for your circumstances. All investments involve risk, including loss of principal. Quantopian makes no guarantees as to the accuracy or completeness of the views expressed in the website. The views are subject to change, and may have become unreliable for various reasons, including changes in market conditions or economic circumstances.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
