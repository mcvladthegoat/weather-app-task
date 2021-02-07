import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";

import {
  restoreLocalStorage,
  removeDefaultCity,
  clearError,
  addNote,
  editNote,
  removeNote,
  setFavoriteCity,
  removeFavoriteCity,
  requestUserLocation,
  setUserLocationId,
} from ".";
import ActionTypes from "./types";
import { initialState } from "../reducers";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Testing redux actions data for reducer", () => {
  let store;

  beforeEach(() => (store = mockStore(initialState)));

  it("restoreLocalStorage action test", async () => {
    await store.dispatch(restoreLocalStorage({ data: true }));
    expect(store.getActions()[0]).toEqual({
      type: ActionTypes.RESTORE_LOCAL_STORAGE,
      data: {
        data: true,
      },
    });
  });

  it("removeDefaultCity action test", async () => {
    await store.dispatch(removeDefaultCity(1));
    expect(store.getActions()[0]).toEqual({
      type: ActionTypes.REMOVE_DEFAULT_CITY,
      data: {
        id: 1,
      },
    });
  });

  it("clearError action test", async () => {
    await store.dispatch(clearError());
    expect(store.getActions()[0]).toEqual({
      type: ActionTypes.CLEAR_ERROR,
    });
  });

  it("addNote action test", async () => {
    await store.dispatch(addNote(1, "test note"));
    expect(store.getActions()[0]).toEqual({
      type: ActionTypes.ADD_NOTE,
      data: {
        id: 1,
        value: "test note",
      },
    });
  });

  it("editNote action test", async () => {
    await store.dispatch(editNote(1, 234, "edited note"));
    expect(store.getActions()[0]).toEqual({
      type: ActionTypes.EDIT_NOTE,
      data: {
        id: 1,
        noteId: 234,
        value: "edited note",
      },
    });
  });

  it("removeNote action test", async () => {
    await store.dispatch(removeNote(1, 234));
    expect(store.getActions()[0]).toEqual({
      type: ActionTypes.REMOVE_NOTE,
      data: {
        id: 1,
        noteId: 234,
      },
    });
  });

  it("setFavoriteCity action test", async () => {
    await store.dispatch(setFavoriteCity(1, true));
    expect(store.getActions()[0]).toEqual({
      type: ActionTypes.SET_FAVORITE_CITY,
      data: {
        id: 1,
        favorite: true,
      },
    });
  });

  it("removeFavoriteCity action test", async () => {
    await store.dispatch(removeFavoriteCity(1));
    expect(store.getActions()[0]).toEqual({
      type: ActionTypes.SET_FAVORITE_CITY,
      data: {
        id: 1,
        favorite: false,
      },
    });
  });

  it("requestUserLocation action test", async () => {
    await store.dispatch(requestUserLocation());
    expect(store.getActions()[0]).toEqual({
      type: ActionTypes.REQUEST_USER_LOCATION,
    });
  });

  it("setUserLocationId action test", async () => {
    await store.dispatch(setUserLocationId("12.345,56.789"));
    expect(store.getActions()[0]).toEqual({
      type: ActionTypes.SET_USER_LOCATION_ID,
      data: {
        id: "12.345,56.789",
      },
    });
  });
});
