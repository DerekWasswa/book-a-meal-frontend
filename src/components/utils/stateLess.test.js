import React from "react";
import {
  LoginButtons,
  ModalHeader,
  ModalFooter,
  ReactStrapLink,
  Alerts,
  LandingPageMenu,
  LandingPageBodySection,
  LandingPageFooter,
  DashboardIndexLink,
  DashboardLink,
  OrderHistoryStatusData
} from "./stateLess";
import { NavItem, NavLink, Table } from "reactstrap";
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { shallow } from "enzyme";

it("renders all login buttons", () => {
  const props = {
    loginBtnType: "John",
    loginClass: "btn btn-primary px-4",
    login: "Login",
    loginBtnType: "submit",
    forgotPassBtnType: "button",
    forgotPassClass: "btn btn-link px-0",
    forgotpassword: "Forgot password?"
  };

  let wrapper = shallow(<LoginButtons {...props} />);

  expect(wrapper.find("div").exists()).toBe(true);
  expect(wrapper.find("div").exists()).toBe(true);
  expect(wrapper.find("button").exists()).toBe(true);

  expect(
    wrapper
      .find("button")
      .at(0)
      .text()
  ).toBe("Login");

  expect(
    wrapper
      .find("button")
      .at(1)
      .text()
  ).toBe("Forgot password?");
});

it("renders modal header", () => {
  const props = {
    title: "Add Meal"
  };

  let wrapper = shallow(<ModalHeader {...props} />);

  expect(wrapper.find("div").exists()).toBe(true);
  expect(wrapper.find("h4").exists()).toBe(true);
  expect(wrapper.find("button").exists()).toBe(true);
  expect(wrapper.find("span").exists()).toBe(true);

  expect(
    wrapper
      .find("button")
      .at(0)
      .text()
  ).toBe("×");

  expect(wrapper.find("h4").text()).toBe("Add Meal");
});

it("renders modal footer", () => {
  const props = {
    name: "Save Meal"
  };

  let wrapper = shallow(<ModalFooter {...props} />);

  expect(wrapper.find("div").exists()).toBe(true);
  expect(wrapper.find("button").exists()).toBe(true);

  expect(
    wrapper
      .find("button")
      .at(0)
      .text()
  ).toBe("Close");

  expect(
    wrapper
      .find("button")
      .at(1)
      .text()
  ).toBe("Save Meal");
});

it("renders Link", () => {
  const props = {
    location: "/",
    compClass: "navbar-brand text-white",
    name: "Home"
  };

  let wrapper = shallow(<ReactStrapLink {...props} />);

  expect(wrapper.find(Link).exists()).toBe(true);

  expect(wrapper.find(Link).text()).toBe("<Link />");
});

it("renders an alert", () => {
  const props = {
    alertInfo: "No Meals, Click add to add a meal option."
  };

  let wrapper = shallow(<Alerts {...props} />);

  expect(wrapper.find("div").exists()).toBe(true);

  expect(wrapper.find("div").text()).toBe(
    "No Meals, Click add to add a meal option."
  );
});

it("renders landing page menu", () => {
  const props = {
    home: "A",
    about: "B",
    contact: "Me"
  };

  let wrapper = shallow(<LandingPageMenu {...props} />);

  expect(wrapper.find("div").exists()).toBe(true);
  expect(wrapper.find("nav").exists()).toBe(true);
  expect(wrapper.find("ul").exists()).toBe(true);
  expect(wrapper.find("li").exists()).toBe(true);
  expect(wrapper.find("a").exists()).toBe(true);

  expect(
    wrapper
      .find("a")
      .at(0)
      .text()
  ).toBe("A");

  expect(
    wrapper
      .find("a")
      .at(1)
      .text()
  ).toBe("B");

  expect(
    wrapper
      .find("a")
      .at(2)
      .text()
  ).toBe("Me");
});

