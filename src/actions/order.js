import {
  PLACE_ORDER,
  UPDATE_ORDER,
  GET_ORDERS,
  GET_CUSTOMER_ORDERS,
  SERVE_ORDER,
  CANCEL_ORDER,
  ERRORS
} from "../reducers/constants";
import axios from "axios";
import { baseURL } from "../reducers/constants";
import jwtDecode from "jwt-decode";

axios.defaults.baseURL = baseURL;

const priviledgedHeader = () => ({
  "app-access-token": localStorage.getItem("app-access-token")
});

function handleResponseError(error, dispatch) {
  if (error.response) {
    dispatch(showError({message: error.response.data.message, status_code: error.response.status}));
  }

  if(error.request){
    dispatch(showError({message: "Internet connection or Server Temporarily down! Try again again soon.", status_code: 500}));
  }
}

// Action Creators

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

export const serveCustomerOrder = data => ({
  type: SERVE_ORDER,
  data
});

export const cancelCustomerOrder = data => ({
  type: CANCEL_ORDER,
  data
});

export const showError = data => ({
  type: ERRORS,
  data
});

// Create Actions and Have them dispatched

export const makeOrderFromMenu = data => dispatch => {
  return axios
    .post("/orders/", data)
    .then(res => dispatch(placeOrder(res.data)))
    .catch(function(error) {
      handleResponseError(error, dispatch)
    });
};

export const updateOrder = (data, orderId) => dispatch => {
  return axios
    .put(`/orders/${orderId}`, data)
    .then(res => dispatch(updateOrderOption(res.data)))
    .then(function(response) {
      dispatch(updateOrderOption(response.data));
      let user = jwtDecode(localStorage.getItem("app-access-token"));
      dispatch(getAllCustomerOrders(user));
    })
    .catch(function(error) {
      handleResponseError(error, dispatch);
    });
};

export const getAllOrders = () => dispatch => {
  const headers = priviledgedHeader();
  return axios
    .get("/orders/", { headers })
    .then(res => dispatch(getOrders(res.data.orders)))
    .catch(function(error) {
      handleResponseError(error, dispatch);
    });
};

export const getAllCustomerOrders = customerID => dispatch => {
  return axios
    .get(`/orders/${customerID.user_id}`)
    .then(res => dispatch(getCustomerOrders(res.data.orders)))
    .catch(function(error) {
      handleResponseError(error, dispatch);
    });
};

export const serveOrder = orderID => dispatch => {
  const headers = priviledgedHeader();
  return axios
    .put(`/orders/serve/${orderID}`, null, { headers })
    .then(function(response) {
      dispatch(serveCustomerOrder(response.data.message));
      dispatch(getAllOrders());
    })
    .catch(function(error) {
      handleResponseError(error, dispatch);
    });
};

export const cancelOrder = orderID => dispatch => {
  const headers = priviledgedHeader();
  return axios
    .put(`/orders/cancel/${orderID}`, null, { headers })
    .then(function(response) {
      dispatch(cancelCustomerOrder(response.data.message));
      dispatch(getAllOrders());
    })
    .catch(function(error) {
      handleResponseError(error, dispatch);
    });
};
