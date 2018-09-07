import React from "react";
import { signUpUser } from "../../actions/authentication";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registrationSuccess } from "../utils/helper";

/**
 * @export
 * @class SignUpForm
 * @extends {React.Component}
 */
export class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      caterer: false
    };

    this.handleInputChanges = this.handleInputChanges.bind(this);
    this.handleCheckboxChanges = this.handleCheckboxChanges.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(registered) {
    if (registered.auth.message === "Successfully Registered. Please login") {
      registrationSuccess("Successfully Registered. Please login.", 201);
    }
  }

  handleInputChanges(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({ [name]: value });
  }

  handleCheckboxChanges(event) {
    this.setState({ caterer: event.target.checked });
  }

  handleSubmit(event) {
    event.preventDefault();

    let data = {
      email: this.state.email,
      password: this.state.password,
      admin: this.state.caterer,
      username: this.state.username
    };
    this.props.signUpUser(JSON.stringify(data));
  }

  render() {
    const { auth } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-group mb-3">
          <input
            className="form-control"
            name="username"
            type="text"
            required={true}
            value={this.state.username}
            onChange={this.handleInputChanges}
            placeholder="Username"
          />
        </div>
        <div className="input-group mb-3">
          <input
            className="form-control"
            name="email"
            type="email"
            required={true}
            value={this.state.email}
            onChange={this.handleInputChanges}
            placeholder="Email"
          />
        </div>
        <div className="input-group mb-3">
          <input
            name="password"
            className="form-control"
            type="password"
            required={true}
            value={this.state.password}
            onChange={this.handleInputChanges}
            placeholder="Password"
          />
        </div>
        <div className="input-group mb-4">
          <input
            name="confirmPassword"
            className="form-control"
            type="password"
            required={true}
            value={this.state.confirmPassword}
            onChange={this.handleInputChanges}
            placeholder="Repeat password"
          />
        </div>

        <div className="form-group">
          <span className="switch">
            <input
              type="checkbox"
              value={this.state.caterer}
              onChange={this.handleCheckboxChanges}
              className="switch"
              name="caterer"
              id="switch-normal"
            />
            <label htmlFor="switch-normal">Register as Caterer</label>
          </span>
        </div>

        <button className="btn btn-block btn-primary" type="submit">
          Create Account
        </button>
      </form>
    );
  }
}

SignUpForm.propTypes = {
  signUpUser: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    message: PropTypes.string.isRequired,
    status_code: PropTypes.number.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  auth: state.authReducer.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { signUpUser }
  )(SignUpForm)
);
