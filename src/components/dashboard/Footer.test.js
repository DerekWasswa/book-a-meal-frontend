import React from "react";
import Footer from "./Footer";
import { shallow } from "enzyme";

it("renders footer", () => {
  let wrapper = shallow(<Footer />);

  expect(wrapper.find("footer").exists()).toBe(true);
  expect(wrapper.find("div").exists()).toBe(true);
  expect(wrapper.find("p").exists()).toBe(true);
  expect(wrapper.find("a").exists()).toBe(true);

  expect(wrapper.find("p").text()).toBe("© Book A Meal Uganda. Developed: Andela Bootcamp VII.");
  expect(wrapper.find("a").text()).toBe("Andela Bootcamp VII");

});
