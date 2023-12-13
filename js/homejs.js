function getallClothes(ob) {
  let boxDiv = document.createElement("div");
  boxDiv.id = "box";

  let boxLink = document.createElement("a");
  boxLink.href = "/productdetails.html?" + count;
  let imgTag = document.createElement("img");
  imgTag.src = ob.photos;

  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  let h3 = document.createElement("h3");
  let h3Text = document.createTextNode(ob.name);
  h3.appendChild(h3Text);

  let h4 = document.createElement("h4");
  let h4Text = document.createTextNode(ob.brand);
  h4.appendChild(h4Text);

  let h2 = document.createElement("h2");
  let h2Text = document.createTextNode("$  " + ob.price);
  h2.appendChild(h2Text);

  boxDiv.appendChild(boxLink);
  boxLink.appendChild(imgTag);
  boxLink.appendChild(detailsDiv);
  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(h4);
  detailsDiv.appendChild(h2);
  detailsDiv.appendChild(h2);

  return boxDiv;
}

let men = document.getElementById("men");
let women = document.getElementById("women");
let childrens = document.getElementById("childrens");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signOut,
  // onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// My web app's Firebase configuration
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
import {
  getDatabase,
  ref,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
const dp = getDatabase();

const auth = getAuth();
const user = auth.currentUser;

// if (user) {
//   const userRoleRef = ref(database, "Users/" + user.uid + "/Role");
//   get(userRoleRef).then((snapshot) => {
//     const userRole = snapshot.val();

//     // Check user role and show/hide the button
//     // if (userRole === "Admin") {
//     //   // Show "My Product" button
//     //   document.getElementById("myProductButton").style.display = "block";
//     //   document.getElementById("HomeCategory").style.display = "block";
//     // } else {
//     //   // Hide "My Product" button
//     //   document.getElementById("myProductButton").style.display = "none";
//     //   document.getElementById("HomeCategory").style.display = "none";
//     // }
//   });
// }

document.addEventListener("DOMContentLoaded", function () {
  const userRole = sessionStorage.getItem("userRole");

  auth.onAuthStateChanged((user) => {
    if (user) {
      document.getElementById("logInButton").style.display = "none";
      document.getElementById("logOutButton").style.display = "inline";

      const userRoleRef = ref(dp, "Users/" + user.uid + "/Role");
      get(userRoleRef).then((snapshot) => {
        const userRole = snapshot.val();

        // Check user role and show/hide the button

        const CategoryButton = document.getElementById("HomeCategory");
        const addProductButton = document.getElementById("addProductButton");
        if (addProductButton) {
          if (userRole === "Admin") {
            CategoryButton.style.display = "inline";
            addProductButton.style.display = "inline";
          } else {
            // Hide button
            addProductButton.style.display = "none";
            CategoryButton.style.display = "none";
          }
        }
        // Store user role in session storage
        sessionStorage.setItem("userRole", userRole);
      });
    } else {
      // User is logged out
      document.getElementById("logInButton").style.display = "inline";
      document.getElementById("logOutButton").style.display = "none";

      const MyCategoryBottom = document.getElementById("HomeCategory");
      const addProductButton = document.getElementById("addProductButton");
      if (addProductButton && MyCategoryBottom) {
        addProductButton.style.display = "none";
        MyCategoryBottom.style.display = "none";
      }
    }
  });

  const signOutButton = document.getElementById("logOutButton");
  signOutButton.addEventListener("click", (e) => {
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem("userRole");
        window.location.href = "LogOutReloadToHomePage.html";
      })
      .catch((error) => {
        // Handle errors
        console.error("Sign Out Error", error);
        alert("Sign-out failed. Please try again.");
      });
  });
});

var count = 0;
function getdata() {
  var storedArrayString = localStorage.getItem("myProducts");
  if (storedArrayString !== null) {
    var myArray = JSON.parse(storedArrayString);
  }
  for (let index = 0; index < myArray.length; index++) {
    if (myArray[index]["type"] == "men") {
      men.appendChild(getallClothes(myArray[index]));
      count++;
    } else if (myArray[index]["type"] == "women") {
      women.appendChild(getallClothes(myArray[index]));
      count++;
    } else {
      childrens.appendChild(getallClothes(myArray[index]));
      count++;
    }
  }
}
getdata();

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
