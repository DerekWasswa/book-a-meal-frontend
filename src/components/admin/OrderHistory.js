import React from "react";
import { Table } from "reactstrap";
import CatererDashboard from "../dashboard/CatererDashboard";
import Footer from "../dashboard/Footer";
import { getAllOrders } from "../../actions/order";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Alerts } from "../utils/stateLess";

class OrderHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 0,
      served: 0,
      cancelled: 0,
      pending: 0
    };

    this.computeOrderTotals = this.computeOrderTotals.bind(this);
  }

  componentDidMount() {
    this.props.getAllOrders();
  }

  computeOrderTotals(orders) {
    var total = 0;
    {
      orders &&
        orders.map(order => {
          if (order.status === "Served") {
            total = total + order.meal.price;
          }
        });
    }

    return total;
  }

  render() {
    let { orders } = this.props;
    return (
      <div>
        <CatererDashboard />

        <div className="wrapper-content ">
          <div className="body-content">
            {orders && orders.length > 0 ? (
              <div>
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
                                      <th>Owner</th>
                                      <th>Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>{order.meal.meal}</td>
                                      <td>{order.meal.price} UGX</td>
                                      <td>{order.user}</td>
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
                                      <th>Owner</th>
                                      <th>Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>{order.meal.meal}</td>
                                      <td>{order.meal.price} UGX</td>
                                      <td>{order.user}</td>
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

                <br />
                <br />
                <div className="row">
                  <div className="col-2" />
                  <div className="col-10">
                    <h5>Total Cash {this.computeOrderTotals(orders)} UGX</h5>
                  </div>
                </div>
              </div>
            ) : (
              <Alerts
                alertInfo={"No Orders. Set Menu of the Day to receive orders."}
              />
            )}
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

OrderHistory.propTypes = {
  getAllOrders: PropTypes.func.isRequired,
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
    { getAllOrders }
  )(OrderHistory)
);
