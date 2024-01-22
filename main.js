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

let currentImageIndex = 0;
let productQuantity = 0;
let filledCart = false;


// Insert loaded data
insertDataHTML();