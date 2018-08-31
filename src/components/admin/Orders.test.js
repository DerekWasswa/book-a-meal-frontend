import React from "react";
import Orders from "./Orders";
import { shallow } from "enzyme";

it("renders vendors orders from customers", () => {
  shallow(<Orders />);
});
