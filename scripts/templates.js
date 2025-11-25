function categoryTemplate(catIndex){
    return `<li class="category"><button ontoggle"activeCategory()">${menu[catIndex].categoryName}</button></li>`
}

function menuTemplate(catIndex, menuIndex){
    return `
    <article class="menuItem">
        <h3>${menu[catIndex].items[menuIndex].name}</h3>
        <div class="menuInformation">
            <div class="menuDetails">
                <div class="menuImg">
                    <img src="${menu[catIndex].items[menuIndex].img}">
                </div>
                <div class="menuDesc">
                    <div class="price"></div>
                    <div class="description">${menu[catIndex].items[menuIndex].description}</div>
                </div>
            </div>
            <div class="interactive">
                <button class="addToCart" onClick="addToCart(${catIndex}, ${menuIndex})">Add to Cart (${menu[catIndex].items[menuIndex].price.toFixed(2)} €)</button>
            </div>
        </div>
    </article>
    `
}

function cartTemplate(cartIndex){
    return `
    <article class="cartItem" data-index="${cartIndex}">
        <h3>${cartItemList[cartIndex].name}</h3>
        <div class="cartDetails">
            <div class="qty">
                <button class="qtyDecrease" onclick="itemDecrease(${cartIndex})"><img src="./assets/icons/decrease.svg"></button>
                <span class="quantity">${cartItemList[cartIndex].qty}</span>
                <button class="qtyIncrease" onclick="itemIncrease(${cartIndex})"><img src="./assets/icons/increase.svg"></button>
            </div>
            <div class="priceInter">
                <span class="price">${cartItemList[cartIndex].price.toFixed(2)} €</span>
                <button class="removeItem" onclick="removeItem(${cartIndex})"><img src="./assets/icons/remove.svg" alt="remove Item"></button>
            </div>
        </div>
    </article>
    `
}

function localTemplate(localIndex){
    return `
    <div class="localLogo"><img src="${local[localIndex].localLogo}"></div>
    <div class="localInformation">
        <div class="localName">
            <div class="localName">${local[localIndex].localName}</div>
            <!--<div class="localAddress"><img src="./assets/icons/local.svg" alt="Local Icon">${local[localIndex].localAddress}</div>-->
            <div class="localRating"><img src="./assets/icons/star.svg" alt="Rating Icon">${local[localIndex].localRating}</div>
            <div class="deliveryMov"><img src="./assets/icons/basket.svg" alt="min. Order Icon">min. Order Value: ${local[localIndex].localMinOrderValue.toFixed(2)} €</div>
            <div class="deliveryCost"><img src="./assets/icons/truck.svg" alt="Delivery & Service Icon">Delivery & Service: ${local[localIndex].localDeliveryCost.toFixed(2)} €</div>
        </div>
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
        <button id="cartTotal" onclick="checkoutEvent()">Checkout <span>(${totalPrice.toFixed(2)} €)</span></button>
    `
}