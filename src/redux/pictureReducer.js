const initialState = {
    pictures: [],
  };

  export const updatePictures = (pictures) => {
    return {
      type: "update_pictures",
      payload: pictures,
    };
  };

  export default function pictureReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case "update_pictures":
            return {
                ...state,
                pictures: payload.pictures,
            }
        default:
            return state;
    }
  }
