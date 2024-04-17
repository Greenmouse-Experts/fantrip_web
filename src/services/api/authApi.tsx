import axios from "axios";
import { USERS_REGISTER } from "../constant.tsx";
import { BASE_URL } from "../constant.tsx";
import { USERS_LOGIN } from "../constant.tsx";
import { FORGET_PASSWORD } from "../constant.tsx";
import { RESET_PASSWORD } from "../constant.tsx";
import { getBearerToken, getToken } from "../helpers.tsx";
import * as ENDPOINT from "../constant";

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Authorization"] = getBearerToken();
axios.interceptors.request.use(
  function(config) {
    const token = getToken(); 
    if (token) {
      config.headers["Authorization"] = getBearerToken();
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
        localStorage.clear()
      return (window.location.href = "/auth/login");
    }
    return Promise.reject(error);
  }
);
export const registerUser = async (payload:any) => {
  return axios
    .post(`${USERS_REGISTER}`, payload)
    .then((response) => response.data);
};

export const loginUser = async (payload:any) => {
  return axios
    .post(`${USERS_LOGIN}`, payload)
    .then((response) => response.data);
};

export const forgetPassword = async (payload:any) => {
  return axios
    .post(`${FORGET_PASSWORD}`, payload)
    .then((response) => response.data);
};

export const resetPassword = async (payload:any, token:any) => {
  return axios
    .post(`${RESET_PASSWORD}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};

export const updateProfile = async (payload:any) => {
  return axios
    .post(`${ENDPOINT.UPDATE_PROFILE}`, payload)
    .then((response) => response.data);
};

export const updatePassword = async (payload:any) => {
  return axios
    .post(`${ENDPOINT.UPDATE_PASSWORD}`, payload)
    .then((response) => response.data);
};
