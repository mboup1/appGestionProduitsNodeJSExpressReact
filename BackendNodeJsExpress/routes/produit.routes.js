const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const produitController = require('../controllers/produit.controller')

router.post('/', produitController.create);
router.get('/', produitController.getAll);
router.get('/:id', produitController.getById);
router.patch('/:id', produitController.updateById);
router.put('/:id', produitController.updateById);
router.delete('/:id', produitController.deleteById);

module.exports = router;