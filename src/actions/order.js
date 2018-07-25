import { PLACE_ORDER, UPDATE_ORDER, GET_ORDERS } from "../reducers/constants";
import axios from "axios";

const priviledgedHeader = () => ({
  Authorization: localStorage.getItem("appAccessToken")
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

// Create Actions and Have them dispatched

export const makeOrderFromMenu = data => dispatch => {
  return axios
    .post("/api/v1/orders", data)
    .then(res => dispatch(updateOrder(res.data)));
};

export const updateOrder = data => dispatch => {
  return axios
    .put(`/api/v1/orders/${data.id}`, data)
    .then(res => dispatch(updateOrderOption(res.data)));
};

export const getAllOrders = () => dispatch => {
  const headers = priviledgedHeader();
  return axios
    .get("/api/v1/orders", { headers })
    .then(res => dispatch(getOrders(res.data.orders)));
};
