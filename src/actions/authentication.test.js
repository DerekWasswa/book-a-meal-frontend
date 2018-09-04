import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import * as authActions from "./authentication";
import {
  USER_REGISTERED,
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  baseURL
} from "../reducers/constants";
import axios from "axios";

axios.defaults.baseURL = baseURL;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const registeredUser = {
  id: 1,
  username: "bkMealUser",
  email: "bkmeal@test.com",
  admin: true
};

const loginMock = {
  token: jwt.sign({ admin: true, user_id: 1, name: "bkMealUser" }, "secret")
};

describe("authentication actions", () => {
  let data;

  beforeEach(() => {
    moxios.install(axios);
    data = {
      email: "bkmeal@test.com",
      password: "test",
      name: "test",
      admin: true
    };
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("dispatches USER_REGISTERED action upon user registration", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: registeredUser
      });
    });

    const expectedAction = [
      {
        type: USER_REGISTERED,
        data: registeredUser
      }
    ];

    const store = mockStore({ data: {} });
    return store.dispatch(authActions.signUpUser(data)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  // it("dispatches USER_LOGGED_IN action when a user logins in", () => {
  //   moxios.wait(() => {
  //     const request = moxios.requests.mostRecent();
  //     request.respondWith({
  //       status: 200,
  //       response: loginMock
  //     });
  //   });

  //   const user = jwtDecode(loginMock.token);

  //   const expectedAction = [
  //     {
  //       type: USER_LOGGED_IN,
  //       data: { ...user, logInStatus: true }
  //     }
  //   ];

  //   const store = mockStore({ data: {} });
  //   return store.dispatch(authActions.loginUser(data)).then(() => {
  //     expect(store.getActions()).toEqual(expectedAction);
  //   });
  // });

  it("dispatches USER_LOGGED_OUT when a user logs out", () => {
    localStorage.setItem("app-access-token", loginMock.token);
    const store = mockStore({});
    const expectedAction = [{ type: USER_LOGGED_OUT }];
    store.dispatch(authActions.logoutUser());
    expect(store.getActions()).toEqual(expectedAction);
  });
});
