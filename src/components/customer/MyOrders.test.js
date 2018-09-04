import React from "react";
import { MyOrders } from "./MyOrders";
import { shallow, mount } from "enzyme";
import configureStore from 'redux-mock-store'
import { Button } from "reactstrap";
import UserDashboard from "../dashboard/UserDashboard";
import Footer from "../dashboard/Footer";
import { Alerts } from "../utils/stateLess";
import { MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import jwtDecode from "jwt-decode";
import jwt from "jsonwebtoken";
import sinon from 'sinon';
jest.mock('jwt-decode')


describe("<MyOrders />", () => {

  let wrapper;
  let orders;
  let emptyOrders;
  let getAllCustomerOrders;
  const mockStore = configureStore()
  let store, initialState;

  let reset;
  let jwtDecode;
  let update = sinon.stub().resolves({success: true})

  beforeEach(() => {
    emptyOrders = [];

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
      status: "Not Served",
      expiration: "1535732626"
     }];

    getAllCustomerOrders = jest.fn()

    initialState = {
      orders: [{}]
    }
    store = mockStore(initialState)

    jwtDecode = sinon.spy();
    reset = sinon.spy();
  });


it("renders customers' orders", () => {
  wrapper = shallow(
    <MyOrders
      orders={orders}
      getAllCustomerOrders={getAllCustomerOrders} />);
  expect(wrapper).toBeDefined();
});


  it('calls the `children` components', ()=>{
    let update = sinon.stub().resolves({success: true})
    let wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <MyOrders
              update
              jwtDecode
              orders={orders}
              getAllCustomerOrders={getAllCustomerOrders}
              reset  />
          </MemoryRouter>
        </Provider>
    );

    var stub = sinon.stub(window.localStorage, "getItem");
    stub.returns({ admin: true, user_id: 1, name: "bkMealUser" });

    expect(wrapper.find(UserDashboard).length).toEqual(1);
    expect(wrapper.find(Footer).length).toEqual(1);
    expect(wrapper.find(Alerts).length).toEqual(0);
    expect(getAllCustomerOrders).toHaveBeenCalled();
    expect(jwtDecode).toBe(jwtDecode);
  });

  it('calls the `Alerts` components', ()=>{
    let update = sinon.stub().resolves({success: true})

    let wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <MyOrders
            update
            jwtDecode
            orders={emptyOrders}
            getAllCustomerOrders={getAllCustomerOrders}
            reset  />
        </MemoryRouter>
      </Provider>
  );

    expect(wrapper.find(Alerts).length).toEqual(1);
  });

  it('calls `handleOrderEditionClicks` when order edition button is clicked', ()=>{

    wrapper = shallow(
      <MyOrders
        orders={orders}
        getAllCustomerOrders={getAllCustomerOrders} />
    );

    wrapper.find(Button).at(0).simulate('click', { preventDefault() {} });
    expect(wrapper.state('clickedOrder')).toEqual(0);
    expect(wrapper.state('clickedOrderMenu')).toEqual(0);
    expect(wrapper.state('clickedOrderMealID')).toEqual(0);
    expect(wrapper.state('clickedOrderMenuMeals')).toEqual([{}]);
    expect(wrapper.state('order')).toEqual({});
  })


});
