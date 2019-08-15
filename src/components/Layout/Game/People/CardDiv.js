import React from "react";
import Cards from "./Cards";
import EmptyCards from "./EmptyCards";

const CardDiv = props => {
  console.log(props.Session.cardinhand);

  return (
    <div className="carddiv">
      {props.emptyCards <= 5 ? (
        <Cards
          person={props.person}
          cardValue={props.player.dealt_cards[0]["facevalue"]}
          cardSuit={props.player.dealt_cards[0]["unicode"]}
        />
      ) : null}
      {props.emptyCards <= 4 ? (
        <Cards
          person={props.person}
          cardFlipped={
            props.Session.cardinhand < 3
              ? !props.Session.dealerCardRevealed
              : null
          }
          cardValue={props.player.dealt_cards[1]["facevalue"]}
          cardSuit={props.player.dealt_cards[1]["unicode"]}
        />
      ) : null}
      {props.emptyCards <= 3 ? (
        <Cards
          person={props.person}
          cardFlipped={
            props.Session.cardinhand < 4
              ? !props.Session.dealerCardRevealed
              : null
          }
          cardValue={props.player.dealt_cards[2]["facevalue"]}
          cardSuit={props.player.dealt_cards[2]["unicode"]}
        />
      ) : null}
      {props.emptyCards <= 2 ? (
        <Cards
          person={props.person}
          cardFlipped={
            props.Session.cardinhand < 5
              ? !props.Session.dealerCardRevealed
              : null
          }
          cardValue={props.player.dealt_cards[3]["facevalue"]}
          cardSuit={props.player.dealt_cards[3]["unicode"]}
        />
      ) : null}
      {props.emptyCards <= 1 ? (
        <Cards
          person={props.person}
          cardFlipped={
            props.Session.cardinhand < 6
              ? !props.Session.dealerCardRevealed
              : null
          }
          cardValue={props.player.dealt_cards[4]["facevalue"]}
          cardSuit={props.player.dealt_cards[4]["unicode"]}
        />
      ) : null}
      {props.emptyCards <= 0 ? (
        <Cards
          person={props.person}
          cardFlipped={!props.Session.dealerCardRevealed}
          cardValue={props.player.dealt_cards[5]["facevalue"]}
          cardSuit={props.player.dealt_cards[5]["unicode"]}
        />
      ) : null}
      {props.emptyCards >= 6 ? <EmptyCards /> : null}
      {props.emptyCards >= 5 ? <EmptyCards /> : null}
      {props.emptyCards >= 4 ? <EmptyCards /> : null}
      {props.emptyCards >= 3 ? <EmptyCards /> : null}
      {props.emptyCards >= 2 ? <EmptyCards /> : null}
      {props.emptyCards >= 1 ? <EmptyCards /> : null}
    </div>
  );
};

export default CardDiv;
