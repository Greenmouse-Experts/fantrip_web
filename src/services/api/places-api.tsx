import axios from "axios";
import * as ENDPOINT from "../constant";
import { CreatePlaceInput, CreateReviewItem, UpdatePlaceInput } from "@/lib/contracts/place";

export const createPlace = async (id:string, payload: CreatePlaceInput) => {
  return axios
    .post(`${ENDPOINT.CREATE_PLACE}/${id}`, payload)
    .then((response) => response.data);
};

export const getMyPlaces = async () => {
  return axios
    .get(`${ENDPOINT.DELETE_PLACE}`)
    .then((response) => response.data);
};

export const getMyReviews = async (id: string) => {
  return axios
    .get(`${ENDPOINT.FETCH_PLACE_REVIEW}/${id}?reviewFor=place`)
    .then((response) => response.data);
};

export const getPublicReviews = async (id: string) => {
  return axios
    .get(`${ENDPOINT.FETCH_PUBLIC_REVIEW}/${id}?reviewFor=place`)
    .then((response) => response.data);
};

export const getPlaces = async (name:string) => {
  return axios
    .get(`${ENDPOINT.FETCH_PLACES}?spot[name]=${name}`)
    .then((response) => response.data);
};

export const getPlacesByLocation = async (name:string) => {
  return axios
    .get(`${ENDPOINT.FETCH_PLACES}?searchKey=${name}`)
    .then((response) => response.data);
};

export const getTopPlaces = async () => {
  return axios
    .get(`${ENDPOINT.FETCH_TOP_PLACES}`)
    .then((response) => response.data);
};

export const getSearchPlaces = async (value:string) => {
  return axios
    .get(`${ENDPOINT.FETCH_PLACES}?searchKey=${value}`)
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

export const createReview = async (payload: CreateReviewItem) => {
  return axios
    .post(`${ENDPOINT.CREATE_NEW_REVIEW}`, payload)
    .then((response) => response.data);
};

export const muteReview = async (id:string) => {
  return axios
    .post(`${ENDPOINT.MUTE_REVIEW}/${id}?reviewFor=place`)
    .then((response) => response.data);
};

export const unMuteReview = async (id: string) => {
  return axios
    .post(`${ENDPOINT.UNMUTE_REVIEW}/${id}?reviewFor=place`)
    .then((response) => response.data);
};