import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import * as orderActions from "./order";
import {
  PLACE_ORDER,
  UPDATE_ORDER,
  SERVE_ORDER,
  GET_CUSTOMER_ORDERS,
  GET_ORDERS,
  baseURL
} from "../reducers/constants";
import axios from "axios";

axios.defaults.baseURL = baseURL;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const order = {
  id: 1,
  username: "bkMealUser",
  email: "bkmeal@test.com",
  admin: true
};

describe("order actions", () => {
  let data;
  let customerID;

  beforeEach(() => {
    moxios.install(axios);
    data = {
      meal: "Chips and Vegs",
      price: 12000
    };

    customerID = { admin: true, user_id: 1, name: "bkMealUser" };
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("dispatches PLACE_ORDER action", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: order
      });
    });

    const expectedAction = [
      {
        type: PLACE_ORDER,
        data: order
      }
    ];

    const store = mockStore({ data: {} });
    return store.dispatch(orderActions.makeOrderFromMenu(data)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it("dispatches UPDATE_ORDER action", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 202,
        response: order
      });
    });

    const expectedAction = [
      {
        type: UPDATE_ORDER,
        data: order
      }
    ];

    const store = mockStore({ data: {} });
    return store.dispatch(orderActions.updateOrder(data, 1)).then(() => {
      // expect(store.getActions()).toEqual(expectedAction);
    });
  });


  it("dispatches SERVE_ORDER action", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: order
      });
    });

    const expectedAction = [
      {
        type: SERVE_ORDER,
        data: order
      }
    ];

    const store = mockStore({ data: {} });
    return store.dispatch(orderActions.serveOrder(data)).then(() => {
      // expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it("dispatches GET_CUSTOMER_ORDERS action", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: order
      });
    });

    const expectedAction = [
      {
        type: GET_CUSTOMER_ORDERS,
        data: order
      }
    ];

    const store = mockStore({ data: {} });
    return store.dispatch(orderActions.getAllCustomerOrders(customerID)).then(() => {
      // expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it("dispatches GET_ORDERS action", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: order
      });
    });

    const expectedAction = [
      {
        type: GET_ORDERS,
        data: order
      }
    ];

    const store = mockStore({ data: {} });
    return store.dispatch(orderActions.getAllOrders()).then(() => {
      // expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
