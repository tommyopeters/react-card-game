import Deck from "./Cards";

class GameEngine {
  constructor() {
    this.Person = {};
    this.Session = [];
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
  }

  start() {
    this.listeners();
    this.Session[this.sessionnumber] = [];
    this.Session[this.sessionnumber][0] = new Deck();
    this.Session[this.sessionnumber][0].generate();
    this.Session[this.sessionnumber][0].shuffle();
    this.Person["dealer"] = this.Session[this.sessionnumber][0];

    this.Session[this.sessionnumber][1] = new Deck();
    this.Session[this.sessionnumber][1].generate();
    this.Session[this.sessionnumber][1].shuffle();
    this.Person["player"] = this.Session[this.sessionnumber][1];

    this.firstTwoCards();
  }
  firstTwoCards() {
    this.dealCard();
    this.dealCard();
    let playerstwo = [];
    playerstwo.push(this.playerCards[0]);
    playerstwo.push(this.playerCards[1]);
    let dealerstwo = [];
    dealerstwo.push(this.dealerCards[0]);
    dealerstwo.push(this.dealerCards[1]);

    this.firstTwo.push(dealerstwo);
    this.firstTwo.push(playerstwo);

    this.revealCard(1, this.playerCards.length);
    this.revealCard(0, this.dealerCards.length - 1);
    this.checkValues();
  }
  dealCard() {
    let playerdealt = this.Person["player"].deal();
    let dealerdealt = this.Person["dealer"].deal();

    let realplayerdealt = this.Person["player"].dealt_cards[
      this.Person["player"].dealt_cards.length - 1
    ];
    let realdealerdealt = this.Person["dealer"].dealt_cards[
      this.Person["dealer"].dealt_cards.length - 1
    ];

    console.log(realplayerdealt);

    this.dealerCards.push(realdealerdealt);
    this.playerCards.push(realplayerdealt);

    this.dealnumber++;

    this.dealeremptyCards = document.querySelectorAll(".dealer-bar .empty");
    this.playeremptyCards = document.querySelectorAll(".player-bar .empty");

    let HTMLcardDealer = document.createElement("div");
    HTMLcardDealer.classList.add("cardcontainer");
    if (
      realdealerdealt.suit == "spadesuit" ||
      realdealerdealt.suit == "clubsuit"
    ) {
      HTMLcardDealer.classList.add("cardgreen");
    } else {
      HTMLcardDealer.classList.add("cardred");
    }
    HTMLcardDealer.classList.add("flipped");
    HTMLcardDealer.innerHTML = `
              <div class="front">
                  <div class="top">
                      <span> &${realdealerdealt.suit}; </span>
                  </div>
                  <h1>${realdealerdealt.facevalue}</h1>
                  <div class="bottom">
                      <span class="upside-down"> &${
                        realdealerdealt.suit
                      }; </span>
                  </div>
              </div>
              <div class="back"><div class="back-inner"></div></div>
          `;
    this.dealeremptyCards[0].parentNode.replaceChild(
      HTMLcardDealer,
      this.dealeremptyCards[0]
    );

    let HTMLcardPlayer = document.createElement("div");
    HTMLcardPlayer.classList.add("cardcontainer");
    if (
      realplayerdealt.suit == "spadesuit" ||
      realplayerdealt.suit == "clubsuit"
    ) {
      HTMLcardPlayer.classList.add("cardgreen");
    } else {
      HTMLcardPlayer.classList.add("cardred");
    }
    HTMLcardPlayer.classList.add("flipped");
    HTMLcardPlayer.innerHTML = `
              <div class="front">
                  <div class="top">
                      <span class="upside-up"> &${realplayerdealt.suit}; </span>
                  </div>
                  <h1 class="cardvalue">${realplayerdealt.facevalue}</h1>
                  <div class="bottom">
                      <span class="upside-down"> &${
                        realplayerdealt.suit
                      }; </span>
                  </div>
              </div>
              <div class="back"><div class="back-inner"></div></div>
          `;
    this.playeremptyCards[0].parentNode.replaceChild(
      HTMLcardPlayer,
      this.playeremptyCards[0]
    );

    this.cardinhand++;
  }
  revealCard(person, number) {
    let playerreveals = document.querySelectorAll(".player-bar .cardcontainer");
    let dealerreveals = document.querySelectorAll(".dealer-bar .cardcontainer");
    let i = 0;
    if (person == 1) {
      while (i < number) {
        playerreveals[i].classList.remove("flipped");
        i++;
      }
    } else if (person == 0) {
      while (i < number) {
        dealerreveals[i].classList.remove("flipped");
        i++;
      }
    }
  }

