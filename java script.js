// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBhIzR8YAM2QHYXFEHHQDiQkM4kSf-w2E4",
  authDomain: "tu-espacio-online.firebaseapp.com",
  projectId: "tu-espacio-online",
  storageBucket: "tu-espacio-online.appspot.com",
  messagingSenderId: "74908938191",
  appId: "1:74908938191:web:d0e78ba481550cff12ecba"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const products = [
  {
    id: 1,
    name: "Sofá Moderno",
    price: 450,
    description: "Cómodo sofá para sala de estar.",
    image: "https://images.unsplash.com/photo-1567016549945-54b070d26b55?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    name: "Mesa de Comedor",
    price: 300,
    description: "Mesa elegante de madera.",
    image: "https://images.unsplash.com/photo-1549187774-b4e9b0445b9b?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    name: "Lámpara de Techo",
    price: 120,
    description: "Lámpara moderna para iluminar.",
    image: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    name: "Estantería Minimalista",
    price: 220,
    description: "Estantería de madera para organizar.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 5,
    name: "Alfombra Moderna",
    price: 180,
    description: "Alfombra con diseño geométrico.",
    image: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 6,
    name: "Silla de Oficina",
    price: 130,
    description: "Silla ergonómica para oficina.",
    image: "https://images.unsplash.com/photo-1556910103-1d09e60b38a6?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 7,
    name: "Mesa de Noche",
    price: 90,
    description: "Mesa pequeña para dormitorio.",
    image: "https://images.unsplash.com/photo-1505692794403-66a8b4e1d90f?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 8,
    name: "Lámpara de Pie",
    price: 110,
    description: "Lámpara elegante para salón.",
    image: "https://images.unsplash.com/photo-1477768663690-19e1ab68e8ee?auto=format&fit=crop&w=400&q=80"
  }
];

const productList = document.getElementById("product-list");
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const cartCountEl = document.getElementById("cart-count");
const cartEl = document.getElementById("cart");
const menuEl = document.getElementById("menu");
const loginBtn = document.getElementById("login-btn");
const checkoutSection = document.getElementById("checkout");
const checkoutSummary = document.getElementById("checkout-summary");
const checkoutForm = document.getElementById("checkout-form");

let cart = [];

// Renderiza productos
function renderProducts() {
  productList.innerHTML = "";
  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p><strong>$${product.price}</strong></p>
      <button onclick="addToCart(${product.id})">Agregar al carrito</button>
    `;
    productList.appendChild(div);
  });
}

// Añadir al carrito
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const item = cart.find(i => i.id === id);

  if (item) {
    item.quantity++;
  } else {
    cart.push({...product, quantity: 1});
  }
  updateCart();
  alert(`"${product.name}" agregado al carrito.`);
}

// Eliminar del carrito
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

// Actualizar carrito y contador
function updateCart() {
  cartItemsEl.innerHTML = "";
  let total = 0;
  let count = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    count += item.quantity;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
      <button onclick="removeFromCart(${item.id})">Eliminar</button>
    `;
    cartItemsEl.appendChild(li);
  });
  cartTotalEl.textContent = total.toFixed(2);
  cartCountEl.textContent = count;
}

// Mostrar/ocultar carrito
function toggleCart() {
  cartEl.classList.toggle("hidden");
}

// Mostrar/ocultar menú hamburguesa
function toggleMenu() {
  if (menuEl.classList.contains("show")) {
    menuEl.classList.remove("show");
  } else {
    menuEl.classList.add("show");
  }
}

// Checkout
function goToCheckout() {
  if (cart.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  // Ocultar carrito y mostrar checkout
  cartEl.classList.add("hidden");
  checkoutSection.classList.remove("hidden");

  // Mostrar resumen del carrito
  checkoutSummary.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const p = document.createElement("p");
    p.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
    checkoutSummary.appendChild(p);
  });
  const totalP = document.createElement("p");
  totalP.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
  checkoutSummary.appendChild(totalP);
}

// Cancelar checkout
function cancelCheckout() {
  checkoutSection.classList.add("hidden");
}

// Enviar formulario checkout
checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Compra confirmada. Gracias por tu compra!");
  cart = [];
  updateCart();
  checkoutSection.classList.add("hidden");
  checkoutForm.reset();
});

// Autenticación Google con Firebase
function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then((result) => {
      alert(`Bienvenido ${result.user.displayName}`);
      loginBtn.textContent = `Hola, ${result.user.displayName}`;
      loginBtn.disabled = true;
    })
    .catch((error) => {
      alert("Error en el inicio de sesión: " + error.message);
    });
}

// Inicializar página
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCart();
});
