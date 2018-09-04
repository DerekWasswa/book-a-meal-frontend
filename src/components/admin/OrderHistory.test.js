import React from "react";
import { OrderHistory } from "./OrderHistory";
import { shallow } from "enzyme";
import configureStore from 'redux-mock-store'

describe("Caterer Order History Component", () => {

  let wrapper;
  let orders;
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
     }];

     getAllOrders = jest.fn()

    initialState = {
      orders: [{}]
    }

    store = mockStore(initialState)

  });



  it("renders vendors order history", () => {
    wrapper = shallow(<OrderHistory
      orders={orders}
      getAllOrders={getAllOrders}  />);
    expect(wrapper).toBeDefined();
  });


});
