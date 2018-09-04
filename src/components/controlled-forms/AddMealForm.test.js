import React from "react";
import { AddMealForm } from "./AddMealForm";
import { Form } from "reactstrap";
import { shallow, mount } from "enzyme";

describe("<AddMealForm />", () => {

  let wrapper;
  let addMeal;
  let store, initialState;

  beforeEach(() => {
    addMeal = jest.fn()
  });

  it("renders add a meal form", () => {
    wrapper = shallow(
      <AddMealForm
        addMeal={addMeal} />);
    expect(wrapper).toBeDefined();
  });

  it('handle changes of the form fields', ()=>{
    wrapper = mount(
      <AddMealForm
        addMeal={addMeal} />);

    const addmeal = wrapper
    let meal = addmeal.find('input[name="meal"]')
    meal.simulate('change', {target: {name: "meal",value: 'Food'}});

    let price = addmeal.find('input[name="price"]')
    price.simulate('change', {target: {name: "price",value: 1000}});

    expect(addmeal.state('meal')).toBe('Food');
    expect(addmeal.state('price')).toBe(1000);
  });


  it('handle submit is called', ()=>{
    const props = {
      addMeal: jest.fn()
    };

    wrapper = mount(
      <AddMealForm {...props} />);

    let form = wrapper.find(Form)
    form.simulate('submit')
    expect(props.addMeal).toBeCalled();
  })

});
