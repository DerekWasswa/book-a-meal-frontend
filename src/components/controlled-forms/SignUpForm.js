import React from "react";
import { signUpUser } from "../../actions/authentication";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

/**
 * @export
 * @class SignUpForm
 * @extends {React.Component}
 */
class SignUpForm extends React.Component {
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
    let response = this.props.signUpUser(JSON.stringify(data));
    console.log(response);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-group mb-3">
          <input
            className="form-control"
            name="username"
            type="text"
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
            value={this.state.confirmPassword}
            onChange={this.handleInputChanges}
            placeholder="Repeat password"
          />
        </div>

        <div className="form-group">
          <div className="form-check form-check-inline mr-1">
            <input
              className="form-check-input"
              id="caterer"
              name="caterer"
              type="checkbox"
              value={this.state.caterer}
              onChange={this.handleCheckboxChanges}
            />
            <label className="form-check-label" htmlFor="caterer">
              Register Caterer
            </label>
          </div>
        </div>

        <button className="btn btn-block btn-primary" type="submit">
          Create Account
        </button>
      </form>
    );
  }
}

SignUpForm.propTypes = {
  signUpUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default withRouter(
  connect(
    mapStateToProps,
    { signUpUser }
  )(SignUpForm)
);
