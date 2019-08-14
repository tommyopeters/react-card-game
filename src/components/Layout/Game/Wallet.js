import React from "react";

const Wallet = props => {
  return (
    <div className="wallet">
      <div className="wallet-inset">
        <span className="roundedge" />
        <div className="wallet-inside">
          <span /> <div id="money">{props.Session.wallet}</div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
