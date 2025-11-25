// #region Global Values
let cartItemList = []
let totalPrice = 0;
let subTotalPrice = 0;
let deliveryCost = 0;
let mobileCartItemCount = 0;
const cartRef = document.getElementById("cart");
// #endregion

// #region Initial Load
function init(){
    getLocalStorage();
    renderLocal();
    renderMenuItems();
    allRender();
    toggleMobileCart();
    cartItemCounter();
    closeDialog();
}
// #endregion

// #region All Render Functions
// #region Initial Load
function allRender(){
    renderCartItems();
    renderFinalCart();
}
// #endregion

// #region Render Categories / Menus
function renderMenuItems(){
    const menuItemListRef = document.getElementById("menuItems");
    const menuCatRef = document.querySelector("ul.menuCategory");
    menuCatRef.innerHTML = "";
    menuItemListRef.innerHTML = "";
    for(let catIndex = 0; catIndex < menu.length; catIndex++){
        menuCatRef.innerHTML += categoryTemplate(catIndex);
        for(let menuIndex = 0; menuIndex < menu[catIndex].items.length; menuIndex++){
            menuItemListRef.innerHTML += menuTemplate(catIndex, menuIndex);
        }
    }
}
// #endregion

// #region Render Local Information
function renderLocal(){
    const localRef = document.getElementById("local");
    for(let localIndex = 0; localIndex < local.length; localIndex++){
        localRef.innerHTML += localTemplate(localIndex);
        deliveryCost = local[localIndex].localDeliveryCost;
    }
}
// #endregion

// #region Render CartItems
function renderCartItems(){
    const basektItemRef = document.getElementById("basket");
    basektItemRef.innerHTML = "";
    for(let cartIndex = 0; cartIndex < cartItemList.length; cartIndex++){
        basektItemRef.innerHTML += cartTemplate(cartIndex);
    }
    calculateTotal();
}
// #endregion

// #region Render FinalCart
function renderFinalCart(){
    const finalCartRef = document.getElementById("cartBottom");
    if (cartItemList.length === 0) {
        finalCartRef.innerHTML = "";
        cartRef.classList.add("empty");
        return;
    } else {
        cartRef.classList.remove("empty");
    }
    finalCartRef.innerHTML = finalCartTemplate();
}
// #endregion
// #endregion

// #region Event Listener
// #region Add Menu to Cart
function addToCart(catIndex, menuIndex){
    const menuItem = menu[catIndex].items[menuIndex];
    let existingItem = cartItemList.find(item => item.id === menuItem.id);
    if (existingItem) {
        existingItem.qty++;
    } else {
        cartItemList.push({ id: menuItem.id, name: menuItem.name, price: menuItem.price, desc: menuItem.desc, qty: 1 });
    }
    allRender();
    cartRef.classList.remove("empty");
    cartItemCounter();
    setLocalStorage();
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

// #region Checkout Function > Clear Cart
function checkoutEvent(){
    const dialogRef = document.getElementById("afterOrderMessage");
    const bodyRef = document.querySelector("body");
    bodyRef.classList.add("overflow-hidden");
    cartItemList = [];
    totalPrice = 0;
    subTotalPrice = 0;
    allRender();
    dialogRef.showModal();
    setLocalStorage();
}
// #endregion

// #region Change CartItems-Events
function removeItem(cartIndex) {
    cartItemList.splice(cartIndex, 1);
    allRender();
    cartItemCounter(cartIndex);
    setLocalStorage();
}

function itemIncrease(cartIndex) {
    cartItemList[cartIndex].qty++;
    allRender();
    cartItemCounter(cartIndex);
    setLocalStorage();
};

function itemDecrease(cartIndex) {
    if (cartItemList[cartIndex].qty > 1) {
        cartItemList[cartIndex].qty--;
    } else {
        cartItemList.splice(cartIndex, 1);
    }
    allRender();
    setLocalStorage();
}
// #endregion

// #region Cart-Item Counter on Mobile
function cartItemCounter(){
    let counterRef = document.getElementById("cartItemCounter");
    let counterCartItems = 0;
    for(let cartIndex = 0; cartIndex < cartItemList.length; cartIndex++){
        counterCartItems += cartItemList[cartIndex].qty;
    }
    counterRef.innerHTML = counterCartItems;
}
// #endregion

// #region Mobile Cart Button EventListener
function toggleMobileCart(){
    const toggleButton = document.getElementById("mobileCartButton");
    toggleButton.addEventListener('click', (event) => {
        cartRef.classList.toggle('active');
    });
}
// #endregion

// #region Close Dialog after Checkout
function closeDialog(){
    const closeDialogRef = document.getElementById("closeDialog");
    const dialogRef = document.getElementById("afterOrderMessage");
    const bodyRef = document.querySelector("body");
    
    closeDialogRef.addEventListener('click', (event) => {
        dialogRef.close();
        bodyRef.classList.remove("overflow-hidden");
    });
}
// #endregion
// #endregion

// #region LocalStorage-Functionality
function setLocalStorage(){
    localStorage.setItem("cartItems", JSON.stringify(cartItemList));
}

function getLocalStorage(){
    let data = localStorage.getItem("cartItems");
    if (data){
        cartItemList = JSON.parse(data);
    }
}
// #endregion