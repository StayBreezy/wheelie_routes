const initialState = {
  username: "",
  id: "",
  profile_pic: "",
  isLoggedIn: false,
};

const UPDATE_USER = "UPDATE_USER";
const LOGOUT = "LOGOUT";

export const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    payload: user,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_USER:
      return {
        ...state,
        id: payload.id,
        username: payload.username,
        profile_pic: payload.profile_pic,
        isLoggedIn: true
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
