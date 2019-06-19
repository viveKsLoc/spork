import React, { useReducer } from "react";

const Context = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "setTab":
      return { ...state, tab: action.payload };
    case "message":
      return { ...state, snackbar: action.payload };
    case "editmode":
      if (action.payload) {
        return { ...state, editMode: action.payload, formCopy: { ...state.user } };
      }
      return { ...state, editMode: action.payload };
    case "user":
      const newState = { ...state };
      newState.user[action.payload.name] = action.payload.value;
      return newState;
    case "reset":
      return { ...state, user: state.formCopy };
    default:
      throw new Error();
  }
}

const initialState = {
  tab: 0,
  snackbar: null,
  editMode: false,
  user: {
    name: "Sonic",
    bio: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima, natus.",
    location: "The mushroom kingdom"
  },
  formCopy: {}
};

export function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Context.Provider value={{ ...state, dispatch }}>{children}</Context.Provider>;
}

export const ContextConsumer = Context.Consumer;

export default Context;
