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

// #region Render Categories / Menus
function renderCartItems(){
    const basektItemRef = document.getElementById("basket");
    basektItemRef.innerHTML = "";

    for(let i = 0; i < cartItemList.length; i++){
        basektItemRef.innerHTML += cartTemplate(i);
    }
    calculateTotal();
}
// #endregion

function updateCartItems(){
    const basektItemRef = document.getElementById("basket");
    const cartRef = document.getElementById("cart");
    let finalCartRef = document.getElementById("cartBottom");
    
    basektItemRef.addEventListener("click", function(event){
        
    })
    if(cartItemList.length == 0){
        console.log("wow, so much empty");
        cartRef.classList.add("empty");
        finalCartRef;
    }
}

function renderLocal(){
    const localRef = document.getElementById("local");
    for(let i = 0; i < local.length; i++){
        localRef.innerHTML += localTemplate(i);
        deliveryCost = local[i].localDeliveryCost;
    }
}

// #region Render Categories / Menus
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


function renderFinalCart(){
    const finalCartRef = document.getElementById("cartBottom");
    if(!cartItemList.length == 0){
        finalCartRef.innerHTML = finalCartTemplate();
    }
}

function calculateTotal(){
    subTotalPrice = 0;

    for(let i = 0; i < cartItemList.length; i++){
        subTotalPrice += cartItemList[i].price * (cartItemList[i].qty || 1);
    }
    totalPrice = subTotalPrice + deliveryCost;
}

// #region LocalStorage-Functionality



// #endregion

function removeItem(i){
    cartItemList.splice(i, 1);
    allRender();
}

function itemIncrease(i){

}

function itemDecrease(i){
}

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