import create from "zustand";

const types = {
  setcam: "SETCAM",
  resetcam: "RESETCAM",
  setobj: "SETOBJ",
  resetobj: "RESETOBJ",
  setloc: "SETLOC",
  resetloc: "RESETLOC",
  setProducts: "SETPRODUCTS",
};

export const locations = {
  ENTRANCE: "start",
  SHOP: "shop",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case types.setcam:
      return { camera: payload };
    case types.resetcam:
      return { camera: payload };
    case types.setobj:
      return { objects: [...state.objects, payload] };
    case types.resetobj:
      return { objects: [] };
    case types.setloc:
      return { location: payload };
    case types.resetloc:
      return { location: locations.ENTRANCE };
    case types.setProducts:
      return { products: payload };
    default:
      break;
  }
};

const useStore = create((set) => ({
  camera: null,
  objects: [],
  products: [],
  location: locations.ENTRANCE,
  dispatch: (args) => set((state) => reducer(state, args)),
}));

export default useStore;
