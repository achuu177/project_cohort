const express = require('express')
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes'); 

const app = express();
app.use(express.json())
app.use(cookieParser())
const port = 3000;

dotenv.config("./.env")

const dbpassword = process.env.DB_PASSWORD

mongoose.connect(`mongodb+srv://aswathi:${dbpassword}@cluster.vxpxz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`)
.then(res=>{
  console.log("DB connected successfully")
}).catch(err=>{
  console.log("DB connection failed")
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test', (req, res) => {
    res.send('test')
  })

  
  app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
      

