require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Importar rotas
const perfumesRoutes = require('./api/routes/perfumes');
const carrinhoRoutes = require('./api/routes/carrinho');
const pedidosRoutes = require('./api/routes/pedidos');
const estoque = require('./api/routes/estoque');
const whatsappRoutes = require('./api/routes/whatsapp');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos (Frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da API
app.use('/api/perfumes', perfumesRoutes);
app.use('/api/carrinho', carrinhoRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/estoque', estoque);
app.use('/api/whatsapp', whatsappRoutes);

// Rota raiz - Servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para admin
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!', message: err.message });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
