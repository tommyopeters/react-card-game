import GameEngine from "../logic/GameEngine";
import Deck from "../logic/Deck";

let Game = new GameEngine();

export default function() {
  return { Game: Game };
}
