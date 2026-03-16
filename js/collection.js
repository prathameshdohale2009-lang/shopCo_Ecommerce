// Collection Page JavaScript
import { products } from "./productData.js"

// Get category from URL parameters
const params = new URLSearchParams(window.location.search)
const category = params.get("category")

// DOM Elements
const productGrid = document.getElementById("productGrid")
const productCount = document.getElementById("productCount")
const grid = document.getElementById("productGrid")

// State Variables
let selectedCategory = category || null
let selectedColor = null
let selectedSize = null
let maxPrice = 400


// display products on page load
function displayProducts(items) {
    productGrid.innerHTML = ""
    items.forEach(product => {
        const card = `<a href="product.html?id=${product.id}" class="product-card">
         <img src="assets/img/p1.jpg" alt="${product.name}">
        <h4>${product.name}</h4>
        <div class="price-category">
        <p class="price"> $${product.price}${product.oldPrice ? `<span class="old">$${product.oldPrice}</span>` : ""}</p>
        <p class="category">${product.category}</p>
        </div>
        </a>`

        productGrid.innerHTML += card
    })
    productCount.innerText = `Showing ${items.length} Products`
}


// Category Filter when user clicks on category name in filter section
document.querySelectorAll(".filter-group p").forEach(item => {
    item.addEventListener("click", () => {
       document.querySelectorAll(".filter-group p").forEach(i => i.classList.remove("active-filter"))
        item.classList.add("active-filter")
        selectedCategory = item.dataset.category
        applyFilters()
    })
})


// Color Filter when user clicks on color circle in filter section
document.querySelectorAll(".colors span").forEach(color => {
    color.addEventListener("click", () => {
        document.querySelectorAll(".colors span").forEach(c => c.classList.remove("active-color"))
        color.classList.add("active-color")
        selectedColor = color.dataset.color;
        applyFilters()

    })
})


// Price Filter when user changes price range slider in filter section
document.getElementById("priceRange").addEventListener("input", (e) => {
    maxPrice = e.target.value
    let minimunPrice = document.getElementById("minimumPrize")
    minimunPrice.innerText = `$${maxPrice}`
    applyFilters()
})


// size filter when user clicks on size button in filter section
document.querySelectorAll(".sizes button").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".sizes button").forEach(b => b.classList.remove("active-size"))
        btn.classList.add("active-size")
        selectedSize = btn.innerHTML

        applyFilters()
    })
})


// Function to apply filters
function applyFilters() {
    console.log("Applying Filters - Category:", selectedCategory, "Color:", selectedColor, "Size:", selectedSize, "Max Price:", maxPrice)
    let filtered = products.filter(product => {
        return (
            (!selectedCategory || product.category === selectedCategory) &&
            (!selectedColor || product.color === selectedColor) &&
            (!selectedSize || product.sizes.includes(selectedSize)) &&
            (product.price <= maxPrice)
        )
    })
    renderProducts(filtered)
}


// function to clear all filters and show all products
function clearFilters() {

    // reset variables
    selectedCategory = null;
    selectedColor = null;
    selectedSize = null;
    maxPrice = 400;

    // remove active classes
    document.querySelectorAll(".filter-group p").forEach(item => item.classList.remove("active-filter"))
    document.querySelectorAll(".colors span").forEach(color => color.classList.remove("active-color"))
    document.querySelectorAll(".sizes button").forEach(btn => btn.classList.remove("active-size"))

    // reset price slider (if exists)
    const priceRange = document.querySelector("#priceRange")
    if (priceRange) {
        priceRange.value = priceRange.max
    }

    // show all products again
    renderProducts(products)

}

// clear filters when user clicks on clear filters button
document.getElementById("clearFilters").addEventListener("click", clearFilters)


// if category is present in URL, apply category filter on page load
if (category) {
    document.querySelectorAll(".filter-group p").forEach(item => {
        if (item.dataset.category === category) {
            item.classList.add("active-filter")
        }
    })
    selectedCategory = category
    applyFilters()
} else {
    displayProducts(products)
}













