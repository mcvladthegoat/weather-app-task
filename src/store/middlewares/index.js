import { backupStoreItem, removeAllBackups } from "../../utils";
import ActionTypes from "../actions/types";

const backupMiddleware = (store) => (next) => (action) => {
  next(action);
  const state = store.getState();
  switch (action.type) {
    case ActionTypes.FETCH_WEATHER_SUCCESS:
    case ActionTypes.SET_FAVORITE_CITY:
    case ActionTypes.REMOVE_DEFAULT_CITY:
      backupStoreItem("weather", state.root.weather);
      break;
    case ActionTypes.ADD_NOTE:
    case ActionTypes.EDIT_NOTE:
    case ActionTypes.REMOVE_NOTE:
      backupStoreItem("notes", state.root.notes);
      break;
    case ActionTypes.RESET_ALL_DATA:
      removeAllBackups();
      break;
    default:
      break;
  }
};

export default backupMiddleware;
