import React, { Component } from "react";

import GameBackground from "./GameBackground";
import GameBoard from "./Game/GameBoard";

class Layout extends Component {
  render() {
    return (
      <div>
        <GameBackground />
        <GameBoard />
      </div>
    );
  }
}

export default Layout;
