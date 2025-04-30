import React, { useState } from "react";
import npcList from "../data/npcList";
import DraggableWrapper from "./DraggableWrapper";

const RaceLobby = ({ currentPlayers = 1, onStartRace }) => {
  const [selectedNPCs, setSelectedNPCs] = useState([]);

  const totalSlots = 8;
  const openSlots = totalSlots - currentPlayers;

  const toggleNPC = (npc) => {
    if (selectedNPCs.includes(npc)) {
      setSelectedNPCs((prev) => prev.filter((n) => n !== npc));
    } else if (selectedNPCs.length < openSlots) {
      setSelectedNPCs((prev) => [...prev, npc]);
    }
  };

  const fillRandomNPCs = () => {
    const needed = openSlots - selectedNPCs.length;
    const remaining = npcList.filter((npc) => !selectedNPCs.includes(npc));
    const shuffled = remaining.sort(() => 0.5 - Math.random());
    setSelectedNPCs([...selectedNPCs, ...shuffled.slice(0, needed)]);
  };

  const allRacersReady = currentPlayers + selectedNPCs.length === totalSlots;

  return (
    <DraggableWrapper>
      <div
        className="drag-handle"
        style={{
          padding: "1.5rem",
          background: "rgba(0,0,0,0.8)",
          borderRadius: "20px",
          color: "#fff",
          fontFamily: "'Orbitron', sans-serif",
          width: "min(90%, 800px)",
          maxHeight: "80vh",
          overflowY: "auto",
          boxShadow: "0 0 20px rgba(0,255,255,0.2)",
          cursor: "move",
        }}
      >
        <h2 style={{ textAlign: "center" }}>🏁 Race Lobby</h2>
        <p style={{ textAlign: "center", marginBottom: "1rem" }}>
          Select up to {openSlots} NPCs. Tap again to remove.
        </p>

        {/* NPC Selection */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.5rem",
          }}
        >
          {npcList.map((npc, idx) => {
            const selected = selectedNPCs.includes(npc);
            return (
              <div
                key={idx}
                onClick={() => toggleNPC(npc)}
                style={{
                  cursor: "pointer",
                  padding: "0.5rem",
                  fontSize: "0.9rem",
                  textAlign: "center",
                  background: selected ? "#00b894" : "#2c2c2c",
                  borderRadius: "10px",
                  userSelect: "none",
                }}
              >
                {npc.name}
              </div>
            );
          })}
        </div>

        {/* Random Fill */}
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <button
            onClick={fillRandomNPCs}
            style={{
              padding: "0.8rem 2rem",
              fontSize: "1rem",
              background: "#1f8ef1",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              marginTop: "1rem",
              cursor: "pointer",
            }}
          >
            🎲 Random Fill
          </button>
        </div>

        {/* Selected NPC Preview */}
        <h3 style={{ marginTop: "2rem", textAlign: "center" }}>
          Selected NPCs: {selectedNPCs.length} / {openSlots}
        </h3>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          {selectedNPCs.map((npc, idx) => (
            <div
              key={idx}
              style={{
                background: "#222",
                padding: "1rem",
                borderRadius: "12px",
                width: "130px",
                textAlign: "center",
                fontSize: "0.9rem",
              }}
            >
              <img
                src={npc.avatar}
                alt={npc.name}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  marginBottom: "0.5rem",
                }}
              />
              <div>{npc.name}</div>
              <small>{npc.vehicle}</small>
            </div>
          ))}
        </div>

        {/* Start Race Button */}
        {allRacersReady && (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <button
              onClick={() => onStartRace(selectedNPCs)}
              style={{
                padding: "1rem 3rem",
                fontSize: "1.2rem",
                background: "#ff6b81",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                boxShadow: "0 0 12px rgba(255,255,255,0.2)",
              }}
            >
              🚀 Start Race with Selected NPCs
            </button>
          </div>
        )}
      </div>
    </DraggableWrapper>
  );
};

export default RaceLobby;
