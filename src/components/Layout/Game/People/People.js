import React from "react";

import DealerBar from "./DealerBar";
import PlayerBar from "./PlayerBar";
import ActionsBar from "./ActionsBar";
import ChipsTable from "./ChipsTable";

const People = props => (
  <div className="people">
    <DealerBar />
    <PlayerBar />
    <ActionsBar />
    <ChipsTable />
  </div>
);

export default People;
