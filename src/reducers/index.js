import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
// import phonesPage from "./phonesPage.reducer";

export const rootReducer = combineReducers({
  user: authReducer
  // phones: phonesPage
});
