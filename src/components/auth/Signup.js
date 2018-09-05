import React from "react";
import { Link } from "react-router-dom";
import SignUpForm from "../controlled-forms/SignUpForm";

/**
 * @export
 * @class Signup
 * @extends {React.Component}
 */
export class Signup extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mx-4">
              <div className="card-body p-4">
                <h1>Register</h1>
                <p className="text-muted">Create your account</p>
                <SignUpForm />
                <div className="text-center">
                  <Link to="/">
                    <button className="btn btn-link px-0" type="button">
                      Already Registered? Login
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
