// Retrieve the user's email from local storage
const userEmail = localStorage.getItem("userEmail");

// Retrieve cart items from local storage
const cartItems = JSON.parse(localStorage.getItem("cartitems")) || [];

// Filter cart items based on the user's email
const userCartItems = cartItems.filter(function (item) {
  return item.UserEmail === userEmail;
});

// Now, userCartItems contains all cart items related to the user's email
console.log(userCartItems);

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

  cartList.innerHTML = "";

  // Loop through each item in the cart
  cartitems.forEach((item) => {
    var listItem = document.createElement("li");
    var itemName = document.createElement("span");
    var itemPrice = document.createElement("span");
    var itemTotal = document.createElement("span");
    var deleteButton = document.createElement("button");

    itemName.textContent = item.name;
    itemPrice.textContent = `Price: ${item.price}`;
    itemTotal.textContent = `Total: ${item.price}`;
    deleteButton.textContent = "X";

    listItem.appendChild(itemName);
    listItem.appendChild(itemPrice);
    listItem.appendChild(itemTotal);
    listItem.appendChild(deleteButton);

    // Append the list item to the cart list
    cartList.appendChild(listItem);

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
  });

  updateCartTotal();

  // Show/hide elements based on cart items
  if (cartitems.length === 0) {
    document.getElementById("contentCart").style.display = "block";
    document.getElementById("cart").style.display = "none";
  } else {
    document.getElementById("contentCart").style.display = "none";
    document.getElementById("cart").style.display = "block";
  }
}

function updateCartTotal() {
  var cartTotal = document.getElementById("cart-total");
  let total = 0;

  // Loop through each item in the cart and add up the total price
  cartitems.forEach((item) => {
    var quantity = parseInt(item.quantity) || 1;
    var price = parseInt(item.price.replace("EGP", "").trim());
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
