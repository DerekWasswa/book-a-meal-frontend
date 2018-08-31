import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import configureStore from "redux-mock-store";
import LandingPage from "./LandingPage";
import {
  ReactStrapLink,
  LandingPageMenu,
  LandingPageBodySection,
  LandingPageFooter
} from "../utils/stateLess";

describe("<LandingPage />", () => {
  describe("render()", () => {
    test("renders the landing page component", () => {
      const propsMenu = {
        home: "A",
        about: "B",
        contact: "Me"
      };

      const propsFooter = {
        copyright: "A",
        developer: "B"
      };

      const propsSection = {
        head1: "Book A Meal",
        head2: "Serving You",
        sectionBody: "Come one come all.",
        login: "Signin",
        register: "Signup"
      };
      const wrapper = shallow(<LandingPage />);

      expect(wrapper.find("div").exists()).toBe(true);
      expect(wrapper.find("header").exists()).toBe(true);
      expect(wrapper.find(ReactStrapLink).exists()).toBe(true);
      expect(wrapper.find(LandingPageMenu).exists()).toBe(true);
      expect(wrapper.find(LandingPageBodySection).exists()).toBe(true);
      expect(wrapper.find(LandingPageFooter).exists()).toBe(true);
    });
  });
});
