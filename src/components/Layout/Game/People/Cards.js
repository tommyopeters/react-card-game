import React from "react";

const Cards = props => {
  console.log(props);
  return (
    <div
      className={`cardcontainer cardgreen ${
        props.person === "dealer" && props.cardFlipped ? "flipped" : null
      }`}
    >
      <div className="front">
        <div className="top">
          <span className="upside-up"> {props.cardSuit} </span>
        </div>
        <h1 className="cardvalue">{props.cardValue}</h1>
        <div className="bottom">
          <span className="upside-down"> {props.cardSuit} </span>
        </div>
      </div>
      <div className="back">
        <div className="back-inner" />
      </div>
    </div>
  );
};

export default Cards;
