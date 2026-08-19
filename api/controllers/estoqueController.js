const googleSheets = require('../services/googleSheets');

let estoque = [];

const getEstoque = async (req, res) => {
  try {
    estoque = await googleSheets.getEstoque();
    res.json(estoque);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar estoque', message: error.message });
  }
};

const updateEstoque = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { quantidade } = req.body;
    
    const index = estoque.findIndex(e => e.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    
    estoque[index].quantidade = quantidade;
    estoque[index].dataAtualizacao = new Date().toISOString();
    
    await googleSheets.updateEstoque(estoque[index]);
    
    res.json({ mensagem: 'Estoque atualizado', estoque: estoque[index] });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar estoque', message: error.message });
  }
};

const getAlertasEstoque = async (req, res) => {
  try {
    estoque = await googleSheets.getEstoque();
    const alertas = estoque.filter(e => e.quantidade <= 5); // Alerta quando estoque <= 5
    res.json({ alertas, total: alertas.length });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar alertas', message: error.message });
  }
};

module.exports = {
  getEstoque,
  updateEstoque,
  getAlertasEstoque
};