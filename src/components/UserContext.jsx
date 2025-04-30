import React, { createContext, useContext, useState } from "react";

// Types of users: 'guest', 'wallet', null (not logged in)
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState(null); // null = not logged in

  const loginAsGuest = () => setUserType("guest");
  const loginWithWallet = () => setUserType("wallet");
  const logout = () => setUserType(null);

  return (
    <UserContext.Provider
      value={{
        userType,
        loginAsGuest,
        loginWithWallet,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
