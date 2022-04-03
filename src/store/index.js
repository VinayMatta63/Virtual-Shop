import create from "zustand";
const types = {
  setcam: "SETCAM",
  resetcam: "RESETCAM",
  setobj: "SETOBJ",
  resetobj: "RESETOBJ",
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
    default:
      break;
  }
};

const useStore = create((set) => ({
  camera: null,
  objects: [],
  dispatch: (args) => set((state) => reducer(state, args)),
}));

export default useStore;
