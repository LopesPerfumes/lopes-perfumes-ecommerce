const express = require('express');
const router = express.Router();
const { criarPedido, getPedidos, getPedidoById, atualizarStatusPedido } = require('../controllers/pedidosController');

router.post('/', criarPedido);
router.get('/', getPedidos);
router.get('/:id', getPedidoById);
router.put('/:id/status', atualizarStatusPedido);

module.exports = router;