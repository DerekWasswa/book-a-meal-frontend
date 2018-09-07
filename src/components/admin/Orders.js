import React from "react";
import { Table } from "reactstrap";
import CatererDashboard from "../dashboard/CatererDashboard";
import Footer from "../dashboard/Footer";
import { getAllOrders, serveOrder, cancelOrder } from "../../actions/order";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { notify } from "react-notify-toast";
import { ModalHeader, Alerts } from "../utils/stateLess";

export class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.serveCustomerOrder = this.serveCustomerOrder.bind(this);
    this.cancelCustomerOrder = this.cancelCustomerOrder.bind(this);
  }

  componentDidMount() {
    this.props.getAllOrders();
  }

  serveCustomerOrder(event) {
    event.preventDefault();
    const { param } = event.target.dataset;
    this.props.serveOrder(param);
    notify.show("Order has been serve Successfully.", "success");
  }

  cancelCustomerOrder(event) {
    event.preventDefault();
    const { param } = event.target.dataset;
    this.props.cancelOrder(param);
    notify.show("Order has been cancelled Successfully.", "success");
  }

  render() {
    const { orders } = this.props;

    return (
      <div>
        <CatererDashboard orders={orders} />

        <div className="wrapper-content ">
          <div className="body-content">
            {orders && orders.length > 0 ? (
              <Table hover>
                <thead>
                  <tr>
                    <th>Meal</th>
                    <th>Price (UGX)</th>
                    <th>Date</th>
                    <th>Owner</th>
                    <th>Serve</th>
                    <th>Cancel</th>
                  </tr>
                </thead>
                <tbody>
                  {orders &&
                    orders.map(order => (
                      <tr key={order.order_id}>
                        <td>{order.meal.meal}</td>
                        <td>{order.meal.price}</td>
                        <td>{order.date}</td>
                        <td>{order.user}</td>

                        <td>
                          {order.status === "Not Served" ? (
                            <button
                              className="btn btn-success"
                              data-param={order.order_id}
                              onClick={this.serveCustomerOrder}
                            >
                              Serve
                            </button>
                          ) : (

                            order.status === "Served" ?
                            <button className="btn btn-success" disabled>
                              Served
                            </button> : null
                          )}
                        </td>


                        <td>
                        {order.status === "Not Served" ? (
                          <button
                            className="btn btn-danger"
                            data-param={order.order_id}
                            onClick={this.cancelCustomerOrder}
                          >
                            Cancel
                          </button>
                        ) :
                        (
                          order.status === "Cancelled"

                          ?
                          <button className="btn btn-danger" disabled>
                            Cancelled
                          </button>
                          :
                          null

                        )}
                      </td>

                      </tr>
                    ))}
                </tbody>
              </Table>
            ) : (
              <Alerts
                alertInfo={"No Orders. Set Menu of the Day to receive orders."}
              />
            )}

            <div
              className="modal fade"
              id="setMenuModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="myModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                  <ModalHeader title={"Order Meals"} />
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

Orders.propTypes = {
  getAllOrders: PropTypes.func.isRequired,
  serveOrder: PropTypes.func.isRequired,
  cancelOrder: PropTypes.func.isRequired,
  orders: PropTypes.arrayOf(
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
};

const mapStateToProps = state => ({
  orders: state.orderReducer.orders
});

export default withRouter(
  connect(
    mapStateToProps,
    { getAllOrders, serveOrder, cancelOrder }
  )(Orders)
);
