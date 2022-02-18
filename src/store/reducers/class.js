import * as actionTypes from '../constants/class';

const initialState = {
  classes: {
    loading: false,
    success: false,
    error: null,
    data: []
  }
};

export default function classReducers(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_CLASSES:
      return {
        ...state,
        classes: {
          ...state.classes,
          loading: true
        }
      };
    case actionTypes.GET_CLASSES_SUCCESS:
      return {
        ...state,
        classes: {
          ...state.classes,
          data: action.classes,
          loading: false
        }
      };
    case actionTypes.GET_CLASSES_FAILED:
      return {
        ...state,
        classes: {
          ...state.classes,
          error: action.error,
          loading: false
        }
      };
    default:
      return state;
  }
}
