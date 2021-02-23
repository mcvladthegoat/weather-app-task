import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
  restoreLocalStorage,
  resetAllData,
  fetchWeatherStart,
  fetchWeatherSuccess,
  fetchWeatherFailure,
  removeDefaultCity,
  clearError,
  addNote,
  editNote,
  removeNote,
  setFavoriteCity,
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

  it("restoreLocalStorage action test", () => {
    store.dispatch(restoreLocalStorage({ data: true }));
    expect(store.getActions()[0]).toEqual({
      type: ActionTypes.RESTORE_LOCAL_STORAGE,
      data: {
        data: true,
      },
    });
  });

  it("resetAllData action test", () => {
    store.dispatch(resetAllData());
    expect(store.getActions()[0]).toEqual({
      type: ActionTypes.RESET_ALL_DATA,
    });
  });

  it("fetchWeatherStart action test", () => {
    store.dispatch(fetchWeatherStart());
    expect(store.getActions()[0]).toEqual({
      type: ActionTypes.FETCH_WEATHER_START,
    });
  });

  it("fetchWeatherSuccess action test", () => {
    store.dispatch(fetchWeatherSuccess({ test: true }));
    expect(store.getActions()[0]).toEqual({
      type: ActionTypes.FETCH_WEATHER_SUCCESS,
      data: {
        test: true,
      },
    });
  });

  it("fetchWeatherFailure action test", () => {
    store.dispatch(fetchWeatherFailure("error happened"));
    expect(store.getActions()[0]).toEqual({
      type: ActionTypes.FETCH_WEATHER_FAILURE,
      data: {
        error: "error happened",
      },
    });
  });

  it("removeDefaultCity action test", () => {
    store.dispatch(removeDefaultCity(1));
    expect(store.getActions()[0]).toEqual({
      type: ActionTypes.REMOVE_DEFAULT_CITY,
      data: {
        id: 1,
      },
    });
  });

  it("clearError action test", () => {
    store.dispatch(clearError());
    expect(store.getActions()[0]).toEqual({
      type: ActionTypes.CLEAR_ERROR,
    });
  });

  it("addNote action test", () => {
    store.dispatch(addNote(1, "test note"));
    expect(store.getActions()[0]).toEqual({
      type: ActionTypes.ADD_NOTE,
      data: {
        id: 1,
        value: "test note",
      },
    });
  });

  it("editNote action test", () => {
    store.dispatch(editNote(1, 234, "edited note"));
    expect(store.getActions()[0]).toEqual({
      type: ActionTypes.EDIT_NOTE,
      data: {
        id: 1,
        noteId: 234,
        value: "edited note",
      },
    });
  });

  it("removeNote action test", () => {
    store.dispatch(removeNote(1, 234));
    expect(store.getActions()[0]).toEqual({
      type: ActionTypes.REMOVE_NOTE,
      data: {
        id: 1,
        noteId: 234,
      },
    });
  });

  it("setFavoriteCity action test", () => {
    store.dispatch(setFavoriteCity(1, true));
    expect(store.getActions()[0]).toEqual({
      type: ActionTypes.SET_FAVORITE_CITY,
      data: {
        id: 1,
        favorite: true,
      },
    });
  });

  it("requestUserLocation action test", () => {
    store.dispatch(requestUserLocation());
    expect(store.getActions()[0]).toEqual({
      type: ActionTypes.REQUEST_USER_LOCATION,
    });
  });

  it("setUserLocationId action test", () => {
    store.dispatch(setUserLocationId("12.345,56.789"));
    expect(store.getActions()[0]).toEqual({
      type: ActionTypes.SET_USER_LOCATION_ID,
      data: {
        id: "12.345,56.789",
      },
    });
  });
});