  checkValues() {
    this.checkSum();
    this.checkForBlackjack();
    this.checkForDouble();
    this.checkSum();
    this.checkForAce();
  }

  checkForBlackjack() {
    if (this.firstTwo[1][0].value == 1 && this.firstTwo[1][1].value > 9) {
      this.firstTwo[1][0].value = 11;
    } else if (
      this.firstTwo[1][1].value == 1 &&
      this.firstTwo[1][0].value > 9
    ) {
      this.firstTwo[1][1].value = 11;
    }
    if (this.firstTwo[0][0].value == 1 && this.firstTwo[0][1].value > 9) {
      this.firstTwo[0][0].value = 11;
    } else if (
      this.firstTwo[0][1].value == 1 &&
      this.firstTwo[0][0].value > 9
    ) {
      this.firstTwo[0][1].value = 11;
    }

    let Psum = this.firstTwo[1][0].value + this.firstTwo[1][1].value;
    let Dsum = this.firstTwo[0][0].value + this.firstTwo[0][1].value;

    if (Psum == 21 && Dsum == 21) {
      this.revealCard(0, this.dealerCards.length);
      setTimeout(() => {
        document.querySelector(".people").classList.add("apply-shake");
        document
          .querySelector(".people")
          .addEventListener("animationend", e => {
            document.querySelector(".people").classList.remove("apply-shake");
          });
        this.endgame("draw");
      }, 700);
    } else if (Psum == 21) {
      this.revealCard(0, this.dealerCards.length);
      setTimeout(() => {
        document.querySelector(".people").classList.add("apply-shake");
        document
          .querySelector(".people")
          .addEventListener("animationend", e => {
            document.querySelector(".people").classList.remove("apply-shake");
          });
        this.endgame("blackjack");
      }, 100);
    } else if (Dsum == 21) {
      this.revealCard(0, this.dealerCards.length);
      setTimeout(() => {
        document.querySelector(".people").classList.add("apply-shake");
        document
          .querySelector(".people")
          .addEventListener("animationend", e => {
            document.querySelector(".people").classList.remove("apply-shake");
          });
        this.endgame("lose");
      }, 100);
    }
  }
  checkForDouble() {}
  checkSum() {}
  checkForAce() {}
  endgame(message) {
    // if this.blackjack == true{
    //     BLACKJACK!
    //     this.blackjack = false
    // }
    // if (dealer>player){
    //     lose
    // }else if(player<dealer){
    //     win
    // }else if(player==dealer){
    //     Push
    // }
    console.log(message);
    if (message == "draw") {
      setTimeout(() => {
        document.querySelector(".gameaftermath").classList.remove("hidden");
        setTimeout(() => {
          document.querySelector(".draw").classList.remove("hidden");
          document
            .querySelector(".draw")
            .addEventListener("animationend", () => {
              document.querySelector(".draw").classList.remove("animatein");
              document.querySelector(".draw").classList.add("text-pulse");

              document.querySelector("html").addEventListener("click", () => {
                document.querySelector(".draw").classList.remove("text-pulse");
                document.querySelector(".draw").classList.add("animateout");
                document
                  .querySelector(".gameaftermath")
                  .classList.add("animateout");

                document
                  .querySelector(".draw")
                  .addEventListener("animationend", () => {
                    document.querySelector(".draw").classList.add("hidden");
                    document
                      .querySelector(".draw")
                      .classList.remove("animateout");
                  });
                document
                  .querySelector(".gameaftermath")
                  .addEventListener("animationend", () => {
                    document
                      .querySelector(".gameaftermath")
                      .classList.add("hidden");
                    document
                      .querySelector(".gameaftermath")
                      .classList.remove("animateout");
                    this.resetTable();
                    this.resetBet();
                  });
              });
            });
        }, 500);
      }, 500);

      this.wallet += this.amount;
      this.amount = 0;
      this.amountbet = 0;
      document.getElementById("money").innerHTML = `$${this.wallet}`;
    } else if (message == "blackjack") {
      setTimeout(() => {
        document.querySelector(".gameaftermath").classList.remove("hidden");
        setTimeout(() => {
          document.querySelector(".blackjack").classList.remove("hidden");
          document
            .querySelector(".blackjack")
            .addEventListener("animationend", () => {
              document
                .querySelector(".blackjack")
                .classList.remove("animatein");
              document.querySelector(".blackjack").classList.add("text-pulse");

              document.querySelector("html").addEventListener("click", () => {
                document
                  .querySelector(".blackjack")
                  .classList.remove("text-pulse");
                document
                  .querySelector(".blackjack")
                  .classList.add("animateout");
                document
                  .querySelector(".gameaftermath")
                  .classList.add("animateout");

                document
                  .querySelector(".blackjack")
                  .addEventListener("animationend", () => {
                    document
                      .querySelector(".blackjack")
                      .classList.add("hidden");
                    document
                      .querySelector(".blackjack")
                      .classList.remove("animateout");
                  });
                document
                  .querySelector(".gameaftermath")
                  .addEventListener("animationend", () => {
                    document
                      .querySelector(".gameaftermath")
                      .classList.add("hidden");
                    document
                      .querySelector(".gameaftermath")
                      .classList.remove("animateout");
                    this.resetTable();
                    this.resetBet();
                  });
              });
            });
        }, 500);
      }, 500);

      this.wallet += Math.floor(1.5 * this.amount);
      this.amount = 0;
      this.amountbet = 0;
      document.getElementById("money").innerHTML = `$${this.wallet}`;
    } else if (message == "lose") {
      setTimeout(() => {
        document.querySelector(".gameaftermath").classList.remove("hidden");
        setTimeout(() => {
          document.querySelector(".lose").classList.remove("hidden");
          document
            .querySelector(".lose")
            .addEventListener("animationend", () => {
              document.querySelector(".lose").classList.remove("animatein");
              document.querySelector(".lose").classList.add("text-pulse");

              document.querySelector("html").addEventListener("click", () => {
                document.querySelector(".lose").classList.remove("text-pulse");
                document.querySelector(".lose").classList.add("animateout");
                document
                  .querySelector(".gameaftermath")
                  .classList.add("animateout");

                document
                  .querySelector(".lose")
                  .addEventListener("animationend", () => {
                    document.querySelector(".lose").classList.add("hidden");
                    document
                      .querySelector(".lose")
                      .classList.remove("animateout");
                  });
                document
                  .querySelector(".gameaftermath")
                  .addEventListener("animationend", () => {
                    document
                      .querySelector(".gameaftermath")
                      .classList.add("hidden");
                    document
                      .querySelector(".gameaftermath")
                      .classList.remove("animateout");
                    this.resetTable();
                    this.resetBet();
                  });
              });
            });
        }, 500);
      }, 500);
      this.amount = 0;
      this.amountbet = 0;
      document.getElementById("money").innerHTML = `$${this.wallet}`;
    }

    this.sessionnumber++;
  }

