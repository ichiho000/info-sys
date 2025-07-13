window.onload = function () {
  var id = getIdFromQuery();
  var target = getProductById(id);
  if (!target) return;

  document.getElementById("product-name").innerHTML = target.name;
  document.getElementById("product-description").innerHTML = target.description;
  document.getElementById("product-price").innerHTML = "¥" + target.price;
  document.getElementById("product-image").src = target.image_url;

  var btn = document.getElementById("add-to-cart");
  btn.setAttribute("data-id", target.id);
  btn.onclick = addCart;
};

function getIdFromQuery() {
  var s = window.location.search;
  if (!s) return null;
  var pair = s.replace("?", "").split("=");
  return parseInt(pair[1], 10);
}

function getProductById(id) {
  for (var i = 0; i < products.length; i++) {
    if (products[i].id === id) return products[i];
  }
  return null;
}

function addCart() {
  var id = parseInt(this.getAttribute("data-id"), 10);
  var cart = [];
  var store = localStorage.getItem("cart");
  if (store) {
    cart = JSON.parse(store);
  }

  var found = false;
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart[i].quantity++;
      found = true;
      break;
    }
  }

  if (!found) {
    cart.push({ id: id, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("カートに追加しました");
}