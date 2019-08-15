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
    dealtCards: [],
    betShake: false,
    nextHand: []
  };
  startSession = () => {
    GameSession.gameStarted = true;
    GameSession.sessionStarted = true;
    GameSession.dealnumber = 0;
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

    GameSession.dealnumber++;
    GameSession.dealnumber++;

    //INCREMENT NUMBER OF CARDSINHAND
    GameSession.cardinhand++;
    GameSession.cardinhand++;

    //CREATE LOCAL VARIABLE TO HOLD AND CHANGE EMPTYCARDS STATE
    let emptyCards = this.state.emptyCards;
    emptyCards--;
    emptyCards--;

    //SET BETPLACED TO TRUE
    GameSession.betPlaced = true;

    //CHECK FOR DOUBLE ACE
    if (
      GameSession["Person"][0].dealt_cards[0]["value"] === 1 &&
      GameSession["Person"][0].dealt_cards[1]["value"] === 1
    ) {
      GameSession.dealeracedouble = true;
      GameSession["Person"][0].dealt_cards[1]["value"] = 11;
    }

    if (
      GameSession["Person"][1].dealt_cards[0]["value"] === 1 &&
      GameSession["Person"][1].dealt_cards[1]["value"] === 1
    ) {
      GameSession.playeracedouble = true;
      GameSession.split = true;
      GameSession["Person"][1].dealt_cards[1]["value"] = 11;
    }

    //EQUATE DEALER AND PLAYER SUM
    GameSession["Person"][0].dealt_cards.map((card, index) => {
      if (card["value"] === 1 && !GameSession.dealeracedouble) {
        card["value"] = 11;
      }
      GameSession.dealersum += card["value"];
      return null;
    });
    GameSession["Person"][1].dealt_cards.map((card, index) => {
      if (card["value"] === 1 && !GameSession.playeracedouble) {
        card["value"] = 11;
      }
      GameSession.playersum += card["value"];
      return null;
    });

    //CHECK FOR BLACKjACK
    if (GameSession.dealersum === 21 && GameSession.playersum === 21) {
      GameSession.dealerCardRevealed = true;
      GameSession.sessionDrawn = true;
      GameSession.sessionOver = true;
      GameSession.sessionStarted = false;
    } else if (GameSession.dealersum === 21) {
      GameSession.dealerCardRevealed = true;
      GameSession.sessionLost = true;
      GameSession.sessionOver = true;
      GameSession.sessionStarted = false;
      if (GameSession.wallet > 0) {
        GameSession.wallet = GameSession.wallet - GameSession.amount;
      }
    } else if (GameSession.playersum === 21) {
      GameSession.dealerCardRevealed = true;
      GameSession.sessionWon = true;
      GameSession.sessionOver = true;
      GameSession.sessionStarted = false;
      if (GameSession.wallet > 0) {
        GameSession.wallet = GameSession.wallet + GameSession.amount;
      }
    }

    //CHECK FOR DOUBLES
    if (!GameSession.sessionOver) {
      if (
        GameSession["Person"][1].dealt_cards[0]["facevalue"] ===
          GameSession["Person"][1].dealt_cards[1]["facevalue"] &&
        GameSession.cardinhand === 2
      ) {
        GameSession.split = true;
      }
    }

    //CHECK FOR 9, 10 AND 11
    if (
      GameSession.playersum >= 9 &&
      GameSession.playersum <= 11 &&
      GameSession.cardinhand === 2
    ) {
      GameSession.double = true;
    }

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

  aftermathClick = () => {
    let emptyCards = 6,
      nextHand = this.state.nextHand;
    if (
      GameSession.sessionWon ||
      GameSession.sessionLost ||
      GameSession.sessionDrawn
    ) {
      GameSession.sessionWon = false;
      GameSession.sessionLost = false;
      GameSession.sessionDrawn = false;

      if (GameSession.wallet > 0) {
        GameSession.newSession = true;
      } else {
        GameSession.gameLost = true;
        GameSession.gameOver = true;
      }
    } else if (GameSession.newSession) {
      GameSession.sessionOver = false;
      GameSession.newSession = false;
      GameSession.sessionStarted = true;

      GameSession["Person"] = [];
      GameSession.cardinhand = 0;
      GameSession.betPlaced = false;
      GameSession.amount = 0;
      GameSession.playersum = 0;
      GameSession.dealersum = 0;
      GameSession.blackjack = false;
      GameSession.double = false;
      GameSession.ace = false;
      GameSession.playeracedouble = false;
      GameSession.dealeracedouble = false;
      GameSession.aceValue = false;
      GameSession.dealerCardRevealed = false;
      emptyCards = 6;
      nextHand = this.state.nextHand;
    }

    if (GameSession.sessionStarted && this.state.nextHand.length > 1) {
      GameSession.amount = this.state.nextHand[1];

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

      GameSession["Person"][1].dealt_cards[0] = this.state.nextHand[0];

      GameSession.dealnumber++;
      GameSession.dealnumber++;

      //INCREMENT NUMBER OF CARDSINHAND
      GameSession.cardinhand++;
      GameSession.cardinhand++;

      //CREATE LOCAL VARIABLE TO HOLD AND CHANGE EMPTYCARDS STATES
      emptyCards--;
      emptyCards--;

      //SET BETPLACED TO TRUE
      GameSession.betPlaced = true;

      //CHECK FOR DOUBLE ACE
      if (
        GameSession["Person"][0].dealt_cards[0]["value"] === 1 &&
        GameSession["Person"][0].dealt_cards[1]["value"] === 1
      ) {
        GameSession.dealeracedouble = true;
        GameSession["Person"][0].dealt_cards[1]["value"] = 11;
      }

      if (
        GameSession["Person"][1].dealt_cards[0]["value"] === 1 &&
        GameSession["Person"][1].dealt_cards[1]["value"] === 1
      ) {
        GameSession.playeracedouble = true;
        GameSession["Person"][1].dealt_cards[1]["value"] = 11;
      }

      //EQUATE DEALER AND PLAYER SUM
      GameSession["Person"][0].dealt_cards.map((card, index) => {
        if (card["value"] === 1 && !GameSession.dealeracedouble) {
          card["value"] = 11;
        }
        GameSession.dealersum += card["value"];
        return null;
      });
      GameSession["Person"][1].dealt_cards.map((card, index) => {
        if (card["value"] === 1 && !GameSession.playeracedouble) {
          card["value"] = 11;
        }
        GameSession.playersum += card["value"];
        return null;
      });

      //CHECK FOR 9, 10 AND 11
      if (
        GameSession.playersum >= 9 &&
        GameSession.playersum <= 11 &&
        GameSession.cardinhand === 2
      ) {
        GameSession.double = true;
      }
      nextHand = [];
    }
    this.setState({
      Session: GameSession,
      emptyCards: emptyCards,
      nextHand: nextHand
    });
  };

  hit = () => {
    GameSession.ace = false;
    GameSession.split = false;
    GameSession.double = false;

    GameSession["Person"][0].deal();
    GameSession["Person"][1].deal();

    GameSession.dealnumber++;
    GameSession.cardinhand++;

    let emptyCards = this.state.emptyCards;
    emptyCards--;

    GameSession.dealersum =
      GameSession.dealersum +
      GameSession["Person"][0].dealt_cards[
        GameSession["Person"][0].dealt_cards.length - 1
      ]["value"];

    GameSession.playersum =
      GameSession.playersum +
      GameSession["Person"][1].dealt_cards[
        GameSession["Person"][1].dealt_cards.length - 1
      ]["value"];

    if (GameSession.playersum > 21) {
      GameSession.dealerCardRevealed = true;
      GameSession.sessionLost = true;
      GameSession.sessionOver = true;
      GameSession.sessionStarted = false;
      if (GameSession.wallet > 0) {
        GameSession.wallet = GameSession.wallet - GameSession.amount;
      }
    }
    if (
      GameSession["Person"][1].dealt_cards[
        GameSession["Person"][1].dealt_cards.length - 1
      ]["facevalue"] === "A"
    ) {
      GameSession.ace = true;
      GameSession.aceValue = 1;
    }
    this.setState({
      Session: GameSession,
      emptyCards: emptyCards
    });
  };
  stand = () => {
    if (GameSession.playersum === GameSession.dealersum) {
      GameSession.dealerCardRevealed = true;
      GameSession.sessionDrawn = true;
      GameSession.sessionOver = true;
      GameSession.sessionStarted = false;
    } else if (
      GameSession.playersum > GameSession.dealersum ||
      GameSession.dealersum > 21
    ) {
      GameSession.dealerCardRevealed = true;
      GameSession.sessionWon = true;
      GameSession.sessionOver = true;
      GameSession.sessionStarted = false;
      if (GameSession.wallet > 0) {
        GameSession.wallet = GameSession.wallet + GameSession.amount;
      }
    } else if (GameSession.playersum < GameSession.dealersum) {
      GameSession.dealerCardRevealed = true;
      GameSession.sessionLost = true;
      GameSession.sessionOver = true;
      GameSession.sessionStarted = false;
      if (GameSession.wallet > 0) {
        GameSession.wallet = GameSession.wallet - GameSession.amount;
      }
    }
    this.setState({
      Session: GameSession
    });
  };
  doubledown = () => {
    GameSession.amount = GameSession.amount * 2;
    GameSession["Person"][0].deal();
    GameSession["Person"][1].deal();

    GameSession.dealnumber++;
    GameSession.cardinhand++;

    let emptyCards = this.state.emptyCards;
    emptyCards--;

    GameSession.dealersum =
      GameSession.dealersum +
      GameSession["Person"][0].dealt_cards[
        GameSession["Person"][0].dealt_cards.length - 1
      ]["value"];

    GameSession.playersum =
      GameSession.playersum +
      GameSession["Person"][1].dealt_cards[
        GameSession["Person"][1].dealt_cards.length - 1
      ]["value"];

    if (GameSession.playersum > 21) {
      GameSession.dealerCardRevealed = true;
      GameSession.sessionLost = true;
      GameSession.sessionOver = true;
      GameSession.sessionStarted = false;
      if (GameSession.wallet > 0) {
        GameSession.wallet = GameSession.wallet - GameSession.amount;
      }
    }
    GameSession.double = false;
    this.setState({
      Session: GameSession,
      emptyCards: emptyCards
    });
  };
  changeAce = () => {
    if (
      GameSession["Person"][1].dealt_cards[
        GameSession["Person"][1].dealt_cards.length - 1
      ]["value"] === 11
    ) {
      GameSession["Person"][1].dealt_cards[
        GameSession["Person"][1].dealt_cards.length - 1
      ]["value"] = 1;
      GameSession.aceValue = 1;
      GameSession.playersum = GameSession.playersum - 10;
    } else if (
      GameSession["Person"][1].dealt_cards[
        GameSession["Person"][1].dealt_cards.length - 1
      ]["value"] === 1 &&
      GameSession.playersum + 10 < 21
    ) {
      GameSession["Person"][1].dealt_cards[
        GameSession["Person"][1].dealt_cards.length - 1
      ]["value"] = 11;
      GameSession.aceValue = 11;
      GameSession.playersum = GameSession.playersum + 10;
    }
    this.setState({
      Session: GameSession
    });
  };
  split = () => {
    GameSession.playersum =
      GameSession.playersum -
      GameSession["Person"][1].dealt_cards[
        GameSession["Person"][1].dealt_cards.length - 1
      ]["value"];

    const splitCard =
      GameSession["Person"][1].dealt_cards[
        GameSession["Person"][1].dealt_cards.length - 1
      ];
    const splitAmount = GameSession.amount / 2;
    GameSession.amount = splitAmount;

    GameSession["Person"][1].dealt_cards.pop();
    GameSession["Person"][1].deal();
    GameSession.playersum =
      GameSession.playersum +
      GameSession["Person"][1].dealt_cards[
        GameSession["Person"][1].dealt_cards.length - 1
      ]["value"];
    if (
      GameSession["Person"][1].dealt_cards[
        GameSession["Person"][1].dealt_cards.length - 1
      ]["facevalue"] === "A"
    ) {
      GameSession.ace = true;
      GameSession.aceValue = 1;
    }

    GameSession.dealersum = 0;
    GameSession["Person"][0].dealt_cards.pop();
    GameSession["Person"][0].dealt_cards.pop();
    GameSession["Person"][0].deal();
    GameSession["Person"][0].deal();

    GameSession["Person"][0].dealt_cards.map((card, index) => {
      if (
        card["value"] === 1 &&
        !GameSession.dealeracedouble &&
        GameSession.dealersum + 10 < 22
      ) {
        card["value"] = 11;
      }
      GameSession.dealersum += card["value"];
      return null;
    });

    GameSession.split = false;
    this.setState({
      Session: GameSession,
      nextHand: [splitCard, splitAmount]
    });
  };

  shakeBet = () => {
    let newBetShake = !this.betShake;
    this.setState({
      betShake: newBetShake
    });
  };
  removeBetShake = () => {
    this.setState({
      betShake: false
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
          aftermathClick={this.aftermathClick}
          stand={this.stand}
          hit={this.hit}
          split={this.split}
          doubledown={this.doubledown}
          changeAce={this.changeAce}
          betShake={this.state.betShake}
          shakeBet={this.shakeBet}
          removeBetShake={this.removeBetShake}
        />
      </div>
    );
  }
}

export default Layout;
