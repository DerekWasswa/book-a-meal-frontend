import { combineReducers } from "redux";
import authReducer from "./authReducer";
import mealReducer from "./mealReducer";
import menuReducer from "./menuReducer";
import orderReducer from "./orderReducer";

export const applicationReducers = combineReducers({
  authReducer,
  mealReducer,
  menuReducer,
  orderReducer
});
