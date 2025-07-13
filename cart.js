window.onload = function () {
  var list = document.getElementById("cart-items");
  var totalElem = document.getElementById("total-price");
  var total = 0;

  var cart = [];
  var saved = localStorage.getItem("cart");
  if (saved) {
    cart = JSON.parse(saved);
  }

  list.innerHTML = "";

  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    var prod = findProduct(item.id);
    if (!prod) continue;

    var li = document.createElement("li");
    li.innerHTML =
      prod.name + " × " + item.quantity + " = ¥" + (prod.price * item.quantity) +
      " <button onclick='removeItem(" + prod.id + ")'>削除</button>";

    list.appendChild(li);
    total += prod.price * item.quantity;
  }

  totalElem.innerHTML = "合計: ¥" + total;
};

function findProduct(id) {
  for (var i = 0; i < products.length; i++) {
    if (products[i].id === id) return products[i];
  }
  return null;
}

function removeItem(id) {
  var cart = [];
  var stored = localStorage.getItem("cart");
  if (stored) {
    cart = JSON.parse(stored);
  }

  var updated = [];
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id !== id) {
      updated.push(cart[i]);
    }
  }

  localStorage.setItem("cart", JSON.stringify(updated));
  location.reload();
}