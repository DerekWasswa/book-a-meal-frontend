import React from "react";
import { Form, Table } from "reactstrap";

/**
 * @export
 * @class UpdateMyOrderForm
 * @extends {React.Component}
 */
export class UpdateMyOrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { meals: [] };

    this.handleInputChanges = this.handleInputChanges.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMealSelectionChanges = this.handleMealSelectionChanges.bind(
      this
    );
  }

  handleInputChanges(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({ [name]: value });
  }

  handleMealSelectionChanges(event) {
    // current meals
    const mealsList = this.state.meals;
    let index;

    // check if the meal check box is checked or unchecked
    if (event.target.checked) {
      // add the numerical value of the checkbox to options array
      mealsList.push(+event.target.value);
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = mealsList.indexOf(+event.target.value);
      mealsList.splice(index, 1);
    }
    this.setState({ meal: mealsList });
  }

  handleSubmit(event) {
    event.preventDefault();
    const meal = this.state.meals;
    console.log(meal);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="modal-body">
          <p>Select Menu Meals to Update your Order.</p>
          <Table hover>
            <thead>
              <tr>
                <th>Select</th>
                <th>Meal</th>
                <th>Price (UGX)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    value={1}
                    onChange={this.handleMealSelectionChanges.bind(this)}
                  />
                </td>
                <td>Beef stew with local Dishes</td>
                <td>20000</td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    value={2}
                    onChange={this.handleMealSelectionChanges.bind(this)}
                  />
                </td>
                <td>
                  Chicken Luwombo with Macroon Chicken Luwombo wings twiks.
                </td>
                <td>12000</td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    value={3}
                    onChange={this.handleMealSelectionChanges.bind(this)}
                  />
                </td>
                <td>Chips and Chicken</td>
                <td>32000</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            type="button"
            data-dismiss="modal"
          >
            Close
          </button>
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        </div>
      </Form>
    );
  }
}

export default UpdateMyOrderForm;
