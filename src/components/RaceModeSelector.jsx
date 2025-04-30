import React from "react";
import DraggableWrapper from "./DraggableWrapper";

const RaceModeSelector = ({ onSelectMode, isGuest }) => {
  return (
    <DraggableWrapper>
      <div
        className="drag-handle"
        style={{
          padding: "2rem",
          textAlign: "center",
          background: "rgba(0,0,0,0.7)",
          color: "#fff",
          borderRadius: "16px",
          fontFamily: "'Orbitron', sans-serif",
          width: "min(90%, 500px)",
          boxShadow: "0 0 12px rgba(0,255,255,0.2)",
          cursor: "move",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>🎮 Choose Your Race Mode</h2>

        {!isGuest && (
          <>
            <button onClick={() => onSelectMode("single")} style={buttonStyle}>
              🏁 Single Race
            </button>
            <button onClick={() => onSelectMode("tournament")} style={buttonStyle}>
              🏆 Tournament Mode
            </button>
          </>
        )}

        <button
          onClick={() => onSelectMode("training")}
          style={{
            ...buttonStyle,
            background: isGuest ? "#888" : "#1f8ef1",
          }}
        >
          🧠 Training Mode {isGuest ? "(Guest Only)" : ""}
        </button>
      </div>
    </DraggableWrapper>
  );
};

const buttonStyle = {
  width: "100%",
  padding: "1rem",
  fontSize: "1.1rem",
  margin: "0.5rem 0",
  border: "none",
  borderRadius: "12px",
  background: "#00b894",
  color: "#fff",
  cursor: "pointer",
  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
};

export default RaceModeSelector;
