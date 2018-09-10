import React from "react";
import "bootstrap/dist/js/bootstrap.js";
import CatererDashboard from "../dashboard/CatererDashboard";
import Footer from "../dashboard/Footer";
import { Table, Button } from "reactstrap";
import AddMealForm from "../controlled-forms/AddMealForm";
import UpdateMealForm from "../controlled-forms/UpdateMealForm";
import SetMenuForm from "../controlled-forms/SetMenuForm";
import DeleteMeal from "../controlled-forms/DeleteMeal";
import { getAllMeals } from "../../actions/meal";
import { getAllOrders } from "../../actions/order";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loggedInTokenExp } from "../utils/helper";
import { ModalHeader, Alerts } from "../utils/stateLess";

export class ManageMeals extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clickedMeal: 0, checkedMeals: [], meals: [] };

    this.handleMealEditionClicks = this.handleMealEditionClicks.bind(this);
    this.handleCheckedMeals = this.handleCheckedMeals.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
  }

  isLoggedIn() {
    if (loggedInTokenExp) {
      this.props.history.push("/login");
    }
  }

  componentDidMount() {
    this.props.getAllMeals();
    this.props.getAllOrders();
  }

  componentWillReceiveProps(newMeals) {
    this.setState({ meals: newMeals.meals });
  }

  handleCheckedMeals(event) {
    // current meals
    const mealsList = this.state.checkedMeals;
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
    this.setState({ checkedMeals: mealsList });
  }

  handleMealEditionClicks(event) {
    // Whenever an edit button is clicked, identify the meal that is clicked
    const { param } = event.target.dataset;
    this.setState({ clickedMeal: param });
  }

  render() {
    const { meals } = this.props;
    let { orders } = this.props;

    return (
      <div>
        <CatererDashboard orders={orders} />

        <div className="wrapper-content ">
          <div className="body-content">
            {this.state.meals && this.state.meals.length > 0 ? (
              <Table hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Select</th>
                    <th>Meal</th>
                    <th>Price (UGX)</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.meals.map((meal, index) => (
                    <tr key={meal.meal_id}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <input
                          type="checkbox"
                          name="mealitem"
                          value={meal.meal_id}
                          onChange={this.handleCheckedMeals}
                        />
                      </td>
                      <td>{meal.meal}</td>
                      <td>{meal.price}</td>
                      <td>
                        <Button
                          data-param={meal.meal_id}
                          onClick={this.handleMealEditionClicks}
                          data-toggle="modal"
                          data-target="#editMealModal"
                          key={meal.meal_id}
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Alerts alertInfo={"No Meals. Click Add to add meals."} />
            )}
            <Button
              outline
              color="primary"
              data-toggle="modal"
              data-target="#addMealModal"
            >
              Add Meal
            </Button>{" "}
            <Button
              outline
              color="danger"
              data-toggle="modal"
              data-target="#deleteMealModal"
            >
              Delete
            </Button>{" "}
            <Button
              outline
              color="success"
              data-toggle="modal"
              data-target="#setMenuModal"
            >
              Set Menu of the Day
            </Button>{" "}

            <div
              className="modal fade"
              id="addMealModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="myModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <ModalHeader title={"Add a Meal option"} />

                  {/* Add a form that has the modal body and footer */}
                  <AddMealForm />
                </div>
              </div>
            </div>

            <div
              className="modal fade"
              id="deleteMealModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="myModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                {/* Add a form that has the modal body and footer */}
                <DeleteMeal mealIDs={this.state.checkedMeals} />
              </div>
            </div>

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

                  <ModalHeader title={"Add Meal(s) to Menu of the Day"} />

                  {/* Add a form that has the modal body and footer */}
                  <SetMenuForm data={meals} />
                </div>
              </div>
            </div>
            <div
              className="modal fade"
              id="editMealModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="myModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">

                  <ModalHeader title={"Edit a Meal option"} />

                  {/* Add a form that has the modal body and footer */}
                  <UpdateMealForm mealID={this.state.clickedMeal} />
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

ManageMeals.propTypes = {
  getAllMeals: PropTypes.func.isRequired,
  getAllOrders: PropTypes.func.isRequired,
  meals: PropTypes.arrayOf(
    PropTypes.shape({
      meal_id: PropTypes.number.isRequired,
      meal: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
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
  meals: state.mealReducer.meals,
  orders: state.orderReducer.orders
});

export default withRouter(
  connect(
    mapStateToProps,
    { getAllMeals, getAllOrders }
  )(ManageMeals)
);
