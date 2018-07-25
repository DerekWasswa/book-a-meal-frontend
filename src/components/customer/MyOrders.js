import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Table, Button, Col, Input, Label, FormGroup, Form } from "reactstrap";
import "../../App.css";

export default class MyOrders extends React.Component {
  render() {
    return (
      <div className="body-content">
        <Table hover>
          <thead>
            <tr>
              <th>Meal</th>
              <th>Price (UGX)</th>
              <th>Caterer</th>
              <th>Date</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Beef stew with local Dishes</td>
              <td>20000</td>
              <td>Ham's</td>
              <td>2018-07-10</td>
              <td>
                <Button data-toggle="modal" data-target="#editOrderModal">
                  Edit
                </Button>
              </td>
            </tr>
            <tr>
              <td>Chicken Luwombo with Macroon Chicken Luwombo with Macroon</td>
              <td>12000</td>
              <td>Piato Restaurant</td>
              <td>2018-07-11</td>
              <td>
                <Button data-toggle="modal" data-target="#editOrderModal">
                  Edit
                </Button>
              </td>
            </tr>
            <tr>
              <td>Chips and Chicken</td>
              <td>32000</td>
              <td>HotBites</td>
              <td>2018-07-13</td>
              <td>
                <Button data-toggle="modal" data-target="#editOrderModal">
                  Edit
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>

        <div
          class="modal fade"
          id="editOrderModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Edit Order</h4>
                <button
                  class="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div class="modal-body">
                <Form>
                  <FormGroup row>
                    <Label for="meal" sm={2}>
                      Meal
                    </Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        name="meal"
                        id="meal"
                        value="Chicken Luwombo with Matooke"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="price" sm={2}>
                      Price
                    </Label>
                    <Col sm={10}>
                      <Input
                        type="number"
                        name="price"
                        id="price"
                        value="20000"
                      />
                    </Col>
                  </FormGroup>
                </Form>
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-secondary"
                  type="button"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button class="btn btn-primary" type="button">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
