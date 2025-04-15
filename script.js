const cartBtn = document.getElementById("cart-btn");
const cartList = document.querySelector(".cart-list");
const addToCardBtn = document.getElementById("add-to-cart");
const cartAdded = document.querySelector(".cart-list-added");
const errorMessage = document.querySelector(".error");
const deleteBtn = document.getElementById("delete");

const minusBtn = document.getElementById("minus-btn");
const plusBtn = document.getElementById("plus-btn");
const amount = document.querySelector(".amount");
const totalAmount = document.getElementById("default-amount");
const totalPrice = document.getElementById("total");
const newBalloon = document.getElementById("products-added");

const lightBox = document.querySelector(".lightbox");
const defaultThumbnail = document.querySelectorAll(".thumbnail");
const changeMainImage = document.getElementById("changeMainImage");

const minorImages = [
  "/images/image-product-1-thumbnail.jpg",
  "/images/image-product-2-thumbnail.jpg",
  "/images/image-product-3-thumbnail.jpg",
  "/images/image-product-4-thumbnail.jpg",
];

//make the cart-list appears or dissapears:
cartBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (cartAdded.classList.contains("add")) {
    cartAdded.classList.toggle("remove");
    cartList.classList.remove("add");
  } else {
    cartList.classList.toggle("add");
  }
});

//make the add or reduce buttons functional:
let addValue = 0;

plusBtn.addEventListener("click", (e) => {
  e.preventDefault();

  amount.textContent = ++addValue;
});

minusBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (addValue == 0) {
    amount.textContent = 0;
  } else {
    amount.textContent = --addValue;
  }
});

//make the product appears in the card list
addToCardBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (addValue == 0) {
    errorMessage.style.display = "block";

    setTimeout(function () {
      errorMessage.style.display = "none";
    }, 2000);
  } else {
    cartAdded.classList.add("add");
    totalAmount.textContent = addValue;
    totalPrice.textContent = "$" + addValue * 125 + ".00";
    newBalloon.textContent = addValue;
  }

  //make the ballon of new product and a better error message
});

//to delete the product of the card list:
deleteBtn.addEventListener("click", (e) => {
  cartList.classList.add("add");
  cartAdded.classList.remove("add");
  newBalloon.classList.toogle("add");
});

defaultThumbnail.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    lightBox.classList.remove("remove");
    lightBox.classList.add("on");
  });
});

//to change the images:
//1 => create the lighbox div;
//make the buttons functional;

fetch("/images.json")
  .then((response) => {
    if (!response.ok) return console.log("something is wrong!");

    return response.json();
  })
  .then((images) => {
    //1 => create the lighbox div;
    const mainDiv = document.createElement("div");
    mainDiv.classList.add("products-images");

    const close = document.createElement("button");
    close.classList.add("close-btn");
    close.innerHTML = `<img src=${"/images/icon-close.svg"} alt="close lightbox">`;

    const changeDiv = document.createElement("div");

    const previous = document.createElement("button");
    previous.classList.add("previous-btn");
    previous.innerHTML = `<img src=${"/images/icon-previous.svg"} alt="previous button image">`;

    const thumb1 = document.createElement("div");
    thumb1.classList.add("image-thumb");
    thumb1.innerHTML = `<img src=${images[0].src} alt="${images[0].alt}" class="thumbnail">`;

    const thumb2 = document.createElement("div");
    thumb2.classList.add("image-thumb");
    thumb2.innerHTML = `<img src=${images[1].src} alt="${images[1].alt}" class="thumbnail">`;

    const thumb3 = document.createElement("div");
    thumb3.classList.add("image-thumb");
    thumb3.innerHTML = `<img src=${images[2].src} alt="${images[2].alt}" class="thumbnail">`;

    const thumb4 = document.createElement("div");
    thumb4.classList.add("image-thumb");
    thumb4.innerHTML = `<img src=${images[3].src} alt="${images[3].alt}" class="thumbnail">`;

    const next = document.createElement("button");
    next.classList.add("next-btn");
    next.innerHTML = `<img src=${"/images/icon-next.svg"} alt="next button image">`;

    changeDiv.appendChild(thumb1);

    const thumbnailsDiv = document.createElement("div");
    thumbnailsDiv.classList.add("thumbnails");
    minorImages.forEach((imgs) => {
      const divImage = document.createElement("div");
      divImage.classList.add("image");
      divImage.innerHTML = `<img src=${imgs} alt="product images">`;

      thumbnailsDiv.appendChild(divImage);
    });

    mainDiv.appendChild(close);
    mainDiv.appendChild(previous);
    mainDiv.appendChild(changeDiv);
    mainDiv.appendChild(next);
    mainDiv.appendChild(thumbnailsDiv);

    lightBox.appendChild(mainDiv);

    //make the buttons functional(close, previous and next);
    close.addEventListener("click", (e) => {
      e.preventDefault();

      lightBox.classList.remove("on");
      lightBox.classList.add("remove");
    });

    next.addEventListener("click", (e) => {
      e.preventDefault();

      if (changeDiv.contains(thumb1)) {
        changeDiv.removeChild(thumb1);
        changeDiv.appendChild(thumb2);
      } else if (changeDiv.contains(thumb2)) {
        changeDiv.removeChild(thumb2);
        changeDiv.appendChild(thumb3);
      } else if (changeDiv.contains(thumb3)) {
        changeDiv.removeChild(thumb3);
        changeDiv.appendChild(thumb4);
      } else if (changeDiv.contains(thumb4)) {
        changeDiv.removeChild(thumb4);
        changeDiv.appendChild(thumb1);
      }
    });

    previous.addEventListener("click", (e) => {
      e.preventDefault();

      if (changeDiv.contains(thumb1)) {
        changeDiv.removeChild(thumb1);
        changeDiv.appendChild(thumb4);
      } else if (changeDiv.contains(thumb4)) {
        changeDiv.removeChild(thumb4);
        changeDiv.appendChild(thumb3);
      } else if (changeDiv.contains(thumb3)) {
        changeDiv.removeChild(thumb3);
        changeDiv.appendChild(thumb2);
      } else if (changeDiv.contains(thumb2)) {
        changeDiv.removeChild(thumb2);
        changeDiv.appendChild(thumb1);
      }
    });

    setTimeout(function () {
      changeMainImage.src = "/images/image-product-2.jpg";
    }, 5000);
    setTimeout(function () {
      changeMainImage.src = "/images/image-product-3.jpg";
    }, 10000);
    setTimeout(function () {
      changeMainImage.src = "/images/image-product-4.jpg";
    }, 15000);
    setTimeout(function () {
      changeMainImage.src = "/images/image-product-1.jpg";
    }, 20000);
  });
