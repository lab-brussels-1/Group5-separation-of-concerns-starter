let label = document.getElementById('label')
let shoppingCart = document.getElementById('shopping-cart')

let basket = JSON.parse(localStorage.getItem("shopping")) || [] // IF WE HAVE DATE WILL RETRIEVE FROM LOCAL STORAGE OR FROM EMPTY ARRAY

// UPDATE OF CART ICON COUNTER

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount")
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}

calculation(); // INVOKING THE FUNCTION WILL ALLOW CART COUNT TO ALWAYS BE UPDATED EVEN IF PAGE IS REFRESHED 

// GENERATE ITEMS LIST

let generateCartItems = () => {
    if (basket.length !== 0){
        return (shoppingCart.innerHTML = basket
            .map((x) => {
                let {id, item} = x;
                let search = shopItemsData.find((y) => y.id === id) || [];
                let {imgSrc, name, price} = x;
                return `
                <div class="cart-item">
                <img width="100" src=${imgSrc} alt="pic">
                    <div class="details">

                        <dic class="title-price-x">
                            <h4 class="title-price">
                                <p>${name}</p>
                                <p class="cart-item-price">$ ${price}</p>
                            </h4>
                            <i onclick="removeItem(${id})" class="bi bi-x"></i>
                        </div>

                        <div class="buttons">
                                        <i onclick="decrement(${id})" class="bi bi-dash text-warning me-2 fs-2"></i>
                                        <div id=${id} class="quantity fw-bold fs-2">${item}</div>
                                        <i onclick="increment(${id})" class="bi bi-plus text-success ms-2 fs-2"></i>
                        </div>

                        <h3> ${item * search.price}</h3>
                    </div
                </div>
                `;
        })
        .join(''));
    } else {
        shoppingCart.innerHTML = `
        
        `;
        label.innerHTML = `
        <h2 class="h2 display-6">Cart is empty</h2>
        <a href="index.html">
        <button class="homeBtn">Back to Home</button>
        </a>
        `;
    }
};

generateCartItems();

// THIS IS THE INCREMENT BUTTON

let increment = (id) => {
    let selectedItem = id; 
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else {
        search.item += 1;
    }
    generateCartItems();
    update(selectedItem.id)

    localStorage.setItem("shopping", JSON.stringify(basket)) // LOCAL STORAGE USE TO KEEP DATA AFTER REFRESHING PAGE

}

// THIS IS THE DECREMENT/MINUS BUTTON

let decrement = (id) => {
    let selectedItem = id; 
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) return; // IF DATA IS NULL THEN THE FUNCTION WILL STOP
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }

    update(selectedItem.id);
    
    basket = basket.filter((x) => x.item !== 0); // FILTER OUTS (REMOVE) ALL ITEMS WITH NUMBER 0
    generateCartItems();
    localStorage.setItem("shopping", JSON.stringify(basket)); // LOCAL STORAGE USE TO KEEP DATA AFTER REFRESHING PAGE

};

/** 
*  ! UPDATE THE CARD COUNTER ERROR HERE
*  ?  document.getElementById(id).innerHTML = search.item; HAS ERROR 
*  ? init.js:89 Uncaught TypeError: Cannot set properties of null (setting 'innerHTML'))
**/

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    //document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
};

// REMOVE ITEM FROM THE LIST AND LOCAL STORAGE

let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    totalAmount();
    calculation();
    localStorage.setItem("shopping", JSON.stringify(basket)); // LOCAL STORAGE USE TO KEEP DATA AFTER REFRESHING PAGE
}


// CLEAR CARR FUNCTION THAT REMOVES ALL THE ITEMS AT ONCE FROM THE SHOPPING LIST

let clearCart = () => {
    basket = []
    generateCartItems();
    calculation();
    localStorage.setItem("shopping", JSON.stringify(basket)); // LOCAL STORAGE USE TO KEEP DATA AFTER REFRESHING PAGE

}


// TOTAL AMOUNT DISPLAYED IN THE SHOPPING CART

let totalAmount = () => {
    if (basket.length !== 0) {   
        let amount = basket.map((x) => {
            let {item, id} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price;
        })
        .reduce((x, y) => x + y, 0);
        label.innerHTML = `
        <h2> Total Bill : $ ${amount}</h2>
        <button class="checkout"> Checkout </button>
        <button onclick="clearCart()" class="removeAll"> Clear Cart </button>

        `
    }else return

};

totalAmount()