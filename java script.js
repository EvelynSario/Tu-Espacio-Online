let cart = [];
const cartItemsEl = document.getElementById('cart-items');
const cartCountEl = document.getElementById('cart-count');
const cartTotalEl = document.getElementById('cart-total');

function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

function openLogin() {
  document.getElementById('loginModal').style.display = 'flex';
}

function closeLogin() {
  document.getElementById('loginModal').style.display = 'none';
}

function toggleCart() {
  const cartEl = document.getElementById('cart');
  cartEl.style.display = cartEl.style.display === 'block' ? 'none' : 'block';
}

function addToCart(product, price) {
  cart.push({ product, price });
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  cartItemsEl.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.product} - $${item.price}`;
    const btn = document.createElement('button');
    btn.textContent = 'Eliminar';
    btn.onclick = () => removeFromCart(index);
    li.appendChild(btn);
    cartItemsEl.appendChild(li);
    total += item.price;
  });
  cartCountEl.textContent = cart.length;
  cartTotalEl.textContent = total;
}

function checkout() {
  if (cart.length === 0) {
    alert('El carrito está vacío.');
    return;
  }
  alert('Gracias por tu compra.');
  cart = [];
  updateCart();
}
