import axios from "axios";
import { accessKey } from "./config.json";
import ActionTypes from "../store/actions/types";
import httpCodes from "./http-codes";

const axiosInstance = axios.create();

const baseApiUrl = "http://api.weatherstack.com/";
const currentWeatherApiUrl = (query) =>
  `${baseApiUrl}/current?access_key=${accessKey}&query=${query}`;

const defaultParams = {
  default: false,
};

export const fetchCurrentWeather = (rawQuery, params = defaultParams) => (
  dispatch
) => {
  const query = rawQuery.replace("&", "");

  dispatch({ type: ActionTypes.FETCH_WEATHER_START });
  return axiosInstance
    .get(currentWeatherApiUrl(query))
    .then((response) => {
      if (response.data.error) {
        throw Error(response.data.error.code);
      } else {
        dispatch({
          type: ActionTypes.FETCH_WEATHER_SUCCESS,
          data: {
            ...response.data,
            ...params,
          },
        });
        return {
          lat: response.data.location.lat,
          lon: response.data.location.lon,
        };
      }
    })
    .catch((error) => {
      dispatch({
        type: ActionTypes.FETCH_WEATHER_FAILURE,
        data: {
          error: httpCodes(error.message),
        },
      });
      return false;
    });
};
