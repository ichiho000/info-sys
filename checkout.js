window.onload = function () {
  var form = document.getElementById("checkout-form");

  form.onsubmit = function () {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;

    if (name === "" || email === "" || address === "") {
      alert("すべて入力してください。");
      return false;
    }

    var text = "以下で購入しますか？\n\n";
    text += "名前: " + name + "\n";
    text += "メール: " + email + "\n";
    text += "住所: " + address;

    var ok = confirm(text);

    if (ok) {
      localStorage.removeItem("cart");
      alert("ご購入ありがとうございました！");
      location.href = "index.html";
    }

    return false;
  };
};