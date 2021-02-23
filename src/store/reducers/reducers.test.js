import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
  restoreLocalStorage,
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
  resetAllData,
} from "../actions";
import ActionTypes from "../actions/types";
import { initialState, rootReducer as reducer } from "../reducers";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Testing redux reducer", () => {
  let store;

  beforeEach(() => (store = mockStore(initialState)));

  it(`${ActionTypes.RESTORE_LOCAL_STORAGE} case test`, () => {
    const mockData = {
      weather: '{"12.34": {}}',
      notes: '{"12.34": {}}',
    };
    store.dispatch(restoreLocalStorage(mockData));
    const action = store.getActions()[0];

    expect(reducer(store.getState(), action)).toEqual({
      ...initialState,
      weather: {
        12.34: {},
      },
      notes: {
        12.34: {},
      },
      storageLoaded: true,
    });
  });

  it(`${ActionTypes.RESET_ALL_DATA} case test`, () => {
    store.dispatch(resetAllData());
    const action = store.getActions()[0];

    expect(reducer(store.getState(), action)).toEqual({
      ...initialState,
    });
  });

  it(`${ActionTypes.FETCH_WEATHER_START} case test`, () => {
    store.dispatch(fetchWeatherStart());
    const action = store.getActions()[0];

    expect(reducer(store.getState(), action)).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it(`${ActionTypes.FETCH_WEATHER_SUCCESS} + ${ActionTypes.REMOVE_DEFAULT_CITY} + ${ActionTypes.SET_FAVORITE_CITY} cases test`, () => {
    const mockData = {
      default: true,
      updated_at: 12345678,
      current: {},
      location: {
        lat: "12.34",
        lon: "56.78",
      },
    };

    store.dispatch(fetchWeatherSuccess(mockData));
    store.dispatch(removeDefaultCity("12.34,56.78"));
    store.dispatch(setFavoriteCity("12.34,56.78", true));
    store.dispatch(setFavoriteCity("12.34,56.78", false));

    const actions = store.getActions();
    const stateAfterFetchWeatherSuccess = reducer(store.getState(), actions[0]);

    expect(stateAfterFetchWeatherSuccess).toEqual({
      ...initialState,
      weather: {
        "12.34,56.78": {
          id: "12.34,56.78",
          default: true,
          updated_at: 12345678,
          favorite: false,
          current: {},
          location: {
            lat: "12.34",
            lon: "56.78",
          },
        },
      },
    });
    expect(reducer(stateAfterFetchWeatherSuccess, actions[1])).toEqual({
      ...initialState,
      weather: {
        "12.34,56.78": {
          id: "12.34,56.78",
          default: false,
          updated_at: 12345678,
          favorite: false,
          current: {},
          location: {
            lat: "12.34",
            lon: "56.78",
          },
        },
      },
    });

    const stateAfterSetFavoriteCity = reducer(
      stateAfterFetchWeatherSuccess,
      actions[2]
    );

    expect(reducer(stateAfterSetFavoriteCity, actions[2])).toEqual({
      ...initialState,
      weather: {
        "12.34,56.78": {
          id: "12.34,56.78",
          default: true,
          updated_at: 12345678,
          favorite: true,
          current: {},
          location: {
            lat: "12.34",
            lon: "56.78",
          },
        },
      },
    });

    expect(reducer(stateAfterSetFavoriteCity, actions[3])).toEqual({
      ...initialState,
      weather: {
        "12.34,56.78": {
          id: "12.34,56.78",
          default: true,
          updated_at: 12345678,
          favorite: false,
          current: {},
          location: {
            lat: "12.34",
            lon: "56.78",
          },
        },
      },
    });
  });

  it(`${ActionTypes.FETCH_WEATHER_FAILURE} + ${ActionTypes.CLEAR_ERROR} cases test`, () => {
    store.dispatch(fetchWeatherFailure("error happened"));
    store.dispatch(clearError());

    const actions = store.getActions();
    const stateAfterFetchWeatherFailure = reducer(store.getState(), actions[0]);

    expect(stateAfterFetchWeatherFailure).toEqual({
      ...initialState,
      loading: false,
      error: "error happened",
    });

    expect(reducer(stateAfterFetchWeatherFailure, actions[1])).toEqual({
      ...initialState,
      loading: false,
      error: null,
    });
  });

  it(`${ActionTypes.ADD_NOTE} + ${ActionTypes.EDIT_NOTE} + ${ActionTypes.REMOVE_NOTE} cases test`, () => {
    store.dispatch(addNote("12.34", "test note", 12345678));
    store.dispatch(editNote("12.34", 12345678, "edited test note"));
    store.dispatch(removeNote("12.34", 12345678));

    const actions = store.getActions();
    const stateAfterAddNote = reducer(store.getState(), actions[0]);

    expect(stateAfterAddNote).toEqual({
      ...initialState,
      notes: {
        12.34: [
          {
            id: 12345678,
            value: "test note",
          },
        ],
      },
    });

    expect(reducer(stateAfterAddNote, actions[1])).toEqual({
      ...initialState,
      notes: {
        12.34: [
          {
            id: 12345678,
            value: "edited test note",
          },
        ],
      },
    });

    expect(reducer(stateAfterAddNote, actions[2])).toEqual({
      ...initialState,
      notes: {
        12.34: [],
      },
    });
  });

  it(`${ActionTypes.REQUEST_USER_LOCATION} + ${ActionTypes.SET_USER_LOCATION_ID} cases test`, () => {
    store.dispatch(requestUserLocation());
    store.dispatch(setUserLocationId("12.34,56.78"));
    const actions = store.getActions();
    const stateAfterRequestUserLocation = reducer(store.getState(), actions[0]);
    expect(stateAfterRequestUserLocation).toEqual({
      ...initialState,
      userLocation: {
        id: null,
        requested: true,
      },
    });

    expect(reducer(stateAfterRequestUserLocation, actions[1])).toEqual({
      ...initialState,
      userLocation: {
        id: "12.34,56.78",
        requested: true,
      },
    });
  });
});