it("renders landing page body section", () => {
  const props = {
    head1: "Book A Meal",
    head2: "Serving You",
    sectionBody: "Come one come all.",
    login: "Signin",
    register: "Signup"
  };

  let wrapper = shallow(<LandingPageBodySection {...props} />);

  expect(wrapper.find("section").exists()).toBe(true);
  expect(wrapper.find("div").exists()).toBe(true);
  expect(wrapper.find("h2").exists()).toBe(true);
  expect(wrapper.find("h3").exists()).toBe(true);
  expect(wrapper.find("p").exists()).toBe(true);
  expect(wrapper.find(Link).exists()).toBe(true);
  expect(wrapper.find("button").exists()).toBe(true);

  expect(wrapper.find("h2").text()).toBe("Book A Meal");

  expect(wrapper.find("h3").text()).toBe("Serving You");

  expect(wrapper.find("p").text()).toBe("Come one come all.");

  expect(
    wrapper
      .find("button")
      .at(0)
      .text()
  ).toBe("Signin");

  expect(
    wrapper
      .find("button")
      .at(1)
      .text()
  ).toBe("Signup");
});

it("renders landing page footer", () => {
  const props = {
    copyright: "A",
    developer: "B"
  };

  let wrapper = shallow(<LandingPageFooter {...props} />);

  expect(wrapper.find("footer").exists()).toBe(true);
  expect(wrapper.find("div").exists()).toBe(true);
  expect(wrapper.find("p").exists()).toBe(true);
  expect(wrapper.find("a").exists()).toBe(true);

  expect(wrapper.find("p").text()).toBe("AB");

  expect(wrapper.find("a").text()).toBe("B");
});

it("renders DashboardIndexLink", () => {
  const props = {
    location: "/",
    title: "Home"
  };

  let wrapper = shallow(<DashboardIndexLink {...props} />);

  expect(wrapper.find(IndexLinkContainer).exists()).toBe(true);
  expect(wrapper.find(NavItem).exists()).toBe(true);
  expect(wrapper.find(NavLink).exists()).toBe(true);
});

it("renders DashboardLink", () => {
  const props = {
    location: "/",
    title: "Home"
  };

  let wrapper = shallow(<DashboardLink {...props} />);

  expect(wrapper.find(LinkContainer).exists()).toBe(true);
  expect(wrapper.find(NavItem).exists()).toBe(true);
  expect(wrapper.find(NavLink).exists()).toBe(true);
});

it("renders OrderHistoryStatusData Served", () => {

  const props = {
    orders: [{
      order_id: 1,
      meal: {
        meal_id: 1,
        meal: "Food",
        price: 10
      },
      menu: {
          menu_id: 1,
          name: "Special Sunday",
          contact: "test@gmail.com",
          description: "Come dine with us",
          date: "2018-08-30",
          meals: [
            {
              meal_id: 1,
              meal: "Rolex",
              price: 4000
            },
            {
              meal_id: 2,
              meal: "Chicken",
              price: 10000
            }
          ]
      },
      user: "test@test.com",
      date: "2018-09-03",
      status: "Served"
     }],
    status: "Served",
    statusData: "No Served Orders."
  };

  let wrapper = shallow(<OrderHistoryStatusData {...props} />);

  expect(wrapper.find(Table).exists()).toBe(true);
  expect(wrapper.find(Alerts).exists()).toBe(false);
});

it("renders OrderHistoryStatusData Served", () => {

  const props = {
    orders: [{
      order_id: 1,
      meal: {
        meal_id: 1,
        meal: "Food",
        price: 10
      },
      menu: {
          menu_id: 1,
          name: "Special Sunday",
          contact: "test@gmail.com",
          description: "Come dine with us",
          date: "2018-08-30",
          meals: [
            {
              meal_id: 1,
              meal: "Rolex",
              price: 4000
            },
            {
              meal_id: 2,
              meal: "Chicken",
              price: 10000
            }
          ]
      },
      user: "test@test.com",
      date: "2018-09-03",
      status: "Served"
     }],
    status: "Not Served",
    statusData: "No Served Orders."
  };

  let wrapper = shallow(<OrderHistoryStatusData {...props} />);

  expect(wrapper.find(Table).exists()).toBe(false);
  expect(wrapper.find(Alerts).exists()).toBe(true);
});
