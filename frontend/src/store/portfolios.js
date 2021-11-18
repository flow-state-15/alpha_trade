// import { csrfFetch } from "./csrf";

const LOAD = "portfolios/LOAD";
const ADD = "portfolios/ADD";
const REMOVE = "portfolios/REMOVE";

const load = (list) => ({
  type: LOAD,
  list,
});

const add = (portfolio) => ({
  type: ADD,
  portfolio,
});

const remove = (portfolioId) => ({
  type: REMOVE,
  portfolioId,
});

export const loadPortfolios = (userId) => async (dispatch) => {
  const response = await fetch(`/api/portfolios/${userId}`);


  if (response.ok) {
      const { portfolios } = await response.json();
      console.log("\n\nIN pf LOAD THUNK, pf: ", portfolios, "\n\n")
    dispatch(load(portfolios));
  }
};

export const addPortfolio = (formData) => async (dispatch) => {
  const response = await fetch("/api/portfolios/", {
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
  const response = await fetch(`/api/portfolios/${formData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const portfolio = await response.json();
    dispatch(add(portfolio));
  }
};

export const removePortfolio = (portfolioId) => async (dispatch) => {
  const response = await fetch(`/api/portfolios/${portfolioId}`, {
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
      const newState = {};
      for (let item of action.list) {
        newState[item.id] = item;
      }
      return newState;
    case ADD:
      return { ...state, [action.portfolio.id]: action.portfolio };
    case REMOVE:
      const newPortfolios = { ...state };
      delete newPortfolios[action.portfolioId];
      return newPortfolios;
    default:
      return state;
  }
};

export default portfolioReducer;
