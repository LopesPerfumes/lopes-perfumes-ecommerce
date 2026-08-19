const express = require('express');
const router = express.Router();
const { getPerfumes, getPerfumeById, addPerfume, updatePerfume, deletePerfume } = require('../controllers/perfumesController');

// Rotas públicas
router.get('/', getPerfumes);
router.get('/:id', getPerfumeById);

// Rotas admin (futura autenticação)
router.post('/', addPerfume);
router.put('/:id', updatePerfume);
router.delete('/:id', deletePerfume);

module.exports = router;