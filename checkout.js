var db;

var request = window.indexedDB.open("urabanaDB", 1);

request.onupgradeneeded = function (event) {
  db = event.target.result;
  if (!db.objectStoreNames.contains("purchaseHistory")) {
    db.createObjectStore("purchaseHistory", { keyPath: "id", autoIncrement: true });
  }
};

request.onsuccess = function (event) {
  db = event.target.result;
  console.log("データベース接続OK");
};

request.onerror = function () {
  console.log("データベース接続エラー");
};


window.onload = function () {
  var form = document.getElementById("checkout-form");

  form.onsubmit = function () {

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;

    if (name === "" || email === "" || address === "") {
      alert("すべての項目を入力してください。");
      return false;
    }

    var confirmMsg = "以下の内容で購入を確定しますか？\n\n" +
      "名前: " + name + "\n" +
      "メール: " + email + "\n" +
      "住所: " + address;

    var result = confirm(confirmMsg);

    if (result) {
      localStorage.removeItem("cart");

      alert("ご購入ありがとうございました！");

      location.href = "index.html";
    }

    return false;
  };
};