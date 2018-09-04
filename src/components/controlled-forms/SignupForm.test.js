import React from "react";
import { SignUpForm } from "./SignUpForm";
import { shallow, mount } from "enzyme";
import configureStore from 'redux-mock-store'
import notify from "react-notify-toast";
jest.mock('react-notify-toast')

describe("<SignupForm />", () => {

  let wrapper;
  let auth;
  let signUpUser;
  const mockStore = configureStore()
  let store, initialState;

  beforeEach(() => {
    auth = {
      message: "Successfully Registered. Please login",
      status_code: 201
    };

    signUpUser = jest.fn()

    initialState = {
      auth: [{}]
    }

    store = mockStore(initialState)

  });

  it("renders sign up form", () => {
    wrapper = shallow(
      <SignUpForm
        auth={auth}
        signUpUser={signUpUser} />);
    expect(wrapper).toBeDefined();
  });


  it('handle changes of the form fields', ()=>{

    wrapper = mount(
      <SignUpForm
        auth={auth}
        signUpUser={signUpUser} />);

    let username = wrapper.find('input[name="username"]')
    username.simulate('change', {target: {name: "username",value: 'testuser'}});

    let email = wrapper.find('input[name="email"]')
    email.simulate('change', {target: {name: "email",value: 'test@test.com'}});

    let password = wrapper.find('input[name="password"]')
    password.simulate('change', {target: {name: "password",value: 'bookameal'}});

    let confirmPassword = wrapper.find('input[name="confirmPassword"]')
    confirmPassword.simulate('change', {target: {name: "confirmPassword",value: 'bookameal'}});

    let caterer = wrapper.find('input[name="caterer"]')
    caterer.simulate('change', {target: {name: "caterer", value: true, checked: true}});

    expect(wrapper.state('email')).toBe('test@test.com');
    expect(wrapper.state('username')).toBe('testuser');
    expect(wrapper.state('password')).toBe('bookameal');
    expect(wrapper.state('confirmPassword')).toBe('bookameal');
    expect(wrapper.state('caterer')).toBe(true);
  });


  it('handle submit is called', ()=>{
    wrapper = mount(
      <SignUpForm
        auth={auth}
        signUpUser={signUpUser} />);

    let form = wrapper.find('form')
    form.simulate('submit')
    expect(signUpUser).toBeCalled();
    expect(notify.show).toBe(notify.show);
  })

  it("component will receive props is called", () => {
    let registrationSuccess = jest.fn()
    wrapper = shallow(
      <SignUpForm
        registrationSuccess = {registrationSuccess}
        auth={auth}
        signUpUser={signUpUser} />);

    wrapper.setProps(auth);
    expect(wrapper).toBeDefined();
    expect(registrationSuccess).toBe(registrationSuccess);
  });

});
