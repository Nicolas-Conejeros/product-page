// Utility functions
function setElementStyle(elementId, styles, fn) {
    const element = document.getElementById(elementId);
    if (fn) element.onclick = fn;

    Object.entries(styles).forEach(([property, value]) => {
        element.style[property] = value;
    });
}

function toggleClasses(elementSelector, className) {
    document.querySelector(elementSelector).classList.toggle(className);
}

function removeAllSelectedClass(selector) {
    document.querySelectorAll(selector).forEach((image) => image.classList.remove("selected"));
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