// ==== Funções de Modais Gerais ====
function openModal(id) {
  document.getElementById(id).style.display = 'block';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

// Fecha modais ao clicar fora
window.onclick = function(event) {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
};

// ==== Carrinho ====
let cart = [];
const cartCount = document.querySelector('.cart-count');
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const cartCloseBtn = document.getElementById('closeModal'); // renomeado para não sobrescrever função
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const productsGrid = document.getElementById('productsGrid');
const searchBox = document.getElementById('searchBox');

// Abre carrinho
cartIcon.addEventListener('click', () => cartModal.style.display = 'block');

// Fecha carrinho
cartCloseBtn.addEventListener('click', () => cartModal.style.display = 'none');

// Atualiza carrinho
function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remover';
    removeBtn.onclick = () => {
      cart.splice(index, 1);
      updateCart();
    };
    li.appendChild(removeBtn);
    cartItems.appendChild(li);

    total += item.price;
  });

  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = cart.length;
}

// Adiciona produto ao carrinho
function addToCart(product) {
  cart.push(product);
  updateCart();
}

// Pesquisa de produtos
searchBox.addEventListener('keyup', function(e) {
  const term = e.target.value.toLowerCase();
  const products = productsGrid.querySelectorAll('.product-card');

  let found = false;
  products.forEach(product => {
    const name = product.querySelector('h4').textContent.toLowerCase();
    if (name.includes(term)) {
      product.style.display = 'block';
      found = true;
    } else {
      product.style.display = 'none';
    }
  });

  const notFoundModal = document.getElementById('notFoundModal');
  if (!found && term !== '') {
    notFoundModal.style.display = 'block';
  } else {
    notFoundModal.style.display = 'none';
  }
});

// Checkout
checkoutBtn.addEventListener('click', () => {
  alert("Finalizando compra...");
  cart = [];
  updateCart();
  cartModal.style.display = 'none';
});

// ==== Fechar modal Not Found ====
const closeNotFoundBtn = document.getElementById('closeNotFound');
if (closeNotFoundBtn) {
  closeNotFoundBtn.onclick = () => {
    document.getElementById('notFoundModal').style.display = 'none';
  };
}