const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  idObjet: String,
  preneurEmail: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reservation', reservationSchema);
