import React from "react";
import { Form } from "reactstrap";
import { deleteMeal } from "../../actions/meal";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import $ from "jquery";
import { ModalFooter, ModalHeader } from "../utils/stateLess";

/**
 * @export
 * @class DeleteMeal
 * @extends {React.Component}
 */
export class DeleteMeal extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.mealIDs.map(mealID =>
      this.props.deleteMeal(JSON.stringify(mealID))
    );
    $("#deleteMealModal .close").click()
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="modal-content">

          <ModalHeader title={"Delete a Meal option"} />

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
