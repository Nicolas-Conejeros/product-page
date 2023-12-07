const imageUrls = [
  "images/image-product-1.jpg",
  "images/image-product-2.jpg",
  "images/image-product-3.jpg",
  "images/image-product-4.jpg",
];

const thumbnailUrls = imageUrls.map((url) =>
  url.replace(".jpg", "-thumbnail.jpg")
);

const sneakers = {
  id: 1,
  name: "Fall Limited Edition Sneakers",
  thumbnail: thumbnailUrls[0],
  price: 125,
  discount: 50,
};

let filledCart = false;
let productQuantity = 0;

const cartItems = [];

function openDrawer() {
  setElementStyle("myDrawer", "width", "250px");
  setElementStyle("backdrop", "display", "inline");
}

function closeDrawer() {
  setElementStyle("myDrawer", "width", "0");
  setElementStyle("backdrop", "display", "none");
}

function openCart() {
  setElementStyle("cart-info", "display", "inline");
}

function closeCart() {
  setElementStyle("cart-info", "display", "none");
}

document.addEventListener("DOMContentLoaded", function () {
  const thumbnailContainer = document.getElementById("img-selection");
  const selectedImage = document.getElementById("selected-image");

  thumbnailUrls.forEach((imageUrl, index) => {
    const thumbnail = createThumbnail(imageUrl, index);
    thumbnailContainer.appendChild(thumbnail);
  });

  function createThumbnail(imageUrl, index) {
    const thumbnail = document.createElement("img");
    thumbnail.src = imageUrl;
    thumbnail.alt = `Thumbnail ${index + 1}`;
    thumbnail.draggable = false;
    thumbnail.addEventListener("click", () => selectImage(index));
    if (index === 0) thumbnail.classList.add("selected");
    return thumbnail;
  }

  function selectImage(index) {
    selectedImage.src = imageUrls[index];
    removeAllSelectedClass(".img-select img");
    addClassAtIndex(".img-select img", index, "selected");
  }
});

function addItem() {
  updateItemCount(1);
}

function removeItem() {
  updateItemCount(-1);
}

function updateItemCount(change) {
  const input = document.getElementById("item-count");
  const newValue = Math.min(5, Math.max(0, parseInt(input.value) + change));
  input.value = newValue;
  productQuantity = newValue;
}

function validateNumericInput(input) {
  input.value = input.value.replace(/\D/g, "");
  const numericValue = parseInt(input.value, 10) || 0;
  productQuantity = Math.min(5, Math.max(0, numericValue));
  input.value = productQuantity;
}

function fillCart() {
  if (filledCart || productQuantity === 0) return;
  filledCart = true;

  const cardContainer = document.getElementById("cart-list");
  const htmlCode = `
    <div class="cart-card"> 
      <div class="cart-card-l">
        <img id="cart-prod-img" src="${sneakers.thumbnail}" />
      </div>
      <div class="cart-card-r">
        <h5 class="prod-desc">${sneakers.name}</h5>
        <h6 class="prod-desc">
          <span>$${sneakers.price} x ${productQuantity}</span>
          <span class="prod-total">$${sneakers.price * productQuantity}</span>
        </h6>
      </div>
      <img id="remove-item-svg" src="images/icon-delete.svg" />
    </div>`;
  cardContainer.innerHTML += htmlCode;
}

// Utility functions

function setElementStyle(elementId, property, value) {
  document.getElementById(elementId).style[property] = value;
}

function removeAllSelectedClass(selector) {
  const allImages = document.querySelectorAll(selector);
  allImages.forEach((image) => image.classList.remove("selected"));
}

function addClassAtIndex(selector, index, className) {
  const imageAtIndex = document.querySelectorAll(selector)[index];
  if (imageAtIndex) imageAtIndex.classList.add(className);
}
