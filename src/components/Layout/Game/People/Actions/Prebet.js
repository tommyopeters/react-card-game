import React from "react";

export default function Prebet(props) {
  const handleBetClick = () => {
    if (
      props.Session.amount >= 200 ||
      props.Session.amount === props.Session.wallet
    ) {
      props.setBet();
    }
  };
  const handleResetClick = () => {
    props.resetAmountBet();
  };
  return (
    <div className="prebet">
      <div className="bet button" onClick={handleBetClick}>
        BET <pre> </pre>&nbsp;<pre> </pre> <span className="dollarsign">$</span>{" "}
        <span id="amount">{props.Session.amount}</span>
      </div>
      <div className="reset button" onClick={handleResetClick}>
        RESET
      </div>
    </div>
  );
}
