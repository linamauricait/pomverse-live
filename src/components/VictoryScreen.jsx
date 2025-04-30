import React, { useEffect } from "react";
import { useXP } from "./UserXPContext"; // ✅ Corrected path

const VictoryScreen = ({
  playerName = "Sniffler",
  level = 1,
  xpEarned = 50,
  pomxEarned = 150,
  time = "00:45",
  place = 1,
  onRaceAgain,
  onExit,
}) => {
  const { setRaceResults } = useXP();

  useEffect(() => {
    setRaceResults({
      time,
      place,
      xpEarned,
      pomxEarned,
    });
  }, [setRaceResults, time, place, xpEarned, pomxEarned]);

  const tweetVictory = () => {
    const tweetText = `🏁 I just won in #PomVerse!\n💥 +${xpEarned} XP | 💰 ${pomxEarned} $POMX\nLevel ${level} Pom Racer!\n🚀 Race with us: https://pomverse.app`;
    const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetURL, "_blank");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.9)",
        color: "#fff",
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Orbitron', sans-serif",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem", color: "#00f0ff" }}>
        🎉 Victory!
      </h1>

      <p style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
        🚗 Racer: <strong>{playerName}</strong>
      </p>
      <p style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
        🏆 Position: <strong>{place === 1 ? "🥇 1st Place" : `${place}th Place`}</strong>
      </p>
      <p style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
        🔋 XP Earned: <strong>+{xpEarned}</strong>
      </p>
      <p style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
        💰 $POMX Won: <strong>{pomxEarned}</strong>
      </p>
      <p style={{ fontSize: "1.25rem", marginBottom: "1.2rem" }}>
        ⏱ Time: <strong>{time}</strong>
      </p>

      <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
        <button onClick={onRaceAgain} style={victoryButtonStyle("#1f8ef1")}>
          🔁 Race Again
        </button>
        <button onClick={onExit} style={victoryButtonStyle("#ff7675")}>
          🏠 Return to Lobby
        </button>
        <button onClick={tweetVictory} style={victoryButtonStyle("#00cec9")}>
          📤 Share
        </button>
      </div>
    </div>
  );
};

const victoryButtonStyle = (color) => ({
  padding: "0.8rem 1.5rem",
  background: color,
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontSize: "1rem",
  cursor: "pointer",
  boxShadow: "0 0 12px rgba(255,255,255,0.2)",
  transition: "transform 0.2s ease",
});

export default VictoryScreen;
