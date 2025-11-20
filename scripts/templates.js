function categoryTemplate(catIndex){
    return `<li class="category"><button ontoggle"activeCategory()">${menu[catIndex].categoryName}</button></li>`
}

function menuTemplate(i, j){
    return `
    <article class="menuItem">
        <div class="menuDesc">
            <h3>${menu[i].items[j].name}</h3>
            <div class="price">${menu[i].items[j].price.toFixed(2)}</div>
            <div class="description">${menu[i].items[j].description}</div>
        </div>
        <div class="menuImg">
            <img src="${menu[i].items[j].img}">
        </div>
        <div class="interactive">
            <button class="addToCart" onClick="addToCart(${i}, ${j})">Add to Cart</button>
        </div>
    </article>
    `
}

function cartTemplate(i){
    return `
    <article class="cartItem">
        <h3>${cartItemList[i].name}</h3>
        <div class="cartDetails">
            <div class="qty">
                <button class="qtyDecrease" onclick="itemDecrease(${i})"><img src="./assets/icons/decrease.svg"></button>
                <span class="quantity">${cartItemList[i].qty}</span>
                <button class="qtyIncrease" onclick="itemIncrease(${i})"><img src="./assets/icons/increase.svg"></button>
            </div>
            <div class="priceInter">
                <span class="price">${cartItemList[i].price.toFixed(2)} €</span>
                <button class="removeItem" onclick="removeItem(${i})"><img src="./assets/icons/remove.svg" alt="remove Item"></button>
            </div>
        </div>
    </article>
    `
}

function localTemplate(i){
    return `
        <div class="localLogo"><img src="${local[i].localLogo}"></div>
        <div class="localName">
            <div class="localName">${local[i].localName}</div>
            <div class="localAddress">${local[i].localAddress}</div>
            <div class="localRating">${local[i].localRating}</div>
        </div>
    `
}

function finalCartTemplate(){
    return `
        <div class="cartDetails">
            <span class="subTotalRef">Subtotal: <span id="subTotal">${subTotalPrice.toFixed(2)} €</span></span>
            <span class="serviceFee">Delivery & Service: <span id="deliveryCost">${deliveryCost.toFixed(2)} €</span></span>
        </div>
        <div class="cartTotal">Total: <span id="subTotal">${totalPrice.toFixed(2)} €</span></div>
        <button id="cartTotal">Checkout (${totalPrice.toFixed(2)}) €</button>
    `
}