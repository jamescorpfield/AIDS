// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();


// const app = express();
// app.use(cors());
// app.use(express.json());
// const router = express.Router();
// app.use("/", router);
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

// const Product = mongoose.model('Product', new mongoose.Schema({
//   name: String,
//   price: Number
// }));

// router.get("/products", async (req, res) => {
//   const products = await Product.find();
//   res.json(products);
// });

// router.post("/products", async (req, res) => {
// console.log(req.body);
//   const newProduct = new Product(req.body);
//   await newProduct.save();
//   res.status(201).json(newProduct);
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
const router = express.Router();
app.use("/", router);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const Product = mongoose.model('Product', new mongoose.Schema({
  name: String,
  price: Number
}));

const Order = mongoose.model('Order', new mongoose.Schema({
  items: Array,
  placedAt: { type: Date, default: Date.now }
}));

router.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.post("/orders", async (req, res) => {
  const order = new Order({ items: req.body.items });
  await order.save();
  res.json({ message: "Order placed", orderId: order._id });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
