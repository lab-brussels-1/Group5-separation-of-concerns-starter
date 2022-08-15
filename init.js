const shop = document.getElementById("shop");
const shoppingList = document.getElementById('shopping-list')

let basket = JSON.parse(localStorage.getItem("shopping")) || [] // IF WE HAVE DATE WILL RETRIEVE FROM LOCAL STORAGE OR FROM EMPTY ARRAY



let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x)=>{
        let {id, name, price, imgSrc} = x;
        let search = basket.find((x) => x.id === id) || [] // KEEPS COUNT IN TEMPLATE LITERAL SAVED IN LOCAL STORAGE IF NOT, EMPTY ARRAY
        return `
        <div id="product-id-${id}" class=" col-2 col-md-6 col-lg-2 mb-5">		
                            <div class="card text-center">
                                <img src="${imgSrc}" class="card-img-top">
                                <div class="card-body">
                                    <h5 class="card-title text-center">${name}</h5>
                                    <h3  class="h3 text-center">€${price}</h3>
                                    <div class="buttons">
                                    <i onclick="decrement(${id})" class="bi bi-dash text-warning me-2 fs-2"></i>
                                    <div id=${id} class="quantity fw-bold fs-2">
                                    ${search.item === undefined ? 0 : search.item}
                                    </div>
                                    <i onclick="increment(${id})" class="bi bi-plus text-success ms-2 fs-2"></i>
                                    </div>
                                </div>
                            </div>
                        </div>	
        `;
    })
    .join(""));
};

generateShop()

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
};

// UPDATE OF CART ICON COUNTER

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount")
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}

calculation(); // INVOKING THE FUNCTION WILL ALLOW CART COUNT TO ALWAYS BE UPDATED EVEN IF PAGE IS REFRESHED 
