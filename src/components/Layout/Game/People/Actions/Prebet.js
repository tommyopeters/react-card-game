import React from "react";

export default function Prebet(props) {
  const handleBetClick = () => {
    if (
      props.Session.amount >= 200 ||
      props.Session.amount === props.Session.wallet
    ) {
      props.setBet();
    } else {
      props.shakeBet();
    }
  };
  const handleResetClick = () => {
    props.resetAmountBet();
  };
  const removeBetShake = () => {
    props.removeBetShake();
  };
  return (
    <div className="prebet">
      <div
        className={`bet button ${props.betShake ? "apply-shake" : null}`}
        onClick={handleBetClick}
        onAnimationEnd={removeBetShake}
      >
        BET <pre> </pre>&nbsp;<pre> </pre> <span className="dollarsign">$</span>{" "}
        <span id="amount">{props.Session.amount}</span>
      </div>
      <div className="reset button" onClick={handleResetClick}>
        RESET
      </div>
    </div>
  );
}
