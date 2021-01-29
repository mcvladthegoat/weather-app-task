import axios from "axios";
import { accessKey } from "./config.json";
import actionTypes from "../store/actions/types";

const axiosInstance = axios.create();

const baseApiUrl = "http://api.weatherstack.com/";
const currentWeatherApiUrl = (query) =>
  `${baseApiUrl}/current?access_key=${accessKey}&query=${query}`;

export const fetchCurrentWeather = (query) => (dispatch) => {
  axios
    .get(currentWeatherApiUrl(query))
    .then((response) =>
      dispatch({
        type: actionTypes.FETCH_WEATHER_SUCCESS,
        data: response.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: actionTypes.FETCH_WEATHER_FAILURE,
        data: error,
      })
    );
};
