import React from "react";
import { Link } from "react-router-dom";
import { NavItem, NavLink, Table } from "reactstrap";
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";

export const LoginButtons = props => (
  <div className="row">
    <div className="col-6">
      <button type={props.loginBtnType} className={props.loginClass}>
        {props.login}
      </button>
    </div>
    <div className="col-6 text-right">
      <button type={props.forgotPassBtnType} className={props.forgotPassClass}>
        {props.forgotpassword}
      </button>
    </div>
  </div>
);

export const ModalHeader = props => (
  <div className="modal-header">
    <h4 className="modal-title">{props.title}</h4>
    <button
      className="close"
      type="button"
      data-dismiss="modal"
      aria-label="Close"
    >
      <span aria-hidden="true">×</span>
    </button>
  </div>
);

export const ModalFooter = props => (
  <div className="modal-footer">
    <button className="btn btn-secondary" type="button" data-dismiss="modal">
      Close
    </button>
    <button className={props.buttonClass} type="submit">
      {props.name}
    </button>
  </div>
);

export const LandingPageMenu = props => (
  <div className=" align-items-center d-flex">
    <nav id="nav-menu-container">
      <ul className="nav-menu">
        <li>
          <a href="#">{props.home}</a>
        </li>
        <li>
          <a href="#">{props.about}</a>
        </li>

        <li>
          <a href="#">{props.contact}</a>
        </li>
      </ul>
    </nav>
  </div>
);

export const LandingPageBodySection = props => (
  <section className="banner-area">
    <div className="container">
      <div className="row fullscreen align-items-center justify-content-between">
        <div className="col-lg-12 banner-content">
          <div className="wellcome-heading">
            <h2>{props.head1}</h2>
            <h3>{props.head2}</h3>
            <p>{props.sectionBody}</p>
          </div>
          <Link to="/login">
            <button className="primary-btn text-uppercase" type="button">
              {props.login}
            </button>
          </Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/register">
            <button className="primary-btn text-uppercase" type="button">
              {props.register}
            </button>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export const LandingPageFooter = props => (
  <footer className="footer-area">
    <div className="footer-bottom-wrap">
      <div className="container">
        <div className="row footer-bottom d-flex justify-content-between align-items-center">
          <p className="col-lg-8 col-mdcol-sm-6 -6 footer-text m-0">
            {props.copyright}
            <a href="https://andela.com" target="_blank">
              {props.developer}
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export const ReactStrapLink = props => (
  <Link to={props.location} className={props.compClass}>
    {props.name}
  </Link>
);

export const HTMLLink = props => <button>{props.name}</button>;

export const Alerts = props => (
  <div className="alert alert-info">{props.alertInfo}</div>
);

export const DashboardLink = props => (
  <LinkContainer to={props.location} activeClassName="active">
    <NavItem className="">
      <NavLink href={props.location}>{props.title}</NavLink>
    </NavItem>
  </LinkContainer>
);

export const DashboardIndexLink = props => (
  <IndexLinkContainer to={props.location} activeClassName="active">
    <NavItem className="">
      <NavLink href={props.location}>{props.title}</NavLink>
    </NavItem>
  </IndexLinkContainer>
);

export const OrderHistoryStatusData = props => (

    props.orders && (props.orders.filter(obj => { return obj.status === props.status })).length > 0
    ?

      <Table hover>
        <thead>
          <tr>
            <th>Meal</th>
            <th>Price (UGX)</th>
            <th>Menu</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>

        {props.orders &&
          props.orders.map(
            (order, index) =>

            order.status === props.status
            ?
              <tr key={index}>
                  <td>{order.meal.meal}</td>
                  <td>{order.meal.price} UGX</td>
                  <td>{order.menu.name}</td>
                  <td>{order.date}</td>
              </tr>
            :
            null
        )}
        </tbody>
        </Table>

      :
        <Alerts
          alertInfo={props.statusData}
          />

);


export const CatererMenuTabs = props => (
  <a
    key={props.index}
    className={props.itemClass}
    id={"list-" + props.index + "-list"}
    data-toggle="tab"
    href={"#list-" + props.index}
    role="tab"
    aria-controls={"list-" + props.index}
    aria-selected="true"
    >
    {props.name}
  </a>
);

export const CustomerMenuDetails = props => (
  <div>
    <br />
    <h4>Caterer</h4>

    <div>Name: {props.vendor}</div>
    <div>Email: {props.contact}</div>
    <div>Menu: {props.name}</div>
    <div>Description: {props.description}</div>
    <div>Date: {props.date}</div>
  </div>
);

export const CatererMenuDetails = props => (
  <div>
    <br />
    <h4>Menu</h4>

    <div>Name: {props.name}</div>
    <div>Description: {props.description}</div>
    <div>Date: {props.date}</div>
    <br />
  </div>
);
