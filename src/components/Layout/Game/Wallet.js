import React, { Component } from "react";

class Wallet extends Component {
  render() {
    return (
      <div className="wallet">
        <div className="wallet-inset">
          <span className="roundedge" />
          <div className="wallet-inside">
            <span /> <div id="money">$1000</div>{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default Wallet;
