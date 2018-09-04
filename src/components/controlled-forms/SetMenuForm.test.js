import React from "react";
import { SetMenuForm } from "./SetMenuForm";
import { Form } from "reactstrap";
import { shallow, mount } from "enzyme";
import sinon from 'sinon';
import notify from "react-notify-toast";
jest.mock('react-notify-toast')


describe("<SetMenuForm />", () => {

  let wrapper;
  let meals;
  let setMenu;
  let store, initialState;
  let reset;
  let notify;
  let update = sinon.stub().resolves({success: true})

  beforeEach(() => {

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

    setMenu = jest.fn()

    notify = {
      show: sinon.spy()
    }
    reset = sinon.spy()
  });

  it("renders set menu page", () => {
    wrapper = shallow(
      <SetMenuForm
        data={meals}
        setMenu={setMenu} />);
    expect(wrapper).toBeDefined();
  });


  it('handle changes of the form fields', ()=>{
    wrapper = mount(
      <SetMenuForm
        data={meals}
        setMenu={setMenu} />);


    let name = wrapper.find('input[name="name"]')
    name.simulate('change', {target: {name: "name",value: 'CatererA'}});

    let description = wrapper.find('input[name="description"]')
    // description.simulate('change', {target: {name: "description",value: 'Dining'}});

    let date = wrapper.find('input[name="date"]')
    date.simulate('change', {target: {name: "date",value: '2018-09-04'}});

    expect(wrapper.state('name')).toBe('CatererA');
    // expect(wrapper.state('description')).toBe('Dining');
    expect(wrapper.state('date')).toBe('2018-09-04');


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
    let update = sinon.stub().resolves({success: true})
    wrapper = mount(
      <SetMenuForm
        update
        notify
        data={meals}
        setMenu={setMenu}
        reset />);

    let form = wrapper.find(Form)
    form.simulate('submit')
    expect(setMenu).toBeCalled();
    expect(notify.show).toBe(notify.show);
  })
});
