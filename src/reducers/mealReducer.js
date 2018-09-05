import {
  ADD_MEAL,
  EDIT_MEAL,
  DELETE_MEAL,
  GET_MEALS,
  GET_MEAL,
  SUCCESS,
  ERRORS
} from "./constants";
import { responseError } from "../components/utils/handleResponseErrors";

const previousState = {
  meal: {
    meal_id: 0,
    meal: "",
    price: 0
  },
  meals: []
};

/**
 * @param {any} state and action
 * @returns {any} state
 */
export default function(state = previousState, action = {}) {
  switch (action.type) {
    case ADD_MEAL:
      return {
        ...state,
        meal: action.data
      };
    case EDIT_MEAL:
      return {
        ...state,
        meal: action.data
      };
    case GET_MEALS:
      return {
        ...state,
        meals: action.data
      };
    case GET_MEAL:
      return {
        ...state,
        meal: action.data
      };
    case DELETE_MEAL:
      return {
        ...state
      };
    case ERRORS:
      responseError(action.data.message, action.data.status_code);
      return state;
    default:
      return state;
  }
}
