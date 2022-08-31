
let DataProduct = [
    {
        item: "eoijoij",
        Title: "Sneaker Company",
        name: "Fall Limited Edition Sneakers",
        desc: " These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
        price: "125.00",
        img: "images/pro-1.jpg"
    }
]


let productArray = JSON.parse(localStorage.getItem("Data")) || []




// shopping cart

let cartIcon = document.querySelector(".cart-icon");
let shoppingCart = document.querySelector(".shopping-cart");

cartIcon.addEventListener("click", () => {
    shoppingCart.classList.toggle("active");
})


let product1 = document.querySelector(".product-1");

let showData = () => {
    return(
      product1.innerHTML =  DataProduct.map((pro) => {

        let   {item, Title, name, desc, price} = pro

            return `
            <h2>${Title}</h2>
                <h1 class="pro-name">${name}</h1>
                <p>${desc}</p>
                <div class="price">
                    <h3>$ ${price}<span class="offer">50%</span></h3>                      
                    <h4 class="pre-offer">$ 250</h4>
                </div>
                <div class="add">
                    <div class="minus-plus"  >
                          <img onClick="decrement(${item})" src="images/icon-minus.svg" >
                          <h4 id=${item} class="count">0</h4>
                          <img onClick="increment(${item})" src="images/icon-plus.svg" >
                    </div>
                    <a onClick="addToCart(${item})" href="#" class="btn"><img src="images/icon-cart.svg" >Add to cart</a>
                    </div>
            ` 
        })
        )
}

showData()



// slider imgs for Desktop

let imgs = document.querySelectorAll(".imgs-below");
let previwImg = document.querySelector(".img-preview img")
let sliderDiv = document.querySelector(".imgs-slider")



imgs.forEach((img) => {
    img.addEventListener("click", (e) => {
        previwImg.src = e.target.src;
        e.target.parentElement.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
    })
})

// popup

previwImg.addEventListener("click", (e) => {
    let overlayDiv = document.createElement("div");
    overlayDiv.className = "overlay";
    document.querySelector("body").appendChild(overlayDiv);

    let popupDiv = document.createElement("div");
    popupDiv.className = "popup";
    let img = document.createElement("img");
    img.classList = "img-popup"
    let closePopup = document.createElement("img");
    closePopup.className = "closePopup"
    closePopup.src = "images/icon-close.svg"
    img.src = e.target.src;
    popupDiv.appendChild(img);
    popupDiv.appendChild(closePopup);
    document.querySelector("body").appendChild(popupDiv);


    closePopup.addEventListener("click", (e) => {
        document.querySelector(".popup").remove()
        document.querySelector(".overlay").remove()
    })

    
})




let count = document.querySelector(".count")
// start shopping cart

let decrement = (item) => {
    let selectedItem = item
    let search = productArray.find(x => x.id === selectedItem.id)
    if (search === undefined) return;
     else if (search.count === 0) return;

    else {
        search.count -= 1
    }
    count.innerHTML = search.count

}




let increment = (item) => {
    let selectedItem = item
    let search = productArray.find(x => x.id === selectedItem.id)

    if (search === undefined) {
        productArray.push(
            {
                id: selectedItem.id,
                count: 1
            }
        )
    }else {
        search.count += 1
    }
    count.innerHTML = search.count
    localStorage.setItem("Data", JSON.stringify(productArray))

}


let addToCart = () => {

    if (productArray.length !== 0) {
       
        return(
            productArray.map((y) => {
                let search = DataProduct.find(x => x.item === y.id);
                document.querySelector(".shopping-cart").innerHTML = `
                
                <div class="container-cart">
                <div class="img">
                    <img src="images/pro-1.jpg">
                </div>
                <div class="info">
                    <p>${search.name}</p>
                    <h5 class="price">$ ${search.price}/h5>
                </div>
                <img onClick="delate(${y.id})" src="images/icon-delete.svg" alt="">
            </div>
            <a href="#" class="btn">Check out</a>
                
                `
            })
        )

    }else{
        document.querySelector(".shopping-cart").innerHTML = `
            <h4>Your cart is empty</h4>
        `
    }
       
    }


    let delate = (id) => {
        productArray = productArray.filter((x) => x.id !== id.id);
        localStorage.setItem("Data", JSON.stringify(productArray))

        addToCart()
    }


    addToCart()
