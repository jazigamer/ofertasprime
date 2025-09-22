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

// Tema claro/escuro
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

// Produtos
const products = [
    {id:1,title:"Echo Dot (4ª Geração)",price:379.05,image:"https://m.media-amazon.com/images/I/71Q9d6N7xkL._AC_SL1000_.jpg",rating:5,link:"https://amzn.to/46Mdubb"},
    {id:2,title:"Kit 10 Mini Pincéis De Maquiagem Com Estojo Para Viagem – Cerdas Macias, Travel Size, Necessaire inclusa, Pincéis Para Base, Blush, Pó, Sombras e Corretivo, Portátil e Multifuncional",price:39.09,image:"https://m.media-amazon.com/images/I/61JM98HOnyL._AC_SX679_.jpg",rating:4.2,link:"https://amzn.to/4nfEjur"},
    {id:3,title:"Kit com 07 pincéis para maquiagem - KP1-3E, Macrilan",price:32.95,image:"https://m.media-amazon.com/images/I/91mroqWZypL._AC_SX679_.jpg",rating:4.6,link:"https://amzn.to/46xM3AH"},
    {id:4,title:"Caixa de Som Bluetooth Super Mini",price:25.50,image:"https://m.media-amazon.com/images/I/51gOtOs6IFL._AC_SX679_.jpg",rating:4.2,link:"https://amzn.to/4nFR7d7"},
    {id:5,title:"Faqueiro Tramontina Búzios cem Aço Inox com Detalhe 24 Peças",price:81.82,image:"https://m.media-amazon.com/images/I/61x2HGF7CfL._AC_SX569_.jpg",rating:4.7, link:"https://amzn.to/3Kii5cl"},
    {id:6,title:"Camesa Tapete de Banheiro Super Soft 60x40cm - Cinza,Azul,Piscina e Rosé",price:37.79,image:"https://m.media-amazon.com/images/I/81ntip9bhtL._AC_SX679_.jpg",rating:4.5, link:"https://amzn.to/47ZAqFb"},
    {id:7,title:"Mesa de Centro Sala Classic Oval com Pés em Madeira Maciça Branco/Amendoa",price:172.90,image:"https://m.media-amazon.com/images/I/71pH4LY2zTL._AC_SX679_.jpg",rating:4.2,link:"https://amzn.to/3IuFaIg"},
    {id:8,title:"Roteador wireless n 300 mbps, com antenas externa, 4 portas lan 10/100, 1",price:101.00,image:"https://m.media-amazon.com/images/I/61Hyezc7WgL._AC_SY879_.jpg",rating:4.7,link:"https://amzn.to/4mCZci4"}
];

// Carrinho
let cart = [];
const cartCount = document.querySelector('.cart-count');
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const closeModal = document.getElementById('closeModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const productsGrid = document.getElementById('productsGrid');
const searchBox = document.getElementById('searchBox');

// Funções
function displayProducts(list){
    productsGrid.innerHTML = '';
    if(list.length === 0){
        productsGrid.innerHTML = '<p>Nenhum produto encontrado.</p>';
        return;
    }
    list.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-rating">
                    <span class="stars">${stars}</span>
                    <span>${product.rating}</span>
                </div>
                <div class="product-price">R$ ${product.price.toFixed(2)}</div>
                <button class="add-to-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(e.target.getAttribute('data-id'));
            addToCart(id);
        });
    });
}

function addToCart(id){
    const product = products.find(p => p.id === id);
    const item = cart.find(i => i.id === id);
    if(item) item.quantity++;
    else cart.push({...product, quantity:1});
    updateCart();
}

function removeFromCart(id){
    cart = cart.filter(item => item.id !== id);
    updateCart();
    showCart();
}

function updateCart(){
    cartCount.textContent = cart.reduce((sum,item)=>sum+item.quantity,0);
    cartTotal.textContent = `R$ ${cart.reduce((sum,item)=>sum+item.price*item.quantity,0).toFixed(2)}`;
}

function showCart(){
    cartItems.innerHTML = '';
    if(cart.length===0){
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
        btn.addEventListener('click', e => removeFromCart(parseInt(e.target.getAttribute('data-id'))));
    });
}

// Eventos
cartIcon.addEventListener('click', () => {
    showCart();
    cartModal.style.display = 'flex';
});
closeModal.addEventListener('click', () => cartModal.style.display='none');
checkoutBtn.addEventListener('click', ()=>{
    if(cart.length===0){ 
        alert('Seu carrinho está vazio!'); 
        return; 
    }
    cart.forEach(item => {
        window.open(item.link, '_blank'); // abre o produto oficial em nova aba
    });
    cart = [];
    updateCart();
    cartModal.style.display='none';
});


// Pesquisa
searchBox.addEventListener('input', e=>{
    const query = e.target.value.toLowerCase();
    displayProducts(products.filter(p=>p.title.toLowerCase().includes(query)));
});
// Pesquisa acionada com Enter
searchBox.addEventListener('keydown', e => {
    if(e.key === 'Enter') {
        e.preventDefault(); // evita enviar o form se tiver
        const query = searchBox.value.toLowerCase();
        const resultados = products.filter(p => p.title.toLowerCase().includes(query));
        displayProducts(resultados);

        if(resultados.length === 0 && query.length > 2) {
            const notFoundModal = document.getElementById('notFoundModal');
            const produtoInput = document.getElementById('produtoDesejado');
            notFoundModal.style.display = 'flex';
            produtoInput.value = query;

            document.getElementById('closeNotFound').onclick = () => {
                notFoundModal.style.display = 'none';
            };
        }
    }
});


// Inicializar
displayProducts(products);
updateCart();