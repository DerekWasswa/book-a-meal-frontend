import React from "react";

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
      password: "",
      confirmPassword: "",
      caterer: false
    };

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
    const email = this.state.email;
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;
    const caterer = this.state.caterer;
    console.log(email);
    console.log(password);
    console.log(confirmPassword);
    console.log(caterer);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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
              onChange={this.handleInputChanges}
            />
            <label className="form-check-label" htmlFor="caterer">
              Caterer
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

export default SignUpForm;
