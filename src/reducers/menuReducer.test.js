import reducer from "./menuReducer";
import {
  ADD_MENU_OF_THE_DAY,
  GET_MENU_OF_THE_DAY,
  DELETE_MEAL_OFF_THE_MENU,
  GET_VENDOR_MENUS
} from "./constants";

describe("MENU REDUCER", () => {
  let menu;
  let menus = [];
  let initialState;

  beforeEach(() => {
    menu = {
      menu_id: 1,
      name: "Special Sunday",
      description: "Come dine with us",
      date: "2018-08-30",
      meals: [
        {
          meal_id: 1,
          meal: "Rolex",
          price: 4000
        },
        {
          meal_id: 2,
          meal: "Chicken",
          price: 10000
        }
      ]
    };

    menus.push(menu);

    initialState = {
      menu: {
        menu_id: 0,
        name: "",
        description: "",
        date: "",
        meals: [{}]
      },
      menus: [],
      caterer_menus: []
    };
  });

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      menu: {
        menu_id: 0,
        name: "",
        description: "",
        date: "",
        meals: [{}]
      },
      menus: [],
      caterer_menus: []
    });
  });

  it("responds to the ADD_MENU_OF_THE_DAY action creator ", () => {
    expect(
      reducer(initialState, {
        type: ADD_MENU_OF_THE_DAY,
        data: menu
      })
    ).toEqual({
      menu: menu,
      menus: [],
      caterer_menus: []
    });
  });

  it("responds to the GET_MENU_OF_THE_DAY action creator", () => {
    expect(
      reducer(initialState, { type: GET_MENU_OF_THE_DAY, data: menu })
    ).toEqual({
      menu: {
        menu_id: 0,
        name: "",
        description: "",
        date: "",
        meals: [{}]
      },
      menus: menu,
      caterer_menus: []
    });
  });

  it("responds to the DELETE_MEAL_OFF_THE_MENU action creator", () => {
    expect(reducer(initialState, { type: DELETE_MEAL_OFF_THE_MENU })).toEqual({
      menu: {
        menu_id: 0,
        name: "",
        description: "",
        date: "",
        meals: [{}]
      },
      menus: [],
      caterer_menus: []
    });
  });

  it("responds to the GET_VENDOR_MENUS action creator ", () => {
    expect(
      reducer(initialState, {
        type: GET_VENDOR_MENUS,
        data: menu
      })
    ).toEqual({
      menu: {
        menu_id: 0,
        name: "",
        description: "",
        date: "",
        meals: [{}]
      },
      menus: [],
      caterer_menus: menu
    });
  });
});
