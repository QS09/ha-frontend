/* eslint-disable no-unused-vars */
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { create } from 'apisauce';
import * as interceptors from './interceptors';

/**
 * Web api confgiration
 */
export const webApi = ({ auth, req, res, asset } = {}) => {
  const baseApi = axios.create({
    baseURL: asset ? '' : process.env.apiBaseUrl,
    responseType: asset ? 'blob' : false,
    useAuth: auth,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
    },
  });

  baseApi.interceptors.request.use(
    (config) => {
      const accessToken = globalThis.localStorage.getItem('accessToken');
      if (config.useAuth) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      config = interceptors.uploadRequest(baseApi, config);
      return config;
    },
    (error) => Promise.reject(error)
  );

  baseApi.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (!originalConfig.url.startsWith('/auth') && err.response) {
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const refreshToken =
              globalThis.localStorage.getItem('refreshToken');
            const { data } = await baseApi.post(
              '/auth/login/refresh/',
              { refresh: refreshToken },
              { formData: true }
            );
            const { access, refresh } = data;
            globalThis.localStorage.setItem('accessToken', access);
            globalThis.localStorage.setItem('refreshToken', refresh);
            return baseApi(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );

  axiosRetry(baseApi, { retryDelay: axiosRetry.exponentialDelay });

  return create({
    axiosInstance: baseApi,
    timeout: 20000,
  });
};
