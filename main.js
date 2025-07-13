window.onload = function(){
  var list = document.getElementById("product-list");
  for(var i=0; i<products.length; i++){
    var product = products[i];

    var card = document.createElement("div");
    card.className = "product-card";

    var img = document.createElement("img");
    img.src = product.image_url;
    img.alt = product.name; 

    var h2 = document.createElement("h2");
    h2.appendChild(document.createTextNode(product.name));

    var price = document.createElement("p");
    price.appendChild(document.createTextNode("¥" + product.price));

    var link = document.createElement("a");
    link.href = "product.html?id=" + product.id;
    link.appendChild(document.createTextNode("詳細を見る"));

    card.appendChild(img);
    card.appendChild(h2);
    card.appendChild(price);
    card.appendChild(link);
    
    list.appendChild(card);

  }
}