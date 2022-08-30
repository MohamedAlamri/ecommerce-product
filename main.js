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
