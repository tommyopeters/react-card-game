import React from "react";

const Cards = () => {
  return (
    <div className="cardcontainer cardgreen">
      <div className="front">
        <div className="top">
          <span className="upside-up"> &spades; </span>
        </div>
        <h1 className="cardvalue">5</h1>
        <div className="bottom">
          <span className="upside-down"> &spades; </span>
        </div>
      </div>
      <div className="back">
        <div className="back-inner" />
      </div>
    </div>
  );
};

export default Cards;
