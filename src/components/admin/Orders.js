import React from "react";
import { Table } from "reactstrap";
import CatererDashboard from "../CatererDashboard";
import Footer from "../Footer";
import "../../App.css";
import { getAllOrders } from "../../actions/order";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.getAllOrders();
  }

  handleClick(value) {
    console.log(value);
  }

  render() {
    const { orders } = this.props;

    return (
      <div>
        <CatererDashboard />

        <div className="wrapper-content ">
          <div className="body-content">
            <Table hover>
              <thead>
                <tr>
                  <th>Meal</th>
                  <th>Price (UGX)</th>
                  <th>Date</th>
                  <th>Owner</th>
                  <th>Serve</th>
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
                      <td>{order.date}</td>
                      <td>{order.user}</td>

                      <td>
                        <button
                          className="btn btn-success"
                          data-param={order.order_id}
                          onClick={this.serveOrder}
                        >
                          Serve
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>

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
                  <div className="modal-header">
                    <h4 className="modal-title">Order Meals</h4>
                    <button
                      className="close"
                      type="button"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
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
    { getAllOrders }
  )(Orders)
);
