import React from "react";
import { Table } from "reactstrap";
import CatererDashboard from "../dashboard/CatererDashboard";
import Footer from "../dashboard/Footer";
import { getAllOrders } from "../../actions/order";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Alerts, OrderHistoryStatusData } from "../utils/stateLess";

export class OrderHistory extends React.Component {
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
