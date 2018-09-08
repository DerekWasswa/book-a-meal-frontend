import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";
import { UserDashboard } from "./UserDashboard";
import { DashboardIndexLink, DashboardLink } from "../utils/stateLess";
import { shallow, mount } from "enzyme";
import sinon from 'sinon';
import notify from "react-notify-toast";
jest.mock('react-notify-toast')

describe("<LoginForm />", () => {

  let history;
  let reset;
  let update = sinon.stub().resolves({success: true})

  beforeEach(() => {
    history = {
      push: sinon.spy()
    }
    reset = sinon.spy()
  });

  it("renders user dashboard", () => {
    let logoutUser = jest.fn()
    let wrapper = shallow(<UserDashboard logoutUser={logoutUser} />);

    expect(wrapper.find("div").exists()).toBe(true);
    expect(wrapper.find(Navbar).exists()).toBe(true);
    expect(wrapper.find(NavbarBrand).exists()).toBe(true);
    expect(wrapper.find(NavbarToggler).exists()).toBe(true);
    expect(wrapper.find(Collapse).exists()).toBe(true);
    expect(wrapper.find(Nav).exists()).toBe(true);
    expect(wrapper.find(DashboardIndexLink).exists()).toBe(true);
    expect(wrapper.find(DashboardLink).exists()).toBe(true);
    expect(wrapper.find(NavItem).exists()).toBe(true);
    expect(wrapper.find(NavLink).exists()).toBe(true);
    expect(wrapper.find(LinkContainer).exists()).toBe(true);
    expect(wrapper.find("a").exists()).toBe(true);

    expect(wrapper.find(NavbarBrand).text()).toBe("<NavbarBrand />");
    expect(wrapper.find(NavLink).at(0).text()).toBe("<NavLink />");
    expect(wrapper.find(NavLink).at(1).text()).toBe("<NavLink />");
    expect(wrapper.find("a").at(1).text()).toBe("Logout");

  });

  it("user dashboard defined", () => {
    let logoutUser = jest.fn()
    let wrapper = shallow(
      <UserDashboard
        logoutUser={logoutUser}  />);
    expect(wrapper).toBeDefined();
  });


  it('calls `toggle` when navbartoggle is clicked', ()=>{
    let logoutUser = jest.fn()
    let update = sinon.stub().resolves({success: true})
    let wrapper = shallow(
      <UserDashboard
        update
        history={history}
        logoutUser={logoutUser}
        reset />);

    wrapper.find(NavbarToggler).simulate('click');
    expect(wrapper.state('isOpen')).toBe(true);
  })

  it('calls `logout` when logout button is clicked', ()=>{
    let logoutUser = jest.fn()
    let update = sinon.stub().resolves({success: true})
    let wrapper = shallow(
      <UserDashboard
        update
        history={history}
        logoutUser={logoutUser}
        reset />);

    wrapper.find("a").at(1).simulate('click', { preventDefault() {} });
    expect(logoutUser).toBeCalled();
    expect(notify.show).toBe(notify.show);
  })
});
