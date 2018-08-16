import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import LoginForm from "../controlled-forms/LoginForm";

/**
 * @export
 * @class Login
 * @extends {React.Component}
 */
export class Login extends React.Component {
  render() {
    return (
      <div>
        <Header />

        <div className="wrapper-content ">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="card-group">
                  <div className="card p-4">
                    <div className="card-body">
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <LoginForm />
                    </div>
                  </div>
                  <div className="card text-white bg-primary py-5 d-md-down-none">
                    <div className="card-body text-center">
                      <div>
                        <h2>Sign up</h2>
                        <p>
                          Not registered yet. Create an account with Book A Meal
                        </p>
                        <Link to="/register">
                          <button
                            className="btn btn-primary active mt-3"
                            type="button"
                          >
                            Register Now!
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Login;
