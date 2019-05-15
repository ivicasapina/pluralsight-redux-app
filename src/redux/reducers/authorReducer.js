import * as types from '../actions/actionTypes';

function authorReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}

export default authorReducer;