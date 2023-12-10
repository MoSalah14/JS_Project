// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCUIrO-MDXmcWjwA8owfLJx3JXT021uoh4",
  authDomain: "validation-52b11.firebaseapp.com",
  databaseURL: "https://validation-52b11-default-rtdb.firebaseio.com",
  projectId: "validation-52b11",
  storageBucket: "validation-52b11.appspot.com",
  messagingSenderId: "743887404432",
  appId: "1:743887404432:web:57ab90038b600ecab30715",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const productsRef = ref(db, "Products/");

var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productIMGInput = document.getElementById("productIMG");
var productDescInput = document.getElementById("productDesc");
var mainBtn = document.getElementById("mainBtn");

var productsContainer = [];

onValue(productsRef, (snapshot) => {
  productsContainer = snapshot.val() ? Object.values(snapshot.val()) : [];
  dispayProducts(productsContainer);
});

function addProduct() {
  var product = {
    ID: generateUniqueId(),
    productName: productNameInput.value,
    price: productPriceInput.value,
    img: productIMGInput.files[0] ? productIMGInput.files[0].name : "",
    category: productCategoryInput.value,
    desc: productDescInput.value,
  };

  // Push the new product to the Firebase database
  push(productsRef, product);

  // Clear the form
  clearForm();
}

function dispayProducts(productLiest) {
  var cartoona = "";

  for (var i = 0; i < productLiest.length; i++) {
    cartoona += `<tr>
    <td id="productId"> ${productLiest[i].ID}</td>
        <td> ${productLiest[i].productName}</td>
        <td> ${productLiest[i].price}</td>
        <td> ${productLiest[i].category}</td>
        <td> ${
          productLiest[i].img ? "../images/" + productLiest[i].img : ""
        }</td>
        <td> ${productLiest[i].desc}</td>
        <td> <button onclick="setForm(${i})" class="btn btn-warning">update</button></td>
        <td> <button onclick="deleteProduct(${i})" class= "btn btn-danger">delete</button></td>
    
        </tr>
        `;
  }
  document.getElementById("tableRow").innerHTML = cartoona;
}
function generateUniqueId() {
  return productsContainer.length > 0
    ? Math.max(...productsContainer.map((p) => p.ID)) + 1
    : 1;
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
  const productId = productsContainer[productIndex].ID;

  // Remove the product from the Firebase database
  productsRef.child(productId).remove();

  dispayProducts(productsContainer);
}

function searchProducts(term) {
  var searchProducts = [];
  for (var i = 0; i < productsContainer.length; i++) {
    if (
      productsContainer[i].productName
        .toLowerCase()
        .includes(term.toLowerCase())
    ) {
      searchProducts.push(productsContainer[i]);
    }
  }
  dispayProducts(searchProducts);
}

function setForm(productIndex) {
  productNameInput.value = productsContainer[productIndex].productName;
  productPriceInput.value = productsContainer[productIndex].price;
  productCategoryInput.value = productsContainer[productIndex].category;
  productDescInput.value = productsContainer[productIndex].desc;

  // Replace the file input with a new one
  var newFileInput = document.createElement("input");
  newFileInput.type = "file";
  newFileInput.className = "form-control my-2";
  newFileInput.id = "productIMG";

  // Clone the attributes and events from the old input to the new one
  productIMGInput.parentNode.replaceChild(newFileInput, productIMGInput);
  productIMGInput = newFileInput;

  mainBtn.innerHTML = "update product";

  // Remove the existing click event listener
  document.getElementById("mainBtn").removeAttribute("onclick");

  // Add a new click event listener for the updateProduct function with the productIndex parameter
  document.getElementById("mainBtn").addEventListener("click", function () {
    updateProduct(productIndex);
  });
}

function updateProduct(productIndex) {
  const productId = productsContainer[productIndex].ID;

  productsRef.child(productId).set({
    productName: productNameInput.value,
    price: productPriceInput.value,
    img: productIMGInput.value,
    category: productCategoryInput.value,
    desc: productDescInput.value,
  });

  dispayProducts(productsContainer);
  mainBtn.innerHTML = "Add Product";
  clearForm();
  location.reload();
}
