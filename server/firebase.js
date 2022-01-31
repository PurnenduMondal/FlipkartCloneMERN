var admin = require("firebase-admin");

var serviceAccount = require("./configs/FirebaseServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;