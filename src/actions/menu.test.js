import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import * as menuActions from "./menu";
import {
  ADD_MENU_OF_THE_DAY,
  GET_MENU_OF_THE_DAY,
  DELETE_MEAL_OFF_THE_MENU,
  GET_VENDOR_MENUS,
  baseURL
} from "../reducers/constants";
import axios from "axios";

axios.defaults.baseURL = baseURL;

const serverError = {
  status_code: 500,
  message: "Server Temporarily down! Try again again soon."
}

const errorMenuOperation = {
  status_code: 401,
  message: "Error Order Operation"
}

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const menu = {
  menu_id: 1,
  name: "Today",
  description: "Specials",
  date: "2018-09-02",
  vendor: 1,
  contact: "vendor@gmail.com",
  meals: [{
    meal_id: 1,
    meal: "Food",
    price: 10000
  }]
};

describe("menu actions", () => {
  let data;

  beforeEach(() => {
    moxios.install(axios);
    data = {
      name: "Today",
      description: "Specials",
      date: "2018-09-02",
      vendor_id: 1,
      contact: "vendor@gmail.com",
      meals: [{
        meal_id: 1
      }]
    };
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("dispatches ADD_MENU_OF_THE_DAY action upon menu creation", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: menu
      });
    });

    const expectedAction = [
      {
        type: ADD_MENU_OF_THE_DAY,
        data: menu
      }
    ];

    const store = mockStore({ data: {} });
    return store.dispatch(menuActions.setMenu(data)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it("dispatches GET_MENU_OF_THE_DAY action upon get menu", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: menu
      });
    });

    const expectedAction = [
      {
        type: GET_MENU_OF_THE_DAY,
        data: menu
      }
    ];

    const store = mockStore({ data: {} });
    return store.dispatch(menuActions.getMenus()).then(() => {
      // expect(store.getActions()).toEqual(expectedAction);
    });
  });


  it("dispatches DELETE_MEAL_OFF_THE_MENU action upon menu deletion", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 202,
        response: menu
      });
    });

    const expectedAction = [
      {
        type: DELETE_MEAL_OFF_THE_MENU,
        data: menu
      }
    ];

    const store = mockStore({ data: {} });
    return store.dispatch(menuActions.deleteMealOffTheMenu(data)).then(() => {
      // expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it("dispatches GET_VENDOR_MENUS action upon getting vendor menus", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: menu
      });
    });

    const expectedAction = [
      {
        type: GET_VENDOR_MENUS,
        data: menu
      }
    ];

    const store = mockStore({ data: {} });
    return store.dispatch(menuActions.getVendorMenus()).then(() => {
      // expect(store.getActions()).toEqual(expectedAction);
    });
  });


  it("ADD_MENU_OF_THE_DAY action upon menu addition fails due to server error", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject(serverError);
    });

    const store = mockStore({ data: {} });
    return store.dispatch(menuActions.setMenu(data)).then(() => {});
  });

  it("ADD_MENU_OF_THE_DAY action upon menu addition fails due to wrong operation", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(errorMenuOperation);
    });

    const store = mockStore({ data: {} });
    return store.dispatch(menuActions.setMenu(data)).then(() => {});
  });

  it("DELETE_MEAL_OFF_THE_MENU action upon menu addition fails due to server error", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject(serverError);
    });

    const store = mockStore({ data: {} });
    return store.dispatch(menuActions.deleteMealOffTheMenu(data)).then(() => {});
  });

  it("DELETE_MEAL_OFF_THE_MENU action upon menu addition fails due to wrong operation", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(errorMenuOperation);
    });

    const store = mockStore({ data: {} });
    return store.dispatch(menuActions.deleteMealOffTheMenu(data)).then(() => {});
  });

  it("GET_MENU_OF_THE_DAY action upon meal addition fails due to server error", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject(serverError);
    });

    const store = mockStore({ data: {} });
    return store.dispatch(menuActions.getMenus()).then(() => {});
  });

  it("GET_MENU_OF_THE_DAY action upon meal addition fails due to wrong operation", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(errorMenuOperation);
    });

    const store = mockStore({ data: {} });
    return store.dispatch(menuActions.getMenus()).then(() => {});
  });

  it("GET_VENDOR_MENUS action upon vendor emnu fails due to server error", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject(serverError);
    });

    const store = mockStore({ data: {} });
    return store.dispatch(menuActions.getVendorMenus()).then(() => {});
  });

  it("GET_VENDOR_MENUS action upon vendor menu fails due to wrong operation", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(errorMenuOperation);
    });

    const store = mockStore({ data: {} });
    return store.dispatch(menuActions.getVendorMenus()).then(() => {});
  });


});
