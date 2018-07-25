import {
  GET_MENU_OF_THE_DAY,
  ADD_MENU_OF_THE_DAY
} from "../reducers/constants";
import axios from "axios";

const priviledgedHeader = () => ({
  Authorization: localStorage.getItem("appAccessToken")
});

export const setMenuOfTheDay = data => ({
  type: ADD_MENU_OF_THE_DAY,
  data
});

export const getMenuOfTheDay = data => ({
  type: GET_MENU_OF_THE_DAY,
  data
});

// Create Actions and Have them dispatched

export const setMenu = data => dispatch => {
  const headers = priviledgedHeader();
  return axios
    .post("/api/v1/menu", data, { headers })
    .then(res => dispatch(setMenuOfTheDay(res.data)));
};

export const getMenus = () => dispatch => {
  return axios
    .get("/api/v1/menu")
    .then(res => dispatch(getMenuOfTheDay(res.data.menu)));
};
