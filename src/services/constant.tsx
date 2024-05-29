export const BASE_URL = import.meta.env.VITE_BASE_URL
export const GOOGLE_MAP_KEY = import.meta.env.VITE_GOOGLE_KEY


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
export const GET_SINGLE_STAY = `/stays/view`
export const DISCLOSE_STAY = `/stays/change-status`
export const UPDATE_STAY = `/stays/update-stay`
export const REMOVE_STAY_AMENITY = `/stays/remove-amenity`
export const GET_HOST_STAY = `/stays/fetch-host-stays`

// booking endpoints
export const CREATE_BOOKING = `/reservations/add-reservation`
export const FETCH_CLIENT_BOOKINGS = `/reservations/fetch-guest-reservations`
export const CONFIRM_CLIENT_RESERVATION = `/reservations/confirm`
export const CANCEL_CLIENT_RESERVATION = `/reservations/cancel`
export const FETCH_SINGLE_CLIENT_BOOKING = `/reservations`
export const GUEST_CANCEL_BOOKING = `/reservations/cancel`

// Routine endpoint
export const GET_PROPERTY_TYPES = `/properties`
export const GET_AMENITIES = `/amenities`
export const CREATE_AMENITY = `/amenities/add-amenity`
