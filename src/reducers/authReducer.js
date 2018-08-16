import { USER_REGISTERED, USER_LOGGED_IN, USER_LOGGED_OUT } from "./constants";

const previousState = {
  auth: {
    admin: false,
    user_id: 0,
    logInStatus: false
  }
};

/**
 * @param {any} state and action
 * @returns {any} state
 */
export default function(state = previousState, action = {}) {
  switch (action.type) {
    case USER_REGISTERED:
      return {
        ...state,
        auth: action.data
      };
    case USER_LOGGED_IN:
      return {
        ...state,
        auth: action.data
      };
    case USER_LOGGED_OUT:
      return {
        ...state,
        auth: action.data
      };
    default:
      return state;
  }
}
