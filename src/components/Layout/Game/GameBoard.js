import React from "react";

import Wallet from "./Wallet";
import StartGame from "./StartGame";
import GameAftermath from "./GameAftermath";
import People from "./People/People";

const GameBoard = props => (
  <div id="game">
    {console.log(props)}
    <Wallet />
    <StartGame />
    <GameAftermath />
    <People />
  </div>
);

export default GameBoard;
