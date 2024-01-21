// Loaded data
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
  id: "1b35a57Jf",
  name: "Fall Limited Edition Sneakers",
  thumbnail: thumbnailUrls[0],
  currentPrice: 125,
  discount: 50,
};

let filledCart = false;
let productQuantity = 0;
let currentImageIndex = 0;

// Insert loaded data
insertDataHTML();

// Drawer functionality
function openDrawer() {
  setElementStyle("myDrawer", { width: "250px" });
  setElementStyle("backdrop", { display: "inline" }, closeDrawer);
}

function closeDrawer() {
  setElementStyle("myDrawer", { width: "0" });
  setElementStyle("backdrop", { display: "none" });
}

function openCart() {
  setElementStyle("cart-info", { display: "inline" });
}

function closeCart() {
  setElementStyle("cart-info", { display: "none" });
}

// Image selector
document.addEventListener("DOMContentLoaded", function () {
  const thumbnailContainer = document.getElementById("main-thumbnails");
  const LBThumbnailContainer = document.getElementById("lightbox-thumbnails");
  const selectedImagesSrc = document.querySelectorAll(".selected-image");
  const RButton = document.getElementById("right-button");
  const LButton = document.getElementById("left-button");

  function addClickEvent() {
    document.getElementById('lb-main').addEventListener('click', prevImage);
    document.getElementById('rb-main').addEventListener('click', nextImage);
    setElementStyle('lb-main', { transform: ` translateX(25%)`, display: 'inline' })
    setElementStyle('rb-main', { transform: ` translateX(-25%)`, display: 'inline' })

  }

  function removeClickEvent() {
    document.getElementById('lb-main').removeEventListener('click', prevImage);
    document.getElementById('rb-main').removeEventListener('click', nextImage);
    setElementStyle('lb-main', { display: 'none' })
    setElementStyle('rb-main', { display: 'none' })
  }

  function checkScreenSize() {
    if (window.innerWidth >= 425) {
      removeClickEvent();
      setElementStyle('product-img', {}, openLightBox)
    } else {
      addClickEvent();
      setElementStyle('product-img', {}, () => { });
    }
  }
  // Check on window resize
  window.addEventListener('resize', checkScreenSize);
  // Initial check on page load
  checkScreenSize();

  LButton.addEventListener("click", () => {
    prevImage();
  })

  RButton.addEventListener("click", () => {
    nextImage();
  })


  thumbnailUrls.forEach((imageUrl, index) => {
    const thumbnail = createThumbnail(imageUrl, "thumbnail", index);
    thumbnailContainer.appendChild(thumbnail);
  });

  thumbnailUrls.forEach((imageUrl, index) => {
    const thumbnail = createThumbnail(imageUrl, "thumbnail-lightbox", index);
    LBThumbnailContainer.appendChild(thumbnail);
  });

  function createThumbnail(imageUrl, name, index) {
    const thumbnail = document.createElement("img");
    thumbnail.src = imageUrl;
    thumbnail.alt = `${name} ${index + 1}`;
    thumbnail.draggable = false;
    thumbnail.addEventListener("click", () => selectImage(index));
    if (index === 0) thumbnail.classList.add("selected");
    return thumbnail;
  }

  function selectImage(index) {
    selectedImagesSrc.forEach((selectedImage) => {
      selectedImage.src = imageUrls[index];
    });
    removeAllSelectedClass(".img-selection img");
    addClassAtIndex(".img-selection img", index, "selected");
  }

  function nextImage() {
    if (currentImageIndex + 1 >= imageUrls.length) {
      currentImageIndex = 0;
      selectImage(0);
    }

    else { selectImage(currentImageIndex + 1); currentImageIndex++ }
  }

  function prevImage() {
    if (currentImageIndex - 1 < 0) { selectImage(imageUrls.length - 1); currentImageIndex = imageUrls.length - 1 }
    else { selectImage(currentImageIndex - 1); currentImageIndex-- }
  }
});






// LightBox
function openLightBox() {
  setElementStyle("modalOverlay", { display: "flex" });
  // Close the lightbox when clicking outside of it
  window.addEventListener("click", function (event) {
    if (event.target === modalOverlay) {
      closeLightBox();
    }
  });
}

function closeLightBox() {
  setElementStyle("modalOverlay", { display: "none" });
}

// Buying options
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

function fillCart() {
  if (filledCart || productQuantity === 0) return;
  filledCart = true;

  const cardContainer = document.getElementById("cart-list");
  const htmlCode = `
    <div class="cart-card" id=${sneakers.id}> 
      <div class="cart-card-l">
        <img id="cart-prod-img" src="${sneakers.thumbnail}" />
      </div>
      <div class="cart-card-r">
        <h5 class="prod-desc">${sneakers.name}</h5>
        <h6 class="prod-desc">
          <span>${intPriceToUSD(
    sneakers.currentPrice
  )} x ${productQuantity}</span>
          <span class="prod-total">${intPriceToUSD(
    sneakers.currentPrice * productQuantity
  )}</span>
        </h6>
      </div>
      <img id="remove-item-svg" src="images/icon-delete.svg" onclick="removeFromCart()" />
    </div>`;
  cardContainer.innerHTML += htmlCode;
}

function removeFromCart(id) {
  // Since it's a static page
  id = sneakers.id;
  document.getElementById(sneakers.id).remove();
  filledCart = false;
}

// Utility functions
function setElementStyle(elementId, styles, fn) {
  const element = document.getElementById(elementId);
  if (fn) element.onclick = fn;

  Object.entries(styles).forEach(([property, value]) => {
    element.style[property] = value;
  });
}

function removeAllSelectedClass(selector) {
  const allImages = document.querySelectorAll(selector);
  allImages.forEach((image) => image.classList.remove("selected"));
}

function addClassAtIndex(selector, index, className) {
  const imageAtIndex = document.querySelectorAll(selector)[index];
  const imageAtIndexLB =
    document.querySelectorAll(selector)[index | imageUrls.length];

  if (imageAtIndex) {
    imageAtIndex.classList.add(className);
    imageAtIndexLB.classList.add(className);
  }
}

function intPriceToUSD(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

function previousPrice(currentPrice, discountPercentage) {
  const discountDecimal = discountPercentage / 100;
  return currentPrice / (1 - discountDecimal);
}

function insertDataHTML() {
  document.getElementById("price").innerHTML += intPriceToUSD(
    sneakers.currentPrice
  );
  document.getElementById("disscount").innerHTML += `${sneakers.discount}%`;
  document.getElementById("prev-price").innerHTML += intPriceToUSD(
    previousPrice(sneakers.currentPrice, sneakers.discount)
  );
}

function validateNumericInput(input) {
  input.value = input.value.replace(/\D/g, "");
  const numericValue = parseInt(input.value, 10) || 0;
  productQuantity = Math.min(5, Math.max(0, numericValue));
  input.value = productQuantity;
}
