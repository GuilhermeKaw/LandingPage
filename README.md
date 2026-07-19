---

# LANDING PAGE OFICIAL – INFINIX MOD

### SOBRE O PROJETO

*Este é um site comercial de alto desempenho e landing page premium desenvolvida para o ecossistema Infinix Mod.*
*O sistema foi projetado com foco total em conversão de vendas, permitindo que clientes montem seus pacotes de upgrades (GTA V Online), gerenciem itens em tempo real e finalizem o pedido diretamente no WhatsApp de vendas com segurança anti-spam integrada.*
*Este projeto demonstra a aplicação prática de design responsivo avançado, manipulação dinâmica da DOM e persistência de dados local sem a necessidade de servidores pesados.*

### OBJETIVOS DO PROJETO

* *Aplicar conceitos avançados de JavaScript Vanilla (Puro) e manipulação de eventos.*
* *Implementar persistência de dados local segura no navegador do cliente.*
* *Desenvolver uma interface ultra-rápida focada na experiência do usuário (UX/UI).*
* *Estruturar estratégias de segurança front-end contra ataques de spam (trava de tempo).*
* *Criar uma estrutura visual moderna baseada no conceito Glassmorphism e Bento Grid.*

### FUNCIONALIDADES

#### GERENCIAMENTO DO CARRINHO DE COMPRAS

* *Adição dinâmica de planos e recursos avulsos com cálculo de subtotal automático.*
* *Validação de limites (máximo de 10 unidades por item e no máximo 4 produtos diferentes).*
* *Modal responsivo de revisão de pedidos com botões rápidos de controle de quantidade.*

#### SEGURANÇA E ANTI-SPAM (LOCALSTORAGE)

* *Geração automatizada de ID exclusivo de Pedido (#IFX-XXXXX) para cada transação.*
* *Trava de segurança que bloqueia novas tentativas de envio por 5 minutos após a finalização.*
* *Bloqueio inteligente contra carrinhos duplicados seguidos, evitando flood no atendimento.*

#### INTEGRAÇÃO DE DISPARO

* *Redirecionamento nativo e instantâneo para a API do WhatsApp.*
* *Mensagem gerada e formatada automaticamente em itálico com o resumo da compra e ID.*
* *Botão de suporte avulso livre para dúvidas gerais, sem interferir na trava de tempo de vendas.*

### TECNOLOGIAS UTILIZADAS

* *HTML5 (Estruturação semântica e acessibilidade)*
* *CSS3 (Variáveis nativas, Flexbox/Grid, animações de brilho e responsividade)*
* *JavaScript ES6+ (Lógica de carrinho, LocalStorage, travas e controle de DOM)*
* *ScrollReveal (Animações de entrada fluidas ao rolar a página)*
* *Font Awesome Icons (Biblioteca de vetores e ícones tecnológicos)*

### COMO EXECUTAR

1. *Baixe ou clone este repositório.*
2. *Certifique-se de manter os arquivos na mesma pasta raiz:*
* *index.html*
* *estilo.css*
* *main.js*
* *pictures/ (contendo a imagem de fundo)*


3. *Abra o arquivo index.html em qualquer navegador (Google Chrome, Safari, Edge, etc.).*
4. *O site funcionará imediatamente, simulando os cliques de compra e redirecionamento para o WhatsApp.*

### ESTRUTURA DO PROJETO

```text
LANDING-PAGE/
├─ pictures/
│  └─ download.jpeg
├─ index.html
├─ estilo.css
├─ main.js
├─ README.md
└─ LICENSE

```

*Cada arquivo tem uma responsabilidade isolada, facilitando a manutenção visual e a adição de novos planos.*

### EVOLUÇÃO TÉCNICA

*Este projeto representa:*

* *Avanço robusto no desenvolvimento web front-end sem dependência de frameworks.*
* *Domínio sobre armazenamento do lado do cliente utilizando a Web Storage API (localStorage).*
* *Construção de layouts modernos e complexos (Bento Grid assimétrico) adaptados para qualquer tela.*
* *Criação de soluções de lógica focadas em resolver problemas reais de negócios (Spam no WhatsApp).*

### PRÓXIMOS PASSOS

* *Implementar sistema nativo de cupons de desconto diretamente no modal do carrinho.*
* *Adicionar efeito de digitação dinâmica (Typewriter effect) nas chamadas principais do topo.*
* *Criar sistema de alertas discretos (Toasts) para simular prova social de novas vendas.*
* *Conectar domínio próprio personalizado (.com ou .com.br) na hospedagem da Vercel.*

### LICENÇA

*Este projeto está sob Licença MIT, permitindo:*

* *Uso*
* *Modificação*
* *Distribuição*
* *Uso comercial ou pessoal*

### AUTOR

*Guilherme Kawan Silva Rodrigues*
