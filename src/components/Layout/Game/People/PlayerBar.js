import React from "react";

import CardDiv from "./CardDiv";
import PlayerBarAvatar from "./PlayerBarAvatar";

const PlayerBar = props => {
  return (
    <div className="player-bar">
      <div className="player">
        <PlayerBarAvatar />
      </div>
      <CardDiv {...props} />
      <h1 className="score">--</h1>
    </div>
  );
};

export default PlayerBar;
