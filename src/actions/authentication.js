import {
  USER_REGISTERED,
  USER_LOGGED_IN,
  USER_LOGGED_OUT
} from "../reducers/constants";
import jwtDecode from "jwt-decode";
import axios from "axios";

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
    .post("/api/v1/auth/signup", data)
    .then(res => dispatch(registerUser(res.data)));

export const loginUser = data => dispatch =>
  axios.post("/api/v1/auth/login", data).then(res => {
    const { appAccessToken } = res.data;
    localStorage.setItem("appAccessToken", appAccessToken);
    const user = jwtDecode(appAccessToken);

    return dispatch(userLogIn({ ...user, logInStatus: true }));
  });

export const logoutUser = () => dispatch => {
  localStorage.removeItem("appAccessToken");
  return dispatch(userLogOut());
};
