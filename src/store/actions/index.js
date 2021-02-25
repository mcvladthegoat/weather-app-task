import ActionTypes from "./types";
import initialData from "../initial-data.json";
import { fetchCurrentWeather } from "../../api";

export const restoreLocalStorage = (storageData) => (dispatch) =>
  dispatch({
    type: ActionTypes.RESTORE_LOCAL_STORAGE,
    data: storageData,
  });

export const resetAllData = () => (dispatch) =>
  dispatch({
    type: ActionTypes.RESET_ALL_DATA,
  });

export const setInitialData = () => (dispatch) => {
  const params = {
    default: true,
  };

  restoreLocalStorage()(dispatch);

  initialData.cities.forEach((cityName) => {
    fetchCurrentWeather(cityName, params)(dispatch);
  });
};

export const fetchWeatherStart = () => (dispatch) =>
  dispatch({
    type: ActionTypes.FETCH_WEATHER_START,
  });

export const fetchWeatherSuccess = (data) => (dispatch) =>
  dispatch({
    type: ActionTypes.FETCH_WEATHER_SUCCESS,
    data,
  });

export const fetchWeatherFailure = (error) => (dispatch) =>
  dispatch({
    type: ActionTypes.FETCH_WEATHER_FAILURE,
    data: { error },
  });

export const removeDefaultCity = (id) => (dispatch) =>
  dispatch({
    type: ActionTypes.REMOVE_DEFAULT_CITY,
    data: { id },
  });

export const clearError = () => (dispatch) =>
  dispatch({
    type: ActionTypes.CLEAR_ERROR,
  });

export const addNote = (id, value, noteId) => (dispatch) =>
  dispatch({
    type: ActionTypes.ADD_NOTE,
    data: { id, value, noteId },
  });

export const editNote = (id, noteId, value) => (dispatch) =>
  dispatch({
    type: ActionTypes.EDIT_NOTE,
    data: { id, noteId, value },
  });

export const removeNote = (id, noteId) => (dispatch) =>
  dispatch({
    type: ActionTypes.REMOVE_NOTE,
    data: { id, noteId },
  });

export const setFavoriteCity = (id, favorite) => (dispatch) =>
  dispatch({
    type: ActionTypes.SET_FAVORITE_CITY,
    data: { id, favorite },
  });

export const requestUserLocation = () => (dispatch) =>
  dispatch({
    type: ActionTypes.REQUEST_USER_LOCATION,
  });

export const setUserLocationId = (id) => (dispatch) =>
  dispatch({
    type: ActionTypes.SET_USER_LOCATION_ID,
    data: { id },
  });

export const fetchSuggestionsSuccess = (results) => (dispatch) =>
  dispatch({
    type: ActionTypes.FETCH_SUGGESTIONS_SUCCESS,
    data: { results },
  });

export const clearSuggestions = () => (dispatch) =>
  dispatch({
    type: ActionTypes.CLEAR_SUGGESTIONS,
  });
