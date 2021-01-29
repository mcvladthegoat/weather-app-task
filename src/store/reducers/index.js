import actionTypes from '../actions/types'

const initialState = {
  weather: {},
  notes: {},
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};