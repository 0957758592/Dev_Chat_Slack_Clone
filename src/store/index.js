import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { rootReducer } from "../reducers";

const middleware = applyMiddleware(thunk);

export const store = createStore(rootReducer, composeWithDevTools(middleware));
