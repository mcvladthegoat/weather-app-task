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
