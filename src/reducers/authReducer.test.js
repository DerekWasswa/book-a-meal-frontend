import reducer from "./authReducer";
import { USER_REGISTERED, USER_LOGGED_IN, USER_LOGGED_OUT } from "./constants";

describe("AUTHENTICATION REDUCER", () => {
  let user;
  let initialState;

  beforeEach(() => {
    user = {
      user_id: 1,
      username: "bkMealUser",
      email: "bkmeal@test.com",
      admin: true
    };

    initialState = {
      auth: {
        admin: false,
        user_id: 0,
        logInStatus: false,
        message: "",
        status_code: 0
      }
    };
  });

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      auth: {
        admin: false,
        user_id: 0,
        logInStatus: false,
        message: "",
        status_code: 0
      }
    });
  });

  it("responds to the USER_REGISTER action creator ", () => {
    expect(
      reducer(initialState, {
        type: USER_REGISTERED,
        data: user
      })
    ).toEqual({
      auth: user
    });
  });

  it("responds to the USER_LOGGED_IN action creator", () => {
    expect(reducer(initialState, { type: USER_LOGGED_IN, data: user })).toEqual(
      {
        auth: user
      }
    );
  });

  it("responds to the USER_LOGGED_OUT action creator", () => {
    expect(reducer(initialState, { type: USER_LOGGED_OUT })).toEqual({
      auth: {
        admin: false,
        user_id: 0,
        logInStatus: false,
        message: "",
        status_code: 0
      }
    });
  });
});
