import React from "react";

import DealerBar from "./DealerBar";
import PlayerBar from "./PlayerBar";
import ActionsBar from "./Actions/ActionsBar";
import ChipsTable from "./ChipsTable";

const People = props => (
  <div className="people">
    <DealerBar {...props} player={props.Session.Person[0]} />
    <PlayerBar {...props} player={props.Session.Person[1]} />
    <ActionsBar {...props} />
    {!props.Session.betPlaced ? <ChipsTable {...props} /> : null}
  </div>
);

export default People;
