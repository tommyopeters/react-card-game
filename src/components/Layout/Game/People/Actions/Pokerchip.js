import React from "react";

const Pokerchip = props => {
  const handleChipClick = () => {
    props.chipClick(props.chipValue);
  };
  return (
    <div className={`pokerchip ${props.chipColor}`} onClick={handleChipClick} />
  );
};

export default Pokerchip;
