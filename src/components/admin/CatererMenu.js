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
import CatererDashboard from "../CatererDashboard";
import Footer from "../Footer";
import { getVendorMenus } from "../../actions/menu";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class CatererMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getVendorMenus();
  }

  renderInputField(index) {
    if (index === 0) {
      return <div />;
    } else {
      return (
        <p>
          <input onChange={this.handleChange} value={this.state.inputText} />
        </p>
      );
    }
  }

  render() {
    const { menus } = this.props;

    return (
      <div>
        <CatererDashboard />

        <div className="wrapper-content ">
          <div className="body-content">
            <div className="row">
              <div className="col-2">
                <div className="list-group" id="list-tab" role="tablist">
                  {menus &&
                    menus.map(
                      (menu, index) =>
                        index === 0 ? (
                          <a
                            key={index}
                            className="list-group-item list-group-item-action"
                            id={index}
                            data-toggle="tab"
                            href={"#" + index}
                            role="tab"
                            aria-controls={index}
                            aria-selected="true"
                          >
                            {menu.name}
                          </a>
                        ) : (
                          <a
                            key={index}
                            className="list-group-item list-group-item-action active"
                            id={index}
                            data-toggle="tab"
                            href={"#" + index}
                            role="tab"
                            aria-controls={index}
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
                            id={index}
                            role="tabpanel"
                            aria-labelledby={index}
                          >
                            <CardColumns>
                              {menu.meals.map(meal => (
                                <Card key={meal.meal_id}>
                                  <CardBody>
                                    <CardTitle>{meal.meal}</CardTitle>
                                    <CardSubtitle>
                                      {meal.price} UGX
                                    </CardSubtitle>
                                    <CardText>
                                      This is a wider card with supporting text
                                      below as a natural lead-in to additional
                                      content. This content is a little bit
                                      longer.
                                    </CardText>
                                    <Button outline color="secondary" size="sm">
                                      <i className="material-icons icon-size">
                                        &#xe3c9;
                                      </i>
                                    </Button>&nbsp;
                                    <Button outline color="danger" size="sm">
                                      <i className="material-icons icon-size">
                                        &#xe872;
                                      </i>
                                    </Button>
                                  </CardBody>
                                </Card>
                              ))}
                            </CardColumns>
                          </div>
                        ) : (
                          <div
                            key={index}
                            className="tab-pane fade show"
                            id={menu.menu_id}
                            role="tabpanel"
                            aria-labelledby={menu.menu_id}
                          >
                            <CardColumns>
                              {menu.meals.map(meal => (
                                <Card key={meal.meal_id}>
                                  <CardBody>
                                    <CardTitle>{meal.meal}</CardTitle>
                                    <CardSubtitle>
                                      {meal.price} UGX
                                    </CardSubtitle>
                                    <CardText>
                                      This is a wider card with supporting text
                                      below as a natural lead-in to additional
                                      content. This content is a little bit
                                      longer.
                                    </CardText>
                                    <Button outline color="secondary" size="sm">
                                      <i className="material-icons icon-size">
                                        &#xe3c9;
                                      </i>
                                    </Button>&nbsp;
                                    <Button outline color="danger" size="sm">
                                      <i className="material-icons icon-size">
                                        &#xe872;
                                      </i>
                                    </Button>
                                  </CardBody>
                                </Card>
                              ))}
                            </CardColumns>
                          </div>
                        )
                    )}
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

CatererMenu.propTypes = {
  getVendorMenus: PropTypes.func.isRequired,
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
  menus: state.menuReducer.caterer_menus
});

export default withRouter(
  connect(
    mapStateToProps,
    { getVendorMenus }
  )(CatererMenu)
);
