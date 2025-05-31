const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservationController');

router.post('/', controller.reserver);
router.get('/:email', controller.listerParEmail);
router.delete('/:id', controller.annuler);
router.get('/objet/:id', controller.reservationsObjet);
router.get('/verifier', controller.verifier);

module.exports = router;
