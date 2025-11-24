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
// #region Add Menu to Cart Function
function addToCart(i, j){
    const menuItem = menu[i].items[j];
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
    cartItemList = [];
    totalPrice = 0;
    subTotalPrice = 0;
    allRender();
    dialogRef.showModal();
    setLocalStorage();
}
// #endregion

// #region Change CartItems-Events
function removeItem(i) {
    cartItemList.splice(i, 1);
    allRender();
    cartItemCounter(i);
    setLocalStorage();
}
function itemIncrease(i) {
    cartItemList[i].qty++;
    allRender();
    cartItemCounter(i);
    setLocalStorage();
};
function itemDecrease(i) {
    if (cartItemList[i].qty > 1) {
        cartItemList[i].qty--;
    } else {
        cartItemList.splice(i, 1);
    }
    allRender();
    setLocalStorage();
}
// #endregion

// #region Cart-Item Counter on Mobile
function cartItemCounter(){
    let counterRef = document.getElementById("cartItemCounter");
    let counterCartItems = 0;
    for(let i = 0; i < cartItemList.length; i++){
        counterCartItems += cartItemList[i].qty;
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
    closeDialogRef.addEventListener('click', (event) => {
        dialogRef.close();
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