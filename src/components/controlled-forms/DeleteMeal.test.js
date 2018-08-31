import React from "react";
import DeleteMeal from "./DeleteMeal";
import { shallow } from "enzyme";

it("renders delete a meal form", () => {
  shallow(<DeleteMeal />);
});
