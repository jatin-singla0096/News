const mongo=require("./config/mongo");
const express = require('express');
const app = express();
const port = 300;
var cors = require('cors')
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use("/auth",require("./routes/auth"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})