import axios from "axios";
import * as ENDPOINT from "../constant";

export const createBooking = async (payload:any) => {
  return axios
    .post(`${ENDPOINT.CREATE_BOOKING}`, payload)
    .then((response) => response.data);
};

export const hostFetchBooking = async () => {
    return axios
      .get(`${ENDPOINT.CREATE_STAY}`)
      .then((response) => response.data);
  };

  export const guestFetchBooking = async () => {
    return axios
      .get(`${ENDPOINT.FETCH_CLIENT_BOOKINGS}`)
      .then((response) => response.data);
  };

  export const guestCancelBooking = async (id:string) => {
    return axios
      .patch(`${ENDPOINT.GUEST_CANCEL_BOOKING}/${id}`)
      .then((response) => response.data);
  };
