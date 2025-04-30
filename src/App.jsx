import React from "react";

const ComingSoon = ({ onBack }) => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "4rem",
        color: "#fff",
        fontFamily: "'Orbitron', sans-serif",
      }}
    >
      <h1>🚧 Coming Soon</h1>
      <p>This feature is under development. Check back soon!</p>

      {onBack && (
        <button
          onClick={onBack}
          style={{
            marginTop: "2rem",
            padding: "1rem 2rem",
            background: "#1f8ef1",
            border: "none",
            borderRadius: "10px",
            color: "#fff",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          🔙 Back to Home
        </button>
      )}
    </div>
  );
};

export default ComingSoon;
