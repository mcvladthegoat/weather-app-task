import ActionTypes from "./types";
import initialData from "../initial-data.json";
import { fetchCurrentWeather } from "../../api";

export const restoreLocalStorage = (storageData) => (dispatch) =>
  dispatch({
    type: ActionTypes.RESTORE_LOCAL_STORAGE,
    data: storageData,
  });

export const setInitialData = () => (dispatch) => {
  const params = {
    default: true,
  };

  initialData.cities.forEach((cityName) => {
    fetchCurrentWeather(cityName, params)(dispatch);
  });
};

export const removeDefaultCity = (id) => (dispatch) =>
  dispatch({
    type: ActionTypes.REMOVE_DEFAULT_CITY,
    data: { id },
  });

export const clearError = () => (dispatch) =>
  dispatch({
    type: ActionTypes.CLEAR_ERROR,
  });

export const addNote = (id, value) => (dispatch) =>
  dispatch({
    type: ActionTypes.ADD_NOTE,
    data: { id, value },
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

export const removeFavoriteCity = (id) => (dispatch) =>
  setFavoriteCity(id, false)(dispatch);

export const requestUserLocation = () => (dispatch) =>
  dispatch({
    type: ActionTypes.REQUEST_USER_LOCATION,
  });

export const setUserLocationId = (id) => (dispatch) =>
  dispatch({
    type: ActionTypes.SET_USER_LOCATION_ID,
    data: { id },
  });
