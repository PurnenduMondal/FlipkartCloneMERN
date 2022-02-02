import axios from "axios"

export const insertOrders = async (placed_orders) =>
  await axios.post(`${process.env.REACT_APP_API}/orders`, placed_orders)

export const getOrders = async (userId) =>
  await axios.post(`${process.env.REACT_APP_API}/listOrders`, {userId: userId})

export const updateOrderStatus = async (orderId, status) =>
  await axios.post(`${process.env.REACT_APP_API}/updateOrderStatus`, {orderId: orderId, status: status})