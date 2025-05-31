const Reservation = require('../models/Reservation');

exports.reserver = async (req, res) => {
  const reservation = new Reservation(req.body);
  await reservation.save();
  res.status(200).json(reservation);
};

exports.listerParEmail = async (req, res) => {
  const reservations = await Reservation.find({ preneurEmail: req.params.email });
  if (!reservations.length) return res.status(404).json({ message: 'Aucun don' });
  res.status(200).json(reservations);
};

exports.annuler = async (req, res) => {
  const resv = await Reservation.findByIdAndDelete(req.params.id);
  if (!resv) return res.status(404).json({ message: 'Non trouvé' });
  res.status(200).json({ message: 'Annulée' });
};

exports.reservationsObjet = async (req, res) => {
  const list = await Reservation.find({ idObjet: req.params.id });
  if (!list.length) return res.status(404).json({ message: 'Aucune réservation' });
  res.status(200).json(list);
};

exports.verifier = async (req, res) => {
  const { email, objetId } = req.query;

  const exists = await Reservation.findOne({
    preneurEmail: email,
    idObjet: objetId
  });

  if (!exists) return res.status(404).json({ message: 'Aucun don' });
  res.status(200).json({ message: 'Déjà réservé' });
};
