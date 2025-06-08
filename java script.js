// Configuración Firebase
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

// Productos
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
    name: "Silla de Oficina",
    price: 200,
    description: "Silla ergonómica ajustable.",
    image: "https://images.unsplash.com/photo-1582582421738-cc7ee1a63d0e?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 5,
    name: "Espejo Decorativo",
    price: 80,
    description: "Espejo circular moderno.",
    image: "https://images.unsplash.com/photo-1605003013994-dde4eab1274e?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 6,
    name: "Librero Minimalista",
    price: 180,
    description: "Estantería para libros en madera clara.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 7,
    name: "Cama King Size",
    price: 750,
    description: "Cama amplia con base de madera.",
    image: "https://images.unsplash.com/photo-1585559611331-63e5b89c6d5a?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 8,
    name: "Cortinas Blackout",
    price: 90,
    description: "Cortinas para bloquear la luz.",
    image: "https://images.unsplash.com/photo-1601979031925-3cc84fd17a8c?auto=format&fit=crop&w=400&q=80"
  }
];

const productList = document.getElementById("product-list");
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const cartCountEl = document.getElementById("cart-count");
const cartEl = document.getElementById("cart");
const menuEl = document.getElementById("menu");
const loginBtn = document.getElementById("login-btn");
const checkoutSection = document.getElementById("checkout-section");
const checkoutList = document.getElementById("checkout-list");
const checkoutTotal = document.getElementById("checkout-total");

let cart = [];

// Mostrar productos
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

// Agregar al carrito
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity++;
  } else {
    cart.push({...product, quantity: 1});
  }
  updateCart();
}

// Eliminar del carrito
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

// Actualizar carrito
function updateCart() {
  cartItemsEl.innerHTML = "";
  let total = 0;
  let count = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    count += item.quantity;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} x${item.quantity} - $${item.price * item.quantity}
      <button onclick="removeFromCart(${item.id})">Eliminar</button>
    `;
    cartItemsEl.appendChild(li);
  });
  cartTotalEl.textContent = total.toFixed(2);
  cartCountEl.textContent = count;
  if (cart.length === 0) {
    cartEl.classList.add("hidden");
  }
}

// Toggle carrito y menú
function toggleCart() {
  cartEl.classList.toggle("hidden");
}

function toggleMenu() {
  menuEl.classList.toggle("hidden");
}

// Checkout
function checkout() {
  if (cart.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }
  checkoutList.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} x${item.quantity} - $${item.price * item.quantity}`;
    checkoutList.appendChild(li);
    total += item.price * item.quantity;
  });
  checkoutTotal.textContent = total.toFixed(2);
  document.getElementById("checkout-section").scrollIntoView({ behavior: "smooth" });
}

// Login con Google
function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      alert(`Bienvenido, ${user.displayName}`);
      loginBtn.textContent = "Cerrar sesión";
      loginBtn.onclick = signOut;
    })
    .catch(error => {
      console.error(error);
      alert("No se pudo iniciar sesión.");
    });
}

// Logout
function signOut() {
  auth.signOut().then(() => {
    alert("Sesión cerrada.");
    loginBtn.textContent = "Iniciar sesión con Google";
    loginBtn.onclick = signInWithGoogle;
  });
}

// Iniciar
renderProducts();
updateCart();
