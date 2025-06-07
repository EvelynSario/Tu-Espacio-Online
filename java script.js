// ============================
// 🔧 Firebase Configuración
// ============================
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO.firebaseapp.com",
  projectId: "TU_ID",
  appId: "TU_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => {
      alert("Bienvenido, " + result.user.displayName);
    })
    .catch(error => {
      alert("Error al iniciar sesión: " + error.message);
    });
}

// ============================
// 🛒 Productos y Carrito
// ============================
const products = [
  { name: "Sofá Azul", price: 320, img: "https://via.placeholder.com/200x150" },
  { name: "Mesa Moderna", price: 150, img: "https://via.placeholder.com/200x150" },
  { name: "Lámpara LED", price: 60, img: "https://via.placeholder.com/200x150" }
];

let cart = [];
const cartCountEl = document.getElementById("cart-count");
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");

function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

function toggleCart() {
  const cartEl = document.getElementById("cart");
  cartEl.style.display = cartEl.style.display === "block" ? "none" : "block";
}

function renderProducts() {
  const productList = document.getElementById("product-list");
  products.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}" width="100%" />
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="addToCart(${index})">Agregar</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart(index) {
  cart.push(products[index]);
  updateCart();
}

function updateCart() {
  cartItemsEl.innerHTML = "";
  let total = 0;
  cart.forEach((item, i) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    const btn = document.createElement("button");
    btn.textContent = "Eliminar";
    btn.onclick = () => removeFromCart(i);
    li.appendChild(btn);
    cartItemsEl.appendChild(li);
    total += item.price;
  });
  cartTotalEl.textContent = total;
  cartCountEl.textContent = cart.length;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }
  alert("Gracias por tu compra.");
  cart = [];
  updateCart();
}

// Inicializa productos
renderProducts();
