const taxRate = 0.18;
const shippingPrice = 15;
const shippingFreePrice = 300;

window.addEventListener("load", () => {
  // set items to LocalStorage
  localStorage.setItem("taxRate", taxRate);
  localStorage.setItem("shippingPrice", shippingPrice);
  localStorage.setItem("shippingFreePrice", shippingFreePrice);

  // set items to sessionStorage
  sessionStorage.setItem("taxRate", taxRate);
  sessionStorage.setItem("shippingPrice", shippingPrice);
  sessionStorage.setItem("shippingFreePrice", shippingFreePrice);
});

const productsDiv = document.querySelector(".products");

productsDiv.addEventListener("click", (event) => {
  if (event.target.className == "fa-solid fa-minus") {
    // console.log("minus btn is clicked")

    if (event.target.parentElement.querySelector(".quantity").innerText > 1) {
      event.target.parentElement.querySelector(".quantity").innerText--;
      calculateProductsPrice(event.target);
      calculateCartPrice();
    } else {
      if (confirm("Product will be removed???")) {
        //remove
        event.target.parentElement.parentElement.parentElement.remove();
        calculateCartPrice();
      }
    }
  } else if (event.target.classList.contains("fa-plus")) {
    // console.log("plus btn is clicked")
    event.target.previousElementSibling.innerText++;
    calculateProductsPrice(event.target);
    calculateCartPrice();
  } else if (event.target.className == "remove-product") {
    // console.log("remove btn is clicked")
    event.target.parentElement.parentElement.parentElement.remove();
    calculateCartPrice();
  } else {
    // console.log("other clicked")
  }
});

const calculateProductsPrice = (clickedBtn) => {
  const productInfoDiv = clickedBtn.parentElement.parentElement;
  // console.log(productInfoDiv)
  const price = productInfoDiv.querySelector(".product-price strong").innerText;
  const quantity = productInfoDiv.querySelector(".quantity").innerText
  const productTotalDiv = productInfoDiv.querySelector(".product-line-price")
  productTotalDiv.innerText = (price * quantity).toFixed(2)

};

const calculateCartPrice = () => {
    const productsTotalPricesDiv = document.querySelectorAll(".product-line-price")
    //! foreach ==> Nodelist, Array
    // console.log(productsTotalPricesDiv)

    let subTotal = 0

    productsTotalPricesDiv.forEach(div => {
        subTotal = subTotal + parseFloat(div.innerText)
    })
    // console.log(subTotal)
    const taxPrice = subTotal * localStorage.getItem("taxRate")
    const shippingPrice = (subTotal > 0 && subTotal < localStorage.getItem("shippingFreePrice") ? localStorage.getItem("shippingPrice") : 0)

    console.log(shippingPrice)
};
