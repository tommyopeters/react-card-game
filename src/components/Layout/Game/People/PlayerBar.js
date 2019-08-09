import React from "react";

import CardDiv from "./CardDiv";
import PlayerBarAvatar from "./PlayerBarAvatar";

const PlayerBar = () => {
  return (
    <div className="player-bar">
      <div className="player">
        <PlayerBarAvatar />
      </div>
      <CardDiv />
      <h1 className="score">--</h1>
    </div>
  );
};

export default PlayerBar;
