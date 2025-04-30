import React, { useEffect, useState } from "react";
import VictoryScreen from "./VictoryScreen";

const RaceTrack = ({ playerName = "You", npcRacers = [], onFinishRace }) => {
  const [started, setStarted] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [playerPosition, setPlayerPosition] = useState(0);
  const [boosting, setBoosting] = useState(false);
  const [showVictory, setShowVictory] = useState(false);
  const [raceFinished, setRaceFinished] = useState(false);

  const allRacers = [{ name: playerName, isPlayer: true }, ...npcRacers];
  const TOTAL_DISTANCE = 1000;

  // Countdown and movement
  useEffect(() => {
    let countdownTimer, moveInterval;

    if (started && countdown > 0) {
      countdownTimer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    }

    if (started && countdown === 0 && !raceFinished) {
      moveInterval = setInterval(() => {
        setPlayerPosition((prev) => {
          const next = prev + (boosting ? 10 : 5);
          if (next >= TOTAL_DISTANCE) {
            clearInterval(moveInterval);
            setRaceFinished(true);
            setTimeout(() => {
              setShowVictory(true);
              onFinishRace();
            }, 500);
          }
          return next;
        });
      }, 60);
    }

    return () => {
      clearTimeout(countdownTimer);
      clearInterval(moveInterval);
    };
  }, [started, countdown, boosting, raceFinished, onFinishRace]);

  const handleStart = () => {
    setCountdown(3);
    setStarted(true);
    setPlayerPosition(0);
    setShowVictory(false);
    setRaceFinished(false);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        backgroundImage: "url('/images/racetracks/racetrack-city.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "repeat-x",
        backgroundPosition: `${-playerPosition}px center`,
        transition: "background-position 0.05s linear",
        fontFamily: "'Orbitron', sans-serif",
      }}
    >
      {/* Racer: YOU */}
      <img
        src="/images/vehicles/banana-car.png"
        alt="Your Car"
        style={{
          position: "absolute",
          bottom: "10%",
          left: "20%",
          width: "120px",
          transform: boosting ? "scale(1.08)" : "scale(1)",
          transition: "transform 0.1s ease-in-out",
        }}
      />

      {/* Countdown */}
      {started && countdown > 0 && (
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "6rem",
            fontWeight: "bold",
            color: "#fff",
            textShadow: "3px 3px 12px #000",
          }}
        >
          {countdown}
        </div>
      )}

      {/* Start or Boost */}
      {!started && !showVictory && (
        <button onClick={handleStart} style={raceButton("orange")}>
          🏁 Start Race
        </button>
      )}

      {started && countdown === 0 && !showVictory && (
        <button
          onMouseDown={() => setBoosting(true)}
          onMouseUp={() => setBoosting(false)}
          onTouchStart={() => setBoosting(true)}
          onTouchEnd={() => setBoosting(false)}
          style={raceButton("cyan")}
        >
          ⚡ Boost!
        </button>
      )}

      {/* NPC Display (Optional placeholder for future use) */}
      <div
        style={{
          position: "absolute",
          top: "1rem",
          left: "50%",
          transform: "translateX(-50%)",
          color: "#fff",
          fontSize: "1rem",
          background: "rgba(0,0,0,0.4)",
          padding: "0.5rem 1rem",
          borderRadius: "12px",
        }}
      >
        NPCs: {npcRacers.length} | Total Racers: {allRacers.length}
      </div>

      {/* 🎉 Victory Screen */}
      {showVictory && (
        <VictoryScreen
          playerName={playerName}
          level={5}
          xpEarned={50}
          pomxEarned={150}
          time="00:42"
          place={1}
          onRaceAgain={handleStart}
          onExit={onFinishRace}
        />
      )}
    </div>
  );
};

const raceButton = (color) => ({
  position: "absolute",
  bottom: "5%",
  left: "50%",
  transform: "translateX(-50%)",
  padding: "1rem 2rem",
  fontSize: "1.2rem",
  borderRadius: "12px",
  border: "none",
  background: color,
  color: "#000",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 0 12px rgba(255,255,255,0.4)",
  zIndex: 10,
  fontFamily: "'Orbitron', sans-serif",
});

export default RaceTrack;
