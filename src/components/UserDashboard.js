import React from "react";
import "../App.css";

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
import styles from "./Header.css";

/**
 * @export
 * @class Header
 * @extends {React.Component}
 */
export class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  componentWillReceiveProps(app_props) {
    console.log(app_props);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
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
              <NavItem className="">
                <NavLink href="/c-menu">Menu</NavLink>
              </NavItem>

              <NavItem className="">
                <NavLink href="/c-orders">Orders</NavLink>
              </NavItem>

              <NavItem className="">
                <NavLink href="c-order-history">Order History</NavLink>
              </NavItem>
            </Nav>

            <Nav className="ml-auto login-login-link" navbar>
              <NavItem>
                <NavLink href="/c-orders">
                  <Badge color="secondary">432</Badge>
                  <i className="material-icons">&#xe8cc;</i>
                </NavLink>
              </NavItem>

              <NavItem className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Derick Wasswa
                </a>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
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

export default Header;
