const admin = require("../firebase");
const serviceAccount = require("../configs/FirebaseServiceAccountKey.json");
const User = require("../models/user");

exports.authCheck = async (req, res, next) => {
  
  try { 
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken)

    req.user = req.body 
    req.user.email = firebaseUser.email
    next();

  } catch (err) {
     console.log(err);
    res.status(401).json({
      err: "Invalid or expired token",
    });
  }
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;

  const adminUser = await User.findOne({ email }).exec();

  if (adminUser.role !== "Admin") {
    res.status(403).json({
      err: "Admin resource. Access denied.",
    });
  } else {
    next();
  }
};
