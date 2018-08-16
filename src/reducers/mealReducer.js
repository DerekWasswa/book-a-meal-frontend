import { ADD_MEAL, EDIT_MEAL, DELETE_MEAL, GET_MEALS } from "./constants";

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
    case DELETE_MEAL:
      return {
        ...state,
        meal: action.data
      };
    default:
      return state;
  }
}
