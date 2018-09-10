import React from "react";
import { Table } from "reactstrap";
import UserDashboard from "../dashboard/UserDashboard";
import Footer from "../dashboard/Footer";
import { getAllCustomerOrders } from "../../actions/order";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import jwtDecode from "jwt-decode";
import { Alerts, OrderHistoryStatusData } from "../utils/stateLess";
import { removeCartMealsIfMenuIsObsolete, orderPropType } from "../utils/helper";

export class MyOrderHistory extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let user = jwtDecode(localStorage.getItem("app-access-token"));
    this.props.getAllCustomerOrders(user);
  }

  render() {
    // Check if the cart meals are not obsolote
    removeCartMealsIfMenuIsObsolete();

    let { orders } = this.props;

    return (
      <div>
        <UserDashboard orders={orders} cart={
          localStorage.getItem('meals') !== null && JSON.parse(localStorage.getItem('meals')).length
        } />

        <div className="wrapper-content ">
          <div className="body-content">
            {orders && orders.length > 0 ? (
              <div className="row">

              <div className="col-12">
              <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link text-success active" data-toggle="tab" href="#served" role="tab" aria-controls="served">Served</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-info" data-toggle="tab" href="#pending" role="tab" aria-controls="pending">Pending</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-danger" data-toggle="tab" href="#cancelled" role="tab" aria-controls="cancelled">Cancelled</a>
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

MyOrderHistory.propTypes = orderPropType();

const mapStateToProps = state => ({
  orders: state.orderReducer.orders
});

export default withRouter(
  connect(
    mapStateToProps,
    { getAllCustomerOrders }
  )(MyOrderHistory)
);
