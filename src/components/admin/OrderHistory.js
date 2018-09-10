import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getAllOrders } from "../../actions/order";
import { Alerts, OrderHistoryStatusData } from "../utils/stateLess";
import CatererDashboard from "../dashboard/CatererDashboard";
import Footer from "../dashboard/Footer";

/**
 * @returns {Object} Renders an order history object
 */
export class OrderHistory extends React.Component {
  constructor(props) {
    super(props);
    this.computeOrderTotals = this.computeOrderTotals.bind(this);
  }

  /**
   * @returns {Object} All Order statuses
   */
  componentDidMount() {
    this.props.getAllOrders();
  }

  /**
   * @param {Object} orders made
   * @returns {int} amount made by caterer
   */
  computeOrderTotals(orders) {
    let total = 0;
    {
      orders &&
        orders.map(order => {
          if (order.status === "Served") {
            total += order.meal.price;
          }
        });
    }

    return total;
  }

  render() {
    let { orders } = this.props;
    return (
      <div>
        <CatererDashboard orders={orders} />

        <div className="wrapper-content ">
          <div className="body-content">
            {orders && orders.length > 0 ? (
              <div>
                <div className="row">

                <div className="col-12">
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <a className="nav-link active" data-toggle="tab" href="#served" role="tab" aria-controls="served">Served</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-toggle="tab" href="#pending" role="tab" aria-controls="pending">Pending</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-toggle="tab" href="#cancelled" role="tab" aria-controls="cancelled">Cancelled</a>
                    </li>
                </ul>
                <br />
                <div className="tab-content">

                  <div className="tab-pane active" id="served" role="tabpanel">

                    <OrderHistoryStatusData orders={this.props.orders} status="Served" statusData={"No Served Orders."} />

                  </div>

                  <div className="tab-pane" id="pending" role="tabpanel">

                    <OrderHistoryStatusData orders={this.props.orders} status="Not Served" statusData={"No Pending Orders."} />

                  </div>

                  <div className="tab-pane" id="cancelled" role="tabpanel">

                    <OrderHistoryStatusData orders={this.props.orders} status="Cancelled" statusData={"No Cancelled Orders."} />

                  </div>

                </div>
              </div>

                </div>

                <br />
                <br />
                <div className="row">
                  <div className="col-10">
                    <h5>Total Cash (Served Orders) {this.computeOrderTotals(orders)} UGX</h5>
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
  ).isRequired,
  getAllOrders: PropTypes.func.isRequired
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
