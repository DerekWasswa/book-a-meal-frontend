import React from "react";
import { Table } from "reactstrap";
import UserDashboard from "../dashboard/UserDashboard";
import Footer from "../dashboard/Footer";
import { getAllCustomerOrders } from "../../actions/order";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import jwtDecode from "jwt-decode";
import { Alerts } from "../utils/stateLess";

class MyOrderHistory extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let user = jwtDecode(localStorage.getItem("app-access-token"));
    this.props.getAllCustomerOrders(JSON.stringify(user.user_id));
  }

  render() {
    let { orders } = this.props;

    return (
      <div>
        <UserDashboard />

        <div className="wrapper-content ">
          <div className="body-content">
            {orders && orders.length > 0 ? (
              <div className="row">
                <div className="col-2">
                  <div className="list-group" id="list-tab" role="tablist">
                    {orders &&
                      orders.map(
                        (order, index) =>
                          index === 0 ? (
                            <a
                              key={index}
                              className="list-group-item list-group-item-action active"
                              id={"list-" + index + "-list"}
                              data-toggle="tab"
                              href={"#list-" + index}
                              role="tab"
                              aria-controls={"list-" + index}
                              aria-selected="true"
                            >
                              {new Date(order.date).getFullYear() +
                                "-" +
                                (
                                  "0" +
                                  (new Date(order.date).getMonth() + 1)
                                ).slice(-2) +
                                "-" +
                                ("0" + new Date(order.date).getDate()).slice(
                                  -2
                                )}
                            </a>
                          ) : (
                            <a
                              key={index}
                              className="list-group-item list-group-item-action"
                              id={"list-" + index + "-list"}
                              data-toggle="tab"
                              href={"#list-" + index}
                              role="tab"
                              aria-controls={"list-" + index}
                              aria-selected="false"
                            >
                              {new Date(order.date).getFullYear() +
                                "-" +
                                (
                                  "0" +
                                  (new Date(order.date).getMonth() + 1)
                                ).slice(-2) +
                                "-" +
                                ("0" + new Date(order.date).getDate()).slice(
                                  -2
                                )}
                            </a>
                          )
                      )}
                  </div>
                </div>

                <div className="col-10">
                  <div className="tab-content" id="nav-tabContent">
                    {orders &&
                      orders.map(
                        (order, index) =>
                          index === 0 ? (
                            <div
                              key={index}
                              className="tab-pane fade active show"
                              id={"list-" + index}
                              role="tabpanel"
                              aria-labelledby={"list-" + index + "-list"}
                            >
                              <Table hover>
                                <thead>
                                  <tr>
                                    <th>Meal</th>
                                    <th>Price (UGX)</th>
                                    <th>Caterer</th>
                                    <th>Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>{order.meal.meal}</td>
                                    <td>{order.meal.price} UGX</td>
                                    <td>{order.menu.name}</td>
                                    <td>{order.status}</td>
                                  </tr>
                                </tbody>
                              </Table>
                            </div>
                          ) : (
                            <div
                              key={index}
                              className="tab-pane fade show"
                              id={"list-" + index}
                              role="tabpanel"
                              aria-labelledby={"list-" + index + "-list"}
                            >
                              <Table hover>
                                <thead>
                                  <tr>
                                    <th>Meal</th>
                                    <th>Price (UGX)</th>
                                    <th>Caterer</th>
                                    <th>Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>{order.meal.meal}</td>
                                    <td>{order.meal.price} UGX</td>
                                    <td>{order.menu.name}</td>
                                    <td>{order.status}</td>
                                  </tr>
                                </tbody>
                              </Table>
                            </div>
                          )
                      )}
                  </div>
                </div>
              </div>
            ) : (
              <Alerts alertInfo={"No Orders. Place orders from the Menu."} />
            )}
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

MyOrderHistory.propTypes = {
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

const mapStateToProps = state => ({
  orders: state.orderReducer.orders
});

export default withRouter(
  connect(
    mapStateToProps,
    { getAllCustomerOrders }
  )(MyOrderHistory)
);
