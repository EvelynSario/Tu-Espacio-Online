// Configuración Firebase (reemplaza con la tuya real)
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
const cartCountEl = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const checkoutSection = document.getElementById('checkout-section');
const checkoutItems = document.getElementById('checkout-items');
const checkoutTotalEl = document.getElementById('checkout-total'); // Este id no está en HTML, puedes agregarlo si quieres mostrar total aquí
const checkoutForm = document.getElementById('checkout-form');
const checkoutBtn = document.getElementById('checkout-btn');
const openCartBtn = document.getElementById('open-cart-btn');

let cart = [];

const products = [
  { id: 1, name: "Silla Gamer", price: 1200, image: "https://i.ibb.co/W6r4Jtp/silla-gamer.png" },
  { id: 2, name: "Escritorio Moderno", price: 2500, image: "https://i.ibb.co/RH6dNrZ/escritorio-moderno.png" },
  { id: 3, name: "Lámpara LED", price: 450, image: "https://i.ibb.co/2sjH4Jq/lampara-led.png" },
  { id: 4, name: "Sofá Minimalista", price: 3500, image: "https://i.ibb.co/n0TbDXp/sofa-minimalista.png" },
  { id: 5, name: "Mesa Auxiliar", price: 800, image: "https://i.ibb.co/wW4T9ZJ/mesa-auxiliar.png" },
  { id: 6, name: "Alfombra Geométrica", price: 900, image: "https://i.ibb.co/8xq0sLn/alfombra.png" },
  { id: 7, name: "Estantería de Madera", price: 1500, image: "https://i.ibb.co/YyR8B03/estanteria.png" },
  { id: 8, name: "Cuadro Decorativo", price: 600, image: "https://i.ibb.co/jJ1RY2q/cuadro.png" },
];

// Renderizar productos en la página
function renderProducts() {
  productListEl.innerHTML = '';
  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product neon-card';
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>Precio: $${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})" class="neon-btn">Agregar al carrito</button>
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
  actualizarEstadoPagar();
}

// Actualizar la interfaz del carrito
function updateCartUI() {
  cartCountEl.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartItemsEl.innerHTML = '';

  cart.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
      <button onclick="removeFromCart(${item.id})" class="neon-btn" style="margin-left:10px;">X</button>
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
  actualizarEstadoPagar();
}

// Habilitar o deshabilitar botón "Pagar"
function actualizarEstadoPagar() {
  checkoutBtn.disabled = cart.length === 0;
}

// Mostrar/ocultar modal carrito
openCartBtn.addEventListener('click', () => {
  cartModal.style.display = 'block';
  checkoutSection.style.display = 'none';
});

document.getElementById('close-cart').addEventListener('click', () => {
  cartModal.style.display = 'none';
});

// Mostrar checkout y resumen al dar click en pagar
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }
  cartModal.style.display = 'none';
  checkoutSection.style.display = 'block';

  // Mostrar resumen productos en checkout
  checkoutItems.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
    checkoutItems.appendChild(li);
  });

  // Total checkout (si decides agregar el span #checkout-total en HTML, actualizar aquí)
  // Si no está, puedes ignorar esta línea
  if (checkoutTotalEl) {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    checkoutTotalEl.textContent = total.toFixed(2);
  }

  window.scrollTo({
    top: checkoutSection.offsetTop,
    behavior: 'smooth'
  });
});

// Manejar envío del formulario de checkout
checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = document.getElementById('checkout-nombre').value.trim();
  const direccion = document.getElementById('direccion').value.trim();
  const metodo = document.getElementById('metodo-pago').value;

  if (!nombre || !direccion || !metodo) {
    alert("Por favor completa todos los campos.");
    return;
  }

  alert(`Gracias por tu compra, ${nombre}. ¡Tu pedido está en camino!`);

  // Resetear todo
  cart = [];
  updateCartUI();
  actualizarEstadoPagar();
  checkoutForm.reset();
  checkoutSection.style.display = 'none';
});

// ----- Firebase Auth (login Google y Facebook) -----

const authModal = document.getElementById('auth-modal');
const closeModalBtn = document.getElementById('close-modal');
const googleLoginBtn = document.getElementById('google-login');
const facebookLoginBtn = document.getElementById('facebook-login');

// Mostrar modal login (puedes agregar botón en la UI para abrirlo)
function showAuthModal() {
  authModal.style.display = 'block';
}
function closeAuthModal() {
  authModal.style.display = 'none';
}

closeModalBtn.addEventListener('click', closeAuthModal);

// Login con Google
googleLoginBtn.addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then((result) => {
      alert(`Bienvenido ${result.user.displayName}`);
      closeAuthModal();
    })
    .catch((error) => {
      alert(`Error en autenticación Google: ${error.message}`);
    });
});

// Login con Facebook
facebookLoginBtn.addEventListener('click', () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  auth.signInWithPopup(provider)
    .then((result) => {
      alert(`Bienvenido ${result.user.displayName}`);
      closeAuthModal();
    })
    .catch((error) => {
      alert(`Error en autenticación Facebook: ${error.message}`);
    });
});

// Para probar abrir modal autenticación
// showAuthModal();


// Inicializar renderizado
renderProducts();
actualizarEstadoPagar();
updateCartUI();
