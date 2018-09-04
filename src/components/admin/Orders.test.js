import React from "react";
import { Orders } from "./Orders";
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from "enzyme";
import { ModalHeader, Alerts } from "../utils/stateLess";
import CatererDashboard from "../dashboard/CatererDashboard";
import Footer from "../dashboard/Footer";
import { Provider } from "react-redux";
import sinon from 'sinon';
import notify from "react-notify-toast";
jest.mock('react-notify-toast')
import configureStore from 'redux-mock-store'

describe("<Orders />", () => {

  let wrapper;
  let orders;
  let emptyOrders;
  let getAllOrders;
  let serveOrder;
  const mockStore = configureStore()
  let store, initialState;
  let reset;
  let notify;
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
          contact: "test@gmail.com"
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

     getAllOrders = jest.fn()
     serveOrder = jest.fn()

    initialState = {
      orders: [{}]
    }

    notify = {
      show: sinon.spy()
    }
    reset = sinon.spy()

    store = mockStore(initialState)

  });


  it("renders vendors orders from customers", () => {
    wrapper = shallow(
      <Orders
        orders={orders}
        getAllOrders={getAllOrders}
        serveOrder={serveOrder}  />);
    expect(wrapper).toBeDefined();
  });

  it('calls the `children` components', ()=>{
    let wrapper = mount(
      <MemoryRouter>
        <Provider store={store}>
            <Orders
              orders={orders}
              getAllOrders={getAllOrders}
              serveOrder={serveOrder}  />
        </Provider>
      </MemoryRouter>);

    expect(wrapper.find(Footer).length).toEqual(1);
    expect(wrapper.find(ModalHeader).length).toEqual(1);
    expect(wrapper.find(Alerts).length).toEqual(0);
    expect(wrapper.find(CatererDashboard).length).toEqual(1);
  });

  it('calls the `Alerts` components', ()=>{
    let wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <Orders
              orders={emptyOrders}
              getAllOrders={getAllOrders}
              serveOrder={serveOrder}  />
          </MemoryRouter>
        </Provider>
    );

    expect(wrapper.find(Alerts).length).toEqual(1);
  });


  it('calls `serveCustomerOrder` when serve button is clicked', ()=>{
    let serveOrder = jest.fn()
    let update = sinon.stub().resolves({success: true})

    wrapper = shallow(
      <Orders
        update
        notify
        orders={orders}
        getAllOrders={getAllOrders}
        serveOrder={serveOrder}
        reset />
    );

    wrapper.find("button").at(0).simulate('click', { target: {dataset: {param: 1}}, preventDefault() {} });
    wrapper.find("button").at(1).simulate('click', {target: {dataset: {param: 2}}, preventDefault() {} });
    expect(serveOrder).toBeCalled();
    expect(notify.show).toBe(notify.show);
  })

});
