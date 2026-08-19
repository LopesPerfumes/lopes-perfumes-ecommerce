const express = require('express');
const router = express.Router();
const { getEstoque, updateEstoque, getAlertasEstoque } = require('../controllers/estoqueController');

router.get('/', getEstoque);
router.get('/alertas', getAlertasEstoque);
router.put('/:id', updateEstoque);

module.exports = router;