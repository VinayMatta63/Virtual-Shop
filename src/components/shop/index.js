import React, { useEffect } from "react";
import useStore, { locations } from "../../store";

const dispatchSelector = (state) => state.dispatch;

const Shop = () => {
  const dispatch = useStore(dispatchSelector);

  useEffect(() => {
    dispatch({ type: "SETLOC", payload: locations.SHOP });
  }, []);

  return (
    <group>
      <pointLight color="red" intensity={0.5} />
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry args={[100, 100]} />
        <meshBasicMaterial color="cyan" />
      </mesh>
    </group>
  );
};

export default Shop;
