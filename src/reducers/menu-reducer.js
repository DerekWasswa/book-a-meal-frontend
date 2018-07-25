import { ADD_MENU_OF_THE_DAY, GET_MENU_OF_THE_DAY } from "./constants";

const previousState = {
  menu: {}
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
        menu: action.data
      };
    default:
      return state;
  }
}
