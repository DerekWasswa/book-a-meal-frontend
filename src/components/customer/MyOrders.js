import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Table, Button } from "reactstrap";
import "../../App.css";
import UpdateMyOrderForm from "../controlled-forms/UpdateMyOrderForm";

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
          className="modal fade"
          id="editOrderModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit Order</h4>
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
              <UpdateMyOrderForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
