import React from "react";
import OrderHistory from "./OrderHistory";
import { shallow } from "enzyme";

it("renders vendors order history", () => {
  shallow(<OrderHistory />);
});
