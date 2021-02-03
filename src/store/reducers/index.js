import moment from "moment";
import ActionTypes from "../actions/types";
import { backupStoreItem } from "../../utils";

const initialState = {
  weather: {},
  notes: {},
  loading: false,
  error: null,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.RESTORE_LOCAL_STORAGE: {
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
    }
    case ActionTypes.FETCH_WEATHER_START: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case ActionTypes.FETCH_WEATHER_SUCCESS: {
      const res = action.data;
      const locationKey = `${res.location.lat},${res.location.lon}`;
      const lastRes = state.weather[locationKey];
      const isDefault = lastRes ? lastRes.default : res.default;
      const isFavorite = lastRes ? lastRes.favorite : false;
      let weather = {
        ...state.weather,
        [locationKey]: {
          id: locationKey,
          location: res.location,
          current: res.current,
          default: isDefault,
          favorite: isFavorite,
          updated_at: +moment.utc(),
        },
      };
      backupStoreItem("weather", weather);

      return {
        ...state,
        weather,
        loading: false,
      };
    }
    case ActionTypes.FETCH_WEATHER_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.data.error,
      };
    }
    case ActionTypes.REMOVE_DEFAULT_CITY: {
      const weather = {
        ...state.weather,
        [action.data.id]: {
          ...state[action.data.id],
          default: false,
        },
      };
      backupStoreItem("weather", weather);

      return {
        ...state,
        weather,
      };
    }
    case ActionTypes.REMOVE_FAVORITE_CITY: {
      const weather = {
        ...state.weather,
        [action.data.id]: {
          ...state[action.data.id],
          favorite: false,
        },
      };
      backupStoreItem("weather", weather);

      return {
        ...state,
        weather,
      };
    }
    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
