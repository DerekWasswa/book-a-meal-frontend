import React from "react";
import { EditMenuForm } from "./EditMenuForm";
import { shallow, mount } from "enzyme";
import configureStore from 'redux-mock-store'
import notify from "react-notify-toast";
jest.mock('react-notify-toast')

describe("<EditMenuForm />", () => {

  let wrapper;
  let meals;
  let menus, menu;
  let setMenu;
  const mockStore = configureStore()
  let store, initialState;

  beforeEach(() => {
    setMenu = jest.fn()
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

    menu = {
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
    };

    initialState = {
      auth: [{}]
    }

    store = mockStore(initialState)
  });

  it("renders edit menu form", () => {
    let wrapper = shallow(
      <EditMenuForm
        meals={meals}
        menus={menus}
        menumeals={[]}
        menu={menu}
        setMenu={setMenu} />);
    expect(wrapper).toBeDefined();
  });


  it('handle changes of the form fields', ()=>{
    wrapper = mount(
      <EditMenuForm
        meals={meals}
        menus={menus}
        menumeals={[]}
        menu={menu}
        setMenu={setMenu} />);

    let meal = wrapper.find('input[name="menumeal"]').at(0)
    let meal1 = wrapper.find('input[name="menumeal"]').at(1)
    let meal2 = wrapper.find('input[name="menumeal"]').at(2)
    meal.simulate('change', {target: {name: "menumeal", checked: true, value: 1}});
    meal1.simulate('change', {target: {name: "menumeal", checked: true, value: 2}});
    meal2.simulate('change', {target: {name: "menumeal", checked: true, value: 3}});
    meal1.simulate('change', {target: {name: "menumeal", checked: false, value: 2}});

    expect(wrapper.state('meals')).toEqual([1,3]);
  });


  it('handle submit is called', ()=>{
    wrapper = mount(
      <EditMenuForm
        meals={meals}
        menus={menus}
        menumeals={[]}
        menu={menu}
        setMenu={setMenu} />);

    let form = wrapper.find('form')
    form.simulate('submit')
    expect(setMenu).toBeCalled();
    expect(notify.show).toBe(notify.show);
  })

});
