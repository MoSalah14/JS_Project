var arrayString = localStorage.getItem('AllProducts');
var AllProducts = JSON.parse(arrayString)
window.onload = checkArray

function checkArray() {
    if (AllProducts.length === 0) {
        document.getElementById("contentCart").style.display = "block"
        document.getElementById("cart").style.display = "none"
    }
    else if (AllProducts.length > 0) {
        document.getElementById("contentCart").style.display = "none"
        document.getElementById("cart").style.display = "block"
    }
}



function displayAllProducts() {
    var AllProducts = JSON.parse(localStorage.getItem("AllProducts")) || [];
    var cartList = document.getElementById("cart-items");
    var cartTotal = document.getElementById("cart-total");
    var cartConfirm = document.getElementById("cart-confirm");

    cartList.innerHTML = "";

    // Loop through each item in the cart
    AllProducts.forEach(item => {
        // Create HTML elements for the item
        var itemImage = document.createElement("img");
        var itemName = document.createElement("span");
        var itemPrice = document.createElement("span");
        var listItem = document.createElement("li");
        var itemInfo = document.createElement("div");
        var user = document.createElement("div");
        var itemActions = document.createElement("div");
        var deleteButton = document.createElement("button");
        var acceptButton = document.createElement("button");

        // Set attributes and content for the HTML elements
        itemImage.src = item.image;
        itemName.textContent = item.name;
        itemPrice.textContent = item.price;
        user.textContent = item.UserEmail;
        deleteButton.textContent = "X";
        acceptButton.textContent = "Confirm";
        // Add classes to the HTML elements
        itemInfo.classList.add("item-info");
        user.classList.add("item-info");
        itemName.classList.add("item-name");
        itemPrice.classList.add("item-price");
        itemActions.classList.add("item-actions");

        // Add event listeners for the quantity input and delete button


        deleteButton.addEventListener("click", () => {
            var index = AllProducts.indexOf(item);
            var iteeem = AllProducts[index];
            AllProducts.splice(index, 1);
            localStorage.setItem("AllProducts", JSON.stringify(AllProducts));


            var arrayString = localStorage.getItem('cartItems');
            var cartItems = JSON.parse(arrayString);
            function findObjectsByCriteria(array, criteria) {
                return array.filter(obj => {
                    for (let key in criteria) {
                        if (obj[key] !== criteria[key]) {
                            return false;
                        }
                    }
                    return true;
                });
            }
            //
            let foundObjects = findObjectsByCriteria(cartItems, iteeem);
            if (foundObjects.length > 0) {
                alert('Objects found:', foundObjects);
                debugger
                var ix = [foundObjects.length];
                cartItems.splice(ix, 1);
                localStorage.setItem("cartItems", JSON.stringify(cartItems));
            } else {
                alert('No objects found');
            }
            location.reload()
            displayAllProducts();
        });
        ///
        ///
       // Move the function declaration to the top
function findObjectsByCriteria(array, criteria) {
    return array.filter(obj => {
        for (let key in criteria) {
            if (obj[key] !== criteria[key]) {
                return false;
            }
        }
        return true;
    });
}

acceptButton.addEventListener("click", (e) => {
    e.preventDefault();
    
    // Move the declaration of cartItems above its usage
    var arrayString = localStorage.getItem('cartItems');
    var cartItems = JSON.parse(arrayString);

    var index = AllProducts.indexOf(item);
    var iteeem = AllProducts[index];
    
    // Use the findObjectsByCriteria function after its declaration
    let foundObjects = findObjectsByCriteria(cartItems, iteeem);
  
    if (foundObjects.length > 0) {
        alert('Objects found:', foundObjects);
        debugger
        AllProducts[index].ConfirmEmail = true;
        localStorage.setItem("AllProducts", JSON.stringify(AllProducts));
        cartItems[foundObjects.length - 1].ConfirmEmail = true;
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
        alert('No objects found');
    }
    
    location.reload();
    displayAllProducts();
});


        // Append the HTML elements to the list item
        itemInfo.appendChild(itemName);
        itemInfo.appendChild(itemPrice);
        itemActions.appendChild(acceptButton);
        itemActions.appendChild(deleteButton);
        listItem.appendChild(itemImage);
        listItem.appendChild(itemInfo);
        listItem.appendChild(user);
        listItem.appendChild(itemActions);

        // Append the list item to the cart list
        cartList.appendChild(listItem);
    });

}

displayAllProducts();

