// Mostrar/Ocultar Seções
function mostrarSecao(id) {
    // Ocultar todas as seções
    const secoes = document.querySelectorAll('.secao');
    secoes.forEach(secao => secao.classList.remove('ativo'));
    
    // Mostrar a seção selecionada
    const secaoAtiva = document.getElementById(id);
    if (secaoAtiva) {
        secaoAtiva.classList.add('ativo');
    }
    
    // Carregar dados se necessário
    if (id === 'catalogo') {
        carregarPerfumes();
    } else if (id === 'carrinho') {
        atualizarCarrinho();
    }
}

// Carrinho de Compras (usando localStorage)
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Carregar Perfumes
function carregarPerfumes() {
    fetch('/api/perfumes')
        .then(response => response.json())
        .then(perfumes => {
            const listaPerfumes = document.getElementById('lista-perfumes');
            listaPerfumes.innerHTML = '';
            
            perfumes.forEach(perfume => {
                const card = document.createElement('div');
                card.className = 'card-perfume';
                const classeEstoque = perfume.estoque <= 5 ? 'baixo' : '';
                
                card.innerHTML = `
                    <div class="card-perfume-imagem">💐</div>
                    <div class="card-perfume-corpo">
                        <div class="card-perfume-nome">${perfume.nome}</div>
                        <div class="card-perfume-marca">${perfume.marca}</div>
                        <div class="card-perfume-descricao">${perfume.descricao}</div>
                        <div class="card-perfume-preco">R$ ${perfume.preco.toFixed(2)}</div>
                        <div class="card-perfume-estoque ${classeEstoque}">Estoque: ${perfume.estoque} un</div>
                        <button class="btn btn-primary" onclick="adicionarAoCarrinho(${perfume.id}, '${perfume.nome}', ${perfume.preco}, '${perfume.imagem}')">Adicionar ao Carrinho</button>
                    </div>
                `;
                listaPerfumes.appendChild(card);
            });
        })
        .catch(error => console.error('Erro ao carregar perfumes:', error));
}

// Adicionar ao Carrinho
function adicionarAoCarrinho(id, nome, preco, imagem) {
    const itemExistente = carrinho.find(item => item.id === id);
    
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            id,
            nome,
            preco,
            imagem,
            quantidade: 1
        });
    }
    
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarTotalItens();
    
    // Mostrar notificação
    alert(`${nome} adicionado ao carrinho!`);
}

// Atualizar Carrinho
function atualizarCarrinho() {
    const carrinhoVazio = document.getElementById('carrinho-vazio');
    const carrinhoCheio = document.getElementById('carrinho-cheio');
    
    if (carrinho.length === 0) {
        carrinhoVazio.style.display = 'block';
        carrinhoCheio.style.display = 'none';
    } else {
        carrinhoVazio.style.display = 'none';
        carrinhoCheio.style.display = 'block';
        
        const itensCarrinho = document.getElementById('itens-carrinho');
        itensCarrinho.innerHTML = '';
        
        let total = 0;
        
        carrinho.forEach(item => {
            const totalItem = item.preco * item.quantidade;
            total += totalItem;
            
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${item.nome}</td>
                <td>R$ ${item.preco.toFixed(2)}</td>
                <td>
                    <input type="number" value="${item.quantidade}" min="1" onchange="atualizarQuantidade(${item.id}, this.value)" style="width: 60px;">
                </td>
                <td>R$ ${totalItem.toFixed(2)}</td>
                <td><button class="btn btn-danger" onclick="removerDoCarrinho(${item.id})">Remover</button></td>
            `;
            itensCarrinho.appendChild(linha);
        });
        
        document.getElementById('total-carrinho').textContent = total.toFixed(2);
    }
}

// Atualizar Quantidade
function atualizarQuantidade(id, novaQuantidade) {
    const item = carrinho.find(item => item.id === id);
    if (item) {
        item.quantidade = parseInt(novaQuantidade);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarCarrinho();
        atualizarTotalItens();
    }
}

// Remover do Carrinho
function removerDoCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
    atualizarTotalItens();
}

// Atualizar Total de Itens
function atualizarTotalItens() {
    const totalItens = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
    document.getElementById('total-itens').textContent = totalItens;
}

// Finalizar Pedido
function finalizarPedido() {
    const nome = document.getElementById('nome-cliente').value;
    const telefone = document.getElementById('telefone-cliente').value;
    const endereco = document.getElementById('endereco-cliente').value;
    const observacoes = document.getElementById('observacoes').value;
    
    if (!nome || !telefone || !endereco) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }
    
    // Validar telefone
    const telefoneLimpo = telefone.replace(/\D/g, '');
    if (telefoneLimpo.length < 10) {
        alert('Por favor, insira um telefone válido!');
        return;
    }
    
    const pedido = {
        cliente: nome,
        telefone: '+55' + telefoneLimpo,
        carrinho: carrinho,
        endereco: endereco,
        observacoes: observacoes
    };
    
    // Enviar pedido
    fetch('/api/pedidos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedido)
    })
    .then(response => response.json())
    .then(data => {
        alert('✅ Pedido criado com sucesso! Você receberá uma mensagem no WhatsApp em breve.');
        
        // Limpar carrinho
        carrinho = [];
        localStorage.removeItem('carrinho');
        atualizarTotalItens();
        
        // Limpar formulário
        document.getElementById('nome-cliente').value = '';
        document.getElementById('telefone-cliente').value = '';
        document.getElementById('endereco-cliente').value = '';
        document.getElementById('observacoes').value = '';
        
        // Voltar para home
        mostrarSecao('home');
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('❌ Erro ao criar pedido. Tente novamente ou entre em contato via WhatsApp.');
    });
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    mostrarSecao('home');
    atualizarTotalItens();
});
