import { Html, useAnimations, useGLTF } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import useStore, { locations } from "../../store";
import ProductPlacement from "./ProductPlacement";

const dispatchSelector = (state) => state.dispatch;
const productsSelector = (state) => state.products;

const Shop = () => {
  const robotRef = useRef();
  const lightHelper = useRef();
  const robot = useGLTF("/robot/scene.gltf");
  const { actions } = useAnimations(robot.animations, robotRef);
  const dispatch = useStore(dispatchSelector);
  const products = useStore(productsSelector);

  useEffect(() => {
    dispatch({ type: "SETLOC", payload: locations.SHOP });
  }, []);
  useEffect(() => {
    actions["Take 01"].play();
  }, []);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry args={[400, 400]} />
        <meshBasicMaterial color="cyan" />
      </mesh>
      <ProductPlacement products={products} />
      <pointLight
        args={["white", 1.5]}
        position={[-100, 10, -82]}
        ref={lightHelper}
      />
      <mesh scale={0.5} position={[-100, 0.1, -100]}>
        <primitive object={robot.scene} ref={robotRef} />
      </mesh>
    </group>
  );
};

export default Shop;
