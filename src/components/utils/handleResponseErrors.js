import history from "../../history";
import { notify } from "react-notify-toast";

export const responseError = (message, statusCode) => {
  if (message === "Token is Invalid.") {
    notify.show(
      "Authentication has expired, kindly Login to authenticate again."
    );
    history.push("/login");
  }else if(message === "Invalid/Wrong Password") {
    notify.show("Invalid Email or Password");
  }else{
    notify.show(message);
  }
};
