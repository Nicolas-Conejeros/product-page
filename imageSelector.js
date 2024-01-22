// Image selector
document.addEventListener("DOMContentLoaded", function () {

    function addArrows() {
        document.getElementById('lb-main').addEventListener('click', prevImage);
        setElementStyle('lb-main', { transform: ` translateX(25%)`, display: 'inline' })

        document.getElementById('rb-main').addEventListener('click', nextImage);
        setElementStyle('rb-main', { transform: ` translateX(-25%)`, display: 'inline' })

    }

    function removeArrows() {
        document.getElementById('lb-main').removeEventListener('click', prevImage);
        setElementStyle('lb-main', { display: 'none' })

        document.getElementById('rb-main').removeEventListener('click', nextImage);
        setElementStyle('rb-main', { display: 'none' })
    }

    function checkScreenSize() {
        if (window.innerWidth >= 425) {
            removeArrows();
            setElementStyle('product-img', {}, openLightBox)
        } else {
            addArrows();
            setElementStyle('product-img', {}, () => { });
        }
    }

    // Initial check on page load
    checkScreenSize();

    // Check on window resize
    window.addEventListener('resize', checkScreenSize);

    // Functionality on left and right arrow buttons
    document.getElementById("left-button").addEventListener("click", () => { prevImage() })
    document.getElementById("right-button").addEventListener("click", () => { nextImage() })


    thumbnailUrls.forEach((imageUrl, index) => {
        document.getElementById("main-thumbnails").appendChild(createThumbnail(imageUrl, "thumbnail", index));
        document.getElementById("lightbox-thumbnails").appendChild(createThumbnail(imageUrl, "thumbnail-lightbox", index));
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
        document.querySelectorAll(".selected-image").forEach((selectedImage) => { selectedImage.src = imageUrls[index] });
        removeAllSelectedClass(".img-selection img");
        addClassAtIndex(".img-selection img", index, "selected");
    }

    function nextImage() {

        if (currentImageIndex + 1 == imageUrls.length) {
            currentImageIndex = 0;
            selectImage(0);
        }
        else { selectImage(currentImageIndex + 1); currentImageIndex++; }
    }

    function prevImage() {
        if (currentImageIndex - 1 < 0) {
            selectImage(imageUrls.length - 1);
            currentImageIndex = imageUrls.length - 1;
        }
        else { selectImage(currentImageIndex - 1); currentImageIndex-- }
    }
});