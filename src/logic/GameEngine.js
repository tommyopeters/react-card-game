class GameEngine {
  constructor() {
    this.Person = [];
    this.nextSessionCard = [];
    this.sessionnumber = 0;
    this.cardinhand = 0;
    this.double = false;
    this.acedouble = false;
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
    this.gameStarted = true; //switch back
    this.gameWon = false;
    this.gameLost = false;
    this.gameDrawn = false;
    this.newSession = false;
  }
}

export default GameEngine;
