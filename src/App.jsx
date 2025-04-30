// src/App.jsx

import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import ComingSoon from "./components/ComingSoon";
import { UserProvider } from "./components/UserContext";
import { UserAuthProvider } from "./components/UserAuthContext";
import { UserXPProvider } from "./components/UserXPContext";

const containerStyle = {
  fontFamily: "'Orbitron', sans-serif",
  width: "100vw",
  height: "100vh",
  backgroundImage: "url('/images/pomerace-bg.jpg')",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  boxSizing: "border-box",
  overflowY: "auto",
};

export default function App() {
  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <UserAuthProvider>
      <UserProvider>
        <UserXPProvider>
          <div style={containerStyle}>
            {showComingSoon ? (
              <ComingSoon />
            ) : (
              <LandingPage onPlayClick={() => setShowComingSoon(true)} />
            )}
          </div>
        </UserXPProvider>
      </UserProvider>
    </UserAuthProvider>
  );
}
