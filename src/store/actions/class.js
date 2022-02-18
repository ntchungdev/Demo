import { getClasses } from 'api/class';
import * as Actions from '../constants/class';

export const getClassesAction = () => async (dispatch) => {
  try {
    dispatch({ type: Actions.GET_CLASSES });
    const classes = await getClasses();

    dispatch({ type: Actions.GET_CLASSES_SUCCESS, classes });
  } catch (error) {
    dispatch({ type: Actions.GET_CLASSES_FAILED, error });
  }
};
