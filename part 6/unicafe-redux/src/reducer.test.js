import deepFreeze from "deep-freeze";
import counterReducer from "./reducer";

describe("unicafe reducer", () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  test("should return a proper initial state when called with undefined state", () => {
    const state = {};
    const action = {
      type: "DO_NOTHING",
    };

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test("good is incremented", () => {
    const action = {
      type: "GOOD",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });
  });

  test("ok is incremented", () => {
    const action = {
      type: "OK",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    });
  });

  test("bad is incremented", () => {
    const action = {
      type: "BAD",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
    });
  });

  test("state is reset", () => {
    const action = {
      type: "ZERO",
    };
    const state = {
      good: 5,
      ok: 4,
      bad: 3,
    };

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual(initialState);
  });

  test("unknown action", () => {
    const action = {
      type: "UNKNOWN_ACTION",
    };
    const state = {
      good: 2,
      ok: 3,
      bad: 4,
    };

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual(state);
  });

  test("multiple actions", () => {
    const actions = [
      { type: "GOOD" },
      { type: "GOOD" },
      { type: "OK" },
      { type: "BAD" },
      { type: "GOOD" },
    ];
    let state = initialState;

    deepFreeze(state);
    actions.forEach((action) => {
      state = counterReducer(state, action);
      deepFreeze(state);
    });

    expect(state).toEqual({
      good: 3,
      ok: 1,
      bad: 1,
    });
  });
});
