import React, { createContext, useContext, useState } from "react";

// create the context
const UserContext = createContext();

// create provider component
const storedUser = JSON.parse(localStorage.getItem("user"));

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    storedUser || {
      name: "",
      email: "",
      password: "",
    }
  );
  const [isLogin, setIsLogin] = useState(false);
  const [logout, setLogout] = useState(false);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,

        isLogin,
        setIsLogin,
        logout,
        setLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// create custom hook to useContext
export const useUser = () => useContext(UserContext);
