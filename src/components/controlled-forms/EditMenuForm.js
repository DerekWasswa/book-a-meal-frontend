import React from "react";
import { Table, Input, Form } from "reactstrap";
import { setMenu } from "../../actions/menu";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { notify } from "react-notify-toast";
import $ from "jquery";
import { ModalFooter } from "../utils/stateLess";

/**
 * @export
 * @class SetMenuForm
 * @extends {React.Component}
 */
export class EditMenuForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMealSelectionChanges = this.handleMealSelectionChanges.bind(
      this
    );
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
    this.setState({ meals: mealsList });
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = this.props.menu.name;
    const description = this.props.menu.description;
    const date = this.props.menu.date;
    const meals = this.state.meals;

    let data = {
      menu_name: name,
      description: description,
      date: date,
      meal_id: meals
    };
    this.props.setMenu(data);
      notify.show("Meals have been added to the menu successfully.", "success");
      $("#editMenuModal .close").click()
  }

  render() {
    let vendormeals = this.props.meals;
    let vendormenu = this.props.menus;
    let menuToEdit = this.props.menu;
    let menuMeals = this.props.menumeals;

    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="modal-body">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#meals"
                role="tab"
                aria-controls="meals"
              >
                <i className="icon-basket-loaded" /> Meals
              </a>
            </li>
          </ul>
          <br />

          <div className="tab-content">
            <div className="tab-pane active" id="meals" role="tabpanel">
              <Table hover>
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Meal</th>
                    <th>Price (UGX)</th>
                  </tr>
                </thead>
                <tbody>
                  {vendormenu &&
                    vendormenu.map(
                      menu =>
                        menu === menuToEdit
                          ? menu.meals.map(meal => (
                              <tr hidden key={meal.meal_id}>
                                <td>{menuMeals.push(meal.meal_id)}</td>
                              </tr>
                            ))
                          : console.log("")
                    )}

                  {vendormeals &&
                    vendormeals.map(
                      meal =>
                        menuMeals.indexOf(meal.meal_id) > -1 ? (
                          <tr key={meal.meal_id}>
                            <th>
                              <input checked={true} disabled type="checkbox" />
                            </th>
                            <td>{meal.meal}</td>
                            <td>{meal.price}</td>
                          </tr>
                        ) : (
                          <tr key={meal.meal_id}>
                            <th>
                              <input
                                name="menumeal"
                                type="checkbox"
                                value={meal.meal_id}
                                onChange={this.handleMealSelectionChanges.bind(
                                  this
                                )}
                              />
                            </th>
                            <td>{meal.meal}</td>
                            <td>{meal.price}</td>
                          </tr>
                        )
                    )}
                </tbody>
              </Table>
            </div>
          </div>
        </div>

        <ModalFooter
          name={"Add Meals to Menu"}
          buttonClass={"btn btn-primary"}
        />
      </Form>
    );
  }
}

EditMenuForm.propTypes = {
  setMenu: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default withRouter(
  connect(
    mapStateToProps,
    { setMenu }
  )(EditMenuForm)
);
