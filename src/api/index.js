import axios from "axios";
import { accessKey as accessKeyJson } from "./config.json";
import {
  fetchWeatherStart,
  fetchWeatherSuccess,
  fetchWeatherFailure,
  fetchSuggestionsSuccess,
  clearSuggestions,
} from "../store/actions";
import httpCodes from "./http-codes";

const axiosInstance = axios.create();

const apiProtocol = process.env.NODE_ENV === "production" ? "https" : "http";
const baseApiUrl = `${apiProtocol}://api.weatherstack.com/`;
const accessKey = accessKeyJson || process.env.API_ACCESS_KEY;

const currentWeatherApiUrl = (query) =>
  `${baseApiUrl}/current?access_key=${accessKey}&query=${query}`;
const suggestionsApiUrl = (query) =>
  `${baseApiUrl}/autocomplete?access_key=${accessKey}&query=${query}`;

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

export const fetchSuggestions = (rawQuery) => async (dispatch) => {
  const query = rawQuery.replace("&", "");
  try {
    const response = await axiosInstance.get(suggestionsApiUrl(query));
    if (response.data.error || !response.data.request.results) {
      throw Error();
    } else {
      return fetchSuggestionsSuccess(response.data.results)(dispatch);
    }
  } catch (error) {
    return clearSuggestions()(dispatch);
  }
};
