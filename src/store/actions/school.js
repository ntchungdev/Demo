import { getSchools } from 'api/school';
import * as Actions from '../constants/school';

export const getSchoolsAction = () => async (dispatch) => {
  try {
    dispatch({ type: Actions.GET_SCHOOLS });
    const schools = await getSchools();

    dispatch({ type: Actions.GET_SCHOOLS_SUCCESS, schools });
  } catch (error) {
    dispatch({ type: Actions.GET_SCHOOLS_FAILED, error });
  }
};
