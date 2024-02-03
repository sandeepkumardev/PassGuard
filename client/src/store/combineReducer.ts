// @ts-nocheck
export const combineReducers = (reducers) => {
  return (state, action) => {
    const nextState = {};
    for (const [key, reducer] of Object.entries(reducers)) {
      nextState[key] = reducer(state[key], action);
    }
    return nextState;
  };
};
