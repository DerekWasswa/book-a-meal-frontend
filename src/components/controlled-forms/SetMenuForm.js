import React from "react";
import { Table, Label, Input, FormGroup, Form } from "reactstrap";

/**
 * @export
 * @class SetMenuForm
 * @extends {React.Component}
 */
export class SetMenuForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", description: "", date: "", meals: [] };

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
    const name = this.state.name;
    const description = this.state.description;
    const date = this.state.date;
    const meals = this.state.meals;
    console.log(name);
    console.log(description);
    console.log(date);
    console.log(meals);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="modal-body">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active"
                data-toggle="tab"
                href="#menu"
                role="tab"
                aria-controls="menu"
              >
                Menu &nbsp;
                <span className="badge badge-success">Details</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#meals"
                role="tab"
                aria-controls="meals"
              >
                <i className="icon-basket-loaded" /> Meals&nbsp;
                <span className="badge badge-pill badge-danger">2</span>
              </a>
            </li>
          </ul>
          <br />

          <div className="tab-content">
            <div className="tab-pane active" id="menu" role="tabpanel">
              <FormGroup>
                <Label for="name">Menu Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={this.state.name}
                  onChange={this.handleInputChanges}
                  placeholder="Chilliz Special Friday"
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">Text Area</Label>
                <Input
                  type="textarea"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleInputChanges}
                  id="description"
                />
              </FormGroup>
              <FormGroup>
                <Label for="dates">Date</Label>
                <Input
                  type="date"
                  name="date"
                  id="dates"
                  value={this.state.date}
                  onChange={this.handleInputChanges}
                  placeholder="date placeholder"
                />
              </FormGroup>
            </div>
            <div className="tab-pane" id="meals" role="tabpanel">
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
                    <th>
                      <input
                        type="checkbox"
                        value={1}
                        onChange={this.handleMealSelectionChanges.bind(this)}
                      />
                    </th>
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
                      Chicken Luwombo with Macroon Chicken Luwombo with Macroon
                    </td>
                    <td>12000</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
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
            Add Menu
          </button>
        </div>
      </Form>
    );
  }
}

export default SetMenuForm;
