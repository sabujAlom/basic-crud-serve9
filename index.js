const {MongoClient, ObjectId} = require("mongodb");
const cors = require('cors');
require('dotenv').config();
const express = require('express');
const app = express()
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json())

//user name:basic-crud-server
//password:Cg7ScdbL5TryZWIk


const client = new MongoClient(process.env.DB_URI);

 async function connectToMongoDB() {
  try {
    await client.connect();



    const db = client.db("e-commerce");
    const productsCollection = db.collection("products");


    // find--------------------------
    app.get('/products', async (req, res)=>{
         const cursor =await productsCollection.find();
         const result = await cursor.toArray();
        //  console.log(result);

         res.send(result)
    })

    
    // findOne---------------------------
    app.get('/products/:productId', async(req, res)=>{
      
      const productId = req.params.productId;
                 

      const query = {_id: new ObjectId(productId)}
      // console.log("query",query);

      const result = await productsCollection.findOne(query)
      // console.log("result",result)
      res.send(result)
    })



     // Post------------------------------------
       app.post("/products",async (req, res)=>{
        // add products 
        const newProduct = req.body;
        const result = await productsCollection.insertOne(newProduct);
        console.log(result)
        res.send(result)
       })



    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}
connectToMongoDB();



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})