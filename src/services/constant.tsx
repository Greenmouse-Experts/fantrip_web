export const BASE_URL = import.meta.env.VITE_BASE_URL
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL
export const GOOGLE_MAP_KEY = import.meta.env.VITE_GOOGLE_KEY
export const GOOGLE_AUTH_KEY = import.meta.env.VITE_GOOGLE_AUTH_KEY


// Auth endpoints
export const USERS_REGISTER = `/user/client/signup`
export const USERS_LOGIN = `/auth/signin`
export const FORGET_PASSWORD = `/auth/reset-password-request`
export const RESET_PASSWORD = `/auth/reset-password`
export const UPDATE_PROFILE = `/auth/update-profile`
export const UPDATE_PASSWORD = `/auth/update-password`
export const SOCIAL_SIGNUP = `/auth/sso`

// Stay endpoints
export const CREATE_STAY = `/stays/create`
export const GET_AVAILABLE_STAY = `/stays/available-stays`
export const GET_SPECIAL_STAY = `/special-stays/published`
export const GET_ALL_STAY = `/stays`
export const GET_STAY_STATS = `/stays/count`;
export const GET_SINGLE_STAY = `/stays/view`
export const DISCLOSE_STAY = `/stays/change-status`
export const UPDATE_STAY = `/stays/update-stay`
export const REMOVE_STAY_AMENITY = `/stays/remove-amenity`
export const GET_HOST_STAY = `/stays/fetch-host-stays`

// booking endpoints
export const COMPUTE_PRICE = `/reservations/compute-price`
export const CREATE_BOOKING = `/reservations/add-reservation`
export const FETCH_CLIENT_RESERVATION = `/reservations/fetch-guest-reservations`
export const CONFIRM_CLIENT_RESERVATION = `/reservations/confirm`
export const CANCEL_CLIENT_RESERVATION = `/reservations/cancel`
export const FETCH_SINGLE_CLIENT_RESERVATION = `/reservations`
export const GUEST_CANCEL_RESERVATION = `/reservations/cancel`
export const FETCH_CLIENT_BOOKINGS = `/bookings/fetch-guest-trx`
export const FETCH_SINGLE_CLIENT_BOOKING = `/bookings/fetch-trx`
export const CANCEL_CLIENT_BOOKING = `/bookings/cancel-guest-booking`
export const GET_BOOKING_STATS = `/bookings/count`;

// payment endpoints
export const INITIATE_PAYMENT = `/bookings/create`
export const CONFIRM_PAYMENT = `/bookings/confirm`

// Routine endpoint
export const GET_PROPERTY_TYPES = `/properties`
export const GET_AMENITIES = `/amenities`
export const GET_HOST_AMENITIES = `amenities/fetch-host-amenities`
export const CREATE_AMENITY = `/amenities/add-amenity`
export const REMOVE_AMENITY = `/stays/remove-amenity`
export const GET_ACCOUNTS = `/bank-accounts`
export const CREATE_ACCOUNT = `/bank-accounts/create`
export const SELECT_ACCOUNT = `/bank-accounts/select`
export const ADD_FCM_TOKEN = `/notification-tokens/add`

// area guide endpoints
export const GET_SPOT_CATEGORY = `/spots/disclosed`
export const CREATE_PLACE = `/places/create-place`
export const UPDATE_PLACE = `/places/update-place`
export const DELETE_PLACE = `/places`
export const FETCH_PLACES = `/places/disclosed`
export const FETCH_SINGLE_PLACE = `/places/disclosed`
export const FETCH_PLACE_REVIEW = `/reviews/fetch-my-reviews`;
export const CREATE_NEW_REVIEW = `/reviews/create-review`;
export const FETCH_PUBLIC_REVIEW = `/reviews/view-reviews`;
export const MUTE_REVIEW = `/mute-review`;
export const UNMUTE_REVIEW = `/reviews/unmute-review`;