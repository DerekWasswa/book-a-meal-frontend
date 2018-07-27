import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "../../App.css";
import { Table, Button } from "reactstrap";
import AddMealForm from "../controlled-forms/AddMealForm";
import UpdateMealForm from "../controlled-forms/UpdateMealForm";
import SetMenuForm from "../controlled-forms/SetMenuForm";

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
          className="modal fade"
          id="addMealModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add a Meal option</h4>
                <button
                  className="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>

              {/* Add a form that has the modal body and footer */}
              <AddMealForm />
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="deleteMealModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Delete a Meal option</h4>
                <button
                  className="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>

              <div className="modal-body">
                <h4 className="text-danger">Matooke with Chicken</h4>
                <p className="text-danger">
                  Are you sure you want to delete this Meal?
                </p>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  type="button"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button className="btn btn-danger" type="button">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="setMenuModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add Meal(s) to Menu of the Day</h4>
                <button
                  className="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>

              {/* Add a form that has the modal body and footer */}
              <SetMenuForm />
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="editMealModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit a Meal option</h4>
                <button
                  className="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              {/* Add a form that has the modal body and footer */}
              <UpdateMealForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
