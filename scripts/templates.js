function menuTemplate(itemIndex){
    return `
    <article class="menuItem">
        <div class="menuDesc">
            <h3></h3>
            <div class="price"></div>
            <div class="description"></div>
        </div>
        <div class="menuImg">
            <img src="">
        </div>
        <div class="interactive">
            <button class="menuToCart"></button>
        </div>
    </article>
    `
}

function cartTemplate(itemIndex){
    return `
    <article class="cartItem">
        <h3></h3>
        <div class="cartDetails">
            <div class="qty">
                <button class="qtyDecrease"></button>
                <input type="number" placeholder="1">
                <button class="qtyIncrease"></button>
            </div>
            <div class="price"></div>
        </div>
        <div class="interactive">
            <button class="removeItem"></button>
        </div>
    </article>
    `
}