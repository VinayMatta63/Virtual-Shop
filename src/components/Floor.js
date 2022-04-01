import { usePlane } from "@react-three/cannon";
import React from "react";
import { DoubleSide } from "three";

const Floor = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  }));

  return (
    <mesh
      receiveShadow
      ref={ref}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
    >
      <planeBufferGeometry attach="geometry" args={[50, 50]} />
      <meshBasicMaterial attach="material" color="red" side={DoubleSide} />
    </mesh>
  );
};

export default Floor;
