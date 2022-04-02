import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { PerspectiveCamera } from "three";
import "./App.css";
import Body from "./components/Body";
import Floor from "./components/Floor";
import Entrance from "./components/Entrance";

function App() {
  const cameraRef = useRef(
    new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500)
  );
  const positionRef = useRef([0, 0, 0]);
  const entranceRef = useRef(null);
  cameraRef.current.position.y = 7;

  return (
    <Canvas style={{ height: "100vh" }} camera={cameraRef.current}>
      <ambientLight args={["white", 1]} />
      <directionalLight args={["cyan", 0.6]} position={[0, 0, 28]} />
      <Physics gravity={[0, -9.82, 0]}>
        <Suspense fallback={null}>
          <Body
            ref={positionRef}
            cameraRef={cameraRef}
            entranceRef={entranceRef}
          />
          <Floor />
          <Entrance ref={entranceRef} />
        </Suspense>
      </Physics>
    </Canvas>
  );
}

export default App;
