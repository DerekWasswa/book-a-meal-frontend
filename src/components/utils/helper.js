import jwtDecode from "jwt-decode";
import history from "../../history";
import { notify } from "react-notify-toast";
import PropTypes from "prop-types";

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

export function removeCartMealsIfMenuIsObsolete() {
  if(localStorage.getItem('expiration') !== null && (Number(localStorage.getItem('expiration')) - Math.round(+new Date() / 1000)) < 1 ){
    localStorage.removeItem("meals");
    localStorage.removeItem("expiration");
  }
}

export function orderPropType() {
  return {
    getAllCustomerOrders: PropTypes.func.isRequired,
    orders: PropTypes.arrayOf(
      PropTypes.shape({
        order_id: PropTypes.number.isRequired,
        meal: PropTypes.shape({
          meal_id: PropTypes.number.isRequired,
          meal: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired
        }).isRequired,
        menu: PropTypes.shape({
          menu_id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          meals: PropTypes.arrayOf(
            PropTypes.shape({
              meal_id: PropTypes.number.isRequired,
              meal: PropTypes.string.isRequired,
              price: PropTypes.number.isRequired
            })
          ).isRequired
        }).isRequired,
        user: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  };
}

export function ordersPropType(){
  return (
    PropTypes.arrayOf(
      PropTypes.shape({
        order_id: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
        meal: PropTypes.shape({
          meal_id: PropTypes.number.isRequired,
          meal: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired
        }).isRequired,
        menu: PropTypes.shape({
          menu_id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired
        }).isRequired,
        user: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  );
}

export function menusPropType() {
  return (
    PropTypes.arrayOf(
      PropTypes.shape({
        menu_id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        meals: PropTypes.arrayOf(
          PropTypes.shape({
            meal_id: PropTypes.number.isRequired,
            meal: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired
          }).isRequired
        ).isRequired
      }).isRequired
    ).isRequired
  );
}
