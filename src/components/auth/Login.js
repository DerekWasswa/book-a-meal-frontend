import React from "react";
import {Link} from 'react-router-dom';

/**
 * @export
 * @class Login
 * @extends {React.Component}
 */
export class Login extends React.Component {

  render() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card-group">
                    <div className="card p-4">
                        <div className="card-body">
                        <h1>Login</h1>
                        <p className="text-muted">Sign In to your account</p>
                        <div className="input-group mb-3">
                            <input class="form-control" type="email" placeholder="Email" />
                        </div>
                        <div className="input-group mb-4">
                            <input className="form-control" type="password" placeholder="Password" />
                        </div>
                        <div className="row">
                            <div className="col-6">
                            <button className="btn btn-primary px-4" type="button">Login</button>
                            </div>
                            <div className="col-6 text-right">
                            <button className="btn btn-link px-0" type="button">Forgot password?</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="card text-white bg-primary py-5 d-md-down-none">
                        <div className="card-body text-center">
                        <div>
                            <h2>Sign up</h2>
                            <p>Not registered yet. Create an account with Book A Meal</p>
                            <Link to="/register">
                                <button className="btn btn-primary active mt-3" type="button">Register Now!</button>
                            </Link>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
      );
  }
}


export default Login;
