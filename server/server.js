const express =  require('express')
const mongoose =  require('mongoose')
const cors =  require('cors')
const dotenv =  require('dotenv')
const { readdirSync } =  require('fs')

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
readdirSync("./routes").map(r => app.use("/api", require("./routes/" + r)));


//app.get('/api', (req, res) =>{res.send("hello")})
app.listen(port, () => console.log(`Server is running on port ${port}`));