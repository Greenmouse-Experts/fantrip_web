import axios from "axios";
import * as ENDPOINT from "../constant";
import {
  FilterStayParam,
  StayItemInput,
  StayItemUpdate,
  UpdateStayStatusInput,
} from "@/lib/contracts/stay";
import { FetchParam } from "@/lib/contracts/routine";
import { objectToQueryString } from "@/lib/utils/helper-function";

export const createStay = async (payload: StayItemInput) => {
  return axios
    .post(`${ENDPOINT.CREATE_STAY}`, payload)
    .then((response) => response.data);
};

export const updateStayStatus = async (
  id: string,
  payload: UpdateStayStatusInput
) => {
  return axios
    .patch(`${ENDPOINT.DISCLOSE_STAY}/${id}`, payload)
    .then((response) => response.data);
};

export const updateStay = async (id: string, payload: StayItemUpdate) => {
  return axios
    .patch(`${ENDPOINT.UPDATE_STAY}/${id}`, payload)
    .then((response) => response.data);
};

export const getHostStay = async (param: FetchParam) => {
  const paramString =
    param.isDisclosed === null ? "" : `?isDisclosed=${param.isDisclosed}`;
  return axios
    .get(`${ENDPOINT.GET_HOST_STAY}${paramString}`)
    .then((response) => response.data);
};

export const getHostStayStat = async () => {
  return axios
    .get(`${ENDPOINT.GET_STAY_STATS}`)
    .then((response) => response.data);
};

export const getAllStay = async (page:number, params?: FilterStayParam) => {
  const payload = params ? objectToQueryString(params) : null;
  return axios
    .get(`${ENDPOINT.GET_AVAILABLE_STAY}?page=${page}&${payload}`)
    .then((response) => response.data);
};

export const getSpecialStay = async () => {
  return axios
    .get(`${ENDPOINT.GET_SPECIAL_STAY}`)
    .then((response) => response.data);
};

export const getSingleStay = async (id: string) => {
  return axios
    .get(`${ENDPOINT.GET_SINGLE_STAY}/${id}`)
    .then((response) => response.data);
};

export const getHostSingleStay = async (id: string) => {
  return axios
    .get(`${ENDPOINT.GET_ALL_STAY}/${id}`)
    .then((response) => response.data);
};

export const getStayReviews = async (id: string) => {
  return axios
    .get(`${ENDPOINT.FETCH_PUBLIC_REVIEW}/${id}?reviewFor=stay`)
    .then((response) => response.data);
};
