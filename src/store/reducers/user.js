import * as actionTypes from '../constants/user';

const initialState = {
  users: {
    loading: false,
    success: false,
    error: null,
    data: null
  }
};

export default function userReducers(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_USERS:
      return {
        ...state,
        users: {
          ...state.users,
          loading: true
        }
      };
    case actionTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        users: {
          ...state.users,
          data: action.users,
          loading: false
        }
      };
    case actionTypes.GET_USERS_FAILED:
      return {
        ...state,
        users: {
          ...state.users,
          error: action.error,
          loading: false
        }
      };
    default:
      return state;
  }
}
