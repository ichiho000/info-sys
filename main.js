window.onload = function () {
  var list = document.getElementById("product-list");
  if (!list) return;

  for (var i = 0; i < products.length; i++) {
    var p = products[i];

    var box = document.createElement("div");
    box.className = "product-card";

    var image = document.createElement("img");
    image.src = p.image_url;
    image.alt = p.name;
    box.appendChild(image);

    var name = document.createElement("h2");
    name.appendChild(document.createTextNode(p.name));
    box.appendChild(name);

    var price = document.createElement("p");
    price.appendChild(document.createTextNode("¥" + p.price));
    box.appendChild(price);

    var btn = document.createElement("button");
    btn.innerHTML = "カートに追加";
    btn.setAttribute("data-id", p.id);
    btn.onclick = addCart;
    box.appendChild(btn);

    list.appendChild(box);
  }
};

function addCart() {
  var pid = parseInt(this.getAttribute("data-id"), 10);
  var cart = [];
  var temp = localStorage.getItem("cart");
  if (temp) {
    cart = JSON.parse(temp);
  }

  var updated = false;
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === pid) {
      cart[i].quantity++;
      updated = true;
      break;
    }
  }

  if (!updated) {
    cart.push({ id: pid, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("カートに追加されました");
}