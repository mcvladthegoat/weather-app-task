import ActionTypes from "./types";
import initialData from "../initial-data.json";
import { fetchCurrentWeather } from "../../api";

export const restoreLocalStorage = (storageData) => (dispatch) => {
  return dispatch({
    type: ActionTypes.RESTORE_LOCAL_STORAGE,
    data: storageData,
  });
};

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

export const clearError = () => (dispatch) => {
  dispatch({
    type: ActionTypes.CLEAR_ERROR,
  });
};

export const addNote = (id, note) => (dispatch) => {
  dispatch({
    type: ActionTypes.ADD_NOTE,
    data: { id, note },
  });
};

export const setFavoriteCity = (id, favorite) => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_FAVORITE_CITY,
    data: { id, favorite },
  });
};

export const removeFavoriteCity = (id) => (dispatch) =>
  setFavoriteCity(id, false)(dispatch);
