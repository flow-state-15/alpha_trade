import { csrfFetch } from "./csrf";

const LOAD = "portData/LOAD";

const load = (list) => ({
  type: LOAD,
  list,
});

export const getStockData = (userId, portId) => async (dispatch) => {
  // const response = await csrfFetch(
  //   `/api/portfolios/portData/${userId}/${portId}`
  // );
  // if (response.ok) {
  //   const data = await response.json();
  //   dispatch(load(data));
  //   return data;
  // }
};

const portDataReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      const newState = {};
      for (let item of action.list) {
        newState[item.symbol] = item;
      }
      return newState;
    default:
      return state;
  }
};

export default portDataReducer;
