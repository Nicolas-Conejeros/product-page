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