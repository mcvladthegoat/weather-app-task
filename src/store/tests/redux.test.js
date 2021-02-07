import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";

import { initialState } from "../reducers";
import { clearError, removeFavoriteCity } from "../actions";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// You would import the action from your codebase in a real scenario
const addTodo = () => ({ type: "CLEAR_ERROR" });

it("should dispatch action", async () => {
  // Initialize mockstore with empty state
  // const initialState = {}
  const store = mockStore({
    ...initialState,
    error: "yes",
  });

  // Dispatch the action
  await store.dispatch(clearError());

  // Test if your store dispatched the expected actions
  const state = store.getActions();
  const expectedPayload = {
    loading: true,
  };
  expect(state).toEqual(expectedPayload);
});
