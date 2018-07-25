import { ADD_MEAL, EDIT_MEAL, DELETE_MEAL, GET_MEALS } from "./constants";

const previousState = {
  meal: {}
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
        meal: action.data
      };
    case DELETE_MEAL:
      return {
        ...state,
        meal: action.data
      };
    default:
      return state;
  }
}
