import React from "react";
import {Link} from 'react-router-dom';

/**
 * @export
 * @class Signup
 * @extends {React.Component}
 */
export class Signup extends React.Component {

  render() {
    return (
        <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="card mx-4">
              <div class="card-body p-4">
                <h1>Register</h1>
                <p class="text-muted">Create your account</p>
                <div class="input-group mb-3">
                  <input class="form-control" type="email" placeholder="Email" />
                </div>
                <div class="input-group mb-3">
                  <input class="form-control" type="password" placeholder="Password" />
                </div>
                <div class="input-group mb-4">
                  <input class="form-control" type="password" placeholder="Repeat password" />
                </div>

                <div class="form-group">
                  <div class="form-check form-check-inline mr-1">
                    <input class="form-check-input" id="inline-checkbox1" type="checkbox" value="check1" />
                    <label class="form-check-label" for="inline-checkbox1">Caterer</label>
                  </div>
                </div>

                <button class="btn btn-block btn-primary" type="button">Create Account</button>
                <div className="text-center">
                  <Link to="/">
                    <button className="btn btn-link px-0" type="button">Already Registered? Login</button>
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
