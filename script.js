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

document.addEventListener('DOMContentLoaded', () => {



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

  // Produtos ORIGINAIS do seu site (COM IMAGEM CORRIGIDA DO ECHO DOT)
  const products = [
      {id:1,title:"Mini Projetor Portátil 5G Wi-Fi 6 Bluetooth 5.0 Android 11 4K",price:219.90,image:"https://m.media-amazon.com/images/I/519TeoR49WL._AC_SX679_.jpg",rating:4,link:"https://amzn.to/4mwqvdJ"},
      {id:2,title:"Fita LED RGB 5 metros",price:38.90,image:"https://m.media-amazon.com/images/I/61Gu8awQjQS._AC_SX679_.jpg",rating:3.9, link: "https://amzn.to/4mAaAv1"},
      {id:3,title:"Carregador Portátil Power Bank 20000mAh",price:78.99,image:"https://m.media-amazon.com/images/I/61Sj7eUvPGL._AC_SX679_.jpg",rating:5, link: "https://amzn.to/46xhV8F"},
      {id:4,title:"Escova de Limpeza Facial 2 em 1",price:26.90,image:"https://m.media-amazon.com/images/I/41m44GbZKJL._AC_SY450_.jpg",rating:4, link: "https://amzn.to/4n9MQii"},
      {id:5,title:"Kit Manicure 7 Peças em Aço Inoxidável",price:35.96,image:"https://m.media-amazon.com/images/I/61K2g9mjnaL._AC_SY450_.jpg",rating:4, link: "https://amzn.to/4nNhuOp"},
      {id:6,title:"Tablet 10.1 Polegadas",price:899.00,image:"https://m.media-amazon.com/images/I/61g3s+/vWTL._AC_SL1500_.jpg",rating:4.3, link: "https://amzn.to/3W7j7f2"},
      {id:7,title:"Caixa de Som Bluetooth",price:299.00,image:"https://m.media-amazon.com/images/I/71W+Ek1CbeL._AC_SL1500_.jpg",rating:4.7, link: "https://amzn.to/3W7j7f2"},
      {id:8,title:"Carregador Portátil 10000mAh",price:129.90,image:"https://m.media-amazon.com/images/I/51W7eYjYZTL._AC_SL1500_.jpg",rating:4.6, link: "https://amzn.to/3W7j7f2"}
  ];
  // ======= FUNÇÃO DE DESCRIÇÕES =======
  function getProductDescription(productId) {
      const descriptions = {
          1: "Mini Projetor Portátil 5G Wi-Fi 6 Bluetooth 5.0 Android 11 4K 1080P Full HD 8000 Lumens LED Auto Correção Trapezoidal Horizontal Rotação 180° Ideal para Projeções Cinemáticas",
          2: "Fita LED RGB 5 Metros 300 LEDs com Controle Remoto – Iluminação Personalizável para Ambientes",
          3: "Streaming em Full HD com Alexa, controle por voz e milhares de aplicativos",
          4: "Smartwatch com monitor cardíaco, notificações e 20 dias de bateria. Resistente à água",
          5: "Fone Bluetooth com 30h de bateria, cancelamento de ruído e som surround",
          6: "Tablet Android 11 com 64GB, câmera dupla e tela Full HD de 10.1 polegadas",
          7: "Caixa de som à prova d'água com 20W de potência, LED colorido e 12h de bateria",
          8: "Power bank 10000mAh com carregamento rápido, 2 portas USB e design compacto"
      };
      return descriptions[productId] || "Produto de alta qualidade com ótimo custo-benefício";
  }
  // Carrinho
  let cart = [];
  const cartCount = document.querySelector('.cart-count');
  const cartIcon = document.getElementById('cartIcon');
  const cartModal = document.getElementById('cartModal');
  const closeCartBtn = document.getElementById('closeModal');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const productsGrid = document.getElementById('productsGrid');
  const searchBox = document.getElementById('searchBox');

  // Funções de produto / carrinho
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
                  
                  <!-- DESCRIÇÃO ADICIONADA AQUI -->
                  <p class="product-description">${getProductDescription(product.id)}</p>
                  
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
              const id = parseInt(e.currentTarget.getAttribute('data-id'));
              addToCart(id);
          });
      });
  }

  function addToCart(id){
      const product = products.find(p => p.id === id);
      if(!product) return;
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
          btn.addEventListener('click', e => {
              const id = parseInt(e.currentTarget.getAttribute('data-id'));
              removeFromCart(id);
          });
      });
  }

  // ======= BOTÃO VOLTAR AO TOPO =======
  const backToTopBtn = document.getElementById('backToTop');

  // Mostrar/ocultar botão quando rolar a página
  window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
          backToTopBtn.classList.add('show');
      } else {
          backToTopBtn.classList.remove('show');
      }
  });

  // Voltar ao topo quando clicar no botão
  backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });

  // ======= NAVEGAÇÃO SUAVE PARA LINKS INTERNOS =======
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

  // Eventos
  cartIcon.addEventListener('click', () => {
      showCart();
      cartModal.style.display = 'flex';
  });

  if (closeCartBtn) {
      closeCartBtn.addEventListener('click', () => cartModal.style.display='none');
  }

  checkoutBtn.addEventListener('click', ()=> {
      if(cart.length===0){
          alert('Seu carrinho está vazio!');
          return;
      }
      // Abre APENAS os links da Amazon (sem fallback para Google)
      cart.forEach(item => {
          if (item.link && item.link.trim() !== '') {
              window.open(item.link, '_blank');
          }
      });
      cart = [];
      updateCart();
      cartModal.style.display='none';
  });

  // Pesquisa
  const notFoundModal = document.getElementById('notFoundModal');
  const produtoInput = document.getElementById('produtoDesejado');
  const closeNotFoundBtn = document.getElementById('closeNotFound');

  if (closeNotFoundBtn && notFoundModal) {
      closeNotFoundBtn.addEventListener('click', () => {
          notFoundModal.style.display = 'none';
      });
  }

  searchBox.addEventListener('input', e=>{
      const query = e.target.value.toLowerCase();
      displayProducts(products.filter(p=>p.title.toLowerCase().includes(query)));
  });

  // Pesquisa acionada com Enter - ABRE MODAL DO FORMSUBMIT
  searchBox.addEventListener('keydown', e => {
      if(e.key === 'Enter') {
          e.preventDefault();
          const query = searchBox.value.toLowerCase();
          const resultados = products.filter(p => p.title.toLowerCase().includes(query));
          displayProducts(resultados);

          if(resultados.length === 0 && query.length > 2 && notFoundModal) {
              notFoundModal.style.display = 'flex';
              if(produtoInput) produtoInput.value = query;
          }
      }
  });

  // Inicializar
  displayProducts(products);
  updateCart();

});