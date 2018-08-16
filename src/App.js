import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Meals from "./components/admin/ManageMeal";
import OrderHistory from "./components/admin/OrderHistory";
import Orders from "./components/admin/Orders";
import Menu from "./components/admin/CatererMenu";
import MenuCustomer from "./components/customer/Menu";
import CustomerOrders from "./components/customer/MyOrders";
import CustomerOrderHistory from "./components/customer/MyOrderHistory";
import LandingPage from "./components/landingpage/LandingPage";
import Notifications from "react-notify-toast";

class App extends Component {
  render() {
    return (
      <div>
        <Notifications />
        <Router>
          <div>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Signup} />
            <Route exact path="/meals" component={Meals} />
            <Route exact path="/vendor/menu" component={Menu} />
            <Route exact path="/orders" component={Orders} />
            <Route exact path="/orderhistory" component={OrderHistory} />
            <Route exact path="/c-menu" component={MenuCustomer} />
            <Route exact path="/c-orders" component={CustomerOrders} />
            <Route
              exact
              path="/c-order-history"
              component={CustomerOrderHistory}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
