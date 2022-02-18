import * as actionTypes from '../constants/school';

const initialState = {
  schools: {
    loading: false,
    success: false,
    error: null,
    data: []
  }
};

export default function schoolReducers(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_SCHOOLS:
      return {
        ...state,
        schools: {
          ...state.schools,
          loading: true
        }
      };
    case actionTypes.GET_SCHOOLS_SUCCESS:
      return {
        ...state,
        schools: {
          ...state.schools,
          data: action.schools,
          loading: false
        }
      };
    case actionTypes.GET_SCHOOLS_FAILED:
      return {
        ...state,
        schools: {
          ...state.schools,
          error: action.error,
          loading: false
        }
      };
    default:
      return state;
  }
}
