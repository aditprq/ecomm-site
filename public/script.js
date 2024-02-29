document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");

    searchInput.addEventListener("input", function () {
        searchProducts(this.value);
    });

    fetchProducts();
});

function fetchProducts() {
    fetch("http://localhost:3001/api/products")
        .then(response => response.json())
        .then(products => displayProducts(products));
}

function searchProducts(searchTerm) {
    fetch(`http://localhost:3001/api/search?name=${searchTerm}`)
        .then(response => response.json())
        .then(searchResults => displayProducts(searchResults));
}

function displayProducts(products) {
    const productList = document.getElementById("productList");

    productList.innerHTML = "";

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.innerHTML = `
            <h2>${product.title}</h2>
            <img class="items" src="${product.img}" />
            <p>Price: $${product.price.toFixed(2)}</p>
            <p>Description: ${product.desc}</p>

            
        `;

        productList.appendChild(productDiv);
    });
}
