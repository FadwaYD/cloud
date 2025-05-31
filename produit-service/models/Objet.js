const mongoose = require('mongoose');

const objetSchema = new mongoose.Schema({
  titre: String,
  description: String,
  donneurEmail: String,
  etat: { type: String, default: 'disponible' },
  image: String
});

module.exports = mongoose.model('Objet', objetSchema);
