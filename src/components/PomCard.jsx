import React from "react";
import { useXP } from "./UserXPContext";

const PomCard = ({
  name = "Sniffler",
  pom = "CyberPom",
  vehicle = "Banana Car",
  avatar = `/images/poms/cyberpom.png`,
}) => {
  const { level, xp, progressToNext } = useXP();

  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255,255,255,0.15)",
        backdropFilter: "blur(12px)",
        borderRadius: "20px",
        padding: "1.5rem",
        width: "320px",
        fontFamily: "'Orbitron', sans-serif",
        color: "#fff",
        boxShadow: "0 0 20px rgba(0,255,255,0.15)",
        textAlign: "center",
        transition: "0.3s ease",
      }}
    >
      {/* Avatar */}
      <div style={{ marginBottom: "1rem" }}>
        <img
          src={avatar}
          alt={pom}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #00f0ff",
            boxShadow: "0 0 12px rgba(0,255,255,0.6)",
          }}
        />
      </div>

      {/* Name + Level */}
      <h3 style={{ marginBottom: "0.3rem", fontSize: "1.3rem" }}>{name}</h3>
      <p style={{ margin: "0.2rem 0" }}>
        🪪 Level {level} – {getRank(level)}
      </p>

      {/* Vehicle + Pom */}
      <p style={{ margin: "0.2rem 0" }}>🚗 {vehicle}</p>
      <p style={{ margin: "0.2rem 0" }}>🐶 {pom}</p>

      {/* XP Bar */}
      <div style={{ marginTop: "1rem" }}>
        <strong>🔋 XP:</strong>
        <div
          style={{
            background: "#222",
            borderRadius: "10px",
            overflow: "hidden",
            height: "12px",
            marginTop: "0.3rem",
          }}
        >
          <div
            style={{
              width: `${(progressToNext / 100) * 100}%`,
              background: "linear-gradient(90deg, #00f0ff, #007cf0)",
              height: "100%",
              transition: "width 0.4s ease-in-out",
            }}
          />
        </div>
      </div>
    </div>
  );
};

const getRank = (level) => {
  if (level >= 10) return "🌌 Galaxy";
  if (level >= 7) return "💎 Diamond";
  if (level >= 5) return "🏆 Gold";
  if (level >= 3) return "🥈 Silver";
  return "🥉 Bronze";
};

export default PomCard;
