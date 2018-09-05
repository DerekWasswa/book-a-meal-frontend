import {
  GET_ORDERS,
  PLACE_ORDER,
  UPDATE_ORDER,
  GET_CUSTOMER_ORDERS,
  SERVE_ORDER,
  CANCEL_ORDER,
  SUCCESS,
  ERRORS
} from "./constants";
import { responseError } from "../components/utils/handleResponseErrors";

const previousState = {
  order: {
    order_id: 0,
    menu_id: 0,
    meal_id: 0,
    user: "",
    date: ""
  },
  orders: []
};

/**
 * @param {any} state and action
 * @returns {any} state
 */
export default function(state = previousState, action = {}) {
  switch (action.type) {
    case PLACE_ORDER:
      return {
        ...state,
        order: action.data
      };
    case GET_ORDERS:
      return {
        ...state,
        orders: action.data
      };
    case UPDATE_ORDER:
      return {
        ...state,
        order: action.data
      };
    case GET_CUSTOMER_ORDERS:
      return {
        ...state,
        orders: action.data
      };
    case SERVE_ORDER:
      return {
        ...state,
        order: action.data
      };
    case CANCEL_ORDER:
      return {
        ...state,
        order: action.data
      };
    case ERRORS:
      responseError(action.data.message, action.data.status_code);
      return state;
    default:
      return state;
  }
}
