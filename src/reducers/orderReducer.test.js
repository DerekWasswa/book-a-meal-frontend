import reducer from "./orderReducer";
import {
  PLACE_ORDER,
  UPDATE_ORDER,
  GET_CUSTOMER_ORDERS,
  GET_ORDERS,
  SERVE_ORDER,
  SUCCESS,
  ERRORS
} from "./constants";

describe("ORDER REDUCER", () => {
  let order;
  let initialState;

  beforeEach(() => {
    order = {
      order_id: 1,
      menu_id: 1,
      meal_id: 1,
      user: "test@test.com",
      date: "2018-08-10"
    };

    initialState = {
      order: {
        order_id: 0,
        menu_id: 0,
        meal_id: 0,
        user: "",
        date: ""
      },
      orders: []
    };
  });

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      order: {
        order_id: 0,
        menu_id: 0,
        meal_id: 0,
        user: "",
        date: ""
      },
      orders: []
    });
  });

  it("responds to the PLACE_ORDER action creator ", () => {
    expect(
      reducer(initialState, {
        type: PLACE_ORDER,
        data: order
      })
    ).toEqual({
      order: order,
      orders: []
    });
  });

  it("responds to the UPDATE_ORDER action creator", () => {
    expect(reducer(initialState, { type: UPDATE_ORDER, data: order })).toEqual({
      order: order,
      orders: []
    });
  });

  it("responds to the GET_CUSTOMER_ORDERS action creator", () => {
    expect(
      reducer(initialState, { type: GET_CUSTOMER_ORDERS, data: order })
    ).toEqual({
      order: {
        order_id: 0,
        menu_id: 0,
        meal_id: 0,
        user: "",
        date: ""
      },
      orders: order
    });
  });

  it("responds to the GET_ORDERS action creator ", () => {
    expect(
      reducer(initialState, {
        type: GET_ORDERS,
        data: order
      })
    ).toEqual({
      order: {
        order_id: 0,
        menu_id: 0,
        meal_id: 0,
        user: "",
        date: ""
      },
      orders: order
    });
  });

  it("responds to the SERVE_ORDER action creator", () => {
    expect(reducer(initialState, { type: SERVE_ORDER, data: order })).toEqual({
      order: order,
      orders: []
    });
  });
});
