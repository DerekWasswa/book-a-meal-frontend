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
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authentication";
import { notify } from "react-notify-toast";
import jwtDecode from "jwt-decode";
import { DashboardLink, DashboardIndexLink } from "../utils/stateLess";

/**
 * @export
 * @class Header
 * @extends {React.Component}
 */
export class UserDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };

    this.logout = this.logout.bind(this);
    this.determineNotificationBadge = this.determineNotificationBadge.bind(this);
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

  determineNotificationBadge(status, notificationColor, badgeClass){
    if(this.props.orders && (this.props.orders.filter(obj => { return obj.status === status })).length > 0){
      return <Badge color={notificationColor} className={badgeClass}>{this.props.orders.filter(obj => {return obj.status === status}).length}</Badge>;
    }else{
      return null;
    }
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
              <DashboardLink location={"/c-menu"} title={"Menu"} activeClassName="active" />
              <DashboardLink location={"/c-orders"} title={"Orders"} activeClassName="active" />

              <LinkContainer to="/c-order-history" activeClassName="active">
                <NavItem className="">
                  <NavLink href="/c-order-history">
                    Order History
                    <span className="badge-notify-served">
                    {
                      this.determineNotificationBadge("Served", "success")
                    }
                    {
                      this.determineNotificationBadge("Not Served", "info", "badge-notify-pending")
                    }
                    {
                      this.determineNotificationBadge("Cancelled", "danger", "badge-notify-canceled")
                    }
                    </span>
                  </NavLink>
                </NavItem>
              </LinkContainer>
            </Nav>

            <Nav className="ml-auto login-login-link" navbar>
              <LinkContainer to="/cart" activeClassName="active">
                <NavItem>
                  <NavLink href="/cart">
                    <Badge color="secondary">
                    {
                      this.props.cart && this.props.cart
                    }</Badge>
                    <i className="material-icons">&#xe8cc;</i>
                  </NavLink>
                </NavItem>
              </LinkContainer>

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

UserDashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
});

export default withRouter(
  connect(
    mapStateToProps,
    { logoutUser }
  )(UserDashboard)
);
