import { csrfFetch } from "./csrf";

const LOAD = "portfolios/LOAD";
const ADD = "portfolios/ADD";
const UPDATE = "portfolios/UPDATE"
const REMOVE = "portfolios/REMOVE";
const RESET = "portfolios/RESETALL"

const load = (normalizedPorts) => ({
  type: LOAD,
  normalizedPorts,
});

const add = (portfolio) => ({
  type: ADD,
  portfolio,
});

const update = (updatedData) => ({
  type: UPDATE,
  updatedData,
});

const remove = (portfolioId) => ({
  type: REMOVE,
  portfolioId,
});

export const resetPortfolios = () => ({
    type: RESET
})

export const loadPortfolios = (userId) => async (dispatch) => {
  if (userId) {
    try {
      const response = await csrfFetch(`/api/portfolios/${userId}`);

      if (response.ok) {
        const portfolios = await response.json();

        // const normalize = {}
        // for(let i = 0; i < portfolios.length; ++i){
        //   const included = {}
        //   for(let j = 0; j < portfolios[i].PortfolioEntries.length; ++j){
        //     included[portfolios[i].PortfolioEntries[j].id] = portfolios[i].PortfolioEntries[j];
        //   }
        //   normalize[portfolios[i].id] = portfolios[i];
        //   normalize[portfolios[i].id]["PortfolioEntries"] = included;
        // }

        console.log("portfolios: ", portfolios)

        dispatch(load(portfolios));
        return portfolios;
      }
    } catch {}
  }
};

export const addPortfolio = (formData) => async (dispatch) => {
  const response = await csrfFetch("/api/portfolios/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const portfolio = await response.json();
    dispatch(add(portfolio));
    return portfolio;
  }
};

export const updatePortfolio = (formData) => async (dispatch) => {
  if (formData.id) {
    const response = await csrfFetch(`/api/portfolios/${formData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const updatedPort = await response.json();
      dispatch(update(updatedPort));
    }
  }
};

export const portTransaction = (formData) => async (dispatch) => {
  const response = await csrfFetch(
    `/api/portfolios/transact/${formData.portfolioId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  if (response.ok) {
    const portfolio = await response.json();
    // console.log("return from backend, port",portfolio);
    // dispatch(add(portfolio));
  }
};

export const removePortfolio = (portfolioId) => async (dispatch) => {
  const response = await csrfFetch(`/api/portfolios/${portfolioId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const portfolio = await response.json();
    dispatch(remove(portfolioId));
  }
};

const portfolioReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      // const newState = {};
      // for (let item of action.list) {
      //   newState[item.id] = item;
      // }
      return action.normalizedPorts;
    case ADD:
      return { ...state, [action.portfolio.id]: action.portfolio };
    case UPDATE:
        return { ...state, [action.updatedData.id]: { ...state[action.updatedData], ...action.updatedData } }
    case REMOVE:
      const newPortfolios = { ...state };
      delete newPortfolios[action.portfolioId];
      return newPortfolios;
    case RESET:
        return {}
    default:
      return state;
  }
};

export default portfolioReducer;
