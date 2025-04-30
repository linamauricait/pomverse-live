import React from "react";

const PomTrack = () => {
  const segments = [];
  const wallHeight = 1.5;
  const radius = 30;

  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const rotation = -angle;

    // 🛣 Track segment
    segments.push(
      <mesh
        key={`road-${i}`}
        position={[x, 0, z]}
        rotation={[0, rotation, 0]}
        receiveShadow
      >
        <boxGeometry args={[10, 0.1, 5]} />
        <meshStandardMaterial color="#222" />
      </mesh>
    );

    // 🧱 Left wall
    const lx = Math.cos(angle + 0.04) * (radius + 3);
    const lz = Math.sin(angle + 0.04) * (radius + 3);
    segments.push(
      <mesh
        key={`wall-left-${i}`}
        position={[lx, wallHeight / 2, lz]}
        rotation={[0, rotation, 0]}
        castShadow
      >
        <boxGeometry args={[1, wallHeight, 5]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    );

    // 🧱 Right wall
    const rx = Math.cos(angle - 0.04) * (radius - 3);
    const rz = Math.sin(angle - 0.04) * (radius - 3);
    segments.push(
      <mesh
        key={`wall-right-${i}`}
        position={[rx, wallHeight / 2, rz]}
        rotation={[0, rotation, 0]}
        castShadow
      >
        <boxGeometry args={[1, wallHeight, 5]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    );

    // 🪜 Optional fence effect on outer wall
    segments.push(
      <mesh
        key={`fence-${i}`}
        position={[lx, wallHeight + 0.5, lz]}
        rotation={[0, rotation, 0]}
      >
        <boxGeometry args={[1, 0.1, 5]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.4} />
      </mesh>
    );
  }

  return <group>{segments}</group>;
};

export default PomTrack;
