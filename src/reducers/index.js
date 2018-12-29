import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import { channelReducer } from "./channel.reducer";
import { colorsReducer } from "./colors.reducer";

export const rootReducer = combineReducers({
  user: authReducer,
  channel: channelReducer,
  colors: colorsReducer
});
