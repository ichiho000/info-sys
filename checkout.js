request.onerror = function(event) {
  alert("申し訳ありません。データベースの読み込みに失敗しました。");
};

request.onsuccess = function(event) {
  db = event.target.result;
  console.log("データベースに接続しました。");
};

request.onupgradeneeded = function(event) {
  db = event.target.result;
  var store = db.createObjectStore("purchaseHistory", { keyPath: "id", autoIncrement: true });
  store.createIndex("name", "name", { unique: false });
  store.createIndex("date", "date", { unique: false });
  console.log("データベースの初期化が完了しました。");
};

function addPurchase(data) {
  var transaction = db.transaction(["purchaseHistory"], "readwrite");
  var store = transaction.objectStore("purchaseHistory");
  var request = store.add(data);
  request.onsuccess = function() {
    alert("購入履歴を保存しました。ありがとうございます。");
  };
  request.onerror = function() {
    alert("購入履歴の保存に失敗しました。");
  };
}

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