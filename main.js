// Efeito visual de luz nos cards ao mover o mouse
const cards = document.querySelectorAll('.minimal-vip-card');
cards.forEach(card => {
    const fixedGlow = card.querySelector('.card-radial-glow');
    if (!fixedGlow) return;
    const mouseGlow = document.createElement('div');
    mouseGlow.classList.add('card-mouse-glow');
    card.appendChild(mouseGlow);
    const posicoesDeBorda = [
        { left: '-150px', top: '-150px' },
        { left: 'calc(100% - 150px)', top: '-150px' },
        { left: '-150px', top: 'calc(100% - 150px)' },
        { left: 'calc(100% - 150px)', top: 'calc(100% - 150px)' },
        { left: 'calc(50% - 150px)', top: '-150px' },
        { left: '-150px', top: 'calc(50% - 150px)' },
        { left: 'calc(100% - 150px)', top: 'calc(50% - 150px)' }
    ];
    
    const posicaoSorteada = posicoesDeBorda[Math.floor(Math.random() * posicoesDeBorda.length)];
    
    fixedGlow.style.left = posicaoSorteada.left;
    fixedGlow.style.top = posicaoSorteada.top;
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        mouseGlow.style.left = `${x - 125}px`;
        mouseGlow.style.top = `${y - 125}px`;
    });
});

// Inicialização do ScrollReveal (Reseta a distorção horizontal pós-animação)
if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal({
        origin: 'bottom',
        distance: '30px',     
        duration: 800,        
        delay: 0,             
        reset: false,
        afterReveal: function (el) {
            el.style.transform = 'none';
        }
    });
    ScrollReveal().reveal('.badge-reveal');
    ScrollReveal().reveal('.hero-content h1');
    ScrollReveal().reveal('.hero-p');
    ScrollReveal().reveal('.hero-cta');
    ScrollReveal().reveal('.title-reveal');
    ScrollReveal().reveal('.subtitle-reveal');
    ScrollReveal().reveal('.category-title');
    ScrollReveal().reveal('.step-item', { interval: 150 });
    ScrollReveal().reveal('.reveal-left');
    ScrollReveal().reveal('.reveal-bottom');
    ScrollReveal().reveal('.reveal-right');
}

// Controle do FAQ Accordion
const faqTriggers = document.querySelectorAll('.faq-accordion-trigger');
faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
        const parentItem = this.parentElement;
        const contentArea = this.nextElementSibling;
        const isOpen = parentItem.classList.contains('active');
        
        document.querySelectorAll('.faq-accordion-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq-accordion-content').style.maxHeight = null;
        });
        
        if (!isOpen) {
            parentItem.classList.add('active');
            contentArea.style.maxHeight = contentArea.scrollHeight + "px";
        }
    });
});

// Configurações Globais do Carrinho e Contatos
const WHATSAPP_VENDAS = "5521992307841"; 
const WHATSAPP_SUPORTE = "5583988931266";
const TEMPO_COOLDOWN_MINUTOS = 5;
let carrinho = [];
let timeoutAviso = null;

// Exibição do banner de alertas internos do modal
function mostrarAvisoCarrinho(texto, tipo = 'erro') {
    const banner = document.getElementById('cart-warning-banner');
    const textSpan = document.getElementById('cart-warning-text');
    if (!banner || !textSpan) return;
    
    textSpan.innerText = texto;
    
    if (tipo === 'sucesso') {
        banner.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
        banner.style.borderColor = '#10b981';
        textSpan.style.color = '#10b981';
        const icone = banner.querySelector('i, .fa-triangle-exclamation');
        if (icone) icone.style.color = '#10b981';
    } else {
        banner.style.backgroundColor = '';
        banner.style.borderColor = '';
        textSpan.style.color = '';
        const icone = banner.querySelector('i, .fa-triangle-exclamation');
        if (icone) icone.style.color = '';
    }
    
    banner.classList.add('show');
    
    if (timeoutAviso) clearTimeout(timeoutAviso);
    timeoutAviso = setTimeout(() => { banner.classList.remove('show'); }, 5000);
}

