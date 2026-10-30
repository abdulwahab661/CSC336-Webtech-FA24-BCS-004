// MIDTERM TASK 3: live search, price sorting and Premium labels.
// This script works with the product cards already present in index.html.

function initializeProductPage() {
  const productGrid = document.getElementById("product-grid");
  const searchInput = document.getElementById("product-search");
  const sortButton = document.getElementById("sort-price-button");
  const sortStatus = document.getElementById("sort-status");
  const noProductsMessage = document.getElementById("no-products-message");
  const categoryFilters = document.querySelectorAll('input[name="category"]');

  // N = 4 for FA24-BCS-004, so the Premium limit is 4 x 100 = Rs. 400.
  const premiumThreshold = 4 * 100;

  // These are references to the existing HTML cards, not newly created products.
  const productCards = Array.from(
    productGrid.querySelectorAll(".product-item"),
  );

  // Read the numeric price from the price text already displayed inside each card.
  function getProductPrice(card) {
    const priceElement = card.querySelector(".product-price");

    if (!priceElement) {
      return 0;
    }

    const priceText = priceElement.textContent;
    const numericPrice = Number(
      priceText.replace(/Rs\.?/i, "").replace(/,/g, "").trim(),
    );

    return Number.isFinite(numericPrice) ? numericPrice : 0;
  }

  // Add a Premium badge to every existing card whose price is above Rs. 400.
  function addPremiumLabels() {
    productCards.forEach(function (card) {
      const priceElement = card.querySelector(".product-price");

      if (priceElement && getProductPrice(card) > premiumThreshold) {
        const premiumLabel = document.createElement("span");
        premiumLabel.className = "badge text-bg-warning ms-2 premium-label";
        premiumLabel.textContent = "Premium";
        priceElement.insertAdjacentElement("afterend", premiumLabel);
      }
    });
  }

  // Apply category and name matching together, so a card must pass both filters.
  function applyFilters() {
    const searchText = searchInput.value.trim().toLowerCase();
    const selectedCategory = document.querySelector(
      'input[name="category"]:checked',
    ).id;
    let visibleCount = 0;

    productCards.forEach(function (card) {
      const productName = card
        .querySelector(".card-title")
        .textContent.toLowerCase();
      const nameMatches = productName.includes(searchText);

      let categoryMatches = true;

      if (selectedCategory === "filter-audio") {
        categoryMatches = card.classList.contains("category-audio");
      } else if (selectedCategory === "filter-wearables") {
        categoryMatches = card.classList.contains("category-wearables");
      } else if (selectedCategory === "filter-power") {
        categoryMatches = card.classList.contains("category-power");
      } else if (selectedCategory === "filter-computer") {
        categoryMatches = card.classList.contains("category-computer");
      }

      const shouldShow = nameMatches && categoryMatches;
      card.style.display = shouldShow ? "" : "none";

      if (shouldShow) {
        visibleCount += 1;
      }
    });

    // Replace the grid with the required message when no card passes both filters.
    productGrid.hidden = visibleCount === 0;
    noProductsMessage.hidden = visibleCount !== 0;
  }

  // First click sorts low-to-high; the next click sorts high-to-low.
  let sortAscending = true;

  function sortProductsByPrice() {
    const sortedCards = productCards.slice().sort(function (cardA, cardB) {
      const priceA = getProductPrice(cardA);
      const priceB = getProductPrice(cardB);

      return sortAscending ? priceA - priceB : priceB - priceA;
    });

    // Move the original card elements; do not rebuild the grid with innerHTML.
    sortedCards.forEach(function (card) {
      productGrid.appendChild(card);
    });

    sortStatus.textContent = sortAscending
      ? "Sorted: Low to High"
      : "Sorted: High to Low";

    sortAscending = !sortAscending;
    applyFilters();
  }

  // Set up Premium labels once when the page loads.
  addPremiumLabels();

  // Search updates as the user types.
  searchInput.addEventListener("input", applyFilters);

  // Changing the CSS category radio also refreshes the combined result.
  categoryFilters.forEach(function (filter) {
    filter.addEventListener("change", applyFilters);
  });

  // Sort the existing cards when the button is clicked.
  sortButton.addEventListener("click", sortProductsByPrice);

  // Display the correct initial state (All category, all product names).
  applyFilters();
}

// The script is linked at the end of index.html, but this also works if loaded later.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeProductPage);
} else {
  initializeProductPage();
}
