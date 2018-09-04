import React from "react";
import { UpdateMealForm } from "./UpdateMealForm";
import { Form } from "reactstrap";
import { shallow, mount } from "enzyme";

describe("<UpdateMealForm />", () => {

  let wrapper;
  let updateMeal;
  let store, initialState;

  beforeEach(() => {
    updateMeal = jest.fn()
  });


  it("renders add a meal form", () => {
    wrapper = shallow(
      <UpdateMealForm
        updateMeal={updateMeal} />);
    expect(wrapper).toBeDefined();
  });

  it('handle changes of the form fields', ()=>{
    wrapper = mount(
      <UpdateMealForm
        updateMeal={updateMeal} />);

    let meal = wrapper.find('input[name="meal"]')
    meal.simulate('change', {target: {name: "meal",value: 'Food'}});

    let price = wrapper.find('input[name="price"]')
    price.simulate('change', {target: {name: "price",value: 1000}});

    expect(wrapper.state('meal')).toBe('Food');
    expect(wrapper.state('price')).toBe(1000);
  });


  it('handle submit is called', ()=>{
    const props = {
      updateMeal: jest.fn()
    };

    wrapper = mount(
      <UpdateMealForm {...props} />);

    let form = wrapper.find(Form)
    form.simulate('submit')
    expect(props.updateMeal).toBeCalled();
  })

});
