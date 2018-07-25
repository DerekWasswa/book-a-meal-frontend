import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Meals from "./components/admin/ManageMeal";
import OrderHistory from "./components/admin/OrderHistory";
import Orders from "./components/admin/Orders";
import Menu from "./components/admin/CatererMenu";
import MenuCustomer from "./components/customer/Menu";
import CustomerOrders from "./components/customer/MyOrders";
import CustomerOrderHistory from "./components/customer/MyOrderHistory";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Router>
          <div className="wrapper-content">
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Signup} />
            <Route exact path="/meals" component={Meals} />
            <Route exact path="/menu" component={Menu} />
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
        <Footer />
      </div>
    );
  }
}

export default App;
