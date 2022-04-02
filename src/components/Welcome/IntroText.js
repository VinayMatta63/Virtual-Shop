import { Html } from "@react-three/drei";
import React, { useMemo } from "react";
import { MeshBasicMaterial } from "three";

const IntroText = () => {
  const spriteStyles = {
    color: "#fff",
    backgroundColor: "rgba(0,0,0,0.5)",
    fontSize: "30px",
    padding: "50px 80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  };
  const mat = useMemo(() => new MeshBasicMaterial({ color: "blue" }), []);
  return (
    <group>
      <Html sprite style={spriteStyles} position={[0, 7, 0]} transform>
        {
          <>
            <span style={{ fontSize: "50px" }}>
              Welcome to the Virtual Shop
            </span>
            <br />
            <span>Move: WASD</span>
            <span>Sprint: Shift</span>
          </>
        }
      </Html>
      <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 15, 0]}>
        <mesh material={mat}>
          <cylinderBufferGeometry args={[0.2, 0.2, 5]} />
        </mesh>
        <mesh position={[0, 3.5, 0]} material={mat}>
          <coneBufferGeometry args={[0.6, 3]} />
        </mesh>
      </group>
    </group>
  );
};

export default IntroText;
