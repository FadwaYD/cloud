const express = require('express');
const router = express.Router();
const controller = require('../controllers/objetController');

// ✅ routes spécifiques en premier
router.get('/recherche', controller.rechercher);
router.get('/disponibles', controller.disponibles);
router.put('/statut/:id', controller.changerStatut);

// 🔽 routes dynamiques en dernier
router.get('/:id', controller.getOne);
router.post('/', controller.ajouter);
router.put('/:id', controller.update);
router.delete('/:id', controller.supprimer);

module.exports = router;