// Inserção de itens no objeto do carrinho (Limites: 4 itens distintos / 10 qts por item)
function adicionarAoCarrinho(nome, preco, tipo) {
    const itemExistente = carrinho.find(item => item.nome === nome);
    
    if (itemExistente) {
        if (itemExistente.quantidade >= 10) {
            abrirCarrinho();
            mostrarAvisoCarrinho(`Atenção: O limite máximo é de 10 unidades para este item!`, 'erro');
            return;
        }
        itemExistente.quantidade += 1;
    } else {
        if (carrinho.length >= 4) {
            abrirCarrinho();
            mostrarAvisoCarrinho(`Atenção: Você pode adicionar no máximo 4 produtos diferentes ao carrinho!`, 'erro');
            return;
        }
        carrinho.push({ nome: nome, preco: parseFloat(preco), tipo: tipo, metadata_tipo: tipo, Club_count: 1, quantidade: 1 });
    }
    renderizarCarrinho();
    abrirCarrinho();
}

// Alteração de quantidades (+/-) dentro do modal
function alterarQuantidade(nome, mudanca) {
    const item = carrinho.find(item => item.nome === nome);
    if (!item) return;
    
    if (mudanca > 0 && item.quantidade >= 10) {
        mostrarAvisoCarrinho(`Atenção: O limite máximo é de 10 unidades para este item!`, 'erro');
        return;
    }
    item.quantidade += mudanca;
    if (item.quantidade <= 0) { carrinho = carrinho.filter(i => i.nome !== nome); }
    renderizarCarrinho();
}

// Remoção direta de um produto
function removerDoCarrinho(nome) {
    carrinho = carrinho.filter(item => item.nome !== nome);
    renderizarCarrinho();
}

// Atualização e montagem do HTML dinâmico do carrinho
function renderizarCarrinho() {
    const container = document.getElementById('cart-items-container');
    const totalElement = document.getElementById('cart-total-price');
    if (!container || !totalElement) return;
    
    container.innerHTML = '';
    if (carrinho.length === 0) {
        container.innerHTML = `<p style="color: var(--text-alt); text-align: center; font-size: 13px; padding: 20px 0;">Seu carrinho está vazio.</p>`;
        totalElement.innerText = "R$ 0,00";
        return;
    }
    
    let precoTotalGeral = 0;
    carrinho.forEach(item => {
        const subtotalItem = item.preco * item.quantidade;
        precoTotalGeral += subtotalItem;
        
        const itemRow = document.createElement('div');
        itemRow.classList.add('cart-item-row');
        itemRow.innerHTML = `
            <div class="cart-item-info">
                <span class="cart-item-type">${item.tipo}</span>
                <span class="cart-item-name">${item.nome}</span>
                <span class="cart-item-price">R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
            </div>
            <div class="cart-item-controls">
                <button class="qty-btn" onclick="alterarQuantidade('${item.nome}', -1)">-</button>
                <span class="cart-item-qty">${item.quantidade}</span>
                <button class="qty-btn" onclick="alterarQuantidade('${item.nome}', 1)">+</button>
                <button class="remove-item-btn" onclick="removerDoCarrinho('${item.nome}')">
                    <i class="fas fa-trash-can"></i>
                </button>
            </div>
        `;
        container.appendChild(itemRow);
    });
    totalElement.innerText = `R$ ${precoTotalGeral.toFixed(2).replace('.', ',')}`;
}

// Abre e fecha a janela modal
function abrirCarrinho() { document.getElementById('cart-modal').classList.add('active'); }
function fecharCarrinho() {
    document.getElementById('cart-modal').classList.remove('active');
    const banner = document.getElementById('cart-warning-banner');
    if (banner) banner.classList.remove('show');
}

