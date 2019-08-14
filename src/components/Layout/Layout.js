import React, { Component } from "react";

import GameBackground from "./GameBackground";
import Game from "./Game/Game";
import Deck from "../../logic/Deck";
import GameEngine from "../../logic/GameEngine";

let GameSession = new GameEngine();
class Layout extends Component {
  state = {
    Session: GameSession
  };
  startSession = () => {
    GameSession["Person"][0] = new Deck();
    GameSession["Person"][1] = new Deck();
    GameSession.gameStarted = true;
    console.log(GameSession);
    this.setState({
      Session: GameSession
    });
  };

  render() {
    return (
      <div>
        <GameBackground />
        <Game Session={this.state.Session} startSession={this.startSession} />
      </div>
    );
  }
}

export default Layout;
