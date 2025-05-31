require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const objetRoutes = require('./routes/objetRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', objetRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT, () => {
    console.log(`Produit service on port ${process.env.PORT}`);
  }))
  .catch(err => console.log(err));
