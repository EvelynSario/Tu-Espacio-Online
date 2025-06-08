// Configuración Firebase (reemplaza con tu config real)
const firebaseConfig = {
  apiKey: "AIzaSyBhIzR8YAM2QHYXFEHHQDiQkM4kSf-w2E4",
  authDomain: "tu-espacio-online.firebaseapp.com",
  projectId: "tu-espacio-online",
  storageBucket: "tu-espacio-online.firebasestorage.app",
  messagingSenderId: "74908938191",
  appId: "1:74908938191:web:d0e78ba481550cff12ecba"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.getElementById("login-btn").onclick = () => {
  document.getElementById("auth-modal").style.display = "flex";
};
document.getElementById("signup-btn").onclick = () => {
  document.getElementById("auth-modal").style.display = "flex";
};
document.getElementById("close-modal").onclick = () => {
  document.getElementById("auth-modal").style.display = "none";
};
document.getElementById("google-login").onclick = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => alert(`Bienvenido, ${result.user.displayName}`))
    .catch(err => alert("Error: " + err.message));
};
document.getElementById("facebook-login").onclick = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => alert(`Bienvenido, ${result.user.displayName}`))
    .catch(err => alert("Error: " + err.message));
};

let carrito = [];
const actualizarCarrito = () => {
  const lista = document.getElementById("cart-items");
  const total = document.getElementById("cart-total");
  const count = document.getElementById("cart-count");
  lista.innerHTML = "";
  let suma = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;

    // Botón para quitar producto
    const quitarBtn = document.createElement("button");
    quitarBtn.textContent = "❌ Quitar";
    quitarBtn.style.marginLeft = "10px";
    quitarBtn.onclick = () => {
      carrito.splice(index, 1);
      actualizarCarrito();
      actualizarEstadoPagar(); // Actualizar estado del botón pagar
    };

    li.appendChild(quitarBtn);
    lista.appendChild(li);
    suma += item.precio;
  });

  total.textContent = suma.toFixed(2);
  count.textContent = carrito.length;
};

document.querySelectorAll(".add-cart").forEach(btn => {
  btn.addEventListener("click", e => {
    const producto = e.target.parentElement;
    const nombre = producto.getAttribute("data-nombre");
    const precio = parseFloat(producto.getAttribute("data-precio"));
    carrito.push({ nombre, precio });
    actualizarCarrito();
    actualizarEstadoPagar(); // Actualizar estado del botón pagar
  });
});

document.getElementById("cart-btn").onclick = () => {
  document.getElementById("cart-modal").style.display = "flex";
};
document.getElementById("close-cart").onclick = () => {
  document.getElementById("cart-modal").style.display = "none";
};

/* BOTÓN HAMBURGUESA */
const hamburgerBtn = document.getElementById("hamburger-btn");
const sidebar = document.getElementById("sidebar");

hamburgerBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

/* Cerrar menú al hacer click en enlace (móvil) */
sidebar.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      sidebar.classList.remove("open");
    }
  });
});

/* Mostrar sección de checkout al dar clic en "Pagar" */
document.getElementById("checkout-btn").addEventListener("click", () => {
  if(carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }
  document.getElementById("cart-modal").style.display = "none";
  document.getElementById("checkout-section").style.display = "block";

  // Calcular total
  let suma = carrito.reduce((acc, item) => acc + item.precio, 0);
  document.getElementById("checkout-total").textContent = suma.toFixed(2);

  // Mostrar resumen de productos en el checkout
  const checkoutItems = document.getElementById("checkout-items");
  checkoutItems.innerHTML = "";
  carrito.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;
    checkoutItems.appendChild(li);
  });

  // Scroll al checkout
  window.scrollTo({
    top: document.getElementById("checkout-section").offsetTop,
    behavior: "smooth"
  });
});

/* Validar y procesar el formulario de checkout */
document.getElementById("checkout-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("checkout-nombre").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const metodo = document.getElementById("metodo-pago").value;

  if (!nombre || !direccion || !metodo) {
    alert("Por favor completa todos los campos.");
    return;
  }

  alert("Gracias por tu compra, " + nombre + ". ¡Tu pedido está en camino!");
  carrito = [];
  actualizarCarrito();
  actualizarEstadoPagar(); // Actualizar estado del botón pagar
  document.getElementById("checkout-form").reset();
  document.getElementById("checkout-section").style.display = "none";
});

/* Habilitar o deshabilitar botón pagar según contenido del carrito */
const checkoutBtn = document.getElementById("checkout-btn");
const actualizarEstadoPagar = () => {
  checkoutBtn.disabled = carrito.length === 0;
};

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
