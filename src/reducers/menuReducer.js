import {
  ADD_MENU_OF_THE_DAY,
  GET_MENU_OF_THE_DAY,
  GET_VENDOR_MENUS
} from "./constants";

const previousState = {
  menu: {
    menu_id: 0,
    name: "",
    description: "",
    date: "",
    meals: []
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
    default:
      return state;
  }
}
