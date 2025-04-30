import React, { useState } from "react";
import PomCard from "./PomCard";
import DraggableWrapper from "./DraggableWrapper";

export default function SingleRaceSetup({ onStartRace }) {
  const [selectedPom, setSelectedPom] = useState("CyberPom");
  const [selectedCar, setSelectedCar] = useState("Banana Car");
  const [selectedTrack, setSelectedTrack] = useState("city");

  const handleStart = () =>
    onStartRace({ pom: selectedPom, car: selectedCar, track: selectedTrack });

  return (
    <DraggableWrapper>
      <div className="drag-handle" style={styles.container}>
        <h2 style={styles.title}>🏁 Single Race Setup</h2>
        <div style={styles.content}>
          <div style={styles.fields}>
            <div style={styles.field}>
              <label style={styles.label}>🗺 Track</label>
              <select
                value={selectedTrack}
                onChange={e => setSelectedTrack(e.target.value)}
                style={styles.input}
              >
                <option value="city">Neon City</option>
                <option value="winter">Icy Drift</option>
                <option value="desert">Sand Blaster</option>
              </select>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>🐶 Pom</label>
              <select
                value={selectedPom}
                onChange={e => setSelectedPom(e.target.value)}
                style={styles.input}
              >
                <option>CyberPom</option>
                <option>Sniffler</option>
                <option>GoldenPom</option>
              </select>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>🚗 Vehicle</label>
              <select
                value={selectedCar}
                onChange={e => setSelectedCar(e.target.value)}
                style={styles.input}
              >
                <option>Banana Car</option>
                <option>G-Wagon</option>
                <option>Stone Age Mobile</option>
                <option>Maserati</option>
                <option>McLaren POMX</option>
              </select>
            </div>
          </div>

          <div style={styles.preview}>
            <PomCard
              name="You"
              level={1}
              xp={0}
              vehicle={selectedCar}
              pom={selectedPom}
              avatar={`/images/poms/${selectedPom.toLowerCase()}.png`}
            />
            <button onClick={handleStart} style={styles.button}>
              🚦 Start Race
            </button>
          </div>
        </div>
      </div>
    </DraggableWrapper>
  );
}

const styles = {
  container: {
    background: "rgba(0,0,0,0.7)",
    padding: "1rem",
    borderRadius: "20px",
    width: "min(90%,600px)",
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    cursor: "move",
  },
  title: {
    textAlign: "center",
    margin: "0 0 1rem",
    fontSize: "1.25rem",
    color: "#fff",
  },
  content: {
    flex: 1,
    display: "flex",
    gap: "1rem",
  },
  fields: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "0.5rem",
    color: "#fff",
  },
  input: {
    padding: "0.5rem",
    borderRadius: "8px",
    border: "none",
    background: "#1a1a1a",
    color: "#fff",
  },
  preview: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    padding: "0.8rem 1.5rem",
    background: "#00b894",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
  },
};
