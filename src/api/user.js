import Request from 'helpers/request';
import { API_URL } from '../constants';

const USER_URL = `${API_URL}`;

export const login = async (email, password) => {
  try {
    const { data: token } = await Request.post(`${USER_URL}/users/login`, {
      email,
      password
    });
    localStorage.setItem('token', token);

    return token;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUsers = async () => {
  try {
    const { data } = await Request.get(`${USER_URL}/user_access`);

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createUser = async (payload) => {
  try {
    const { data } = await Request.post(`${USER_URL}/user_access`, payload);

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUser = async (id, payload) => {
  try {
    const { data } = await Request.put(`${USER_URL}/user_access/${id}`, payload);

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const { data } = await Request.delete(`${USER_URL}/user_access/${id}`);

    return data;
  } catch (error) {
    throw new Error(error);
  }
};
