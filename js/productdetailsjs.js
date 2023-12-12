// structure of product details

function dynamicContentDetails(ob) {
  let mainContainer = document.createElement("div");
  mainContainer.id = "containerD";
  document.getElementById("containerProduct").appendChild(mainContainer);

  let imageSectionDiv = document.createElement("div");
  imageSectionDiv.id = "imageSection";

  let imgTag = document.createElement("img");
  imgTag.id = "imgDetails";
  imgTag.src = ob.photos;

  imageSectionDiv.appendChild(imgTag);

  let productDetailsDiv = document.createElement("div");
  productDetailsDiv.id = "productDetails";

  let h1 = document.createElement("h1");
  let h1Text = document.createTextNode(ob.name);
  h1.appendChild(h1Text);

  let h4 = document.createElement("h4");
  let h4Text = document.createTextNode(ob.brand);
  h4.appendChild(h4Text);
  console.log(h4);

  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  let h3DetailsDiv = document.createElement("h3");
  let h3DetailsText = document.createTextNode("$ " + ob.price);
  h3DetailsDiv.appendChild(h3DetailsText);

  let h3 = document.createElement("h3");
  let h3Text = document.createTextNode("Description");
  h3.appendChild(h3Text);

  let para = document.createElement("p");
  let paraText = document.createTextNode(ob.description);
  para.appendChild(paraText);

  let buttonDiv = document.createElement("div");
  buttonDiv.id = "button";

  let buttonTag = document.createElement("button");
  buttonTag.id = "buybutton";
  buttonDiv.appendChild(buttonTag);
  // add to cart using local storage
  let buttonText = document.createTextNode("Add to Cart");
  buttonTag.appendChild(buttonText);
  buttonTag.onclick = function () {
    var userEmail = localStorage.getItem("userEmail");
    ob.UserEmail = userEmail;
    ob.ConfirmEmail = false;
    var data_object = JSON.stringify(ob);

    console.log(ob);
    var previous_data = JSON.parse(localStorage.getItem("cartitems")) || [];
    var isProductInWishlist =
      previous_data.filter(
        (item) => item.name === ob.name && item.description === ob.description
      ).length > 0;
    if (!isProductInWishlist) {
      var product_wish = [...previous_data, JSON.parse(data_object)];
      localStorage.setItem("cartitems", JSON.stringify(product_wish));
    }
    //add to allproduct
    var previous2_data = JSON.parse(localStorage.getItem("AllProducts")) || [];
    var isProductInWishlist2 =
      previous2_data.filter(
        (item) => (item) =>
          item.name === ob.name && item.description === ob.description
      ).length > 0;
    if (!isProductInWishlist2) {
      var product_wish2 = [...previous2_data, JSON.parse(data_object)];
      localStorage.setItem("AllProducts", JSON.stringify(product_wish2));
    }
  };
  // add to wish list using local storage
  let buttonTagw = document.createElement("button");
  buttonTagw.id = "wishbutton";
  buttonDiv.appendChild(buttonTagw);

  let buttonTextw = document.createTextNode("Add to wish list");
  buttonTagw.appendChild(buttonTextw);
  buttonTagw.onclick = function () {
    var data_object = JSON.stringify(ob);
    var previous_data = JSON.parse(localStorage.getItem("wishlist")) || [];
    var isProductInWishlist =
      previous_data.filter(
        (item) => (item) =>
          item.name === ob.name && item.description === ob.description
      ).length > 0;
    if (!isProductInWishlist) {
      var product_wish = [...previous_data, JSON.parse(data_object)];
      localStorage.setItem("wishlist", JSON.stringify(product_wish));
    }
  };

  mainContainer.appendChild(imageSectionDiv);
  mainContainer.appendChild(productDetailsDiv);
  productDetailsDiv.appendChild(h1);
  productDetailsDiv.appendChild(h4);
  productDetailsDiv.appendChild(detailsDiv);
  detailsDiv.appendChild(h3DetailsDiv);
  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(para);
  detailsDiv.appendChild(buttonDiv);
  return mainContainer;
}

let id = location.search.split("?")[1];
console.log(id);

function getproductDetails(params) {
  var storedArrayString = localStorage.getItem("myProducts");
  if (storedArrayString !== null) {
    var myArray = JSON.parse(storedArrayString);
  }
  for (let index = 0; index < myArray.length; index++) {
    if (index == id) {
      dynamicContentDetails(myArray[index]);
    }
  }
}
getproductDetails();
