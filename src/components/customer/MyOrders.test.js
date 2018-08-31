import React from "react";
import MyOrders from "./MyOrders";
import { shallow } from "enzyme";

it("renders customers' orders", () => {
  shallow(<MyOrders />);
});
