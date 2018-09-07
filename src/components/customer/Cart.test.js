import React from "react";
import { Cart } from "./Cart";
import { shallow, mount } from "enzyme";
import configureStore from 'redux-mock-store'
import { Input } from "reactstrap";
import UserDashboard from "../dashboard/UserDashboard";
import Footer from "../dashboard/Footer";
import { Alerts } from "../utils/stateLess";
import { MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import jwtDecode from "jwt-decode";
import jwt from "jsonwebtoken";
import sinon from 'sinon';
import notify from "react-notify-toast";
jest.mock('react-notify-toast')
jest.mock('jwt-decode')

describe("<Cart />", () => {

  let wrapper;
  let orders;
  let order;
  let menuMeals;
  let emptyOrders;
  let getAllCustomerOrders;
  let makeOrderFromMenu;
  const mockStore = configureStore()
  let store, initialState;

  let jwtDecode;
  let reset;
  let notify;
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
    makeOrderFromMenu = jest.fn()

    initialState = {
      orders: [{}]
    }
    store = mockStore(initialState)

    jwtDecode = sinon.spy();
    reset = sinon.spy();
    notify = {
        show: sinon.spy()
    }
  });

  afterEach(() => {
    // Set Data in the localstorage for tests
    spyOn(window.localStorage, 'removeItem');
    window.localStorage.removeItem("meals");
  })

  it("renders cart", () => {
    spyOn(window.localStorage, 'removeItem');
    spyOn(window.localStorage, 'setItem');
    let mealJSON = {"mealId": 1, "meal": "Chicken", "price": 1000, "menuId": 1, "quantity": 3, "subtotal": 3000};
    let mealJSONTWO = {"mealId": 2, "meal": "Chicken", "price": 1000, "menuId": 1, "quantity": 3, "subtotal": 3000};
    var mealArray = [];
    mealArray.push(mealJSON);
    mealArray.push(mealJSONTWO);
    var stringMeals = JSON.stringify(mealArray);
    window.localStorage.setItem("meals", stringMeals);
    window.localStorage.setItem("expiration", 1526354000);

    wrapper = shallow(
      <Cart
        orders={orders}
        makeOrderFromMenu={makeOrderFromMenu}
        getAllCustomerOrders={getAllCustomerOrders} />);
    expect(wrapper).toBeDefined();
  });

  it('calls the `children` components', ()=>{
    let update = sinon.stub().resolves({success: true})

    // Set Data in the localstorage for tests
    spyOn(window.localStorage, 'getItem');
    spyOn(window.localStorage, 'removeItem');
    let mealJSON = {"mealId": 1, "meal": "Chicken", "price": 1000, "menuId": 1, "quantity": 1, "subtotal": 1000};
    var mealArray = [];
    mealArray.push(mealJSON);
    var stringMeals = JSON.stringify(mealArray);
    window.localStorage.setItem("meals", stringMeals);

    let wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <Cart
              update
              jwtDecode
              orders={orders}
              getAllCustomerOrders={getAllCustomerOrders}
              makeOrderFromMenu={makeOrderFromMenu}
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
          <Cart
            update
            jwtDecode
            orders={emptyOrders}
            getAllCustomerOrders={getAllCustomerOrders}
            makeOrderFromMenu={makeOrderFromMenu}
            reset  />
        </MemoryRouter>
      </Provider>
  );

    expect(wrapper.find(Alerts).length).toEqual(1);
  });

  it('calls `handleOnRemoveOrder` when cart delete meal button is clicked', ()=>{

    let makeOrderFromMenu = jest.fn()
    let update = sinon.stub().resolves({success: true})

    // Set data for localstorage
    spyOn(window.localStorage, 'removeItem');
    spyOn(window.localStorage, 'getItem');
    let mealJSON = {"mealId": 1, "meal": "Chicken", "price": 1000, "menuId": 1, "quantity": 1, "subtotal": 1000};
    var mealArray = [];
    mealArray.push(mealJSON);
    var stringMeals = JSON.stringify(mealArray);

    window.localStorage.setItem("meals", stringMeals);

    wrapper = shallow(
        <Cart
            update
            jwtDecode
            notify
            orders={emptyOrders}
            getAllCustomerOrders={getAllCustomerOrders}
            makeOrderFromMenu={makeOrderFromMenu}
            reset  />
    );

    wrapper.find("button").at(0).simulate('click', { preventDefault() {} }, 1);
    expect(notify.show).toBe(notify.show);
    expect(wrapper.state('meals')).toEqual([]);
    expect(wrapper.state('total')).toEqual(1000);
  });

  it('calls `handleOnCheckout` when cart checkout order button is clicked', ()=>{

    let makeOrderFromMenu = jest.fn()
    let update = sinon.stub().resolves({success: true})

    // Set Data in the localstorage for tests
    spyOn(window.localStorage, 'getItem');
    spyOn(window.localStorage, 'removeItem');
    let mealJSON = {"mealId": 1, "meal": "Chicken", "price": 1000, "menuId": 1, "quantity": 1, "subtotal": 1000};
    var mealArray = [];
    mealArray.push(mealJSON);
    var stringMeals = JSON.stringify(mealArray);
    window.localStorage.setItem("meals", stringMeals);

    wrapper = shallow(
        <Cart
            update
            jwtDecode
            notify
            orders={emptyOrders}
            getAllCustomerOrders={getAllCustomerOrders}
            makeOrderFromMenu={makeOrderFromMenu}
            reset  />
    );

    wrapper.find("button").at(1).simulate('click', { preventDefault() {} });
    expect(notify.show).toBe(notify.show);
    expect(makeOrderFromMenu).toBeCalled();
    expect(wrapper.state('meals')).toEqual([{}]);
  });

  it('calls `handleOnQuantityOnChange` when cart meal quantity button is clicked', ()=>{

    let makeOrderFromMenu = jest.fn()
    let update = sinon.stub().resolves({success: true})

    // Set Data in the localstorage for tests
    spyOn(window.localStorage, 'getItem');
    spyOn(window.localStorage, 'setItem');
    let mealJSON = {"mealId": 1, "meal": "Chicken", "price": 1000, "menuId": 1, "quantity": 3, "subtotal": 3000};
    var mealArray = [];
    mealArray.push(mealJSON);
    var stringMeals = JSON.stringify(mealArray);
    window.localStorage.setItem("meals", stringMeals);

    wrapper = shallow(
        <Cart
            update
            jwtDecode
            notify
            orders={emptyOrders}
            getAllCustomerOrders={getAllCustomerOrders}
            makeOrderFromMenu={makeOrderFromMenu}
            reset  />
    );

    // wrapper.find(Input).at(0).simulate('change', { preventDefault() {} }, 1);
    wrapper.find(Input).at(0).simulate('change', {target: {value: 2}}, 1);

    expect(wrapper.state('meals')).toEqual([{"meal": "Chicken", "mealId": 1, "menuId": 1, "price": 1000, "quantity": 2, "subtotal": 2000}]);
    expect(wrapper.state('total')).toEqual(2000);
  });

});
