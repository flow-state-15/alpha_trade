import { csrfFetch } from "./csrf";

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
  if (userId) {
    try {
      const response = await fetch(`/api/watchlists/${userId}`);

      if (response.ok) {
        const { watchlists } = await response.json();

        const normalize = {};
        for (let i = 0; i < watchlists.length; ++i) {
          const included = {};
          for (let j = 0; j < watchlists[i].WatchlistEntries.length; ++j) {
            included[watchlists[i].WatchlistEntries[j].id] =
              watchlists[i].WatchlistEntries[j];
          }
          normalize[watchlists[i].id] = watchlists[i];
          normalize[watchlists[i].id]["WatchlistEntries"] = included;
        }

        dispatch(load(watchlists));
        return watchlists;
      }
    } catch {}
  }
};

export const addWatchlist = (formData) => async (dispatch) => {
  const response = await csrfFetch("/api/watchlists/", {
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
  if (formData.id) {
    const response = await csrfFetch(`/api/watchlists/${formData.id}`, {
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
  }
};

export const removeWatchlist = (watchlistId) => async (dispatch) => {
  if (watchlistId) {
    const response = await csrfFetch(`/api/watchlists/${watchlistId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const watchlist = await response.json();
      dispatch(remove(watchlistId));
    }
  }
};

export const addWatchlistSymbol = (form) => async (dispatch) => {
  const response = await csrfFetch("/api/watchlists/addSymbol", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  if (response.ok) {
    const watchlist = await response.json();
    dispatch(add(watchlist));
    return watchlist;
  }
};

export const removeWatchlistSymbol =
  (watchlistId, entryId) => async (dispatch) => {
    const response = await csrfFetch(
      `/api/watchlists/deleteSymbol/${watchlistId}/${entryId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const watchlist = await response.json();
      dispatch(add(watchlist));
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
