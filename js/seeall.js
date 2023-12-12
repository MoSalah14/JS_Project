var arrayString = localStorage.getItem('AllProducts');
var cartItems = JSON.parse(arrayString)
window.onload = checkArray

function checkArray() {
    if (cartItems.length === 0) {
        document.getElementById("contentCart").style.display = "block"
        document.getElementById("cart").style.display = "none"
    }
    else if (cartItems.length > 0) {
        document.getElementById("contentCart").style.display = "none"
        document.getElementById("cart").style.display = "block"
    }
}



function displayCartItems() {
    var cartItems = JSON.parse(localStorage.getItem("AllProducts")) || [];
    var cartList = document.getElementById("cart-items");
    var cartTotal = document.getElementById("cart-total");
    var cartConfirm = document.getElementById("cart-confirm");

    cartList.innerHTML = "";

    // Loop through each item in the cart
    cartItems.forEach(item => {
        // Create HTML elements for the item
        var itemImage = document.createElement("img");
        var itemName = document.createElement("span");
        var itemPrice = document.createElement("span");
        var listItem = document.createElement("li");
        var itemInfo = document.createElement("div");
        var itemActions = document.createElement("div");
        var deleteButton = document.createElement("button");

        // Set attributes and content for the HTML elements
        itemImage.src = item.image;
        itemName.textContent = item.name;
        itemPrice.textContent = item.price;
        deleteButton.textContent = "X";

        // Add classes to the HTML elements
        itemInfo.classList.add("item-info");
        itemName.classList.add("item-name");
        itemPrice.classList.add("item-price");
        itemActions.classList.add("item-actions");

        // Add event listeners for the quantity input and delete button


        deleteButton.addEventListener("click", () => {
            var index = cartItems.indexOf(item);
            cartItems.splice(index, 1);
            localStorage.setItem("AllProducts", JSON.stringify(cartItems));
            location.reload()
            displayCartItems();
            updateCartTotal();
        });

        // Append the HTML elements to the list item
        itemInfo.appendChild(itemName);
        itemInfo.appendChild(itemPrice);
        itemActions.appendChild(deleteButton);
        listItem.appendChild(itemImage);
        listItem.appendChild(itemInfo);
        listItem.appendChild(itemActions);

        // Append the list item to the cart list
        cartList.appendChild(listItem);
    });

}

displayCartItems();

