import React, { useState } from "react";
import PomCard from "./PomCard";
import DraggableWrapper from "./DraggableWrapper";

const TournamentBuilder = () => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [entryFee, setEntryFee] = useState(100);
  const [customFee, setCustomFee] = useState("");
  const [selectedPom, setSelectedPom] = useState("CyberPom");
  const [selectedCar, setSelectedCar] = useState("Banana Car");

  const presetFees = [100, 1000, 10000];

  const handleCustomFee = (e) => {
    const value = e.target.value;
    setCustomFee(value);
    setEntryFee(Number(value));
  };

  const startTournament = () => {
    const roomData = {
      isPrivate,
      roomCode: isPrivate ? roomCode : "Public",
      entryFee,
      selectedPom,
      selectedCar,
    };
    console.log("🏁 Tournament Created:", roomData);
    alert("✅ Tournament created! (Check console for details)");
  };

  return (
    <DraggableWrapper>
      <div
        className="drag-handle"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          padding: "2rem",
          width: "min(90%, 700px)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 25px rgba(0,255,255,0.1)",
          fontFamily: "'Orbitron', sans-serif",
          color: "#fff",
          cursor: "move",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          🏆 Create Tournament Room
        </h2>

        <div style={{ marginBottom: "1rem" }}>
          <label>
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={() => setIsPrivate(!isPrivate)}
            />{" "}
            Make Room Private
          </label>
        </div>

        {isPrivate && (
          <div style={{ marginBottom: "1rem" }}>
            <input
              type="text"
              placeholder="Enter room code"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              style={inputStyle}
            />
          </div>
        )}

        {/* Entry Fee */}
        <div style={{ marginBottom: "1rem" }}>
          <strong>💰 Entry Fee ($POMX):</strong>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
            {presetFees.map((fee) => (
              <button
                key={fee}
                onClick={() => {
                  setEntryFee(fee);
                  setCustomFee("");
                }}
                style={{
                  ...buttonStyle,
                  background: entryFee === fee ? "#00b894" : "#2c2c2c",
                }}
              >
                {fee}
              </button>
            ))}
          </div>
          <input
            type="number"
            placeholder="Custom amount"
            value={customFee}
            onChange={handleCustomFee}
            style={{ ...inputStyle, marginTop: "0.5rem" }}
          />
        </div>

        {/* Pom Selection */}
        <div style={{ marginBottom: "1rem" }}>
          <strong>🐶 Choose Your Pom:</strong>
          <select
            value={selectedPom}
            onChange={(e) => setSelectedPom(e.target.value)}
            style={inputStyle}
          >
            <option>CyberPom</option>
            <option>Sniffler</option>
            <option>GoldenPom</option>
          </select>
        </div>

        {/* Car Selection */}
        <div style={{ marginBottom: "1.5rem" }}>
          <strong>🚗 Choose Your Vehicle:</strong>
          <select
            value={selectedCar}
            onChange={(e) => setSelectedCar(e.target.value)}
            style={inputStyle}
          >
            <option>Banana Car</option>
            <option>G-Wagon</option>
            <option>Stone Age Mobile</option>
            <option>Maserati</option>
            <option>McLaren POMX</option>
          </select>
        </div>

        {/* Card Preview */}
        <div style={{ margin: "2rem auto", display: "flex", justifyContent: "center" }}>
          <PomCard
            name="You"
            level={4}
            xp={60}
            vehicle={selectedCar}
            pom={selectedPom}
            avatar={`/images/poms/${selectedPom.toLowerCase()}.png`}
          />
        </div>

        <button
          onClick={startTournament}
          style={{
            ...buttonStyle,
            width: "100%",
            background: "#1f8ef1",
            marginTop: "1rem",
          }}
        >
          🚀 Start Tournament
        </button>
      </div>
    </DraggableWrapper>
  );
};

const inputStyle = {
  width: "100%",
  padding: "0.6rem",
  borderRadius: "10px",
  border: "none",
  fontSize: "1rem",
  background: "#1a1a1a",
  color: "#fff",
  marginTop: "0.25rem",
};

const buttonStyle = {
  padding: "0.6rem 1.2rem",
  fontSize: "1rem",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  transition: "0.2s ease",
};

export default TournamentBuilder;
