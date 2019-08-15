import React, { Component } from "react";

import GameBackground from "./GameBackground";
import Game from "./Game/Game";
import Deck from "../../logic/Deck";
import GameEngine from "../../logic/GameEngine";

let GameSession = new GameEngine();
class Layout extends Component {
  state = {
    Session: GameSession,
    emptyCards: 6,
    dealtCards: []
  };
  startSession = () => {
    GameSession.gameStarted = true;
    console.log(GameSession.gameStarted);
    this.setState({
      Session: GameSession
    });
  };

  setBet = () => {
    //GENERATE, DEAL AND SHUFFLE PLAYER AND DEALERS CARDS
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

    //INCREMENT NUMBER OF CARDSINHAND
    GameSession.cardinhand++;
    GameSession.cardinhand++;

    //CREATE LOCAL VARIABLE TO HOLD AND CHANGE EMPTYCARDS STATE
    let emptyCards = this.state.emptyCards;
    emptyCards--;
    emptyCards--;

    //SET BETPLACED TO TRUE
    GameSession.betPlaced = true;

    //EQUATE DEALER AND PLAYER SUM
    GameSession.dealersum =
      GameSession["Person"][0].dealt_cards[0]["value"] +
      GameSession["Person"][0].dealt_cards[1]["value"];
    GameSession.playersum =
      GameSession["Person"][1].dealt_cards[0]["value"] +
      GameSession["Person"][1].dealt_cards[1]["value"];

    this.setState({
      Session: GameSession,
      emptyCards: emptyCards
    });
  };

  chipClick = chipVal => {
    GameSession.amount = GameSession.amount + chipVal;
    if (GameSession.amount > GameSession.wallet) {
      GameSession.amount = GameSession.wallet;
    } else if (GameSession.wallet <= 200) {
      GameSession.amount = GameSession.wallet;
    }
    this.setState({
      Session: GameSession
    });
  };

  resetAmountBet = () => {
    GameSession.amount = 0;
    this.setState({
      Session: GameSession
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
          setBet={this.setBet}
          resetAmountBet={this.resetAmountBet}
          dealtCards={this.state.dealtCards}
          chipClick={this.chipClick}
        />
      </div>
    );
  }
}

export default Layout;
