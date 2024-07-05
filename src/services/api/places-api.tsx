import axios from "axios";
import * as ENDPOINT from "../constant";
import { CreatePlaceInput, UpdatePlaceInput } from "@/lib/contracts/place";

export const createPlace = async (id:string, payload: CreatePlaceInput) => {
  return axios
    .post(`${ENDPOINT.CREATE_PLACE}/${id}`, payload)
    .then((response) => response.data);
};

export const getPlaces = async (name:string) => {
  return axios
    .get(`${ENDPOINT.FETCH_PLACES}?spot[name]=${name}`)
    .then((response) => response.data);
};

export const getSpotsCat = async () => {
  return axios
    .get(`${ENDPOINT.GET_SPOT_CATEGORY}`)
    .then((response) => response.data);
};

export const getSinglePlace = async (id: string) => {
  return axios
    .get(`${ENDPOINT.FETCH_SINGLE_PLACE}/${id}`)
    .then((response) => response.data);
};

export const updatePlace = async (id: string, payload: UpdatePlaceInput) => {
  return axios
    .patch(`${ENDPOINT.UPDATE_PLACE}/${id}`, payload)
    .then((response) => response.data);
};

export const deletePlace = async (id: string) => {
  return axios
    .delete(`${ENDPOINT.DELETE_PLACE}/${id}`)
    .then((response) => response.data);
};
