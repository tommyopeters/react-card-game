import React from "react";

const GameAftermath = props => (
  <div className="gameaftermath animatein">
    {props.Session.blackjack ? (
      <div className="blackjack animatein ">BLACKJACK!!!</div>
    ) : null}
    {props.Session.gameWon ? (
      <div className="win animatein">YOU WIN!!!</div>
    ) : null}
    {props.Session.gameLost && props.Session.wallet > 0 ? (
      <div className="lose animatein">YOU LOSE!</div>
    ) : null}
    {props.Session.gameLost && props.Session.wallet <= 0 ? (
      <div className="gameover animatein">GAME OVER!</div>
    ) : null}
    {props.Session.gameNewSession ? (
      <div className="newhand animatein">NEW HAND</div>
    ) : null}
    {props.Session.gameDrawn ? (
      <div className="draw animatein">PUSH!!</div>
    ) : null}
  </div>
);

export default GameAftermath;
