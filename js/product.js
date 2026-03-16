import { products } from "./productData.js";

// GET PRODUCT ID FROM URL
const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"));


// FIND PRODUCT
const product = products.find(p => p.id === productId);
const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

// SELECT CONTAINER
const productContainer = document.querySelector(".product-details");
const relatedProductsContainer = document.querySelector(".products");

// IF PRODUCT EXISTS
if (product) {
    productContainer.innerHTML = `<h1>${product.name}</h1>

            <div class="rating">
                ⭐⭐⭐⭐☆ <span>4.5/5</span>
            </div>

            <div class="price">
                <span class="new">${product.price.toFixed(2)}</span>
                <span class="old">$${product.oldPrice.toFixed(2)}</span>
                <span class="discount">-${((product.price - product.oldPrice) / product.oldPrice * 100).toFixed(0)}%</span>
            </div>

            <p class="description">
                This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric.
            </p>

            <!-- Category -->
            <div class="category">
                <p>Category : <span>${product.category.toUpperCase()}</span></p>
            </div>

            <!-- Colors -->
            <div class="colors">
               <p>Color : <span class="colorCircle" style="background-color: ${product.color};"></span></p>
            </div>

            <!-- Sizes -->
            <div class="sizes">
                <p>Choose Size</p>

                <div class="size-options">
                    ${product.sizes.map(size => `<button>${size}</button>`).join("")}
                </div>
            </div>

            <!-- Quantity -->
            <div class="cart-row">

                <div class="quantity">
                    <button>-</button>
                    <span>1</span>
                    <button>+</button>
                </div>

                <button class="add-cart">Add to Cart</button>
`;
} else { productContainer.innerHTML = "<h2>Product Not Found</h2>"; }


if (relatedProducts.length > 0) {
    relatedProducts.forEach(product => {
        const card =`<a href="product.html?id=${product.id}" class="product-card">
         <img src="assets/img/p1.jpg" alt="${product.name}">
        <h4>${product.name}</h4>
        <div class="price-category">
        <p class="price"> $${product.price}${product.oldPrice ? `<span class="old">$${product.oldPrice}</span>` : ""}</p>
        <p class="category">${product.category}</p>
        </div>
        </a>`
        relatedProductsContainer.innerHTML += card;
    });
} else {
    relatedProductsContainer.innerHTML = "<p>No related products found.</p>";
}   