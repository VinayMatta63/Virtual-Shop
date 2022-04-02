import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { PerspectiveCamera } from "three";
import "./App.css";
import Body from "./components/Body";
import Floor from "./components/Floor";

function App() {
  const cameraRef = useRef(
    new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  );
  const positionRef = useRef([0, 0, 0]);

  cameraRef.current.position.y = 7;

  return (
    <Canvas style={{ height: "100vh" }} camera={cameraRef.current}>
      {/* <OrbitControls camera={cameraRef.cuwrrent} /> */}
      <ambientLight />
      {/* <pointLight castShadow position={[10, 10, 10]} args={["white", 0.5]} /> */}
      <Physics gravity={[0, -9.82, 0]}>
        <Body ref={positionRef} cameraRef={cameraRef} />
        <Floor />
      </Physics>
    </Canvas>
  );
}

export default App;