// Geração do código identificador do pedido
function gerarIDPedido() {
    const caracteres = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; 
    let resultado = "";
    for (let i = 0; i < 5; i++) {
        resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return `#IFX-${resultado}`;
}

// Trava anti-spam baseada no tempo do navegador (LocalStorage)
function verificarTravaDeTempo() {
    const ultimoEnvioTimestamp = localStorage.getItem('infinix_timestamp_envio');
    if (!ultimoEnvioTimestamp) return { bloqueado: false };
    const agora = Date.now();
    const diferencaMilisegundos = agora - parseInt(ultimoEnvioTimestamp);
    const cooldownMilisegundos = TEMPO_COOLDOWN_MINUTOS * 60 * 1000;
    if (diferencaMilisegundos < cooldownMilisegundos) {
        const tempoRestanteMilisegundos = cooldownMilisegundos - diferencaMilisegundos;
        const minutosRestantes = Math.floor(tempoRestanteMilisegundos / 60 / 1000);
        const segundosRestantes = Math.floor((tempoRestanteMilisegundos % (60 * 1000)) / 1000);
        
        return {
            bloqueado: true,
            minutos: minutosRestantes,
            segundos: segundosRestantes
        };
    }
    return { bloqueado: false };
}

// Evita o reenvio consecutivo do mesmo objeto de carrinho
function verificarPedidoDuplicado(carrinhoAtual) {
    const stringPedidoAtual = carrinhoAtual.map(i => `${i.nome}:${i.quantidade}`).sort().join('|');
    const ultimoPedidoEnviado = localStorage.getItem('ultimo_pedido_infinix');
    
    if (ultimoPedidoEnviado === stringPedidoAtual) {
        return true; 
    }
    
    localStorage.setItem('ultimo_pedido_infinix', stringPedidoAtual);
    return false;
}

// Formatação do texto e disparo do redirecionamento para a API do WhatsApp (Vendas)
function enviarPedidoWhatsApp() {
    if (carrinho.length === 0) { 
        mostrarAvisoCarrinho("Atenção: Adicione pelo menos um item antes de finalizar!", 'erro'); 
        return; 
    }
    const statusTempo = verificarTravaDeTempo();
    if (statusTempo.bloqueado) {
        mostrarAvisoCarrinho(`Ação bloqueada! Aguarde ${statusTempo.minutos}m e ${statusTempo.segundos}s para enviar uma nova solicitação.`, 'erro');
        return;
    }
    if (verificarPedidoDuplicado(carrinho)) {
        mostrarAvisoCarrinho("Atenção: Esse pedido idêntico já foi enviado! Altere os itens se quiser fazer uma nova solicitação.", 'erro');
        return;
    }
    
    localStorage.setItem('infinix_timestamp_envio', Date.now().toString());
    const idPedido = gerarIDPedido();
    
    let mensagem = `_SOLICITAÇÃO DE UPGRADE — INFINIX MOD_\n`;
    mensagem += `_ID DO PEDIDO: ${idPedido}_\n\n`; 
    mensagem += `_Resumo do Pedido_\n\n`;
    let totalGeral = 0;
    
    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        totalGeral += subtotal;
        
        if (item.tipo === 'Plano') {
            mensagem += `_Plano Escolhido: ${item.nome}_\n`;
        } else {
            mensagem += `_Pedidos Personalizados: ${item.nome}_\n`;
        }
        mensagem += `_Quantidade: ${item.quantidade}x_\n`;
        mensagem += `_Valor: R$ ${subtotal.toFixed(2).replace('.', ',')}_\n\n`;
    });
    
    mensagem += `━━━━━━━━━━━━━━\n\n`;
    mensagem += `_Valor Total: R$ ${totalGeral.toFixed(2).replace('.', ',')}_\n\n`;
    mensagem += `_Status: Aguardando validação da equipe de suporte para início do procedimento na conta._`;
    
    window.open(`https://wa.me/${WHATSAPP_VENDAS}?text=${encodeURIComponent(mensagem)}`, '_blank');
    carrinho = [];
    renderizarCarrinho();
    mostrarAvisoCarrinho(`Sucesso: Pedido ${idPedido} gerado! Redirecionando para o WhatsApp...`, 'sucesso');
}

// Abertura direta do canal de dúvidas (Sem travas de Cooldown)
function chamarSuporteAvulso() {
    let msgSuporte = `_Olá! Gostaria de tirar algumas dúvidas sobre os procedimentos de Upagem da Infinix Mod antes de fechar meu pacote._`;
    window.open(`https://wa.me/${WHATSAPP_SUPORTE}?text=${encodeURIComponent(msgSuporte)}`, '_blank');
}

// Ativação do menu hambúrguer responsivo
const btnMobile = document.getElementById('btn-mobile');
function toggleMenu(event) {
    if (event.type === 'touchstart') event.preventDefault();
    const nav = document.getElementById('nav');
    nav.classList.toggle('active');
}
if (btnMobile) {
    btnMobile.addEventListener('click', toggleMenu);
    btnMobile.addEventListener('touchstart', toggleMenu);
}
const menuLinks = document.querySelectorAll('#menu a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        const nav = document.getElementById('nav');
        if (nav) nav.classList.remove('active');
    });
});

// Travas de segurança contra ferramentas de inspeção (Botão direito e atalhos F12/Ctrl)
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', event => {
    if (
        event.key === 'F12' || 
        (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'J' || event.key === 'C')) || 
        (event.ctrlKey && event.key === 'U')
    ) {
        event.preventDefault();
    }
});