import React from "react";
import { LoginForm } from "./LoginForm";
import { shallow, mount } from "enzyme";
import configureStore from 'redux-mock-store'
import sinon from 'sinon';

describe("<LoginForm />", () => {

  let wrapper;
  let authTrue, authFalse;
  let history;
  let loginUser;
  let reset;
  const mockStore = configureStore()
  let store, initialState;
  let update = sinon.stub().resolves({success: true})

  beforeEach(() => {
    authTrue = {
      admin: true,
      user_id: 1,
      logInStatus: true
    };

    authFalse = {
      admin: false,
      user_id: 1,
      logInStatus: true
    };

    loginUser = jest.fn()

    initialState = {
      auth: [{}]
    }

    history = {
      push: sinon.spy()
    }

    store = mockStore(initialState)
    reset = sinon.spy()
  });

  it("renders login form vendor", () => {
    let update = sinon.stub().resolves({success: true})
    wrapper = shallow(
      <LoginForm
        update
        history={history}
        auth={authTrue}
        loginUser={loginUser}
        reset />);

    // triggers componentWillReceiveProps
    wrapper.setProps(authTrue);
    expect(wrapper).toBeDefined();
  });

  it("renders login form customer", () => {

    wrapper = shallow(
      <LoginForm
        update
        history={history}
        auth={authFalse}
        loginUser={loginUser}
        reset />);
    // triggers componentWillReceiveProps
    wrapper.setProps(authFalse);
    expect(wrapper).toBeDefined();
  });

  it('handle changes of the form fields', ()=>{
    wrapper = mount(
      <LoginForm
        auth={authTrue}
        loginUser={loginUser} />);

    let meal = wrapper.find('input[name="email"]')
    meal.simulate('change', {target: {name: "email",value: 'test@test.com'}});

    let price = wrapper.find('input[name="password"]')
    price.simulate('change', {target: {name: "password",value: 'bookameal'}});

    expect(wrapper.state('email')).toBe('test@test.com');
    expect(wrapper.state('password')).toBe('bookameal');
  });


  it('handle submit is called', ()=>{
    wrapper = mount(
      <LoginForm
        auth={authTrue}
        loginUser={loginUser} />);

    let form = wrapper.find('form')
    form.simulate('submit')
    expect(loginUser).toBeCalled();
  })

});