  resetTable() {
    let cardcontainers = document.querySelectorAll(".cardcontainer");
    cardcontainers.forEach(card => {
      let newemptycard = document.createElement("div");
      newemptycard.classList.add("empty");
      card.parentNode.replaceChild(newemptycard, card);
    });

    this.dealnumber = -1;
    this.cardinhand = 0;
    this.double = false;
    this.acedouble = false;
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
  }
  resetBet() {
    document.querySelector(".prebet").style.removeProperty("display");
    document.querySelector(".postbet").classList.add("hidden");
    document.querySelector(".chipstable").style.removeProperty("display");
    document.getElementById("amount").innerHTML = this.amount;
  }

  listeners() {
    document.querySelector(".hit").addEventListener("click", () => {
      this.revealCard(0, this.dealerCards.length);

      this.dealCard();
    });
    /*
          if(this.double){
              console.log('yes');
              document.querySelector('.doubledown').addEventListener('click', ()=>{
                  console.log(this.wallet + "" + this.amount);
                  if(this.wallet > this.amount *2){
                      this.revealCard(0, this.dealerCards.length)
                      this.wallet -= this.amount;
                      this.amount = 2*this.amount;
                      document.querySelector('#money').innerHTML = `$${this.wallet}`;
                      
                      setTimeout(() => {
                          this.dealCard();
                          this.printCard();
                          this.revealCard(1,this.playerCards.length);
                          this.checkForAce();
                          this.checkSum();
                          document.querySelector('.doubledown').classList.replace('doubledown', 'nodoubledown');
                          document.querySelector('.split').classList.replace('split', 'nosplit');
                          this.double = false;
                      }, 500);
                  }
              })
          }
          */
  }
}
