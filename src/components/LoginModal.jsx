import React from "react";
import { useUser } from "./UserContext";

const LoginModal = ({ onChooseGuest, onClose }) => {
  const { loginWithWallet } = useUser();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
      }}
    >
      <div
        style={{
          background: "#1e1e1e",
          borderRadius: "16px",
          padding: "2rem",
          width: "90%",
          maxWidth: "450px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          textAlign: "center",
          fontFamily: "'Orbitron', sans-serif",
          color: "#fff",
        }}
      >
        <h2 style={{ marginBottom: "1.5rem" }}>🕹️ How do you want to race?</h2>

        <button
          style={buttonStyle("#1f8ef1")}
          onClick={loginWithWallet}
        >
          🔗 Connect Wallet
        </button>

        <button
          style={buttonStyle("#00b894")}
          onClick={() => alert("📧 Email sign-in coming soon")}
        >
          📧 Sign in with Email
        </button>

        <button
          style={buttonStyle("#fdcb6e", "#000")}
          onClick={onChooseGuest}
        >
          🎮 Continue as Guest
        </button>

        <button
          style={{
            marginTop: "1.5rem",
            background: "transparent",
            color: "#aaa",
            border: "none",
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const buttonStyle = (bg, color = "#fff") => ({
  width: "100%",
  padding: "1rem",
  marginBottom: "1rem",
  fontSize: "1rem",
  background: bg,
  color,
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  transition: "transform 0.2s ease",
  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
});

export default LoginModal;
