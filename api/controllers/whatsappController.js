const whatsappService = require('../services/whatsappService');

// Verificar webhook do WhatsApp
const verificarWebhook = (req, res) => {
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  
  if (token === process.env.WEBHOOK_VERIFY_TOKEN) {
    res.send(challenge);
  } else {
    res.status(403).send('Token inválido');
  }
};

// Receber mensagens do WhatsApp
const receberMensagem = async (req, res) => {
  try {
    const { entry } = req.body;
    
    if (entry && entry[0].changes && entry[0].changes[0].value.messages) {
      const mensagem = entry[0].changes[0].value.messages[0];
      const numeroTelefone = entry[0].changes[0].value.messages[0].from;
      const textoMensagem = mensagem.text.body;
      
      console.log(`Mensagem recebida de ${numeroTelefone}: ${textoMensagem}`);
      
      // Processar mensagem e responder
      let resposta = '';
      
      if (textoMensagem.toLowerCase().includes('catálogo')) {
        resposta = 'Bem-vindo à Lopes Perfumes Importados! 🌹\n\nAcesse nosso catálogo em: https://seu-dominio.com';
      } else if (textoMensagem.toLowerCase().includes('preço')) {
        resposta = 'Para conhecer os preços, acesse nosso site: https://seu-dominio.com';
      } else {
        resposta = 'Obrigado por entrar em contato! 😊\nEm breve responderemos sua mensagem.';
      }
      
      await whatsappService.enviarMensagem(numeroTelefone, resposta);
    }
    
    res.status(200).send('OK');
  } catch (error) {
    console.error('Erro ao receber mensagem:', error);
    res.status(500).json({ error: 'Erro ao processar mensagem' });
  }
};

// Enviar mensagem via WhatsApp
const enviarMensagem = async (req, res) => {
  try {
    const { telefone, mensagem } = req.body;
    
    await whatsappService.enviarMensagem(telefone, mensagem);
    
    res.json({ mensagem: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao enviar mensagem', message: error.message });
  }
};

module.exports = {
  verificarWebhook,
  receberMensagem,
  enviarMensagem
};