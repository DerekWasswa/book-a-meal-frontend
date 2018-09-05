import reducer from "./authReducer";
import { USER_REGISTERED, USER_LOGGED_IN, USER_LOGGED_OUT, ERRORS } from "./constants";
import sinon from 'sinon';
import notify from "react-notify-toast";
jest.mock('react-notify-toast')

describe("AUTHENTICATION REDUCER", () => {
  let user;
  let serverError;
  let reset;
  let notify;
  let update = sinon.stub().resolves({success: true})

  let initialState;

  beforeEach(() => {
    user = {
      user_id: 1,
      username: "bkMealUser",
      email: "bkmeal@test.com",
      admin: true
    };

    serverError = {
      status_code: 500,
      message: "Server Temporarily down! Try again again soon."
    };

    notify = {
      show: sinon.spy()
    }
    reset = sinon.spy()

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
