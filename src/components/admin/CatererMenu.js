import React from "react";
import { CardText, Button } from "reactstrap";
import CatererDashboard from "../dashboard/CatererDashboard";
import Footer from "../dashboard/Footer";
import EditMenuForm from "../controlled-forms/EditMenuForm";
import { getVendorMenus, deleteMealOffTheMenu } from "../../actions/menu";
import { getAllMeals } from "../../actions/meal";
import { getAllOrders } from "../../actions/order";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ModalHeader, Alerts } from "../utils/stateLess";

export class CatererMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuToEdit: ""
    };
  }

  componentDidMount() {
    this.props.getVendorMenus();
    this.props.getAllMeals();
    this.props.getAllOrders();
  }

  handleMenuEditClick(event, menu) {
    event.preventDefault();
    this.setState({ menuToEdit: menu });
  }

  handleDeleteMealOffMenu(event, menuId, mealId) {
    event.preventDefault();
    this.props.deleteMealOffTheMenu(menuId, mealId);
  }

  render() {
    const { menus } = this.props;
    const { meals } = this.props;
    const { orders } = this.props;

    return (
      <div>
        <CatererDashboard orders={orders} />

        <div className="wrapper-content ">
          <div className="body-content">
            {menus && menus.length > 0 ? (
              <div className="row">
                <div className="col-2">
                  <div className="list-group" id="list-tab" role="tablist">
                    {menus &&
                      menus.map(
                        (menu, index) =>
                          index === 0 ? (
                            <a
                              key={index}
                              className="list-group-item list-group-item-action active"
                              id={"list-" + index + "-list"}
                              data-toggle="tab"
                              href={"#list-" + index}
                              role="tab"
                              aria-controls={"list-" + index}
                              aria-selected="true"
                            >
                              {menu.name}
                            </a>
                          ) : (
                            <a
                              key={index}
                              className="list-group-item list-group-item-action"
                              id={"list-" + index + "-list"}
                              data-toggle="tab"
                              href={"#list-" + index}
                              role="tab"
                              aria-controls={"list-" + index}
                              aria-selected="false"
                            >
                              {menu.name}
                            </a>
                          )
                      )}
                  </div>
                </div>

                <div className="col-10">
                  <div className="tab-content" id="nav-tabContent">
                    {menus &&
                      menus.map(
                        (menu, index) =>
                          index === 0 ? (
                            <div
                              key={index}
                              className="tab-pane fade active show"
                              id={"list-" + index}
                              role="tabpanel"
                              aria-labelledby={"list-" + index + "-list"}
                            >
                              <div className="row">
                                {menu.meals.map(meal => (
                                  <div
                                    className="col-sm-6 col-md-4"
                                    key={meal.meal_id}
                                  >
                                    <div className="card menu-card">
                                      <div className="card-header">
                                        {meal.price} UGX
                                      </div>
                                      <div className="card-body">
                                        <CardText>{meal.meal}</CardText>
                                        <Button
                                          onClick={e =>
                                            this.handleDeleteMealOffMenu(
                                              e,
                                              menu.menu_id,
                                              meal.meal_id
                                            )
                                          }
                                          outline
                                          color="danger"
                                          data-placement="right"
                                          title="Delete Meal off the menu."
                                        >
                                          <i className="material-icons icon-size">
                                            &#xe872;
                                          </i>
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div>
                                <br />
                                <h4>Menu</h4>

                                <div>Name: {menu.name}</div>
                                <div>Description: {menu.description}</div>
                                <div>Date: {menu.date}</div>
                                <br />
                                <Button
                                  data-toggle="modal"
                                  data-target="#editMenuModal"
                                  outline
                                  color="secondary"
                                  data-menuid={menu.menu_id}
                                  onClick={e =>
                                    this.handleMenuEditClick(e, menu)
                                  }
                                >
                                  <i
                                    className="material-icons icon-size"
                                    data-toggle="tooltip"
                                    data-placement="right"
                                    title="Add Meals to this Menu"
                                  >
                                    &#xe3c9;
                                  </i>
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div
                              key={index}
                              className="tab-pane fade show"
                              id={"list-" + index}
                              role="tabpanel"
                              aria-labelledby={"list-" + index + "-list"}
                            >
                              <div className="row">
                                {menu.meals.map(meal => (
                                  <div
                                    className="col-sm-6 col-md-4"
                                    key={meal.meal_id}
                                  >
                                    <div className="card menu-card">
                                      <div className="card-header">
                                        {meal.price} UGX
                                      </div>
                                      <div className="card-body">
                                        <CardText>{meal.meal}</CardText>
                                        <Button
                                          onClick={e =>
                                            this.handleDeleteMealOffMenu(
                                              e,
                                              menu.menu_id,
                                              meal.meal_id
                                            )
                                          }
                                          outline
                                          color="danger"
                                          data-toggle="tooltip"
                                          data-placement="right"
                                          title="Delete Meal off the menu."
                                        >
                                          <i className="material-icons icon-size">
                                            &#xe872;
                                          </i>
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div>
                                <br />
                                <h4>Menu</h4>

                                <div>Name: {menu.name}</div>
                                <div>Description: {menu.description}</div>
                                <div>Date: {menu.date}</div>
                                <br />
                                <Button
                                  outline
                                  color="secondary"
                                  data-toggle="modal"
                                  data-target="#editMenuModal"
                                  data-menuid={menu.menu_id}
                                  onClick={e =>
                                    this.handleMenuEditClick(e, menu)
                                  }
                                >
                                  <i
                                    className="material-icons icon-size"
                                    data-toggle="tooltip"
                                    data-placement="right"
                                    title="Add Meals to this Menu."
                                  >
                                    &#xe3c9;
                                  </i>
                                </Button>
                              </div>
                            </div>
                          )
                      )}
                  </div>
                </div>
              </div>
            ) : (
              <Alerts
                alertInfo={
                  "No Menu(s). Please set a menu of the day from the meals."
                }
              />
            )}
          </div>

          <div
            className="modal fade"
            id="editMenuModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="myModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <ModalHeader title={"Add Meal(s) to Menu of the Day"} />

                {/* Add a form that has the modal body and footer */}
                <EditMenuForm
                  meals={meals}
                  menus={menus}
                  menumeals={[]}
                  menu={this.state.menuToEdit}
                />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

CatererMenu.propTypes = {
  getVendorMenus: PropTypes.func.isRequired,
  getAllMeals: PropTypes.func.isRequired,
  deleteMealOffTheMenu: PropTypes.func.isRequired,
  getAllOrders: PropTypes.func.isRequired,
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
  ).isRequired,
  menus: PropTypes.arrayOf(
    PropTypes.shape({
      menu_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      meals: PropTypes.arrayOf(
        PropTypes.shape({
          meal_id: PropTypes.number.isRequired,
          meal: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired
        }).isRequired
      ).isRequired
    }).isRequired
  ).isRequired,
  meals: PropTypes.arrayOf(
    PropTypes.shape({
      meal_id: PropTypes.number.isRequired,
      meal: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    }).isRequired
  ).isRequired
};

const mapStateToProps = state => ({
  menus: state.menuReducer.caterer_menus,
  meals: state.mealReducer.meals,
  orders: state.orderReducer.orders
});

export default withRouter(
  connect(
    mapStateToProps,
    { getVendorMenus, getAllMeals, deleteMealOffTheMenu, getAllOrders }
  )(CatererMenu)
);
