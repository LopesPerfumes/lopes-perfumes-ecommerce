const axios = require('axios');

const whatsappService = {
  // Enviar mensagem via WhatsApp
  enviarMensagem: async (numeroTelefone, mensagem) => {
    try {
      // Usar a URL de envio do WhatsApp
      const url = `${process.env.WHATSAPP_API_URL}?phone=${numeroTelefone}&text=${encodeURIComponent(mensagem)}`;
      
      // Para produção, você precisaria integrar com a API oficial do WhatsApp Business
      // Este é um exemplo simplificado
      console.log(`Mensagem enviada para ${numeroTelefone}: ${mensagem}`);
      
      return {
        sucesso: true,
        mensagem: 'Mensagem enviada com sucesso',
        url: url
      };
    } catch (error) {
      console.error('Erro ao enviar mensagem WhatsApp:', error);
      throw error;
    }
  },
  
  // Gerar link WhatsApp
  gerarLinkWhatsApp: (numeroTelefone, mensagem) => {
    return `https://wa.me/${numeroTelefone}?text=${encodeURIComponent(mensagem)}`;
  },
  
  // Processar webhook do WhatsApp
  processarWebhook: async (dados) => {
    try {
      console.log('Webhook recebido:', dados);
      return dados;
    } catch (error) {
      console.error('Erro ao processar webhook:', error);
      throw error;
    }
  }
};

module.exports = whatsappService;