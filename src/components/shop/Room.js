/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import useStore from "../../store";
import { MeshStandardMaterial } from "three";
import { RepeatWrapping } from "three";
import { MeshBasicMaterial } from "three";

const dispatchSelector = (state) => state.dispatch;

const Room = ({ ...props }) => {
  const group = useRef();

  const { nodes, materials } = useGLTF("/room.glb");
  const dispatch = useStore(dispatchSelector);
  const texture = useTexture("/boards/base.jpg");
  texture.repeat.set(32, 64);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  const material = new MeshBasicMaterial();
  material.map = texture;

  useEffect(() => {
    dispatch({ type: "SETOBJ", payload: group.current });
  }, [group.current]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group
        position={[199.69, 90.73, 0.36]}
        rotation={[0, 0, -1.57]}
        scale={[0.35, 199.91, 200]}
      >
        <mesh geometry={nodes.Cube005.geometry} material={materials.Material} />
        <mesh geometry={nodes.Cube005_1.geometry} material={material} />
      </group>
    </group>
  );
};

useGLTF.preload("/room.glb");

export default Room;
