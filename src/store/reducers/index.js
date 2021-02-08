import moment from "moment";
import ActionTypes from "../actions/types";

export const initialState = {
  weather: {},
  notes: {},
  loading: false,
  error: null,
  storageLoaded: false,
  userLocation: {
    requested: false,
    id: null,
  },
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
          storageLoaded: true,
        };
      } catch (e) {
        return state;
      }
    }
    case ActionTypes.RESET_ALL_DATA:
      return initialState;

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
          updated_at: res.updated_at || +moment.utc(),
        },
      };

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
          ...state.weather[action.data.id],
          default: false,
        },
      };

      return {
        ...state,
        weather,
      };
    }
    case ActionTypes.SET_FAVORITE_CITY: {
      const { id: locationId, favorite } = action.data;
      const weather = {
        ...state.weather,
        [locationId]: {
          ...state.weather[locationId],
          favorite,
        },
      };

      return {
        ...state,
        weather,
      };
    }
    case ActionTypes.REMOVE_WEATHER_DATA: {
      const weather = state.weather;
      action.data.removeQueue.forEach((id) => {
        delete weather[id];
      });

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
    case ActionTypes.REQUEST_USER_LOCATION:
      return {
        ...state,
        userLocation: {
          ...state.userLocation,
          requested: true,
        },
      };
    case ActionTypes.SET_USER_LOCATION_ID: {
      const { id } = action.data;

      return {
        ...state,
        userLocation: {
          ...state.userLocation,
          id,
        },
      };
    }
    case ActionTypes.ADD_NOTE: {
      const { id: locationId, value, noteId } = action.data;
      const previousNotes = state.notes[locationId] || [];
      const notes = {
        ...state.notes,
        [locationId]: [
          ...previousNotes,
          {
            id: +noteId || +moment.utc(),
            value: value.toString(),
          },
        ],
      };

      return {
        ...state,
        notes,
      };
    }
    case ActionTypes.EDIT_NOTE: {
      const { id: locationId, noteId, value } = action.data;
      const locationNotes = state.notes[locationId];
      const editingNoteIndex = locationNotes.findIndex(
        (note) => note.id === +noteId
      );
      locationNotes[editingNoteIndex].value = value.toString();

      const notes = {
        ...state.notes,
        [locationId]: [...locationNotes],
      };

      return {
        ...state,
        notes,
      };
    }
    case ActionTypes.REMOVE_NOTE: {
      const { id: locationId, noteId } = action.data;
      const locationNotes = state.notes[locationId];
      const editingNoteIndex = locationNotes.findIndex(
        (note) => note.id === +noteId
      );
      locationNotes.splice(editingNoteIndex, 1);

      const notes = {
        ...state.notes,
        [locationId]: [...locationNotes],
      };

      return {
        ...state,
        notes,
      };
    }
    default:
      return state;
  }
};
