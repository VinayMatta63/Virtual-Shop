import instance from "axios";

const axios = instance.create({
  baseURL: "https://fakestoreapi.com",
  //   timeout: 1000,
  headers: { "content-type": "application/json" },
});

export default axios;
