import {
  ADD_MENU_OF_THE_DAY,
  GET_MENU_OF_THE_DAY,
  GET_VENDOR_MENUS,
  DELETE_MEAL_OFF_THE_MENU,
  SUCCESS,
  ERRORS
} from "./constants";
import { responseError } from "../components/utils/handleResponseErrors";

const previousState = {
  menu: {
    menu_id: 0,
    name: "",
    description: "",
    date: "",
    vendor: "",
    contact: "",
    meals: [{}]
  },
  menus: [],
  caterer_menus: []
};

/**
 * @param {any} state and action
 * @returns {any} state
 */
export default function(state = previousState, action = {}) {
  switch (action.type) {
    case ADD_MENU_OF_THE_DAY:
      return {
        ...state,
        menu: action.data
      };
    case GET_MENU_OF_THE_DAY:
      return {
        ...state,
        menus: action.data
      };
    case GET_VENDOR_MENUS:
      return {
        ...state,
        caterer_menus: action.data
      };
    case DELETE_MEAL_OFF_THE_MENU:
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
