import React from "react";
import Cards from "./Cards";

const CardDiv = props => {
  return (
    <div className="carddiv">
      <Cards />
      <div className="empty" />
      <div className="empty" />
      <div className="empty" />
      <div className="empty" />
      <div className="empty" />
    </div>
  );
};

export default CardDiv;
