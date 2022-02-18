import axios from 'axios';

const instance = axios.create({
  timeout: 100000
});

const handleError = (err) => {
  if (err.response) {
    const message = err.response && err.response.data && err.response.data.message;
    if (message) {
      console.log('message ', message);
    }
  } else if (err.request) {
    console.log('error.request', 'Network error!');
  } else {
    console.log('An unknown error has occurred!');
  }
};

export default class Request {
  static async getHeader(config = {}) {
    return {
      accept: 'application/json',
      contentType: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      ...config
    };
  }

  static async get(apiUrl, params) {
    const header = await this.getHeader();
    return instance
      .get(apiUrl, {
        headers: header,
        params,
        paramsSerializer: (params) => JSON.stringify(params, { arrayFormat: 'repeat' })
      })
      .then((data) => data.data)
      .catch((err) => {
        handleError(err);
        throw err;
      });
  }

  static async post(apiUrl, data, config) {
    return instance({
      method: 'POST',
      url: apiUrl,
      headers: await this.getHeader(config),
      data
    })
      .then((data) => data.data)
      .catch((e) => {
        handleError(e);
        throw e;
      });
  }

  static async put(apiUrl, data = {}) {
    return instance({
      method: 'put',
      url: apiUrl,
      headers: await this.getHeader(),
      data
    })
      .then((data) => data.data)
      .catch((e) => {
        handleError(e);
        throw e;
      });
  }

  static async delete(apiUrl) {
    return instance({
      method: 'delete',
      url: apiUrl,
      headers: await this.getHeader()
    })
      .then((data) => data.data)
      .catch((e) => {
        handleError(e);
        throw e;
      });
  }
}
