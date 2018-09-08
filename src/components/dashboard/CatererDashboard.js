import React from "react";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Badge
} from "reactstrap";
import { LinkContainer } from "react-router-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { notify } from "react-notify-toast";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authentication";
import { DashboardLink, DashboardIndexLink } from "../utils/stateLess";

/**
 * @export
 * @class CatererDashboard
 * @extends {React.Component}
 */
export class CatererDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };

    this.logout = this.logout.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout(event) {
    event.preventDefault();

    this.props.logoutUser();
    notify.show("Logged Out.");
    this.props.history.push("/login");
  }

  render() {
    return (
      <div className="header">
        <Navbar color="dark" className="navbar-dark" expand="md">
          <NavbarBrand href="/" className="App-title">
            Book A Meal
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="nav-bar-items-left" navbar>

              <DashboardIndexLink location={"/"} title={"Home"} activeClassName="active" />

              <DashboardLink location={"/meals"} title={"Meals"} activeClassName="active" />
              <DashboardLink location={"/vendor/menu"} title={"Menu"} activeClassName="active" />


              <LinkContainer to="/orders" activeClassName="active">
                <NavItem className="">
                  <NavLink href="/orders">
                    Orders

                    <span className="badge-notify-served">
                    {
                      this.props.orders && (this.props.orders.filter(obj => { return obj.status === "Not Served" })).length > 0
                      ?
                      <Badge color="success">{this.props.orders.filter(obj => {return obj.status === "Not Served"}).length}</Badge>
                      :
                      null
                    }
                    </span>

                  </NavLink>
                </NavItem>
              </LinkContainer>

              <DashboardLink location={"/orderhistory"} title={"OrderHistory"} activeClassName="active" />
            </Nav>

            <Nav className="ml-auto login-login-link" navbar>
              <NavItem className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {localStorage.getItem("username")}
                </a>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#" onClick={this.logout}>
                    Logout
                  </a>
                </div>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

CatererDashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default withRouter(
  connect(
    mapStateToProps,
    { logoutUser }
  )(CatererDashboard)
);
