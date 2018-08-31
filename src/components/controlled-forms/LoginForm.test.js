import React from "react";
import LoginForm from "./LoginForm";
import { shallow } from "enzyme";

it("renders login form", () => {
  shallow(<LoginForm />);
});
