import React from "react";
import UserDashboard from "./UserDashboard";
import { shallow } from "enzyme";

it("renders user dashboard", () => {
  shallow(<UserDashboard />);
});
