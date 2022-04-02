import { usePlane } from "@react-three/cannon";
import React from "react";
const Floor = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  }));

  return <></>;
};

export default Floor;
