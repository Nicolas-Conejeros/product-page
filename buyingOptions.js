// Buying options
function addItem() {
  updateItemCount(1);
}

function removeItem() {
  updateItemCount(-1);
}

function updateItemCount(ammount, updateValue) {
  const input = document.getElementById('item-count');
  if (updateValue == undefined) {
    input.value = productQuantity = Math.min(5, Math.max(0, parseInt(input.value) + ammount));
    return;
  } else {
    input.value = updateValue;
    productQuantity = updateValue
    return
  }
}

function fillCart() {
  if (filledCart || productQuantity === 0) return;
  filledCart = true;

  const cardContainer = document.getElementById('cart-list');
  const htmlCode = `
      <div class='cart-card' id=${sneakers.id}> 
        <div class='cart-card-l'>
          <img id='cart-prod-img' src='${sneakers.thumbnail}' />
        </div>
        <div class='cart-card-r'>
          <h5 class='prod-desc'>${sneakers.name}</h5>
          <h6 class='prod-desc'>
            <span>${intPriceToUSD(
    sneakers.currentPrice
  )} x ${productQuantity}</span>
            <span class='prod-total'>${intPriceToUSD(
    sneakers.currentPrice * productQuantity
  )}</span>
          </h6>
        </div>
        <img id='remove-item-svg' src='images/icon-delete.svg' onclick='removeFromCart()' />
      </div>`;
  cardContainer.innerHTML += htmlCode;
}


function removeFromCart(id) {
  // Since it's a static page
  id = sneakers.id;
  document.getElementById(sneakers.id).remove();
  filledCart = false;
  updateItemCount(0, 0)
  toggleClasses('#submit-btn span.add-to-cart', 'clicked');
  toggleClasses('#submit-btn span.added', 'clicked');
  toggleClasses('#submit-btn svg', 'clicked');
  toggleClasses('#quantity', 'clicked');
}

function validateNumericInput(input) {
  input.value = input.value.replace(/\D/g, '');
  const numericValue = parseInt(input.value, 10) || 0;
  productQuantity = Math.min(5, Math.max(0, numericValue));
  input.value = productQuantity;
}

document.getElementById('submit-btn').addEventListener('click', cartClick);

function cartClick() {
  if (productQuantity > 0) {
    toggleClasses('#submit-btn span.add-to-cart', 'clicked');
    toggleClasses('#submit-btn span.added', 'clicked');
    toggleClasses('#submit-btn svg', 'clicked');
    toggleClasses('#quantity', 'clicked');
    productQuantity = 0;
  }
}