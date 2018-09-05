import React from "react";
import { loginUser } from "../../actions/authentication";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { LoginButtons } from "../utils/stateLess";

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

  componentWillReceiveProps(loginStatus) {
    if (loginStatus.auth.admin) {
      this.props.history.push("/meals");
    } else {
      this.props.history.push("/c-menu");
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(JSON.stringify(data));
  }

  render() {
    const { auth } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-group mb-3">
          <input
            name="email"
            className="form-control"
            type="email"
            required={true}
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

        <LoginButtons
          loginClass={"btn btn-primary px-4"}
          forgotPassClass={"btn btn-link px-0"}
          loginBtnType={"submit"}
          required={true}
          forgotPassBtnType={"button"}
          login={"Login"}
          forgotpassword={"Forgot password?"}
        />
      </form>
    );
  }
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    admin: PropTypes.bool.isRequired,
    logInStatus: PropTypes.bool.isRequired,
    user_id: PropTypes.number.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  auth: state.authReducer.auth
});
export default withRouter(
  connect(
    mapStateToProps,
    { loginUser }
  )(LoginForm)
);
