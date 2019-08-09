import React from "react";

import CardDiv from "./CardDiv";
import DealerBarAvatar from "./DealerBarAvatar";

const DealerBar = () => {
  return (
    <div className="dealer-bar">
      <div className="dealer">
        <DealerBarAvatar />
      </div>
      <CardDiv />
      <h1 className="score">--</h1>
    </div>
  );
};

export default DealerBar;
