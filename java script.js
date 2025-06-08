/* Reset básico */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Orbitron', sans-serif;
  background-color: #0f0f1a;
  color: #ffffff;
  line-height: 1.6;
  padding-bottom: 100px;
}

/* Estilo general */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1a1a2e;
  padding: 15px 20px;
  box-shadow: 0 0 10px #8e2de2;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #8e2de2;
  text-shadow: 0 0 5px #8e2de2, 0 0 10px #c471ed;
}

nav {
  display: flex;
  gap: 15px;
}

nav a {
  text-decoration: none;
  color: #fff;
  font-weight: 600;
  transition: color 0.3s;
}

nav a:hover {
  color: #c471ed;
}

.actions button {
  background: #8e2de2;
  color: #fff;
  border: none;
  padding: 8px 14px;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 4px;
  font-weight: bold;
  box-shadow: 0 0 5px #8e2de2, 0 0 10px #c471ed;
  transition: background 0.3s;
}

.actions button:hover {
  background: #c471ed;
}

/* Botón hamburguesa */
.hamburger {
  display: none;
  font-size: 24px;
  background: none;
  color: white;
  border: none;
  cursor: pointer;
}

/* Secciones */
main {
  padding: 30px 20px;
}

section {
  margin-bottom: 50px;
}

h1, h2, h3 {
  color: #c471ed;
  text-shadow: 0 0 5px #8e2de2;
  margin-bottom: 15px;
}

/* Productos */
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.product {
  background: #1f1f2f;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 0 10px #8e2de2;
  transition: transform 0.3s;
}

.product:hover {
  transform: translateY(-5px);
}

.product img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.product button {
  background: #8e2de2;
  color: white;
  border: none;
  padding: 8px;
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 0 5px #8e2de2, 0 0 10px #c471ed;
  margin-top: 10px;
}

.product button:hover {
  background: #c471ed;
}

/* Carrito */
.cart {
  position: fixed;
  right: 0;
  top: 70px;
  background: #1a1a2e;
  padding: 20px;
  width: 300px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: -5px 0 15px #8e2de2;
  border-left: 2px solid #8e2de2;
  z-index: 999;
}

.cart.hidden {
  display: none;
}

.cart button {
  margin-top: 10px;
  width: 100%;
}

/* Checkout */
#checkout-section {
  background: #1f1f2f;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px #8e2de2;
  max-width: 600px;
  margin: 0 auto;
}

#checkout-section h2 {
  margin-bottom: 15px;
}

#checkout-section ul {
  list-style: none;
  margin-bottom: 20px;
}

#checkout-section label {
  display: block;
  margin-top: 10px;
}

#checkout-section input, #checkout-section select {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  background: #10101a;
  border: 1px solid #8e2de2;
  border-radius: 4px;
  color: #fff;
}

#checkout-total {
  font-size: 1.2em;
  color: #8e2de2;
  font-weight: bold;
}

/* Responsivo */
@media (max-width: 768px) {
  nav {
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    background: #1a1a2e;
    width: 100%;
    display: none;
  }

  nav a {
    padding: 10px;
    display: block;
  }

  nav.hidden {
    display: none;
  }

  nav.show {
    display: flex;
  }

  .hamburger {
    display: block;
  }
}
