var arrayString = localStorage.getItem("cartItems");
var cartItems = JSON.parse(arrayString);

// console.log(cartItems[0].name)
window.onload = checkArray;

function checkArray() {
  if (cartItems.length === 0) {
    document.getElementById("contentCart").style.display = "block";
    document.getElementById("cart").style.display = "none";
  } else if (cartItems.length > 0) {
    document.getElementById("contentCart").style.display = "none";
    document.getElementById("cart").style.display = "block";
  }
}

function displayCartItems() {
  var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  var cartList = document.getElementById("cart-items");
  var cartTotal = document.getElementById("cart-total");
  var cartConfirm = document.getElementById("cart-confirm");

  cartList.innerHTML = "";

  // Loop through each item in the cart
  cartItems.forEach((item) => {
    // Create HTML elements for the item
    var itemImage = document.createElement("img");
    var itemName = document.createElement("span");
    var itemPrice = document.createElement("span");
    var itemQuantity = document.createElement("input");
    var listItem = document.createElement("li");
    var itemInfo = document.createElement("div");
    var itemActions = document.createElement("div");
    var itemTotal = document.createElement("span");
    var deleteButton = document.createElement("button");

    // Set attributes and content for the HTML elements
    itemImage.src = item.image;
    itemName.textContent = item.name;
    itemPrice.textContent = item.price;
    itemQuantity.type = "number";
    itemQuantity.min = "1";
    itemQuantity.value = "1";
    itemTotal.textContent = item.price;
    deleteButton.textContent = "X";

    // Add classes to the HTML elements
    itemInfo.classList.add("item-info");
    itemName.classList.add("item-name");
    itemPrice.classList.add("item-price");
    itemActions.classList.add("item-actions");
    itemQuantity.classList.add("item-quantity");
    itemTotal.classList.add("item-total");

    // Add event listeners for the quantity input and delete button
    itemQuantity.addEventListener("input", () => {
      var quantityInput = itemQuantity;
      var quantity = parseInt(quantityInput.value);
      var price = parseInt(item.price.replace("EGP", "").trim());
      var totalPrice = quantity * price;
      itemTotal.textContent = `EGP ${totalPrice.toFixed(2)}`;
      updateCartTotal();
      console.log(totalPrice);
    });

    deleteButton.addEventListener("click", () => {
      var index = cartItems.indexOf(item);
      cartItems.splice(index, 1);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      location.reload();
      displayCartItems();
      updateCartTotal();
    });

    // Append the HTML elements to the list item
    itemInfo.appendChild(itemName);
    itemInfo.appendChild(itemPrice);
    itemActions.appendChild(itemQuantity);
    itemActions.appendChild(itemTotal);
    itemActions.appendChild(deleteButton);
    listItem.appendChild(itemImage);
    listItem.appendChild(itemInfo);
    listItem.appendChild(itemActions);

    // Append the list item to the cart list
    cartList.appendChild(listItem);
  });

  updateCartTotal();
}

function updateCartTotal() {
  var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  console.log(cartItems);
  var cartTotal = document.getElementById("cart-total");
  let total = 0;

  // Loop through each item in the cart and add up the total price
  cartItems.forEach((item) => {
    var quantity = parseInt(item.quantity) || 1;

    var price = parseInt(item.price.replace("EGP", "").trim());
    var totalPrice = quantity * price;
    total += totalPrice;
    cartTotal.textContent = `Total: EGP ${total.toFixed(2)}`;
  });
}
displayCartItems();

//checkout button
document.getElementById("checkoutBtn").onclick = function () {
  document.getElementById("checkoutPage").style.display = "flex";
};

document.getElementById("close").onclick = function () {
  document.getElementById("checkoutPage").style.display = "none";
};
// function checkLocalStorage() {
//     var user = localStorage.getItem('users');
//     var btn = document.getElementById('checkoutBtn')
//     if (user) {

//         console.log(user);
//     } else {
//         btn.addEventListener('click', function(){
//             alert('Dear Customer Please login for comfirm Order')
//             document.getElementById('checkoutPage').style.display= 'none'
//         })

//     }
// }
// checkLocalStorage()
