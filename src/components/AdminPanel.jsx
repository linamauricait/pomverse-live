import React from "react";
import { useXP } from "./UserXPContext";
import { useAuth } from "./UserAuthContext";

const AdminPanel = () => {
  const { xp, level, totalRaces, totalWins, lastRaceStats, addXP, resetStats } = useXP();
  const { currentUser } = useAuth();

  const handleAddXP = (amount) => {
    addXP(amount);
  };

  return (
    <div
      style={{
        background: "rgba(0,0,0,0.85)",
        color: "#fff",
        padding: "2rem",
        borderRadius: "16px",
        fontFamily: "'Orbitron', sans-serif",
        maxWidth: "600px",
        margin: "3rem auto",
        boxShadow: "0 0 16px rgba(0,255,255,0.3)",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "1.5rem" }}>🛠 PomVerse Admin Panel</h2>

      <p><strong>Admin Email:</strong> {currentUser?.email}</p>
      <p><strong>Total XP:</strong> {xp}</p>
      <p><strong>Level:</strong> {level}</p>
      <p><strong>Total Races:</strong> {totalRaces}</p>
      <p><strong>Total Wins:</strong> {totalWins}</p>

      <div style={{ margin: "1rem 0", textAlign: "left" }}>
        <strong>🧾 Last Race:</strong>
        <ul>
          <li>Time: {lastRaceStats.time || "-"}</li>
          <li>Place: {lastRaceStats.place || "-"}</li>
          <li>XP Earned: {lastRaceStats.xpEarned || "-"}</li>
          <li>$POMX Earned: {lastRaceStats.pomxEarned || "-"}</li>
        </ul>
      </div>

      {/* XP Controls */}
      <div style={{ marginTop: "2rem" }}>
        <h4>💥 XP Actions:</h4>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem" }}>
          <button onClick={() => handleAddXP(50)} style={adminBtn("green")}>+50 XP</button>
          <button onClick={() => handleAddXP(100)} style={adminBtn("blue")}>+100 XP</button>
          <button onClick={() => handleAddXP(500)} style={adminBtn("orange")}>+500 XP</button>
          <button onClick={resetStats} style={adminBtn("red")}>🧹 Reset Stats</button>
        </div>
      </div>
    </div>
  );
};

const adminBtn = (color) => ({
  padding: "0.7rem 1.4rem",
  fontSize: "1rem",
  border: "none",
  borderRadius: "10px",
  background: color,
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
});

export default AdminPanel;
