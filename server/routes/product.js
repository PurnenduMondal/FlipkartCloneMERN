const express = require("express");
const router = express.Router();
const { insert, listAll} = require("../controllers/product");
// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

router.post("/product", authCheck, adminCheck, insert);
router.post("/products", listAll);

module.exports = router;