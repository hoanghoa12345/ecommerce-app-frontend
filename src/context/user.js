import { createContext, useContext, useReducer } from "react";

const userLocal = JSON.parse(localStorage.getItem("user")) || {
    token: "",
    user: {
        name: '',
        email: '',
        roles: ''
    }
}

const {token, user: {name, email, roles}} = userLocal
const initialState = {
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
            name: action.payload.user.name,
            email: action.payload.user.email,
            roles: action.payload.user.roles,
            token: action.payload.token
        }
    }
    default: {
      return state;
    }
  }
};

export const UserWrapper = ({ children }) => {
  const [user, userDispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ user, userDispatch }}>
        {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () =>{
    return useContext(UserContext);
}
