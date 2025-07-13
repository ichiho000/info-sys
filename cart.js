window.onload = function () {
  var checkoutButton = document.getElementById("checkout-button");
  var cartItems = [];
  var stored = localStorage.getItem("cart");
  if (stored) {
    cartItems = JSON.parse(stored);
  }

  var list = document.getElementById("cart-items");
  var totalElem = document.getElementById("total-price");
  var totalPrice = 0;

  list.innerHTML = "";

  if (cartItems.length === 0) {
    var emptyMessage = document.createElement("p");
    emptyMessage.textContent = "カートが空です。";
    list.appendChild(emptyMessage);
    totalElem.textContent = "";
    checkoutButton.style.display = "hidden";
    return;
  }

  for (var i = 0; i < cartItems.length; i++) {
    var item = cartItems[i];
    var product = findProductById(item.id);

    if (!product) {
      continue; 
    }

    var li = document.createElement("li");
    li.textContent = product.name + " × " + item.quantity + " - ¥" + (product.price * item.quantity);

    var btn = document.createElement("button");
    btn.textContent = "削除";
    (function (id) {
      btn.onclick = function () {
        var newCart = [];
        for (var j = 0; j < cartItems.length; j++) {
          if (cartItems[j].id !== id) {
            newCart.push(cartItems[j]);
          }
        }
        localStorage.setItem("cart", JSON.stringify(newCart));
        location.reload(); 
      };
    })(item.id);

    li.appendChild(btn);
    list.appendChild(li);

    totalPrice += product.price * item.quantity;
  }

  totalElem.innerHTML = "合計: ¥" + totalPrice;

  function findProductById(id) {
    for (var i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        return products[i];
      }
    }
    return null;
  }
};