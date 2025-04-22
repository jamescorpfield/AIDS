fetch("http://localhost:5000/products")
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById("product-list");
    products.forEach(product => {
      const div = document.createElement("div");
      div.textContent = `${product.name} - $${product.price}`;
      container.appendChild(div);
    });
  });


let cart = [];

function renderProducts(products) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";
  products.forEach(product => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p><strong>${product.name}</strong> - $${product.price}</p>
      <button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

function addToCart(product) {
  cart.push(product);
  alert(`${product.name} added to cart.`);
}

function placeOrder() {
  if (cart.length === 0) return alert("Cart is empty.");
  fetch("http://localhost:5000/orders", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ items: cart })
  })
  .then(res => res.json())
  .then(data => {
    alert("Order placed successfully!");
    cart = [];
  });
}

fetch("http://localhost:5000/products")
  .then(res => res.json())
  .then(renderProducts);

// Add "Place Order" button
const btn = document.createElement("button");
btn.textContent = "Place Order";
btn.onclick = placeOrder;
document.body.appendChild(btn);
