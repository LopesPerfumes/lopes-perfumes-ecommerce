const googleSheets = require('../services/googleSheets');
const whatsappService = require('../services/whatsappService');

let pedidos = [];

const criarPedido = async (req, res) => {
  try {
    const { cliente, telefone, carrinho, endereco, observacoes } = req.body;
    
    const total = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    
    const novoPedido = {
      id: Date.now(),
      cliente,
      telefone,
      carrinho,
      endereco,
      observacoes,
      total: total.toFixed(2),
      status: 'pendente',
      dataPedido: new Date().toISOString()
    };
    
    // Salvar no Google Sheets
    await googleSheets.addPedido(novoPedido);
    pedidos.push(novoPedido);
    
    // Enviar mensagem WhatsApp
    const mensagem = `*Novo Pedido - LOPES PERFUMES IMPORTADOS* ✨\n\nCliente: ${cliente}\nTelefone: ${telefone}\nTotal: R$ ${total.toFixed(2)}\n\nItens:\n${carrinho.map(item => `- ${item.nome} (x${item.quantidade}) R$ ${item.preco}`).join('\n')}\n\nEndereço: ${endereco}\nObservações: ${observacoes || 'Nenhuma'}\n\nStatus: Pendente de Confirmação`;
    
    await whatsappService.enviarMensagem(process.env.WHATSAPP_PHONE_NUMBER, mensagem);
    
    res.status(201).json({ mensagem: 'Pedido criado com sucesso!', pedido: novoPedido });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar pedido', message: error.message });
  }
};

const getPedidos = async (req, res) => {
  try {
    pedidos = await googleSheets.getPedidos();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pedidos', message: error.message });
  }
};

const getPedidoById = (req, res) => {
  try {
    const pedido = pedidos.find(p => p.id === parseInt(req.params.id));
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pedido', message: error.message });
  }
};

const atualizarStatusPedido = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    
    const index = pedidos.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }
    
    pedidos[index].status = status;
    await googleSheets.updatePedido(pedidos[index]);
    
    // Notificar cliente via WhatsApp
    const mensagens = {
      confirmado: `*Pedido Confirmado!* ✅\n\nSeu pedido #${id} foi confirmado e está sendo preparado.\nEstaremos em breve em contato com mais informações.`,
      enviado: `*Pedido Enviado!* 📦\n\nSeu pedido #${id} saiu para entrega!`,
      entregue: `*Pedido Entregue!* 🎉\n\nSeu pedido #${id} foi entregue com sucesso!\nObrigado por comprar na Lopes Perfumes Importados!`,
      cancelado: `*Pedido Cancelado* ❌\n\nInfelizmente seu pedido #${id} foi cancelado. Entre em contato conosco para mais informações.`
    };
    
    if (mensagens[status]) {
      await whatsappService.enviarMensagem(pedidos[index].telefone, mensagens[status]);
    }
    
    res.json({ mensagem: 'Status atualizado com sucesso', pedido: pedidos[index] });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar status', message: error.message });
  }
};

module.exports = {
  criarPedido,
  getPedidos,
  getPedidoById,
  atualizarStatusPedido
};