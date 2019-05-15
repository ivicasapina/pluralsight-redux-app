import * as types from '../actions/actionTypes';
import initialState from './initialState';

function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.CREATE_COURSE:
      return [...state, { ...action.payload }];
    case types.LOAD_COURSES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}

export default courseReducer;