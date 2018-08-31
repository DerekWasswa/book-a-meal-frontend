import jwtDecode from "jwt-decode";
import history from "../../history";
import { notify } from "react-notify-toast";

export const loggedInTokenExp = appToken => {
  var isExpired = false;
  const token = localStorage.getItem("app-access-token");

  const decodedToken = jwtDecode(token);
  var dateNow = new Date();
  if (decodedToken.exp < dateNow.getTime()) isExpired = true;
  return isExpired;
};

export const registrationSuccess = (message, statusCode) => {
  if (statusCode === 201) {
    notify.show(message);
    history.push("/login");
  }
};
