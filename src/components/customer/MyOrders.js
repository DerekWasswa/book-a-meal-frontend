import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Table, Button } from "reactstrap";
import "../../App.css";
import UpdateMyOrderForm from "../controlled-forms/UpdateMyOrderForm";
import UserDashboard from "../UserDashboard";
import Footer from "../Footer";
import { getAllCustomerOrders } from "../../actions/order";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import jwtDecode from "jwt-decode";

class MyOrders extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    let user = jwtDecode(localStorage.getItem("app-access-token"));
    this.props.getAllCustomerOrders(JSON.stringify(user.user_id));
  }

  handleClick(value) {
    console.log(value);
  }

  render() {
    const { orders } = this.props;

    return (
      <div>
        <UserDashboard />

        <div className="wrapper-content ">
          <div className="body-content">
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
                    <tr
                      key={order.order_id}
                      onClick={() => this.handleClick(order.order_id)}
                    >
                      <td>{order.meal.meal}</td>
                      <td>{order.meal.price}</td>
                      <td>{order.menu.name}</td>
                      <td>{order.date}</td>
                      <td>
                        <Button
                          data-toggle="modal"
                          data-target="#editOrderModal"
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>

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
                    <h4 className="modal-title">Edit Order</h4>
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
                  <UpdateMyOrderForm />
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
        name: PropTypes.string.isRequired
      }).isRequired,
      user: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired
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
