// Configuración Firebase (reemplaza con tu config real)
const firebaseConfig = {
  apiKey: "AIzaSyBhIzR8YAM2QHYXFEHHQDiQkM4kSf-w2E4",
  authDomain: "tu-espacio-online.firebaseapp.com",
  projectId: "tu-espacio-online",
  storageBucket: "tu-espacio-online.firebasestorage.app",
  messagingSenderId: "74908938191",
  appId: "1:74908938191:web:d0e78ba481550cff12ecba"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Variables globales
const productListEl = document.getElementById('product-list');
const cartEl = document.getElementById('cart');
const cartCountEl = document.getElementById('cart-count');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');

const checkoutSection = document.getElementById('checkout-section');
const checkoutProductsEl = document.getElementById('checkout-products');
const checkoutTotalEl = document.getElementById('checkout-total');
const checkoutForm = document.getElementById('checkout-form');

let cart = [];

// Lista de productos (ejemplo con 8 productos)
const products = [
  { id: 1, name: "maceta", price: 1200, image:"img/maceta.jpg"},
  { id: 2, name: "espejo-circular", price: 2500, image: "img/espejo-circular.jpg"},
  { id: 3, name: "lampara-led", price: 450, image: "img/lampara-led.jpg"},
  { id: 4, name: "sofa-minimalista", price: 3500, image: "img/sofa-minimalista.jpg"},
  { id: 5, name: "mesa-minimalista", price: 800, image: "img/mesa-minimalista.jpg" },
{ id: 6, name: "alfombra-geometrica", price: 900, image: "img/alfombra-geometrica.jpg" },
{ id: 7, name: "estanteria-de-madera", price: 1500, image: "img/estanteria-madera.jpg" },
{ id: 8, name: "cuadro-decorativo", price: 600, image: "img/cuadro-decorativo.jpg" },

];



// Función para renderizar productos
function renderProducts() {
  productListEl.innerHTML = '';
  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>Precio: $${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Agregar al carrito</button>
    `;
    productListEl.appendChild(div);
  });
}

// Añadir producto al carrito
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartUI();
}

// Actualizar UI del carrito
function updateCartUI() {
  cartCountEl.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartItemsEl.innerHTML = '';

  cart.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
      <button onclick="removeFromCart(${item.id})">X</button>
    `;
    cartItemsEl.appendChild(li);
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotalEl.textContent = total.toFixed(2);
}

// Remover producto del carrito
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
}

// Mostrar/ocultar carrito
function toggleCart() {
  cartEl.classList.toggle('hidden');
  checkoutSection.classList.add('hidden');
}

// Pasar a checkout
function goToCheckout() {
  if (cart.length === 0) {
    alert('El carrito está vacío.');
    return;
  }

  cartEl.classList.add('hidden');
  checkoutSection.classList.remove('hidden');
  renderCheckout();
}

// Renderizar checkout
function renderCheckout() {
  checkoutProductsEl.innerHTML = '';
  cart.forEach(item => {
    const p = document.createElement('p');
    p.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
    checkoutProductsEl.appendChild(p);
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  checkoutTotalEl.textContent = total.toFixed(2);
}

// Cancelar checkout
function cancelCheckout() {
  checkoutSection.classList.add('hidden');
}

// Manejar formulario checkout
checkoutForm.addEventListener('submit', e => {
  e.preventDefault();

  const paymentMethod = document.getElementById('payment-method').value;
  const address = document.getElementById('address').value.trim();

  if (!paymentMethod) {
    alert('Seleccione un método de pago.');
    return;
  }
  if (!address) {
    alert('Ingrese la dirección de envío.');
    return;
  }

  alert(`Pago realizado con éxito usando ${paymentMethod}.  
  Envío a: ${address}  
  Total: $${checkoutTotalEl.textContent}`);

  cart = [];
  updateCartUI();
  checkoutSection.classList.add('hidden');
});

// Toggle menú hamburguesa
function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('hidden');
}

// Login con Google
function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      alert(`Bienvenido, ${user.displayName}`);
      document.getElementById('login-btn').style.display = 'none';
    })
    .catch(error => {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión. Inténtalo de nuevo.');
    });
}

// Al cargar la página:
window.onload = () => {
  renderProducts();
  updateCartUI();
};
