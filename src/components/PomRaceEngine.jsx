import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import PomCar from "./PomCar";
import PomTrack from "./PomTrack";

function CameraFollow({ targetRef }) {
  const { camera } = useThree();

  useFrame(() => {
    if (!targetRef.current) return;
    const car = targetRef.current;

    const offset = new THREE.Vector3(0, 5, -10);
    const desired = car.position.clone().add(offset.applyQuaternion(car.quaternion));

    camera.position.lerp(desired, 0.1);
    camera.lookAt(car.position);
  });

  return null;
}

const PomRaceEngine = () => {
  const carRef = useRef();
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "#000" }}>
      {/* 👇 Pre-race Start Button */}
      {!started && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(0,0,0,0.8)",
            padding: "2rem",
            borderRadius: "12px",
            fontFamily: "'Orbitron', sans-serif",
            color: "#fff",
            zIndex: 10,
            textAlign: "center",
          }}
        >
          <h2>Ready to race?</h2>
          <button
            onClick={handleStart}
            style={{
              marginTop: "1rem",
              padding: "1rem 2rem",
              fontSize: "1.2rem",
              background: "#00b894",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            🚀 Start Race
          </button>
        </div>
      )}

      {/* 🎮 Main 3D Canvas */}
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 60 }}>
        {/* 💡 Lights */}
        <ambientLight intensity={0.4} />
        <directionalLight
          castShadow
          position={[10, 20, 10]}
          intensity={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {/* 🎯 Core Scene */}
        <Suspense fallback={null}>
          <PomTrack />
          {started && <PomCar ref={carRef} />}
          {started && <CameraFollow targetRef={carRef} />}
          {/* 🛑 Using a safe preset instead of HDRI that fails */}
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default PomRaceEngine;
