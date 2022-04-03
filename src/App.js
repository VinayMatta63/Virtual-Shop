import { Physics } from "@react-three/cannon";
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { PerspectiveCamera } from "three";
import "./App.css";
import Welcome from "./components/welcome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useStore from "./store";
import Movement from "./components/common/Movement";
import Shop from "./components/shop";

const dispatchSelector = (state) => state.dispatch;

function App() {
  const cameraRef = useRef(
    new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500)
  );
  cameraRef.current.position.y = 7;
  const dispatch = useStore(dispatchSelector);

  useEffect(() => {
    dispatch({ type: "SETCAM", payload: cameraRef });
  }, []);

  return (
    <div id="cover">
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

      <Canvas
        frameloop="demand"
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        style={{ height: "100vh" }}
        camera={cameraRef.current}
      >
        <Physics gravity={[0, -9.82, 0]}>
          <BrowserRouter>
            <Suspense fallback={null}>
              <ambientLight args={["white", 0.6]} />
              <Movement />
            </Suspense>
            <Routes>
              <Route
                path="/"
                element={
                  <Suspense fallback={null}>
                    <Welcome />
                  </Suspense>
                }
              />
              <Route
                path="shop"
                element={
                  <Suspense fallback={null}>
                    <Shop />
                  </Suspense>
                }
              />
            </Routes>
          </BrowserRouter>
        </Physics>
      </Canvas>
      <Loader
        containerStyles={{
          background:
            "radial-gradient(circle farthest-corner at center top,#071021,#19324a)",
        }} // Flex layout styles
        innerStyles={{
          backgroundColor: "salmon",
          width: "50vw",
        }} // Inner container styles
        barStyles={{
          backgroundColor: "lightgreen",
        }} // Loading-bar styles
        dataInterpolation={(p) => `Loading ${Math.round(p)}%`}
        initialState={(active) => active}
        dataStyles={{
          color: "#fafafa",
          fontSize: "25px",
          fontFamily: "Raleway",
          fontWeight: "500",
        }}
      />
    </div>
  );
}

export default App;
