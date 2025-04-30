import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useAuth } from "./UserAuthContext";

const AuthModal = ({ onClose }) => {
  const { setUserType } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (isNewUser && password !== confirmPassword) {
      alert("❌ Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      if (isNewUser) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setUserType("email");
      onClose();
    } catch (err) {
      alert(`⚠️ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={modalStyle}>
      <div style={cardStyle}>
        <h3 style={{ marginBottom: "1rem" }}>
          {isNewUser ? "Sign Up for PomVerse" : "Sign In to PomVerse"}
        </h3>

        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        {isNewUser && (
          <input
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ ...inputStyle, borderColor: password !== confirmPassword && confirmPassword ? "red" : "#ccc" }}
          />
        )}

        <button onClick={handleSubmit} style={buttonStyle} disabled={loading}>
          {loading ? "Loading..." : isNewUser ? "Create Account" : "Login"}
        </button>

        <button
          onClick={() => setIsNewUser(!isNewUser)}
          style={{ ...buttonStyle, background: "#555" }}
        >
          {isNewUser ? "Already have an account?" : "Create New Account"}
        </button>

        <button onClick={onClose} style={cancelStyle}>
          Cancel
        </button>
      </div>
    </div>
  );
};

const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.85)",
  zIndex: 999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "'Orbitron', sans-serif",
};

const cardStyle = {
  background: "#1e1e1e",
  borderRadius: "16px",
  padding: "2rem",
  color: "#fff",
  textAlign: "center",
  width: "320px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
};

const inputStyle = {
  width: "100%",
  padding: "0.7rem",
  margin: "0.5rem 0",
  borderRadius: "10px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};

const buttonStyle = {
  width: "100%",
  padding: "0.8rem",
  marginTop: "1rem",
  border: "none",
  borderRadius: "10px",
  fontSize: "1rem",
  background: "#00b894",
  color: "#fff",
  cursor: "pointer",
};

const cancelStyle = {
  marginTop: "1rem",
  background: "transparent",
  border: "none",
  color: "#aaa",
  textDecoration: "underline",
  cursor: "pointer",
};

export default AuthModal;
