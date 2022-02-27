import Request from 'helpers/request';
import { API_URL } from '../constants';

const CLASS_URL = `${API_URL}/classes`;

export const getClasses = async () => {
  try {
    const data = await Request.get(`${CLASS_URL}`);

    return data;
  } catch (error) {
    throw new Error(error);
  }
};
