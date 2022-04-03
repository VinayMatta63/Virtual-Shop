import React, { useEffect, useRef } from "react";
import Entrance from "./Entrance";
import IntroText from "./IntroText";
import useStore, { locations } from "../../store";

const dispatchSelector = (state) => state.dispatch;

const Welcome = () => {
  const entranceRef = useRef(null);
  const dispatch = useStore(dispatchSelector);

  useEffect(() => {
    dispatch({ type: "SETLOC", payload: locations.ENTRANCE });
    dispatch({ type: "SETOBJ", payload: entranceRef.current });
  }, []);

  return (
    <group>
      <directionalLight args={["cyan", 0.6]} position={[0, 0, 28]} />
      <pointLight args={["white", 0.3, 50, 0.5]} position={[0, 10, -50]} />
      <IntroText />
      <Entrance ref={entranceRef} />
    </group>
  );
};

export default Welcome;
