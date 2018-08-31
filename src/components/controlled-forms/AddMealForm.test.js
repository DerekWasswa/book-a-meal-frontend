import React from "react";
import AddMealForm from "./AddMealForm";
import { shallow } from "enzyme";

it("renders add a meal form", () => {
  shallow(<AddMealForm />);
});
