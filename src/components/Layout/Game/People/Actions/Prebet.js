import React from "react";

export default function Prebet(props) {
  return (
    <div className="prebet">
      <div className="bet button">
        BET <pre> </pre>&nbsp;<pre> </pre> <span className="dollarsign">$</span>{" "}
        <span id="amount">{props.Session.amount}</span>
      </div>
      <div className="reset button">RESET</div>
    </div>
  );
}
