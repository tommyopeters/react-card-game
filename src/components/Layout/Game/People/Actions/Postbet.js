import React from "react";

export default function Postbet(props) {
  return (
    <div className="postbet">
      <div className="hit button" onClick={props.hit}>
        HIT
      </div>
      <div className="stand button" onClick={props.stand}>
        STAND
      </div>
      {props.Session.double ? (
        <div className="doubledown button" onClick={props.doubledown}>
          DOUBLE DOWN
        </div>
      ) : null}
      {props.Session.split ? (
        <div className="split button" onClick={props.split}>
          SPLIT
        </div>
      ) : null}
      {props.Session.ace ? (
        <div className="ace button" onClick={props.changeAce}>
          ACE &nbsp; <span id="acevalue">{props.Session.aceValue}</span>
        </div>
      ) : null}
    </div>
  );
}
