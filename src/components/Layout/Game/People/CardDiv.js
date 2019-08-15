import React from "react";
import Cards from "./Cards";

const CardDiv = props => {
  console.log(props);
  return <div className="carddiv">{props.emptyCards}</div>;
};

export default CardDiv;
