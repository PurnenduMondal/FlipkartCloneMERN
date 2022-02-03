const express = require("express");
const router = express.Router();
const { insert, listAll, updateProduct, deleteProduct} = require("../controllers/product");
// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

router.post("/product", authCheck, adminCheck, insert);
router.post("/products", listAll);
router.post("/updateProduct", updateProduct);
router.post("/deleteProduct", deleteProduct);
module.exports = router;