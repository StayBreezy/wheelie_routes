const initialState = {
  routes: [],
};

export const updateSearch = (routes) => {
  return {
    type: "update_search",
    payload: routes,
  };
};

export default function routeReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
      case "update_search":
          return {
              ...state,
              routes: payload.routes,
          }
      default:
          return state;
  }
}
