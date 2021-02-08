import axios from "axios";
import { accessKey } from "./config.json";
import {
  fetchWeatherStart,
  fetchWeatherSuccess,
  fetchWeatherFailure,
} from "../store/actions";
import httpCodes from "./http-codes";

const axiosInstance = axios.create();

const baseApiUrl = "http://api.weatherstack.com/";
const currentWeatherApiUrl = (query) =>
  `${baseApiUrl}/current?access_key=${
    accessKey || process.env.API_ACCESS_KEY
  }&query=${query}`;

const defaultParams = {
  default: false,
};

export const fetchCurrentWeather = (rawQuery, params = defaultParams) => async (
  dispatch
) => {
  const query = rawQuery.replace("&", "");

  fetchWeatherStart()(dispatch);
  try {
    const response = await axiosInstance.get(currentWeatherApiUrl(query));
    if (response.data.error) {
      throw Error(response.data.error.code);
    } else if (!response.data.location.lat || !response.data.location.lon) {
      throw Error(601); // for ex. this location hasn't essential data: -81.589569,162.099645
    } else {
      fetchWeatherSuccess({
        ...response.data,
        ...params,
      })(dispatch);

      return {
        lat: response.data.location.lat,
        lon: response.data.location.lon,
      };
    }
  } catch (error) {
    fetchWeatherFailure(httpCodes(error.message))(dispatch);
    return false;
  }
};
