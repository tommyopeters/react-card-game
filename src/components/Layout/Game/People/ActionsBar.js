import React from "react";

const ActionsBar = () => {
  return (
    <div className="actions">
      <div className="prebet">
        <div className="bet button">
          BET <pre> </pre>&nbsp;<pre> </pre>{" "}
          <span className="dollarsign">$</span> <span id="amount">--</span>
        </div>
        <div className="reset button">RESET</div>
      </div>
      <div className="postbet hidden">
        <div className="hit button">HIT</div>
        <div className="stand button">STAND</div>
        <div className="nodoubledown button">DOUBLE DOWN</div>
        <div className="nosplit button">SPLIT</div>
        <div className="noace button">
          ACE &nbsp; <span id="acevalue">1</span>
        </div>
      </div>
    </div>
  );
};

export default ActionsBar;
