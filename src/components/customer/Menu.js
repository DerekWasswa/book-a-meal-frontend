import React from "react";
import {
  Card,
  CardColumns,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button
} from "reactstrap";

export default class Menu extends React.Component {
  render() {
    return (
      <div className="body-content">
        <div className="row">
          <div className="col-2">
            <div className="list-group" id="list-tab" role="tablist">
              <a
                className="list-group-item list-group-item-action active"
                id="list-profile-list"
                data-toggle="tab"
                href="#list-profile"
                role="tab"
                aria-controls="list-profile"
                aria-selected="true"
              >
                11-07-2018
              </a>
              <a
                className="list-group-item list-group-item-action"
                id="list-messages-list"
                data-toggle="tab"
                href="#list-messages"
                role="tab"
                aria-controls="list-messages"
              >
                13-07-2018
              </a>
              <a
                className="list-group-item list-group-item-action"
                id="list-settings-list"
                data-toggle="tab"
                href="#list-settings"
                role="tab"
                aria-controls="list-settings"
              >
                23-06-2018
              </a>
            </div>
          </div>

          <div className="col-10">
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade"
                id="list-home"
                role="tabpanel"
                aria-labelledby="list-home-list"
              >
                <CardColumns>
                  <Card>
                    <CardBody>
                      <CardTitle>Chicken Luwombo</CardTitle>
                      <CardSubtitle>50000 UGX</CardSubtitle>
                      <CardText>
                        This card has supporting text below as a natural lead-in
                        to additional content.
                      </CardText>
                      <Button outline color="secondary" size="sm">
                        Order Now
                      </Button>&nbsp;
                      <Button outline color="success" size="sm">
                        <i class="material-icons cart-icon-size">&#xe854;</i>
                      </Button>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <CardTitle>GNUTS Luwombo</CardTitle>
                      <CardSubtitle>18000 UGX</CardSubtitle>
                      <CardText>
                        With supporting text below as a natural lead-in to
                        additional content.
                      </CardText>
                      <Button outline color="secondary" size="sm">
                        Order Now
                      </Button>&nbsp;
                      <Button outline color="success" size="sm">
                        <i class="material-icons cart-icon-size">&#xe854;</i>
                      </Button>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <CardTitle>Beef Stew</CardTitle>
                      <CardSubtitle>23000 UGX</CardSubtitle>
                      <CardText>
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This card has
                        even longer content than the first to show that equal
                        height action.
                      </CardText>
                      <Button outline color="secondary" size="sm">
                        Order Now
                      </Button>&nbsp;
                      <Button outline color="success" size="sm">
                        <i class="material-icons cart-icon-size">&#xe854;</i>
                      </Button>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <CardTitle>Fish fingers</CardTitle>
                      <CardText>
                        With supporting text below as a natural lead-in to
                        additional content.
                      </CardText>
                      <Button outline color="secondary" size="sm">
                        Order Now
                      </Button>&nbsp;
                      <Button outline color="success" size="sm">
                        <i class="material-icons cart-icon-size">&#xe854;</i>
                      </Button>
                    </CardBody>
                  </Card>
                </CardColumns>
              </div>
              <div
                class="tab-pane fade active show"
                id="list-profile"
                role="tabpanel"
                aria-labelledby="list-profile-list"
              >
                <CardColumns>
                  <Card>
                    <CardBody>
                      <CardTitle>Beef Stew</CardTitle>
                      <CardSubtitle>23000 UGX</CardSubtitle>
                      <CardText>
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This card has
                        even longer content than the first to show that equal
                        height action.
                      </CardText>
                      <Button outline color="secondary" size="sm">
                        Order Now
                      </Button>&nbsp;
                      <Button outline color="success" size="sm">
                        <i class="material-icons cart-icon-size">&#xe854;</i>
                      </Button>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <CardTitle>Fish fingers</CardTitle>
                      <CardText>
                        With supporting text below as a natural lead-in to
                        additional content.
                      </CardText>
                      <Button outline color="secondary" size="sm">
                        Order Now
                      </Button>&nbsp;
                      <Button outline color="success" size="sm">
                        <i class="material-icons cart-icon-size">&#xe854;</i>
                      </Button>
                    </CardBody>
                  </Card>
                </CardColumns>
              </div>
              <div
                class="tab-pane fade"
                id="list-messages"
                role="tabpanel"
                aria-labelledby="list-messages-list"
              >
                <CardColumns>
                  <Card>
                    <CardBody>
                      <CardTitle>Fish en All foods</CardTitle>
                      <CardSubtitle>25000 UGX</CardSubtitle>
                      <CardText>
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer.
                      </CardText>
                      <Button outline color="secondary" size="sm">
                        Order Now
                      </Button>&nbsp;
                      <Button outline color="success" size="sm">
                        <i class="material-icons cart-icon-size">&#xe854;</i>
                      </Button>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <CardTitle>Chicken Luwombo</CardTitle>
                      <CardSubtitle>50000 UGX</CardSubtitle>
                      <CardText>
                        This card has supporting text below as a natural lead-in
                        to additional content.
                      </CardText>
                      <Button outline color="secondary" size="sm">
                        Order Now
                      </Button>&nbsp;
                      <Button outline color="success" size="sm">
                        <i class="material-icons cart-icon-size">&#xe854;</i>
                      </Button>
                    </CardBody>
                  </Card>
                </CardColumns>
              </div>

              <div
                class="tab-pane fade"
                id="list-settings"
                role="tabpanel"
                aria-labelledby="list-settings-list"
              >
                <CardColumns>
                  <Card>
                    <CardBody>
                      <CardTitle>Fish en All foods</CardTitle>
                      <CardSubtitle>25000 UGX</CardSubtitle>
                      <CardText>
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer.
                      </CardText>
                      <Button outline color="secondary" size="sm">
                        Order Now
                      </Button>&nbsp;
                      <Button outline color="success" size="sm">
                        <i class="material-icons cart-icon-size">&#xe854;</i>
                      </Button>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <CardTitle>Beef Stew</CardTitle>
                      <CardSubtitle>23000 UGX</CardSubtitle>
                      <CardText>
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This card has
                        even longer content than the first to show that equal
                        height action.
                      </CardText>
                      <Button outline color="secondary" size="sm">
                        Order Now
                      </Button>&nbsp;
                      <Button outline color="success" size="sm">
                        <i class="material-icons cart-icon-size">&#xe854;</i>
                      </Button>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <CardTitle>Fish fingers</CardTitle>
                      <CardText>
                        With supporting text below as a natural lead-in to
                        additional content.
                      </CardText>
                      <Button outline color="secondary" size="sm">
                        Order Now
                      </Button>&nbsp;
                      <Button outline color="success" size="sm">
                        <i class="material-icons cart-icon-size">&#xe854;</i>
                      </Button>
                    </CardBody>
                  </Card>
                </CardColumns>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
