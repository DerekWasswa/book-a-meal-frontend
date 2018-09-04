import React from "react";
import { CatererDashboard } from "./CatererDashboard";
import { shallow } from "enzyme";
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
import notify from "react-notify-toast";
import sinon from 'sinon';
jest.mock('react-notify-toast')

describe("<CatererDashboard />", () => {

  let wrapper;
  let orders;
  let logoutUser = jest.fn;
  let history;
  let reset;
  let update = sinon.stub().resolves({success: true})

  beforeEach(() => {
    history = {
      push: sinon.spy()
    }
    reset = sinon.spy()
  });

  it("caterer dashboard is defined", () => {
    wrapper = shallow(
      <CatererDashboard
      logoutUser={logoutUser} />);
    expect(wrapper).toBeDefined();
  });

  it("renders caterer dashboard", () => {

    let wrapper = shallow(<CatererDashboard logoutUser={logoutUser} />);


    expect(wrapper.find("div").exists()).toBe(true);
    expect(wrapper.find(Navbar).exists()).toBe(true);
    expect(wrapper.find(NavbarBrand).exists()).toBe(true);
    expect(wrapper.find(NavbarToggler).exists()).toBe(true);
    expect(wrapper.find(Collapse).exists()).toBe(true);
    expect(wrapper.find(Nav).exists()).toBe(true);
    expect(wrapper.find(IndexLinkContainer).exists()).toBe(true);
    expect(wrapper.find(NavItem).exists()).toBe(true);
    expect(wrapper.find(NavLink).exists()).toBe(true);
    expect(wrapper.find(LinkContainer).exists()).toBe(true);
    expect(wrapper.find("a").exists()).toBe(true);

    expect(wrapper.find(NavbarBrand).text()).toBe("<NavbarBrand />");

    expect(wrapper.find(NavLink).at(0).text()).toBe("<NavLink />");
    expect(wrapper.find(NavLink).at(1).text()).toBe("<NavLink />");
    expect(wrapper.find(NavLink).at(2).text()).toBe("<NavLink />");
    expect(wrapper.find(NavLink).at(3).text()).toBe("<NavLink />");
    expect(wrapper.find(NavLink).at(4).text()).toBe("<NavLink />");

    expect(wrapper.find("a").at(1).text()).toBe("Logout");

  });

  it('calls `toggle` when navbartoggle is clicked', ()=>{
    let logoutUser = jest.fn()
    let update = sinon.stub().resolves({success: true})
    let wrapper = shallow(
      <CatererDashboard
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
      <CatererDashboard
        update
        history={history}
        logoutUser={logoutUser}
        reset />);

    wrapper.find("a").at(1).simulate('click', { preventDefault() {} });
    expect(logoutUser).toBeCalled();
    expect(notify.show).toBe(notify.show);
  })
});
