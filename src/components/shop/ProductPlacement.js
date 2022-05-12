import { Html } from "@react-three/drei";
import React, { useState } from "react";
import Wave from "../common/Wave";
import Product from "./Product";
import "./bubble.css";

const locations = [
  [-85, 10.1, -35],
  [-65, 10.1, -45],
  [-45, 10.1, -55],
  [-25, 10.1, -65],
  [25, 10.1, -65],
  [45, 10.1, -55],
  [65, 10.1, -45],
  [85, 10.1, -35],
];

const ProductPlacement = ({ products }) => {
  const [product, setProduct] = useState(null);
  products.map((p, i) => (p.position = locations[i]));
  return (
    <>
      {products &&
        products.slice(0, 8).map((product, index) => {
          return (
            <Product product={product} key={index} setProduct={setProduct} />
          );
        })}
      {product &&
        product.position &&
        (console.log([product.position[2] + 7, 0.1, -product.position[0]]),
        (
          <>
            <Wave
              position={[product.position[0], 0.1, product.position[2] + 7]}
              rotation={[0, 0, 0]}
              scale={1}
            />
            <Html
              position={[product.position[0] + 2, 15, product.position[2] + 7]}
              rotation={[0, 0, 0]}
              transform
            >
              <div className="thought">
                <div>{product?.description}</div>
                <button>click me</button>
              </div>
            </Html>
          </>
        ))}
    </>
  );
};

export default ProductPlacement;
