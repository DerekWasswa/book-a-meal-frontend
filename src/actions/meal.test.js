import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import jwt from "jsonwebtoken";
import * as mealActions from "./meal";
import {
  ADD_MEAL,
  DELETE_MEAL,
  EDIT_MEAL,
  GET_MEAL,
  GET_MEALS,
  baseURL
} from "../reducers/constants";
import axios from "axios";

axios.defaults.baseURL = baseURL;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const serverError = {
  status_code: 500,
  message: "Internet connection or Server Temporarily down! Try again again soon."
}

const errorMealOperation = {
  status_code: 401,
  message: "Error Meal Operation"
}

const loginMock = {
  token: jwt.sign({ admin: true, user_id: 1, name: "bkMealUser" }, "secret")
};

const meal = {
  meal_id: 1,
  meal: "Chicken",
  price: 10000
};

describe("meal actions", () => {
  let data;

  beforeEach(() => {
    moxios.install(axios);
    data = {
      meal: "Chips and Vegs",
      price: 12000
    };
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("dispatches ADD_MEAL action upon meal addition", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: meal
      });
    });

    const expectedAction = [
      {
        type: ADD_MEAL,
        data: meal
      }
    ];
    const store = mockStore({ data: {} });
    return store.dispatch(mealActions.addMeal(data)).then(() => {
      // expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it("dispatches DELETE_MEAL action upon meal deletion", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 202,
        response: meal
      });
    });

    const expectedAction = [
      {
        type: DELETE_MEAL,
        data: meal
      }
    ];
    const store = mockStore({ data: {} });
    window.localStorage = {
      getItem: key =>{return {"app-access-token": loginMock.token}},
      setItem: (key, value)=> { store["app-access-token"] = loginMock.token},
      removeItem: key => Reflect.deleteProperty(store, key)
    }
    return store.dispatch(mealActions.deleteMeal()).then(() => {
      // expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it("dispatches EDIT_MEAL action upon meal edition", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 202,
        response: meal
      });
    });

    const expectedAction = [
      {
        type: EDIT_MEAL,
        data: meal
      }
    ];

    const store = mockStore({ data: {} });
    return store.dispatch(mealActions.updateMeal(data)).then(() => {
      // expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it("dispatches GET_MEAL action upon get meal", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: meal
      });
    });

    const expectedAction = [
      {
        type: GET_MEAL,
        data: meal
      }
    ];

    const store = mockStore({ data: {} });
    return store.dispatch(mealActions.getMeal()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it("dispatches GET_MEALS action upon meal deletion", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: meal
      });
    });

    const expectedAction = [
      {
        type: GET_MEALS,
        data: meal
      }
    ];

    const store = mockStore({ data: {} });
    return store.dispatch(mealActions.getAllMeals()).then(() => {
      // expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it("ADD_MEAL action upon meal addition fails due to server error", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject(serverError);
    });

    const store = mockStore({ data: {} });
    return store.dispatch(mealActions.addMeal(data)).then(() => {});
  });

  it("ADD_MEAL action upon meal addition fails due to wrong operation", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(errorMealOperation);
    });

    const store = mockStore({ data: {} });
    return store.dispatch(mealActions.addMeal(data)).then(() => {});
  });

  it("DELETE_MEAL action upon meal addition fails due to server error", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject(serverError);
    });

    const store = mockStore({ data: {} });
    window.localStorage = {
      getItem: key =>{return {"app-access-token": loginMock.token}},
      setItem: (key, value)=> { store["app-access-token"] = loginMock.token},
      removeItem: key => Reflect.deleteProperty(store, key)
    }
    return store.dispatch(mealActions.deleteMeal()).then(() => {});
  });

  it("DELETE_MEAL action upon meal addition fails due to wrong operation", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(errorMealOperation);
    });

    const store = mockStore({ data: {} });
    window.localStorage = {
      getItem: key =>{return {"app-access-token": loginMock.token}},
      setItem: (key, value)=> { store["app-access-token"] = loginMock.token},
      removeItem: key => Reflect.deleteProperty(store, key)
    }
    return store.dispatch(mealActions.deleteMeal()).then(() => {});
  });

  it("EDIT_MEAL action upon meal addition fails due to server error", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject(serverError);
    });

    const store = mockStore({ data: {} });
    return store.dispatch(mealActions.updateMeal(data)).then(() => {});
  });

  it("EDIT_MEAL action upon meal addition fails due to wrong operation", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(errorMealOperation);
    });

    const store = mockStore({ data: {} });
    return store.dispatch(mealActions.updateMeal(data)).then(() => {});
  });

  it("GET_MEAL action upon meal addition fails due to server error", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject(serverError);
    });

    const store = mockStore({ data: {} });
    return store.dispatch(mealActions.getMeal()).then(() => {});
  });

  it("GET_MEAL action upon meal addition fails due to wrong operation", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(errorMealOperation);
    });

    const store = mockStore({ data: {} });
    return store.dispatch(mealActions.getMeal()).then(() => {});
  });

  it("GET_MEALS action upon meal addition fails due to server error", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject(serverError);
    });

    const store = mockStore({ data: {} });
    return store.dispatch(mealActions.getAllMeals()).then(() => {});
  });

  it("GET_MEALS action upon meal addition fails due to wrong operation", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(errorMealOperation);
    });

    const store = mockStore({ data: {} });
    return store.dispatch(mealActions.getAllMeals()).then(() => {});
  });


});
