const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservationController');

// 🔄 ORDRE IMPORTANT : les routes spécifiques en haut
router.get('/verifier', controller.verifier);
router.get('/debug/all', controller.debugAll);
router.get('/objet/:id', controller.reservationsObjet);

router.post('/', controller.reserver);
router.delete('/:id', controller.annuler);

// 🔽 Doit toujours être en dernier
router.get('/:email', controller.listerParEmail);

module.exports = router;
