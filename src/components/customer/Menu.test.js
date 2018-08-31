import React from "react";
import Menu from "./Menu";
import { shallow } from "enzyme";

it("renders menu of day to customers", () => {
  shallow(<Menu />);
});
