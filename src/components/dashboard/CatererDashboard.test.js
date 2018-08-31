import React from "react";
import CatererDashboard from "./CatererDashboard";
import { shallow } from "enzyme";

it("renders caterer dashboard", () => {
  shallow(<CatererDashboard />);
});
