import React from "react";
import { ManageMeals } from "./ManageMeal";
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from "enzyme";
import configureStore from 'redux-mock-store'
import { Provider } from "react-redux";
import { Button } from "reactstrap";
import AddMealForm from "../controlled-forms/AddMealForm";
import UpdateMealForm from "../controlled-forms/UpdateMealForm";
import SetMenuForm from "../controlled-forms/SetMenuForm";
import DeleteMeal from "../controlled-forms/DeleteMeal";
import { ModalHeader, Alerts } from "../utils/stateLess";
import Footer from "../dashboard/Footer";

describe("<ManageMeal />", () => {

  let getAllMeals;
  let meals, newMeals;
  let orders;
  let expectedMeals;
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

    newMeals = {
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
        },
        {
          meal_id: 3,
          meal: "Chickens",
          price: 12000
        }
      ]
    };

    expectedMeals = [
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
        price: 12000
      }
    ];
    getAllMeals = jest.fn();
    getAllOrders = jest.fn();

    initialState = {
      meal: {
        meal_id: 0,
        meal: "",
        price: 0
      }
    }

    store = mockStore(initialState)

  });

  it("renders Manage meals dashboard", () => {
    let wrapper = shallow(
      <ManageMeals
        meals={meals}
        orders={orders}
        getAllOrders={getAllOrders}
        getAllMeals={getAllMeals} />);
    expect(wrapper).toBeDefined();
    expect(getAllMeals).toHaveBeenCalled();
    expect(getAllOrders).toHaveBeenCalled();
    expect(getAllMeals.mock.calls[0]).toEqual([])
  });

  it('calls the `component will receive props` function', ()=>{
    let wrapper = shallow(
      <ManageMeals
        store={store}
        meals={meals}
        orders={orders}
        getAllOrders={getAllOrders}
        getAllMeals={getAllMeals} />);

    // triggers componentWillReceiveProps
    wrapper.setProps(newMeals);
    expect(wrapper).toBeDefined();
    expect(wrapper.state('meals')).toEqual(expectedMeals);
  });

  it('calls the `children` components', ()=>{
    let wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <ManageMeals
              meals={meals}
              orders={orders}
              getAllOrders={getAllOrders}
              getAllMeals={getAllMeals} />
          </MemoryRouter>
        </Provider>
    );
    wrapper.setProps(newMeals);

    expect(wrapper.find(AddMealForm).length).toEqual(1);
    expect(wrapper.find(DeleteMeal).length).toEqual(1);
    expect(wrapper.find(SetMenuForm).length).toEqual(1);
    expect(wrapper.find(UpdateMealForm).length).toEqual(1);
    expect(wrapper.find(ModalHeader).length).toEqual(4);
    expect(wrapper.find(Alerts).length).toEqual(1);
    expect(wrapper.find(Footer).length).toEqual(1);
  });

  it('handle handleMealEditionClicks is called', ()=>{
    let wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ManageMeals
            meals={meals}
            orders={orders}
            getAllOrders={getAllOrders}
            getAllMeals={getAllMeals} />
        </MemoryRouter>
      </Provider>
    );

    let button = wrapper.find(Button).at(0)
    button.simulate('click', {target: {dataset: {param: 1}}});
  })

});
