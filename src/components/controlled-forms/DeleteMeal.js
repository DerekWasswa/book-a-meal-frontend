import React from "react";
import { Form } from "reactstrap";
import { deleteMeal } from "../../actions/meal";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import $ from "jquery";
import { ModalFooter } from "../utils/stateLess";

/**
 * @export
 * @class DeleteMeal
 * @extends {React.Component}
 */
class DeleteMeal extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.mealIDs.map(mealID =>
      this.props.deleteMeal(JSON.stringify(mealID))
    );
    $("#deleteMealModal").modal("hide");
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
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
            <h4 className="text-danger">This operation cannot be undone!!!</h4>
            <p className="text-danger">
              Are you sure you want to delete this Meal?
            </p>
          </div>

          <ModalFooter name={"Delete"} buttonClass={"btn btn-danger"} />
        </div>
      </Form>
    );
  }
}

DeleteMeal.propTypes = {
  deleteMeal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default withRouter(
  connect(
    mapStateToProps,
    { deleteMeal }
  )(DeleteMeal)
);
