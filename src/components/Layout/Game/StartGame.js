import React, { Component } from "react";

class StartGame extends Component {
  state = {
    selectedNo: false
  };
  noSelected = () => {
    this.setState({
      selectedNo: !this.selectedNo ? true : false
    });
    setTimeout(() => {
      this.setState({
        selectedNo: this.selectedNo ? true : false
      });
    }, 1000);
  };
  render() {
    return (
      <div
        className={
          this.state.selectedNo ? "startgame apply-shake" : "startgame zoomin"
        }
      >
        <h1 className="start">START GAME?</h1>
        <div className="answers">
          <span onClick={this.props.startSession} className="yes">
            YES
          </span>{" "}
          <span className="no" onClick={this.noSelected}>
            NO
          </span>
        </div>
      </div>
    );
  }
}
export default StartGame;
