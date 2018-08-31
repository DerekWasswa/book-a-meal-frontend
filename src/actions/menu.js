import {
  GET_MENU_OF_THE_DAY,
  ADD_MENU_OF_THE_DAY,
  GET_VENDOR_MENUS,
  DELETE_MEAL_OFF_THE_MENU
} from "../reducers/constants";
import axios from "axios";
import { baseURL } from "../reducers/constants";
import { responseError } from "../components/utils/handleResponseErrors";
import { responseSuccess } from "../components/utils/handleResponseSuccess";

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

export const deleteMealOff = data => ({
  type: DELETE_MEAL_OFF_THE_MENU,
  data
});

// Create Actions and Have them dispatched

export const setMenu = data => dispatch => {
  const headers = priviledgedHeader();
  return axios
    .post("/menu/", data, { headers })
    .then(function(response) {
      dispatch(setMenuOfTheDay(response.data));
      dispatch(getVendorMenus());
    })

    .catch(function(error) {
      // handle error
      console.log(error);
      responseError(error.response.data.message, error.response.status);
    });
};

export const getMenus = () => dispatch => {
  return axios
    .get("/menu/")
    .then(res => dispatch(getMenuOfTheDay(res.data.data)))
    .catch(function(error) {
      // handle error
      console.log(error);
      responseError(error.response.data.message, error.response.status);
    });
};

export const getVendorMenus = () => dispatch => {
  const headers = priviledgedHeader();
  return axios
    .get("/vendor/menu/", { headers })
    .then(res => dispatch(getVendorData(res.data.data)))
    .catch(function(error) {
      // handle error
      console.log(error);
      responseError(error.response.data.message, error.response.status);
    });
};

export const deleteMealOffTheMenu = (menuId, mealId) => dispatch => {
  const headers = priviledgedHeader();
  return axios
    .delete(`/menu/${menuId}/${mealId}`, { headers })
    .then(function(response) {
      responseSuccess("Meal has been deleted from the menu.", response.status);
      dispatch(deleteMealOff());
      dispatch(getVendorMenus());
    })
    .catch(function(error) {
      // handle error
      console.log(error);
      responseError(error.response.data.message, error.response.status);
    });
};
