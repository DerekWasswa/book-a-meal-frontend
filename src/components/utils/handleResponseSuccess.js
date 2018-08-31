import { notify } from "react-notify-toast";

export const responseSuccess = (message, statusCode) => {
  if (statusCode === 201 || statusCode === 202) {
    notify.show(message);
  }
};
