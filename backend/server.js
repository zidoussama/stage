require('dotenv').config();


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const likeRoutes = require('./routes/likeRoutes');
const user =require('./routes/userRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', true);
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log("MongoDB connection error:", err));




app.use('/api/categories', categoryRoutes);
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', productRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/users', user);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
