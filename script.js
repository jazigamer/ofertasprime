// ======= MODAIS GENÉRICOS =======
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'flex';
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'none';
}

// Fecha o modal se clicar fora do conteúdo
window.addEventListener('click', (e) => {
    document.querySelectorAll('.modal').forEach(modal => {
        if (e.target === modal) modal.style.display = 'none';
    });
});

// ======= PRODUTOS ATUALIZADOS COM OFERTAS REAIS =======
const products = [
    // OFERTAS URGENTES (área 1)
    {
        id: 1, 
        title: "Echo Dot (4ª Geração) - Oferta Relâmpago", 
        price: 299.00, 
        oldPrice: 379.05,
        discount: "21% OFF",
        image: "https://m.media-amazon.com/images/I/71Q9d6N7xkL._AC_SL1000_.jpg", 
        rating: 5, 
        link: "https://amzn.to/46Mdubb",
        category: "eletronicos",
        urgente: true
    },
    {
        id: 2, 
        title: "Kindle Paperwhite - Edição Especial", 
        price: 449.00, 
        oldPrice: 599.00,
        discount: "25% OFF",
        image: "https://m.media-amazon.com/images/I/61X96aH2OlL._AC_SL1000_.jpg", 
        rating: 4.8, 
        link: "https://amzn.to/3W7j7f2",
        category: "livros",
        urgente: true
    },
    {
        id: 3, 
        title: "Fire TV Stick Lite - Promoção do Dia", 
        price: 229.00, 
        oldPrice: 299.00,
        discount: "23% OFF",
        image: "https://m.media-amazon.com/images/I/51T3hX05+HL._AC_SL1000_.jpg", 
        rating: 4.6, 
        link: "https://amzn.to/3W7j7f2",
        category: "eletronicos",
        urgente: true
    },

    // CATÁLOGO COMPLETO (área 2)
    {
        id: 4, 
        title: "Smartwatch Amarelo - Inteligente", 
        price: 199.99, 
        oldPrice: 299.99,
        discount: "33% OFF",
        image: "https://m.media-amazon.com/images/I/711kAf716SL._AC_SL1500_.jpg", 
        rating: 4.5, 
        link: "https://amzn.to/3W7j7f2",
        category: "eletronicos",
        urgente: false
    },
    {
        id: 5, 
        title: "Fone de Ouvido Bluetooth - Cancelamento de Ruído", 
        price: 189.90, 
        oldPrice: 289.90,
        discount: "34% OFF",
        image: "https://m.media-amazon.com/images/I/61Fj+MaO72L._AC_SL1500_.jpg", 
        rating: 4.4, 
        link: "https://amzn.to/3W7j7f2",
        category: "eletronicos",
        urgente: false
    },
    {
        id: 6, 
        title: "Tablet 10.1 Polegadas - 64GB", 
        price: 799.00, 
        oldPrice: 999.00,
        discount: "20% OFF",
        image: "https://m.media-amazon.com/images/I/61g3s+/vWTL._AC_SL1500_.jpg", 
        rating: 4.3, 
        link: "https://amzn.to/3W7j7f2",
        category: "eletronicos",
        urgente: false
    },
    {
        id: 7, 
        title: "Air Fryer Mondial 4.5L - Digital", 
        price: 349.00, 
        oldPrice: 499.00,
        discount: "30% OFF",
        image: "https://images.tcdn.com.br/img/img_prod/1069771/fryer_eletrica_airfryer_af_30_bi_4_5_l_preto_220v_mondial_118_1_20201211120306.jpg", 
        rating: 4.7, 
        link: "https://amzn.to/3W7j7f2",
        category: "casa",
        urgente: false
    },
    {
        id: 8, 
        title: "Kit Maquiagem Profissional - 15 Peças", 
        price: 79.90, 
        oldPrice: 129.90,
        discount: "38% OFF",
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_608159-MLA53205156638_012023-F.webp", 
        rating: 4.6, 
        link: "https://amzn.to/3W7j7f2",
        category: "beleza",
        urgente: false
    }
];

