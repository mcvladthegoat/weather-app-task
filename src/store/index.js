import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";

const root = combineReducers({
  root: rootReducer,
});

export default createStore(
  root,
  compose(
    applyMiddleware(thunk),
    process.env.NODE_ENV === "development" && window.devToolsExtension
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);
