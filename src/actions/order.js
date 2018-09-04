import {
  PLACE_ORDER,
  UPDATE_ORDER,
  GET_ORDERS,
  GET_CUSTOMER_ORDERS,
  SERVE_ORDER
} from "../reducers/constants";
import axios from "axios";
import { baseURL } from "../reducers/constants";
import { responseError } from "../components/utils/handleResponseErrors";
import jwtDecode from "jwt-decode";

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

export const serveCustomerOrder = data => ({
  type: SERVE_ORDER,
  data
});

// Create Actions and Have them dispatched

export const makeOrderFromMenu = data => dispatch => {
  return axios
    .post("/orders/", data)
    .then(res => dispatch(placeOrder(res.data)))
    .catch(function(error) {
      // handle error
      console.log(error);
      responseError(error.response.data.message, error.response.status);
    });
};

export const updateOrder = (data, orderId) => dispatch => {
  return axios
    .put(`/orders/${orderId}`, data)
    .then(res => dispatch(updateOrderOption(res.data)))
    .then(function(response) {
      dispatch(updateOrderOption(response.data));
      let user = jwtDecode(localStorage.getItem("app-access-token"));
      dispatch(getAllCustomerOrders(JSON.stringify(user.user_id)));
    })
    .catch(function(error) {
      // handle error
      console.log(error);
      // responseError(error.response.data.message, error.response.status);
    });
};

export const getAllOrders = () => dispatch => {
  const headers = priviledgedHeader();
  return axios
    .get("/orders/", { headers })
    .then(res => dispatch(getOrders(res.data.orders)))
    .catch(function(error) {
      // handle error
      console.log(error);
      // responseError(error.response.data.message, error.response.status);
    });
};

export const getAllCustomerOrders = customerID => dispatch => {
  return axios
    .get(`/orders/${customerID.user_id}`)
    .then(res => dispatch(getCustomerOrders(res.data.orders)))
    .catch(function(error) {
      // handle error
      console.log(error.response.statusText);
      // responseError(error.response.statusText, error.response.status);
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
      // handle error
      console.log(error);
      // responseError(error.response.data.message, error.response.status);
    });
};
