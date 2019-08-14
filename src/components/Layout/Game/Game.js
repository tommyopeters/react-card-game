import React, { Component } from "react";

import Wallet from "./Wallet";
import StartGame from "./StartGame";
import GameAftermath from "./GameAftermath";
import People from "./People/People";

class Game extends Component {
  render() {
    console.log(this.props.Session.gameStarted);
    return (
      <div id="game">
        <Wallet />
        {!this.props.Session.gameStarted ? <StartGame {...this.props} /> : null}
        {this.props.Session.gameOver ? <GameAftermath {...this.props} /> : null}
        <People {...this.props} />
      </div>
    );
  }
}

export default Game;
