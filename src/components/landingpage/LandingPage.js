import React from "react";
import jquery from "jquery";
import "../../__tests__/setup/main.js";
import { Link } from "react-router-dom";
import {
  ReactStrapLink,
  LandingPageMenu,
  LandingPageBodySection,
  LandingPageFooter
} from "../utils/stateLess";

class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <header id="header">
          <div className="container main-menu">
            <div className="row">
              <ReactStrapLink
                compClass={"navbar-brand text-white"}
                location={"/"}
                name={"Book a Meal"}
              />

              <LandingPageMenu
                home={"Home"}
                about={"About"}
                contact={"Contact"}
              />
            </div>
          </div>
        </header>

        <LandingPageBodySection
          head1={"At Your Service"}
          head2={"Hungry"}
          sectionBody={
            "A plethora of menus with sumptuous meals from credible caterers in the country."
          }
          login={"Login"}
          register={"Register"}
        />

        <LandingPageFooter
          copyright={"Copyright © Book A Meal Uganda. Developed:"}
          developer={"Andela Uganda Cohort VII"}
        />
      </div>
    );
  }
}

export default LandingPage;