// ======= FUNÇÕES AUXILIARES =======
function getProductDescription(id) {
    const descriptions = {
        1: "Echo Dot com Alexa: Smart speaker de maior qualidade de som.",
        2: "Kindle Paperwhite: Agora com tela de 6.8\" e luz quente ajustável.",
        3: "Fire TV Stick Lite: Controle por voz com Alexa (sem controles de TV).",
        4: "Smartwatch com monitor de frequência cardíaca e notificações.",
        5: "Fone Bluetooth com cancelamento de ruído ativo e 30h de bateria.",
        6: "Tablet Android com 64GB de armazenamento e tela Full HD.",
        7: "Air Fryer digital com capacidade para 4.5L e 7 programas.",
        8: "Kit maquiagem completo com pincéis e paleta de sombras."
    };
    return descriptions[id] || "Produto de alta qualidade com ótimo custo-benefício.";
}

function attachCartEvents() {
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(e.currentTarget.getAttribute('data-id'));
            addToCart(id);
        });
    });
}

// ======= FUNÇÕES PARA AS DUAS ÁREAS DE PRODUTOS =======
function displayOfertasUrgentes() {
    const ofertasGrid = document.getElementById('ofertasGrid');
    const ofertasUrgentes = products.filter(p => p.urgente);
    
    ofertasGrid.innerHTML = '';
    
    if(ofertasUrgentes.length === 0) {
        ofertasGrid.innerHTML = '<p>Nenhuma oferta urgente no momento.</p>';
        return;
    }
    
    ofertasUrgentes.forEach(product => {
        const productCard = createProductCard(product, true);
        ofertasGrid.appendChild(productCard);
    });
    
    attachCartEvents();
}

function displayCatalogoCompleto() {
    const catalogoGrid = document.getElementById('catalogoGrid');
    catalogoGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product, false);
        catalogoGrid.appendChild(productCard);
    });
    
    attachCartEvents();
}

function createProductCard(product, isOfertaUrgente) {
    const productCard = document.createElement('div');
    productCard.className = `product-card ${isOfertaUrgente ? 'urgente' : ''}`;
    
    const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
    
    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-description">${getProductDescription(product.id)}</p>
            <div class="product-rating">
                <span class="stars">${stars}</span>
                <span>${product.rating}</span>
            </div>
            <div class="product-price">
                R$ ${product.price.toFixed(2)}
                ${product.oldPrice ? `<span class="product-old-price">R$ ${product.oldPrice.toFixed(2)}</span>` : ''}
                ${product.discount ? `<span class="product-discount">${product.discount}</span>` : ''}
            </div>
            <button class="add-to-cart" data-id="${product.id}">🛒 Adicionar ao Carrinho</button>
        </div>
    `;
    
    return productCard;
}

// ======= FILTROS POR CATEGORIA =======
function setupCategoryFilters() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Ativar botão clicado
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar produtos
            const categoria = this.dataset.category;
            filterProductsByCategory(categoria);
        });
    });
}

function filterProductsByCategory(categoria) {
    const catalogoGrid = document.getElementById('catalogoGrid');
    const produtosFiltrados = categoria === 'todos' 
        ? products 
        : products.filter(p => p.category === categoria);
    
    catalogoGrid.innerHTML = '';
    produtosFiltrados.forEach(product => {
        const productCard = createProductCard(product, false);
        catalogoGrid.appendChild(productCard);
    });
    
    attachCartEvents();
}

// ======= FUNÇÕES DO CARRINHO =======
let cart = [];
const cartCount = document.querySelector('.cart-count');
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const closeCartBtn = document.getElementById('closeModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const searchBox = document.getElementById('searchBox');

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if(!product) return;
    const item = cart.find(i => i.id === id);
    if(item) item.quantity++;
    else cart.push({...product, quantity:1});
    updateCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
    showCart();
}

function updateCart() {
    cartCount.textContent = cart.reduce((sum,item)=>sum+item.quantity,0);
    cartTotal.textContent = `R$ ${cart.reduce((sum,item)=>sum+item.price*item.quantity,0).toFixed(2)}`;
}

function showCart() {
    cartItems.innerHTML = '';
    if(cart.length===0) {
        cartItems.innerHTML = '<p>Seu carrinho está vazio.</p>';
        return;
    }
    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="cart-item-info">
                <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${item.title}</h4>
                    <div class="cart-item-price">R$ ${item.price.toFixed(2)} x ${item.quantity}</div>
                </div>
            </div>
            <div>
                <button class="remove-item" data-id="${item.id}">❌</button>
            </div>
        `;
        cartItems.appendChild(div);
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(e.currentTarget.getAttribute('data-id'));
            removeFromCart(id);
        });
    });
}

