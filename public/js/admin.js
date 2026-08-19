// Mostrar/Ocultar Abas
function mostrarAbaSistema(nomeAba) {
    // Ocultar todas as abas
    const abas = document.querySelectorAll('.aba-admin');
    abas.forEach(aba => aba.classList.remove('aba-ativa'));
    
    // Remover classe ativa dos botões
    const botoes = document.querySelectorAll('.tab-btn');
    botoes.forEach(btn => btn.classList.remove('ativo'));
    
    // Mostrar aba selecionada
    const abaAtiva = document.getElementById(nomeAba);
    if (abaAtiva) {
        abaAtiva.classList.add('aba-ativa');
    }
    
    // Marcar botão como ativo
    event.target.classList.add('ativo');
    
    // Carregar dados
    if (nomeAba === 'perfumes') {
        carregarPerfumes();
    } else if (nomeAba === 'pedidos') {
        carregarPedidos();
    } else if (nomeAba === 'estoque') {
        carregarAlertas();
    }
}

// PERFUMES
function carregarPerfumes() {
    fetch('/api/perfumes')
        .then(response => response.json())
        .then(perfumes => {
            const corpo = document.getElementById('corpo-perfumes');
            corpo.innerHTML = '';
            
            perfumes.forEach(perfume => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${perfume.id}</td>
                    <td>${perfume.nome}</td>
                    <td>${perfume.marca}</td>
                    <td>R$ ${perfume.preco.toFixed(2)}</td>
                    <td>${perfume.estoque}</td>
                    <td>
                        <button class="btn btn-warning" onclick="editarPerfume(${perfume.id})">Editar</button>
                        <button class="btn btn-danger" onclick="deletarPerfume(${perfume.id})">Deletar</button>
                    </td>
                `;
                corpo.appendChild(linha);
            });
        })
        .catch(error => console.error('Erro ao carregar perfumes:', error));
}

function adicionarPerfume() {
    const nome = document.getElementById('nome-perfume').value;
    const marca = document.getElementById('marca-perfume').value;
    const preco = parseFloat(document.getElementById('preco-perfume').value);
    const descricao = document.getElementById('descricao-perfume').value;
    const estoque = parseInt(document.getElementById('estoque-perfume').value);
    
    if (!nome || !marca || !preco || !estoque) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }
    
    const perfume = {
        nome,
        marca,
        preco,
        descricao,
        estoque,
        imagem: '/images/perfume.jpg'
    };
    
    fetch('/api/perfumes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(perfume)
    })
    .then(response => response.json())
    .then(data => {
        alert('✅ Perfume adicionado com sucesso!');
        document.getElementById('nome-perfume').value = '';
        document.getElementById('marca-perfume').value = '';
        document.getElementById('preco-perfume').value = '';
        document.getElementById('descricao-perfume').value = '';
        document.getElementById('estoque-perfume').value = '';
        carregarPerfumes();
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('❌ Erro ao adicionar perfume!');
    });
}

function editarPerfume(id) {
    alert('Função de edição será implementada em breve!');
}

function deletarPerfume(id) {
    if (confirm('Tem certeza que deseja deletar este perfume?')) {
        fetch(`/api/perfumes/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            alert('✅ Perfume deletado com sucesso!');
            carregarPerfumes();
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('❌ Erro ao deletar perfume!');
        });
    }
}

// PEDIDOS
function carregarPedidos() {
    fetch('/api/pedidos')
        .then(response => response.json())
        .then(pedidos => {
            const corpo = document.getElementById('corpo-pedidos');
            corpo.innerHTML = '';
            
            pedidos.forEach(pedido => {
                const data = new Date(pedido.dataPedido).toLocaleDateString('pt-BR');
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${pedido.id}</td>
                    <td>${pedido.cliente}</td>
                    <td>${pedido.telefone}</td>
                    <td>R$ ${pedido.total}</td>
                    <td>
                        <select class="status-select" onchange="atualizarStatusPedido(${pedido.id}, this.value)" value="${pedido.status}">
                            <option value="pendente" ${pedido.status === 'pendente' ? 'selected' : ''}>Pendente</option>
                            <option value="confirmado" ${pedido.status === 'confirmado' ? 'selected' : ''}>Confirmado</option>
                            <option value="enviado" ${pedido.status === 'enviado' ? 'selected' : ''}>Enviado</option>
                            <option value="entregue" ${pedido.status === 'entregue' ? 'selected' : ''}>Entregue</option>
                            <option value="cancelado" ${pedido.status === 'cancelado' ? 'selected' : ''}>Cancelado</option>
                        </select>
                    </td>
                    <td>${data}</td>
                    <td>
                        <button class="btn btn-warning" onclick="verDetalhes(${pedido.id})">Detalhes</button>
                    </td>
                `;
                corpo.appendChild(linha);
            });
        })
        .catch(error => console.error('Erro ao carregar pedidos:', error));
}

function atualizarStatusPedido(id, novoStatus) {
    fetch(`/api/pedidos/${id}/status`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: novoStatus })
    })
    .then(response => response.json())
    .then(data => {
        alert('✅ Status atualizado com sucesso! Mensagem enviada ao cliente via WhatsApp.');
        carregarPedidos();
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('❌ Erro ao atualizar status!');
    });
}

function verDetalhes(id) {
    alert(`Detalhes do pedido #${id}\n\nFunção de visualização será implementada em breve!`);
}

function filtrarPedidos() {
    const filtro = document.getElementById('filtro-status').value;
    if (filtro === '') {
        carregarPedidos();
    } else {
        // Implementar filtro na API
        alert('Filtro será implementado em breve!');
    }
}

// ESTOQUE
function carregarAlertas() {
    fetch('/api/estoque/alertas')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('alertas-container');
            container.innerHTML = '';
            
            if (data.alertas.length === 0) {
                container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">✅ Nenhum alerta de estoque!</p>';
                return;
            }
            
            data.alertas.forEach(item => {
                const card = document.createElement('div');
                card.className = 'card-alerta';
                card.innerHTML = `
                    <h4>${item.nome}</h4>
                    <p>Marca: ${item.marca}</p>
                    <p>Preço: R$ ${item.preco}</p>
                    <p class="estoque-critico">Estoque: ${item.quantidade} un</p>
                    <button class="btn btn-primary" onclick="atualizarEstoque(${item.id})">Atualizar Estoque</button>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => console.error('Erro ao carregar alertas:', error));
}

function atualizarEstoque(id) {
    const novaQuantidade = prompt('Digite a nova quantidade em estoque:');
    if (novaQuantidade !== null && novaQuantidade !== '') {
        fetch(`/api/estoque/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantidade: parseInt(novaQuantidade) })
        })
        .then(response => response.json())
        .then(data => {
            alert('✅ Estoque atualizado com sucesso!');
            carregarAlertas();
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('❌ Erro ao atualizar estoque!');
        });
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    carregarPerfumes();
});
