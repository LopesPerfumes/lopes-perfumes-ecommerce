const googleSheets = require('../services/googleSheets');

// Dados em memória (usando Google Sheets)
let perfumes = [];

// Buscar todos os perfumes
const getPerfumes = async (req, res) => {
  try {
    perfumes = await googleSheets.getPerfumes();
    res.json(perfumes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar perfumes', message: error.message });
  }
};

// Buscar perfume por ID
const getPerfumeById = async (req, res) => {
  try {
    const perfume = perfumes.find(p => p.id === parseInt(req.params.id));
    if (!perfume) {
      return res.status(404).json({ error: 'Perfume não encontrado' });
    }
    res.json(perfume);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar perfume', message: error.message });
  }
};

// Adicionar perfume (Admin)
const addPerfume = async (req, res) => {
  try {
    const { nome, marca, preco, descricao, imagem, estoque } = req.body;
    
    const novoPerfume = {
      id: perfumes.length + 1,
      nome,
      marca,
      preco,
      descricao,
      imagem,
      estoque,
      dataCriacao: new Date()
    };
    
    await googleSheets.addPerfume(novoPerfume);
    perfumes.push(novoPerfume);
    
    res.status(201).json(novoPerfume);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar perfume', message: error.message });
  }
};

// Atualizar perfume (Admin)
const updatePerfume = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = perfumes.findIndex(p => p.id === id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Perfume não encontrado' });
    }
    
    perfumes[index] = { ...perfumes[index], ...req.body };
    await googleSheets.updatePerfume(perfumes[index]);
    
    res.json(perfumes[index]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar perfume', message: error.message });
  }
};

// Deletar perfume (Admin)
const deletePerfume = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = perfumes.findIndex(p => p.id === id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Perfume não encontrado' });
    }
    
    const perfumeRemovido = perfumes.splice(index, 1);
    await googleSheets.deletePerfume(id);
    
    res.json({ mensagem: 'Perfume removido com sucesso', perfume: perfumeRemovido[0] });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar perfume', message: error.message });
  }
};

module.exports = {
  getPerfumes,
  getPerfumeById,
  addPerfume,
  updatePerfume,
  deletePerfume
};