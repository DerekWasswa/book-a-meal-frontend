import React from "react";

/**
 * @export
 * @class LoginForm
 * @extends {React.Component}
 */
export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };

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
    console.log(email);
    console.log(password);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-group mb-3">
          <input
            name="email"
            className="form-control"
            type="email"
            value={this.state.email}
            onChange={this.handleInputChanges}
            placeholder="Email"
          />
        </div>
        <div className="input-group mb-4">
          <input
            name="password"
            className="form-control"
            type="password"
            value={this.state.password}
            onChange={this.handleInputChanges}
            placeholder="Password"
          />
        </div>
        <div className="row">
          <div className="col-6">
            <button className="btn btn-primary px-4" type="submit">
              Login
            </button>
          </div>
          <div className="col-6 text-right">
            <button className="btn btn-link px-0" type="button">
              Forgot password?
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default LoginForm;
