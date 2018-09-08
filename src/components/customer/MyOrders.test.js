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
  let order;
  let menuMeals;
  let emptyOrders;
  let getAllCustomerOrders;
  const mockStore = configureStore()
  let store, initialState;

  let reset;
  let jwtDecode;
  let update = sinon.stub().resolves({success: true})

  beforeEach(() => {
    emptyOrders = [];

    menuMeals = [
      {
        meal_id: 1,
        meal: "Rolex",
        price: 4000
      },
      {
        meal_id: 2,
        meal: "Chicken",
        price: 10000
      },
      {
        meal_id: 3,
        meal: "Chicken",
        price: 10000
      }
    ];

    order = {
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
      expiration: Math.round(+new Date() / 1000).toString()
     };

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
      expiration: Math.round(+new Date() / 1000).toString()
     },
     {
      order_id: 2,
      meal: {
        meal_id: 1,
        meal: "Food",
        price: 10
      },
      menu: {
          menu_id: 2,
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
     },
     {
      order_id: 3,
      meal: {
        meal_id: 1,
        meal: "Food",
        price: 10
      },
      menu: {
          menu_id: 3,
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
      status: "Cancelled",
      expiration: Math.round(+new Date() / 1000).toString()
     },
     {
      order_id: 4,
      meal: {
        meal_id: 1,
        meal: "Food",
        price: 10
      },
      menu: {
          menu_id: 4,
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
      status: "Served",
      expiration: Math.round(+new Date() / 1000).toString()
     },
     {
      order_id: 5,
      meal: {
        meal_id: 1,
        meal: "Food",
        price: 10
      },
      menu: {
          menu_id: 5,
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
      status: "Served",
      expiration: Math.round(+new Date() / 1000).toString()
     }
    ];

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

    wrapper.find(Button).at(0).simulate('click', { preventDefault() {} }, 1 , 1, 1, menuMeals, order);
    wrapper.find(Button).at(1).simulate('click', { preventDefault() {} }, 1 , 1, 1, menuMeals, order);
    expect(wrapper.state('clickedOrder')).toEqual(1);
    expect(wrapper.state('clickedOrderMenu')).toEqual(1);
    expect(wrapper.state('clickedOrderMealID')).toEqual(1);
    expect(wrapper.state('clickedOrderMenuMeals')).toEqual([
      {"meal": "Rolex", "meal_id": 1, "price": 4000},
      {"meal": "Chicken", "meal_id": 2, "price": 10000}
    ]);
    expect(wrapper.state('order')).toEqual(order);
  })

  it("renders customers' orders", () => {

    // Set Data in the localstorage for tests
    spyOn(window.localStorage, 'getItem');
    spyOn(window.localStorage, 'removeItem');
    let mealJSON = {"mealId": 1, "meal": "Chicken", "price": 1000, "menuId": 1, "quantity": 1, "subtotal": 1000};
    var mealArray = [];
    mealArray.push(mealJSON);
    var stringMeals = JSON.stringify(mealArray);
    window.localStorage.setItem("meals", stringMeals);
    window.localStorage.setItem("expiration", 1526354000);

    wrapper = shallow(
      <MyOrders
        orders={orders}
        getAllCustomerOrders={getAllCustomerOrders} />);
    expect(wrapper).toBeDefined();
  });

});
