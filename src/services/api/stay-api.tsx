import axios from "axios";
import * as ENDPOINT from "../constant";
import { StayItemInput, UpdateStayStatusInput } from "@/lib/contracts/stay";

export const createStay = async (payload:StayItemInput) => {
    return axios
      .post(`${ENDPOINT.CREATE_STAY}`, payload)
      .then((response) => response.data);
  };
  
  export const updateStayStatus = async (id: string, payload:UpdateStayStatusInput) => {
    return axios
      .patch(`${ENDPOINT.DISCLOSE_STAY}/${id}`, payload)
      .then((response) => response.data);
  };

  export const updateStay = async (id: string, payload:StayItemInput) => {
    return axios
      .patch(`${ENDPOINT.UPDATE_STAY}/${id}`, payload)
      .then((response) => response.data);
  };
  