// Retrieve the user's email from local storage
var userEmail = localStorage.getItem("userEmail");

// Retrieve cart items from local storage
var cartitems = JSON.parse(localStorage.getItem("cartitems")) || [];

// Filter cart items based on the user's email
var userCartItems = cartitems.filter(function (item) {
  return item.UserEmail === userEmail;
});
// Now, userCartItems contains all cart items related to the user's email
console.log(userCartItems);
cartitems = [];
cartitems = userCartItems;

window.onload = checkArray;

function checkArray() {
  if (cartitems.length === 0) {
    document.getElementById("contentCart").style.display = "block";
    document.getElementById("cart").style.display = "none";
  } else if (cartitems.length > 0) {
    document.getElementById("contentCart").style.display = "none";
    document.getElementById("cart").style.display = "block";
  }
}

function displaycartitems() {
  var cartList = document.getElementById("cart-items");
  var cartTotal = document.getElementById("cart-total");
  var cartConfirm = document.getElementById("cart-confirm");
  cartList.innerHTML = "";

  // Loop through each item in the cart
  cartitems.forEach((item) => {
    var listItem = document.createElement("li");
    var itemImage = document.createElement("img");
    var itemInfo = document.createElement("div");
    var itemName = document.createElement("span");
    var itemPrice = document.createElement("span");
    var itemActions = document.createElement("div");
    var itemQuantity = document.createElement("input");
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
      var price = parseInt(item.price);
      var totalPrice = quantity * price;
      itemTotal.textContent = `EGP ${totalPrice.toFixed(2)}`
      updateCartTotal();
      console.log(totalPrice);
    });
    // Add event listener for the delete button
    deleteButton.addEventListener("click", () => {
      var index = cartitems.indexOf(item);
      var iteeem = cartitems[index];
      cartitems.splice(index, 1);
      localStorage.setItem("cartitems", JSON.stringify(cartitems));

      // Retrieve AllProducts from localStorage
      var arrayString = localStorage.getItem("AllProducts");
      var AllProducts = JSON.parse(arrayString);

      // Find and remove the deleted item from AllProducts
      function findObjectsByCriteria(array, criteria) {
        return array.filter((obj) => {
          for (let key in criteria) {
            if (obj[key] !== criteria[key]) {
              return false;
            }
          }
          return true;
        });
      }

      // Check both name and email
      let foundObjects = findObjectsByCriteria(AllProducts, {
        name: iteeem.name,
        email: iteeem.email,
      });
      if (foundObjects.length > 0) {
        alert("Objects found:", foundObjects);

        AllProducts = AllProducts.filter((obj) => !foundObjects.includes(obj));
        localStorage.setItem("AllProducts", JSON.stringify(AllProducts));
      } else {
        alert("No objects found");
      }

      // Update after the asynchronous operation (no page reload)
      displaycartitems();
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

  // Show/hide elements based on cart items
  // if (cartitems.length === 0) {
  //   document.getElementById("contentCart").style.display = "block";
  //   document.getElementById("cart").style.display = "none";
  // } else {
  //   document.getElementById("contentCart").style.display = "none";
  //   document.getElementById("cart").style.display = "block";
  // }
}

function updateCartTotal() {
  debugger

  var cartTotal = document.getElementById("cart-total");
  let total = 0;
  // Loop through each item in the cart and add up the total price
  cartitems.forEach(item => {
    debugger
    var quantity = parseInt(item.quantity) || 1;
    var price = parseInt(item.price);
    var totalPrice = quantity * price;
    total += totalPrice;
    cartTotal.textContent = `Total: EGP ${total.toFixed(2)}`;
  });

}

//checkout button
document.getElementById("checkoutBtn").onclick = function () {
  document.getElementById("checkoutPage").style.display = "flex";
};

document.getElementById("close").onclick = function () {
  document.getElementById("checkoutPage").style.display = "none";
};

// Initial display of cart items
displaycartitems();
