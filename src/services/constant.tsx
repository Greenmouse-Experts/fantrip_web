export const BASE_URL = import.meta.env.VITE_BASE_URL


// Auth endpoints
export const USERS_REGISTER = `/user/client/signup`
export const USERS_LOGIN = `/auth/signin`
export const FORGET_PASSWORD = `/auth/reset-password-request`
export const RESET_PASSWORD = `/auth/reset-password`
export const UPDATE_PROFILE = `/auth/update-profile`
export const UPDATE_PASSWORD = `/auth/update-password`

// Stay endpoints
export const CREATE_STAY = `/stays/create`
export const GET_AVAILABLE_STAY = `/stays/available-stays`
export const GET_ALL_STAY = `/stays`
export const DISCLOSE_STAY = `/stays/change-status`
export const UPDATE_STAY = `/stays/update-stay`
export const REMOVE_STAY_AMENITY = `/stays/remove-amenity`
export const GET_HOST_STAY = `/stays/fetch-host-stays`

// Routine endpoint
export const GET_PROPERTY_TYPES = `/properties`
export const GET_AMENITIES = `/amenities`
export const CREATE_AMENITY = `/amenities/add-amenity`
