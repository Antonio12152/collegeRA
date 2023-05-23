"use strict"
const cart = {

    setCartData(o) {
        localStorage.setItem("cart", JSON.stringify(o))
        return false;
    },


    getCartData() {
        return JSON.parse(localStorage.getItem("cart"))
    },

    clearCart(cartContent) {
        console.log('clear')
        localStorage.removeItem("cart")
        cartContent.innerHTML = "Корзина очищенна"
    },

    addToCart(title, price, basket) {
        console.log('add')
        event.target.disabled = true;
        let cartData = cart.getCartData() || {},
            parentBox = event.target.parentNode,
            itemId = event.target.dataset.id,
            itemTitle = parentBox.querySelector(title).innerHTML,
            itemPrice = parentBox.querySelector(price).innerHTML;
        if (!cartData.hasOwnProperty(itemId)) {
            cartData[itemId] = [itemTitle, itemPrice, itemId]
        }
        if (!cart.setCartData(cartData)) {
            event.target.disabled = false;
        }
        basket.style.display = "flex"
    },
    openCart(cartContent) {
        console.log('open')
        let cartData = cart.getCartData(),
            totalItems = "";
        if (cartData !== null) {
            totalItems = "<table class='shoping-list'><tr><th>Наименнование</th><th>Цена</th></tr>";
            for (let items in cartData) {
                totalItems += "<tr>";
                for (let i = 0; i < cartData[items].length - 1; i++) {
                    totalItems += "<td>" + cartData[items][i] + "</td>";
                }
                totalItems += `<td><button class='close-cart' data-order=${items}>Удалить</button></td></tr>`;
            }
            totalItems += "</table>";
            cartContent.innerHTML = totalItems;
        }
        cart.addEventCloseCart(cartContent)
    },

    deleteItemCart(cartContent) {
        console.log('delete')
        let cartData = cart.getCartData(),
            itemId = event.target.dataset.order
        delete cartData[itemId]
        cart.setCartData(cartData);
        cart.openCart(cartContent)
    },

    addEventCloseCart(cartContent) {
        console.log('close')
        const closeCart = document.querySelectorAll(".close-cart")
        closeCart.forEach(button => button.addEventListener("click", () => cart.deleteItemCart(cartContent)))
    }
}