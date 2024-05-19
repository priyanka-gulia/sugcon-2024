var item_count = 0;

function AddElement(itemId, productName, productPrice, destination) {
  var list_item = document.createElement("li");
  list_item.id = itemId;
  list_item.className += "list-group-item d-flex justify-content-between lh-sm";

  var div = document.createElement("div");
  list_item.appendChild(div);

  var heading = document.createElement("h6");
  heading.innerHTML = productName;
  heading.className += "my-0";

  div.appendChild(heading);

  var price = document.createElement("span");
  price.innerHTML = productPrice;
  price.className += "text-body-secondary";

  list_item.appendChild(price);

  document.getElementById(destination).prepend(list_item);
}

function Add(productid, buttonId) {
  document.getElementById(buttonId).innerHTML = "Added to basket";

  item_count = item_count + 1;

  let item_id = "ITEM_" + item_count;

  addTocart(item_id, productid);

  document.getElementById("checkout_price").innerHTML =
    "$" + data.cartTotal.toFixed(2);

  let productType = data.product[productid].primaryCategory;
  let productCurrency = data.product[productid].currency;
  let productPrice = data.product[productid].price;
  let productName = data.product[productid].productName;

  sendAddEvent(
    productType,
    item_id,
    productName,
    productPrice,
    productid,
    productCurrency
  );
}

function addTocart(itemId, productID) {
  data.cart[itemId] = productID;

  let cartSize = Object.keys(data.cart).length;

  document.getElementById("cart").innerHTML = cartSize;
  document.getElementById("cart_count").innerHTML = cartSize;

  var productName = data.product[productID].productName;
  var productPrice = data.product[productID].formattedPrice;

  data.cartTotal += data.product[productID].price;

  document.getElementById("checkout_price").innerHTML =
    "$" + data.cartTotal.toFixed(2);

  AddElement(itemId, productName, productPrice, "cart_items");
}

function Remove(element) {
  let itemId = element.id;

  data.cartTotal -= data.product[data.cart[itemId]].price;

  delete data.cart[itemId];

  let cartSize = Object.keys(data.cart).length;

  document.getElementById("cart").innerHTML = cartSize;
  document.getElementById("cart_count").innerHTML = cartSize;

  document.getElementById("checkout_price").innerHTML =
    "$" + data.cartTotal.toFixed(2);

  element.parentNode.removeChild(element);
}

function Checkout() {
  let confirmedProducts = [];

  for (const [itemId, productId] of Object.entries(data.cart)) {
    confirmedProducts.push({
      item_id: itemId,
      product_id: productId,
    });

    let productElement = document.getElementById(itemId);

    Remove(productElement);
  }

  sendConfirmEvent(confirmedProducts);
  sendCheckoutEvent();
}
