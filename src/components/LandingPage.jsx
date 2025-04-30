// src/components/LandingPage.jsx

import React, { useState, useRef } from "react";

export default function LandingPage({ onPlayClick }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div style={styles.container}>
      {/* 🎵 Background Music */}
      <audio ref={audioRef} src="/audio/pomverse-theme.mp3" loop />
      <button onClick={toggleMusic} style={styles.muteButton}>
        {isPlaying ? "🔇" : "🔊"}
      </button>

      {/* 🏁 Title */}
      <h1 style={styles.title}>🏁 Welcome to PomVerse 🐶</h1>
      <p style={styles.subtitle}>
        The meme-fueled racing revolution. Powered by $POMX.
      </p>

      {/* 🚀 Play and Buy Buttons */}
      <div style={styles.buttons}>
        <button style={styles.button} onClick={onPlayClick}>
          🚀 Play Now
        </button>
        <a
          style={{ ...styles.button, background: "#1f8ef1" }}
          href="https://app.uniswap.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          💱 Buy $POMX
        </a>
      </div>

      {/* 🐾 About Section */}
      <div style={styles.section}>
        <h2>🐾 About PomVerse</h2>
        <p>
          PomVerse is a meme-fueled Web3 racing game built on Ethereum. Race your Pom, customize your car, climb the leaderboard.
          Whether you're a holder of $POMX or just love Pomeranians in banana cars — you're in the right place.
        </p>
      </div>

      {/* 🛠 Tokenomics */}
      <div style={styles.section}>
        <h2>🛠 Tokenomics</h2>
        <ul>
          <li>Total Supply: 1,000,000,000 $POMX</li>
          <li>80% Liquidity (available for gameplay & market) / 20% Founder Wallet</li>
          <li>No taxes, no burns — pure racing fuel</li>
        </ul>
      </div>

      {/* 🎮 How to Play */}
      <div style={styles.section}>
        <h2>🎮 How to Play</h2>
        <ol>
          <li>Connect your wallet (MetaMask)</li>
          <li>Select your Pom and vehicle</li>
          <li>Choose race mode: training, single, or tournament</li>
          <li>🏁 Hit the track and earn XP, skins, and $POMX</li>
        </ol>
        <p><em>🚧 Coming soon – gameplay features are under development!</em></p>
      </div>

      {/* 📈 Roadmap */}
      <div style={styles.section}>
        <h2>📈 Roadmap</h2>
        <ul>
          <li>Phase 1: Token Launch + Website</li>
          <li>Phase 2: Playable Race Demo</li>
          <li>Phase 3: Multiplayer Tournaments</li>
          <li>Phase 4: Full PomVerse Expansion</li>
        </ul>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        © 2025 PomVerse. Built for the racers.
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "2rem",
    color: "#fff",
    fontFamily: "'Orbitron', sans-serif",
    minHeight: "100vh",
    backgroundImage: "url('/images/pomerace-bg.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    position: "relative",
  },
  muteButton: {
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
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    color: "#ccc",
  },
  buttons: {
    marginBottom: "2rem",
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    flexWrap: "wrap",
  },
  button: {
    background: "#00b894",
    border: "none",
    padding: "1rem 2rem",
    borderRadius: "12px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "0.3s",
    textDecoration: "none",
  },
  section: {
    marginTop: "3rem",
    background: "rgba(0,0,0,0.6)",
    padding: "2rem",
    borderRadius: "12px",
    maxWidth: "800px",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "left",
  },
  footer: {
    marginTop: "4rem",
    fontSize: "0.9rem",
    color: "#aaa",
  },
};
