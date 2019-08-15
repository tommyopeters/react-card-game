class GameEngine {
  constructor() {
    this.Person = [];

    this.nextSessionCard = [];
    this.sessionnumber = 0;
    this.cardinhand = 0;
    this.double = false;
    this.ace = false;
    this.aceValue = 1;
    this.playeracedouble = false;
    this.dealeracedouble = false;
    this.wallet = 1000;
    this.amount = 0;
    this.split = false;
    this.firstTwo = [];
    this.blackjack = false;
    this.playersum = 0;
    this.dealersum = 0;
    this.dealeremptyCards = {};
    this.playeremptyCards = {};
    this.dealerCards = [];
    this.playerCards = [];
    this.dealnumber = -1;
    this.gameOver = false;
    this.gameStarted = false; //switch back
    this.gameWon = false;
    this.gameLost = false;
    this.gameDrawn = false;
    this.sessionWon = false;
    this.sessionLost = false;
    this.sessionDrawn = false;
    this.newSession = false;
    this.dealerCardRevealed = false;
    this.betPlaced = false;
  }
}

export default GameEngine;
