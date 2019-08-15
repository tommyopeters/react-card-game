import React, { Component } from "react";

import Wallet from "./Wallet";
import StartGame from "./StartGame";
import GameAftermath from "./GameAftermath";
import People from "./People/People";

class Game extends Component {
  render() {
    return (
      <div id="game">
        <Wallet {...this.props} />
        {!this.props.Session.gameStarted ? <StartGame {...this.props} /> : null}
        {this.props.Session.gameOver ? <GameAftermath {...this.props} /> : null}
        {this.props.Session.gameStarted ? <People {...this.props} /> : null}
      </div>
    );
  }
}

export default Game;
