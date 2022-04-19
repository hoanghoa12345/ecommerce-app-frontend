import { createContext, useContext, useReducer } from "react";

const userLocal = JSON.parse(localStorage.getItem("user")) || {
  token: "",
  user: {
    id: "",
    name: "",
    email: "",
    roles: "",
  },
};

const {
  token,
  user: { id, name, email, roles },
} = userLocal;
const initialState = {
  id,
  name,
  email,
  roles,
  token,
};

const UserContext = createContext({ initialState, userDispatch: () => null });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NAME": {
      return {
        ...state,
      };
    }
    case "SET_ROLES": {
      return {
        ...state,
        roles: action.payload,
      };
    }
    case "SET_USER": {
      return {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        roles: action.payload.roles,
        token: action.payload.token,
      };
    }
    default: {
      return state;
    }
  }
};

export const UserWrapper = ({ children }) => {
  const [user, userDispatch] = useReducer(reducer, initialState);
  return <UserContext.Provider value={{ user, userDispatch }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};
