import axios from "axios";

export const createProduct = async (product, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken,
    },
  });

export const getAllProducts = async (slug) =>
  await axios.post(`${process.env.REACT_APP_API}/products`, slug);