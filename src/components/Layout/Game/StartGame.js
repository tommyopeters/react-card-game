import React, { Component } from "react";

class StartGame extends Component {
  state = {
    selectedNo: false
  };
  noSelected = () => {
    this.setState({
      selectedNo: !this.selectedNo ? true : false
    });
  };
  render() {
    return (
      <div className="startgame zoomin">
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
