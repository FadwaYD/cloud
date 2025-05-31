const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { nom, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ nom, email, password: hash });
  await user.save();
  res.status(200).json(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Mot de passe incorrect' });

  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
  user.token = token;
  await user.save();

  res.status(200).json({ token });
};

exports.getUser = async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
  res.status(200).json(user);
};

exports.updateUser = async (req, res) => {
  const user = await User.findOneAndUpdate({ email: req.params.email }, req.body, { new: true });
  if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
  res.status(200).json(user);
};

exports.deleteUser = async (req, res) => {
  const result = await User.findOneAndDelete({ email: req.params.email });
  if (!result) return res.status(404).json({ message: 'Utilisateur non trouvé' });
  res.status(200).json({ message: 'Supprimé' });
};
