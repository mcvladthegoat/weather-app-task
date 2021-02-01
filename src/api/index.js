import axios from "axios";
import { accessKey } from "./config.json";
import ActionTypes from "../store/actions/types";

const axiosInstance = axios.create();

const baseApiUrl = "http://api.weatherstack.com/";
const currentWeatherApiUrl = (query) =>
  `${baseApiUrl}/current?access_key=${accessKey}&query=${query}`;

export const fetchCurrentWeather = (rawQuery) => (dispatch) => {
  const query = rawQuery.replace(/[^a-zA-Z]+/g, "");
  dispatch({ type: ActionTypes.FETCH_WEATHER_START });
  axiosInstance
    .get(currentWeatherApiUrl(query))
    .then((response) => {
      return dispatch({
        type: response.data.error
          ? ActionTypes.FETCH_WEATHER_FAILURE
          : ActionTypes.FETCH_WEATHER_SUCCESS,
        data: response.data,
      });
    })
    .catch((error) =>
      dispatch({
        type: ActionTypes.FETCH_WEATHER_FAILURE,
        data: error,
      })
    );
};
