import axios from "axios";

export const createProduct = async (product, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken,
    },
  });

export const getAllProducts = async (slug) =>
  await axios.post(`${process.env.REACT_APP_API}/products`, slug);

export const updateProduct = async (product) =>
  await axios.post(`${process.env.REACT_APP_API}/updateProduct`, product);

export const deleteProductImage = async (public_id) =>
  await axios.post(`${process.env.REACT_APP_API}/removeimage`, public_id);

export const deleteProduct = async (productId) =>
  await axios.post(`${process.env.REACT_APP_API}/deleteProduct`, productId);