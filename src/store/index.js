import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const root = combineReducers({
  root: rootReducer,
});

export default createStore(
  root,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension && process.env.NODE_ENV === "development"
      ? window.devToolsExtension()
      : (f) => f
  )
);