// ======= PESQUISA =======
function setupSearch() {
    const notFoundModal = document.getElementById('notFoundModal');
    const produtoInput = document.getElementById('produtoDesejado');
    const closeNotFoundBtn = document.getElementById('closeNotFound');

    if (closeNotFoundBtn && notFoundModal) {
        closeNotFoundBtn.addEventListener('click', () => {
            notFoundModal.style.display = 'none';
        });
    }

    searchBox.addEventListener('input', e => {
        const query = e.target.value.toLowerCase();
        const resultados = products.filter(p => p.title.toLowerCase().includes(query));
        displaySearchResults(resultados);
    });

    // Pesquisa acionada com Enter
    searchBox.addEventListener('keydown', e => {
        if(e.key === 'Enter') {
            e.preventDefault();
            const query = searchBox.value.toLowerCase();
            const resultados = products.filter(p => p.title.toLowerCase().includes(query));
            displaySearchResults(resultados);

            if(resultados.length === 0 && query.length > 2 && notFoundModal) {
                notFoundModal.style.display = 'flex';
                if(produtoInput) produtoInput.value = query;
            }
        }
    });
}

function displaySearchResults(resultados) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    if(resultados.length === 0) {
        productsGrid.innerHTML = '<p>Nenhum produto encontrado.</p>';
        return;
    }
    
    resultados.forEach(product => {
        const productCard = createProductCard(product, false);
        productsGrid.appendChild(productCard);
    });
    
    attachCartEvents();
}

// ======= BOTÃO VOLTAR AO TOPO =======
function setupBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ======= NAVEGAÇÃO SUAVE =======
function setupSmoothNavigation() {
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ======= TEMA CLARO/ESCURO =======
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    } else {
        body.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
    }
    
    themeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            themeToggle.textContent = '🌙';
        } else {
            body.setAttribute('data-theme', 'dark');
            themeToggle.textContent = '☀️';
        }
    });
}

// ======= INICIALIZAÇÃO =======
document.addEventListener('DOMContentLoaded', () => {
    // Configurações iniciais
    setupThemeToggle();
    setupBackToTop();
    setupSmoothNavigation();
    setupSearch();
    setupCategoryFilters();
    
    // Inicializar as áreas de produtos
    displayOfertasUrgentes();
    displayCatalogoCompleto();
    
    // Configurar eventos do carrinho
    cartIcon.addEventListener('click', () => {
        showCart();
        cartModal.style.display = 'flex';
    });

    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', () => cartModal.style.display='none');
    }

    checkoutBtn.addEventListener('click', () => {
        if(cart.length===0) {
            alert('Seu carrinho está vazio!');
            return;
        }
        
        // Abre APENAS os links da Amazon
        cart.forEach(item => {
            if (item.link && item.link.trim() !== '') {
                window.open(item.link, '_blank');
            }
        });
        
        cart = [];
        updateCart();
        cartModal.style.display='none';
    });

    // Inicializar carrinho
    updateCart();
});