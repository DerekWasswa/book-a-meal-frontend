import React from "react";
import { Menu } from "./Menu";
import { shallow, mount } from "enzyme";
import UserDashboard from "../dashboard/UserDashboard";
import Footer from "../dashboard/Footer";
import { Button } from "reactstrap";
import { Alerts } from "../utils/stateLess";
import { MemoryRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import sinon from 'sinon';
import notify from "react-notify-toast";
jest.mock('react-notify-toast')
import configureStore from 'redux-mock-store'

describe("<Menu />", () => {

  let wrapper;
  let menus;
  let emptyMenus;
  let makeOrderFromMenu;
  let getMenus;
  const mockStore = configureStore()
  let store, initialState;
  let reset;
  let notify;
  let update = sinon.stub().resolves({success: true})

  beforeEach(() => {

    emptyMenus = [];

    menus = [{
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
     {
      menu_id: 2,
      name: "Special Tuesday",
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
     }
    ];

    makeOrderFromMenu = jest.fn()
    getMenus = jest.fn()

    initialState = {
      menu: {
        menu_id: 0,
        name: "",
        description: "",
        date: "",
        vendor: "",
        contact: "",
        meals: [{}]
      }
    }

    notify = {
      show: sinon.spy()
    }
    reset = sinon.spy()

    store = mockStore(initialState)

  });

  afterEach(() => {
    // Set Data in the localstorage for tests
    spyOn(window.localStorage, 'removeItem');
    window.localStorage.removeItem("meals");
    window.localStorage.removeItem("expiration");
  })

  it("renders menu of day to customers", () => {
    wrapper = shallow(
      <Menu
      menus={menus}
      makeOrderFromMenu={makeOrderFromMenu}
      getMenus={getMenus} />
    );
    expect(wrapper).toBeDefined();
  });


  it('calls the `children` components', ()=>{
    let wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <Menu
              menus={menus}
              makeOrderFromMenu={makeOrderFromMenu}
              getMenus={getMenus} />
          </MemoryRouter>
        </Provider>
    );

    expect(wrapper.find(UserDashboard).length).toEqual(1);
    expect(wrapper.find(Footer).length).toEqual(1);
    expect(wrapper.find(Alerts).length).toEqual(0);
  });

  it('calls the `Alerts` components', ()=>{
    let wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <Menu
              menus={emptyMenus}
              makeOrderFromMenu={makeOrderFromMenu}
              getMenus={getMenus} />
          </MemoryRouter>
        </Provider>
    );

    expect(wrapper.find(Alerts).length).toEqual(1);
  });

  it('calls `handlePlaceOrder` when place order button is clicked', ()=>{
    let makeOrderFromMenu = jest.fn()
    let update = sinon.stub().resolves({success: true})

    wrapper = shallow(
      <Menu
        update
        notify
        menus={menus}
        makeOrderFromMenu={makeOrderFromMenu}
        getMenus={getMenus}
        reset />
    );

    wrapper.find(Button).at(0).simulate('click', { target: {dataset: {mealid: 1, menuid: 1}}, preventDefault() {} });
    wrapper.find(Button).at(1).simulate('click', {target: {dataset: {mealid: 1, menuid: 1}}, preventDefault() {} });
    expect(makeOrderFromMenu).toBeCalled();
    expect(notify.show).toBe(notify.show);
  });


  it('calls `handleAddToCart` when cart button is clicked', ()=>{
    let makeOrderFromMenu = jest.fn()
    let update = sinon.stub().resolves({success: true})

    // Set Data in the localstorage for tests
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
      <Menu
        update
        notify
        menus={menus}
        makeOrderFromMenu={makeOrderFromMenu}
        getMenus={getMenus}
        reset />
    );
    wrapper.find(Button).at(7).simulate('click', { preventDefault() {} }, 1 , "Chicken", 10000, 1);
    wrapper.find(Button).at(7).simulate('click', { preventDefault() {} }, 2 , "Chicken", 10000, 1);

    expect(wrapper.state('cart')).toEqual(1);
    expect(notify.show).toBe(notify.show);
  });

});
