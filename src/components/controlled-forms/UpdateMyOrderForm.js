import React from "react";
import { Form, Table } from "reactstrap";
import { updateOrder } from "../../actions/order";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { notify } from "react-notify-toast";
import $ from "jquery";
import { ModalFooter } from "../utils/stateLess";

/**
 * @export
 * @class UpdateMyOrderForm
 * @extends {React.Component}
 */
export class UpdateMyOrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
      orderIDClicked: 0,
      orderMenuID: 0,
      orderMealID: 0,
      orderMenuMeals: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMealSelectionChanges = this.handleMealSelectionChanges.bind(
      this
    );
  }

  handleMealSelectionChanges(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({ orderMealID: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = {
      meal_id: this.props.orderMealID,
      menu_id: this.props.orderMenuID,
      user: localStorage.getItem("user"),
      order_to_update: this.state.orderMealID
    };
    this.props.updateOrder(JSON.stringify(data), this.props.orderIDClicked);

    notify.show("Order has been updated successfully.");
    $("#editOrderModal .close").click()
  }

  render() {
    let orderIDClicked = this.props.orderIDClicked;
    let orderMenuID = this.props.orderMenuID;
    let orderMealID = this.props.orderMealID;
    let order = this.props.order;
    let meals = this.props.meals;

    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="modal-body">
          <h5>Order Meal to Update</h5>
          <div>{order.meal && "Name: " + order.meal.meal}</div>
          <div>{order.meal && "Price: " + order.meal.price}</div>
          <br />

          <Table hover>
            <thead>
              <tr>
                <th>Select</th>
                <th>Meal</th>
                <th>Price (UGX)</th>
              </tr>
            </thead>

            <tbody>
              {meals &&
                meals.map(
                  (meal, index) =>
                    orderMealID !== meal.meal_id ? (
                      <tr key={index}>
                        <td>
                          <input
                            type="radio"
                            name="order"
                            value={meal.meal_id}
                            onChange={this.handleMealSelectionChanges.bind(
                              this
                            )}
                          />
                        </td>
                        <td>{meal.meal}</td>
                        <td>{meal.price}</td>
                      </tr>
                    ) : (
                      console.log("")
                    )
                )}
            </tbody>
          </Table>
        </div>

        <ModalFooter name={"Edit Order"} buttonClass={"btn btn-primary"} />
      </Form>
    );
  }
}

UpdateMyOrderForm.propTypes = {
  updateOrder: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default withRouter(
  connect(
    mapStateToProps,
    { updateOrder }
  )(UpdateMyOrderForm)
);
