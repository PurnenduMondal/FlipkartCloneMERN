const Order = require("../models/order");

exports.insert = async (req, res) => {
  try {
    userId = req.body.userId
    orders = req.body.orders
    for (let i = 0; i < orders.length; i++) {
      if (orders[i] !== undefined) {
        await new Order({
          orderedBy: userId,
          productName: orders[i].name,
          sellingPrice: orders[i].selling_price,
          image: orders[i].images[0].url,
          quantity: orders[i].quantity,

        }).save();
      }
    }

    res.json("success");
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.listAll = async (req, res) => {

  let queryParam = req.body.userId === "" ? {} : {orderedBy: req.body.userId} 

  let orders = await Order.find(queryParam)
    .sort([["createdAt", "desc"]])
    .exec();
  
  res.json(orders);
};

exports.updateOrderStatus = async (req, res) => {

  let orderId = req.body.orderId
  let status = req.body.status
  let order = await Order.findOneAndUpdate({ _id: orderId },{ status: status }, {new: true} )
  
  res.json(order);
};

