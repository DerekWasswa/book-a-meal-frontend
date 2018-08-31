import React from "react";
import SignUpForm from "./SignUpForm";
import { shallow } from "enzyme";

it("renders sign up form", () => {
  shallow(<SignUpForm />);
});
