import axios from "axios";
import * as ENDPOINT from "../constant";
import { AmenityItemInput } from "@/lib/contracts/routine";

export const uploadImage = async (payload: FormData) => {
  return axios.post(`/upload/image`, payload).then((response) => response.data);
};

export const uploadImages = async (payload: FormData) => {
  return axios.post(`/upload/images`, payload).then((response) => response.data);
};

export const getProperties = async () => {
  return axios
    .get(ENDPOINT.GET_PROPERTY_TYPES)
    .then((response) => response.data);
};

export const getAmenities = async () => {
  return axios.get(ENDPOINT.GET_AMENITIES).then((response) => response.data);
};

export const addAmenity = async (payload: AmenityItemInput) => {
  return axios
    .post(`${ENDPOINT.CREATE_AMENITY}`, payload)
    .then((response) => response.data);
};

export const removeStayAmenity = async (id: string , payload: {amenity: string}) => {
  return axios
    .patch(`${ENDPOINT.REMOVE_AMENITY}/${id}`, payload)
    .then((response) => response.data);
};
