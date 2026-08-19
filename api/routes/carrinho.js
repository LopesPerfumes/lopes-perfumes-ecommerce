const express = require('express');
const router = express.Router();
const { getCarrinho, addToCarrinho, removeFromCarrinho, limparCarrinho, getTotal } = require('../controllers/carrinhoController');

router.get('/', getCarrinho);
router.post('/add', addToCarrinho);
router.post('/remove/:id', removeFromCarrinho);
router.post('/limpar', limparCarrinho);
router.get('/total', getTotal);

module.exports = router;