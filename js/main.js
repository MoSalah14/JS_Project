

var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productIMGInput = document.getElementById('productIMG');
var productDescInput = document.getElementById('productDesc');
var mainBtn = document.getElementById('mainBtn');



var productsContainer;

if (localStorage.getItem('myProducts') != null) {
    productsContainer = JSON.parse(localStorage.getItem('myProducts'));
    dispayProducts(productsContainer);
}
else {
    productsContainer = [];
}

function addProduct() {
    if (mainBtn.innerHTML == "add product") {
        var product = {

            productName: productNameInput.value,
            price: productPriceInput.value,
            img: productIMGInput.value,
            category: productCategoryInput.value,
            desc: productDescInput.value
        }
        productsContainer.push(product);
        localStorage.setItem('myProducts', JSON.stringify(productsContainer));
        console.log(productsContainer);
        clearForm();
        dispayProducts(productsContainer);
    }
}

function dispayProducts(productLiest) {

    var cartoona = '';

    for (var i = 0; i < productLiest.length; i++) {
        cartoona += `<tr>
        <td id ="test"> ${i + 1}</td>
        <td> ${productLiest[i].productName}</td>
        <td> ${productLiest[i].price}</td>
        <td> ${productLiest[i].category}</td>
        <td> ${productLiest[i].img}</td>
        <td> ${productLiest[i].desc}</td>
        <td> <button onclick="setForm(${i})" class="btn btn-warning">update</button></td>
        <td> <button onclick="deleteProduct(${i})" class= "btn btn-danger">delete</button></td>
    
        </tr>
        `
    }
    document.getElementById('tableRow').innerHTML = cartoona;
}





function clearForm() {

    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
    productIMGInput.value = "";

}

function deleteProduct(productIndex) {

    productsContainer.splice(productIndex, 1);
    localStorage.setItem('myProducts', JSON.stringify(productsContainer));
    dispayProducts(productsContainer);
}



function searchProducts(term) {
    var searchProducts = [];
    for (var i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].productName.toLowerCase().includes(term.toLowerCase())) {
            searchProducts.push(productsContainer[i]);
        }
    }
    dispayProducts(searchProducts);
}


function setForm(productIndex) {

    productNameInput.value = productsContainer[productIndex].productName;
    productPriceInput.value = productsContainer[productIndex].price;
    productIMGInput.textContent = productsContainer[productIndex].img;
    productCategoryInput.value = productsContainer[productIndex].category;
    productDescInput.value = productsContainer[productIndex].desc;
    mainBtn.innerHTML = "update product";
    document.getElementById("mainBtn").setAttribute("onclick", `updateProduct(${productIndex})`)


}


function updateProduct(productIndex) {

    productsContainer[productIndex].productName = productNameInput.value;
    productsContainer[productIndex].price = productPriceInput.value;
    productsContainer[productIndex].img = productIMGInput.value;
    productsContainer[productIndex].category = productCategoryInput.value;
    productsContainer[productIndex].desc = productDescInput.value;

    dispayProducts(productsContainer);
    localStorage.setItem('myProducts', JSON.stringify(productsContainer));
    mainBtn.innerHTML = "Add Product";
    document.getElementById("mainBtn").setAttribute("onclick", `addProduct()`);
    clearForm();
    location.reload();
}




