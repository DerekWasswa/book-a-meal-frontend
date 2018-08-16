import {
  ADD_MEAL,
  EDIT_MEAL,
  DELETE_MEAL,
  GET_MEALS,
  GET_MEAL
} from "../reducers/constants";
import axios from "axios";
import { baseURL } from "../reducers/constants";

axios.defaults.baseURL = baseURL;

const priviledgedHeader = () => ({
  "app-access-token": localStorage.getItem("app-access-token")
});

export const addMealOption = data => ({
  type: ADD_MEAL,
  data
});

export const updateMealOption = data => ({
  type: EDIT_MEAL,
  data
});

export const deleteMealOption = data => ({
  type: DELETE_MEAL,
  data
});

export const getMeals = data => ({
  type: GET_MEALS,
  data
});

export const getMealSingular = data => ({
  type: GET_MEAL,
  data
});

// Create Actions and Have them dispatched

export const addMeal = data => dispatch => {
  const headers = priviledgedHeader();
  return axios
    .post("/meals/", data, { headers })
    .then(res => dispatch(addMealOption(res.data)));
};

export const updateMeal = (data, mealID) => dispatch => {
  const headers = priviledgedHeader();
  return axios
    .put(`/meals/${mealID}`, data, { headers })
    .then(res => dispatch(updateMealOption(res.data)));
};

export const deleteMeal = mealID => dispatch => {
  const headers = priviledgedHeader();
  return axios
    .delete(`/meals/${mealID}`, { headers })
    .then(() => dispatch(deleteMealOption()));
};

export const getAllMeals = () => dispatch => {
  const headers = priviledgedHeader();
  return axios
    .get("/meals/", { headers })
    .then(res => dispatch(getMeals(res.data.data)));
};

export const getMeal = mealID => dispatch => {
  const headers = priviledgedHeader();
  return axios
    .get(`/meals/${mealID}`, { headers })
    .then(res => dispatch(getMealSingular(res.data)));
};
