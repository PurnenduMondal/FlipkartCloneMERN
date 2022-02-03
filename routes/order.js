const express = require("express");
const router = express.Router();

const { insert, listAll, updateOrderStatus } = require("../controllers/order");

router.post('/orders', insert)
router.post('/listOrders', listAll)
router.post('/updateOrderStatus', updateOrderStatus)

module.exports = router;