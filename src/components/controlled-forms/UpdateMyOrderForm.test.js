import React from "react";
import { UpdateMyOrderForm } from "./UpdateMyOrderForm";
import { Form } from "reactstrap";
import { shallow, mount } from "enzyme";
import notify from "react-notify-toast";
jest.mock('react-notify-toast')

describe("<UpdateMealForm />", () => {

  let wrapper;
  let updateOrder;
  let meals, orderIDClicked, orderMenuID, orderMealID, orderMenuMeals, order;
  let store, initialState;

  beforeEach(() => {
    updateOrder = jest.fn()

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
      },
      {
        meal_id: 3,
        meal: "Chickens",
        price: 10000
      }
    ];
    orderIDClicked = 1
    orderMenuID = 1
    orderMealID = 1
    orderMenuMeals = [
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
      status: "Not Served"
    }

  });

  it("renders update my order form", () => {
    wrapper = shallow(
      <UpdateMyOrderForm
        meals={meals}
        order={order}
        orderIDClicked={orderIDClicked}
        orderMenuID={orderMenuID}
        orderMealID={orderMealID}
        orderMenuMeals={orderMenuMeals}
        updateOrder={updateOrder} />);
    expect(wrapper).toBeDefined();
  });

  it('handle changes of the form fields', ()=>{
    wrapper = mount(
      <UpdateMyOrderForm
        meals={meals}
        order={order}
        orderIDClicked={orderIDClicked}
        orderMenuID={orderMenuID}
        orderMealID={orderMealID}
        orderMenuMeals={orderMenuMeals}
        updateOrder={updateOrder} />);

    let updatingOrder = wrapper.find('input[name="order"]').at(1)
    updatingOrder.simulate('change', {target: {name: "order",value: 2}});

    expect(wrapper.state('orderMealID')).toBe(2);
  });


  it('handle submit is called', ()=>{
    const props = {
      updateMeal: jest.fn()
    };

    wrapper = mount(
      <UpdateMyOrderForm
        meals={meals}
        order={order}
        orderIDClicked={orderIDClicked}
        orderMenuID={orderMenuID}
        orderMealID={orderMealID}
        orderMenuMeals={orderMenuMeals}
        updateOrder={updateOrder} />);

    let form = wrapper.find(Form)
    form.simulate('submit')
    expect(updateOrder).toBeCalled();
    expect(notify.show).toBe(notify.show);
  })

});
