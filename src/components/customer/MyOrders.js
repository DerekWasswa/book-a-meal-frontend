import React from "react";
import "bootstrap/dist/js/bootstrap.js";
import { Table, Button } from "reactstrap";
import UpdateMyOrderForm from "../controlled-forms/UpdateMyOrderForm";
import UserDashboard from "../dashboard/UserDashboard";
import Footer from "../dashboard/Footer";
import { getAllCustomerOrders } from "../../actions/order";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import jwtDecode from "jwt-decode";
import { Alerts } from "../utils/stateLess";

export class MyOrders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clickedOrder: 0,
      clickedOrderMenu: 0,
      clickedOrderMealID: 0,
      clickedOrderMenuMeals: [{}],
      order: {}
    };

    this.handleOrderEditionClicks = this.handleOrderEditionClicks.bind(this);
  }

  componentDidMount() {
    let user = jwtDecode(localStorage.getItem("app-access-token"));
    this.props.getAllCustomerOrders(user);
  }

  handleOrderEditionClicks = (clickedOrderID, clickedMenu, orderMenuMeals, mealId, order) => event => {
    event.preventDefault();
    this.setState({
      clickedOrder: clickedOrderID,
      clickedOrderMenu: clickedMenu,
      clickedOrderMealID: mealId,
      clickedOrderMenuMeals: orderMenuMeals,
      order: order
    });
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
        <UserDashboard orders={orders} cart={
          localStorage.getItem('meals') !== null && JSON.parse(localStorage.getItem('meals')).length
        } />

        <div className="wrapper-content ">
          <div className="body-content">
            {orders && orders.length > 0 ? (
              <Table hover>
                <thead>
                  <tr>
                    <th>Meal</th>
                    <th>Price (UGX)</th>
                    <th>Caterer Menu</th>
                    <th>Date</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {orders &&
                    orders.map(order => (

                      order.status === "Not Served"
                        ?
                        <tr key={order.order_id}>
                          <td>{order.meal.meal}</td>
                          <td>{order.meal.price}</td>
                          <td>{order.menu.name}</td>
                          <td>{order.date}</td>
                          <td>
                            {Math.round(+new Date() / 1000) -
                              Number(order.expiration) >
                            3600 ? (
                              <Button
                                disabled
                                data-toggle="tooltip"
                                title="Can not edit Order. Caterer is working on it."
                              >
                                Expired
                              </Button>
                            ) : (
                              <Button
                                onClick={
                                  this.handleOrderEditionClicks(
                                    order.order_id,
                                    order.menu.menu_id,
                                    order.menu.meals,
                                    order.meal.meal_id,
                                    order
                                  )
                                }
                                data-toggle="modal"
                                data-target="#editOrderModal"
                              >
                                Edit
                              </Button>
                            )}
                          </td>
                        </tr>
                      :
                      null
                    ))}
                </tbody>
              </Table>
            ) : (
              <Alerts alertInfo={"No Orders. Place orders from the Menu."} />
            )}

            <div
              className="modal fade"
              id="editOrderModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="myModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">
                      Edit Order (Select Menu Meals to Update your Order)
                    </h4>
                    <button
                      className="close"
                      type="button"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  {/* Add a form that has the modal body and footer */}

                  <UpdateMyOrderForm
                    orderIDClicked={this.state.clickedOrder}
                    orderMenuID={this.state.clickedOrderMenu}
                    orderMealID={this.state.clickedOrderMealID}
                    meals={this.state.clickedOrderMenuMeals}
                    order={this.state.order}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

MyOrders.propTypes = {
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
    { getAllCustomerOrders }
  )(MyOrders)
);
