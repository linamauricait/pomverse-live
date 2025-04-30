import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

// Create the context
const UserAuthContext = createContext();

// Provider component
export const UserAuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Firebase user object
  const [userType, setUserType] = useState(null); // "wallet", "email", or "guest"
  const [isAdmin, setIsAdmin] = useState(false); // 🔐 Admin flag

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setUserType("email");

        // 🔐 ADMIN EMAIL LOGIC
        if (user.email === "glorypakota@gmail.com") {
          setIsAdmin(true);
          console.log("✅ Admin access granted.");
        } else {
          setIsAdmin(false);
        }
      } else {
        setCurrentUser(null);
        setUserType(null);
        setIsAdmin(false);
      }
    });

    return () => unsub();
  }, []);

  return (
    <UserAuthContext.Provider value={{ currentUser, userType, isAdmin, setUserType }}>
      {children}
    </UserAuthContext.Provider>
  );
};

// Custom hook for easy access
export const useAuth = () => useContext(UserAuthContext);
