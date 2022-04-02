import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { PerspectiveCamera } from "three";
import "./App.css";
import Welcome from "./components/Welcome";

function App() {
  const cameraRef = useRef(
    new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500)
  );
  const positionRef = useRef([0, 0, 0]);
  cameraRef.current.position.y = 7;

  return (
    <div>
      {window.innerWidth < 768 && (
        <div
          style={{
            position: "absolute",
            zIndex: 101,
            bottom: "100px",
            left: "100px",
          }}
          id="joystick-zone"
        />
      )}

      <Canvas style={{ height: "100vh" }} camera={cameraRef.current}>
        <Physics gravity={[0, -9.82, 0]}>
          <Suspense fallback={null}>
            <Welcome ref={positionRef} cameraRef={cameraRef} />
          </Suspense>
        </Physics>
      </Canvas>
    </div>
  );
}

export default App;
