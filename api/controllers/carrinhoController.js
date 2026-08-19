// Carrinho em memória (usar localStorage no frontend)
let carrinho = [];

const getCarrinho = (req, res) => {
  res.json(carrinho);
};

const addToCarrinho = (req, res) => {
  try {
    const { id, nome, preco, quantidade, imagem } = req.body;
    
    const itemExistente = carrinho.find(item => item.id === id);
    
    if (itemExistente) {
      itemExistente.quantidade += quantidade || 1;
    } else {
      carrinho.push({
        id,
        nome,
        preco,
        quantidade: quantidade || 1,
        imagem
      });
    }
    
    res.json({ mensagem: 'Item adicionado ao carrinho', carrinho });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar item', message: error.message });
  }
};

const removeFromCarrinho = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    carrinho = carrinho.filter(item => item.id !== id);
    res.json({ mensagem: 'Item removido do carrinho', carrinho });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover item', message: error.message });
  }
};

const limparCarrinho = (req, res) => {
  carrinho = [];
  res.json({ mensagem: 'Carrinho limpo', carrinho });
};

const getTotal = (req, res) => {
  const total = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
  res.json({ total: total.toFixed(2), itens: carrinho.length });
};

module.exports = {
  getCarrinho,
  addToCarrinho,
  removeFromCarrinho,
  limparCarrinho,
  getTotal
};