import React, { Component } from "react";

import GameBackground from "./GameBackground";
import Game from "./Game/Game";
import Deck from "../../logic/Deck";
import GameEngine from "../../logic/GameEngine";

let GameSession = new GameEngine();
class Layout extends Component {
  state = {
    Session: GameSession,
    emptyCards: [
      <div className="empty" key={1} />,
      <div className="empty" key={2} />,
      <div className="empty" key={3} />,
      <div className="empty" key={4} />,
      <div className="empty" key={5} />,
      <div className="empty" key={6} />
    ],
    dealtCards: []
  };
  startSession = () => {
    GameSession["Person"][0] = new Deck();
    GameSession["Person"][0].generate();
    GameSession["Person"][0].shuffle();
    GameSession["Person"][0].deal();
    GameSession["Person"][0].deal();
    GameSession["Person"][1] = new Deck();
    GameSession["Person"][1].generate();
    GameSession["Person"][1].shuffle();
    GameSession["Person"][1].deal();
    GameSession["Person"][1].deal();
    GameSession.cardinhand++;
    GameSession.cardinhand++;

    GameSession.gameStarted = true;

    let emptyCards = this.state.emptyCards;
    emptyCards.pop();
    emptyCards.pop();

    let dealtCards = [null, null];

    this.setState({
      Session: GameSession,
      emptyCards,
      dealtCards
    });
  };

  render() {
    return (
      <div>
        <GameBackground />
        <Game
          Session={this.state.Session}
          emptyCards={this.state.emptyCards}
          startSession={this.startSession}
          dealtCards={this.state.dealtCards}
        />
      </div>
    );
  }
}

export default Layout;
