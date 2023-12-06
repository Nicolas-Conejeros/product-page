const imageUrls = [
  "images/image-product-1.jpg",
  "images/image-product-2.jpg",
  "images/image-product-3.jpg",
  "images/image-product-4.jpg",
];

const thumbnailUrls = [
  "images/image-product-1-thumbnail.jpg",
  "images/image-product-2-thumbnail.jpg",
  "images/image-product-3-thumbnail.jpg",
  "images/image-product-4-thumbnail.jpg",
];

function openDrawer() {
  document.getElementById("myDrawer").style.width = "250px";
  document.getElementById("backdrop").style.display = "inline";
}

function closeDrawer() {
  document.getElementById("myDrawer").style.width = "0";
  document.getElementById("backdrop").style.display = "none";
}

function openCart() {
  document.getElementById("cart-info").style.display = "inline";
}

function closeCart() {
  document.getElementById("cart-info").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  const thumbnailContainer = document.getElementById("img-select");
  const selectedImage = document.getElementById("selected-image");

  // Dynamically create thumbnail images and add them to the container
  thumbnailUrls.forEach((imageUrl, index) => {
    const thumbnail = document.createElement("img");
    if (index == 0) thumbnail.classList.add("selected");
    thumbnail.src = imageUrl;
    thumbnail.alt = `Thumbnail ${index + 1}`;
    thumbnail.draggable = false;
    thumbnail.addEventListener("click", () => selectImage(index));
    thumbnailContainer.appendChild(thumbnail);
  });

  // Function to update the selected image
  function selectImage(index) {
    selectedImage.src = imageUrls[index];
    // Remove the 'selected' class from all images
    const allImages = document.querySelectorAll(".img-select img");
    allImages.forEach((image, currentIndex) => {
      if (currentIndex != index) image.classList.remove("selected");
      else image.classList.add("selected");
    });
  }
});

function addItem() {
  let input = document.getElementById("item-count");
  if (input.value < 5) input.value++;
}

function removeItem() {
  let input = document.getElementById("item-count");
  if (input.value > 0) input.value--;
}

function validateNumericInput(input) {
  // Remove non numeric characters
  input.value = input.value.replace(/\D/g, "");
  // Convert to a number
  const numericValue = parseInt(input.value, 10);
  console.log(numericValue)
  // Validations
  if (isNaN(numericValue)) document.getElementById("item-count").value = 0;
  if (numericValue > 5) {
    document.getElementById("item-count").value = 5;
  } else if (numericValue < 0) {
    document.getElementById("item-count").value = 0;
  } else document.getElementById("item-count").value = numericValue;
}
