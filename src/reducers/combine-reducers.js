import { combineReducers } from "redux";
import authReducer from "./auth-reducer";
import mealReducer from "./auth-reducer";
import menuReducer from "./auth-reducer";
import orderReducer from "./auth-reducer";

export const applicationReducers = combineReducers({
  authReducer,
  mealReducer,
  menuReducer,
  orderReducer
});
