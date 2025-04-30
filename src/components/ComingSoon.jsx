// src/components/ComingSoon.jsx

import React from "react";

export default function ComingSoon() {
  return (
    <div style={styles.container}>
      <div style={styles.text}>🏁 Coming Soon 🏁</div>
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  text: {
    color: "#fff",
    fontSize: "3rem",
    fontFamily: "'Orbitron', sans-serif",
    textAlign: "center",
  },
};
