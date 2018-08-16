import React from "react";
import { NavLink } from "reactstrap";
import "./LandingPage.css";
import "./animate.css";

/**
 * @export
 * @class LandingPage
 * @extends {React.Component}
 */
export class LandingPage extends React.Component {
  render() {
    return (
      <body>
        <header class="header_area animated">
          <div class="container-fluid">
            <div class="row align-items-center">
              <div class="col-12 col-lg-10">
                <div class="menu_area">
                  <nav class="navbar navbar-expand-lg navbar-light">
                    <a class="navbar-brand" href="#">
                      Book a Meal
                    </a>
                    <button
                      class="navbar-toggler"
                      type="button"
                      data-toggle="collapse"
                      data-target="#ca-navbar"
                      aria-controls="ca-navbar"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span class="navbar-toggler-icon" />
                    </button>
                    <div class="collapse navbar-collapse" id="ca-navbar">
                      <ul class="navbar-nav ml-auto" id="nav">
                        <li class="nav-item active">
                          <a class="nav-link" href="#about">
                            About
                          </a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="#contact">
                            Contact
                          </a>
                        </li>
                      </ul>
                      <div class="sing-up-button d-lg-none">
                        <NavLink href="/register">Sign Up Free</NavLink>
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
              <div class="col-12 col-lg-2">
                <div class="sing-up-button d-none d-lg-block">
                  <NavLink href="/register">Sign Up Free</NavLink>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section class="wellcome_area clearfix" id="home">
          <div class="container h-100">
            <div class="row h-100 align-items-center">
              <div class="col-12 col-md">
                <div class="wellcome-heading">
                  <h2>At Your Service</h2>
                  <h3>Hungry</h3>
                  <p>
                    A plethora of menus with sumptuous meals from credible
                    caterers in the country.
                  </p>
                </div>
                <div class="login">
                  <form action="#">
                    <NavLink className="submit" href="/login">
                      Sign In
                    </NavLink>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="welcome-thumb wow fadeInDown" data-wow-delay="0.5s">
            <img src="../../img/welcomes.png" alt="" />
          </div>
        </section>

        <footer class="footer-text text-center section_padding_70 clearfix">
          <div class="copyright-text">
            <p>
              Copyright © Book A Meal Uganda. Developed:{" "}
              <a href="https://andela.com" target="_blank">
                Andela Uganda VII
              </a>
            </p>
          </div>
        </footer>
      </body>
    );
  }
}

export default LandingPage;
