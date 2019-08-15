import React from "react";

import Pokerchip from "./Actions/Pokerchip";

const ChipsTable = props => {
  return (
    <div className="chipstable">
      <div className="chips">
        <Pokerchip
          chipColor={"white"}
          chipValue={1}
          chipClick={props.chipClick}
        />
        <Pokerchip
          chipColor={"red"}
          chipValue={5}
          chipClick={props.chipClick}
        />
        <Pokerchip
          chipColor={"blue"}
          chipValue={10}
          chipClick={props.chipClick}
        />
        <Pokerchip
          chipColor={"green"}
          chipValue={25}
          chipClick={props.chipClick}
        />
        <Pokerchip
          chipColor={"black"}
          chipValue={100}
          chipClick={props.chipClick}
        />
      </div>
    </div>
  );
};

export default ChipsTable;
