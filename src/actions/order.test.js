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
  CANCEL_ORDER,
  baseURL
} from "../reducers/constants";
import axios from "axios";

axios.defaults.baseURL = baseURL;

const serverError = {
  status_code: 500,
  message: "Server Temporarily down! Try again again soon."
}

const errorOrderOperation = {
  status_code: 401,
  message: "Error for order operation"
}

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

  it("dispatches CANCEL_ORDER action", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: order
      });
    });

    const expectedAction = [
      {
        type: CANCEL_ORDER,
        data: order
      }
    ];

    const store = mockStore({ data: {} });
    return store.dispatch(orderActions.cancelOrder(data)).then(() => {
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

  it("PLACE_ORDER action upon order addition fails due to server error", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject(serverError);
    });

    const store = mockStore({ data: {} });
    return store.dispatch(orderActions.makeOrderFromMenu(data)).then(() => {});
  });

  it("PLACE_ORDER action upon order addition fails due to wrong operation", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(errorOrderOperation);
    });

    const store = mockStore({ data: {} });
    return store.dispatch(orderActions.makeOrderFromMenu(data)).then(() => {});
  });

  it("UPDATE_ORDER action upon update order fails due to server error", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject(serverError);
    });

    const store = mockStore({ data: {} });
    return store.dispatch(orderActions.updateOrder(data, 1)).then(() => {
    });
  });

  it("UPDATE_ORDER action upon update order fails due to wrong operation", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(errorOrderOperation);
    });

    const store = mockStore({ data: {} });
    return store.dispatch(orderActions.updateOrder(data, 1)).then(() => {
    });
  });

  it("SERVE_ORDER action upon serve order fails due to server error", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject(serverError);
    });

    const store = mockStore({ data: {} });
    return store.dispatch(orderActions.serveOrder(data)).then(() => {
    });
  });

  it("SERVE_ORDER action upon serve order fails due to wrong operation", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(errorOrderOperation);
    });

    const store = mockStore({ data: {} });
    return store.dispatch(orderActions.serveOrder(data)).then(() => {
    });
  });

  it("GET_CUSTOMER_ORDERS action upon getting customer orders fails due to server error", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject(serverError);
    });

    const store = mockStore({ data: {} });
    return store.dispatch(orderActions.getAllCustomerOrders(customerID)).then(() => {
    });
  });

  it("GET_CUSTOMER_ORDERS action upon getting customer orders fails due to wrong operation", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(errorOrderOperation);
    });

    const store = mockStore({ data: {} });
    return store.dispatch(orderActions.getAllCustomerOrders(customerID)).then(() => {
    });
  });

  it("GET_ORDERS action fails due to server error", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject(serverError);
    });

    const store = mockStore({ data: {} });
    return store.dispatch(orderActions.getAllOrders()).then(() => {
    });
  });

  it("GET_ORDERS action fails due to wrong operation", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(errorOrderOperation);
    });

    const store = mockStore({ data: {} });
    return store.dispatch(orderActions.getAllOrders()).then(() => {
    });
  });

  it("CANCEL_ORDER action upon cancelling order fails due to server error", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 500,
        response: "Server Temporarily down! Try again again soon."
      });
    });

    const store = mockStore({ data: {} });
    return store.dispatch(orderActions.cancelOrder(data)).then(() => {
    });
  });

  it("CANCEL_ORDER action upon cancelling order fails due to wrong operation", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: "Server Temporarily down! Try again again soon."
      });
    });

    const store = mockStore({ data: {} });
    return store.dispatch(orderActions.cancelOrder(data)).then(() => {
    });
  });

});
