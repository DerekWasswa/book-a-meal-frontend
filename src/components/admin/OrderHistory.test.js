import React from "react";
import { OrderHistory } from "./OrderHistory";
import { shallow, mount } from "enzyme";
import configureStore from 'redux-mock-store'
import CatererDashboard from "../dashboard/CatererDashboard";
import { Alerts, OrderHistoryStatusData } from "../utils/stateLess";
import Footer from "../dashboard/Footer";
import { MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import jwtDecode from "jwt-decode";
import jwt from "jsonwebtoken";
import sinon from 'sinon';
jest.mock('jwt-decode')

describe("Caterer Order History Component", () => {

  let wrapper;
  let orders;
  let getAllOrders;
  const mockStore = configureStore()
  let store, initialState;

  let reset;
  let jwtDecode;
  let update = sinon.stub().resolves({success: true})

  beforeEach(() => {
    orders = [{
      order_id: 1,
      meal: {
        meal_id: 1,
        meal: "Food",
        price: 10
      },
      menu: {
          menu_id: 1,
          name: "Special Sunday",
          contact: "test@gmail.com",
          description: "Come dine with us",
          date: "2018-08-30",
          meals: [
            {
              meal_id: 1,
              meal: "Rolex",
              price: 4000
            },
            {
              meal_id: 2,
              meal: "Chicken",
              price: 10000
            }
          ]
      },
      user: "test@test.com",
      date: "2018-09-03",
      status: "Not Served"
     },
     {
      order_id: 2,
      meal: {
        meal_id: 2,
        meal: "Chicken",
        price: 10000
      },
      menu: {
          menu_id: 1,
          name: "Special Sunday",
          contact: "test@gmail.com",
          description: "Come dine with us",
          date: "2018-08-30",
          meals: [
            {
              meal_id: 1,
              meal: "Rolex",
              price: 4000
            },
            {
              meal_id: 2,
              meal: "Chicken",
              price: 10000
            }
          ]
      },
      user: "test@test.com",
      date: "2018-09-03",
      status: "Served"
     },
     {
      order_id: 3,
      meal: {
        meal_id: 2,
        meal: "Chicken",
        price: 10000
      },
      menu: {
          menu_id: 1,
          name: "Special Sunday",
          contact: "test@gmail.com",
          description: "Come dine with us",
          date: "2018-08-30",
          meals: [
            {
              meal_id: 1,
              meal: "Rolex",
              price: 4000
            },
            {
              meal_id: 2,
              meal: "Chicken",
              price: 10000
            }
          ]
      },
      user: "test@test.com",
      date: "2018-09-03",
      status: "Cancelled"
     }];

     getAllOrders = jest.fn()

    initialState = {
      orders: [{}]
    }

    store = mockStore(initialState)

    jwtDecode = sinon.spy();
    reset = sinon.spy();
  });



  it("renders vendors order history", () => {
    wrapper = shallow(<OrderHistory
      orders={orders}
      getAllOrders={getAllOrders}  />);
    expect(wrapper).toBeDefined();
  });

  it('calls the `children` components', ()=>{
    let update = sinon.stub().resolves({success: true})
    let getAllOrders = jest.fn()

    let wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <OrderHistory
              update
              jwtDecode
              getAllOrders={getAllOrders}
              orders={orders}
              reset  />
          </MemoryRouter>
        </Provider>
    );

    var stub = sinon.stub(window.localStorage, "getItem");
    stub.returns({ admin: true, user_id: 1, name: "bkMealUser" });

    expect(wrapper.find(CatererDashboard).length).toEqual(1);
    expect(wrapper.find(Footer).length).toEqual(1);
    expect(wrapper.find(OrderHistoryStatusData).length).toEqual(3);
    expect(wrapper.find(Alerts).length).toEqual(0);
    expect(getAllOrders).toHaveBeenCalled();
    expect(jwtDecode).toBe(jwtDecode);
  });
});
