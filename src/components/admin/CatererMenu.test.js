import React from "react";
import { MemoryRouter } from 'react-router-dom';
import { CatererMenu } from "./CatererMenu";
import { shallow, mount } from "enzyme";
import configureStore from 'redux-mock-store'
import { ModalHeader, Alerts, CatererMenuTabs, CatererMenuDetails } from "../utils/stateLess";
import { Button } from "reactstrap";
import CatererDashboard from "../dashboard/CatererDashboard";
import Footer from "../dashboard/Footer";
import EditMenuForm from "../controlled-forms/EditMenuForm";
import { Provider } from "react-redux";

describe("<CatererMenu />", () => {

  let wrapper;
  let menus;
  let orders;
  let menuEdit;
  let emptyMenu;
  let meals;
  let getVendorMenus;
  let getAllMeals;
  let deleteMealOffTheMenu;
  let getAllOrders;
  const mockStore = configureStore()
  let store, initialState;

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
          meals: [
            {
              meal_id: 1,
              meal: "Food",
              price: 10
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
        meal_id: 1,
        meal: "Food",
        price: 10
      },
      menu: {
          menu_id: 2,
          name: "Special Sunday",
          contact: "test@gmail.com"
      },
      user: "test@test.com",
      date: "2018-09-03",
      status: "Served"
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
          contact: "test@gmail.com"
      },
      user: "test@test.com",
      date: "2018-09-03",
      status: "Cancelled"
     }
    ];

    emptyMenu = [];
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
     }];

    menuEdit = {
      "contact": "test@gmail.com",
      "date": "2018-08-30",
      "description": "Come dine with us",
      "meals": [
        {
          "meal": "Rolex",
          "meal_id": 1,
          "price": 4000},
      {
        "meal": "Chicken",
        "meal_id": 2,
        "price": 10000}
      ],
      "menu_id": 1,
      "name": "Special Sunday"
    }

    meals = [
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
    ];

    getVendorMenus = jest.fn()
    getAllMeals = jest.fn()
    deleteMealOffTheMenu = jest.fn()
    getAllOrders = jest.fn()

    initialState = {
      menu: {
        menu_id: 0,
        name: "",
        description: "",
        date: "",
        vendor: "",
        contact: "",
        meals: [{}]
      },
      menus: [],
      caterer_menus: []
    }

    store = mockStore(initialState)

  });




  it("renders caterer menu", () => {
    wrapper = shallow(<CatererMenu
      menus={menus}
      meals={meals}
      orders={orders}
      getAllMeals={getAllMeals}
      getVendorMenus={getVendorMenus}
      getAllOrders={getAllOrders}
      deleteMealOffTheMenu={deleteMealOffTheMenu} />);
    expect(wrapper).toBeDefined();
    expect(getAllMeals).toHaveBeenCalled();
    expect(getVendorMenus).toHaveBeenCalled();
    expect(getAllOrders).toHaveBeenCalled();
  });

  it('calls the `children` components', ()=>{
    let wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <CatererMenu
              menus={menus}
              meals={meals}
              orders={orders}
              getAllOrders={getAllOrders}
              getAllMeals={getAllMeals}
              getVendorMenus={getVendorMenus}
              deleteMealOffTheMenu={deleteMealOffTheMenu} />
          </MemoryRouter>
        </Provider>
    );

    expect(wrapper.find(EditMenuForm).length).toEqual(1);
    expect(wrapper.find(Footer).length).toEqual(1);
    expect(wrapper.find(ModalHeader).length).toEqual(1);
    expect(wrapper.find(Alerts).length).toEqual(0);
    expect(wrapper.find(CatererDashboard).length).toEqual(1);
    expect(wrapper.find(CatererMenuTabs).length).toEqual(1);
    expect(wrapper.find(CatererMenuDetails).length).toEqual(1);
  });

  it('calls the `Alerts` components', ()=>{
    let wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <CatererMenu
              menus={emptyMenu}
              meals={meals}
              orders={orders}
              getAllOrders={getAllOrders}
              getAllMeals={getAllMeals}
              getVendorMenus={getVendorMenus}
              deleteMealOffTheMenu={deleteMealOffTheMenu} />
          </MemoryRouter>
        </Provider>
    );

    expect(wrapper.find(Alerts).length).toEqual(1);
  });

  it('calls `handleDeleteMealOffMenu` when deletion button is clicked', ()=>{
    let deleteMealOffTheMenu = jest.fn()

    wrapper = shallow(<CatererMenu
      menus={menus}
      meals={meals}
      orders={orders}
      getAllOrders={getAllOrders}
      getAllMeals={getAllMeals}
      getVendorMenus={getVendorMenus}
      deleteMealOffTheMenu={deleteMealOffTheMenu} />);

    wrapper.find(Button).at(0).simulate('click', { preventDefault() {} });
    wrapper.find(Button).at(1).simulate('click', { preventDefault() {} });
    wrapper.find(Button).at(2).simulate('click', { preventDefault() {} });
    expect(deleteMealOffTheMenu).toBeCalled();
  })

  it('calls `handleMenuEditClick` when menu edition button is clicked', ()=>{
    let deleteMealOffTheMenu = jest.fn()

    wrapper = shallow(<CatererMenu
      menus={menus}
      meals={meals}
      orders={orders}
      getAllOrders={getAllOrders}
      getAllMeals={getAllMeals}
      getVendorMenus={getVendorMenus}
      deleteMealOffTheMenu={deleteMealOffTheMenu} />);

    wrapper.find(Button).at(0).simulate('click', { preventDefault() {} });
    wrapper.find(Button).at(1).simulate('click', { preventDefault() {} });
    wrapper.find(Button).at(2).simulate('click', { preventDefault() {} });
    expect(wrapper.state('menuToEdit')).toEqual(menuEdit);
  })

});
