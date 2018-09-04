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
import Header from "./Header";
import { shallow, mount } from "enzyme";

it("renders header", () => {
  let wrapper = shallow(<Header />);
  expect(wrapper.find("div").exists()).toBe(true);
  expect(wrapper.find(Navbar).exists()).toBe(true);
  expect(wrapper.find(NavbarBrand).exists()).toBe(true);
  expect(wrapper.find(NavbarToggler).exists()).toBe(true);
  expect(wrapper.find(Nav).exists()).toBe(true);
  expect(wrapper.find(NavItem).exists()).toBe(true);
  expect(wrapper.find(NavLink).exists()).toBe(true);
  expect(wrapper.find(Collapse).exists()).toBe(true);
});

it('calls `toggle` when navbartoggle is clicked', () => {
  const wrapper = mount(<Header />);

  const instance = wrapper.instance();
  const spy = jest.spyOn(instance, 'toggle');
  wrapper.update();
  wrapper.find(NavbarToggler).simulate('click');
  expect(wrapper.state('isOpen')).toBe(true);

});
