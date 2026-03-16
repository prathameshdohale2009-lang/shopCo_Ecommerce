// Datasets [static Json Files]
import { products } from "/js/productData.js"
import { reviews } from "/js/reviewData.js"


// Dom Elements
const productContainer = document.getElementsByClassName("products")[0];
const productContainer2 = document.getElementsByClassName("products")[1];
const reviewContainer = document.getElementsByClassName("reviews")[0];

// Variables 
let latestProducts = products.slice(0, 4);
let sortedByPrice = [...products].sort((a, b) => b.price - a.price).slice(0,4);


// Render Products for latest Section
latestProducts.forEach(product => {
    const productHTML = `
        <a  href="product.html?id=${product.id}" class="card">
                <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b" alt="">
                <h4>${product.name}</h4>
                <div>
                    <p>$${product.price.toFixed(2)}</p>
                    <p>${product.category}</p>
                </div>
            </a>
    `;
    productContainer.innerHTML += productHTML;
});


// Render products sorted by price for the "Top Deals" section
sortedByPrice.forEach(product => {
    const productHTML = `
        <a href="product.html?id=${product.id}" class="card">
                <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b" alt="">
                <h4>${product.name}</h4>
                <div>
                    <p>$${product.price.toFixed(2)}</p>
                    <p>${product.category}</p>
                </div>
            </a>
    `;
    productContainer2.innerHTML += productHTML;
});


// Render reviews
reviews.forEach(review => {
    const reviewHTML = `
        <div class="review-card">
            <h4>${review.name}</h4>
            <div class="rating">
                ${"⭐".repeat(review.rating)}${"☆".repeat(5 - review.rating)}
            </div>
            <p>${review.comment}</p>
            <p class="date">${review.date}</p>
        </div>
    `;
    reviewContainer.innerHTML += reviewHTML;
});
