import React from "react";
import MyOrderHistory from "./MyOrderHistory";
import { shallow } from "enzyme";

it("renders customers' order history", () => {
  shallow(<MyOrderHistory />);
});
