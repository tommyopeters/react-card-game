import React from "react";

const GameAftermath = props => {
  const handleAftermathClick = () => {
    props.aftermathClick();
  };
  return (
    <div className="gameaftermath animatein" onClick={handleAftermathClick}>
      {props.Session.blackjack ? (
        <div className="blackjack animatein ">BLACKJACK!!!</div>
      ) : null}
      {props.Session.sessionWon ? (
        <div className="win animatein">YOU WIN!!!</div>
      ) : null}
      {props.Session.sessionLost ? (
        <div className="lose animatein">YOU LOSE!</div>
      ) : null}
      {props.Session.gameLost && props.Session.wallet <= 0 ? (
        <div className="gameover animatein">GAME OVER!</div>
      ) : null}
      {props.Session.newSession ? (
        <div className="newhand animatein">NEW HAND</div>
      ) : null}
      {props.Session.sessionDrawn ? (
        <div className="draw animatein">PUSH!!</div>
      ) : null}
    </div>
  );
};

export default GameAftermath;
