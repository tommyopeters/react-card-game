import React from "react";

import CardDiv from "./CardDiv";
import DealerBarAvatar from "./DealerBarAvatar";

const DealerBar = props => {
  return (
    <div className="dealer-bar">
      <div className="dealer">
        <DealerBarAvatar />
      </div>
      <CardDiv {...props} />
      <h1 className="score">
        {props.Session.dealerCardRevealed ? props.Session.dealersum : "--"}
      </h1>
    </div>
  );
};

export default DealerBar;
