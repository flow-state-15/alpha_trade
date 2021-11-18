// import { csrfFetch } from "./csrf";

const LOAD = "watchlists/LOAD";
const ADD = "watchlists/ADD";
const REMOVE = "watchlists/REMOVE";

const load = (list) => ({
  type: LOAD,
  list,
});

const add = (watchlist) => ({
  type: ADD,
  watchlist,
});

const remove = (watchlistId) => ({
  type: REMOVE,
  watchlistId,
});

export const loadWatchlists = (userId) => async (dispatch) => {
  const response = await fetch(`/api/watchlists/${userId}`);


  if (response.ok) {
      const { watchlists } = await response.json();
      console.log("\n\nIN wl LOAD THUNK, wl: ", watchlists, "\n\n")
    dispatch(load(watchlists));
    return watchlists
  }
};

export const addWatchlist = (formData) => async (dispatch) => {
  const response = await fetch("/api/watchlists/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const watchlist = await response.json();
    dispatch(add(watchlist));
    return watchlist;
  }
};

export const updateWatchlist = (formData) => async (dispatch) => {
  const response = await fetch(`/api/watchlists/${formData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const watchlist = await response.json();
    dispatch(add(watchlist));
  }
};

export const removeWatchlist = (watchlistId) => async (dispatch) => {
  const response = await fetch(`/api/watchlists/${watchlistId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const watchlist = await response.json();
    dispatch(remove(watchlistId));
  }
};

const watchlistReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      const newState = {};
      for (let item of action.list) {
        newState[item.id] = item;
      }
      return newState;
    case ADD:
      return { ...state, [action.watchlist.id]: action.watchlist };
    case REMOVE:
      const newWatchlists = { ...state };
      delete newWatchlists[action.watchlistId];
      return newWatchlists;
    default:
      return state;
  }
};

export default watchlistReducer;
