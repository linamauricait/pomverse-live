// src/App.jsx

import React, { useState, useRef } from "react";
import LoginModal from "./components/LoginModal";
import AuthModal from "./components/AuthModal";
import { UserProvider, useUser } from "./components/UserContext";
import { UserAuthProvider, useAuth } from "./components/UserAuthContext";
import { UserXPProvider } from "./components/UserXPContext";
import ConnectWallet from "./components/ConnectWallet";
import RaceModeSelector from "./components/RaceModeSelector";
import TournamentBuilder from "./components/TournamentBuilder";
import SingleRaceSetup from "./components/SingleRaceSetup";
import PomRaceEngine from "./components/PomRaceEngine";
import LandingPage from "./components/LandingPage";
import ComingSoon from "./components/ComingSoon";

// Full-screen background wrapper
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

// Music mute/unmute button style
const muteButtonStyle = {
  position: "absolute",
  top: "1rem",
  right: "1rem",
  background: "rgba(0,0,0,0.6)",
  color: "#fff",
  border: "none",
  padding: "0.5rem",
  borderRadius: "50%",
  cursor: "pointer",
  fontSize: "1.2rem",
  zIndex: 100,
  fontFamily: "'Orbitron', sans-serif",
};

function AppContent() {
  const { userType } = useUser();
  const { currentUser } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [raceMode, setRaceMode] = useState(null); // ✅ allow user to choose
  const [singleConfig, setSingleConfig] = useState(null);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const openLogin = () => setShowLoginModal(true);
  const closeLogin = () => setShowLoginModal(false);
  const closeAuth = () => setShowAuthModal(false);

  const selectMode = (mode) => {
    setRaceMode(mode);
    setSingleConfig(null);
  };

  const startSingle = (cfg) => setSingleConfig(cfg);

  const resetMenu = () => {
    setRaceMode(null);
    setSingleConfig(null);
  };

  // Show ComingSoon after SingleRaceSetup
  if (raceMode === "single" && singleConfig) {
    return <ComingSoon />;
  }

  return (
    <div style={containerStyle}>
      {/* 🎵 Music Toggle */}
      <audio ref={audioRef} src="/audio/pomverse-theme.mp3" loop />
      <button onClick={toggleMusic} style={muteButtonStyle}>
        {isPlaying ? "🔇" : "🔊"}
      </button>

      {/* Before login: show Start Race button */}
      {!currentUser && userType === null ? (
        <button onClick={openLogin}>Start Race</button>
      ) : (
        <>
          {/* Login and Auth Modals */}
          {showLoginModal && (
            <LoginModal
              onChooseGuest={() => {
                closeLogin();
              }}
              onChooseWallet={() => {
                closeLogin();
                setShowAuthModal(true);
              }}
              onClose={closeLogin}
            />
          )}
          {showAuthModal && <AuthModal onClose={closeAuth} />}

          {/* After login: game UI */}
          {(userType === "wallet" || currentUser || userType === "guest") && (
            <>
              {userType === "wallet" && <ConnectWallet />}

              {/* ✅ Mode selection menu */}
              {!raceMode && (
                <RaceModeSelector
                  isGuest={userType === "guest"}
                  onSelectMode={selectMode}
                />
              )}

              {raceMode === "tournament" && <TournamentBuilder />}

              {raceMode === "single" && !singleConfig && (
                <SingleRaceSetup onStartRace={startSingle} />
              )}

              {raceMode === "training" && (
                <PomRaceEngine onExit={resetMenu} />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <UserAuthProvider>
      <UserProvider>
        <UserXPProvider>
          {started ? (
            <AppContent />
          ) : (
            // Landing page wrapped in same background
            <div style={containerStyle}>
              <LandingPage onPlayClick={() => setStarted(true)} />
            </div>
          )}
        </UserXPProvider>
      </UserProvider>
    </UserAuthProvider>
  );
}
