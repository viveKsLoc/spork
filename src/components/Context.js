import React, { useReducer } from "react";
import tails from "../assets/tails.png";

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
    case "switchUser":
      return { ...state, user: action.payload };
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
  auth: {
    id: 1,
    pic:
      "https://cdn.vox-cdn.com/thumbor/AVRKydHKlpRjC2ZwpxquoY_Bntk=/0x26:640x453/1200x800/filters:focal(0x26:640x453)/cdn.vox-cdn.com/uploads/chorus_image/image/34182115/sonic.0.jpg"
  },
  user: {
    name: "Sonic",
    bio: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima, natus.",
    location: "The mushroom kingdom",
    id: 1,
    pic:
      "https://cdn.vox-cdn.com/thumbor/AVRKydHKlpRjC2ZwpxquoY_Bntk=/0x26:640x453/1200x800/filters:focal(0x26:640x453)/cdn.vox-cdn.com/uploads/chorus_image/image/34182115/sonic.0.jpg",
    friends: [2, 3]
  },
  formCopy: {},
  users: {
    1: {
      name: "Sonic",
      bio: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima, natus.",
      location: "The mushroom kingdom",
      pic:
        "https://cdn.vox-cdn.com/thumbor/AVRKydHKlpRjC2ZwpxquoY_Bntk=/0x26:640x453/1200x800/filters:focal(0x26:640x453)/cdn.vox-cdn.com/uploads/chorus_image/image/34182115/sonic.0.jpg",
      friends: [2, 3],
      id: 1
    },
    2: {
      name: "Tails",
      bio: "Hey im Tails.",
      isOnline: true,
      location: "Denmark",
      pic: tails,
      friends: [1],
      id: 2
    },
    3: {
      name: "Knuckles",
      bio: "Red devil",
      isOnline: false,
      location: "Destiny",
      pic: "https://i.pinimg.com/originals/97/48/fd/9748fdc48a24b4b3fa74f0fe30c33fde.png",
      friends: [1],
      id: 3
    }
  }
};

export function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Context.Provider value={{ ...state, dispatch }}>{children}</Context.Provider>;
}

export const ContextConsumer = Context.Consumer;

export default Context;
