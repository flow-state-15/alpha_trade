import { csrfFetch } from "./csrf";



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

    // console.log("\n\nIN pt LOAD THUNK, pt: ", portfolios, "\n\n")

  dispatch(load(portfolios));
  return portfolios
}
};

export const addPortfolio = (formData) => async (dispatch) => {
  console.log("in addPortfolio", formData)
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
  const response = await csrfFetch(`/api/portfolios/${formData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const portfolio = await response.json();
    // dispatch(add(portfolio));
  }
};

export const portTransaction = (formData) => async (dispatch) => {
  const response = await csrfFetch(`/api/portfolios/transact/${formData.portfolioId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

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
      return action.list;
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
