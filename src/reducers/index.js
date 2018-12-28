import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import { channelReducer } from "./channel.reducer";

export const rootReducer = combineReducers({
  user: authReducer,
  channel: channelReducer,
  userPosts: null
});
