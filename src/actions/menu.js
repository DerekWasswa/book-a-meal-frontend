import {
  GET_MENU_OF_THE_DAY,
  ADD_MENU_OF_THE_DAY,
  GET_VENDOR_MENUS
} from "../reducers/constants";
import axios from "axios";
import { baseURL } from "../reducers/constants";

axios.defaults.baseURL = baseURL;

const priviledgedHeader = () => ({
  "app-access-token": localStorage.getItem("app-access-token")
});

export const setMenuOfTheDay = data => ({
  type: ADD_MENU_OF_THE_DAY,
  data
});

export const getMenuOfTheDay = data => ({
  type: GET_MENU_OF_THE_DAY,
  data
});

export const getVendorData = data => ({
  type: GET_VENDOR_MENUS,
  data
});

// Create Actions and Have them dispatched

export const setMenu = data => dispatch => {
  const headers = priviledgedHeader();
  return axios
    .post("/menu/", data, { headers })
    .then(res => dispatch(setMenuOfTheDay(res.data)));
};

export const getMenus = () => dispatch => {
  return axios
    .get("/menu/")
    .then(res => dispatch(getMenuOfTheDay(res.data.data)));
};

export const getVendorMenus = () => dispatch => {
  const headers = priviledgedHeader();
  return axios
    .get("/vendor/menu/", { headers })
    .then(res => dispatch(getVendorData(res.data.data)));
};
