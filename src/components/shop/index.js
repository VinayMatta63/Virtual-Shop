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
    </group>
  );
};

export default Shop;
