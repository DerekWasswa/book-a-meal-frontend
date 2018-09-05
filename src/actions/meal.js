import {
  ADD_MEAL,
  EDIT_MEAL,
  DELETE_MEAL,
  GET_MEALS,
  GET_MEAL,
  ERRORS
} from "../reducers/constants";
import axios from "axios";
import { baseURL } from "../reducers/constants";
import { responseSuccess } from "../components/utils/handleResponseSuccess";

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

export const showError = data => ({
  type: ERRORS,
  data
});

// Create Actions and Have them dispatched

export const addMeal = data => dispatch => {
  const headers = priviledgedHeader();
  return axios
    .post("/meals/", data, { headers })
    .then(function(response) {
      responseSuccess("Meal Added Successfully.", response.status);
      dispatch(addMealOption(response.data));
      dispatch(getAllMeals());
    })
    .catch(function(error) {
      if (error.response) {
        dispatch(showError({message: error.response.data.message, status_code: error.response.status}));
      }

      if(error.request){
        dispatch(showError({message: "Internet connection or Server Temporarily down! Try again again soon.", status_code: 500}));
      }
    });
};

export const updateMeal = (data, mealID) => dispatch => {
  const headers = priviledgedHeader();
  return axios
    .put(`/meals/${mealID}`, data, { headers })
    .then(function(response) {
      responseSuccess("Meal has been updated Successfully.", response.status);
      dispatch(updateMealOption(response.data));
      dispatch(getAllMeals());
    })
    .catch(function(error) {
      if (error.response) {
        dispatch(showError({message: error.response.data.message, status_code: error.response.status}));
      }

      if(error.request){
        dispatch(showError({message: "Internet connection or Server Temporarily down! Try again again soon.", status_code: 500}));
      }
    });
};

export const deleteMeal = mealID => dispatch => {
  const headers = priviledgedHeader();
  return axios
    .delete(`/meals/${mealID}`, { headers })
    .then(function(response) {
      responseSuccess("Meal(s) have been deleted.", response.status);
      dispatch(deleteMealOption());
      dispatch(getAllMeals());
    })
    .catch(function(error) {
      if (error.response) {
        dispatch(showError({message: error.response.data.message, status_code: error.response.status}));
      }

      if(error.request){
        dispatch(showError({message: "Internet connection or Server Temporarily down! Try again again soon.", status_code: 500}));
      }
    });
};

export const getAllMeals = () => dispatch => {
  const headers = priviledgedHeader();
  return axios
    .get("/meals/", { headers })
    .then(res => dispatch(getMeals(res.data.data)))
    .catch(function(error) {
      if (error.response) {
        dispatch(showError({message: error.response.data.message, status_code: error.response.status}));
      }

      if(error.request){
        dispatch(showError({message: "Internet connection or Server Temporarily down! Try again again soon.", status_code: 500}));
      }
    });
};

export const getMeal = mealID => dispatch => {
  const headers = priviledgedHeader();
  return axios
    .get(`/meals/${mealID}`, { headers })
    .then(function(response) {
      dispatch(getMealSingular(response.data));
    })
    .catch(function(error) {
      if (error.response) {
        dispatch(showError({message: error.response.data.message, status_code: error.response.status}));
      }

      if(error.request){
        dispatch(showError({message: "Internet connection or Server Temporarily down! Try again again soon.", status_code: 500}));
      }
    });

};
