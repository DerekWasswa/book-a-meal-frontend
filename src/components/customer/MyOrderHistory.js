import React from "react";
import "../../App.css";
import { Table } from "reactstrap";

export default class MyOrderHistory extends React.Component {
  render() {
    return (
      <div className="body-content">
        <div className="row">
          <div className="col-2">
            <div className="list-group" id="list-tab" role="tablist">
              <a
                className="list-group-item list-group-item-action"
                id="list-home-list"
                data-toggle="tab"
                href="#list-home"
                role="tab"
                aria-controls="list-home"
                aria-selected="false"
              >
                10-07-2018
              </a>
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
                <Table hover>
                  <thead>
                    <tr>
                      <th>Meal</th>
                      <th>Price (UGX)</th>
                      <th>Caterer</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Beef stew with local Dishes</td>
                      <td>20000</td>
                      <td>HotBites</td>
                      <td>2018-07-10</td>
                    </tr>
                    <tr>
                      <td>
                        Chicken Luwombo with Macroon Chicken Luwombo with
                        Macroon
                      </td>
                      <td>12000</td>
                      <td>Piato Restaurant</td>
                      <td>2018-07-11</td>
                    </tr>
                    <tr>
                      <td>Chips and Chicken</td>
                      <td>32000</td>
                      <td>Piato Restaurant</td>
                      <td>2018-07-13</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div
                class="tab-pane fade active show"
                id="list-profile"
                role="tabpanel"
                aria-labelledby="list-profile-list"
              >
                <Table hover>
                  <thead>
                    <tr>
                      <th>Meal</th>
                      <th>Price (UGX)</th>
                      <th>Caterer</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Beef stew with local Dishes</td>
                      <td>20000</td>
                      <td>HotBites</td>
                      <td>2018-07-10</td>
                    </tr>
                    <tr>
                      <td>
                        Chicken Luwombo with Macroon Chicken Luwombo with
                        Macroon
                      </td>
                      <td>12000</td>
                      <td>Piato Restaurant</td>
                      <td>2018-07-11</td>
                    </tr>
                    <tr>
                      <td>Chips and Chicken</td>
                      <td>32000</td>
                      <td>Piato Restaurant</td>
                      <td>2018-07-13</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div
                class="tab-pane fade"
                id="list-messages"
                role="tabpanel"
                aria-labelledby="list-messages-list"
              >
                <Table hover>
                  <thead>
                    <tr>
                      <th>Meal</th>
                      <th>Price (UGX)</th>
                      <th>Caterer</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Beef stew with local Dishes</td>
                      <td>20000</td>
                      <td>HotBites</td>
                      <td>2018-07-10</td>
                    </tr>
                    <tr>
                      <td>
                        Chicken Luwombo with Macroon Chicken Luwombo with
                        Macroon
                      </td>
                      <td>12000</td>
                      <td>Piato Restaurant</td>
                      <td>2018-07-11</td>
                    </tr>
                    <tr>
                      <td>Chips and Chicken</td>
                      <td>32000</td>
                      <td>Piato Restaurant</td>
                      <td>2018-07-13</td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              <div
                class="tab-pane fade"
                id="list-settings"
                role="tabpanel"
                aria-labelledby="list-settings-list"
              >
                <Table hover>
                  <thead>
                    <tr>
                      <th>Meal</th>
                      <th>Price (UGX)</th>
                      <th>Caterer</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Beef stew with local Dishes</td>
                      <td>20000</td>
                      <td>HotBites</td>
                      <td>2018-07-10</td>
                    </tr>
                    <tr>
                      <td>
                        Chicken Luwombo with Macroon Chicken Luwombo with
                        Macroon
                      </td>
                      <td>12000</td>
                      <td>Piato Restaurant</td>
                      <td>2018-07-11</td>
                    </tr>
                    <tr>
                      <td>Chips and Chicken</td>
                      <td>32000</td>
                      <td>Piato Restaurant</td>
                      <td>2018-07-13</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
