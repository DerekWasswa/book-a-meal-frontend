import {
  PLACE_ORDER,
  UPDATE_ORDER,
  GET_ORDERS,
  GET_CUSTOMER_ORDERS
} from "../reducers/constants";
import axios from "axios";
import { baseURL } from "../reducers/constants";

axios.defaults.baseURL = baseURL;

const priviledgedHeader = () => ({
  "app-access-token": localStorage.getItem("app-access-token")
});

export const placeOrder = data => ({
  type: PLACE_ORDER,
  data
});

export const updateOrderOption = data => ({
  type: UPDATE_ORDER,
  data
});

export const getOrders = data => ({
  type: GET_ORDERS,
  data
});

export const getCustomerOrders = data => ({
  type: GET_CUSTOMER_ORDERS,
  data
});

// Create Actions and Have them dispatched

export const makeOrderFromMenu = data => dispatch => {
  return axios
    .post("/orders/", data)
    .then(res => dispatch(placeOrder(res.data)));
};

export const updateOrder = data => dispatch => {
  return axios
    .put(`/orders/${data.id}`, data)
    .then(res => dispatch(updateOrderOption(res.data)));
};

export const getAllOrders = () => dispatch => {
  const headers = priviledgedHeader();
  return axios
    .get("/orders/", { headers })
    .then(res => dispatch(getOrders(res.data.orders)));
};

export const getAllCustomerOrders = customerID => dispatch => {
  return axios
    .get(`/orders/${customerID}`)
    .then(res => dispatch(getCustomerOrders(res.data.orders)));
};
