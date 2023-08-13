const list = [];
const cartItems = [];
const images = ['images/iphone.jpg', 'images/computer.jpg', 'images/car.jpg']
let iphone = document.getElementsByTagName('option')[1].value
let computer = document.getElementsByTagName('option')[2].value
let car = document.getElementsByTagName('option')[3].value
let error = document.getElementsByClassName('error-message')[0];

function add() {
    let name = document.getElementById('type').value;
    let brand = document.getElementById('brand').value;
    let year = document.getElementById('year').value;
    let price = document.getElementById('price').value;
    let option = document.getElementById('select').value;
    error.classList.remove('not-displaying');
    if (name === '') {
        error.innerHTML = "Please, enter a name of product.";
        return 0;
    }
    else if (year < 2010 || year > 2023) {
        error.innerHTML = "Please, enter a valid year.";
        return 0;
    }
    else if (price === '') {
        error.innerHTML = "Please, enter cost of product.";
        return 0;
    }
    else if (option === '') {
        error.innerHTML = "Please, select a suitable category.";
        return 0;
    }

    const product = {
        name: name,
        brand: brand,
        year: year,
        price: price,
        category: option
    }
    list.push(product);
    displayProducts()
}

const displayProducts = () => {
    error.classList.add("not-displaying")
    document.getElementsByClassName('sub-list')[0].innerHTML = ''
    let image;
    list.map((product, index) => {

        if (product.category === 'Phone') {
            image = images[0]
        }
        else if (product.category === 'Computer') {
            image = images[1]
        }
        else {
            image = images[2]
        }

        document.getElementsByClassName('sub-list')[0].innerHTML += `
        <div class="flt-card">
            <div class="flt-card-head">
                <img src="${image}" >
            </div>
            <div class="flt-card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Name: ${product.name} </li>
                    <li class="list-group-item">Brand: ${product.brand} </li>
                    <li class="list-group-item">Year: ${product.year} </li>
                    <li class="list-group-item">Category: ${product.category} </li>
                    <li class="list-group-item"> <span class="price"> $${product.price} </span> </li>
                    <li class="list-group-item">
                        <div class="button-div justify-content-md-center">
                            <button onclick="addToCart(${index})" class="btn btn-outline-primary me-md-2">
                                <i class="bi bi-cart-plus"></i> Add to cart
                            </button>
                            <button onclick="deleteItem(${index})" class="btn btn-outline-danger me-md-2">
                                <i class="bi bi-trash"></i> Delete
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        `
    })
}

function deleteItem(index) {
    list.splice(index, 1);
    displayProducts();
}

const displayCartProducts = (index) => {
    document.getElementsByClassName('badge')[0].innerHTML = cartItems.length
    if (cartItems.length === 0) {
        document.getElementsByClassName('cart-error-message')[0].classList.remove('not-displaying')
    } else {
        document.getElementsByClassName('cart-error-message')[0].classList.add('not-displaying')
        cartItems.map((cartProduct, indexItem) => {
            if (cartItems[indexItem].category === 'Phone') {
                image = images[0]
            }
            else if (cartItems[indexItem].category === 'Computer') {
                image = images[1]
            }
            else if (cartItems[indexItem].category === 'Cars') {
                image = images[2]
            }
            document.getElementsByClassName('card-container')[0].innerHTML += `
            <div class="sidebar-card">
                <img src="${image}" alt="">
                <ul class="list-group">
                    <li class="list-group-item">Name: ${cartProduct.name}</li>
                    <li class="list-group-item">Brand: ${cartProduct.brand}</li>
                    <li class="list-group-item">Year: ${cartProduct.year} </li>
                    <li class="list-group-item">Category: ${cartProduct.category} </li>
                    <li class="list-group-item"><span class="price"> $ ${cartProduct.price} </span></li>
                    <li class="list-group-item">
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button onclick="removeCartItem(${index})" class="btn btn-outline-danger me-md-2">
                                <i class="bi bi-trash"></i> Remove
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        `
        })

    }
}

function addToCart(index) {
    cartItems.push(list[index]);
    let image;
    document.getElementsByClassName('card-container')[0].innerHTML = '';
    displayCartProducts();
}

function removeCartItem(index) {
    document.getElementsByClassName('card-container')[0].innerHTML = '';
    cartItems.splice(index, 1);
    displayCartProducts();

}

function cartButton() {
    document.getElementsByClassName('sub-list')[0].style = 'z-index: -1;'
    
}
function closeButton() {
    document.getElementsByClassName('sub-list')[0].style = 'z-index: 0;'
    
}