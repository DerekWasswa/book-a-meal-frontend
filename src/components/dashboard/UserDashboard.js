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

import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authentication";
import { notify } from "react-notify-toast";
import jwtDecode from "jwt-decode";


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
              <IndexLinkContainer to="/" activeClassName="active">
                <NavItem className="">
                  <NavLink href="/">Home</NavLink>
                </NavItem>
              </IndexLinkContainer>

              <LinkContainer to="/c-menu" activeClassName="active">
                <NavItem className="">
                  <NavLink href="/c-menu">Menu</NavLink>
                </NavItem>
              </LinkContainer>

              <LinkContainer to="/c-orders" activeClassName="active">
                <NavItem className="">
                  <NavLink href="/c-orders">Orders</NavLink>
                </NavItem>
              </LinkContainer>

              <LinkContainer to="/c-order-history" activeClassName="active">
                <NavItem className="">
                  <NavLink href="/c-order-history">
                    Order History
                    <span className="badge-notify-served">
                    {
                      this.props.orders && (this.props.orders.filter(obj => { return obj.status === "Served" })).length > 0
                      ?
                      <Badge color="success">{this.props.orders.filter(obj => {return obj.status === "Served"}).length}</Badge>
                      :
                      null
                    }
                    {
                      this.props.orders && (this.props.orders.filter(obj => { return obj.status === "Not Served" })).length > 0
                      ?
                      <Badge className="badge-notify-pending" color="info">{this.props.orders.filter(obj => {return obj.status === "Not Served"}).length}</Badge>
                      : null
                    }
                    {
                      this.props.orders && (this.props.orders.filter(obj => { return obj.status === "Cancelled" })).length > 0
                      ?
                      <Badge className="badge-notify-canceled" color="danger">{this.props.orders.filter(obj => {return obj.status === "Cancelled"}).length}</Badge>
                      : null
                    }
                    </span>
                  </NavLink>
                </NavItem>
              </LinkContainer>
            </Nav>

            <Nav className="ml-auto login-login-link" navbar>
              <LinkContainer to="/c-orders" activeClassName="active">
                <NavItem>
                  <NavLink href="/c-orders">
                    <Badge color="secondary">432</Badge>
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
