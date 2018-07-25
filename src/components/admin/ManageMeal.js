import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "../../App.css";
import { Table, Button, Label, Input, FormGroup, Col, Form } from "reactstrap";

export default class ManageMeals extends React.Component {
  render() {
    return (
      <div className="body-content">
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Select</th>
              <th>Meal</th>
              <th>Price (UGX)</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <th>
                <input type="checkbox" />
              </th>
              <td>Beef stew with local Dishes</td>
              <td>20000</td>
              <td>
                <Button data-toggle="modal" data-target="#editMealModal">
                  Edit
                </Button>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>
                <input type="checkbox" />
              </td>
              <td>Chicken Luwombo with Macroon Chicken Luwombo with Macroon</td>
              <td>12000</td>
              <td>
                <Button data-toggle="modal" data-target="#editMealModal">
                  Edit
                </Button>
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>
                <input type="checkbox" />
              </td>
              <td>Chips and Chicken</td>
              <td>32000</td>
              <td>
                <Button data-toggle="modal" data-target="#editMealModal">
                  Edit
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
        <Button
          outline
          color="primary"
          data-toggle="modal"
          data-target="#addMealModal"
        >
          Add Meal
        </Button>{" "}
        <Button
          outline
          color="danger"
          data-toggle="modal"
          data-target="#deleteMealModal"
        >
          Delete
        </Button>{" "}
        <Button
          outline
          color="success"
          data-toggle="modal"
          data-target="#setMenuModal"
        >
          Add to Menu of the Day
        </Button>{" "}
        <div
          class="modal fade"
          id="addMealModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Add a Meal option</h4>
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
                        placeholder="Chicken Luwombo with Matooke"
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
                        placeholder="0"
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
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          class="modal fade"
          id="deleteMealModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Delete a Meal option</h4>
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
                <h4 className="text-danger">Matooke with Chicken</h4>
                <p className="text-danger">
                  Are you sure you want to delete this Meal?
                </p>
              </div>

              <div class="modal-footer">
                <button
                  class="btn btn-secondary"
                  type="button"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button class="btn btn-danger" type="button">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          class="modal fade"
          id="setMenuModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Add Meal(s) to Menu of the Day</h4>
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
                <ul class="nav nav-tabs" role="tablist">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      data-toggle="tab"
                      href="#menu"
                      role="tab"
                      aria-controls="menu"
                    >
                      Menu &nbsp;
                      <span class="badge badge-success">Details</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      data-toggle="tab"
                      href="#meals"
                      role="tab"
                      aria-controls="meals"
                    >
                      <i class="icon-basket-loaded" /> Meals&nbsp;
                      <span class="badge badge-pill badge-danger">2</span>
                    </a>
                  </li>
                </ul>
                <br />
                <div class="tab-content">
                  <div class="tab-pane active" id="menu" role="tabpanel">
                    <Form>
                      <FormGroup>
                        <Label for="name">Menu Name</Label>
                        <Input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Chilliz Special Friday"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="description">Text Area</Label>
                        <Input
                          type="textarea"
                          name="description"
                          id="description"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleDate">Date</Label>
                        <Input
                          type="date"
                          name="date"
                          id="exampleDate"
                          placeholder="date placeholder"
                        />
                      </FormGroup>
                    </Form>
                  </div>
                  <div class="tab-pane" id="meals" role="tabpanel">
                    <Table hover>
                      <thead>
                        <tr>
                          <th>Select</th>
                          <th>Meal</th>
                          <th>Price (UGX)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>
                            <input type="checkbox" checked />
                          </th>
                          <td>Beef stew with local Dishes</td>
                          <td>20000</td>
                        </tr>
                        <tr>
                          <td>
                            <input type="checkbox" checked />
                          </td>
                          <td>
                            Chicken Luwombo with Macroon Chicken Luwombo with
                            Macroon
                          </td>
                          <td>12000</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
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
                  Add Menu
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          class="modal fade"
          id="editMealModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Edit a Meal option</h4>
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
