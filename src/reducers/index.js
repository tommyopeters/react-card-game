import { combineReducers } from "redux";
import GameReducer from "./GameReducer";

const allReducers = combineReducers({
  Game: GameReducer
});

export default allReducers;
