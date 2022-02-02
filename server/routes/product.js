const express = require("express");
const router = express.Router();
const { insert, listAll, updateProduct} = require("../controllers/product");
// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

router.post("/product", authCheck, adminCheck, insert);
router.post("/products", listAll);
router.post("/updateProduct", updateProduct);

module.exports = router;