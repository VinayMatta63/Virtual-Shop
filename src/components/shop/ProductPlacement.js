import { Html } from "@react-three/drei";
import React from "react";
import Wave from "../common/Wave";
import Product from "./Product";
import "./bubble.css";

const locations = [
  [100, 10.1, 100],
  [100, 10.1, -100],
  [0, 10.1, -100],
  [0, 10.1, 100],
];

const ProductPlacement = ({ products }) => {
  return (
    <>
      {products &&
        products.slice(0, 4).map((product, index) => {
          return (
            <Product
              product={product}
              position={locations[index]}
              key={index}
            />
          );
        })}
      <Wave position={[0, 0.1, -90]} scale={1} />
      <Html position={[0, 10.1, -90]} transform>
        <div className="thought">
          <div>Hello!</div>
          <button>click me</button>
        </div>
      </Html>
    </>
  );
};

export default ProductPlacement;
