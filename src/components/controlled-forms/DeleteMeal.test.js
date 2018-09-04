import React from "react";
import { DeleteMeal } from "./DeleteMeal";
import { Form } from "reactstrap";
import { shallow, mount } from "enzyme";

it("renders delete a meal form", () => {
  let deleteMeal = jest.fn();
  let mealIDs = [1];
  let wrapper = shallow(
    <DeleteMeal
    deleteMeal={deleteMeal} mealIDs={mealIDs} />);
  expect(wrapper).toBeDefined();
});


it('handle submit is called', ()=>{
  const props = {
    deleteMeal: jest.fn(),
    mealIDs: [1]
  };

  let wrapper = mount(
    <DeleteMeal {...props} />);
  let form = wrapper.find(Form)
  form.simulate('submit')
  expect(props.deleteMeal).toBeCalled();
})
