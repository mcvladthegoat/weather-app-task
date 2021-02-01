import ActionTypes from "../actions/types";
import { backupStoreItem } from "../../utils";

const initialState = {
  weather: {},
  notes: {},
  loading: false,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.RESTORE_LOCAL_STORAGE:
      try {
        const weather = JSON.parse(action.data.weather);
        const notes = JSON.parse(action.data.notes) || {};
        return {
          ...state,
          weather,
          notes,
        };
      } catch (e) {
        return state;
      }

    case ActionTypes.FETCH_WEATHER_START:
      return { ...state, loading: true };

    case ActionTypes.FETCH_WEATHER_SUCCESS:
      const res = action.data;
      const locationKey = `${res.location.lat},${res.location.lon}`;
      const lastRes = state.weather[locationKey];
      const weather = {
        ...state.weather,
        [locationKey]: {
          ...res,
          favorite: lastRes ? lastRes.favorite : false,
        },
      };
      backupStoreItem("weather", weather);

      return {
        ...state,
        weather,
        loading: false,
      };
    default:
      return state;
  }
};
