import Request from 'helpers/request';
import { API_URL } from '../constants';

const SCHOOL_URL = `${API_URL}/schools`;

export const getSchools = async () => {
  try {
    const { data } = await Request.get(`${SCHOOL_URL}`);

    return data;
  } catch (error) {
    throw new Error(error);
  }
};
