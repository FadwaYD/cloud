const Objet = require('../models/Objet');

exports.ajouter = async (req, res) => {
  const objet = new Objet(req.body);
  await objet.save();
  res.status(200).json(objet);
};

exports.getOne = async (req, res) => {
  const objet = await Objet.findById(req.params.id);
  if (!objet) return res.status(404).json({ message: 'Non trouvé' });
  res.status(200).json(objet);
};

exports.update = async (req, res) => {
  const objet = await Objet.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!objet) return res.status(404).json({ message: 'Non trouvé' });
  res.status(200).json(objet);
};

exports.supprimer = async (req, res) => {
  const objet = await Objet.findByIdAndDelete(req.params.id);
  if (!objet) return res.status(404).json({ message: 'Non trouvé' });
  res.status(200).json({ message: 'Supprimé' });
};

exports.rechercher = async (req, res) => {
  const { motcle } = req.query;
  const objets = await Objet.find({ $or: [
    { titre: new RegExp(motcle, 'i') },
    { description: new RegExp(motcle, 'i') }
  ] });
  res.status(200).json(objets);
};

exports.disponibles = async (req, res) => {
  const objets = await Objet.find({ etat: 'disponible' });
  res.status(200).json(objets);
};

exports.changerStatut = async (req, res) => {
  const objet = await Objet.findByIdAndUpdate(req.params.id, { etat: req.body.etat }, { new: true });
  if (!objet) return res.status(404).json({ message: 'Non trouvé' });
  res.status(200).json(objet);
};
