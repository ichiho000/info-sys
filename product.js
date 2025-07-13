window.onload = function() {
var query = location.search;
var idStart = query.split("=")[1];
var id = parseInt(idStart,10);

var product = null;
  for (var i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      product = products[i];
      break;
    }
  }

if (!product) {
  alert("商品が見つかりません。");
  return;
}

document.getElementById("product-image").src = product.image_url;
document.getElementById("product-image").alt = product.name;
document.getElementById("product-name").innerText = product.name;
document.getElementById("product-description").innerText = product.description;
document.getElementById("product-price").textContent = "¥" + product.price;

document.getElementById("add-to-cart").onclick = function () {
  var cart = [];
  var stored = localStorage.getItem("cart");
  if (stored) {
    cart = JSON.parse(stored);
  }

  var found = false;
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart[i].quantity += 1;
      found = true;
      break;
    }
  }

  if (!found) {
    cart.push({ id: id, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("カートに追加しました！");
  };
}