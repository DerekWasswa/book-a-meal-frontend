import React from "react";
import Login from "./Login";
import { shallow } from "enzyme";

it("renders login page", () => {
  shallow(<Login />);
});
