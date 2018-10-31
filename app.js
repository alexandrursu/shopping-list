let shoppingList = [];
let addButton = document.querySelector(".add");
let errorMsg = document.querySelector(".error");
let textBox = document.querySelector(".text-box");
let initialList = document.querySelector(".initial-list");
let productList = document.querySelector(".product-list");

// handle validation and push new item to array
function addItem(item) {
    if (item !== "") {
        errorMsg.classList.remove("show");
        shoppingList.push(item);
        textBox.value = "";
    } else {
        displayError();
    }
}

// remove item from array
function removeItem() {
    let index = shoppingList.indexOf(this.parentNode.textContent);
    if (index > -1) {
        shoppingList.splice(index, 1);
    }
    handleRemoveClick();
}

// method that (re)renders shopping list each time item is added or removed
function renderList() {
    productList.innerHTML = "";
    shoppingList.map(function(item) {
        productList.innerHTML +=
            "<li>" + item + '<span class="remove"></span></li>';
    });
}

// bind click event to dynamically created elements
function bindRemoveEvent() {
    let deleteButtons = document.querySelectorAll(".remove");
    deleteButtons.forEach(function(el) {
        el.onclick = removeItem;
    });
}

// check if shopping list is empty and display message
function checkListLength() {
    shoppingList.length > 0
        ? initialList.classList.add("hide")
        : initialList.classList.remove("hide");
}

// display error message
function displayError() {
    errorMsg.classList.add("show");
}

// remove item flow
function handleRemoveClick() {
    checkListLength();
    renderList();
    bindRemoveEvent();
}

// add item flow
function handleAddClick() {
    addItem(textBox.value);
    checkListLength();
    // if array is empty do not trigger next steps
    if (shoppingList.length > 0) {
        renderList();
        bindRemoveEvent();
    }
}

// self-invoked function that binds initial events
(function bindAddEvent() {
    // bind click event to add new item
    addButton.onclick = handleAddClick;
    // submit new item when user hits enter key
    document.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            addButton.click();
        }
    });
})();
