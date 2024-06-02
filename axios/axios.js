import axios from 'axios';

export const baseURL = import.meta.env.VITE_APP_BASE_URL + '/api';

export const customAxios = axios.create({
  baseURL: baseURL,
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});

customAxios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  function (response) {
    const customResponse = {
      success: true,
      data: response.data,
      status: response.status,
    };
    return customResponse;
  },
  function (error) {
    const customResponse = {
      success: false,
      errors: error.response.data,
    };
    return customResponse;
  }
);
