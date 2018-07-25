import {
  ADD_MEAL,
  EDIT_MEAL,
  DELETE_MEAL,
  GET_MEALS,
  GET_MEAL
} from "../reducers/constants";
import axios from "axios";

const priviledgedHeader = () => ({
  Authorization: localStorage.getItem("appAccessToken")
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
    .post("/api/v1/meals", data, { headers })
    .then(res => dispatch(addMealOption(res.data)));
};

export const updateMeal = data => dispatch => {
  const headers = makeHeaders();
  return axios
    .put(`/api/v1/meals/${data.id}`, data, { headers })
    .then(res => dispatch(updateMealOption(res.data)));
};

export const deleteMeal = id => dispatch => {
  const headers = makeHeaders();
  return axios
    .delete(`/api/v1/meals/${id}`, { headers })
    .then(() => dispatch(deleteMealOption()));
};

export const getAllMeals = () => dispatch => {
  const headers = priviledgedHeader();
  return axios
    .get("/api/v1/meals", { headers })
    .then(res => dispatch(getMeals(res.data.meals)));
};

export const getMeal = id => dispatch => {
  const headers = makeHeaders();
  return axios
    .get(`/api/v1/meals/${id}`, { headers })
    .then(res => dispatch(getMealSingular(res.data)));
};
