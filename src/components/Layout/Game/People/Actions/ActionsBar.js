import React from "react";
import Prebet from "./Prebet";
import Postbet from "./Postbet";

const ActionsBar = props => {
  return (
    <div className="actions">
      {!props.Session.betPlaced ? <Prebet {...props} /> : null}
      {props.Session.betPlaced ? <Postbet {...props} /> : null}
    </div>
  );
};

export default ActionsBar;
