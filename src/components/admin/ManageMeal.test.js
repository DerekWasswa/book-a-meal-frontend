import React from "react";
import ManageMeal from "./ManageMeal";
import { shallow } from "enzyme";

it("renders Manage meals dashboard", () => {
  shallow(<ManageMeal />);
});
