import axios from "axios";
import * as ENDPOINT from "../constant";
import { AmenityItemInput, BankAccountItem } from "@/lib/contracts/routine";
import { ContactInput } from "@/modules/landing/contact/contact-form";

export const uploadImage = async (payload: FormData) => {
  return axios.post(`/upload/image`, payload).then((response) => response.data);
};

export const uploadVideo = async (payload: FormData) => {
  return axios.post(`/upload/video`, payload).then((response) => response.data);
};

export const uploadImages = async (payload: FormData) => {
  return axios
    .post(`/upload/images`, payload)
    .then((response) => response.data);
};

export const uploadIds = async (payload: FormData) => {
  return axios
    .post(`/upload/id-doc`, payload)
    .then((response) => response.data);
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

export const getHostAmenities = async () => {
  return axios
    .get(ENDPOINT.GET_HOST_AMENITIES)
    .then((response) => response.data);
};

export const contactUs = async (payload:ContactInput) => {
  return axios
    .post(ENDPOINT.CONTACT_US, payload)
    .then((response) => response.data);
};


export const removeStayAmenity = async (
  id: string,
  payload: { amenity: string }
) => {
  return axios
    .patch(`${ENDPOINT.REMOVE_AMENITY}/${id}`, payload)
    .then((response) => response.data);
};

export const getAccounts = async () => {
  return axios.get(ENDPOINT.GET_ACCOUNTS).then((response) => response.data);
};

export const addAccount = async (payload: BankAccountItem) => {
  return axios
    .post(`${ENDPOINT.SAVE_BANK_KYC}`, payload)
    .then((response) => response.data);
};

export const removeHostAccount = async (id: string) => {
  return axios
    .delete(`${ENDPOINT.GET_ACCOUNTS}/${id}`)
    .then((response) => response.data);
};

export const selectHostAccount = async (id: string) => {
  return axios
    .patch(`${ENDPOINT.SELECT_ACCOUNT}/${id}`)
    .then((response) => response.data);
};

export const addFcmToken = async (payload: {
  deviceType: string;
  token: string;
}) => {
  return axios
    .post(`${ENDPOINT.ADD_FCM_TOKEN}`, payload)
    .then((response) => response.data);
};

export const getDeviceIp = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: any = await response.json();
    return data
  } catch (err) {
    console.error('Problem fetching IP', err);
  }
};

interface LocationData {
  city: string;
  region: string;
  country: string;
  loc: string;
}

export const getLocation = async (): Promise<LocationData | null> => {
  try {
    const response = await axios.get(
      `https://ipinfo.io/json?token=${ENDPOINT.IP_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching location:", error);
    return null;
  }
};
