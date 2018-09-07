import React from "react";
import "bootstrap/dist/js/bootstrap.js";
import { Input } from "reactstrap";
import UserDashboard from "../dashboard/UserDashboard";
import Footer from "../dashboard/Footer";
import { getAllCustomerOrders, makeOrderFromMenu } from "../../actions/order";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import jwtDecode from "jwt-decode";
import { ModalHeader, Alerts } from "../utils/stateLess";
import { notify } from "react-notify-toast";
import $ from "jquery";


export class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        total: 0,
        meals: [{}]
    };

    this.handleOnQuantityOnChange = this.handleOnQuantityOnChange.bind(this);
    this.handleOnCheckout = this.handleOnCheckout.bind(this);
    this.handleOnRemoveOrder = this.handleOnRemoveOrder.bind(this);
  }

  componentDidMount() {
    let user = jwtDecode(localStorage.getItem("app-access-token"));
    this.props.getAllCustomerOrders(user);

    //Check If the Meals in cart are not obsolete

    // Load meals from local storage to the state
    if (localStorage.getItem('meals') !== null){
        this.setState({
            meals: JSON.parse(localStorage.getItem('meals'))
        });

        var mealArray = JSON.parse(localStorage.getItem('meals'));
        var total = 0;
        for (let index = 0; index < mealArray.length; index++) {
            total = total + Number(mealArray[index].subtotal);
        }
        this.setState({
            total: total
        });
    }
  }

  handleOnCheckout(event) {
    event.preventDefault();

    if (localStorage.getItem('meals') !== null){

        var mealArray = JSON.parse(localStorage.getItem('meals'));
        for (let index = 0; index < mealArray.length; index++) {

            var mealId = mealArray[index].mealId;
            var menuId = mealArray[index].menuId;
            let data = {
              meal_id: mealId,
              user: localStorage.getItem("user"),
              menu_id: menuId,
              date: new Date().toISOString().slice(0, 10)
            };
            var quantity = Number(mealArray[index].quantity);
            for (let index = 0; index < quantity; index++) {
                this.props.makeOrderFromMenu(JSON.stringify(data))
            }
        }
        notify.show("Checkout successful.", "success");
        localStorage.removeItem('meals');
        localStorage.removeItem('expiration');
        this.setState({
            meals: [{}]
        })
    }
  }

  handleOnRemoveOrder = clickedMeal => event => {
    if(localStorage.getItem('meals') !== null){
        var mealsLeft = [];

        var mealArray = JSON.parse(localStorage.getItem('meals'));

        for (let index = 0; index < mealArray.length; index++) {
            const meal = mealArray[index];
            if (clickedMeal !== meal.mealId){
                mealsLeft.push(meal);
            }
        }

        var stringMeals = JSON.stringify(mealsLeft);
        localStorage.setItem('meals', stringMeals);
        notify.show("Removed from Cart.", "success");

        // #Set state to the new data from the localstorage
        this.setState({
            meals: JSON.parse(localStorage.getItem('meals'))
        });

        // If the meals are empty, delete all cart variables
        if(JSON.parse(localStorage.getItem('meals')).length === 0){
            localStorage.removeItem("meals");
            localStorage.removeItem("expiration");
        }
    }
  }

  handleOnQuantityOnChange = clickedMealID => event => {
    const target = event.target;
    const value = target.value;

    if(localStorage.getItem('meals') !== null){
        var mealsLeft = [];
        var total = 0;
        var mealArray = JSON.parse(localStorage.getItem('meals'));

        for (let index = 0; index < mealArray.length; index++) {
            const meal = mealArray[index];
            if (clickedMealID === meal.mealId){
                let mealJSON = {
                    "mealId": meal.mealId,
                    "meal": meal.meal,
                    "price": Number(meal.price),
                    "menuId": meal.menuId,
                    "quantity": value,
                    "subtotal": (Number(meal.price) * value)
                };
                total = total + (Number(meal.price) * value);
                mealsLeft.push(mealJSON);
            }else{
                total = total + meal.subtotal;
                mealsLeft.push(meal);
            }
        }

        var stringMeals = JSON.stringify(mealsLeft);
        localStorage.setItem('meals', stringMeals);

        // #Set state to the new data from the localstorage after quantity change
        this.setState({
            meals: JSON.parse(localStorage.getItem('meals'))
        });

        this.setState({
            total: total
        });
    }
}

  render() {

    // Check if the cart meals are not obsolote
    if(localStorage.getItem('expiration') !== null && (Number(localStorage.getItem('expiration')) - Math.round(+new Date() / 1000)) < 1 ){
        localStorage.removeItem("meals");
        localStorage.removeItem("expiration");
    }

    const { orders } = this.props;

    return (
      <div>
        <UserDashboard orders={orders} />

        <div className="wrapper-content ">
            <div className="body-content">

            {

                localStorage.getItem('meals') !== null && JSON.parse(localStorage.getItem('meals')).length > 0
                ?

                        <table id="cart" className="table table-hover table-condensed">
                            <thead>
                                <tr>
                                    <th>Meal</th>
                                    <th >Price (UGX)</th>
                                    <th >Quantity</th>
                                    <th  className="text-center">Subtotal (UGX)</th>
                                    <th ></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.meals && this.state.meals.map((meal, index) =>

                                    <tr key={index}>
                                        <td data-th="Product">
                                                    <div className="row">
                                                        <div className="col-sm-10">
                                                            <p>{meal.meal}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                        <td data-th="Price">{meal.price}</td>
                                        <td data-th="Quantity">
                                                <Input
                                                    type="number"
                                                    name="quantity"
                                                    required={true}
                                                    min={1}
                                                    value={meal.quantity}
                                                    className="form-control text-center"
                                                    placeholder="1"
                                                    onChange={this.handleOnQuantityOnChange(meal.mealId)}
                                                    />
                                        </td>
                                        <td data-th="Subtotal" className="text-center">{meal.subtotal}</td>
                                            <td className="actions" data-th="">
                                            <button className="btn btn-danger btn-sm"
                                                onClick={
                                                    this.handleOnRemoveOrder(meal.mealId)
                                                }>
                                                <i className="material-icons icon-size">
                                                &#xe872;
                                                </i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                                }
                                </tbody>
                                <tfoot>

                                <tr>
                                    <td><a href="/c-menu" className="btn btn-warning"><i className="fa fa-angle-left"></i> Continue Placing Orders</a></td>
                                    <td colSpan="2" className="hidden-xs"></td>
                                    <td className="hidden-xs text-center"><strong>Total {this.state.total} UGX</strong></td>
                                    <td>
                                        <button
                                        className="btn btn-success btn-block"
                                        onClick={this.handleOnCheckout}>
                                        Checkout <i className="fa fa-angle-right"></i>
                                        </button></td>
                                </tr>
                            </tfoot>
                        </table>
                :
                <Alerts
                    alertInfo={
                    "Cart Is Empty."
                    }
                    />

            }


            </div>



            <div
                className="modal fade"
                id="checkoutModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="myModalLabel"
                aria-hidden="true">

                <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <ModalHeader title={"Checking Out Cart"} />

                    {/* Show Loading Image */}
                    <div className="loader center-loader"></div>

                </div>
                </div>
            </div>

        </div>

        <Footer />
      </div>
    );
  }
}

Cart.propTypes = {
  getAllCustomerOrders: PropTypes.func.isRequired,
  makeOrderFromMenu: PropTypes.func.isRequired,
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
      expiration: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

const mapStateToProps = state => ({
  orders: state.orderReducer.orders
});

export default withRouter(
  connect(
    mapStateToProps,
    { getAllCustomerOrders, makeOrderFromMenu }
  )(Cart)
);
