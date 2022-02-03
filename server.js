const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const { readdirSync } = require('fs')

//app config
const app = express()
const port = process.env.PORT || 8000
dotenv.config()

//middleware
app.use(express.json({ limit: '10MB' }));
app.use(cors())

//DB config
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERR", err));

// routes middleware
app.get('/', (req, res) => {res.status(200).send("Server is Running")})
readdirSync("./routes").map(r => app.use("/api", require("./routes/" + r)));

if ( process.env.NODE_ENV == "production"){

  app.use(express.static("client/build"));
  const path = require("path");

  app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}


//app.get('/api', (req, res) =>{res.send("hello")})
app.listen(port, () => console.log(`Server is running on port ${port}`));