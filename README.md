# 🌹 Lopes Perfumes Importados - E-commerce

E-commerce moderno e completo para vendas de perfumes importados com integração WhatsApp.

## ✨ Características

- ✅ **Catálogo de Perfumes**: Exibição elegante de produtos com imagens, descrição e preço
- 🛒 **Carrinho de Compras**: Sistema de carrinho com armazenamento local (localStorage)
- 📱 **Integração WhatsApp**: Envio automático de pedidos e confirmações via WhatsApp
- 📊 **Painel Administrativo**: Gerenciar perfumes, pedidos e estoque
- 📈 **Google Sheets**: Armazenamento de dados de produtos e pedidos
- 🎨 **Design Responsivo**: Interface bela e otimizada para mobile
- 💳 **Sistema de Pedidos**: Formulário completo com endereço e observações

## 🚀 Como Usar

### 1. Instalação

```bash
# Clone o repositório
git clone https://github.com/LopesPerfumes/lopes-perfumes-ecommerce.git

# Entre na pasta
cd lopes-perfumes-ecommerce

# Instale as dependências
npm install
```

### 2. Configuração de Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# WhatsApp
WHATSAPP_PHONE_NUMBER=5582998380780
WHATSAPP_API_URL=https://api.whatsapp.com/send

# Google Sheets
GOOGLE_SHEETS_API_KEY=sua_chave_api_aqui
SHEETS_ID=seu_id_da_planilha_aqui

# Servidor
PORT=3000
NODE_ENV=development

# Webhook WhatsApp
WEBHOOK_VERIFY_TOKEN=seu_token_secreto_aqui
```

### 3. Iniciar o Servidor

```bash
# Modo desenvolvimento (com auto-reload)
npm run dev

# Modo produção
npm start
```

O servidor estará rodando em: `http://localhost:3000`

## 📂 Estrutura do Projeto

```
lopes-perfumes-ecommerce/
├── public/                    # Arquivos do Frontend
│   ├── index.html            # Página principal da loja
│   ├── admin.html            # Painel administrativo
│   ├── css/
│   │   ├── styles.css        # Estilos da loja
│   │   └── admin.css         # Estilos do painel
│   └── js/
│       ├── app.js            # Lógica da loja
│       └── admin.js          # Lógica do painel
├── api/
│   ├── routes/              # Rotas da API
│   │   ├── perfumes.js
│   │   ├── carrinho.js
│   │   ├── pedidos.js
│   │   ├── estoque.js
│   │   └── whatsapp.js
│   ├── controllers/         # Controladores
│   │   ├── perfumesController.js
│   │   ├── carrinhoController.js
│   │   ├── pedidosController.js
│   │   ├── estoqueController.js
│   │   └── whatsappController.js
│   └── services/            # Serviços
│       ├── googleSheets.js
│       └── whatsappService.js
├── server.js                 # Servidor principal
├── package.json              # Dependências
├── .env.example              # Exemplo de variáveis de ambiente
└── README.md                 # Este arquivo
```

## 🔌 Endpoints da API

### Perfumes
- `GET /api/perfumes` - Listar todos os perfumes
- `GET /api/perfumes/:id` - Obter um perfume específico
- `POST /api/perfumes` - Adicionar novo perfume (Admin)
- `PUT /api/perfumes/:id` - Atualizar perfume (Admin)
- `DELETE /api/perfumes/:id` - Deletar perfume (Admin)

### Carrinho
- `GET /api/carrinho` - Obter carrinho
- `POST /api/carrinho/add` - Adicionar item
- `POST /api/carrinho/remove/:id` - Remover item
- `POST /api/carrinho/limpar` - Limpar carrinho
- `GET /api/carrinho/total` - Obter total

### Pedidos
- `POST /api/pedidos` - Criar novo pedido
- `GET /api/pedidos` - Listar todos os pedidos
- `GET /api/pedidos/:id` - Obter um pedido específico
- `PUT /api/pedidos/:id/status` - Atualizar status

### Estoque
- `GET /api/estoque` - Obter estoque
- `PUT /api/estoque/:id` - Atualizar estoque
- `GET /api/estoque/alertas` - Obter alertas (estoque < 5)

### WhatsApp
- `GET /api/whatsapp/webhook` - Verificar webhook
- `POST /api/whatsapp/webhook` - Receber mensagens
- `POST /api/whatsapp/enviar` - Enviar mensagem

## 🌐 Páginas

### Loja (index.html)
- **Home**: Página inicial com apresentação
- **Catálogo**: Exibição de todos os perfumes
- **Carrinho**: Carrinho de compras com finalização de pedido

### Admin (admin.html)
- **Perfumes**: Adicionar, editar e deletar perfumes
- **Pedidos**: Visualizar e atualizar status dos pedidos
- **Estoque**: Monitorar alertas de estoque baixo

## 📲 Integração WhatsApp

O sistema envia automaticamente:
1. **Notificação de novo pedido** para o administrador
2. **Confirmação de pedido** para o cliente
3. **Atualizações de status** em tempo real

## 🔐 Segurança

- Nunca commit arquivos `.env` com dados sensíveis
- Use variáveis de ambiente para todas as chaves
- Implemente autenticação no painel admin
- Valide todos os dados no backend

## 📦 Dependências

- **Express.js** - Framework web
- **Axios** - Cliente HTTP
- **dotenv** - Variáveis de ambiente
- **CORS** - Cross-Origin Resource Sharing
- **Body Parser** - Parser de requisições
- **Google Spreadsheet** - Integração com Google Sheets
- **QRCode** - Geração de QR Codes

## 🚀 Deploy

### Heroku
```bash
heroku create seu-app-name
git push heroku main
heroku config:set WHATSAPP_PHONE_NUMBER=seu_numero
```

### Vercel
```bash
vercel
```

## 📞 Suporte

Para suporte, entre em contato via WhatsApp: [+55 82 99838-0780](https://wa.me/5582998380780)

## 📄 Licença

Este projeto está sob a licença MIT.

---

**🌹 Desenvolvido com ❤️ para Lopes Perfumes Importados**
