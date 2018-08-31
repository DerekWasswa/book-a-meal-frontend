import {
  USER_REGISTERED,
  USER_LOGGED_IN,
  USER_LOGGED_OUT
} from "../reducers/constants";
import { baseURL } from "../reducers/constants";
import jwtDecode from "jwt-decode";
import axios from "axios";

axios.defaults.baseURL = baseURL;

export const registerUser = data => ({
  type: USER_REGISTERED,
  data
});

export const userLogIn = data => ({
  type: USER_LOGGED_IN,
  data
});

export const userLogOut = () => ({
  type: USER_LOGGED_OUT
});

export const signUpUser = data => dispatch =>
  axios
    .post("/auth/signup", data)
    .then(res => {
      return dispatch(
        registerUser({
          ...res.data
        })
      );
    })
    .catch(function(error) {
      // handle error
    });

export const loginUser = data => dispatch =>
  axios
    .post("/auth/login", data)
    .then(res => {
      localStorage.setItem("app-access-token", res.data.token);
      localStorage.setItem("user", JSON.parse(data)["email"]);
      const user = jwtDecode(res.data.token);
      localStorage.setItem("username", user.name);
      return dispatch(userLogIn({ ...user, logInStatus: true }));
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });

export const logoutUser = () => dispatch => {
  localStorage.removeItem("app-access-token");
  return dispatch(userLogOut());
};
