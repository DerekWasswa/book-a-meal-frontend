import React from "react";
import { CardText, Button } from "reactstrap";
import UserDashboard from "../dashboard/UserDashboard";
import Footer from "../dashboard/Footer";
import { makeOrderFromMenu } from "../../actions/order";
import { getMenus } from "../../actions/menu";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { notify } from "react-notify-toast";
import { Alerts } from "../utils/stateLess";

export class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedMeal: 1
    };

    this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
  }

  componentDidMount() {
    this.props.getMenus();
  }

  handlePlaceOrder(event) {
    event.preventDefault();
    const { mealid } = event.target.dataset;
    const { menuid } = event.target.dataset;
    let data = {
      meal_id: mealid,
      user: localStorage.getItem("user"),
      menu_id: menuid,
      date: new Date().toISOString().slice(0, 10)
    };
    this.props.makeOrderFromMenu(JSON.stringify(data));
    notify.show("Your Order has been placed Successfully.");
  }

  render() {
    const { menus } = this.props;

    return (
      <div>
        <UserDashboard />

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
                                          data-mealid={meal.meal_id}
                                          data-menuid={menu.menu_id}
                                          outline
                                          color="secondary"
                                          size="sm"
                                          onClick={this.handlePlaceOrder}
                                        >
                                          Order Now
                                        </Button>&nbsp;
                                        <Button
                                          outline
                                          color="success"
                                          size="sm"
                                        >
                                          <i className="material-icons cart-icon-size">
                                            &#xe854;
                                          </i>
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <br />
                              <h4>Caterer</h4>

                              <div>Name: {menu.vendor}</div>
                              <div>Email: {menu.contact}</div>
                              <div>Menu: {menu.name}</div>
                              <div>Description: {menu.description}</div>
                              <div>Date: {menu.date}</div>


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
                                          data-mealid={meal.meal_id}
                                          data-menuid={menu.menu_id}
                                          outline
                                          color="secondary"
                                          size="sm"
                                          onClick={this.handlePlaceOrder}
                                        >
                                          Order Now
                                        </Button>&nbsp;
                                        <Button
                                          outline
                                          color="success"
                                          size="sm"
                                        >
                                          <i className="material-icons cart-icon-size">
                                            &#xe854;
                                          </i>
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>



                              <br />
                              <h4>Caterer</h4>

                              <div>Name: {menu.vendor}</div>
                              <div>Email: {menu.contact}</div>
                              <div>Menu: {menu.name}</div>
                              <div>Description: {menu.description}</div>
                              <div>Date: {menu.date}</div>


                            </div>
                          )
                      )}
                  </div>
                </div>
              </div>
            ) : (
              <Alerts
                alertInfo={
                  "Menu(s) of the day have not been set yet. Check again later."
                }
              />
            )}
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

Menu.propTypes = {
  makeOrderFromMenu: PropTypes.func.isRequired,
  getMenus: PropTypes.func.isRequired,
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
  ).isRequired
};

const mapStateToProps = state => ({
  menus: state.menuReducer.menus
});

export default withRouter(
  connect(
    mapStateToProps,
    { makeOrderFromMenu, getMenus }
  )(Menu)
);
