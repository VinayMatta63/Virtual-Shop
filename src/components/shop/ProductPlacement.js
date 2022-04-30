import React from "react";
import Product from "./Product";
const locations = [
  [100, 12, 100],
  [100, 12, -100],
  [0, 12, -100],
  [0, 12, 100],
];

const ProductPlacement = ({ products }) => {
  return (
    products &&
    products.slice(0, 4).map((product, index) => {
      return (
        <Product product={product} position={locations[index]} key={index} />
      );
    })
  );
};

export default ProductPlacement;
