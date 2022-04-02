import React, { useRef } from "react";
import Entrance from "./Entrance";
import IntroText from "./IntroText";
import Movement from "../common/Movement";

const Welcome = ({ cameraRef }) => {
  const entranceRef = useRef(null);
  return (
    <group>
      <ambientLight args={["white", 1]} />
      <directionalLight args={["cyan", 0.6]} position={[0, 0, 28]} />
      <pointLight args={["white", 0.3, 50, 0.5]} position={[0, 10, -50]} />
      <IntroText />
      <Entrance ref={entranceRef} />
      <Movement cameraRef={cameraRef} objectRef={entranceRef} />
    </group>
  );
};

export default Welcome;
