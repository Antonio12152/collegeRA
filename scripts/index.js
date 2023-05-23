"use strict"
const video1 = document.getElementById("video1")
const video2 = document.getElementById("video2")
const videoPlay1 = document.getElementById("video__play1")
const videoPlay2 = document.getElementById("video__play2")


function playVideo(video, play) {
    video.play();
    play.style.display = "none"
}
function pauseVideo(video, play) {
    video.pause();
    play.style.display = "block"
}
videoPlay1.addEventListener("click", () => playVideo(video1, videoPlay1))
videoPlay2.addEventListener("click", () => playVideo(video2, videoPlay2))
video1.addEventListener("click", () => pauseVideo(video1, videoPlay1))
video2.addEventListener("click", () => pauseVideo(video2, videoPlay2))

// slider
const slidus = document.getElementById("slidus")
const slidu = document.querySelectorAll(".slidu")
const slideTime = 2000;
const arrowPreviwe = document.getElementById("arrow-previwe")
const arrowNext = document.getElementById("arrow-next")
const toggleRadio = document.getElementById("toggle-radio")
const toggleRadioInput = toggleRadio.querySelectorAll("input")
const slidusMin = document.getElementById("slidus-min")
const sliduMin = slidusMin.querySelectorAll(".slidu-min")


let currentSlide = 0;
let slideInterval;


function nextSlide() {
    slideReset();
    currentSlide = ++currentSlide % slidu.length;
    slideSet();
}
function slideReset() {
    slidu[currentSlide].className = "slidu";
    sliduMin[currentSlide].className = "slidu-min"
}
function slideSet() {
    slidu[currentSlide].className = "slidu showing";
    toggleRadioInput[currentSlide].checked = true;
    sliduMin[currentSlide].className = "slidu-min showing-min"
}
function continueSlideInterval() {
    slideInterval = setInterval(nextSlide, slideTime)
}
function stopSlide() {
    clearInterval(slideInterval);
}
function showPreviweSlide() {
    stopSlide();
    slideReset();
    currentSlide = (currentSlide == 0) ? slidu.length - 1 : currentSlide - 1;
    slideSet();
}
function showNextSlide() {
    stopSlide();
    nextSlide();
}
function toggleSlide(event) {
    stopSlide();
    slideReset();
    currentSlide = event.target.value;
    slideSet();
}
function toggleMinSlide(event) {
    if (event.target.tagName === "IMG") {
        stopSlide();
        slideReset();
        currentSlide = event.target.dataset.id;
        slideSet();
    }
}


continueSlideInterval();

slidus.addEventListener("mouseover", stopSlide)
slidus.addEventListener("mouseout", continueSlideInterval)
arrowNext.addEventListener("click", showNextSlide)
arrowPreviwe.addEventListener("click", showPreviweSlide)
toggleRadio.addEventListener("input", toggleSlide)
slidusMin.addEventListener("click", toggleMinSlide)


const parent = document.querySelectorAll(".parent");
const elem = document.querySelectorAll(".parent>.elem");

function isVisible(parent) {
    let coords = parent.getBoundingClientRect();
    let windowHeight = document.documentElement.clientHeight;
    let topVisible = coords.top > 0 && coords.top < windowHeight;
    let bottomVisible = coords.bottom > 0 && coords.bottom < windowHeight;
    return topVisible && bottomVisible;
}
function showVisible() {
    for (let i = 0; i < parent.length; i++) {
        if (isVisible(parent[i])) {
            elem[i].className = "elem"
        }
    }
}
window.addEventListener("scroll", showVisible);


// плавнный скролинг
const menu = document.getElementById("menu")

function scrollingTransition(event) {

    if (event.target.tagName === "A") {
        for (let i = 0; i < parent.length; i++) {
            elem[i].className = "elem"
        }
        event.preventDefault()
        const blockId = event.target.getAttribute("href")
        const id = document.querySelector(blockId)
        id.scrollIntoView({
            block: "start",
            behavior: "smooth"
        })
    }
}

menu.addEventListener("click", scrollingTransition);
// canvas
const canvasMain = {}
const drawArc = () => {
    canvasMain.ctx.beginPath()
    canvasMain.ctx.arc(canvasMain.brush.x, canvasMain.brush.y, canvasMain.brush.radius, 0, Math.PI * 2)
    canvasMain.ctx.fill()
}
const setBrushCoords = (eX, eY) => {
    canvasMain.brush.x = eX - canvasMain.canvas.getBoundingClientRect().x - document.documentElement.scrollLeft;
    canvasMain.brush.y = eY - canvasMain.canvas.getBoundingClientRect().y - document.documentElement.scrollTop;
}
const setBrush = (e) => {
    if (canvasMain.range.value < 7) {
        canvasMain.ctx.beginPath()
        canvasMain.ctx.moveTo(canvasMain.brush.x, canvasMain.brush.y)
        setBrushCoords(e.pageX, e.pageY)
        canvasMain.ctx.lineTo(canvasMain.brush.x, canvasMain.brush.y)
        canvasMain.ctx.stroke()
    } else {
        setBrushCoords(e.pageX, e.pageY)
        drawArc()
    }
}
const setColor = () => {
    canvasMain.ctx.strokeStyle = canvasMain.color.value
    canvasMain.ctx.fillStyle = canvasMain.color.value
}
const setCanvasRange = () => {
    canvasMain.ctx.lineWidth = canvasMain.range.value
    canvasMain.brush.radius = canvasMain.range.value
}
const draw = (e) => {
    setBrushCoords(e.pageX, e.pageY)
    if (canvasMain.range.value >= 7) {
        drawArc()
    }
    canvasMain.canvas.addEventListener("mousemove", setBrush)

}
const resize = () => {
    canvasMain.canvas.width = canvasMain.canvas.clientWidth;
    canvasMain.canvas.height = canvasMain.canvas.clientHeight;
}
const init = () => {
    canvasMain.canvas = document.getElementById("canvas")
    canvasMain.ctx = canvasMain.canvas.getContext("2d")
    canvasMain.color = document.getElementById("canvas-color")
    canvasMain.range = document.getElementById("canvas-range")
    canvasMain.brush = {
        x: canvasMain.canvas.width / 2,
        y: canvasMain.canvas.height / 2,
        radius: 2,
    }
    canvasMain.canvas.addEventListener("mousedown", draw)
    document.addEventListener("mouseup", () => {
        canvasMain.canvas.removeEventListener("mousemove", setBrush)
    })
    canvasMain.color.addEventListener("input", setColor)
    canvasMain.range.addEventListener("input", setCanvasRange)
}
window.onload = init;
window.onresize = resize;
// baket
const basketShopWrap = document.getElementById("basket-shop-wrap")
const baketShop = document.getElementById("baket-shop")
const itemBox = document.querySelectorAll(".item-box")
const cartContent = document.getElementById("cart-content")
const clearCart = document.getElementById("clear-cart")
itemBox.forEach(element => {
    element.querySelector(".add-item").addEventListener("click", cart.addToCart.bind(this, ".item-title", ".item-prise", basketShopWrap))
});
itemBox.forEach(element => {
    element.querySelector(".add-item").addEventListener("click", cart.openCart.bind(this, cartContent))
});
const closeBaketShopIcon = document.getElementById("close-baketShop-icon")
closeBaketShopIcon.addEventListener("click", () => basketShopWrap.style.display = "none")
clearCart.addEventListener("click", cart.clearCart.bind(this,cartContent))