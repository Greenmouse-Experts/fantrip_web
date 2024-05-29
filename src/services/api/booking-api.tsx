import axios from "axios";
import * as ENDPOINT from "../constant";
import { FetchParam } from "@/lib/contracts/routine";

export const createBooking = async (payload:any) => {
  return axios
    .post(`${ENDPOINT.CREATE_BOOKING}`, payload)
    .then((response) => response.data);
};

export const hostFetchBooking = async () => {
    return axios
      .get(`${ENDPOINT.FETCH_CLIENT_BOOKINGS}`)
      .then((response) => response.data);
  };

  export const hostApproveBooking = async (id:string) => {
    return axios
      .patch(`${ENDPOINT.CONFIRM_CLIENT_RESERVATION}/${id}`)
      .then((response) => response.data);
  };

  export const hostCancelBooking = async (id:string) => {
    return axios
      .patch(`${ENDPOINT.CANCEL_CLIENT_RESERVATION}/${id}`)
      .then((response) => response.data);
  };

  export const guestFetchBooking = async (params: FetchParam) => {
    return axios
      .get(`${ENDPOINT.FETCH_CLIENT_BOOKINGS}?status=${params.status}`)
      .then((response) => response.data);
  };

  export const fetchBookingDetails = async (id:string) => {
    return axios
      .get(`${ENDPOINT.FETCH_SINGLE_CLIENT_BOOKING}/${id}`)
      .then((response) => response.data);
  };

  export const guestCancelBooking = async (id:string) => {
    return axios
      .patch(`${ENDPOINT.GUEST_CANCEL_BOOKING}/${id}`)
      .then((response) => response.data);
  };
