import reducer from "./mealReducer";
import {
  ADD_MEAL,
  EDIT_MEAL,
  DELETE_MEAL,
  GET_MEAL,
  GET_MEALS
} from "./constants";

describe("MEAL REDUCER", () => {
  let meal;
  let initialState;

  beforeEach(() => {
    meal = {
      meal_id: 1,
      meal: "Rolex",
      price: 4000
    };

    initialState = {
      meal: {
        meal_id: 0,
        meal: "",
        price: 0
      },
      meals: []
    };
  });

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      meal: {
        meal_id: 0,
        meal: "",
        price: 0
      },
      meals: []
    });
  });

  it("responds to the ADD_MEAL action creator ", () => {
    expect(
      reducer(initialState, {
        type: ADD_MEAL,
        data: meal
      })
    ).toEqual({
      meal: meal,
      meals: []
    });
  });

  it("responds to the EDIT_MEAL action creator", () => {
    expect(reducer(initialState, { type: EDIT_MEAL, data: meal })).toEqual({
      meal: meal,
      meals: []
    });
  });

  it("responds to the DELETE_MEAL action creator", () => {
    expect(reducer(initialState, { type: DELETE_MEAL })).toEqual({
      meal: {
        meal_id: 0,
        meal: "",
        price: 0
      },
      meals: []
    });
  });

  it("responds to the GET_MEAL action creator ", () => {
    expect(
      reducer(initialState, {
        type: GET_MEAL,
        data: meal
      })
    ).toEqual({
      meal: meal,
      meals: []
    });
  });

  it("responds to the GET_MEALS action creator", () => {
    expect(reducer(initialState, { type: GET_MEALS, data: meal })).toEqual({
      meal: {
        meal_id: 0,
        meal: "",
        price: 0
      },
      meals: meal
    });
  });
});
