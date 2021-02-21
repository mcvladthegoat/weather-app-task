import moment from "moment";
import ActionTypes from "../actions/types";
import { fetchCurrentWeather } from "../../api";

export const MAX_WEATHER_DATA_AGE = 1000 * 60 * 20; // 20 minutes

export const perlocateWeatherData = () => (dispatch, getState) => {
  const weather = getState().root.weather;
  const now = +moment.utc();
  const removeQueue = [];
  const updateQueue = [];

  Object.values(weather).forEach((data) => {
    if (!data.favorite && !data.default) {
      removeQueue.push(data.id);
    } else if (now - data.updated_at >= MAX_WEATHER_DATA_AGE) {
      updateQueue.push(`${data.location.name} ${data.location.country}`);
    }
  });

  if (removeQueue.length > 0) {
    dispatch({
      type: ActionTypes.REMOVE_WEATHER_DATA,
      data: { removeQueue },
    });
  }

  updateQueue.forEach((locationName) =>
    fetchCurrentWeather(locationName)(dispatch)
  );
};
