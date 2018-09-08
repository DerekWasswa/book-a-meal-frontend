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
    if(localStorage.getItem('expiration') !== null && (Number(localStorage.getItem('expiration')) - Math.round(+new Date() / 1000)) < 1 ){
      localStorage.removeItem("meals");
      localStorage.removeItem("expiration");
    }

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

                  {
                    this.props.orders && (this.props.orders.filter(obj => { return obj.status === "Served" })).length > 0
                    ?

                      <Table hover>
                        <thead>
                          <tr>
                            <th>Meal</th>
                            <th>Price (UGX)</th>
                            <th>Menu</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>

                        {orders &&
                          orders.map(
                            (order, index) =>

                            order.status === "Served"
                            ?
                              <tr key={index}>
                                  <td>{order.meal.meal}</td>
                                  <td>{order.meal.price} UGX</td>
                                  <td>{order.menu.name}</td>
                                  <td>{order.date}</td>
                              </tr>
                            :
                            null
                        )}
                        </tbody>
                        </Table>

                      :
                        <Alerts
                          alertInfo={"No Served Orders."}
                          />
                  }

               </div>

                <div className="tab-pane" id="pending" role="tabpanel">

                  {
                    this.props.orders && (this.props.orders.filter(obj => { return obj.status === "Not Served" })).length > 0
                    ?
                      <Table hover>
                        <thead>
                          <tr>
                            <th>Meal</th>
                            <th>Price (UGX)</th>
                            <th>Menu</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                        {orders &&
                          orders.map(
                            (order, index) =>

                            order.status === "Not Served"
                              ?
                                <tr key={index}>
                                    <td>{order.meal.meal}</td>
                                    <td>{order.meal.price} UGX</td>
                                    <td>{order.menu.name}</td>
                                    <td>{order.date}</td>
                                </tr>
                              :
                              null

                          )}
                          </tbody>
                        </Table>

                        :
                        <Alerts alertInfo={"No Pending Orders."} />
                  }

                </div>

                <div className="tab-pane" id="cancelled" role="tabpanel">
                  {
                    this.props.orders && (this.props.orders.filter(obj => { return obj.status === "Cancelled" })).length > 0
                    ?
                      <Table hover>
                        <thead>
                          <tr>
                            <th>Meal</th>
                            <th>Price (UGX)</th>
                            <th>Menu</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                        {orders &&
                          orders.map(
                            (order, index) =>
                            order.status === "Cancelled"
                            ?
                              <tr key={index}>
                                  <td>{order.meal.meal}</td>
                                  <td>{order.meal.price} UGX</td>
                                  <td>{order.menu.name}</td>
                                  <td>{order.date}</td>
                              </tr>
                            :
                            null
                          )}
                          </tbody>
                        </Table>
                      :
                      <Alerts
                      alertInfo={"No Cancelled Orders."}
                      />
                    }
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
