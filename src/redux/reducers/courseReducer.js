import * as types from '../actions/actionTypes';

function courseReducer(state = [], action) {
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