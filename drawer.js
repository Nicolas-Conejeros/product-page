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