import React from "react";
import { Label, Input, FormGroup, Col, Form } from "reactstrap";
import { addMeal } from "../../actions/meal";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { notify } from "react-notify-toast";
import $ from "jquery";

/**
 * @export
 * @class AddMealForm
 * @extends {React.Component}
 */
class AddMealForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { meal: "", price: "" };

    this.handleInputChanges = this.handleInputChanges.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChanges(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = {
      meal: this.state.meal,
      price: Number(this.state.price)
    };
    let response = this.props.addMeal(JSON.stringify(data));
    console.log(response);
    notify.show("Meal Added Successfully.");
    $("#addMealModal").modal("hide");
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="modal-body">
          <FormGroup row>
            <Label for="meal" sm={2}>
              Meal
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="meal"
                id="meal"
                value={this.state.meal}
                onChange={this.handleInputChanges}
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
                value={this.state.price}
                onChange={this.handleInputChanges}
                placeholder="0"
              />
            </Col>
          </FormGroup>
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            type="button"
            data-dismiss="modal"
          >
            Close
          </button>
          <button className="btn btn-primary" type="submit">
            Add
          </button>
        </div>
      </Form>
    );
  }
}

AddMealForm.propTypes = {
  addMeal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default withRouter(
  connect(
    mapStateToProps,
    { addMeal }
  )(AddMealForm)
);
