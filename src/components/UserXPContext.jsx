import React, { createContext, useContext, useState } from "react";

const UserXPContext = createContext();

export const UserXPProvider = ({ children }) => {
  const [xp, setXp] = useState(0);
  const [totalRaces, setTotalRaces] = useState(0);
  const [totalWins, setTotalWins] = useState(0);
  const [lastRaceStats, setLastRaceStats] = useState({
    time: null,
    place: null,
    xpEarned: 0,
    pomxEarned: 0,
  });

  const level = Math.floor(xp / 100) + 1;
  const progressToNext = xp % 100;

  const addXP = (amount) => {
    setXp((prev) => prev + amount);
  };

  const addRace = () => {
    setTotalRaces((prev) => prev + 1);
  };

  const addWin = () => {
    setTotalWins((prev) => prev + 1);
  };

  const setRaceResults = ({ time, place, xpEarned, pomxEarned }) => {
    setLastRaceStats({ time, place, xpEarned, pomxEarned });
    addXP(xpEarned);
    addRace();
    if (place === 1) addWin();
  };

  const resetStats = () => {
    setXp(0);
    setTotalRaces(0);
    setTotalWins(0);
    setLastRaceStats({ time: null, place: null, xpEarned: 0, pomxEarned: 0 });
  };

  return (
    <UserXPContext.Provider
      value={{
        xp,
        level,
        progressToNext,
        totalRaces,
        totalWins,
        lastRaceStats,
        addXP,
        addRace,
        addWin,
        setRaceResults,
        resetStats,
      }}
    >
      {children}
    </UserXPContext.Provider>
  );
};

export const useXP = () => useContext(UserXPContext);
