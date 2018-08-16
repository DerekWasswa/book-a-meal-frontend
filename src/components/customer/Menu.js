import React from "react";
import {
  Card,
  CardColumns,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button
} from "reactstrap";
import UserDashboard from "../UserDashboard";
import Footer from "../Footer";
import { makeOrderFromMenu } from "../../actions/order";
import { getMenus } from "../../actions/menu";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { notify } from "react-notify-toast";

class Menu extends React.Component {
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
            <div className="row">
              <div className="col-2">
                <div className="list-group" id="list-tab" role="tablist">
                  {menus &&
                    menus.map(menu => (
                      <a
                        key={menu.menu_id}
                        className="list-group-item list-group-item-action active"
                        id={menu.menu_id}
                        data-toggle="tab"
                        href={"#" + menu.menu_id}
                        role="tab"
                        aria-controls={menu.menu_id}
                        aria-selected="true"
                      >
                        {menu.name}
                      </a>
                    ))}
                </div>
              </div>

              <div className="col-10">
                <div className="tab-content" id="nav-tabContent">
                  {menus &&
                    menus.map(menu => (
                      <div
                        key={menu.menu_id}
                        className="tab-pane fade active show"
                        id={menu.menu_id}
                        role="tabpanel"
                        aria-labelledby="list-profile-list"
                      >
                        <CardColumns>
                          {menu.meals.map(meal => (
                            <Card key={meal.meal_id}>
                              <CardBody>
                                <CardTitle>{meal.meal}</CardTitle>
                                <CardSubtitle>{meal.price} UGX</CardSubtitle>
                                <CardText>
                                  This card has supporting text below as a
                                  natural lead-in to additional content.
                                </CardText>
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
                                <Button outline color="success" size="sm">
                                  <i className="material-icons cart-icon-size">
                                    &#xe854;
                                  </i>
                                </Button>
                              </CardBody>
                            </Card>
                          ))}
                        </CardColumns>
                      </div>
                    ))}
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
