import React, { useState } from "react";
import RaceLobby from "./RaceLobby";
import RaceTrack from "./RaceTrack";
import VictoryScreen from "./VictoryScreen";

const RaceLauncher = ({ currentPlayers = 1, playerName = "Sniffler" }) => {
  const [phase, setPhase] = useState("lobby"); // lobby, racing, victory
  const [npcRacers, setNpcRacers] = useState([]);

  const startRace = (selectedNPCs) => {
    setNpcRacers(selectedNPCs);
    setPhase("racing");
  };

  const finishRace = (results = {}) => {
    setPhase("victory");
  };

  const reset = () => {
    setPhase("lobby");
    setNpcRacers([]);
  };

  return (
    <>
      {phase === "lobby" && (
        <RaceLobby currentPlayers={currentPlayers} onStartRace={startRace} />
      )}

      {phase === "racing" && (
        <RaceTrack
          playerName={playerName}
          npcRacers={npcRacers}
          onFinishRace={finishRace}
        />
      )}

      {phase === "victory" && (
        <VictoryScreen
          playerName={playerName}
          level={5}
          xpEarned={50}
          pomxEarned={150}
          time="00:42"
          place={1}
          onRaceAgain={reset}
          onExit={reset}
        />
      )}
    </>
  );
};

export default RaceLauncher;
