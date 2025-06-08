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
    name: "Silla de Oficina",
    price: 180,
    description: "Ergonómica y cómoda para largas horas.",
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 5,
    name: "Estantería",
    price: 220,
    description: "Ideal para organizar tu espacio.",
    image: "https://images.unsplash.com/photo-1505692794403-7d6e0f8b2c63?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 6,
    name: "Cama King Size",
    price: 750,
    description: "Máximo confort para descansar.",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 7,
    name: "Escritorio Minimalista",
    price: 320,
    description: "Perfecto para tu oficina en casa.",
    image: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 8,
    name: "Sillón Relax",
    price: 400,
    description: "Relájate después de un día largo.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&q=80"
  }
];

const productListEl = document.getElementById("product-list");
const cartEl = document.getElementById("cart");
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const cartCountEl = document.getElementById("cart-count");
const menuEl = document.getElementById("menu");
const checkoutEl = document.getElementById("checkout");
const checkoutItemsEl = document.getElementById("checkout-items");
const checkoutTotalEl = document.getElementById("checkout-total");
const addressInput = document.getElementById("address");
const paymentMethodSelect = document.getElementById("payment-method");

let cart = [];

// Renderizar productos en la página
function renderProducts() {
  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <p><strong>$${p.price.toFixed(2)}</strong></p>
      <button onclick="addToCart(${p.id})">Agregar al carrito</button>
    `;
    productListEl.appendChild(div);
  });
}

// Agregar producto al carrito
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({...product, quantity: 1});
  }
  updateCart();
  alert(`${product.name} agregado al carrito`);
}

// Actualizar carrito en UI
function updateCart() {
  cartItemsEl.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    count += item.quantity;

    const li = document.createElement("li");
    li.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;

    const btn = document.createElement("button");
    btn.textContent = "X";
    btn.onclick = () => removeFromCart(item.id);

    li.appendChild(btn);
    cartItemsEl.appendChild(li);
  });

  cartTotalEl.textContent = total.toFixed(2);
  cartCountEl.textContent = count;

  if (cart.length === 0) {
    cartEl.classList.add("hidden");
  }
}

// Quitar producto del carrito
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

// Mostrar/ocultar carrito
function toggleCart() {
  if(cart.length === 0) {
    alert("El carrito está vacío.");
    return;
  }
  cartEl.classList.toggle("hidden");
}

// Mostrar/ocultar menú hamburguesa
function toggleMenu() {
  menuEl.classList.toggle("hidden");
}

// Checkout - mostrar resumen y formulario
function checkout() {
  if(cart.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  cartEl.classList.add("hidden");
  menuEl.classList.add("hidden");

  checkoutEl.classList.remove("hidden");

  checkoutItemsEl.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const li = document.createElement("li");
    li.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
    checkoutItemsEl.appendChild(li);
  });

  checkoutTotalEl.textContent = total.toFixed(2);
  addressInput.value = "";
  paymentMethodSelect.value = "tarjeta";
}

// Cancelar checkout
function cancelCheckout() {
  checkoutEl.classList.add("hidden");
  if(cart.length > 0) {
    cartEl.classList.remove("hidden");
  }
}

// Confirmar compra simulada
function confirmPurchase() {
  const address = addressInput.value.trim();
  const paymentMethod = paymentMethodSelect.value;

  if(address === "") {
    alert("Por favor ingresa tu dirección de envío.");
    return;
  }

  alert(`Gracias por tu compra!\nDirección: ${address}\nMétodo de pago: ${paymentMethod}\nTotal: $${checkoutTotalEl.textContent}`);

  cart = [];
  updateCart();
  checkoutEl.classList.add("hidden");
}

// Firebase Google Sign-In
function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => {
      alert(`Bienvenido ${result.user.displayName}`);
      document.getElementById("login-btn").textContent = "Sesión iniciada";
      document.getElementById("login-btn").disabled = true;
    })
    .catch(error => {
      alert("Error de inicio de sesión: " + error.message);
    });
}

// Inicializar
renderProducts();
updateCart();
