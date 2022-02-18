import { getUsers, createUser, updateUser, deleteUser } from 'api/user';
import * as Actions from '../constants/user';

export const getUsersAction = () => async (dispatch) => {
  try {
    dispatch({ type: Actions.GET_USERS });
    const users = await getUsers();

    dispatch({ type: Actions.GET_USERS_SUCCESS, users });
  } catch (error) {
    dispatch({ type: Actions.GET_USERS_FAILED, error });
  }
};

export const createUserAction = (payload) => async (dispatch) => {
  try {
    dispatch({ type: Actions.CREATE_USER });
    const user = await createUser(payload);

    dispatch({ type: Actions.CREATE_USER_SUCCESS, user });
  } catch (error) {
    dispatch({ type: Actions.CREATE_USER_FAILED, error });
  }
};

export const updateUserAction = (id, payload) => async (dispatch) => {
  try {
    dispatch({ type: Actions.UPDATE_USER });
    const user = await updateUser(id, payload);

    dispatch({ type: Actions.UPDATE_USER_SUCCESS, user });
  } catch (error) {
    dispatch({ type: Actions.UPDATE_USER_FAILED, error });
  }
};

export const deleteUserAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: Actions.DELETE_USER });
    const user = await deleteUser(id);

    dispatch({ type: Actions.DELETE_USER_SUCCESS, user });
  } catch (error) {
    dispatch({ type: Actions.DELETE_USER_FAILED, error });
  }
};
