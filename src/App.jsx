// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { UserProvider } from "./components/UserContext";
import { UserAuthProvider } from "./components/UserAuthContext";
import { UserXPProvider } from "./components/UserXPContext";
import LandingPage from "./components/LandingPage";
import ComingSoon from "./components/ComingSoon";
import AppContent from "./components/AppContent"; // make sure this is the full game logic

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

function Routing() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div style={containerStyle}>
            <LandingPage onPlayClick={() => navigate("/coming-soon")} />
          </div>
        }
      />
      <Route path="/coming-soon" element={<ComingSoon />} />
      <Route path="/app" element={<AppContent />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <UserAuthProvider>
        <UserProvider>
          <UserXPProvider>
            <Routing />
          </UserXPProvider>
        </UserProvider>
      </UserAuthProvider>
    </Router>
  );
}
