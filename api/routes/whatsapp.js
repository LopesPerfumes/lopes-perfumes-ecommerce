const express = require('express');
const router = express.Router();
const { verificarWebhook, receberMensagem, enviarMensagem } = require('../controllers/whatsappController');

// Verificar webhook do WhatsApp
router.get('/webhook', verificarWebhook);

// Receber mensagens do WhatsApp
router.post('/webhook', receberMensagem);

// Enviar mensagem via WhatsApp
router.post('/enviar', enviarMensagem);

module.exports = router;