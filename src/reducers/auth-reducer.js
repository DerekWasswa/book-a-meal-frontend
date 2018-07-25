import { GET_ORDERS, PLACE_ORDER, UPDATE_ORDER } from "./constants";

const previousState = {
  order: {}
};

/**
 * @param {any} state and action
 * @returns {any} state
 */
export default function(state = previousState, action = {}) {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        order: action.data
      };
    case PLACE_ORDER:
      return {
        ...state,
        order: action.data
      };
    case UPDATE_ORDER:
      return {
        ...state,
        order: action.data
      };
    default:
      return state;
  }
}
