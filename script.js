// #region Global Values
let cartItemList = []
let totalPrice = 0;
let subTotalPrice = 0;
let deliveryCost = 0;

// #region Initial Load
function init(){
    // getLocalStorage();
    renderMenuItems();
    renderLocal();
    updateCartItems();
}
// #endregion

// #region All Render Functions
// #region Initial Load
function allRender(){
    renderCartItems();
    renderFinalCart();
    updateCartItems();
}
// #endregion

// #region Render Categories / Menus
function renderMenuItems(){
    const menuItemListRef = document.getElementById("menuItems");
    const menuCatRef = document.querySelector("ul.menuCategory");
    menuCatRef.innerHTML = "";
    menuItemListRef.innerHTML = "";

    for(let i = 0; i < menu.length; i++){
        menuCatRef.innerHTML += categoryTemplate(i);
        for(let j = 0; j < menu[i].items.length; j++){
            menuItemListRef.innerHTML += menuTemplate(i, j);
        }
    }
}
// #endregion

// #region Render Local Information
function renderLocal(){
    const localRef = document.getElementById("local");
    for(let i = 0; i < local.length; i++){
        localRef.innerHTML += localTemplate(i);
        deliveryCost = local[i].localDeliveryCost;
    }
}
// #endregion

// #region Render CartItems
function renderCartItems(){
    const basektItemRef = document.getElementById("basket");
    basektItemRef.innerHTML = "";

    for(let i = 0; i < cartItemList.length; i++){
        basektItemRef.innerHTML += cartTemplate(i);
    }
    calculateTotal();
}
// #endregion

// #region Render FinalCart
function renderFinalCart(){
    const finalCartRef = document.getElementById("cartBottom");
    const cartRef = document.getElementById("cart");
    if (cartItemList.length === 0) {
        finalCartRef.innerHTML = "";
        cartRef.classList.add("empty");
        return;
    }
    finalCartRef.innerHTML = finalCartTemplate();
}
// #endregion
// #endregion

// #region Update Cart
function updateCartItems(){
    const basektItemRef = document.getElementById("basket");
    basektItemRef.addEventListener("click", function(event) {
        const btn = event.target.closest("button");
        if (!btn) return;
        const article = btn.closest(".cartItem");
        const i = Number(article.dataset.index);
        if (btn.classList.contains("qtyIncrease")) {
            itemIncrease(i);
        }
        if (btn.classList.contains("qtyDecrease")) {
            itemDecrease(i);
        }
        if (btn.classList.contains("removeItem")) {
            itemRemove(i);
        }
    });
}
// #endregion

// #region Add Menu to Cart Function
function addToCart(i, j){
    const menuItem = menu[i].items[j];
    const cartRef = document.getElementById("cart");
    let existingItem = cartItemList.find(item => item.id === menuItem.id);
    if (existingItem) {
        existingItem.qty++;
    } else {
        cartItemList.push({
            ...menuItem,
            qty: 1
        });
    }
    renderCartItems();
    renderFinalCart();
    cartRef.classList.remove("empty");
}
// #endregion

// #region Calculation of Total
function calculateTotal(){
    subTotalPrice = 0;
    for(let i = 0; i < cartItemList.length; i++){
        subTotalPrice += cartItemList[i].price * (cartItemList[i].qty || 1);
    }
    totalPrice = subTotalPrice + deliveryCost;
}
// #endregion

// #region Checkout Function
function checkoutEvent(){
    const cartRef = document.getElementById("cart");
    cartItemList = [];
    totalPrice = 0;
    subTotalPrice = 0;
    allRender();
    cartRef.classList.add("empty");
}
// #endregion

// #region Change CartItems
function itemRemove(i) {
    cartItemList.splice(i, 1);
    renderCartItems();
    renderFinalCart();
}

function itemIncrease(i) {
    cartItemList[i].qty++;
    renderCartItems();
    renderFinalCart();
};

function itemDecrease(i) {
    if (cartItemList[i].qty > 1) {
        cartItemList[i].qty--;
    } else {
        cartItemList.splice(i, 1); // Item entfernen
    }
    renderCartItems();
    renderFinalCart();
}
// #endregion

// #region LocalStorage-Functionality
function setLocalStorage(){
    localStorage.setItem("menu", JSON.stringify(menu));
}

function getLocalStorage(){
    const menuData = localStorage.getItem("menu");
    if (collectionData){
        menu = JSON.parse(menuData);
    }
}
// #endregion